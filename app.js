const express = require(`express`)
// importerar in express och server fil

const {getProducts, productInformation, searchProduct, getProductsByCategory, addProduct, updateProductById, deleteProductById, 
    showCustomerInfo, updateCustomer, getCustomerOrders, categoryStats, markPerProduct } = require(`./exam.js`) //import functiions

const app = express()
//skapar const för express kör

app.listen(8000, () => {
    console.log(`server is running`)
});
// localhost server

app.use(express.json());

// -------------------------------------------------- PROD MANAGEMENT --------------------------------------------------

// 127.0.0.1:8000/products
app.get(`/products`, (req,res)=> {
    res.json(getProducts())
})

// 127.0.0.1:8000/products/3
app.get(`/products/:id`, (req, res) => {
    const productId = req.params.id;
    res.json(productInformation(productId))
})

// 127.0.0.1:8000/search?name=galaxy
app.get(`/search`, (req,res) => {  //   /products/search DOES NOT WORK CAUSE SOME PISS LIMITATION RIP 3HRS DEBUGGING
    const searchTerm = `%${req.query.name}%`;
    const products = searchProduct(searchTerm)
    res.json(products)
})

// 127.0.0.1:8000/products/category/1
app.get('/products/category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const products = getProductsByCategory(categoryId)
    res.json(products)
})

// 127.0.0.1:8000/products 

// { EXEMPEL DATA I POSTMAN ANLAKI
    //"name": "iPhone 13",
  //  "description": "Gigantic screen and shit",
   // "price": 399.99,
   // "stock_quantity": 20,
   // "manufacturer_id": 1
//}
app.post(`/products`, (req,res) => {
    const {name, description, price, stock_quantity, manufacturer_id} = req.body;
    console.log(req.body); //debugg

    if (!name || !description || !price || !stock_quantity || !manufacturer_id) {
        return res.status(400).json({ error: 'Missing required fields' }); // 400 = bad request (invalid syntax)
    }

    try {
    const productInfo = addProduct(name, description, price, stock_quantity, manufacturer_id);

    const newProduct = {
        product_id: productInfo.lastInsertRowid,
        name,
        description,
        price,
        stock_quantity,
        manufacturer_id
    };
    res.status(201).json(newProduct); //201 = resulted in a new resource
} catch (error) {
    console.error('Error in /products POST route:', error);
    res.status(500).json({ error: 'Internal Server Error' }); //500 = server faulty
}
})

// 127.0.0.1:8000/products/26
// EXEMPEL DATA{
//    "name": "iPhone 14 PRO",
//    "description": "Gigantic screen and shit",
//    "price": 399.99,
//    "stock_quantity": 20,
//    "manufacturer_id": 1
//             }
app.put(`/products/:id`, (req, res) => {
    const productId = req.params.id;

    const {name, description, price, stock_quantity, manufacturer_id} = req.body;

    if (!name || !description || !price || !stock_quantity || !manufacturer_id) {
        return res.status(400).json({ error: 'Missing required fields' }); // 400 = bad request (invalid syntax)
    }
    try {
    const productInfo = updateProductById(productId, name, description, price, stock_quantity, manufacturer_id);

     if (productInfo) {
        res.status(200).json({message: `product ${productId} updated.`});
    } else {
        res.status(404).json({ error: `Product ${productId} not found.` });
    }
        } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
    }
});

// 127.0.0.1:8000/products/26
app.delete(`/products/:id`, (req, res) => {
    const productId = req.params.id;

    try {
    const success = deleteProductById(productId);
    if (success) {
    res.status(204).json(productId)
    } else {
        res.status(404).json({ error: `Product ${productId} not found.` });
    }
        }   catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
}
});


// -------------------------------------------------- CUSTOMER MANAGEMENT --------------------------------------------------
// 127.0.0.1:8000/customers/3
app.get(`/customer/:id`, (req,res) => {
    const customerId = req.params.id;

    try {
        const customerData = showCustomerInfo(customerId);

        if (customerData.length === 0) {
            return res.status(404).json({error: `customer ${customerId} not found.`})
        }

        // if there is order history group info
        const customerInfo = {
            customer_id: customerData[0].customer_id, //[0] customerData blir en array som hämtas av databasen och vi tar första objektet i array raden då.
            name: customerData[0].name, //iom allt står på samma rad så ska den enbart plocka information en gång därför skriver man [0]
            email: customerData[0].email,
            phone: customerData[0].phone,
            orders: customerData
            .filter(order => order.order_id !== null) //tar bort kunder utan orderhistorik
            .map(order => ({ // tar ut informationen om ordern specifikt.       PUNKT används för chaina metoder på en array. så först bort med rader utan order, sedan ny array med map
                order_id: order.order_id,
                order_date: order.order_date,
            }))
        };
        res.status(200).json(customerInfo)
    } catch (error) {
        console.error(`error fetching customer`, error)
        res.status(500).json({error: `internal server error`});
    }
})

// 127.0.0.1:8000/customers/3 EXEMPEL DATA NEDANFÖR WEEEEWOOOO
//  {
//    "email": "anna@outlook.se",
//    "phone": "073-2309226",
//    "address": "Drottninggatan 4, sthlm bror"
//  }
app.put(`/customers/:id`, (req,res) => {
    const customerId = req.params.id;

    const {email, phone, address} = req.body;

    if (!email || !phone || !address) {
        return res.status(400).json({ error: 'Missing required fields' }); // 400 = bad request (invalid syntax)
    }
    try {
        const updatedDetails = updateCustomer(customerId, email, phone, address);
    
         if (updatedDetails.changes > 0) { //om en change sker
            res.status(200).json({message: `customer ${customerId} updated.`});
        } else {
            res.status(404).json({ error: `customer ${customerId} not found.` });
        }
            } catch (error) {
        res.status(500).json({error: `internal server error`});
        }
    });

// 127.0.0.1:8000/customers/3/orders
app.get(`/customers/:id/orders`, (req,res) => {
    const customerId = req.params.id;

    try {
        const orders = getCustomerOrders(customerId);
        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({error: `no orders found for customer ${customerId}`})
        }
    } catch (error) {
        res.status(500).json({error: `internal server error`})
    }
})

// -------------------------------------------------- ANALYTICAL DATA --------------------------------------------------

//127.0.0.1:8000/production/stats
app.get(`/production/stats`, (req,res) => { //PRODUCT/STATS FUNKAR INTE SUG EN FET  (problem a shit ton of decimals how to limit smile plz help)
    try {
        const stats = categoryStats();
        if (stats) {
            res.status(200).json(stats);
        } else {
            res.status(404).json({error: `no product stats found`});
        }
    } catch (error) {
        console.error('Error fetching stats:', error);  // Logga felet för att felsökning
        res.status(500).json({error: `internal server error`});
    }
})


//127.0.0.1:8000/reviews/stats
app.get(`/reviews/stats`, (req,res) => {
    try {
        const mark = markPerProduct();
        console.log(`DATA`, mark) //logga för felsöka
        if (mark.length > 0) {
            res.status(200).json(mark)
        } else {
            res.status(404).json({error: `no reviews stats found`});
        }
    } catch (error) {
        res.status(500).json({error: `internal server error`})
    }
})












//app.get(`/`, (req,res) => {
//    res.send(`hello testing`);
//});
// visar text på localserver

//const logger = (req,res,next) => {
//    console.log('${req.method} ${req.url}')
 //   next();
//}
//middleware

//krav att anvanda en key som heter authorization för att kunna använda och se datan underr headers postman
//const authMiddleWare = (req,res,next) => {
  //  const token = req.headers.authorization;
    //if (!token || token != "myToken"){
     //   return res.status(401).send('unautharized');
   // } else {
     //   next();
   // }
//}; 

//middlewares
//app.use(express.json()) //parsar json strings i body 

//app.use(logger); //kör middlewaren på alla metoder


//app.get(`/employees`, authMiddleWare, (req,res) => {
//    res.json(getUsers());
//});

//app.get(`/employees/:id`, authMiddleWare, (req,res) => {
//    res.json(getUserById(req.params.id));
//});

//const employees = [
   // {"name": "Bill",
    //    "age": 43,
    //    "salary": 100,
    //    "id": 1
 //   },
 //   {"name": "bosse",
  //      "age": 53,
  //      "salary": 200,
  //      "id": 2
  //  },
   // {"name": "bertil",
   //     "age": 23,
  //      "salary": 300,
  //      "id": 3
 //   }
//]

//hämta employees

// app.get(`/employees/:id`, (req,res) => { 
//     let e = employees.find(employees => employees.id == req.params.id);
//     if (e) {
//         res.json(e);
//     } else {
//         res.send("hitta inte employee")
//     }
// });
// hämta employee baserat på id med path

// app.get(`/employee`, (req,res) => {
//     let id = req.query.id;
//     let name = req.query.name;
//     let e = employees.find(employee => employee.id == id);

//     if(e) {
//         res.send(`${name} har id ${e.id}`)
//     } else {
//         res.send("employee not found")
//     }
// })
//hämtar employee med id med query parameter

//app.post(`/employees`, (req,res) => {
    // let  newEmployee = 
    // {"name": req.query.name,
    //     "age": req.query.age,
    //     "salary": req.query.salary,
    //     "id": employees.length+1
    // }
    // employees.push(newEmployee)
   // let name = req.query.name;
   // let email = req.query.email;
    //res.json(addUser(name, email));
//})

//app.post('/employees', authMiddleWare, (req,res) => {
  //  const {name, email} = req.body;
   // res.status(201).json(addUser(name, email));

//});

//app.put(`/employees`, authMiddleWare, (req,res) => {
    // let e = employees.find(employee => employee.id == req.query.id)

    // if (e){
    //     if(req.query.name) {
    //         e.name = req.query.name;
    //     }if(req.query.age) {
    //         e.age = req.query.age;
    //     }
    //     if(req.query.salary) {
    //         e.salery = req.query.salery;
    //     }
    // }else {
    //     res.status(404).send("employee nto found");
    // }

  //  let name = req.query.name;
   // let email = req.query.email;
   // let id = req.query.id;

  //  res.json(updateUser(id, name, email));
//})

//app.delete(`/employees`, authMiddleWare, (req,res) => {
    // let employeeToDelete = employees.find(employee => employee.id == req.query.id)
    // let index = employees.indexOf(employeeToDelete)

    // employees.splice(index,1);
 //   res.send(deleteUserById(req.query.id));
//})

