const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    //cookie parser
    app.use(cookieParser());
    
    // body parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // handlebars engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    // static files
    app.use('/static', express.static('static'));
};