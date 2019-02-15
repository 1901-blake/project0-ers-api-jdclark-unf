import express from 'express';
import * as ReimbDao from '../dao/reimbursement.dao';

export const reimbRouter = express.Router();

// ../reimbursements - submit reimbursement
reimbRouter.post('', async (req, res) => {
    if (req.session.user) {
        try {
            const input = req.body;
            input.author = req.session.user.userId;
            const reimb = await ReimbDao.submit(input);
            res.status(201);
            res.json(reimb);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    }
});

// ../reimbursements/status/:statusId - fnd remibursement by status
reimbRouter.get('/status/:statusId', async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.statusId; // +'1' - will convert to number
    // Determine if 1) session user is logged in and 2) has required permissions
    if (req.session.user && req.session.user.role < 3) {
        try {
            const reimb = await ReimbDao.findByStatus(idParam);
            res.json(reimb);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        res.status(401);
        res.send('The incoming token has expired');
    }
});

reimbRouter.get('/author/userId/:userId', async (req, res) => {
    // console.log(req.params);
    const idParam = +req.params.userId; // +'1' - will convert to number
    // Determine if 1) session user is logged in and 2) has required permissions
    if (req.session.user && (req.session.user.role < 3 || req.session.user.userId === idParam)) {
        try {
            const reimb = await ReimbDao.findByUser(idParam);
            res.json(reimb);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        res.status(401);
        res.send('The incoming token has expired');
    }
});

// ../reimbursements - update reimbursement
reimbRouter.patch('', async (req, res) => {
    // Determine if 1) session user is logged in and 2) has required permissions
    if (req.session.user && req.session.user.role < 3) {
      try {
        const input = req.body.json;
        input.resolver = req.session.user.userId;
        const reimb = await ReimbDao.update(input);
        res.json(reimb);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    } else {
      res.status(401);
      res.send('The incoming token has expired');
    }
  });