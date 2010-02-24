/*
 * hookio/incoming.js
 *
 * Handles and routes incoming requests
 */

var hookIO = require('./index').hookIO;


var pathExpression = /^(\/[^\/]+)(.*)$/;

hookIO.addListener('HttpRequest', function(request, response) {
  // TODO: Route incoming http requests
  var path = requests.url.match(pathExpression);

  switch (path[1]) {
    case '/jsonrpc':
      hookIO.emit('JsonrpcRequest', request, response);
      break;

    case '/hook':
      // HTTP Hooks
      request.url = path[2];
      hookIO.emit('HttpHookRequest', request, response);
      break;

    default:
      // Assume we are serving the site
      hookIO.emit('SiteRequest', request, response);
      break;
  }
});
