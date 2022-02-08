"use strict";
const express = require("express");
const router = express.Router();                         //metodo para el enrrutamiento
const userModel = require("../models/userModel");        //metodo de consulta a DB






//~GET~-----------------------//
router.get("/", (req, res) => {
  res.render("login");
});



//~GET~---------------------------//
router.get("/logout", (req, res) => {
  req.session.destroy();                             //DESLOGUEO (metodo de express session)
  res.redirect("/");
});



//~POST~------------------------------//
router.post("/", async (req, res) => {
  const { user, pass } = req.body;                          //captura datos del form (los asigna con DESTRUCTURACION a las constantes)
  const data = await userModel.getUser(user, pass);         //DaTA contendra la respuesta de la consulta a la DB
  
  if (data != undefined) {                                  //"SI" la respuesta a la consulta NO esta vacia permite el paso
    req.session.user = user;                                //constante para renderizar el USER//aca vive req.session.user que sera requerida como variable local
    //res.render("secret", { user});                        //nos envia a la ruta secreta si es LOGUEO correcto

                                                           
    res.redirect( "secret" );           
                                                  
    
  } else {                                           //"SI NO" pasa la validacion se vuelve a enviar a LOGIN
    const message ="Usuario o Contraseña Incorrectos";
    res.render("Login", { message });
  }           //"ruta","paso info"
});





module.exports = router;
