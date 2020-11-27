const express = require('express');
const router = express.Router();
const { sqlCommands } = require('../sqlCommands/commands');
const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./taskManage.db');

router.get('/users', (req, res) => {
  let command = sqlCommands('ALL');
  DB.all(command, (error, rows) => {
    if (error) return res.send(error);
    res.send(rows);
  });
});

router.post('/signup', (req, res) => {
  const { email, first, last } = req.body;
  let command = sqlCommands('INSERT', { email, first, last });

  DB.run(command, (error) => {
    if (error) return res.send(error);
    res.send('heyy');
  });
  DB.close;
});

module.exports = router;
