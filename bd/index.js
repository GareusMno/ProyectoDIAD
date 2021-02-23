var db=require('./database');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
accessTokenSecret="ASDQE1317489JDASJD13UQW"
let usuarioSchema = new mongoose.Schema({
    dni: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20 
    },
    full_name: {
        type: String,
        required: true
    },
    avatar: {
        type: Number
    }
});
let Usuario = mongoose.model('usuario', usuarioSchema);
const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
    // recuperem el jwt
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
    return res.sendStatus(403);
    }
    // afegim a la petició les dades que venien en el jwt user
    req.user = user;
    // s'executa la segïuent funció, un cop s'ha fet el middleware
    next();
    });
    } else { // no està. contestem directament al client amb un error
    401 (unauthorized)
    res.sendStatus(401);
    }
};
let app = express();
app.use(bodyParser.json());
app.listen(8082);
app.use(bodyParser.json());
app.post('/register',(req,res)=>{
    let conn= new db.Database().getConnection();
    let dni=req.body.dni;
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.full_name;
    let avatar = req.body.avatar;
    let sqlinsertalumne="insert into alumne(id_alumne) VALUES (?)"
    let sqlinsertprofessor="INSERT INTO professor(id_professor) VALUES (?)"
    let sqldni="select dni from dni_profe where dni=?"
    let sql="INSERT INTO users(username,password,full_name,avatar) "+
            "VALUES (?,?,?,?)"
    conn.query(sql,[username,password,fullname,avatar],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok: false,
                error:"Error añadiendo un usuario",
                error:err
            })
        }
        else{
            let id=results["insertId"]
            conn.query(sqldni,[dni],(err,results,fields)=>{
                if (results.length==0){
                    conn.query(sqlinsertalumne,[id],(err,results,fields)=>{
                        if (err){
                            res.status(401).send({
                                ok:false,
                                error:"Error añadiendo alumno"
                            })
                        }else{
                            const accessToken = jwt.sign({id:id ,username: username, role:
                                "alumne" }, accessTokenSecret);
                            res.status(200).send({
                                ok:true,
                                resultado:"user_id:"+id+", username:"+username+", role: alumne "+"Token:"+accessToken
                            })
                        }
                    })
                }else{
                    conn.query(sqlinsertprofessor,[id],(err,results,fields)=>{
                        if (err){
                            res.status(402).send({
                                ok:false,
                                error:"Error añadiendo professor",
                                error:err
                            })
                        }else{
                            res.status(200).send({
                                ok:true,
                                resultado:"user_id:"+id+", username:"+username+", role: profe"+"Token:"+accessToken
                            })
                        }
                    })
                }
            })
        }
    })
    
});

app.post('/login',(req,res)=>{
    let conn= new db.Database().getConnection();
    let username = req.body.username;
    let password = req.body.password;
    let sql="select * from users where username=? and password=?"
    conn.query(sql,[username,password],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok: false,
                error:"Error entrando como usuario",
                error:err
            })
        }
        else{
            let id=results["id"]
            const accessToken = jwt.sign({id:id ,username: username, role:
                "professor" }, accessTokenSecret);
            res.status(200).send({
                ok: true,
                data:"Token: "+accessToken
            })
            console.log("Usuario dentro")
        }
    })
});