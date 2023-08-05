require('dotenv').config()


const config ={
  env: process.env.NODE_ENV ||"production",
  isProd:process.env.NODE_ENV ==="production",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,

}
module.exports ={ config}

//esto es opara poder ver si mando aqui the head
