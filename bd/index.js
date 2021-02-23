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

app.get('/notes',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "select assignatura.id_assig,assignatura.cod_assig,notes.nota from notes,assignatura where notes.id_assig=? and notes.id_assig=assignatura.id_assig"
    conn.query(sql,[4],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok: false,
                error:"Error buscando las notas",
                erro:err
            })
        }else{
            //let assig = results[id_assig]
            //assig.forEach(as => {
            //    let sql = "select cod_assig from assignatura where id_assig=?"
            //});
            console.log(results)
            res.status(200).send({
                ok:true,
                res:results,
                links:{
                    get:"GET http://192.168.1.20:8082/assignatura/"+results[0].id_assig
                }
            })
            
        }
    })
})
app.get('/notes/:id_Assig',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "select * from notes where id_assig=?"
    conn.query(sql,[req.params.id_Assig],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok:false,
                error:"Error buscando la nota",
                erro:err
            })
        }else{
            res.status(200).send({
                ok:true,
                res:results
            })
        }
    })
})
app.get('/assignatura/:id_Assig',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "select * from assignatura where id_assig=?"
    conn.query(sql,[req.params.id_Assig],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok:false,
                error:"Error buscando la asignatura",
                erro:err
            })
        }else{
            res.status(200).send({
                ok:true,
                res:results
            })
        }
    })
})
app.get('/moduls',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "select assignatura.id_assig,assignatura.cod_assig,assignatura.nom_assig,assignatura.modul,assignatura.curs,assignatura.hores from notes,assignatura where notes.id_profe=? and notes.id_assig=assignatura.id_assig"
    conn.query(sql,[3],(err,results,fields)=>{
        if(err){
            res.status(400).send({
                ok:false,
                error:"Error buscando el modulo",
                erro:err
            })
        }else{
            let assignaturas = []
            results.forEach(result => {
                assignaturas.push(result)
            });
            res.status(200).send({
                ok:true,
                res:assignaturas
            })
            console.log(assignaturas)
        }
    })
})

app.get('/moduls/:id_assig',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "select notes.id_alumne,users.full_name,notes.id_assig,assignatura.cod_assig,notes.nota from assignatura,notes,users where assignatura.id_assig=? and notes.id_assig=assignatura.id_assig and notes.id_alumne=users.id"
    conn.query(sql,[req.params.id_assig],(err,results,fields)=>{
        if(err){
            res.status(400).send({
                ok:false,
                error:"Error buscando nota de una asignatura concreta",
                erro:err
            })
        }else{
            res.status(200).send({
                ok:true,
                res:results
            })
        }
    })
})

app.put('/moduls/:id_modul/:id_alumne',(req,res)=>{
    let conn = new db.Database().getConnection();
    let sql = "update notes set nota=? where id_assig=? and id_alumne=?"
    conn.query(sql,[req.body.nota,req.params.id_modul,req.params.id_alumne],(err,results,fields)=>{
        if(err){
            res.status(400).send({
                ok:false,
                error:"Error cambiando la nota",
                erro:err
            })
        }else{
            res.status(200).send({
                ok:true
            })
        }
    })
})