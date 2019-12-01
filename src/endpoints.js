const {getDatabase} = require('./database/db');
const {ObjectID} = require('mongodb');

const collectionName = 'books';

async function addBook(newBook) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(newBook);
    return insertedId;
}

async function getBooks() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteBook(bookId) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(bookId),
    });
}

async function updateBook(bookId, book) {
    const database = await getDatabase();
    delete book._id;
    await database.collection(collectionName).update(
        { _id: new ObjectID(bookId), },
        {
            $set: {
                ...book,
            },
        },
    );
}

module.exports = {
    addBook,
    getBooks,
    deleteBook,
    updateBook
};