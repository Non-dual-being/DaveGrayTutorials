/**imports */

const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const EventEmitter = require('events');

const logEvents = require('./logEvents');
const { error } = require('console');

class Emitter extends EventEmitter {};




/**consts */
const PORT = Number(process.env.PORT) || 3500;
const myEmitter = new Emitter();


/**setting up listeners */
myEmitter.on('eventLog', (msg) => {logEvents(msg, path.join(__dirname, 'logs', 'eventLog.txt'))});
myEmitter.on('errorLog', (msg) => {logEvents(msg, path.join(__dirname, 'logs', 'errorLog.txt'))});
myEmitter.on('reqLog', (msg) => {logEvents(msg, path.join(__dirname, 'logs', 'reqLog.txt'))});


const serveFile = async (filePath, contentType, response)  => {
    try {
        const encodingType = !contentType.includes('image')
            ?  'utf8'    
            :   '';

        const serverResponseStatus = filePath.includes('404.html')
            ? 404
            : 200;

        const rawData = await fsPromises.readFile(filePath, encodingType
        );

        const data = contentType === "application/json" 
            ?   JSON.parse(rawData) : rawData; 
            
        response.writeHead(serverResponseStatus, {'Content-type' : contentType});
        response.end(
            contentType === "application/json"
                ? JSON.stringify(data)
                : data
        );


    } catch (err) {
        myEmitter.emit('errorLog', (`${err.name}\t${err.message}`));
        response.statusCode = 500;
        response.end();
    }
}



const server = http.createServer((req, res) => {
    myEmitter.emit('reqLog', (`${req.url}\t${req.method}`));

    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = 
        contentType === "text/html" && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);
    
    if (!extension && req.url.slice(-1) !== '/'){
        filePath += '.html';
    }
    
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html' :
                res.writeHead(301, {'Location' : '/new-page.html'});
                res.end();
                break;
            case 'www-page.html' :
                res.writeHead(301, {'Location' : '/'});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);  
        }
    }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`))




















// add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));
// myEmitter.emit('log', 'Log event emitted');



