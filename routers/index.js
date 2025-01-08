const express = require('express');
const router = express.Router();

// Rutas principales
router.get('/', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Página Principal', 
        body: 'index'
    });
});

router.get('/nosotros', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Sobre nosotros', 
        body: 'nosotros'
    });
});

router.get('/productos', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Productos', 
        body: 'productos'
    });
});

router.get('/contacto', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Contacto', 
        body: 'contacto'
    });
});

router.get('/acceso', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Acceder', 
        body: 'acceder'
    });
});

router.get('/registro', (req, res) => {
    res.render('plantilla', { 
        titulo: 'Registrarse', 
        body: 'registro'
    });
});

// Exportar el router
module.exports = router;