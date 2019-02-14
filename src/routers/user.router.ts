import express from 'express';
import * as UserDao from '../dao/user.dao';

export const userRouter = express.Router();

// ../users - find all
userRouter.get('', async (req, res) => {
  // Determine if 1) session user is logged in and 2) has required permissions
  if (req.session.user && req.session.user.role < 3) {
    // If all is well, retreive and display list of users
    try {
      const userList = await UserDao.findAll();
      res.json(userList);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.status(401);
    res.send('The incoming token has expired');
  }
});

// ../users/:id - find by id
userRouter.get('/:id', async (req, res) => {
  console.log(req.params);
  const idParam = +req.params.id; // +'1' - will convert to number
  // Determine if 1) session user is logged in and 2) has required permissions
  if (req.session.user && (req.session.user.role < 3 || req.session.user.userId === idParam)) {
    try {
      const user = await UserDao.findById(idParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.status(401);
    res.send('The incoming token has expired');
  }
});

// ../users - update user
userRouter.patch('', async (req, res) => {
  // Determine if 1) session user is logged in and 2) has required permissions
  if (req.session.user && req.session.user.role === 1) {
    try {
      const user = await UserDao.update(req.body);
      res.status(201);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.status(401);
    res.send('The incoming token has expired');
  }
});