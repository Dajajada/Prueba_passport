const express = require ('express');
const passport =require ('passport');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const PassportLocal= require('passport-local').Strategy;

const app = express();

// Esto es un midleware  para que express pueda interpretar la informacion del formulario,
app.use(express.urlencoded({extended: true}));

//



app.use(cookieParser('mi ultra  secreto'));

app.use(session({
        secret: 'mi ultra  secreto',
        resave: true,
        saveUninitialized:true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done){

     if(username=== "usuario" && password === "12345678")
        return done(null,{id:1,name:"Pepe"});

    done(null,false);

}));

// {id:1, name: "Cody"}
// 1=> Serializacion   Es  para 

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Desserializacion Es pasar del numero al id del usuario qu esta en la base de datos.
passport.deserializeUser(function(id,done){

    done(null,{id:1,name: "Cody"});
});






///
app.set('view engine','ejs');

app.get("/",(req,res,next)=>{
    if(req.isAuthenticated()){

     return next();
    }else{
        res.render("login");
    }
}, (req,res)=>{

    res.render("inicio");
    // Si sesion iniciada mostrar bienvenida





    //SI no login redireccionar a login



})

app.get("/login",(req,res)=>{
    //Muestra el formulario de login
    res.render("login");

});


app.post("/login",passport.authenticate('local',{
        successRedirect:"/",
        failureRedirect:"/login"

}))

    //Recibir las credenciales e iniciar sesion.


app.listen(3000,()=> console.log("Server runnig ...."));