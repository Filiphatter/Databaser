const database = require("better-sqlite3");

const db = new database("TechGearWebShop.db", {verbose: console.log}); 

// -------------------------------------------------- PROD MANAGEMENT --------------------------------------------------
function getProducts() {
    const stmt = db.prepare(`SELECT products.name AS productName, categories.name AS CategoryName, manufacturers.name AS manufacturerName 
        FROM products 
        JOIN manufacturers on products.manufacturer_id = manufacturers.manufacturer_id 
        JOIN products_categories ON products.product_id = products_categories.product_id 
        JOIN categories ON products_categories.category_id = categories.category_id; `)
        return stmt.all();
}

function productInformation(id) {
    const stmt = db.prepare(`SELECT products.name AS productName, categories.name AS CategoryName, manufacturers.name AS manufacturerName 
        FROM products 
        JOIN manufacturers on products.manufacturer_id = manufacturers.manufacturer_id 
        JOIN products_categories ON products.product_id = products_categories.product_id 
        JOIN categories ON products_categories.category_id = categories.category_id
        WHERE products.product_id = ? `)
        return stmt.get(id);
}

function searchProduct(searchTerm) {
    console.log(`searching for: ${searchTerm}`)
    const stmt = db.prepare(`SELECT products.name as ProductName 
        FROM products 
        WHERE name LIKE ?`); //LIKE = wildcard part
        return stmt.all(`%${searchTerm}%`); //wildcard for partial matches, for instance not a exact match like IPhone 14s, phone works
}

function getProductsByCategory(categoryId) {
    const stmt = db.prepare(`SELECT products.name AS productName, categories.name AS categoryName
        FROM products
        JOIN products_categories ON products.product_id = products_categories.product_id
        JOIN categories ON products_categories.category_id = categories.category_id
        WHERE categories.category_id = ?; `)
        return stmt.all(categoryId)
}

function addProduct(name, description, price, stock_quantity, manufacturer_id) { 
    const stmt = db.prepare(`INSERT INTO products 
        (name, description, price, stock_quantity, manufacturer_id)
        VALUES (?, ?, ?, ?, ?) `)

    return stmt.run(name, description, price, stock_quantity, manufacturer_id)
}


function updateProductById(productId, name, description, price, stock_quantity, manufacturer_id) {
    const stmt = db.prepare(`UPDATE products
        SET name =  ?, description = ?, price = ?, stock_quantity = ?, manufacturer_id = ?
        WHERE product_id = ?;`)
        
      return stmt.run(name, description, price, stock_quantity, manufacturer_id, productId)
}

function deleteProductById(productId) {
    const stmt = db.prepare(`DELETE FROM products WHERE product_id = ?`)
    const result = stmt.run(productId);
    return result.changes > 0;
}

// -------------------------------------------------- CUSTOMER MANAGEMENT --------------------------------------------------
function showCustomerInfo(customerId) {
    const stmt = db.prepare(`SELECT customers.customer_id, customers.name, customers.email, customers.phone, orders.order_id, orders.order_date 
        FROM customers
        LEFT JOIN orders ON customers.customer_id = orders.customer_id
        WHERE customers.customer_id = ?;`)

        return stmt.all(customerId);
}

function updateCustomer(customerId, email, phone, address) {
    const stmt = db.prepare(`UPDATE customers 
        SET email = ?, phone = ?, address = ? 
        WHERE customer_id = ?;`)

        return stmt.run(email, phone, address, customerId)
}

function getCustomerOrders(customerId) {
    const stmt = db.prepare(`SELECT orders.order_id, orders.order_date,
        products.name, orders_products.unit_price, orders_products.quantity
        FROM orders
        JOIN orders_products ON orders.order_id = orders_products.order_id
        JOIN products ON orders_products.product_id = products.product_id
        WHERE orders.customer_id = ?;`)
        return stmt.all(customerId)
}

// -------------------------------------------------- ANALYTICAL DATA --------------------------------------------------


function categoryStats() {
    const stmt = db.prepare(`SELECT categories.name AS category_name,
        COUNT(products.product_id) AS product_count,
        ROUND (AVG (products.price),2) AS average_price 
        FROM products
        JOIN products_categories ON products.product_id = products_categories.product_id
        JOIN categories ON products_categories.category_id = categories.category_id
        GROUP BY categories.category_id;`);

        return stmt.all();
//round f;r limitera decimaler

}

function markPerProduct() {
    const stmt = db.prepare(`SELECT products.name AS product_name, 
        AVG(reviews.rating) AS average_rating
        FROM reviews
        JOIN products on reviews.product_id = products.product_id
        GROUP BY products.product_id;`);
        return stmt.all();
}

module.exports = {getProducts, productInformation, searchProduct, getProductsByCategory, addProduct, updateProductById, deleteProductById, 
    showCustomerInfo, updateCustomer, getCustomerOrders, categoryStats, markPerProduct } //export database functions 