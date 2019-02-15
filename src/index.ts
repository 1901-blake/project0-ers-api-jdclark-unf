import express, { NextFunction } from 'express';
import bodyParser, { json } from 'body-parser';
import { userRouter } from './routers/user.router';
import session from 'express-session';
import { loginRouter } from './routers/login.router';
import { reimbRouter } from './routers/reimbursement.router';
import { dirname } from 'path';

const app = express();

// CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', `http://localhost:3000`);
//  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//  res.header('Access-Control-Allow-Credentials', 'true');
//  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//  next();
// });

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json);

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
// Root directory
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/auth.html');
});

// Login
app.post('/login', (req, res) => {
    console.log(res.statusCode);
});

// Find Users
app.get('/users', (req, res) => {
  console.log(res.statusCode);
});

// Find Users By Id
app.get('/users/:id', (req, res) => {
  console.log(res.statusCode);
});

// Update User
app.patch('/users', (req, res) => {
  console.log(res.statusCode);
});

// Find Reimbursements By Status
app.get('/reimbursements/status/:statusId', (req, res) => {
  console.log(res.statusCode);
});

// Find Reimbursements By User
app.get('/reimbursements/author/userId/:userId', (req, res) => {
  console.log(res.statusCode);
});

// Submit Reimbursement
app.post('/reimbursements', (req, res) => {
  console.log(res.statusCode);
});

// Update Reimbursement
app.patch('/reimbursements', (req, res) => {
  console.log(res.statusCode);
});

// Start server
app.listen(3000);
console.log(`Server started at http://localhost:3000`);