import Joi from "joi";


/**
 * @description Validate data from client side
 * @method validateCreateAuthor()
 * @param obj json object from request body 
 */
export function validateCreateAuthor(obj) {

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
export function validateUpdateAuthor(obj) {

    // schema validation template using joi 
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        Image: Joi.string().trim(),
    });

    // Return validation result 
    return schema.validate(obj);
}