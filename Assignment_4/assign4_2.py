from contact import Contact

data = []

x = Contact("1000", "Manthan Bhosle", "mbhosale00@gmail.com", "9075765191")
data.append(x.getContact())



def create():
    id = input("Enter contact ID: \n")

    isExist = False
    for i in data:
        if id == i["id"]:
            isExist = True
            break 
    if not isExist: 
        name = input("Enter contact name: \n")
        email = input("Enter email: \n")
        mob_no = input("Enter mobile no.: \n")
        entry = Contact(id, name, email, mob_no)
        data.append(entry.getContact())
        print("Congradulations! Contact has been added")

    else:
        print("contact is alreadyin contact book")

def read():
    k = {'id': 8, 'name': 20, 'email': 40, 'mobile': 1}
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in data:
        for key in i.keys():
            print(i[key], end=" "*(k[key] - len(i[key])))
        print()

def update():
        id = input("Type id of the contact you want to update:\n")
        k = {'1': 'name', '2': 'email', '3': 'mobile'}
        
        x = ""
        for i in  data:
            if i["id"] == id:
                x = input("What do you want to update? (1.name , 2.email, 3.mobile):\n")
            i[k[x]] = input(f"Enter {k[x]} : ")
            
        print("Contact has been updated")

def remov():
    id = input("Type id of the contact you want to remove:\n")
    for i in data:
        if i["id"] == id:
            data.remove(i)
    print("Contact has been deleted")

flag = False
while not flag:
    

    
    y = input("a.Create b.Read c.Update d.Remove ?\n")
    ope  = {'a': create, 'b': read, 'c': update, 'd': remov}
    
    ope[y]()

    z = input("Do you want to continue y/n?")
    if z == 'y':
        flag = False
    else:
        flag = True
