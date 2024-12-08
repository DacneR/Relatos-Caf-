const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
//mysql bd
const mysql = require('mysql2');

// Configurar la conexión
const connection = mysql.createConnection({
    host: 'localhost', // Cambiar según tu servidor
    user: 'root', // Usuario de tu BD
    password: '', // Contraseña de tu BD
    database: 'rcafe' // Nombre de la base de datos
});

// Verificar la conexión
connection.connect(err => {
    if (err) {
        console.error('Error al conectar con la BD:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});


// Configurar layouts
app.use(expressLayouts);
app.set('layout', 'plantilla'); // Establecer layout por defecto

// usar librería favicon
app.use (favicon(path.join(__dirname, 'public/img/iconos', 'logo.ico')));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', './views'); // Carpeta donde guardarás las plantillas

app.get('/', (req, res) => {
    res.render('plantilla', { 
      titulo: 'Página Principal', 
      body: 'index'
      });
  });

app.get('/inicio', (req, res) => {
    res.render('plantilla', { 
      titulo: 'Inicio', 
      body: 'inicio'});
  });

app.get('/acceso', (req, res) => {
    res.render('plantilla', { 
      titulo: 'Acceder', 
      body: 'acceder'});
  });



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
