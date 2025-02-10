# Databaser


## Vad är en databas?
Databaser skilljs ifrån applikationer ifrån att det fungerar mer som en lagrings hårdisk än något visuellt för användaren. Databasers funktion är främst att lagra, hämta, spara och använda information. Ofta externt så man kan använda samma databas till flertals olika applikationer, likt en api. Framförallt ett strukturerat lagringssytem som likt excel.

### Databashantering (DBMS)
- säkerställer dataintegritet
- hanterar samtidigt åtkomst (cocurrency)
- erbjuder backup/återställning
- implementerar säkerhet och behörigheter
- optimerar prestanda

### Vanliga databaser (typer)
- Relationsdatabaser ex MySQL, PostgreSQL
- använder tabeller som relaterar till varandra
- typ advancerat excel ark med kopplingar mellan ark

- NoSQL databaser ex MongoDB
- flexibel struktur 
- bra för stora datamängder med varierande datatyper

### grundläggande begrepp
Modell alltså hur data organiseras 
- tabell: en samling relaterad data
- rad: en post i tabell ex en kund
- kolumn: en typ av information ex namn
- nyckel: unikt värde för varje rad, främmande nyckel refererar till en primärnyckel i en annan tabell. 
ex en kund har ett id som 1, 2, 3. på raden så finns information som namn och email ex anna och anna@mail.com
en FK (främmande nyckel) kan peka på en primary key ex anna och sedan använda en FK för att referera till anna's id i en annnan tabell.

### relationell data
data organiseras i struktureade tabeller, varje tabell representerar en typ av object/information. Informationen kopplas samma genom relationer i data. Relationer i regel oftast (lite som logiken i det hela.)

### dokument 
noSQL, lagrar data i flexibla dokument exempelvis json. Bra för komplex och varierande data.

### constraints
- not null, kräver ett värde
- unique, värdet måste vara unikt
- primary key
- foregin key
kan kombineras med regler för säkrar information och hur lagring sker.

### acid 
a - atomiskt - odelbar (all data kommer eller ingen ifall av en krash eller liknande.
c - consistency - inga motsägelser med constraints
i - isolation - ofta sker saker i databasen samtidigt, isolation menas att om man skriver saker samtidigt så ska db göra det som om de kom en efter en
d - durability - om en krash sker så ska db hålla och informationen antingen ges eller inget alls.

### sammanfattning
- modell: relationell, document olika former av databaser och intergration
- DBMS: exempelvis SQLite och MySQL, språk för kommunicera med en databas eg SQL som kommunicerar med den relationel db
- tabell: 
- kolumn: 
- Rad:
- primärnyckel (PK), används som ID och används för relationer
- Främmande nyckel (FK), 
- datatyp: nummer, text osv
- query - SQL: står för structured quert language och är hur vi kommunicerar och använder databasen. Create, read, update, delete (crud)

## keywords och syntax
- Select
väljer x

- * (stjärna)
väljer alla

SELECT first_name, last_name, FROM patients WHERE gender="m"

SELECT first_name, last_name, 
FROM patients 
WHERE gender="m"

### data language
Data definition language - används vid skapande av db och tabeller, eg create table, create database
Data management language - select o något
Data manipulation language - 

### skapa databas
för kunna lägga in något i databasen behövs den skapas, skapas med CREATE DATABASE namn
Sedan så behöver man välja vilken man vill använda, körs med USE
Efter så skapar man table genom CREATE TABLE namn (kolumn_namn datatyp PRIMARY KEY, kolumn_namn2 datatyp (constraints) etc)
DROP TABLE namn så tar man bort allt
för kunna ändra eller tabort i tabeller så gör man ALTER TABLE namn ADD age NUMBER; ALTER TABLE name DROP age; lägger till age och tar bort

### Constraints
not null - column kan inte ha ett null värde
unique - alla values i column är olika
primary key - en kombination av not null o unique, idefierar varje rad
forgein key - preventerar att handlingar förstör länkar mellan tables
check - säkerställer värde i column klarar sina conditions
default - sätter default value för en column om inget annat sätts
create index - 

primär nycklar som ska vara unika kan man köra med auto increment, alltså den kommer självmant öka id i primary key om man lägger till fler "element" här är ett ex
CREATE TABLE persons (
id integer PRIMARY KEY AUTOINCREMENT
email varchar(50)
name varchar(50)
);

### CRUD

#### create = insert
INSERT INTO tabellnamn VALUES (värde_1, värde_2 etc) 
exempel: INSERT INTO tabellnamn(users) VALUES (2, "bill");

#### read = select
SELECT * (stjärna) hämtar allt från tabellnan
SELECT namn FROM tabellnan för enskild

- WHERE
för filtrera ut specifikka rad(er) så använder vi nyckelordet WHERE
ex SELECT * FROM tabellnamn WHERE id > 3;

- LIKE
vi kan använda WHERE där en koluimn ska innehålla vissa tecken så kan vi använda LIEK och wildcard tecken % och _
ex SELECT * FROM tabellnamn WHERE name LIKE `B%´; 
hämtar innehållet ifrån alla kolumner från raden där kolumn namn börjar på B
om man gör "_b%" så ignorerar den första bokstaven och tar upp dem med b som andra bokstav 

#### UPDATE 
vill vi updatera befintligt information så använder vi kommandot UPDATE och nyckelordet SET
man ska alltid använda WHERE för att specifiera vad som ska uppdateras annars kommer ALLA rader att updateras
ex UPDATE users SET age = 43 WHERE id = 2; updaterar users på kolumn age till 43 på id 2 alltså rad 2.
vill man göra fler kan man göra så här
UPDATE users SET age = 43, name = "billy" WHERE id = 3; så updaterar vi flera kolumner samtidigt

#### DELETE
för ta bort rader använder vi DELETE
eg DELETE FROM tabellnamn WHERE id = 1; sätt filter med WHERE annars tas allt bort
DROP tar bort allt från tabellen medans DELETE enbart tar bort innehåll.


### Relationer
ofta bra att göra flödesdiagram med relationer för struktur och lite bild hur man ska göra

Man brukar ofta dela upp relationer i kategorier
- one to one, relation till en relation
- one to many, en relation till många, exempelvis en person kan äga flera bilar
- many to many, Man kan bo i flera hus med olika medlemmar i båda husen
 
här är ett exempel på ovan https://gyazo.com/a27a090e19c6c81cc357b17f1c504dd6
även i DATABAS filen jaja du hittar när du behöver 4head

#### Vikten av relationer
Relationella databaser hjälper oss att modellera kopplingare mellan olika typer av data. Relationer säkerställer att datan förblir konsistent
och förhindrar fel. Möjliggör även effektiv organisering och ingen duplicering av data. Tillåter komplexa sökningar.
Detta sker genom primärnyckel som unikt identifierar varje rad, tabeller kopplas ihop genom främmande nycklar. 
Främmande nyckel (FK) refererar till en annan tabells PK. 

### Normalisering
Normalisering handlar om att strukturera sin databas smart, genom exempelvis återanvändbara funktioner istället för allt i samma klump.
Alltså slippa upprepa samma data på flera ställen, undvika buggar när data uppdateras, enklare att ändra i databasen för senare tillfälle.
Används när information upprepas eller används på flera ställen, för möjlighet att uppdatera och undvika inkonsekvens.

#### Onormaliserat exempel
https://gyazo.com/4db6a8329a7460db4dfe755d47a2c3a4

#### Normaliserat exempel
https://gyazo.com/48fdb3b739113716d6c52ab36d4d7f3f
Fördelen här är att man kan uppdatera kundens mail på ett ställe, samt produktpris på ett ställe
Minimerar chansen för fel och sparar lagringsutrymme och skapar optimisation.

### Första normalformen 1NF
Varje cell ska innehålla ett värde
Exempelvis https://gyazo.com/c5217c5f6f24a8b07a1593611bd31ef1
Man gör detta för lättare fylla i och förändra i tabellen, även bidrar med mindre möjlighet att det blir fel.

### Andra normalformen 2NF
All information ska vara kopplad till rätt kolumn, alltså relaterad information i egna tabeller 
https://gyazo.com/64e118a6387a7c1304cc4718551cfa97

### Tredje Normalformen 3NF
Information som hör ihop ska vara i samma tabell.
https://gyazo.com/8842d9f1ca6b36bdaf196c26e33870c0 


## SQL Joins

### Join
man hämtar saker från andra tabeller, man kan lagra datan i olika tabeller sedan kombinera dessa efter behov. 
https://gyazo.com/f48db1686e91cc8478b55d63cae6896c - kontext bild för saker under.
Inner join, returnerar värde som har matchande rader med villkor och kombinera, ex bara värde med PK eller FK
left outer join, returnerar alla värde från vänsta table och matchande från höger
right outer samma sak fast med höger ist för vänster
full outer join, returnerar alla värde där det finns en match från både vänster o höger.

### view
virtuell tabell baserad på resultatet av en sql fråga, lagras inte som data utan körs vid använding
säkerhet fördelar, begeränsar åtkomst till känslig data. man kan också filtrera vad man ska se i db.
syntax https://gyazo.com/34eaf318734cce0d909aa549612b6f75
CREATE VIEW namn AS select ... 
bara för läsa information 

### express
ramverk för api, ger möjlighet för server (localhost:x) 

```js
const express = require(`express`)
// importerar in express och server fil
const app = express()
//skapar const för express kör
app.listen(8000, () => {
    console.log(`server is running`)
});
// startar servern

app.get(`/`, (req,res) => {
    res.send(`hello testing`);
});
// visar text på localserver
```

### Middlewares
Funktioner som körs mellan att en req tas emot av servern och en respons skickas tillbaka, man skapar metoder och anropar en middleware som en parameter så körs den automatiskt.
Man kan anvanda middlewares för spara en token ex för hålla sig inloggad, eller skapa loggar, eller för att komma till en endpoint.

### request body
enkryption i url och reducerar kod, https://gyazo.com/80a380756eea6f6dacb362167a925a27

## Nils del 10/2
Node - en kompliator för js, möjligheten att köra js på datorn utanför chrome, vi fick även package manager för att installera olika delar för projectet, eg Better-SqLite, biblotek alltså.

Express - ger oss möjlighet att server, ger oss även http request alltså en komunikations väg, fråga => svar.

### joins fast nils
En join är en sort SELECT, vad det är att man kollar på två tabeler samtidigt, 

kod del,
SELECT orders.ordersId, customers.customerName, orders.orderDate 
FROM orders
INNER JOIN customer ON orders.customerId=customer.customerId;

Vi vill titta på bla bla nla från orders och customer kör JOIN på orders, vi får bara rader där det finns gemensamma nämnaren av orders som är att en kund finns. iom order finns inte utan customer

SELECT customers.customerName, orders.orderId 
FROM customer
LEFT JOIN orders
ON customers.customerId=orders.customerId

här får vi alla customer men det spelar ingen roll om de har en order eller inte.
Ändrar man till RIGHT JOIN så försvinner kunderna som inte har en order. I grunden är det överlappningen av relationer som är det som spelar roll.

SELECT product.name, product.id FROM products
LEFT JOIN reviews
on product.product_id=review.reviews_name





