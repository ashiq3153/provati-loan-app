const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            )`, (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    const insert = 'INSERT OR IGNORE INTO users (username, password) VALUES (?,?)'
                    db.run(insert, ["user", "password"])
                }
            });

            db.run(`CREATE TABLE IF NOT EXISTS loans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                amount REAL,
                purpose TEXT,
                status TEXT,
                FOREIGN KEY (userId) REFERENCES users(id)
            )`);
        });
    }
});

module.exports = db;
