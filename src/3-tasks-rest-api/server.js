import express from "express";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT ?? 3000;
const app = express();

let tareas = [
  {
    id: uuidv4(),
    nombre: "Sacar al perro a pasear",
    completada: false,
  },
  {
    id: uuidv4(),
    nombre: "Lavar platos",
    completada: false,
  },
];

app.use(express.json());

// listar tareas
app.get("/tareas", (req, res) => {
  res.json(tareas);
});

// agregar tarea
app.post("/tareas", (req, res) => {
  tareas.push({
    id: uuidv4(),
    nombre: req.body.nombre,
    completada: false,
  });
  res.status(201).json(tareas);
});

// completar tarea
app.put("/tareas/:id", (req, res) => {
  const taskId = req.params.id;

  const updatedTareas = tareas.map((tarea) => {
    if (tarea.id === taskId) {
      return { ...tarea, completada: true };
    }
    return tarea;
  });

  tareas = updatedTareas;

  res.status(200).json(updatedTareas);
});

// eliminar tarea
app.delete("/tareas/:id", (req, res) => {
  const taskId = req.params.id;

  const updatedTareas = tareas.filter((tarea) => {
    if (tarea.id !== taskId) {
      return tarea;
    }
  });
  tareas = updatedTareas;

  res.status(200).json(updatedTareas);
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
