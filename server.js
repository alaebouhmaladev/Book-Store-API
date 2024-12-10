const express = require("express");
const Books = require("./routes/books");
// creating server with express module 
const server = express()


// http method get to get home page requist 
server.get('/', (req, res) => {
    res.send("Server Start");
});

/**
 * Express.js middleware to use JSON objects
 * This express.json() make server accpet data from client side or any request with json type
 */
server.use(express.json());

// Book Routes
server.use("/books",Books);

// init port for server 
const PORT = 5050;

// method listen for running server 
server.listen(PORT, () => {
    console.log(`Server Running in localhost:${PORT}`);
})

