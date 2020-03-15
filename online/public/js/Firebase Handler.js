var database = firebase.database();
var rootRef = database.ref();
var firebaseCache;

rootRef.on("value", snapshot => {
    updateDBClients(snapshot.val());
    updateDBOrders(snapshot.val());
    firebaseCache = snapshot.val();
});

function refreshOrderClientOptions () {

    var orderClientSelect = document.getElementById("order_client-input");
    orderClientSelect.length = 0;

    Object.keys(firebaseCache.clients).forEach(client => {
        orderClientSelect.options.add(new Option
        (`${firebaseCache.clients[client].details.id} - ${firebaseCache.clients[client].details.fName} ${firebaseCache.clients[client].details.sName}`, `${firebaseCache.clients[client].details.id}`)); //Text, Value

    })
}

function submitNewClient() {
    var id, title, fName, sName, email, tel, address, city, postcode;

    id          = document.getElementById("client_id-input").value;
    title       = capitaliseString(document.getElementById("client_title-input").value);
    fName       = capitaliseString(document.getElementById("client_fName-input").value);
    sName       = capitaliseString(document.getElementById("client_sName-input").value);
    email       = document.getElementById("client_email-input").value;
    tel         = document.getElementById("client_tel-input").value.replace(/[^0-9]/g, '');
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

        firebase.auth().createUserWithEmailAndPassword(
            newClientObj.email, newClientObj.fName.toLowerCase() + newClientObj.sName.toLowerCase())
            .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }
}

function submitNewOrder() {
    var id, client, orderDate, deliveryDate, collectionDateisFruit, isSponge, cakeTheme, specialReq, cakeCost, deliveryCharge, postcode;


    id          = document.getElementById("order_id-input").value;
    client      = document.getElementById("order_client-input").value;
    orderDate = document.getElementById("order_orderDate-input").value;
    collectionDate = document.getElementById("order_ collectionDate-input").value;
    deliveryDate = document.getElementById("order_deliveryDate-input").value;
    isFruit     = document.getElementById("order_isFruit-input").value;
    isSponge    = document.getElementById("order_isSpongeFillingCheckbox").checked;
    spongeFilling = document.getElementById("order_isSpongeFillingCheckbox").checked ?
                document.getElementById("order_spongeFilling") : "N/A";

    cakeTheme   = document.getElementById("order_cakeTheme-input").value;
    specialReq  = document.getElementById("order_specialReq-input").value;
    cakeCost = document.getElementById("order_specialReq-input").value;
    deliveryCharge = document.getElementById("order_specialReq-input").value;


    var newOrderObj = {
        id,client, orderDate, collectionDate, deliveryDate,isFruit,isSponge,spongeFilling,cakeTheme,specialReq,cakeCost,deliveryCharge
    }


    console.log(newOrderObj);

}

function validateClient(client) {
    console.log(client)

    if(!Object.values(client).every(prop => prop != "")) {
        alert("Fill in all properties");
        return false;
    }else if(Object.keys(firebaseCache.clients).includes(client.id)) {
        alert(`ID ${client.id} was already used. Please generate a new ID.`)
        return false;
    } else {
        return true;
    }
}



function capitaliseString(value) {
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function formatSelectDate (date) {
    sDate = date.split("");
    return `${sDate.slice(8, 10).join("")}/${sDate.slice(5, 7).join("")}/${sDate.slice(0, 4).join("")}`
}

console.log(formatSelectDate("2019-04-21"))
