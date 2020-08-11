users = [
    {
    "name" : "Manthan",
    "uname" : "m@gmail.com",
    "pass" : "manthan"
    }
]

function getLoggedIn(uname, pass){
    str = "Incorrect credentials";

    for(let i of users ){
        if(i["uname"] == uname && i["pass"] == pass){
            return window.location.replace('teams.html');
        }
    }
    return str;
    }

function addUser(name, uname, pass){
    temp = {
        "name" : name,
        "uname" : uname,
        "pass" : pass 
    }
    users.push(temp);
    console.log(users);
    return window.location.replace('login.html');
}

