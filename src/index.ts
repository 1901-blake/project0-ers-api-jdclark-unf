import express, { NextFunction } from 'express';
import bodyParser, { json } from 'body-parser';
import { userRouter } from './routers/user.router';
import session from 'express-session';
import { loginRouter } from './routers/login.router';
import { reimbRouter } from './routers/reimbursement.router';

const app = express();

app.use('/', express.static('/public'));

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
  saveUninitialized: false
};
// prior to this req.session is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

// Register router middleware
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimbRouter);

// Endpoints (i.e. URL paths)
// Login
app.post('/login', (req, res) => {
  res.sendStatus(200);
});

// Find Users
app.get('/users', (req, res) => {
  res.sendStatus(200);
});

// Find Users By Id
app.get('/users/:id', (req, res) => {
  res.sendStatus(200);
});

// Update User
app.patch('/users', (req, res) => {
  res.sendStatus(200);
});

// Find Reimbursements By Status
app.get('/reimbursements/status/:statusId', (req, res) => {
  res.sendStatus(200);
});

// Find Reimbursements By User
app.get('/reimbursements/author/userId/:userId', (req, res) => {
  res.sendStatus(200);
});

// Submit Reimbursement
app.post('/reimbursements', (req, res) => {
  res.sendStatus(201);
});

// Update Reimbursement
app.patch('/reimbursements', (req, res) => {
  res.sendStatus(201);
});

// Start server
app.listen(3000);
console.log(`Server started at http://localhost:3000`);