import connection from "../db.js";


/**
 * @method GetAllAuthors this method get all authors from database 
 * @returns data from database with json format 
 * @access public
 * @description we use this function to call it avery time need to get all authors from database
 */
export function GetAllAuthors() {

    // Sql query to get all authors from authors table  
    const q = `SELECT * FROM Authors`;

    // Result variable to stock data return from query 
    return connection.query(q, (error, res, fields) => {
        if (error) {
            throw error;
        }
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
    const q = `select * from authors where authorId = ${id}`;

    if (query) {
        // Result variable to stock data return from query
        const Result = connection.query(q, (error, res, fields) => {
            if (error) {
                console.log(error)
            }
            return res;
        })

        return Result;
    }

    return "Author not found!";

}


