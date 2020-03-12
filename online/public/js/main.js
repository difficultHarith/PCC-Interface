// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


function refreshClientFormID() {
    document.getElementById("client_id-input").value = generateID();
}

function refreshOrderFormID() {
    document.getElementById("order_id-input").value = generateID();
}
document.getElementById("order_isSpongeFillingCheckbox").addEventListener("click", e => {
    document.getElementById('order_isSpongeFilling-input').disabled = !document.getElementById("order_isSpongeFillingCheckbox").checked;
  });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      alert("Hi")
    }
  });
