contact_book = [{"id" : "1000", "name" : "Manthan Bhosle", "email" : "f20170543@hyderabad.bits-pilani.ac.in", "mobile" : "9075765191"},
                {"id" : "1001", "name" : "Varun Bhosle", "email" : "varunbhosale2468@gmail.com", "mobile" : "7776833724"},
                {"id" : "1002", "name" : "Ankita Bhosle", "email" : "ankitabhosale181@gmail.com", "mobile" : "9420722112"},
                {"id" : "1004", "name" : "Ajit Bhosle", "email" : "bhosleajit702@gmail.com", "mobile" : "7770044729"}]

def create():
    contact = {}
    id = input("Enter contact ID: \n")

    isExist = False
    for i in contact_book:
        if id == i["id"]:
            isExist = True
            break 
    if not isExist: 
        name = input("Enter contact name: \n")
        email = input("Enter email: \n")
        mob_no = input("Enter mobile no.: \n")
        contact["id"] = id
        contact["name"] = name
        contact["email"] = email
        contact["mobile"] = mob_no
        contact_book.append(contact)
        print("Congradulations! Contact has been added")

    else:
        print("contact is alreadyin contact book")

def read():
    k = {'id': 8, 'name': 20, 'email': 40, 'mobile': 1}
    for i in k.keys():
        print(i, end=" "*(k[i] - len(i)))
    print("\n")
    for i in contact_book:
        for key in i.keys():
            print(i[key], end=" "*(k[key] - len(i[key])))
        print()

def update():
        id = input("Type id of the contact you want to update:\n")
        k = {'1': 'name', '2': 'email', '3': 'mobile'}
        
        x = ""
        for i in  contact_book:
            if i["id"] == id:
                x = input("What do you want to update? (1.name , 2.email, 3.mobile):\n")
            i[k[x]] = input(f"Enter {k[x]} : ")
            
        print("Contact has been updated")

def remov():
    id = input("Type id of the contact you want to remove:\n")
    for i in contact_book:
        if i["id"] == id:
            contact_book.remove(i)
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
