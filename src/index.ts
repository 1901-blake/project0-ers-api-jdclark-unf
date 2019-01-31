import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.router';
import session from 'express-session';
import { authRouter } from './routers/auth.router';
import { reimbRouter } from './routers/reimbursement.router';
import { resolve } from 'path';
import { User } from './models/user';

const app = express();

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path} and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
  secret: process.env.Secret,
  cookie: { secure: false },
  resave: false,
  saveUnitialized: false
};
// prior to this req.sesssion is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

// Define router middleware
app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimbRouter);

/* Endpoints */
// Login
app.post('/login', (req, res) => {
  const user = req.body;
  console.log(user);
  res.sendStatus(201);
})

// Find Users
app.get('/users', (req, res) => {
  res.send('?');
})

// Find Users By Id
app.get('/users/:id', (req, res) => {
  res.send('?');
});

// Update User
app.patch('/users', (req, res) => {
  res.send('?');
});

// Find Reimbursements By Status
app.get('/reimbursements/status/:statusId', (req, res) => {
  res.send('?');
});

// Find Reimbursements By User
app.get('/reimbursements/author/userId/:userId', (req, res) => {
  res.send('?');
});

// Submit Reimbursement
app.get('/reimbursements', (req, res) => {
  res.sendStatus(201);;
});

// Update Reimbursement
app.patch('/reimbursements', (req, res) => {
  res.send('?');
});

app.listen(3000);
console.log('application started on port: 3000');