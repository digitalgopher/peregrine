'use strict'
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

var express = require('express');

var app = express();


var ___APP___ = path.join(__dirname, '..', 'app');


app.use('/build', express.static(path.join(__dirname, '../app/build')));



// any API endpoints
// app.post('/api/v1/auth/login', routes.auth.login);
app.get('/api/v1/gopher', function (req, res) {
	var options = {
		url: 'https://playoverwatch.com/en-us/career/xbl/' + req.query.name
	};

	console.log( options.url );

	request( options, function (error, response, body) {
		if ( error ) {
			res.send('uh oh');
			return;
		}

		var $ = cheerio.load( body );
		var arr = [];
		var ret = {};
		var chars = $('#quickplay select[data-group-id="stats"] option');

		for ( var charCount = 0; charCount < chars.length; charCount++) {
			var characterObj = {
				name: chars[charCount].attribs['option-id'],
				value: chars[charCount].attribs.value
			};


			var selectorString = `#quickplay *[data-category-id="${characterObj.value}"] table`;
			var statTables = $(selectorString);
			var stats = {};

			for (var statTableCount = 0; statTableCount < statTables.length; statTableCount++) {
				var statHeader = $( statTables[statTableCount]).find('thead span').html();
				var innerStatNodes = $( statTables[statTableCount]).find('tbody tr' );
				var innerStats = {};

				for (var statCount = 0; statCount < innerStatNodes.length; statCount++) {
					let name = $( innerStatNodes[statCount]).children().first().html().trim();
					let number =  $( innerStatNodes[statCount]).children().last().html();
					innerStats[ name ] = number;
				}

				stats[ statHeader ] = innerStats;
				characterObj['stats'] = stats;
			}
			// $('#quickplay *[data-category-id="0x02E0000000000002"] table:first tbody tr:first td:first').html()
			arr.push( characterObj );
		}


		ret.quickPlay = arr;
		// var ret = arr.map( x => {
		// 	return {
		// 		val: x.value,
		// 		name: x.innerHTML
		// 	}
		// });





		arr = [];
		//comp
		chars = $('#competitive select[data-group-id="stats"] option');

		for ( var charCount = 0; charCount < chars.length; charCount++) {
			var characterObj = {
				name: chars[charCount].attribs['option-id'],
				value: chars[charCount].attribs.value
			};


			var selectorString = `#competitive *[data-category-id="${characterObj.value}"] table`;
			var statTables = $(selectorString);
			var stats = {};

			for (var statTableCount = 0; statTableCount < statTables.length; statTableCount++) {
				var statHeader = $( statTables[statTableCount]).find('thead span').html();
				var innerStatNodes = $( statTables[statTableCount]).find('tbody tr' );
				var innerStats = {};

				for (var statCount = 0; statCount < innerStatNodes.length; statCount++) {
					let name = $( innerStatNodes[statCount]).children().first().html().trim();
					let number =  $( innerStatNodes[statCount]).children().last().html();
					innerStats[ name ] = number;
				}

				stats[ statHeader ] = innerStats;
				characterObj['stats'] = stats;
			}
			// $('#quickplay *[data-category-id="0x02E0000000000002"] table:first tbody tr:first td:first').html()
			arr.push( characterObj );
		}


		ret.competitive = arr;


		res.send( ret );

	})
});

// app.get('/api/v1/cards/:cardNumber', function (req, res) {
// 	var card = Number( req.params.cardNumber );
// 	if ( isNaN( card )) {
// 		res.send({
// 			card: null
// 		});
// 		return;
// 	}
// 	var options = {
// 		uri: mingleUrl + '/cards/' + req.params.cardNumber + '.xml',
// 		headers: {
// 			'Authorization': 'Basic blah',
// 			'content-type': 'application/xml'
// 		}
// 	}

// 	console.log( options.uri );

// 	request( options , function (error, response, body) {
// 		parseString(body, function (err, result) {
// 			console.dir(result);
// 			res.send( result );
// 		});
// 	});
// });

app.all('/api/*', function (req, res) {
	res.send('yay');
});

// serve index.html for all remaining routes, in order to leave routing up to angular
// app.all("/*", function(req, res, next) {
// 	res.sendFile("index.html", { root: ___APP___ });
// });

app.get("/", function(req, res, next) {
	res.sendFile("index.html", { root: ___APP___ });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
