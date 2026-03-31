'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const handlebars = require('express3-handlebars').create({ defaultLayout:'main' });;

const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = express();
app.set('port', port);

// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    console.log(randomFortune);
    res.render('about', { fortune: randomFortune });
});

// custom 404 page
app.use((req, res, next) => {
    res.statusCode(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.statusCode = 500;
    res.render('500');
});

app.listen(port, hostname, () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});