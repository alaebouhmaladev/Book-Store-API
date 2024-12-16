import connection from "../db.js";

/**
 * @method GetAllBooks this method get all books from database 
 * @returns data from database with json format 
 * @access public
 * @description we use this function to call it every time need to get all books from database
 */

export function GetAllBooks() {

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

export function GetBookById(id) {

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


/**
 * @method CreateNewBook() 
 * @return data from database with json fromat 
 * @access public
 * @description use this method to insert a book in books table 
 */

export function CreateNewBook(obj) {

    // sql query to insert a new book in books tables 
    const q = `INSERT INTO Books (title,description,publishedDate,authorId,price,createdAt) VALUES(?,?,?,?,?,?)`;

    // use this varbal to stock current date 
    let currentDate = new Date();

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        connection.query(q,
            [
                obj.title,
                obj.description,
                obj.publishedDate,
                obj.authorId,
                obj.price,
                currentDate

            ], (error, res) => {
                if (error) {
                    return reject(error);
                }
                resolve(res);
            })
    });
}


/**
 * @method UpdateBook() 
 * @return data from database with json fromat 
 * @access public
 * @description use this method to update a book in books table 
 */

export function UpdateBook(obj) {

    // sql query to update a book in books tables using bookId
    const q = `UPDATE Books SET title = ?, description = ?, publishedDate = ?, authorId = ?, price = ? WHERE bookId = ?`;

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        connection.query(q,
            [
                obj.title,
                obj.description,
                obj.publishedDate,
                obj.authorId,
                obj.price,
                obj.id
            ], (error, res) => {
                if (error) {
                    return reject(error);
                }
                resolve(res);
            }
        );
    })

}


/**
 * @method DeleteBook() 
 * @access public
 * @description use this method to Delete a book from books table using bookId
 */

export function DeleteBook(id) {

    // sql query to Delete a book from tables using bookId
    const q = `DELETE FROM Books WHERE bookId = ?`;

    // use Promise method have to params resolve return result and reject return error 
    return new Promise((resolve, reject) => {
        connection.query(q, [id], (error, res) => {
            if (error) {
                return reject(error);
            }
            resolve(res);
        });
    });
}