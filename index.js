const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

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



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
