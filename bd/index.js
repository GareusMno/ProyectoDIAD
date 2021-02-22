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

let app = express();
app.use(bodyParser.json());
app.listen(8082);
app.post('/login',(req,res)=>{
    let conn= new db.Database().getConnection();
    let dni=req.body.dni;
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.full_name;
    let avatar = req.body.avatar;
    let sql="INSERT INTO users(dni,username,password,full_name,avatar) "+
            "VALUES (?,?,?,?,?)"
    conn.query(sql,[dni,username,password,fullname,avatar],(err,results,fields)=>{
        if (err){
            res.status(400).send({
                ok: false,
                error:"Error añadiendo un usuario",
                error:err
            })
        }
        else{
            conn.end();
            res.status(200).send({
                ok: true,
                resultado:resultado
            })
            console.log("Usuario añadido")
        }
    })
});