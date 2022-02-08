const mysql = require("mysql");//es la herramienta para conectarme
const util = require("util");//promesifica la coneccion a la base de datos


const pool = mysql.createPool({ //coneccion con base de datos
  connectionLimit: 10,
  host: process.env.DB_HOST,//variables de entorno (los datos estan en .env)
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

pool.query = util.promisify(pool.query);//todo esta adentro de "pool" ahora
module.exports = pool;
