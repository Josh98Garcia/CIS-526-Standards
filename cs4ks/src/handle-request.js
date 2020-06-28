const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const streamMedia = require('./stream-media');
const listDirectory = require('./list-directory.js');

/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
  if(req.method !== 'GET') return res.writeHead(501).end();
  var pathname = new URL(req.url, 'http://localhost').pathname;    
  fs.stat(path.join("public", pathname), (err, stat) => {
    if(err) return res.writeHead(404).end();
    if(stat.isFile()) {
      if(req.headers.range) streamMedia(req, res);
      else serveFile(req, res);
      return;
    }
    if(stat.isDirectory()) return listDirectory(req, res);
    return res.writeHead(404).end();
  });
}

module.exports = handleRequest;
