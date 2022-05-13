const express = require("express");
const http = require("http");

const apiUtils = require("./api/apiUtils");
const CONFIG = require("./config");
const mongo = require("./db/mongo");
const routerProductos = require("./routers/productos");

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 8080;

// const PUBLIC_PATH = path.join(__dirname, "public");
// app.use("/public", express.static(PUBLIC_PATH));

app.use(express.json());
app.use("/api/productos", routerProductos);
app.all("*", (req, res) => apiUtils.throwMethodNotFoundError(req, res));

const listeningServer = server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
listeningServer.on(`error`, (error) =>
  console.log(`Este es el error de servidor: ${error}`)
);

async function startDatabases() {
  if (CONFIG.DATABASE_TYPE === "mongodb") {
    await mongo.connect();
  }
}
startDatabases();
