import express from "express";
import ejs from "ejs";
import axios from "axios";
import pg from "pg";

const SERVER_PORT = 3000;
var app = express();

app.set("view engine", ejs);

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const db = new pg.Client({        
    user: "postgres",                        
    host: "localhost",                        
    database: "media_review",     
    password: "D@uxanh2",        
    port: 5432                                
}); 

db.connect();

app.get("/", (req, res) => {                                 
    res.render("index.ejs");                   
});

async function getBooks() {
    const query = "SELECT b.name, b.author, b.isbn, r.rating, r.abstract\n" + 
                    "FROM books AS b\n" +
                    "INNER JOIN review AS r\n" +
                    "ON b.inventory_id = r.inventory_id;"

    console.log(query);

    const result = await db.query(query);
    // console.log(result.rows);

    return result.rows;
}

app.get("/books", async (req, res) => {
    const books = await getBooks();
    let book_covers = [];
    // console.log(books);

    try {
        books.forEach(element => {
            console.log(element);
            element.cover_url = `https://covers.openlibrary.org/b/isbn/${element.isbn}-L.jpg`;
        });
    } catch (error) {
        console.error(error);
    }
    
    res.render("books.ejs", {books: books});
});

app.get("/games", (req, res) => {

});

app.get("/films", (req, res) => {

});

app.get("/news", (req, res) => {

});

app.get("/read_review", (req, res) => {
    
});

app.listen(SERVER_PORT, () => {
    console.log("SERVER LISTENING ON PORT " + SERVER_PORT);
})