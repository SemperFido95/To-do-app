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
router.put('/:id', (req, res) => {
    console.log('In PUT request for /todo');
    let taskId = req.params.id;
    let taskToEdit = req.body;
    let queryText = `UPDATE tasks SET complete = $1 WHERE id = $2;`;
    pool.query(queryText, [taskToEdit.complete, taskId]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in PUT ${error}`);
        res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    console.log('In DELETE request for /todo');
    let deleteId = req.params.id;
    let queryText = 'DELETE FROM tasks WHERE id = $1;';
    pool.query(queryText, [deleteId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;
