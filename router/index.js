/**
 * Created by donghyunkim on 2017. 3. 24..
 */
var express = require("express");

var _ = require("underscore");
var router = express.Router();
var mongoose = require("mongoose");
var path = require("path");
var NewsDataModel = require("../models/newsDatas");
var fs = require("fs");
var newsData = require("./newsData/newsData");





router.use("/newsData",newsData);

router.get('/',(req,res)=>{

    NewsDataModel.find({}).exec((err,newsDatas)=>{
        if(err) console.log(err);
        else if(!newsDatas.length) console.log("not found");
        else {
            let pressList = getAllPress(newsDatas);
            res.render( path.join(__dirname ,"../views/subscribeMain"),{newsData: pressList});
        }
    });
});


function getAllPress(newsDatas){
    let preeList = [];
    _.forEach(newsDatas,(val)=>{
        preeList.push({_id : val._id, pressimgurl : val.pressimgurl , state: val.state});
    });
    return preeList;
}

router.get('/main', (req,res)=>{
    res.sendFile(path.join(__dirname , "../public/main.html"));
});

//자동 생성
router.get('/auto_insert',(req,res)=>{
    fs.readFile('../public/data/newslist.json','utf8',(err, data)=>{
        if (err) throw err;
        let jsonData = [];
        jsonData = JSON.parse(data);
        jsonData.forEach((val)=>{
            val.state = 0;
            console.log(val);
            var newsData = new NewsData(val);
            newsData.save((err,news)=>{
                if(err) return res.status(500).send(err);
                console.log("User saved successfully:\n" + news);
            });
        });

    });

});

module.exports = router;