const express = require('express');
const router = express.Router();
const { sqlCommands } = require('../sqlCommands/authCommands');
const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./taskManage.db');
const bcrypt = require('bcrypt');
const jwtAuth = require('../middleware/authMiddleware');

// router.get('/users', jwtAuth, (req, res) => {
//   // let command = sqlCommands('ALL');
//   // DB.all(command, (error, rows) => {
//   //   if (error) return res.send(error);
//   //   res.json(rows);
//   // });
//   res.json(req.headers.authorization.split(' ')[1]);
// });

// router.post('/signup', async (req, res) => {
//   let { email, first, last, password } = req.body;
//   const salt = await bcrypt.genSalt();
//   password = await bcrypt.hash(password, salt);
//   let command = sqlCommands('INSERT', { email, first, last, password });

//   DB.run(command, (error) => {
//     if (error) return res.send(error);
//     res.send('heyy');
//   });
//   DB.close;
// });

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.json({ error: 'incomplete' });
//   let command = sqlCommands('EMAIL', { email });
//   DB.get(command, async (error, row) => {
//     if (error) return res.json({ error: 'fetching' });
//     const auth = await bcrypt.compare(password, row.password);
//     if (auth) res.json({ auth });
//     res.json({ error: 'invalid' });
//   });
// });

module.exports = router;
