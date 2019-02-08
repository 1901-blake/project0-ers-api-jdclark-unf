import express from 'express';
import { User } from '../models/user';
import * as UserDao from '../dao/user.dao';
import { Session } from 'inspector';

export const userRouter = express.Router();

// ../users - find all
userRouter.get('', async (req, res) => {
  try {
    const users = await UserDao.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// ../users/:id - find by id
userRouter.get('/:id', async (req, res) => {
  console.log(req.params);
  const idParam = +req.params.id;
  // +'1' - will convert to number
  try {
    const user = await UserDao.findById(idParam);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// ../users - update user
userRouter.patch('', async (req, res) => {
  try {
    const user = await UserDao.update(req.body);
    res.sendStatus(201);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});