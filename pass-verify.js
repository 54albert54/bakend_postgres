const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = 'admin123';
  const hash = '$2b$10$1nlQZU3R6Ws/1LpdeZkyGOGfUcJMZ09z4KjMbokNBBZT/KUNMhAw2'
  const isMatch = await bcrypt.compare(myPassword,hash)
  //console.log(isMatch)
}

verifyPassword()
