import express from "express";

const app = express();

app.get("/saludo/:nombre", (req, res) => {
  const { nombre } = req.params;
  res.end(`<h1>Hola ${nombre}!</h1>`);
});

app.get("/suma", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const suma = a + b;
  res.end(`<h1>La suma de ${a} + ${b} es igual a ${suma}</h1>`);
});

app.get("/fecha", (req, res) => {
  const fecha = new Date();
  const date =
    fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
  const hour =
    fecha.getHours() + "/" + fecha.getMinutes() + "/" + fecha.getSeconds();
  res.end(`La fecha y hora actual es: ${date}, ${hour}".`);
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Empiezo a escuchar en el puerto http://localhost:${PORT}`);
});
