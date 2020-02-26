export const randomId = (length = 8) => {
   let result = new Date().getTime().toString()
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   let charactersLength = characters.length
   if(length>20 || length<0) {
       length = 8
   }
   for ( var i = 0; i <= length; i++ ) {
     result = result.concat(characters.charAt(Math.floor(Math.random() * charactersLength)))
   }
   return result
}

export const objectToArray = (list) => {
    let finalArray = []
    for (var [key, value] of Object.entries(list)) {
      finalArray.push(value)
    }
    return finalArray
}