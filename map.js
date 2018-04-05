let aDatos = [1,2,3,4,5,6]

aDatos.forEach( (item) => {console.log(item * 2)})
aDatos2 = aDatos.map((item) => {
    item = item * 2
    console.log(item)
    return item    
})

console.log(aDatos)
console.log(aDatos2)