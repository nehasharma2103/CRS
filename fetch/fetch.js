
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

function sort_by_key(array, key) {
    return array.sort(function (a, b) {
        debugger
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

router.post("/student", (req, res) => {
    //connect to mongodb
    let stdnm = req.body.name
    console.log('Inside fetch')
    mcl.connect(url, (err, conn) => {
        console.log('Inside Connect')
        if (err)
            console.log('Error in connection ', err)
        else {
            let db = conn.db('demo')
            db.collection('student').find().toArray((err, array) => {
                if (err)
                    console.log('Error while fetching data')
                else {
                    console.log('Data sent')

                    //res.json(array)
                    let myarr = array.find((e, i) => {
                        return e.Name == stdnm
                    })
                    res.json(myarr.percentage)

                }
            })
        }
    })
}),
    //create rest api
    router.get("/", (req, res) => {
        //connect to mongodb
        console.log('Inside fetch')
        mcl.connect(url, (err, conn) => {
            console.log('Inside Connect')
            if (err)
                console.log('Error in connection ', err)
            else {
                let db = conn.db('CRS')
                db.collection('college').find().toArray((err, array) => {
                    if (err)
                        console.log('Error while fetching data')
                    else {
                        console.log('Data sent')
                        res.json(array)
                    }
                })
            }
        })
    }),

    router.post("/college", (req, res) => {
        //connect to mongodb

        //let stdper = parseFloat(req.body.per).toFixed(2)
        let stdper = parseFloat((req.body.per))
        let clgregion = req.body.Region
        let clgbranch = req.body.branch
        mcl.connect(url, (err, conn) => {
            console.log("Percentage from user:- ", stdper)
            console.log("Region from user:- ", clgregion)
            console.log("Branch from user", clgbranch)
            console.log('Inside Connect')
            if (err)
                console.log('Error in connection ', err)
            else {
                let db = conn.db('CRS')
                //db.collection('college').find({ Region: { $eq: clgregion } }).toArray((err, array) => {
                db.collection('college').find().toArray((err, array) => {
                    if (err)
                        console.log('Error while fetching data')
                    else {
                        console.log('Data sent')

                        let uRegion = array.filter((e, i) => {
                            return e.Region == clgregion
                        })

                        let branchArrayLess = []
                        let branchArrayGret = []

                        for (let i = 0; i < uRegion.length; i++) {
                            let e = uRegion[i]
                            for (let key in e) {
                                if (key == clgbranch && e[key] < stdper)
                                    branchArrayLess.push(e)
                                if (key == clgbranch && e[key] >= stdper)
                                    branchArrayGret.push(e)
                            }
                        }
                        let sLess = branchArrayLess.sort((fv, nv) => {
                            console.log("First value:- ", fv)
                            return fv - nv
                        })
                        let sGret = branchArrayGret.sort((fv, nv) => {
                            return nv - fv
                        })

                        console.log('Final Less array :-', branchArrayLess)
                        console.log('Final Less Array Sorted:- ', sLess)

                        console.log('Final Great array :-', branchArrayGret)
                        console.log('Final Great Array Sorted:- ', sGret)

                        /*
                        let sortedArray = sort_by_key(array, 'cutoff')
                        console.log('Sored array by today :- ',sortedArray)

                        let myarrg = sortedArray.filter((e, i) => {
                            return e.cutoff >= stdper
                        })
                        let myarrl = sortedArray.filter((e, i) => {
                            return e.cutoff < stdper
                        })
                        */
                        let f1 = (sLess.slice(0, 3)).reverse()
                        let f2 = (sGret.slice(-2)).reverse()
                        let combined = f1.concat(f2)
                        console.log("sorted array", combined)
                        res.json(combined)

                        /*
                        let finalarr = []
                        finalarr.push(myarrl.slice(-2))
                        finalarr.push(myarrg.slice(0,2))
                        console.log('Final Array :- ',finalarr)
                        finalarr.flat(Infinity)
                        res.json(finalarr)
                        
                        console.log("Greater Array :- ",myarrg.slice(0,2))
                        console.log("Lesser  Array :- ",myarrl.slice(-2))
                        
                        console.log(array)
                        function sort(e,i){
                            return array.sort(function(a,b){
                                debugger
                                var x = a[i]; var y=b[i];
                                return((x<y)<1:((x>y)>1:0));
                            })
                        }
                        
                        let maxobj = myarrg[0]
                        let obj1 = myarrg.map((e, i) => {
                            if (e.cutoff < maxobj.cutoff)
                                maxobj = e
                            return maxobj
                        })
                        console.log("Max obj = ", maxobj)
                        
                        let myarrl = array.filter((e, i) => {
                            return e.cutoff < stdper
                        })
                        let minobj = myarrl[0]
                        obj1 = myarrl.map((e,i)=>{
                            if(e.cutoff > minobj.cutoff)
                                minobj = e
                        })
                        console.log("Min obj :- ",minobj)
                        //res.json(myarr)
                        let finalarr = []
                        finalarr.push(minobj)
                        finalarr.push(maxobj)
                        res.json(finalarr)
                        //res json array
                        //let myarr= array.find()
                        */

                    }
                })
            }
        })
    }),

    router.post("/clgreg", (req, res) => {
        //connect to mongodb
        //console.log('Inside fetch')
        let stdper = req.body.per
        let clgregion = req.body.region
        mcl.connect(url, (err, conn) => {
            console.log("Region from user:- ", clgregion)
            //console.log('Inside Connect')
            if (err)
                console.log('Error in connection ', err)
            else {
                let db = conn.db('demo')
                //db.collection('clg').find({cutoff:{$gte:stdper}}).toArray((err, array) => {
                db.collection('clg').find({ Region: "nagar" }).toArray((err, array) => {
                    if (err)
                        console.log('Error while fetching data')
                    else {
                        console.log('Data sent')
                        //console.log(array)
                        res.json(array)


                        //res json array
                        //let myarr= array.find()
                    }
                })
            }
        })
    })
//concatenation
/*
router.post("/clg", (req, res) => {
    //connect to mongodb
    console.log('Inside fetch')
    let stdreg = req.body.region
    mcl.connect(url, (err, conn) => {
        console.log('Inside Connect')
        if (err)
            console.log('Error in connection ', err)
        else {
            let db = conn.db('demo')
            db.collection('clg').concat(stdper,stdreg).toArray((err, array) => {
                if (err)
                    console.log('Error while fetching data')
                else {
                    console.log('Data sent')
                    res.json(array)
                    

                    //res json array
                    //let myarr= array.find()
                }
            })
        }
    })
})

*/
//export router
module.exports = router
/*
//create rest api
module.exports = require('express').Router().get("/", (req, res) => {
    console.log('Inside fetch')
    //connect to mongodb
    require('mongodb').MongoClient.connect(require('../url'), (err, conn) => {
        console.log('Inside Connection')
        if (err)
            console.log('Error in connection ', err)
        else {
            let db = conn.db('CRS')
            db.collection('student').find().toArray((err, array) => {
                if (err)
                    console.log('Error while fetching data')
                else {
                    console.log('Data sent')
                    res.json(array)
                }
            })
        }
    })
})
*/