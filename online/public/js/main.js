// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


function refreshClientFormID() {
    document.getElementById("id-input").defaultValue = generateID();
}
