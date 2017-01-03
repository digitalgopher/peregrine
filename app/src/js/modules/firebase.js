import * as firebase from "firebase";

class FirebaseModule {
	constructor () {
		this.isInitialized = false;
		this.init = this.init.bind( this );
		this.getPlayer = this.getPlayer.bind( this );
		this.getPlayerStatsKey = this.getPlayerStatsKey.bind( this );
		this.getPlayerStats = this.getPlayerStats.bind( this );
		this.config = {
			apiKey: "AIzaSyBprK9HQiSZL0QOUaHC7Qc0vKMBdeezEPs",
			authDomain: "gopherwatch-664c5.firebaseapp.com",
			databaseURL: "https://gopherwatch-664c5.firebaseio.com",
			storageBucket: "gopherwatch-664c5.appspot.com",
			messagingSenderId: "1098071545412"
		};

		this.database = null;
	}

	init () {
		if (this.isInitialized) {
			console.error('Already initialized! ');
			return;
		}
		firebase.initializeApp(this.config);
		this.isInitialized = true;
		this.database = firebase.database();
	}
	watchPlayer ( name, callback ) {
		this.playerRef = this.database.ref('Players/' + name + '/currentStats');
		return new Promise((resolve, reject) => {
			this.playerRef.on('value', snapshot => {
				this.database.ref('statSnapShots/' + snapshot.val() ).once('value')
					.then( snap => {
						resolve( snap.val() );
					});
				});
			});

		// this.playerRef.on('value', (snapshot) => {
		// 	return this.database.ref('statSnapShots/' + snapshot.val() ).once('value').then( function (snap) {
		// 		console.dir( snap.val() );
		// 		callback( snap.val() );
		// 	});
			
		// });
	}

	unwatchPlayer ( name ) {
		this.playerRef.off();
	}

	searchPlayer ( name ) {
		let userKey = this.database.ref().child('SearchQueue').push().key;
		let updates = {
			[ 'SearchQueue/' + userKey ]: { query: name }
		};
		return firebase.database().ref().update( updates );
	}

	getPlayer (name) {
		return this.getPlayerStatsKey( name )
			.then( this.getPlayerStats )
			.then( snapshot => snapshot.val() );
	}

	getPlayerStatsKey ( name ) {
		return this.database.ref('Players/' + name + '/currentStats').once('value');
	}

	getPlayerStats (statsKeySnapShot) {
		let statsKey = statsKeySnapShot.val();
		return this.database.ref('statSnapShots/' + statsKey ).once('value');
	}
}


export let firebaseModule = new FirebaseModule();

