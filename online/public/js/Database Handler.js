function updateDBClients(snapshot) {
	var dbClients = document.querySelector(".clients-table-holder table");
  /*
  Reset the whole dbClients table.
	So we dont get simply extra repeated rows on every update.
  */
	while (dbClients.rows.length > 1) {
		dbClients.deleteRow(-1);
	}

	// Iterate over every client in the Firebase Snapshot.
	Object.keys(snapshot.clients).forEach((client, index) => {
		var clientRow = dbClients.insertRow(-1);
    clientRow.setAttribute("class", `client-row ${client}`);

    	// Initialise all the cells for the client records.
    var cellID       			= clientRow.insertCell(0);
		var cellEmail       		= clientRow.insertCell(1);
		var cellTitle       		= clientRow.insertCell(2);
		var cellFName       		= clientRow.insertCell(3);
		var cellSName       		= clientRow.insertCell(4);
		var cellTel         		= clientRow.insertCell(5);
		var cellAddress     		= clientRow.insertCell(6);

		// Set the innerHTML of all the cells.
		cellEmail.innerHTML       	= snapshot.clients[client].details.email;
		cellTitle.innerHTML       	= snapshot.clients[client].details.title;
		cellFName.innerHTML       	= snapshot.clients[client].details.fName;
		cellSName.innerHTML       	= snapshot.clients[client].details.sName;
		cellTel.innerHTML 	      	= snapshot.clients[client].details.tel;
		cellAddress.innerHTML     	= snapshot.clients[client].details.address;
	});

	var addClientRow = dbClients.insertRow(-1);
	var addClientCell = addClientRow.insertCell(0);

	addClientCell.className += "addClientCell";
	addClientCell.colSpan = 7;
	addClientCell.innerHTML = "Add New Client...";
	addClientCell.style.textAlign = "center";

	addClientCell.addEventListener("click", e => {
		alert("Clicked");
	});

}
