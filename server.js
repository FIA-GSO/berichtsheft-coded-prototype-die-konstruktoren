const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

// Path to your SQLite database
const dbPath = path.join(__dirname, 'js/mydatabase.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname)))

// Route to handle login requests
app.post('', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.get(query, [email, password], (err, row) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Database error' });
        } else if (row) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages", 'login.html'))
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
