import json

emp = open("emp.json", "r")
dept = open("dept.json", "r")

emp_d = json.load(emp)
dept_d = json.load(dept)

k1 = {"empno" : 8, "ename": 15 , "sal" : 10}
k2 = {"dname" : 15, "location" : 1}     #empno,name,salary,dname, location of the all the employess


for i in k1.keys():
    print(i, end=" "*(k1[i] - len(i)))
for i in k2.keys():
    print(i, end=" "*(k2[i] - len(i)))
print("\n")
for i in emp_d:
    for key in k1.keys():
        print(i[key], end=" "*(k1[key] - len(i[key])))
    for j  in dept_d:
        if i["deptno"] == j["deptno"]:
            for key in k2.keys():
                print(j[key], end=" "*(k2[key] - len(j[key])))
    print()
print("\n")

total_sal = 0
dept_sal = list( filter(lambda j: j["deptno"] == "10", emp_d))
for i in dept_sal:
    total_sal += float(i["sal"])
print(total_sal,"\n")

for i in dept_sal:
    print(i["ename"])
print()

comp = {"max" : emp_d[0], "min" : emp_d[0]}
for i in emp_d:
    if float(i["sal"]) > float(comp["max"]["sal"]):
        comp["max"] = i    
    if float(i["sal"]) < float(comp["min"]["sal"]):
        comp["min"] = i
for key in comp.keys():
    print(key , ":", comp[key]["ename"])
print()

find_max = []
max_dept = {}
min_dept = {}
for i in emp_d:
    if i["deptno"] not in max_dept.keys():
        max_dept[i["deptno"]] = float(i["sal"])
    if max_dept[i["deptno"]] < float(i["sal"]):
        max_dept[i["deptno"]] = float(i["sal"])

for i in emp_d:
    if i["deptno"] not in min_dept.keys():
        min_dept[i["deptno"]] = float(i["sal"])
    if min_dept[i["deptno"]] > float(i["sal"]):
        min_dept[i["deptno"]] = float(i["sal"])

total_dept = {}
count = {}
for i in emp_d:
    if i["deptno"] not in total_dept.keys():
        total_dept[i["deptno"]] = float(i["sal"])
        count[i["deptno"]] = 0
    
    total_dept[i["deptno"]] += float(i["sal"])
    count[i["deptno"]] += 1

avg_dept = {}
for i in total_dept.keys():
    avg_dept[i] = total_dept[i]/count[i]

for i in max_dept.keys():
    for j in dept_d:
        if i == j["deptno"]:
            print(j["dname"], ":",max_dept[i]) 
print()

for i in min_dept.keys():
    for j in dept_d:
        if i == j["deptno"]:
            print(j["dname"], ":",min_dept[i])
print()

for i in avg_dept.keys():
    for j in dept_d:
        if i == j["deptno"]:
            print(j["dname"], ":",avg_dept[i])
print()


max_key = max(total_dept, key=total_dept.get)
for i in dept_d:
    if i["deptno"] == max_key:
        print(i["dname"])
print()

for i in emp_d:
    if i["mgr"] == "NULL":
        print(i["ename"])
print()

for i in count.keys():
    for j in dept_d:
        if i == j["deptno"]:
            print(j["dname"], ":",count[i])
print()

emp.close()
dept.close()