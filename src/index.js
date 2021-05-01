const express = require('express');
const app = express();
const morgan = require('morgan');

// setting
app.set('port', process.env.PORT || 3000);
app.set('json space', 2);

// middlewares ->ayuda a procesar los datos antes que lleguen a las rutas
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});