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

    id          = document.getElementById("client_id-input").value;
    title       = capitaliseString(document.getElementById("client_title-input").value);
    fName       = capitaliseString(document.getElementById("client_fName-input").value);
    sName       = capitaliseString(document.getElementById("client_sName-input").value);
    email       = document.getElementById("client_email-input").value;
    tel         = document.getElementById("client_tel-input").value.split("").filter(d => !isNaN(d)).join("");
    address     = document.getElementById("client_address-input").value.split(" ").map(substr => capitaliseString(substr)).join(" ");
    city        = capitaliseString(document.getElementById("client_city-input").value);
    postcode    = document.getElementById("client_postcode-input").value.toUpperCase();

    var newClientObj = {
        id,title,fName,sName,email,tel,address,city,postcode
    }

    if(validateClient(newClientObj)) {
        database.ref(`clients/${id}/details`).set(newClientObj);
        document.getElementById("newClientModalForm").style.display = "none";

        id          = document.getElementById("client_id-input").value = "";
        title       = document.getElementById("client_title-input").value = "";
        fName       = document.getElementById("client_fName-input").value = "";
        sName       = document.getElementById("client_sName-input").value = "";
        email       = document.getElementById("client_email-input").value = "";
        tel         = document.getElementById("client_tel-input").value = "";
        address     = document.getElementById("client_address-input").value = "";
        city        = document.getElementById("client_city-input").value = "";
        postcode    = document.getElementById("client_postcode-input").value = "";

        firebase.auth().createUserWithEmailAndPassword(newClientObj.email, newClientObj.fName.toLowerCase() + newClientObj.sName.toLowerCase()).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
}

function validateClient(client) {
    console.log(client)

    if(!Object.values(client).every(prop => prop != "")) {
        alert("Fill in all properties");
        return false;

        // return window.confirm(`You've not filled the ${Object.values(client).flatMap((val, i) => val == "" ? [Object.keys(client)[i]] : []).join(", ").split("").splice(Object.values(client).flatMap((val, i) => val == "" ? [Object.keys(client)[i]] : []).lastIndexOf(","), 1, " and ").join("")} properties. Continue?`)

    }else if(Object.keys(firebaseCache.clients).includes(client.id)) {
        alert(`ID ${client.id} was already used.`);
        return false;
    } else {
        return true;
    }
}

function capitaliseString(value) {
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
