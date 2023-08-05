const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5MTE1NDE1NH0.nVfMR--w6UJny1V1xizLYLvPDsEtZUe7BhVycJPRrxw'
function verifyToken(token, secret){
  return jwt.verify(token,secret)
}

const payload = verifyToken(token,secret)

//console.log(payload)
