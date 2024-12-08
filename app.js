const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routers'); // Importar rutas
const mysql = require('mysql2');

// Configurar la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rcafe'
});

// Verificar la conexión
connection.connect(err => {
    if (err) {
        console.error('Error al conectar con la BD:', err);
        return;
    }
    console.log('Conexión BD exitosa.');
});

// Configurar layouts
app.use(expressLayouts);
app.set('layout', 'plantilla');

// usar librería favicon
app.use(favicon(path.join(__dirname, 'public/img/iconos', 'logo.ico')));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Usar las rutas definidas en /routers
app.use('/', routes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
