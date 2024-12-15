import connection from "../db.js";

/**
 * @method GetAllBooks this method get all books from database 
 * @returns data from database with json format 
 * @access public
 * @description we use this function to call it every time need to get all books from database
 */

export function GetAllBooks(){

    // use Promise method have to params resolve return result and reject return error
    return new Promise((resolve, reject) => {
        // SQL query to get all books from the books table 
        const q = `SELECT * FROM Books`;
        connection.query(q, (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        });
    });
}

/**
 * @method GetBookById() 
 * @return data from database with json fromat 
 * @access public
 * @description use this method to get a book by id from books table 
 */

export function GetBookById(id){

    // sql query to get book by id from books table
    const q = `select * from books where bookId = ?`;

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