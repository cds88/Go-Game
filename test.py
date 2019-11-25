

def getList():
    lista = []     
    line = input()
    lista.append(line)
    length = len(line)

    [lista.append(input())for i in range(0, length-1)]
    return lista
     
class Element:
    def __init__(self,x,y, value):
        self.x=x
        self.y=y
        self.value = value
    
    def __repr__(self):
        return str(x) + " " +str(y)

gl=[]        

l =[
[0,0,0,0,0,0,2,0,0],
[0,0,1,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0],
[0,2,0,0,0,0,0,0,0],
[0,1,1,1,0,0,1,0,0],
[0,1,2,1,0,0,0,0,0],
[0,1,1,1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0]
]



        
    
