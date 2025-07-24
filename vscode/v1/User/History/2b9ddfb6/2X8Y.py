class Animal:
    def __init__(self,name, nick ):
        self.animal_name = name 
        self.nickname = nick 
    
    def fun1(self):
        print(f"Animal name is {self.animal_name} and its nickname is {self.nickname}")
    

animal1 = Animal("Dog","Jemy")
