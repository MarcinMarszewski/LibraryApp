const express = require('express');
const bodyParser = require('body-parser');

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const loansRouter = require('./routes/loans');
const categoriesRouter = require('./routes/categories');


const app = express();
const port = 5001;

app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/loans', loansRouter);
app.use('/categories', categoriesRouter);



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});	
