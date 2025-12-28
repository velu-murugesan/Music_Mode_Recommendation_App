const { createMode, getAllModes , getModeById , updateMode ,deleteMode } = require("./controller/modeController");
const {addSong,updateSong,deleteSong,getSongsByMode} = require("./controller/songController");

function routes(req, res) {

    console.log("METHOD:", req.method, "URL:", req.url);

  const method = req.method;
  const url = decodeURIComponent(req.url).trim().split("?")[0];

   const parts = url.split("/");

  if (method === "POST" && url === "/api/modes") {
    return createMode(req, res);
  }

  if (method === "GET" && url === "/api/modes") {
    return getAllModes(req, res);
  }

  if (
  method === "GET" && parts.length === 4 && parts[1] === "api" && parts[2] === "modes"
) {
  return getModeById(req, res, parts[3]);
}

   if (method === "PUT" && url.startsWith("/api/modes/")) {
    const id = url.split("/")[3];
    return updateMode(req, res, id);
  }

   if (method === "DELETE" && url.startsWith("/api/modes/")) {
    const id = url.split("/")[3];
    return deleteMode(req, res, id);
  }


if (
  method === "GET" && parts.length === 5 && parts[1] === "api" && parts[2] === "modes" && parts[4] === "songs"
) {
  return getSongsByMode(req, res, parts[3]);
}

if (
  method === "POST" && parts.length === 5 && parts[1] === "api" && parts[2] === "modes" && parts[4] === "songs"
) {
  return addSong(req, res, parts[3]);
}


if (method === "PUT" && url.startsWith("/api/songs/")) {
  const songId = url.split("/")[3];
  return updateSong(req, res, songId);
}

 if (method === "DELETE" && url.startsWith("/api/songs/")) {
  const songId = url.split("/")[3];
  return deleteSong(req, res, songId);
}

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = routes;
