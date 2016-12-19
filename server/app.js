'use strict'
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

var express = require('express');


var admin = require("firebase-admin");
var serviceAccount = require("./../securedata/firebaseInfo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gopherwatch-664c5.firebaseio.com"
});

var app = express();


var ___APP___ = path.join(__dirname, '..', 'app');


app.use('/build', express.static(path.join(__dirname, '../app/build')));


// Get a database reference to our posts
var db = admin.database();
var ref = db.ref();

// Attach an asynchronous callback to read the data at our posts reference
ref.child('SearchQueue').on("child_added", function(snapshot) {
	let searchItem = snapshot.val();
	let stats;
	scrape( searchItem.query ).then( function (stats) {
		updateDb( searchItem.query, stats );
	});
	
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


function updateDb( name, data ) {
	let playerRef = ref.child('Players');
	let statsRef = ref.child('Stats');
	let playerData = {};
	// playerData[ name ] = {
	// 	stats: data[ name ].stats
	// }
	var timeStamp = Date.now();
	// console.log( playerData );
	let chars = Object.keys( data.competitive );
	let playerUpdateObj = {};
	playerUpdateObj.competitive = {};

	// let updateObj = {};



	let snapShotsRef = ref.child( 'statSnapShots');
	let newSnapshotRef = snapShotsRef.push();
	let snapshotKey = newSnapshotRef.key;
	newSnapshotRef.set( data );




	// snapShotsRef.update( updateObj );
	let plrupdate = {};

	
	




	playerRef.child( name ).update({
		currentStats: snapshotKey
	});

	playerRef.child( name ).child( 'previous').update({
		[snapshotKey] : true
	})

	return;


	chars.forEach( function (char) {
		
		playerUpdateObj.competitive[ char ] = true;
		let statCategories = Object.keys(data.competitive[ char ].stats);
		statCategories.forEach( function ( catName ) {
			let cat = data.competitive[ char ].stats[ catName ];
			let statNames = Object.keys( cat );
			let updateObj = {};
			statNames.forEach( function (statName) {
				updateObj[ statName ] = cat[ statName ];
			});
			statsRef.child( char ).child( name ).child('competitive').child( timeStamp ).child( catName ).set( updateObj );
			
		});


		console.log (data.competitive[ char ])

		// statsRef.child( data.competitive[ char ].displayName ]) .set({ }) 
	});

	
	

	playerRef.child( name ).set( playerUpdateObj );



	// chars.forEach( function ( char ) {
	// 	console.log( playerData[ name].stats.competitive[ char ].displayName );
	// });


	// playerRef.set( playerData );
	// playerRef.child('Players').set( playerData );
}







function scrape ( username ) {
	var options = {
		url: 'https://playoverwatch.com/en-us/career/xbl/' + username
	};

	console.log( options.url );
	return new Promise( function (resolve, reject ) {

	
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

		var compCharacters = {};

		for ( var charCount = 0; charCount < chars.length; charCount++) {
			var characterObj = {
				name: chars[charCount].attribs['option-id'],
				value: chars[charCount].attribs.value
			};

			compCharacters[ characterObj.value ] = {
				displayName: characterObj.name
			};


			var selectorString = `#competitive *[data-category-id="${characterObj.value}"] table`;
			var statTables = $(selectorString);
			var stats = {};
			var statCategories = {};
			var allStats = {};


			for (var statTableCount = 0; statTableCount < statTables.length; statTableCount++) {
				var statHeader = $( statTables[statTableCount]).find('thead span').html();
				var innerStatNodes = $( statTables[statTableCount]).find('tbody tr' );
				var innerStats = {};
				statCategories[ statHeader ] = {};

				if ( !compCharacters[ characterObj.value ].stats ) {
					compCharacters[ characterObj.value ].stats =  {};
				}

				compCharacters[ characterObj.value ].stats[ statHeader ] = {};

				for (var statCount = 0; statCount < innerStatNodes.length; statCount++) {
					let name = $( innerStatNodes[statCount]).children().first().html().trim();
					let number =  $( innerStatNodes[statCount]).children().last().html();
					innerStats[ name ] = number;
					compCharacters[ characterObj.value ].stats[ statHeader ][ name ] = number;
				}

				// stats[ statHeader ] = innerStats;
				// characterObj['stats'] = stats;
			}
			// $('#quickplay *[data-category-id="0x02E0000000000002"] table:first tbody tr:first td:first').html()
			arr.push( characterObj );
		}

		ret = {
			competitive: compCharacters
		};
		// ret.competitive = arr;
		resolve( ret );
		
		// res.send( ret );

	})

	});
}



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
