const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

// CREATE - crear usuario
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// READ - listar usuarios
app.get("/users", (req, res) => {
  res.json(users);
});

// UPDATE - actualizar usuario
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  user.name = name;
  user.email = email;

  res.json(user);
});

// DELETE - eliminar usuario
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
