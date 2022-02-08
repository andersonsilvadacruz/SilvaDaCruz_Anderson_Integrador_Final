"use strict";
const { Console } = require("console");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const router = express.Router();
const productsModel = require("../models/productsModel");//traigo en forma de metodos las funciones q consultan a la db
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



//render del CRUD
router.get("/", async (req, res) => {

  const products = await productsModel.getProducts();
  const dataCalzados = products.map((row) => {
    const imageURL = cloudinary.url(row.imagen);
    return { ...row, imageURL };
  });

  res.render("secret", { dataCalzados });

});

router.get("/addItem", (req, res) => {
  res.render("addItem", { layout: 'layout2' });
});


//---TRAE PRODUCTOS----//
router.post("/addItem", async (req, res) => {

  //enviamos la imagen a Cloudinary y obtenemos la URL
  let imageFile = req.files.imageFile;  //requiero "archivos de form"
  const img_id = (await uploader(imageFile.tempFilePath)).public_id;


  //METODO SIN Spread Operator
  //mandamos todo, inclusive el id de la imagen alojada en Cloudinary a nuestra DB
  // const { name, origin, presentation, description, intensity, price } =
  //   req.body;
  // const newProduct = {
  //   name,
  //   origin,
  //   presentation,
  //   description,
  //   intensity,
  //   price,
  //   image: img_id,
  // };
  await productsModel.addProduct({ ...req.body, imagen: img_id });//Spread Operator
  res.redirect("/secret");

});






//----------TRAE EL PRODUCTO POR MEDIO DEL ID DE LA db--------
//controlador de ruta que muestra el producto para editarlo o borrarlo, así
//nos ahorramos la necesidad de hacer dos controladores y dos rutas distintas

//TRAE POR ID
router.get("/:id", async (req, res) => {
  const row = await productsModel.getProduct(req.params.id);
  const product = {
    id: row[0].id,
    tipo: row[0].tipo,
    color: row[0].color,
    talle: row[0].talle,
    stock: row[0].stock,
    imagen: row[0].imagen,
  };
  
  res.render("editItem", { product, layout: 'layout2.hbs' });
});



//EDITA POR ID
router.post("/editProduct", async (req, res) => {
  let img_id = null;
  if (!req.files) {
    img_id = req.body.prevImage;
  } else {
    //traemos el registro de la tabla porque necesitamos el campo image, que contiene el id
    //a través del cual identificamos las imágenes en cloudinary
    const row = await productsModel.getProduct(req.body.id);
    await destroy(row[0].imagen);
    const imageFile = req.files.imageFile;
    img_id = (await uploader(imageFile.tempFilePath)).public_id;
  }
  const data = {
    id: req.body.id,
    tipo: req.body.tipo,
    color: req.body.color,
    talle: req.body.talle,
    stock: req.body.stock,
    imagen: img_id,
  };
  await productsModel.modifyProduct(data, data.id);
  res.redirect("/secret");
})

//controlador para eliminar un registro, recibe id por param
router.get("/deleteProduct/:id", async (req, res) => {
  //traemos el registro de la tabla porque necesitamos el campo imagen, que contiene el id
  //a través del cual identificamos las imágenes en cloudinary
  const row = await productsModel.getProduct(req.params.id);
  await destroy(row[0].imagen);
  await productsModel.deleteProduct(req.params.id);
  res.redirect("/secret");
});

module.exports = router;
