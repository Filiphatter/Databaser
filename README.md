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

- *
väljer alla

SELECT first_name, last_name, FROM patients WHERE gender="m"

SELECT first_name, last_name, 
FROM patients 
WHERE gender="m"
