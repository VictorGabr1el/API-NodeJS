import express from "express";
import router from "./controller/Router.js";

const app = express();
app.use(express.json());

app.post("/users", router);
app.get("/users", router);
app.get("/users/:id", router);
app.put("/users/:id", router);
app.delete("/users/:id", router);

app.listen(3000, console.log("rodando porta 3000"));
