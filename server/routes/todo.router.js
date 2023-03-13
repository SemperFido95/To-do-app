const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log('GET request made for /todo');
    let queryText = 'SELECT * FROM tasks;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in GET ${error}`);
        res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
    console.log('POST request made for /todo');
    let taskToAdd = req.body;
    let queryText = `INSERT INTO tasks (task)
        VALUES ($1);`;
    pool.query(queryText, [taskToAdd.task]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in POST ${error}`);
        res.sendStatus(500);
    });
});

// PUT

// DELETE

module.exports = router;
