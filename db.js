import mysql from "mysql2";
import dotenv from "dotenv";

// init dotenv config for using .env params 
dotenv.config({ path: './.env' });

// create connection params using createConnection method 
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the database!');
    // console.log(connection.query("SELECT * FROM Authors").values);
});

export default connection;
