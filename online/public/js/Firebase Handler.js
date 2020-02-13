var database = firebase.database();
var rootRef = database.ref();

rootRef.on("value", snapshot => {
    updateDBClients(snapshot.val());
    updateDBOrders(snapshot.val());
});
