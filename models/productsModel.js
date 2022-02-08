const pool = require("../db");
//función para traer datos

const getProducts = async () => {
  try {
    const query = "select * from calzados ";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
};


//función para traer un producto según su id//(pedido por ID)
const getProduct = async (id) => {
  try {
    const query = "select * from calzados where id =?";
    const row = await pool.query(query, [id]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (data) => {
  try {
    const query = "insert into calzados set ?";
    const row = await pool.query(query, [data]);
    return row;
  } catch (error) {
    console.log(error);
  }
};

// func para modificar un registro en la BD, recibe un objeto con los nuevos
//valores y el id
async function modifyProduct(data, id) {
  try {
    const query = "update calzados set ? where id = ?";
    const row = await pool.query(query, [data, id])
    return row;
 
  } catch (error) {
    console.log(error)

  }
 
}

const deleteProduct = async (id) => {
  const query = "delete from calzados where id = ?";
  const row = await pool.query(query, [id]);
  return row;
};



module.exports = { getProducts,addProduct,getProduct,modifyProduct,deleteProduct};
