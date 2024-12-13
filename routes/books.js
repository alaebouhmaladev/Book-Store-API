import express from "express";
import Joi from "joi";

// init Router using express.Router() Method 
const Books = express.Router();


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

/**
 * @desc Get All Books 
 * @route /Books/
 * @method get 
 * @access public
 * The JSON.stringify() static method converts a JavaScript value to a JSON string
 * http method to get all books with route /books
 */
Books.get('/', (req, res) => {
    res.send(JSON.stringify(books));
})

/**
 * @description Get Book By Id 
 * @route /books/:id
 * @method Get
 * @access public
 * http method to get special object filter by id 
 * we use array.find for find object with id and we use Lambda expretion
 * we use parseint to convert string to integer 
 */
Books.get('/:id', (req, res) => {
    const book = books.find(x => x.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: "Book not Found" })
    }
});

/**
 * @description Create New Book After Validation 
 * @route /books/
 * @method POST
 * @access public
 * http post method to accpet data from client side 
 * we create new object here and after validation with schema create 
 * we use Joi module for creation a schema for validation 
 */
Books.post('/', (req, res) => {

    const { error } = validateCreateObject(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const newBook = {
        "id": books.length + 1,
        "author": req.body.author,
        "description": req.body.description,
        "price": parseFloat(req.body.price),
        "cover": req.body.cover,
        "name": req.body.name,
    };
    books.push(newBook);
    res.status(200).json({ message: "Book Added" })

});

/**
 * 
 * @description Update A Book 
 * @route /books/:id
 * @method PUT
 * @access public 
 */
Books.put("/:id", (req, res) => {
    const { error } = validateUpdateObject(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const BookToUpdate = books.find(book => book.id === parseInt(req.params.id));

    if (BookToUpdate) {
        res.status(200).json({ message: "Book Has Been Updated" })
    }
    else {
        res.status(404).json({ message: "Book Not Found!" })
    }
});


/**
 * 
 * @description Delete A Book With Id
 * @route /books/:id
 * @method Delete
 * @access public 
 */
Books.delete("/:id", (req, res) => {

    const BookToDelete = books.find(book => book.id === parseInt(req.params.id));

    if (BookToDelete) {
        res.status(200).json({ message: "Book Has Been Deleted" })
    }
    else {
        res.status(404).json({ message: "Book Not Found!" })
    }
});

// Validation with joi Creation of object 
function validateCreateObject(obj) {

    /**
     * we create schema for validate object from client side and we create params
     */
    const schema = Joi.object({
        author: Joi.string().trim().min(4).max(50).required(),
        description: Joi.string().trim().min(3).max(500).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().required(),
        name: Joi.string().trim().min(4).max(50).required(),
    });

    /**
     * we use schema.validate() and give it body from request like parameter and this method 
     * return error if object not valide and if valide retune null 
     */
    return schema.validate(obj);

}

// Validation with joi updating of object 
function validateUpdateObject(obj) {

    /**
     * we create schema for validate object from client side and we create params
     */
    const schema = Joi.object({
        author: Joi.string().trim().min(4).max(50),
        description: Joi.string().trim().min(3).max(500),
        price: Joi.number().min(0),
        cover: Joi.string().trim(),
        name: Joi.string().trim().min(4).max(50),
    });

    /**
     * we use schema.validate() and give it body from request like parameter and this method 
     * return error if object not valide and if valide retune null 
     */
    return schema.validate(obj);

}

// module.exports = router;

export default Books;