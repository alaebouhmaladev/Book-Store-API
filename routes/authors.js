import express from "express";
import Joi from "joi";
import { GetAllAuthors, GetAuthorById, CreateNewAuthor, UpdateAuthor } from "../models/Authors.js";


// init router from express.Router Method 
const Authors = express.Router();

const authors = [
    {
        id: 1,
        firstName: "Alae",
        lastName: "Bouhmala",
        Image: "defualt-image.png",
    },
    {
        id: 2,
        firstName: "Nabil",
        lastName: "Bouhmala",
        Image: "defualt-image.png",
    },
    {
        id: 3,
        firstName: "omar",
        lastName: "zlifi",
        Image: "defualt-image.png",
    },
];

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
        res.status(200).json(result);
    } catch (error) {
        console.log('Error Getting author by id:', error);
        res.status(500).json({ error : 'Failed to fetch author by id'});
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
        res.status(201).json({ message: "Author added successfully!"})
    } catch (error) {
        console.log('Error to Add author:', error);
        res.status(500).json({ error : 'Internal server error. Failed to add author.'});
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
        id:result[0].authorId,
        firstName: req.body.firstName ? req.body.firstName : result[0].firstName,
        lastName: req.body.lastName ? req.body.lastName : result[0].lastName,
        Image: req.body.Image ? req.body.Image : result[0].imageUrl,
    };

    try {
        const updateResult = await UpdateAuthor(author);
        res.status(201).json({ message: "Author Updated successfully!"})
    } catch (error) {
        console.log('Error to update author:', error);
        res.status(500).json({ error : 'Internal server error. Failed to update author.'});
    }
});

/**
 * @description Delete author by id
 * @route /authors/:id
 * @method Delete
 * @access public
 */
Authors.delete("/:id", (req, res) => {
    const author = authors.find(auth => auth.id === parseInt(req.params.id));

    if (!author) {
        return res.status(400).json({ message: "Author not found!" });
    }

    res.status(200).json({ message: "Author Deleted", author });
});


/**
 * @description Validate data from client side
 * @method validateCreateAuthor()
 * @param obj json object from request body 
 */
function validateCreateAuthor(obj) {

    // schema validation template using joi 
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        Image: Joi.string().trim().required(),
    });

    // Return validation result 
    return schema.validate(obj);
}


/**
 * @description Validate data from client side
 * @method validateUpdateAuthor()
 * @param obj json object from request body 
 */
function validateUpdateAuthor(obj) {

    // schema validation template using joi 
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        Image: Joi.string().trim(),
    });

    // Return validation result 
    return schema.validate(obj);
}


// module.exports = router;

export default Authors;