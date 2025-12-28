const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = "music_mode_db";

let db = null;

async function connectToMongoDB() {
  if (db) {
    return db;
  }

  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();

    db = client.db(DB_NAME); 
    console.log("MongoDB connected successfully");

    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
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
