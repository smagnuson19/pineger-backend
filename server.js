import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import runSocket from './lib/socket';


// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());


// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use('/static', express.static(path.join(__dirname, 'static')));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

const server = http.createServer(app);

app.use('/', express.static(`${__dirname}/../client`));


// START THE SERVER
// =============================================================================

const port = process.env.PORT || 9090;
server.listen(port, () => {
  runSocket(server);
  console.log('Server is listening at :', port);
});
