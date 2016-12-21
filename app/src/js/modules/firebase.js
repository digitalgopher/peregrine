import * as firebase from "firebase";

class FirebaseModule {
	constructor () {
		this.isInitialized = false;
		this.init = this.init.bind( this );
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
		this.playerRef.on('value', (snapshot) => {
			this.database.ref('statSnapShots/' + snapshot.val() ).once('value').then( function (snap) {
				console.dir( snap.val() );
				callback( snap.val() );
			});
			
		});
	}

	unwatchPlayer ( name ) {
		this.playerRef.off();
	}

	searchPlayer ( name ) {
		let userKey = this.database.ref().child('SearchQueue').push().key;
		let updates = {};
		let searchItem = {
			query: name
		};

		updates[ 'SearchQueue/' + userKey ] = searchItem;
		return firebase.database().ref().update( updates );
	}
}


export let firebaseModule = new FirebaseModule();

