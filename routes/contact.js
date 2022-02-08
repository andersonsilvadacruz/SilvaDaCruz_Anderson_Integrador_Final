"use strict";
const express = require("express");
const { body, validationResult } = require("express-validator");   //validaciones//
const router = express.Router();                                   //(puedo exportar funciones a otros archivos)//
const nodemailer = require("nodemailer");                          //modulo envia mails//

/*GET*/
router.get("/", (req, res) => {
  res.render("contact");                                             //renderiza el html "hbs"(ROUTER ,va a app.js)//
});

const validaciones = [
  body("name", "# debe ingresar nombre válido...!!!").exists().isLength({ min: 2 }),
  body("lastName", "# debe ingresar apellido válido...!!!").exists().isLength({ min: 3 }),
  body("email", "# debe ingresar correo válido...!!!").exists().isEmail(),
  body("message", "# debe ingresar mensaje válido...!!!").exists().isLength({ min: 3 }),
];

/*POST*/
router.post("/", validaciones, async (req, res) => {
 
  const errors = validationResult(req);
 
  //veo errors y los renderizo
  if (!errors.isEmpty()) {
    const arrWarnigs = errors.mapped();
    const arrWarnig = {...arrWarnigs}
    const formData = req.body;
    res.render("contact", { formData, arrWarnig });
    
  }
  
    //cuerpo del mail a enviar
  const contenidoMail = {
    to: "cofla@rrhh.com",
    from: req.body.email,
    subject: "Mensaje desde formulario de contacto",
    html: `${req.body.name} ${req.body.lastName} envio el siguiente mensaje: ${req.body.message}`,
  };

   //coneccion con DB de nodemailer
  const cartero = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  
   
  if (errors.isEmpty()) {    //en esta linea evito mandar un mail vacio SI "errors" contiene algun error. 
    let estadoEnvioMail = await cartero.sendMail(contenidoMail);
    let statusMessage = "";
    
    if (estadoEnvioMail.rejected.length) {
      statusMessage = "No pudimos enviar el mail...(servidor caido);";
    } else {
      statusMessage = "Mensaje enviado.";
    }
    res.render("contact", { statusMessage });
    
  }
});


module.exports = router; //exporto modulo(se va a requerir en donde se necesite)
