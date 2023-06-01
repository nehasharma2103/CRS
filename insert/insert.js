
//import modules
const express = require('express')
const { check, validationResult } = require('express-validator')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api


//for student registration form

router.post("/student",
    [
        check('firstName').notEmpty().withMessage('First name is required'),
        check('lastName').notEmpty().withMessage('Last name is required'),
        check('clgName').notEmpty().withMessage('College name is required'),
        check('DOB').notEmpty().withMessage('Date of birth is required'),
        check('CET').notEmpty().withMessage('MHT-CET score is required'),
        check('JEE').notEmpty().withMessage('JEE score is required'),
        check('Add').notEmpty().withMessage('Address is required'),
        check('MOB').notEmpty().withMessage('Mobile number is required'),
        check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
        check('password').notEmpty().withMessage('Password is required')
    ],




    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errors.array() });
        }
        let obj = {
            //     "id":req.body.id,
            //     "Name": req.body.Name,
            //     "E-mail":req.body.email,
            //     "Password":req.body.password,
            //     "Address":req.body.address,
            //     "12th":req.body.hsc,
            //     "MHTCET":req.body.cet
            // "userName": req.body.userName,
            "email": req.body.email,
            "password": req.body.password,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "clgName": req.body.clgName,
            "DOB": req.body.DOB,
            "CET": req.body.CET,
            "JEE": req.body.JEE,
            "Add": req.body.Add,
            "MOB": req.body.MOB

            // "email": req.body.email,
            // "password": req.body.password
            // "percentage": req.body.percentage,
            //   "p_cost": req.body.p_c
        }
        //connect to mongodb
        mcl.connect(url, (err, conn) => {
            if (err)
                console.log("Error in connection ", err)
            else {
                let db = conn.db('CRS')
                db.collection('student').insertOne(obj, (err) => {
                    if (err)
                        res.json({ 'insert': 'error' })
                    else {
                        console.log('Data inserted')
                        res.json({ 'insert': 'success' })
                    }
                })
            }
        })
    }),
    router.post('/login', (req, res) => {
        mcl.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("CRS");
            const { email, password } = req.body;
            console.log(email);
            console.log(password);
            dbo.collection("student").findOne({ email }, function (err, result) {
                if (err) throw err;
                if (result && result.password === password) {
                    res.send({ success: true });
                    //  alert("login successs");
                    console.log("login success")
                    // Swal.fire('Success', 'Login Successfully !', 'success');
                } else {
                    console.log("login failed");
                    res.status(401).send({ error: 'Invalid username or password' });
                }
                db.close();
            });
        });
    }),







    //for college registration form


    router.post("/clg",
        [
            check('IName').notEmpty().withMessage('Institute name is required'),
            check('addr').notEmpty().withMessage('Address is required'),
            check('naac').notEmpty().withMessage('Naac Grade is required'),
            check('contactno').notEmpty().withMessage('Contact number is required'),
            check('url').notEmpty().withMessage('url is required'),
            check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
            check('pun').notEmpty().withMessage('pin code is required'),
            check('spec').notEmpty().withMessage('Specialization is required'),
            check('courses').notEmpty().withMessage('Courses is required'),
            check('fees').notEmpty().withMessage('fees is required'),
            check('scholarship').notEmpty().withMessage('Scholarship amount is required')

        ],




        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return res.status(400).json({ errors: errors.array() });
            }
            let obj = {
                //     "id":req.body.id,
                //     "Name": req.body.Name,
                //     "E-mail":req.body.email,
                //     "Password":req.body.password,
                //     "Address":req.body.address,
                //     "12th":req.body.hsc,
                //     "MHTCET":req.body.cet
                // "userName": req.body.userName,
                "IName": req.body.IName,
                "addr": req.body.addr,
                "naac": req.body.naac,
                "contactno": req.body.contactno,
                "url": req.body.url,
                "email": req.body.email,
                "pun": req.body.pun,
                "spec": req.body.spec,
                "courses": req.body.courses,
                "fees": req.body.fees,
                "scholarship": req.body.scholarship,


                // "percentage": req.body.percentage,
                //   "p_cost": req.body.p_c
            }
            //connect to mongodb
            mcl.connect(url, (err, conn) => {
                if (err)
                    console.log("Error in connection ", err)
                else {
                    let db = conn.db('CRS')
                    db.collection('clg').insertOne(obj, (err) => {
                        if (err)
                            res.json({ 'insert': 'error' })
                        else {
                            console.log('Data inserted')
                            res.json({ 'insert': 'success' })
                        }
                    })
                }
            })
        }),


    router.post("/contact",
        [
            check('name').notEmpty().withMessage('First name is required'),
            check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
            check('msg').notEmpty().withMessage('Message is required')
        ],




        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return res.status(400).json({ errors: errors.array() });
            }
            let obj = {
                //     "id":req.body.id,
                //     "Name": req.body.Name,
                //     "E-mail":req.body.email,
                //     "Password":req.body.password,
                //     "Address":req.body.address,
                //     "12th":req.body.hsc,
                //     "MHTCET":req.body.cet
                // "userName": req.body.userName,
                "name": req.body.name,
                "email": req.body.email,
                "msg": req.body.msg,
                // "percentage": req.body.percentage,
                //   "p_cost": req.body.p_c
            }
            //connect to mongodb
            mcl.connect(url, (err, conn) => {
                if (err)
                    console.log("Error in connection ", err)
                else {
                    let db = conn.db('CRS')
                    db.collection('contact').insertOne(obj, (err) => {
                        if (err)
                            res.json({ 'insert': 'error' })
                        else {
                            console.log('Data inserted')
                            res.json({ 'insert': 'success' })
                        }
                    })
                }
            })
        }),
/*router.post("/college", (req, res) => {
    let obj = {
        "Name": req.body.Name,
        "cut-off":req.body.cut-off,
        "Region":req.body.Region
     //   "p_cost": req.body.p_cost
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log("Error in connection ", err)
        else {
            let db = conn.db('CRS')
            db.collection('colleges').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'error' })
                else {
                    console.log('Data inserted')
                    res.json({ 'insert': 'success' })
                }
            })
        }
    })
})*/
//export router
module.exports = router