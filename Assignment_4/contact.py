class Contact:

    def __init__(self, id, name, email, mobile):
        self.id = id
        self.name = name
        self.email = email
        self.mobile = mobile
        
    def getContact(self):
        return {"id" : self.id, "name" : self.name, "email" : self.email, "mobile" : self.mobile}