import csv
from student import Student

data = list(csv.reader(open('coursedata.csv')))
coursedata = [Student(i, data[0]) for i in data[1:]]



l1 = list(filter(lambda i: i.__dict__["Qualification"] == 'BE', coursedata))

for i in l1:
    print(i.__dict__)
print()

print(len(l1),"\n")

l2 = list(filter(lambda i: i.__dict__["Placed"] == 'Y', coursedata))

print(len(l2),"\n")

l3 = list(filter(lambda i: i.__dict__["Completed"] == 'Y' and i.__dict__["Placed"] == 'N', coursedata))

print(len(l3),"\n")

l4 = list(filter(lambda i: i.__dict__["Placed"] == 'N', coursedata))

print(len(l4),"\n")

name = input("Enter name of student: ")

for i in coursedata:
    if i.__dict__["Name"] == name:
        print(i.__dict__)
print()

bat = input("Enter batch: ")
l5 = list(map(lambda i: i.__dict__["Placed"],(filter(lambda i: i.__dict__["Batch"] == bat, coursedata))))

count_l5 = 0
for i in l5:
    if i == 'Y':
        count_l5 += 1

print("{:.2f}\n".format((count_l5*100)/len(l5)))

ma = 0
ma_dict = {}
for i in coursedata:
    if float(i.__dict__["Score"]) > ma:
        ma = float(i.__dict__["Score"])
        ma_dict = i

print(ma_dict, "\n")

l6 = list(map(lambda i: i.__dict__["Name"], coursedata))

for i in l6:
    print(i)

print()

l7 = list(map(lambda i: {"Name" : i.__dict__["Name"], "Qualification" : i.__dict__["Qualification"], "Score" : i.__dict__["Score"]}, coursedata))

for i in l7:
    print(i)