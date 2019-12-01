const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let mongoDatabase = null;

async function initializeDatabase() {
    const mongoMemoryServer = new MongoMemoryServer();
    const mongoDatabaseUrl = await mongoMemoryServer.getConnectionString();
    const dbConnection = await MongoClient.connect(mongoDatabaseUrl, {useNewUrlParser: true});
    mongoDatabase = dbConnection.db();
}

async function getDatabase() {
    if (!mongoDatabase) await initializeDatabase();
    return mongoDatabase;
}

module.exports = {
    getDatabase,
    initializeDatabase,
};