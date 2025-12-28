const { getDB } = require("../db/mongo");
const parseBody = require("../utils/parseBody");
const { ObjectId } = require("mongodb");


async function createMode(req, res) {
  try {
    const body = await parseBody(req);
    const { name, description } = body;

    if (!name || name.trim() === "") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode name is required" }));
    }

    const db = getDB();
    const result = await db.collection("modes").insertOne({
      name,
      description: description || "",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Mode created successfully",
        modeId: result.insertedId
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

async function getAllModes(req, res) {
  try {
    const db = getDB();
    const modes = await db.collection("modes").find().toArray();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(modes));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

async function getModeById(req, res, id) {
  try {
    if (!ObjectId.isValid(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid mode ID" }));
    }

    const db = getDB();
    const mode = await db
      .collection("modes")
      .findOne({ _id: new ObjectId(id) });

    if (!mode) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mode));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

async function updateMode(req, res, id) {
  try {
    if (!ObjectId.isValid(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid mode ID" }));
    }

    const body = await parseBody(req);
    const { name, description } = body;

    if (!name || name.trim() === "") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode name is required" }));
    }

    const db = getDB();
    const result = await db.collection("modes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          description: description || "",
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Mode updated successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

async function deleteMode(req, res, id) {
  try {
    if (!ObjectId.isValid(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid mode ID" }));
    }

    const db = getDB();

    await db.collection("songs").deleteMany({
      modeId: new ObjectId(id)
    });

    const result = await db.collection("modes").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Mode deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

module.exports = {
  createMode,
  getAllModes,
  getModeById,
  updateMode,
  deleteMode
};