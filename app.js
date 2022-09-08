import express from "express";

const app = express();
app.use(express.json());

const dict = {};

app.post("/users", async (req, res) => {
  const { name, email, password, confirmPass } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Digite um nome" });
  }

  if (!email) {
    return res.status(422).json({ message: "Digite um nome" });
  }

  if (!password) {
    return res.status(422).json({ message: "Digite um nome" });
  }

  if (confirmPass != password) {
    return res.status(422).json({ message: "Digite um nome" });
  }
  const user = { name, email, password };

  dict.key = user;
  res.json(dict);
});

// --------------- GET ------------- //

app.get("/users", async (req, res) => {
  const users = await dict.find();
  console.log(users);
  return res.status(200).json(users);
});

app.listen(3000, console.log("rodando porta 3000"));
