const fs = require('fs');
const path = require('path');
const pathToMimeType = require('./path-to-mime-type');

/** @function streamMedia
 * Serves a portion of the requested video file.
 * The video file is embodied in the request url and
 * the range of bytes to serve is contained in the
 * request http range header.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
 * for details.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function streamMedia(req, res) {
  // Determine the path to the file
  var pathname = new URL(req.url, "http://localhost").pathname;
  var filePath = path.join('public', pathname);
  // Determine the mime type
  var mimeType = pathToMimeType(filePath);
  // Extract the range using a RegEx
  var match = /bytes=(\d+)-(\d*)/.exec(req.headers.range);
  // Determine the start of the range
  var start = parseInt(match[1], 10);
  // Determine the end of the range asynchronously
  fs.stat(filePath, (err, stats) => {
    if(err) {
      console.error(err);
      res.writeHead(404).end();
      return;
    }
    var end = match[2] ? parseInt(match[2], 10) : stats.size - 1;
    res.setHeader("Content-Length", end - start + 1);
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Range", `bytes ${start}-${end}/${stats.size}`);
    res.statusCode = 206;
    var stream = fs.createReadStream(filePath, {start: start, end: end})
      .on('open', () => stream.pipe(res))
      .on('error', (err) => res.end(err));
  });
}

module.exports = streamMedia;