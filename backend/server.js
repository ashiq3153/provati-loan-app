const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const params = [username, password];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (row) {
            res.json({
                "message": "success",
                "data": {
                    id: row.id,
                    username: row.username
                }
            })
        } else {
            res.status(401).json({ "error": "Invalid username or password" });
        }
    });
});

// Create a new loan
app.post('/api/loans', (req, res) => {
    const { userId, amount, purpose } = req.body;
    const insert = 'INSERT INTO loans (userId, amount, purpose, status) VALUES (?,?,?,?)';
    const params = [userId, amount, purpose, 'Pending'];
    db.run(insert, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                id: this.lastID,
                userId,
                amount,
                purpose,
                status: 'Pending'
            }
        });
    });
});

// Get loans by userId
app.get('/api/loans/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM loans WHERE userId = ?";
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});


// ADMIN: Get all loans with user data
app.get('/api/admin/loans', (req, res) => {
    const sql = `
        SELECT loans.*, users.username 
        FROM loans 
        JOIN users ON loans.userId = users.id
        ORDER BY loans.id DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// ADMIN: Update loan status
app.patch('/api/admin/loans/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = "UPDATE loans SET status = ? WHERE id = ?";
    db.run(sql, [status, id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "changes": this.changes
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
