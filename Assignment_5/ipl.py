import json

f = open("ipl2020.json", "r")
data = json.load(f)

team_label = list(map(lambda i: i["label"], data))


for i in team_label:
    print(i)
print()

team = list(map(lambda a: a["players"], filter(lambda i: i["label"] == "MI", data)))[0]


for i in team:
    print(i["name"])
print()

count = {}

for i in team:
    if i["role"] not in count.keys():
        count[i["role"]] = 0
    
    count[i["role"]] += 1

for key, value in count.items():
    print(key, ":", value)
print()

player_details = list(filter(lambda i: i["role"] == "Batsman",team))
k = {'name': 30, 'price': 15, 'role': 1}
for i in k.keys():
    print(i, end=" "*(k[i] - len(i)))
print("\n")
for i in player_details:
    for key, value in i.items():
        print(value, end=" "*(k[key] - len(str(value))))
    print()
print()

for i in k.keys():
    print(i, end=" "*(k[i] - len(i)))
print("\n")
for i in team:
    for key, value in i.items():
        print(value, end=" "*(k[key] - len(str(value))))
    print()
print()

exp_teams = {}
for i in data:
    if i["label"] not in exp_teams:
        exp_teams[i["label"]] = 0
    
    exp_teams[i["label"]] += i["players"][0]["price"]

for key, value in exp_teams.items():
    print(key, ":", value)
print()

role_exp = {}
for i in team:
    if i["role"] not in role_exp:
        role_exp[i["role"]] = 0
    
    role_exp[i["role"]] += i["price"]

for key, value in role_exp.items():
    print(key, ":", value)
print()

all_players = []
for i in data:
    temp = {}
    temp = i["players"]
    all_players += temp 

sort_name = sorted(all_players, key = lambda i: i['name'])
for i in k.keys():
    print(i, end=" "*(k[i] - len(i)))
print("\n")
for i in sort_name:
    for key, value in i.items():
        print(value, end=" "*(k[key] - len(str(value))))
    print()
print()

sort_price = sorted(all_players, key = lambda i: i['price'])
for i in k.keys():
    print(i, end=" "*(k[i] - len(i)))
print("\n")
for i in sort_price:
    for key, value in i.items():
        print(value, end=" "*(k[key] - len(str(value))))
    print()
print()

max_paid = {"Batsman" : 0, "Wicket Keeper" : 0, "All-Rounder" : 0, "Bowler" : 0}

temp = {"Batsman" : "", "Wicket Keeper" : "", "All-Rounder" : "", "Bowler" : ""}
for i in all_players:
    if i["price"] > max_paid[i["role"]]:
        
        temp[i["role"]] = i

for key in temp.keys():
    print(key, ":", temp[key]["name"])
print()


f.close()