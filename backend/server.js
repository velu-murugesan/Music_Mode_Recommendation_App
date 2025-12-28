
const http = require("http");
require("dotenv").config();
const { connectToMongoDB } = require("./db/mongo");
const routes = require("./routes");

const PORT = 3000;




const server = http.createServer((req, res) => {

   res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 


  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  routes(req, res);
});


async function startServer() {
  await connectToMongoDB();

  server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();