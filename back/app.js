const express = require('express');
require('dotenv').config();
const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const db = require('./db');
const initializeData = require('./dataInitializer');
const app = express();
const PORT = process.env.PORT || 3000;
const DBCONNECTION = process.env.DBCONNECTION;

db(DBCONNECTION);

initializeData();

var cors = require('cors');

app.use(cors());
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Mi port ' +  PORT);
});
