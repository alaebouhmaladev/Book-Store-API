const express = require("express");

// creating server with express module 
const server = express()

// Apply Middlweares 
server.use(express.json());

// init port for server 
const PORT = 5050;

const books = [
    {
        "id": 1,
        "author": "Marie Marvin",
        "description": "Possimus quaerat corrupti qui tenetur consequatur qui quidem maiores. Voluptas reiciendis laborum qui in in. Accusamus consequatur dolor et ex dolores minus. Quo eius et minima dicta quia beatae.",
        "price": 37.33,
        "cover": "http://placeimg.com/640/480",
        "name": "Book of Life"
    },
    {
        "id": 2,
        "author": "Alae Bhm",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, commodi magni at ex culpa! Perferendis vel atque quibusdam id.",
        "price": 17.33,
        "cover": "http://placeimg.com/640/480",
        "name": "Ecommerce with Alae"
    },
    {
        "id": 3,
        "author": "Alae Test",
        "description": "Qui aliquid inventore dicta corrupti voluptatem, fuga mollitia aut illum adipisci. Maxime reiciendis soluta distinctio temporibus officia.",
        "price": 47.33,
        "cover": "http://placeimg.com/640/480",
        "name": "Python"
    },
    {
        "id": 4,
        "author": "John Doe",
        "description": "Accusantium laborum iure tempora neque hic quo. Quisquam nulla eveniet earum omnis consequatur velit.",
        "price": 29.99,
        "cover": "http://placeimg.com/640/480",
        "name": "Mastering React"
    },
    {
        "id": 5,
        "author": "Jane Smith",
        "description": "Facilis temporibus voluptatum dolorum! Nobis ipsum perferendis nemo harum ut maiores, pariatur delectus asperiores quae.",
        "price": 25.50,
        "cover": "http://placeimg.com/640/480",
        "name": "Vue.js Essentials"
    },
    {
        "id": 6,
        "author": "Alex Turner",
        "description": "Dicta facere tempora ipsam veritatis officia sunt, voluptatem cupiditate nostrum blanditiis nisi voluptate dolore harum.",
        "price": 19.95,
        "cover": "http://placeimg.com/640/480",
        "name": "Learning Node.js"
    },
    {
        "id": 7,
        "author": "Olivia Johnson",
        "description": "Consectetur adipisicing elit. Aperiam odio possimus porro obcaecati! Assumenda autem libero dolorem fugiat eveniet.",
        "price": 42.99,
        "cover": "http://placeimg.com/640/480",
        "name": "JavaScript for Beginners"
    },
    {
        "id": 8,
        "author": "Emma Brown",
        "description": "Labore eligendi unde minima quidem eaque laborum sint aspernatur! Distinctio recusandae laudantium, quaerat tempora voluptatem.",
        "price": 22.45,
        "cover": "http://placeimg.com/640/480",
        "name": "CSS Deep Dive"
    },
    {
        "id": 9,
        "author": "William Davis",
        "description": "Temporibus vero ab doloribus incidunt reiciendis cumque voluptatem mollitia aut suscipit ducimus necessitatibus dignissimos!",
        "price": 35.60,
        "cover": "http://placeimg.com/640/480",
        "name": "MySQL Basics"
    },
    {
        "id": 10,
        "author": "Sophia Wilson",
        "description": "Ratione iusto culpa explicabo laboriosam aliquid quam? Ipsam inventore at distinctio officia, sapiente exercitationem.",
        "price": 39.99,
        "cover": "http://placeimg.com/640/480",
        "name": "Data Structures with Python"
    }
];

// http method get to get home page requist 
server.get('/', (req, res) => {
    res.send("Server Start");
});


/**
 * The JSON.stringify() static method converts a JavaScript value to a JSON string
 * http method to get all books with route /books
 */
server.get('/books', (req, res) => {
    res.send(JSON.stringify(books));
})

/**
 * http method to get special object filter by id 
 * we use array.find for find object with id and we use Lambda expretion
 * we use parseint to convert string to integer 
 */
server.get('/books/:id', (req, res) => {
    const book = books.find(x => x.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: "Book not Found" })
    }

});

/**
 * 
 */
server.post('/books', (req,res) => {
    const newBook = {
        "id" : books.length + 1 ,
        "author" : req.body.author,
        "description": req.body.author,
        "price": parseFloat(req.body.price),
        "cover": req.body.cover,
        "name":req.body.name,
    }

    books.push(newBook);
    res.status(200).json({message : "Book Added"})
});

// method listen for running server 
server.listen(PORT, () => {
    console.log(`Server Running in localhost:${PORT}`);
})

