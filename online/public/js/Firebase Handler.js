var database = firebase.database();
var rootRef = database.ref();

rootRef.on("value", snapshot => {updateDB(snapshot.val());});

