import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'res',
});

app.get('/restaurants', (req, res) => {
    const sql = 'SELECT * FROM restaurant';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving restaurants from the database' });
        }
        return res.json(result);
    });
});

app.post('/restaurants', (req, res) => {
    const { name, address, contact } = req.body;
    const sql = 'INSERT INTO restaurant (name, address, contact) VALUES (?, ?, ?)';
    db.query(sql, [name, address, contact], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding restaurant to the database' });
        }
        return res.json({ message: 'Restaurant added successfully' });
    });
});

app.delete('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    const sql = 'DELETE FROM restaurants WHERE id = ?';
    db.query(sql, restaurantId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting restaurant from the database' });
        }
        return res.json({ message: 'Restaurant deleted successfully' });
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
