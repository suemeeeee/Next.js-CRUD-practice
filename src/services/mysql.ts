// 아래부터는 mysql2 사용방식
import mysql from 'mysql2/promise'

const dbConnection = async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
  })

  return db
}

export default dbConnection

{
  /*
const executeQuery = async (
  query: string,
  data: Array<FormDataEntryValue | number | null>,
) => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
    })
    const [result] = await db.execute(query, data)
    await db.end()
    return result
  } catch (error) {
    return error
  }
}
export default executeQuery */
}

// let DB
// try {
//   DB = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_SCHEMA,
//   })
// } catch (err) {
//   console.error(err)
// }

// module.exports = DB
