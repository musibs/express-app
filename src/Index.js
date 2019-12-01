const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {initializeDatabase} = require('./database/db');
const {addBook, getBooks, deleteBook, updateBook} = require('./endpoints');

const app = express();

const books = [
    {title: 'Js Primer'}
];
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

// defining an endpoint to return all books
app.get('/', async (req, res) => {
    res.send(await getBooks());
});

app.post('/', async (req, res) => {
    const newBook = req.body;
    await addBook(newBook);
    res.send({ message: 'Book added.' });
});

app.delete('/:id', async (req, res) => {
    await deleteBook(req.params.id);
    res.send({ message: 'Book deleted.' });
});

app.put('/:id', async (req, res) => {
    const updatedBook = req.body;
    await updateBook(req.params.id, updateBook);
    res.send({ message: 'Book updated.' });
});

initializeDatabase().then(async () => {
    await addBook({title: 'You Don\'t Know Js!'});
    app.listen(9001, () => {
        console.log('listening on port 9001');
    });
})
