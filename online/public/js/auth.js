adminRef = firebase.database().ref("admins");
var adminKeys = [];

adminRef.on("value", snapshot => {
	adminKeys = Object.keys(snapshot.val());
});


document.getElementById("button-login").addEventListener("click", e => {

	var email = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;

	if(email != "" && password != ""){
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...

		  alert(errorMessage)
		});
	} else {
		alert("Fill all fields");
	}
});

firebase.auth().onAuthStateChanged(function(user) {
	console.log(`User obj:`);
	console.log(user)
	console.log(firebase.auth())

  if (firebase.auth().currentUser != null) {
		if(adminKeys != [] && adminKeys.includes(firebase.auth().currentUser.uid)){
			window.location.href="html/interface.html"
		} else if(user){
			window.location.href = "html/interface-client.html"
		}
  }
});
