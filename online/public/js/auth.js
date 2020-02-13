var userObj = {};
document.getElementById("button-login").addEventListener("click", e => {

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

document.querySelector(".mdl-card__actions.mdl-card--border a").addEventListener("click", e => {
	window.location.href = "../index.html"
})

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {

    // User is signed in.
    var userWelcomeCard = document.querySelector(".demo-card-square.mdl-card")
    userWelcomeCard.style.visibility = "visible";

    document.getElementsByClassName("mdl-card__title-text")[0].innerHTML = `Welcome, ${user.displayName}.`;
  } else {
    // No user is signed in.
  }
});



