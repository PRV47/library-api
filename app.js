require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { dbName: 'Libros' })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

//Rutas

const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');


app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

//Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
