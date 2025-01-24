const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default XAMPP MySQL user
    password: '', // Default XAMPP MySQL password
    database: 'eshop'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Route to fetch products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to add a product to the cart (dummy functionality)
app.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;
    // Here you can add logic to handle the cart (e.g., store in session or database)
    res.send(`Product ${productId} added to cart`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});