const express = require("express");
const path = require("path");                                   //con esto puedo resibir el json que viene del formulario
const hbs = require("hbs");
const fileupload = require("express-fileupload");               //puedo manejar "archivos" tipo imagen
const session = require("express-session");
const PORT = 3000;
const app = express();                                         //declaro app(todas los metodos de express estan en app)

require("dotenv").config();                                    //variables de entorno

//Rutas
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeSecret = require("./routes/secret");
const routeContact = require("./routes/contact");


//const { start } = require("repl");
// https://appdelante.com/blog/repl-node-js


app.use(express.static(path.join(__dirname, "public")));       //declaro la cuta de la carpeta public
app.use(express.urlencoded({ extended: false }));              //habilitamos la lectura de datos en campos del formulario

app.set("view engine", "hbs");                                 //establecer el motor de plantillas
hbs.registerPartials(path.join(__dirname, "./views/partials"));

//middleware de configuración de Express-FileUpload(puedo manipular archivos)
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//configuramos express-session
//https://www.npmjs.com/package/express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
//creamos el middleware para verificar los intentos de igreso a la ruta "secret",
//Aunque tratemos de entrar directamente, siempre se correrá antes el middleware
//y solo podremos acceder si req.session.user (que se setea con un valor en caso de login positivo)
//luego, si salimos de "secret", podremos volver si escribimos la ruta, siempre que la sesión
//continúe activa

const secured = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("login");
  }
};

const isAuth = (req, res, next) => {  //creo middleware y lo paso para que este disponible en todas las vistas
  app.locals.user = req.session.user; //variable local que se utilizara en hbs para ver el dato de USER (dato variable)                                   
  next();                             //este dato variable podra ser requerido en el hbs//mantiene el login AUTENTICO
};

app.use("/", isAuth, routeIndex);     //isAuth ,inserto el middleware con la variable local
app.use("/login", routeLogin);
app.use("/secret", secured, routeSecret);
app.use("/contact", routeContact);


app.get("*", (req, res) => {
  res.send("error 404");
});




app.listen(PORT, (err) => {
  err
    ? console.log("error")
    : console.log(`Servidor corre en http://localhost:${PORT}/`);
});
