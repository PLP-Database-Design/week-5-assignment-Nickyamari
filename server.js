// import our dependencies
const { configDotenv } = require("dotenv");
const express = require("express")
const app = express()
const mysql = require('mysql2')
constdotenv = require('dotenv')

//configure environment vaiables
configDotenv.apply();

//listening to server
app.listen(3300,()=>{
    console.log('sever is running on port 3300')
})

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test connection
db.connect((err)=>{
    if(err){
        return console.log("Error connecting to the database:", err )
    }
    
    console.log("Successfully connected to mysql:", db.threadId)
})

//question 1
//retieve all patients
app.get('/patients', (req, res) =>{
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"
    db.query(getPatients, (err, data) =>{
        if(err){
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
})

//question 2
//retieve all providers
app.get('/providers', (req, res) =>{
    const getProviders = "SELECT  first_name, last_name, provider_specialty  FROM providers"
    db.query(getProviders, (err, data) =>{
        if(err){
            return res.status(400).send("Failed to get providers", err)
        }
        res.status(200).send(data)
    })
})

//quetion 3
//filter patients by first name
app.get('/patients_first_name', (req, res) =>{
    const getPatients_first_name = "SELECT  first_name FROM patients"
    db.query(getPatients_first_name, (err, data) =>{
        if(err){
            return res.status(400).send("Failed to get patients_first_name", err)
        }
        res.status(200).send(data)
    })
})

//question 4
//REtrieve all providers by their specialty
app.get('/provider_specilaty', (req, res) =>{
    const getProvider_specialty = "SELECT  provider_specialty FROM providers"
    db.query(getProvider_specialty, (err, data) =>{
        if(err){
            return res.status(400).send("Failed to get provider_specialty", err)
        }
        res.status(200).send(data)
    })
})