const pool = require("../db");//conección a la base de datos
const md5 = require("md5");//modulo de encriptacion

//"getUser" es la función de consulta a base de datos.
const getUser = async (user, pass) => { 
  const query = "select * from calzado.registrados where nombre = ? and contraseña = ?";
  const row = await pool.query(query, [user, md5(pass)]);//esta linea hace la consulta
  return row[0];//aca retorna el resultado de la consulta(la "fila"con los valores de cada columna solicitada)
};



module.exports = { getUser };//exprtamos para utilizarlo como metodo en otra funcion
