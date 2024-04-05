// 아래부터는 mysql2 사용방식
import mysql from 'mysql2/promise'

const dbConnection = async (): Promise<mysql.Connection> => {
  const db: mysql.Connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
  })

  return db
}

export default dbConnection
