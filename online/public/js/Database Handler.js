function updateDBClients(snapshot) {
	var dbClients = document.querySelector("table.clients");
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
		var cellTitle       		= clientRow.insertCell(1);
		var cellFName       		= clientRow.insertCell(2);
		var cellSName       		= clientRow.insertCell(3);
		var cellEmail       		= clientRow.insertCell(4);
		var cellTel         		= clientRow.insertCell(5);
		var cellAddress     		= clientRow.insertCell(6);

		// Set the innerHTML of all the cells.
		cellID.innerHTML			= snapshot.clients[client].details.id;
		cellTitle.innerHTML       	= snapshot.clients[client].details.title;
		cellFName.innerHTML       	= snapshot.clients[client].details.fName;
		cellSName.innerHTML       	= snapshot.clients[client].details.sName;
		cellEmail.innerHTML       	= snapshot.clients[client].details.email;
		cellTel.innerHTML 	      	= snapshot.clients[client].details.tel;
		cellAddress.innerHTML     	= snapshot.clients[client].details.address;
	});

	var addClientRow = dbClients.insertRow(-1);
	var addClientCell = addClientRow.insertCell(0);

	addClientCell.className += "addNewRowCell";
	addClientCell.colSpan = 7;
	addClientCell.innerHTML = "Add New Client...";
	addClientCell.style.textAlign = "center";

	addClientCell.addEventListener("click", e => {
		document.getElementById('newClientModalForm').style.display='block';
		refreshClientFormID();
	});
}


function updateDBOrders(snapshot) {
	var dbOrders = document.querySelector("table.orders");
	/*
	Reset the whole dbOrders table.
	So we dont get simply extra repeated rows on every update.
	*/
	while (dbOrders.rows.length > 1) {
		dbOrders.deleteRow(-1);
	}
	// Iterate over every order in the Firebase Snapshot.
	Object.keys(snapshot.clients).forEach((client, index) => {
		Object.keys(snapshot.clients[client].orders).forEach((order, index) => {
			console.log(client, order, snapshot.clients[client].orders[order].details);

			var orderRow = dbOrders.insertRow(-1);
	    	orderRow.setAttribute("class", `order-row ${order}`);

	    	// Initialise all the cells for the order records.
		    var cellID       			= orderRow.insertCell(0);
			var cellClient      		= orderRow.insertCell(1);
			var cellTheme       		= orderRow.insertCell(2);
			var isFruit					= orderRow.insertCell(3);
			var isSponge				= orderRow.insertCell(4);
			var orderDate				= orderRow.insertCell(5);
			var collectionDate			= orderRow.insertCell(6);

			// Set the innerHTML of all the cells.
			cellID.innerHTML			= order;
			cellClient.innerHTML		= snapshot.clients[client].details.fName + " " + snapshot.clients[client].details.sName;
			cellTheme.innerHTML			= snapshot.clients[client].orders[order].details.cakeTheme;
			isFruit.innerHTML			= snapshot.clients[client].orders[order].details.isFruit ? "Yes" : "No";
			isSponge.innerHTML			= snapshot.clients[client].orders[order].details.isSponge ? snapshot.clients[client].orders[order].details.spongeFilling : "No";
			orderDate.innerHTML			= snapshot.clients[client].orders[order].details.orderDate;
			collectionDate.innerHTML	= snapshot.clients[client].orders[order].details.collectionDate;
		});
	});

	var addOrderRow = dbOrders.insertRow(-1);
	var addOrderCell = addOrderRow.insertCell(0);

	addOrderCell.className += "addNewRowCell";
	addOrderCell.colSpan = 7;
	addOrderCell.innerHTML = "Add New Order...";
	addOrderCell.style.textAlign = "center";

	addOrderCell.addEventListener("click", e => {

	alert("Clicked");
	});

}

function openTable(evt, tableName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tableName).style.display = "block";
  evt.currentTarget.className += " active";
  evt.currentTarget.className += " w3-red";
}
