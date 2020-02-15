var CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

function generateID(length = 6) {
	let IDString = "";

	for(var i = 0; i < length; i++) {
		IDString += CHARSET[Math.floor((Math.random() * CHARSET.length))];
	}
	return IDString;
}


for(var i = 0; i < 5; i++) {
	console.log(generateID(6))
}
