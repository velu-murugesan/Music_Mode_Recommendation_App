const { MongoClient } = require("mongodb");

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "music_mode_db";

let db = null;

async function connectToMongoDB() {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();

    db = client.db(DB_NAME);
    console.log("MongoDB connected successfully");

    return db;
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1); 
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToMongoDB first.");
  }
  return db;
}

module.exports = {
  connectToMongoDB,
  getDB
};
