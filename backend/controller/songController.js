const { getDB } = require("../db/mongo");
const parseBody = require("../utils/parseBody");
const { ObjectId } = require("mongodb");


async function addSong(req, res, modeId) {

  


  try {
    if (!ObjectId.isValid(modeId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid mode ID" }));
    }

    const body = await parseBody(req);
    const { name, artist } = body;

    if (!name || !artist) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Song name and artist are required" })
      );
    }

    const db = getDB();

 
    const modeExists = await db
      .collection("modes")
      .findOne({ _id: new ObjectId(modeId) });

    if (!modeExists) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Mode not found" }));
    }

    const result = await db.collection("songs").insertOne({
      name,
      artist,
      modeId: new ObjectId(modeId),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Song added successfully",
        songId: result.insertedId
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}


async function getSongsByMode(req, res, modeId) {
  try {
    if (!ObjectId.isValid(modeId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid mode ID" }));
    }

    const db = getDB();
    const songs = await db
      .collection("songs")
      .find({ modeId: new ObjectId(modeId) })
      .toArray();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(songs));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}


async function updateSong(req, res, songId) {
  try {
    if (!ObjectId.isValid(songId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid song ID" }));
    }

    const body = await parseBody(req);
    const { name, artist } = body;

    if (!name || !artist) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Song name and artist are required" })
      );
    }

    const db = getDB();
    const result = await db.collection("songs").updateOne(
      { _id: new ObjectId(songId) },
      {
        $set: {
          name,
          artist,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Song not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Song updated successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}


async function deleteSong(req, res, songId) {
  try {
    if (!ObjectId.isValid(songId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid song ID" }));
    }

    const db = getDB();
    const result = await db.collection("songs").deleteOne({
      _id: new ObjectId(songId)
    });

    if (result.deletedCount === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Song not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Song deleted successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
}

module.exports = {
  addSong,
  getSongsByMode,
  updateSong,
  deleteSong
};
