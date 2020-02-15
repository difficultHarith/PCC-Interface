var database = firebase.database();
var rootRef = database.ref();
var firebaseCache;

rootRef.on("value", snapshot => {
    updateDBClients(snapshot.val());
    updateDBOrders(snapshot.val());
    firebaseCache = snapshot.val();
});

function submitNewClient() {
    var id, title, fName, sName, email, tel, address, city, postcode;

    id          = document.getElementById("id-input").value;
    title       = document.getElementById("title-input").value;
    fName       = document.getElementById("fName-input").value;
    sName       = document.getElementById("sName-input").value;
    email       = document.getElementById("email-input").value;
    tel         = document.getElementById("tel-input").value;
    address     = document.getElementById("address-input").value;
    city        = document.getElementById("city-input").value;
    postcode    = document.getElementById("postcode-input").value;

    var newClientObj = {
        id,title,fName,sName,email,tel,address,city,postcode
    }

    if(validateClient(newClientObj)) {
        database.ref(`clients/${id}/details`).set(newClientObj);
        document.getElementById("newClientModalForm").style.display = "none"
        id          = document.getElementById("id-input").value = "";
        title       = document.getElementById("title-input").value = "";
        fName       = document.getElementById("fName-input").value = "";
        sName       = document.getElementById("sName-input").value = "";
        email       = document.getElementById("email-input").value = "";
        tel         = document.getElementById("tel-input").value = "";
        address     = document.getElementById("address-input").value = "";
        city        = document.getElementById("city-input").value = "";
        postcode    = document.getElementById("postcode-input").value = "";

        firebase.auth().createUserWithEmailAndPassword(newClientObj.email, generateID(6)).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

}

function validateClient(client) {
    console.log(client)

    if(!Object.values(client).every(prop => prop != "")) {
        alert("Not all fields are filled in.");
        return false;

    }else if(Object.keys(firebaseCache.clients).includes(client.id)) {
        alert(`ID ${client.id} was already used.`);
        return false;

    } else {
        return true;
    }
}
