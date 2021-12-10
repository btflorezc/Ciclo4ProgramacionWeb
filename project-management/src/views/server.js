const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');

// Inicializaciones
const app = express();

// Settings (Ajustes)
app.set('port', process.env.PORT || 4000);  
app.set('views', path.join(__dirname, '../../src/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: "main",
    layoutsDir: '../../src/views/layouts',
    partialsDir: '../../src/views/partials',
    extname: '.hbs'
}));
app.engine('hbs', require('exphbs'));
app.set('view engine', 'hbs');


// Middlewares
app.use(express.urlencoded({extended: false}));

// Global Variables

// Routes
app.get('/', (req, res) =>{
    res.render('index.hbs');
});
app.use(require('../routes/users.routes'));

// Static files
app.use(express.static('/project-management/public'));

module.exports = app;