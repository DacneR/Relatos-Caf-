const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routers'); // Importar rutas
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Configurar body-parser para leer datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true }));


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

// Ruta para manejar el login
app.post('/login', (req, res) => {
    const { nombre, clave } = req.body;

    // Consulta para verificar usuario y contraseña
    const query = 'SELECT * FROM usuario WHERE nombre = ? AND clave = ?';
    connection.query(query, [nombre, clave], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return res.status(500).send('Error en el servidor');
        }

        // Verificar si el usuario existe
        if (results.length > 0) {
            res.send('¡Login exitoso!');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
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
