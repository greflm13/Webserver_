import * as debugsx from 'debug-sx';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';


// import of additional modules (npm install ...)
// import of Node.js modules
// logging with debug-sx/debug
process.env['DEBUG'] = '*';
const debug: debugsx.ISimpleLogger = debugsx.createSimpleLogger('main');

// web-server
const serverApp = express();
serverApp.set('views', path.join(__dirname, '/views'));
const pugEngine = serverApp.set('view engine', 'pug');
pugEngine.locals.pretty = true;

// middleware for web-server
serverApp.use(requestHandler);
serverApp.use(express.static(path.join(__dirname, 'public')));
serverApp.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
serverApp.use('/ng2', express.static(path.join(__dirname, '../../ng2/dist')));
serverApp.get('/error', handleGetError);
serverApp.use(error404Handler);
serverApp.use(errorHandler);

// start of application
const server = http.createServer(serverApp).listen(80);
debug.info('Server running on port 8080');


// ***************************************************************************
// Functions
// ***************************************************************************

function requestHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
  const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
  debug.info('%s %s from %s', req.method, req.url, clientSocket);
  if (req.method === 'GET' && req.url === '/') {
    res.render('ngmain.pug');
  } else {
    next();
  }
}

function handleGetError() {
  throw new Error('This simulates an exception....');
}


function error404Handler(req: express.Request, res: express.Response, next: express.NextFunction) {
  const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
  debug.warn('Error 404 for %s %s from %s', req.method, req.url, clientSocket);
  res.status(404).render('error404.pug');
}


function errorHandler(err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) {
  const ts = new Date().toISOString();
  debug.warn('Error %s\n%e', ts, err);
  res.status(500).render('error500.pug',
    {
      time: ts,
      href: 'mailto:max@mustermann.com?subject=' + ts,
      serveradmin: 'Max Mustermann'
    });
}

