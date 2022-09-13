import express from "express";
import User from "../model/Users.js";

const router = express.Router();

// -------------- POST ------------- //

router.post("/users", async (req, res) => {
  const { name, email, password, confirmPass } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Digite um nome" });
  }

  if (!email) {
    return res.status(422).json({ message: "Digite um email" });
  }

  if (!password) {
    return res.status(422).json({ message: "Digite uma senha" });
  }

  if (confirmPass != password) {
    return res.status(422).json({ message: "As senhas não estão iguais" });
  }

  const emailexist = await User.findOne({ email: email });

  if (emailexist) {
    return res.status(400).json({ message: "Este email já está em uso" });
  }

  const user = new User({
    name,
    email,
    password,
  });

  try {
    await user.save();
    return res.status(201).json({ message: "usuario criado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Não foi possivel realizar seu cadastro tente mais tarde!",
    });
    return console.log(error);
  }
});

// --------------- GET ------------- //

router.get("/users", async (req, res) => {
  const user = await User.find();
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Não foi possivel encontrar o usuario tente mais tarde",
    });
  }
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Não foi possivel encontrar o usuario tente mais tarde",
    });
  }
});

// --------------- PUT -------------- //

router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password,
  };

  try {
    const userUpdate = await User.updateOne({ _id: id }, user);

    if (userUpdate.modifiedCount === 0) {
      return res.status(400).json({ message: "usuario não encontrado" });
    }
    return res.status(200).json(userUpdate);
  } catch (error) {
    return res.status(500).json({
      message: "não foi possivel atualizar o usuario, tente mais tarde",
    });
  }
});

// -------------- DELETE --------------- //

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.deleteOne({ _id: id });
    if (user.deletedCount === 0) {
      return res.status(400).json({ message: "usuario não encontrado" });
    }

    return res.status(200).json({ message: "usuario deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({
      message: "Não foi possivel deletar o usuario, tente mais tarde!",
    });
  }
});

export default router;
