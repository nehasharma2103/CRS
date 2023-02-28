//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let obj = {
        "id":req.body.id,
        "Name": req.body.Name
       // "percentage": req.body.percentage,
     //   "p_cost": req.body.p_cost
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
