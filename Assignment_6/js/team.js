teams = [
    {
        "name" : "Mumbai Indians",
        "city" : "Mumbai, Maharashtra",
        "coach" : "Mahela Jaywardene",
        "home" : "Wankhede Stadium, Mumbai"
    },
    {
        "name" : "Chennai Super Kings",
        "city" : "Chennai, Tamil Nadu",
        "coach" : "Stephen Fleming",
        "home" : "M.A. Chidambaram Stadium, Chennai"
    }
]

function getTeams(){
    str = `<table id="t01" style="width: 100%"><caption>Teams</caption>`;
    str += `<tr><th>Name</th><th>City</th><th>Coach</th><th>Home</th></tr>`;
    for(let i of teams){
        str +=`<tr><td>${i["name"]}</td><td>${i["city"]}</td><td>${i["coach"]}</td><td>${i["home"]}</td></tr>`;
    }
    str += `</table>`;
    return str;
}



function addTeam(){
    name = document.getElementsByName("team")[0].value
    city = document.getElementsByName("team")[1].value
    coach = document.getElementsByName("team")[2].value
    home = document.getElementsByName("team")[3].value
    flag = true
    if (name === "" || city === "" || coach === "" || home === "" ){
        flag = false
    }
    
    if (flag == true){
        temp = {
            "name" : name,
            "city" : city,
            "coach" : coach,
            "home" : home
        }
        teams.push(temp)
    }    
    str = `<table id="t01" style="width: 100%"><caption>Teams</caption>`;
    str += `<tr><th>Name</th><th>City</th><th>Coach</th><th>Home</th></tr>`;
    for(let i of teams){
        str +=`<tr><td>${i["name"]}</td><td>${i["city"]}</td><td>${i["coach"]}</td><td>${i["home"]}</td></tr>`;
    }
    str += `</table>`;
    return str;
}

function deleteTeam(){
    var name = document.getElementsByName("delRec")[0].value

    for(i = 0; i < teams.length; i++){
        if(teams[i]["name"] === name){
            teams.splice(i, 1)
        }
    }
   
    str = `<table id="t01" style="width: 100%"><caption>Teams</caption>`;
    str += `<tr><th>Name</th><th>City</th><th>Coach</th><th>Home</th></tr>`;
    for(let i of teams){
        str +=`<tr><td>${i["name"]}</td><td>${i["city"]}</td><td>${i["coach"]}</td><td>${i["home"]}</td></tr>`;
    }
    str += `</table>`;
    return str;
}