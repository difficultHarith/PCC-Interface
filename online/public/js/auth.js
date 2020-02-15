document.getElementById("button-login").addEventListener("click", e => {
	alert("Clicked")

	var email = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;

	if(email != "" && password != ""){
		alert(`Password: ${password}\nE-Mail: ${email}`);
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

  if (user) {

    // User is signed in.
	window.location.href="html/interface.html"
  } else {
    // No user is signed in.
  }
});
