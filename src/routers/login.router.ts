import express from 'express';
import { resolvePtr } from 'dns';

export const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
  if (req.body.username === 'jclark' && req.body.password === 'password') {
    const user = {
      username: req.body.username,
      role: 'admin'
    };
    req.session.user = user;
    res.json(user);
  } else if (req.body.username === 'finman' && req.body.password === 'password1') {
    const user = {
      username: req.body.username,
      role: 'finance-manager'
    };
    req.session.user = user;
    res.json(user);
  } else if (req.body.username === 'noone' && req.body.password === 'letmein') {
    const user = {
      username: req.body.username,
      role: 'associate'
    };
    req.session.user = user;
    res.json(user);
  } else {
    res.sendStatus(401);
  }
});

// loginRouter.get('/info', (req, res) => {
//   res.json(req.session.user);
// });