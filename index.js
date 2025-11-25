const express = require("express");
const app = express();
const PORT = 3000;

// leer JSON del body
app.use(express.json());

// "Base de datos" en memoria
let users = [
  { id: 1, nombre: "Ana", email: "ana@example.com", password: "1234" },
  { id: 2, nombre: "Luis", email: "luis@example.com", password: "abcd" },
];

// RUTA HOME
app.get("/", (req, res) => {
  res.send("API CRUD de usuarios - rama feature/login-form");
});

// LISTAR USUARIOS 
app.get("/users", (req, res) => {
  res.json(users);
});

// CREAR USUARIO 
app.post("/users", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "nombre, email y password son obligatorios" });
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    email,
    password,
  };

  users.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// ACTUALIZAR USUARIO
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nombre, email, password } = req.body;

  const indice = users.findIndex((u) => u.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  users[indice] = {
    ...users[indice],
    nombre: nombre ?? users[indice].nombre,
    email: email ?? users[indice].email,
    password: password ?? users[indice].password,
  };

  res.json(users[indice]);
});

// ELIMINAR USUARIO
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = users.some((u) => u.id === id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  users = users.filter((u) => u.id !== id);
  res.json({ mensaje: "Usuario eliminado correctamente" });
});

// LOGIN - FEATURE de esta rama
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const usuario = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  res.json({
    mensaje: "Login exitoso",
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
