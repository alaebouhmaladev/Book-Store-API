import express from "express";
import Joi from "joi";


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
Authors.get("/", (req, res) => {
    res.status(200).json(authors);
});

/**
 * @description Get authoer By id 
 * @route /authoer/:id
 * @method GET
 * @access public
 */
Authors.get("/:id", (req, res) => {

    // return objcet from data getting by object id 
    const author = authors.find(auth => auth.id === parseInt(req.params.id));
    if (!author) {
        return res.status(404).json({ message: "author not found!" });
    }

    res.status(200).json(author);

})

/**
 * @description Create new Author 
 * @route /authors/
 * @method POST
 * @access public
 * validate data from client side with joi 
 * create new object(author) and return message of succeess 
 */
Authors.post("/", (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message)
    };

    const newAuthor = {
        id: authors.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Image: req.body.Image,
    };

    authors.push(newAuthor);
    res.status(201).json({ message: "Author added!", obj: newAuthor })
});

/**
 * @description Update Author 
 * @route /authors/:id
 * @method PUT
 * @access public
 */
Authors.put("/:id", (req, res) => {
    const { error } = validateUpdateAuthor(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    const author = authors.find(auth => auth.id === parseInt(req.params.id));

    if (!author) {
        return res.status(400).json({ message: "Author Not Found!" });
    }

    res.status(200).json({ message: "Author updated" })
});

/**
 * @description Delete author by id
 * @route /authors/:id
 * @method Delete
 * @access public
 */
Authors.delete("/:id", (req,res) => {
    const author = authors.find(auth => auth.id === parseInt(req.params.id));

    if(!author){
        return res.status(400).json({message : "Author not found!"});
    }

    res.status(200).json({message : "Author Deleted" , author});
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