import pymongo 


try:  
    client = pymongo.MongoClient("mongodb+srv://user:user@empdept.bazam.mongodb.net/empdept?retryWrites=true&w=majority")
    db = client.empdept
except:
    print("Can not connect")

def getTeams():
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$group': {
                '_id': 0, 
                'labels': {
                    '$push': '$label'
                }
            }
        }, {
            '$project': {
                '_id': 0, 
                'labels': 1
            }
        }
    ])
    for i in result:
        for j in i["labels"]:
            print(j)

def getTeamPlayers():
    team = input("Enter a team: ")
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$match': {
                'label': team
            }
        }, {
            '$project': {
                '_id': 0, 
                'players': 1
            }
        }
    ])
    k = {'name': 30, 'price': 15, 'role': 1}
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in result:
        for j in i['players']:
            for key, value in j.items():
                print(value, end=" "*(k[key] - len(str(value))))
            print()
   
def getRoleWiseCount():
    team = input("Enter a team: ")
    temp = ["Batsman", "Wicket Keeper", "All-Rounder", "Bowler"]
    for key in temp:
        result = client['ipl2020']['ipl'].aggregate([
            {
                '$match': {
                    '$and': [
                        {
                            'label': team
                        }
                    ]
                }
            }, {
                '$project': {
                    'players': 1
                }
            }, {
                '$unwind': {
                    'path': '$players'
                }
            }, {
                '$match': {
                    'players.role': key
                }
            }, {
                '$count': key
            }
        ])
        for i in result:
            print(key,":",i[key])
    
def getbyTeamRole():
    team = input("Enter a team: ")
    role = input("Enter role (Batsman, Wicket Keeper, All-Rounder, Bowler): ")
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$match': {
                'label': team
            }
        }, {
            '$project': {
                '_id': 0, 
                'players': 1
            }
        }, {
            '$unwind': {
                'path': '$players'
            }
        }, {
            '$match': {
                'players.role': role
            }
        }, {
            '$group': {
                '_id': 0, 
                'team_role': {
                    '$push': '$players'
                }
            }
        }
    ])
    k = {'name': 30, 'price': 15, 'role': 1}
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in result:
        for j in i['team_role']:
            for key, value in j.items():
                print(value, end=" "*(k[key] - len(str(value))))
            print()

def getAllTeamDetails():
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$project': {
                '_id': 0, 
                'city': 1, 
                'coach': 1, 
                'home': 1, 
                'name': 1
            }
        }
    ])
    k = {'city': 25, 'coach': 22, 'home': 47, 'name':1, }
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in result:
        for key, value in i.items():
            print(value, end=" "*(k[key] - len(str(value))))
        print()

def getTotalPrice():
    teams = ["MI", "DC", "KXIP", "KKR", "RR", "RCB", "SRH", "CSK", "city"]
    for team in teams: 
        result = client['ipl2020']['ipl'].aggregate([
            {
                '$match': {
                    'label': team
                }
            }, {
                '$project': {
                    '_id': '$label', 
                    'players': 1
                }
            }, {
                '$unwind': {
                    'path': '$players'
                }
            }, {
                '$group': {
                    '_id': '$_id', 
                    'total': {
                        '$sum': '$players.price'
                    }
                }
            }
        ])
        for i in result:
            print(team,":",i["total"])

def getPaidbyRole():
    team = input("Enter a team: ")
    role = ["Batsman", "Wicket Keeper", "All-Rounder", "Bowler"]
    for i in role:
        result = client['ipl2020']['ipl'].aggregate([
            {
                '$match': {
                    'label': team
                }
            }, {
                '$project': {
                    '_id': 0, 
                    'players': 1
                }
            }, {
                '$unwind': {
                    'path': '$players'
                }
            }, {
                '$match': {
                    'players.role': i
                }
            }, {
                '$group': {
                    '_id': 0, 
                    'total': {
                        '$sum': '$players.price'
                    }
                }
            }
        ])
        for j in result:
            print(i,":",j["total"])

def sortbyField():
    # teams = ["MI", "DC", "KXIP","KKR", "RR", "RCB", "SRH", "CSK"]
    # team = input("Enter a team: ")
    x = input("which field do you choose for sort (name, price): ")
    field = {"name" : "player.name", "price" : "player.price"}
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$unwind': {
                'path': '$players'
            }
        }, {
            '$project': {
                '_id': 0, 
                'player': '$players'
            }
        }, {
            '$sort': {
                field[x]: 1
            }
        }
    ])
    k = {'name': 30, 'price': 15, 'role': 1}
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in result:
        for key, value in i["player"].items():
            print(value, end=" "*(k[key] - len(str(value))))
        print()

def maxPaidPlayers():
    
    result = client['ipl2020']['ipl'].aggregate([
        {
            '$unwind': {
                'path': '$players'
            }
        }, {
            '$group': {
                '_id': '$players.role', 
                'maxprice': {
                    '$max': '$players.price'
                }, 
                'minprice': {
                    '$min': '$players.price'
                }, 
                'players': {
                    '$push': '$players'
                }
            }
        }, {
            '$project': {
                'maxamount': '$maxprice', 
                'minamount': '$minprice', 
                'maxplayers': {
                    '$filter': {
                        'input': '$players', 
                        'as': 'players', 
                        'cond': {
                            '$eq': [
                                '$$players.price', '$maxprice'
                            ]
                        }
                    }
                }, 
                'minplayers': {
                    '$filter': {
                        'input': '$players', 
                        'as': 'players', 
                        'cond': {
                            '$eq': [
                                '$$players.price', '$minprice'
                            ]
                        }
                    }
                }
            }
        }, {
            '$project': {
                'role': '$_id', 
                '_id': 0, 
                'maxamount': '$maxamount', 
                'minamount': '$minamount', 
                'maxpaidplayer': '$maxplayers', 
                'minpaidplayer': '$minplayers'
            }
        }
    ])
    for i in result:
        print("Role: ",i["role"])
        print("Price",i["maxamount"])
        print("Players :")
        for value in i["maxpaidplayer"]:
            print(" "*4,value["name"])
        print()


done = "y"
while(done == "y"):
    ope = {"1" : getTeams, "2" : getTeamPlayers, "3" : getRoleWiseCount, "4" : getbyTeamRole, "5" : getAllTeamDetails, "6" : getTotalPrice, "7" : getPaidbyRole, "8" : sortbyField, "9" : maxPaidPlayers}
    print("""1. Get all the team labels
2. Get all players of the given team
3. Get role wise count of given team
4. Get Player details by role and team
5. Get all team details
6. Get amount spent by each team
7. Get amount spent on role by the team
8. Display all the player details sort by given field
9. Get Max Paid players of all roles""")
    query = input("Enter a number from above: ")
    ope[query]()
# getTeams()
# getTeamPlayers()
# getRoleWiseCount()
# getbyTeamRole()
# getAllTeamDetails()
# getTotalPrice()
# getPaidbyRole()
# sortbyField()
    done = input("Do you want to continue (y/n): ") 