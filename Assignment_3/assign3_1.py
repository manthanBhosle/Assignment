f = open("quiz.txt", mode='r')
quiz = ""
for line in f:
    quiz += line

que =[]

que = quiz.split("#")

que_list = []
for i in range(1, len(que)):
    temp = que[i].split("Ans:")
    que_dict = {}
    que_dict["que"] = temp[0]
    que_dict["ans"] = temp[1].split("\n")[0]
    que_list.append(que_dict)
count = 0    
for i in que_list:
    print(i["que"])
    user_ans = input("Choose from 1 2 3 or 4: \n")
    if user_ans == i["ans"]:
        count += 1
    print("Correct ans is ", i["ans"], "\n")

p =(count*100)/len(que_list)

print("No. of que correct   : ", count)
print("No.of que wrong      : ", len(que_list)-count)
print("Percentage scored    : {:.2f}".format(p) )

if p <= 40:
    print("Result               : Fail")
else:
    print("Result               : Pass")