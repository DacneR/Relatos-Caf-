const express = require('express');
const app = express();
const port = 3000;
const favicon = require('serve-favicon');
const path = require('path');
require('dotenv').config();
//Configurar layouts
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routers'); // Importar rutas
//Para conectar con mysql
const mysql = require('mysql2');
//Para leer datos desde formularios
const bodyParser = require('body-parser');
//Mensaje flash
const session = require('express-session');
const flash = require('connect-flash');


// Configurar express-session
app.use(session({
    secret: process.env.SESSION_SECRET, // Cambia esto a una cadena segura
    resave: false,
    saveUninitialized: true
}));

// Configurar connect-flash
app.use(flash());

// Middleware para pasar mensajes flash a todas las vistas
app.use((req, res, next) => {
    res.locals.mensaje = req.flash('mensaje');
    next();
});

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
            req.flash('mensaje', `¡Bienvenido, ${nombre}!`);
            res.redirect('/');
        } else {
            req.flash('mensaje', 'Credenciales incorrectas');
            res.redirect('/acceso');
        }
    });
});

// Ruta para manejar el registro
app.post('/regis', (req, res) => {
    const { nombre, correo, clave, celular } = req.body;

    // Consulta para verificar usuario y contraseña
    const query = 'SELECT * FROM usuario WHERE nombre = ? AND correo = ?';
    connection.query(query, [nombre, correo], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ingresar', err);
            return res.status(500).send('Error en el servidor');
        }

        // Verificar si el usuario existe
        if (results.length > 0) {
            
            req.flash('mensaje', `Ya hay una cuenta registrada con el correo, ${correo}!`);
            res.redirect('/acceso');
        } else {
            const query = 'INSERT INTO usuario (idUsuario, nombre, correo, rol, clave, celular) VALUES (null,?, ?,"cliente",?,?)';
            connection.query(query, [nombre, correo, clave, celular], (err, results) => {
                if (err) {
                    req.flash('mensaje', `Algo salió mal`);
                    console.error('Error al ejecutar la consulta: registrar', err);
                    return res.status(500).send('Error en el servidor');
                }
            
                req.flash('mensaje', `Registrado correctamente!`);
                res.redirect('/acceso');
                
            });
        }
    });


});

// Configurar layouts
app.use(expressLayouts);
app.set('layout', 'plantilla');

// usar librería favicon
app.use(favicon(path.join(__dirname, 'public/img/iconos', 'icon.ico')));

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
