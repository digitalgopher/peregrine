var webpack = require("webpack");
var config = require('./webpack.config');
var WebpackDevServer = require("webpack-dev-server");

const PORT = process.env.PORT || 8080;

const front_server = new WebpackDevServer(webpack(config), {
  proxy: {
    "*" : "http://localhost:1234" // <- backend
  },
  // ... rest of the options
});

// front_server.listen(PORT, 'localhost');
front_server.listen( PORT, function (error) {
	if (error) {
		return console.log( error );
	}
	console.log( 'listening on port ' + PORT );
})


// var path = require('path');
// var webpack = require('webpack');
// var express = require('express');
// var config = require('./webpack.config');

// var app = express();
// var compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(3000, function(err) {
//   if (err) {
//     return console.error(err);
//   }

//   console.log('Listening at http://localhost:3000/');
// })