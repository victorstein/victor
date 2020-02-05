
export const passwordGenerator = (len) => {
  var length = (len) || (10)
  var string = 'abcdefghijklmnopqrstuvwxyz' // to upper
  var numeric = '0123456789'
  var punctuation = '!@#$%^&*()_+~`|}{[]:;?><,./-='
  var password = ''
  var character = ''
  var crunch = true
  while (password.length < length) {
    var entity1 = Math.ceil(string.length * Math.random() * Math.random())
    var entity2 = Math.ceil(numeric.length * Math.random() * Math.random())
    var entity3 = Math.ceil(punctuation.length * Math.random() * Math.random())
    var hold = string.charAt(entity1)
    hold = (password.length % 2 === 0) ? (hold.toUpperCase()) : (hold)
    character += hold
    character += numeric.charAt(entity2)
    character += punctuation.charAt(entity3)
    password = character
  }
  password = password.split('').sort(function () { return 0.5 - Math.random() }).join('')
  return password.substr(0, len)
}
