import express from "express";
import { validateCreateBook, validateUpdateBook } from "../utils/BooksValidation.js";
import { CreateNewBook, DeleteBook, GetAllBooks, GetBookById, UpdateBook } from "../models/Books.js";
import { GetAuthorById } from "../models/Authors.js";


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
Books.get('/', async (req, res) => {
    try {
        const result = await GetAllBooks();
        if (result.length === 0) {
            return res.status(404).json({ message: "Books not Found!" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
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
Books.get('/:id', async (req, res) => {

    try {
        // return Book from data getting by Book id 
        const result = await GetBookById(parseInt(req.params.id));
        if (result.length == 0) {
            return res.status(404).json({ message: 'Book Not Found!' })
        }
        res.status(200).json(result);
    } catch (error) {
        console.log('Error Getting Book by id:', error);
        res.status(500).json({ error: 'Failed to fetch Book by id' });
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
Books.post('/', async (req, res) => {

    const { error } = validateCreateBook(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message)
    }
    // check if author not found we can't insert new book whitout found author 
    const author = await GetAuthorById(parseInt(req.body.authorId));
    if (author.length === 0) {
        return res.status(404).json({ message: "Author not Found!" })
    }

    const newBook = {
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        publishedDate: req.body.publishedDate,
        authorId: req.body.authorId,
    };

    try {
        const result = await CreateNewBook(newBook);
        res.status(201).json({ message: "Book added successfully!" })
    } catch (error) {
        console.log('Error to Add Book:', error);
        res.status(500).json({ error: 'Internal server error. Failed to add Book.' });
    }

});

/**
 * 
 * @description Update A Book 
 * @route /books/:id
 * @method PUT
 * @access public 
 */
Books.put("/:id", async (req, res) => {

    const { error } = validateUpdateBook(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const result = await GetBookById(parseInt(req.params.id));

    const book = {
        id: parseInt(req.params.id),
        title: req.body.title ? req.body.title : result[0].title,
        description: req.body.description ? req.body.description : result[0].description,
        price: parseFloat(req.body.price) ? parseFloat(req.body.price) : result[0].price,
        publishedDate: req.body.publishedDate ? req.body.publishedDate : result[0].publishedDate,
        authorId: req.body.authorId ? req.body.authorId : result[0].authorId,
    }

    try {
        const Book = await UpdateBook(book);
        res.status(200).json({ message : "Book Updated Successfully"});
    } catch (error) {
        console.log('Error to Update Book:', error);
        res.status(500).json({ error: 'Internal server error. Failed to Update Book.' });
    }
});


/**
 * 
 * @description Delete Book With Id
 * @route /books/:id
 * @method Delete
 * @access public 
 */
Books.delete("/:id", async (req, res) => {

    const Book = await GetBookById(parseInt(req.params.id));

    // check if found book in books table using bookId
    if(Book.length === 0 ){
        return res.status(404).json({ message : "Book Not Found!"});
    }

    try {
        
        const result = await DeleteBook(parseInt(req.params.id));
        res.status(200).json({ message : "Book Deleted Successfully"});

    } catch (error) {
        console.log('Error to Delete Book: ', error);
        res.status(500).json({ error: 'Internal server error. Failed to Delete Book.' });
    }
});


// module.exports = router;

export default Books;