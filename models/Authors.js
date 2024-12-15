import connection from "../db.js";


/**
 * @method GetAllAuthors this method get all authors from database 
 * @returns data from database with json format 
 * @access public
 * @description we use this function to call it avery time need to get all authors from database
 */
export function GetAllAuthors() {

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        // SQL query to get all authors from the authors table 
        const q = `SELECT * FROM Authors`;
        connection.query(q, (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        });
    });
}

/**
 * @method GetAuthorById
 * @param id author id 
 * @description use this method when need to get author or any info about author 
 * this method return a object json format with author data  
 */
export function GetAuthorById(id) {

    // sql query to get author by id from authors table
    const q = `select * from authors where authorId = ?`;

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        connection.query(q, [id], (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        })
    });
}

/**
 * @method CreateNewAuthor() 
 * @param obj author object with all fileds 
 * @description use this method to insert in author in authors table 
 */

export function CreateNewAuthor(obj) {

    // sql query to insert a new author colmun in authors tables 
    const q = `INSERT INTO Authors (firstName,lastName,imageUrl,createdAt) VALUES(?,?,?,?)`;

    // use this varbal to stock current date 
    let currentDate = new Date();

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        connection.query(q, [obj.firstName, obj.lastName, obj.Image, currentDate], (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        });
    });

}

/**
 * @method UpdateAuthor()
 * @param obj author object with updated fileds 
 * @description use this method to update author in authors table 
 */
export function UpdateAuthor(obj) {

    // sql query to update author colmun in authors table 
    const q = `UPDATE Authors SET firstName = ?, lastName = ?, imageUrl = ? WHERE authorId = ?`;

    // use Promise method have to params resolve return result and reject return error
    return new Promise((resolve, reject) => {
        connection.query(q, [obj.firstName, obj.lastName, obj.Image, obj.id], (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        });
    });
}


/**
 * @method DeleteAuthor() 
 * @param id author id for delete a special author 
 * @description use this method to Delete author by id from authors table 
 */

export function DeleteAuthor(id) {

    // sql query to delete author from authors table with authorId
    const q = `DELETE FROM Authors WHERE authorId = ?`;

    // use Promise method have to params resolve return result and reject return error
    return new Promise((resolve, reject) => {
        connection.query(q, [id], (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        })
    })

}
