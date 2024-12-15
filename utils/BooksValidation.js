 import Joi from "joi";


 // Validation with joi Creation of object 
export function validateCreateBook(obj) {

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
export function validateUpdateBook(obj) {

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