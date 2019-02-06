import express from 'express';
import * as ReimbDao from '../dao/reimbursement.dao';
import { Reimbursement } from '../models/reimbursement';

export const reimbRouter = express.Router();

// submit reimbursement
reimbRouter.post('/reimbursements', async (req, res) => {
    console.log(req.params);
    try {
        // TODO
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

// /status/:statusId - fnd remibursement by status
reimbRouter.get('/status/:statusId', async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.statusId;
    // +'1' - will convert to number
    try {
        const reimb = await ReimbDao.findByStatus(idParam);
        res.json(reimb);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

reimbRouter.get('/author/userId/:userId', async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.userId;
    // +'1' - will convert to number
    try {
        const reimb = await ReimbDao.findByUser(idParam);
        res.json(reimb);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
