var database = firebase.database();
var rootRef = database.ref();

rootRef.on("value", snapshot => {
    updateDBClients(snapshot.val());
    updateDBOrders(snapshot.val());
    console.log(snapshot.val())
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
        id,
        title,
        fName,
        sName,
        email,
        tel,
        address,
        city,
        postcode
    }

    database.ref(`clients/${id}/details`).set(newClientObj);
}
