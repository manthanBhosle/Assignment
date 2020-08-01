
import csv

f = open("coursedata.csv")

csv_reader = csv.DictReader(f)

coursedata = []

for row in csv_reader:
    coursedata.append(row)

l1 = list(filter(lambda i: i["Qualification"] == 'BE', coursedata))

for i in l1:
    print(i)
print()

print(len(l1),"\n")

l2 = list(filter(lambda i: i["Placed"] == 'Y', coursedata))

print(len(l2),"\n")

l3 = list(filter(lambda i: i["Completed"] == 'Y' and i["Placed"] == 'N', coursedata))

print(len(l3),"\n")

l4 = list(filter(lambda i: i["Placed"] == 'N', coursedata))

print(len(l4),"\n")

name = input("Enter name of student: ")

for i in coursedata:
    if i["Name"] == name:
        print(i)
print()

bat = input("Enter batch: ")
l5 = list(map(lambda i: i["Placed"],(filter(lambda i: i["Batch"] == bat, coursedata))))

count_l5 = 0
for i in l5:
    if i == 'Y':
        count_l5 += 1

print("{:.2f}\n".format((count_l5*100)/len(l5)))

ma = 0
ma_dict = {}
for i in coursedata:
    if float(i["Score"]) > ma:
        ma = float(i["Score"])
        ma_dict = i

print(ma_dict, "\n")

l6 = list(map(lambda i: i["Name"], coursedata))

for i in l6:
    print(i)

print()

l7 = list(map(lambda i: {"Name" : i["Name"], "Qualification" : i["Qualification"], i["Score"] : i["Score"]}, coursedata))

for i in l7:
    print(i)