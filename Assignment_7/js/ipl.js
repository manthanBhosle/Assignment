users = [
    {
	"name"	: "Manthan",
    "uname" : "m@gmail.com",
    "pass" : "manthan"
    }
]

function addToken(token){
	localStorage.setItem("token",token);
	console.log(token);
}

function logout(){
	localStorage.removeItem("token");
	return location.href = 'login.html';
}

function getToken(){
	return localStorage.getItem("token");
}


function login(username,password){
	fetch('https://indipl2020.herokuapp.com/authenticate',
		{
			  "method": 'POST',
			  "headers": {
    				'Content-Type': 'application/json',
  			},
  			"body": JSON.stringify({"username":username,"password":password})
		}
        ).then(resp=>resp.json())
		 .then(
			 data=>{
				 addToken(data["token"])
			 }
		 )
		 .catch(error=>{
			 console.log(error);
		 })
}

function getLoggedIn(uname, pass){
    str = "Incorrect credentials";
	flag = false;
    for(let i of users ){
        if(i["uname"] == uname && i["pass"] == pass){
			flag = true;
			return location.href='teams.html';
			
        }
	}
	if(flag == true){
		login('admin@gmail.com','admin');
	}
	return str;
}


function getAllTeams(){
	let token = getToken();
	console.log(token);
	fetch('https://indipl2020.herokuapp.com/ipl2020/team/all',
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
		// <div class="card text-center">
        // <div class="card-body">
        // <h5 class='card-title'>Card title</h5>
        // <p class='card-text'>This card has a regular title and short paragraphy of text below it.</p>
        // <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        // </div>
      	// </div>
        ).then(resp=>resp.json())
		 .then(data=>{
			teamData = document.querySelector("#teamData");
			let i = 0;
			let str = "<div class='row row-cols-1 row-cols-md-2'>";
			for(let team of data){
				str += `<a class='col mb-4' onclick="getTeamPlayers('${team.label}')"'>`;
				str += `<div class='card w-100 h-100'>`;
				str += `<div class='card-body'>`;
				str += `<h5 class='card-header'>${team.team}</h5>`;
				str += `<p class='card-text'><b>CITY: </b> ${team.city}</p>`;
				str += `</div>`;
				str += `</div>`;
				str += `</a>`;

			}
			str +="</div>";
			teamData.innerHTML = str; 
			 
			})
		 .catch(error=>{
			 console.log(error);
		 })

		 
}

getAllTeams();

function getTeamPlayers(label){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/${label}`,
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
		// table class='table table-bordered table-hover'>
		// <thead>
		// 	<tr>
		// 	<th scope='col'>#</th>
		// 	<th scope='col'>First</th>
		// 	<th scope='col'>Last</th>
		// 	<th scope='col'>Handle</th>
		// 	</tr>
		// </thead>
		// <tbody>
		// 	<tr>
		// 	<th scope='row'>1</th>
		// 	<td>Mark</td>
		// 	<td>Otto</td>
		// 	<td>@mdo</td>
		// 	</tr>
        ).then(resp=>resp.json())												
		 .then(data=>{
			teamPlayersData = document.querySelector("#teamPlayersData");
			let str = "<table class='table table-bordered table-hover'>";
			str += `<h4>Team : ${label}</h4>`;
			str += `<thead>`;
			str += `<tr><th scope='col'>Name</th><th scope='col'>Role</th><th scope='col'>Price</th></tr>`;
			str += `</thead>`;
			str += `<tbody>`;
			for(let player of data){
				str += `<tr><td>${player.name}</td><td>${player.role}</td><td>${player.price}</td></tr>`;
			}

			str += `</tbody>`;
			str += `</table>`;
			teamPlayersData.innerHTML = str; 
			getRoleAmount(label);
			})
		 .catch(error=>{
			 console.log(error);
		 })
		 
}


function getRoleAmount(label){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/amountbyrole/${label}`,
		{
			  "method": 'GET',
			  "headers": {
				   'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())
		 .then(data=>{
			 let arr = [["Role","Amount"]];
			 for(let r of data){
				 arr.push([r['roleName'],r['amount']]);
			 }
			 rolePieChart(label,arr);

		})
		 .catch(error=>{
			 console.log(error);
		 })
}



function rolePieChart(label, inputData){
	google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable(inputData);

        var options = {
			backgroundColor: 'transparent',
			title: 'Amount spent',
			titleTextStyle: {
				color: '#e0e0e0'
			},
			legend: {
				textStyle: {color: '#e0e0e0'}
			}
        };


		var chart = new google.visualization.PieChart(document.getElementById('piechart'));

		function selectHandler() {
			var selectedItem = chart.getSelection()[0];
			if (selectedItem) {
			  var topping = data.getValue(selectedItem.row, 0);
			  getTeamRolePlayers(label, topping)
			}
		}
  
		google.visualization.events.addListener(chart, 'select', selectHandler);

        chart.draw(data, options);
      }
}

function getTeamRolePlayers(label, role){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/${label}/${role}`,
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())												
		 .then(data=>{
			teamRolePlayersData = document.querySelector("#teamRolePlayersData");
			let str = "<table class='table table-bordered table-hover'>";
			str += `<h4>Role : ${role}</h4>`;
			str += `<thead>`;
			str += `<tr><th scope='col'>Name</th><th scope='col'>Role</th><th scope='col'>Price</th></tr>`;
			str += `</thead>`;
			str += `<tbody>`;
			for(let player of data){
				str += `<tr><td>${player.name}</td><td>${player.role}</td><td>${player.price}</td></tr>`;
			}

			str += `</tbody>`;
			str += `</table>`;
			teamRolePlayersData.innerHTML = str; 
			})
		 .catch(error=>{
			 console.log(error);
		 })
		 
}

function getTeams(){
	let token = getToken();
	console.log(token);
	fetch("https://indipl2020.herokuapp.com/ipl2020/team/all",
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())												
		 .then(data=>{
			teamsData = document.querySelector("#playersData");
			let str = "<table class='table table-bordered table-hover'>";
			str += `<h4>All Teams</h4>`;
			str += `<thead>`;
			str += `<tr><th scope='col'>Label</th><th scope='col'>Team</th><th scope='col'>City</th><th scope='col'>Coach</th><th scope='col'>Home</th></tr>`;
			str += `</thead>`;
			str += `<tbody>`;
			for(let team of data){
				str += `<tr><td>${team.label}</td><td>${team.team}</td><td>${team.city}</td><td>${team.coach}</td><td>${team.home}</td></tr>`;
			}

			str += `</tbody>`;
			str += `</table>`;
			teamsData.innerHTML = str; 
			})
		 .catch(error=>{
			 console.log(error);
		 })
		 
}

getTeams();

function getTeamAmount(){
	let token = getToken();
	console.log(token);
	fetch('https://indipl2020.herokuapp.com/ipl2020/team/totalamount',
		{
			  "method": 'GET',
			  "headers": {
				   'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())
		 .then(data=>{
			 let arr = [["Team","Amount"]];
			 for(let r of data){
				 arr.push([r['teamName'],r['amount']]);
			 }
			 drawAmountSpentByTeamChart(arr);
		})
		 .catch(error=>{
			 console.log(error);
		 })
}

getTeamAmount();

function drawAmountSpentByTeamChart(inputData){
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawMultSeries);
	function drawMultSeries (){
	  	data = google.visualization.arrayToDataTable(inputData);
     	  var options = {
			backgroundColor: 'transparent',
			title: 'Amount spent',
			titleTextStyle: {
				color: '#e0e0e0'
			},
			hAxis:{
				textStyle :{
					color: '#e0e0e0'
				},
				title : "Teams",
				titleTextStyle: {
					color: '#e0e0e0'
				}
			},
			vAxis:{
				textStyle :{
					color: '#e0e0e0'
				},
				title : "Amount",
				titleTextStyle: {
					color: '#e0e0e0'
				}
			}

		  };
	
		var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

		function selectHandler() {
			var selectedItem = chart.getSelection()[0];
			if (selectedItem) {
			  var topping = data.getValue(selectedItem.row, 0);
			  playerRoleAmount(topping);      //new func to get pie chart
			}
		}
  
		google.visualization.events.addListener(chart, 'select', selectHandler);

	
		chart.draw(data, options);
	}
}

//function to get team players 

function playerRoleAmount(label){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/amountbyrole/${label}`,
		{
			  "method": 'GET',
			  "headers": {
				   'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())
		 .then(data=>{
			 let arr = [["Role","Amount"]];
			 for(let r of data){
				 arr.push([r['roleName'],r['amount']]);
			 }
			 playerRolePieChart(label,arr);  //player role pie chart

		})
		 .catch(error=>{
			 console.log(error);
		 })
}

// new pie chart function for players
function playerRolePieChart(label, inputData){
	google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable(inputData);

        var options = {
			backgroundColor: 'transparent',
			title: `Team : ${label}`,
			titleTextStyle: {
				color: '#e0e0e0'
			},
			legend: {
				textStyle: {color: '#e0e0e0'}
			}
        };


		var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

        chart.draw(data, options);
      }
}

function getAllPlayers(){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/players/all`,
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())												
		 .then(data=>{
			allPlayers = document.querySelector("#allPlayers");
			let str = "<table class='table table-bordered table-hover'>";
			str += `<h4>All Players</h4>`;
			str += `<thead>`;
			str += `<tr><th scope='col'>Name</th><th scope='col'>Role</th><th scope='col'>Price</th></tr>`;
			str += `</thead>`;
			str += `<tbody>`;
			for(let player of data){
				str += `<tr><td>${player.name}</td><td>${player.role}</td><td>${player.price}</td></tr>`;
			}

			str += `</tbody>`;
			str += `</table>`;
			allPlayers.innerHTML = str; 
			})
		 .catch(error=>{
			 console.log(error);
		})
}

getAllPlayers();

function getMaxPaidbyRole(){
	let token = getToken();
	console.log(token);
	fetch(`https://indipl2020.herokuapp.com/ipl2020/team/maxamoutbyrole`,
		{
			  "method": 'GET',
			  "headers": {
				
					'Authorization': `Bearer ${token}`
  			   },
  			
		}
        ).then(resp=>resp.json())												
		 .then(data=>{
			maxPaid = document.querySelector("#maxPaid");
			str = ""
			for(let role of data){
				str += `<h4>Maximum Paid ${role.role}</h4>`;
				str += `<table class='table table-bordered table-hover'>`;
				str += `<thead>`;
				str += `<tr><th scope='col'>Name</th><th scope='col'>Role</th><th scope='col'>Price</th></tr>`;
				str += `</thead>`;
				str += `<tbody>`;

				for(let player of role["players"]){
					str += `<tr><td>${player.name}</td><td>${player.role}</td><td>${player.price}</td></tr>`;
				}

				str += `</tbody>`;
				str += `</table>`;
			}


			maxPaid.innerHTML = str; 
			})
		 .catch(error=>{
			 console.log(error);
		})
}

getMaxPaidbyRole();