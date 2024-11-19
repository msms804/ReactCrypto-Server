const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

let database = null;

async function connectDB() {
    try {
        await client.connect();
        console.log("db 연결 성공");
        database = client.db('CryptoProject');
    } catch (error) {
        console.log('db 연결 실패', error)
    }
}

function getDB() {
    if (!database) {
        console.error("데이터베이스가 연결되지 않았습니다.")
        throw new Error('database not connected');
    }
    return database;
}

module.exports = { connectDB, getDB }