import express from "express";
import { GetAllAuthors, GetAuthorById, CreateNewAuthor, UpdateAuthor, DeleteAuthor } from "../models/Authors.js";
import { validateCreateAuthor, validateUpdateAuthor } from "../utils/AuthorsValidation.js";


// init router from express.Router Method 
const Authors = express.Router();


/**
 * @description Get All Authors 
 * @route /authors/
 * @method GET
 * @access public
 */
Authors.get("/", async (req, res) => {
    try {
        const result = await GetAllAuthors();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
});

/**
 * @description Get authoer By id 
 * @route /authoer/:id
 * @method GET
 * @access public
 */
Authors.get("/:id", async (req, res) => {

    try {
        // return objcet from data getting by object id 
        const result = await GetAuthorById(parseInt(req.params.id));
        // console.log(result.length);
        if (result.length == 0) {
            return res.status(404).json({ message: 'Author Not Found!' })
        }
        res.status(200).json(result);
    } catch (error) {
        console.log('Error Getting author by id:', error);
        res.status(500).json({ error: 'Failed to fetch author by id' });
    }

})

/**
 * @description Create new Author 
 * @route /authors/
 * @method POST
 * @access public
 * validate data from client side with joi 
 * create new object(author) and return message of succeess 
 */
Authors.post("/", async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message)
    };

    const newAuthor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Image: req.body.Image,
    };

    try {
        const result = await CreateNewAuthor(newAuthor);
        res.status(201).json({ message: "Author added successfully!" })
    } catch (error) {
        console.log('Error to Add author:', error);
        res.status(500).json({ error: 'Internal server error. Failed to add author.' });
    }

});

/**
 * @description Update Author 
 * @route /authors/:id
 * @method PUT
 * @access public
 */
Authors.put("/:id", async (req, res) => {

    const result = await GetAuthorById(parseInt(req.params.id));

    const { error } = validateUpdateAuthor(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    const author = {
        id: result[0].authorId,
        firstName: req.body.firstName ? req.body.firstName : result[0].firstName,
        lastName: req.body.lastName ? req.body.lastName : result[0].lastName,
        Image: req.body.Image ? req.body.Image : result[0].imageUrl,
    };

    try {
        const updateResult = await UpdateAuthor(author);
        res.status(201).json({ message: "Author Updated successfully!" })
    } catch (error) {
        console.log('Error to update author:', error);
        res.status(500).json({ error: 'Internal server error. Failed to update author.' });
    }
});

/**
 * @description Delete author by id
 * @route /authors/:id
 * @method Delete
 * @access public
 */
Authors.delete("/:id", async (req, res) => {

    try {
        const result = await DeleteAuthor(parseInt(req.params.id));
        res.status(200).json({ message: "Author Deleted Successfully!" });
    } catch (error) {
        console.log('Error to delete author: ', error);
        res.status(500).json({ error: 'Internal server error. Failed to delete author' })
    }

});

// module.exports = router;

export default Authors;