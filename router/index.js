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

//구독 페이지 (메인 페이지) 라우팅
router.get('/',(req,res)=>{
    NewsDataModel.find({}).exec((err,newsDatas)=>{
        if(err) console.log(err);
        else if(!newsDatas.length) console.log("not found");
        else {
            let pressList = getAllPress(newsDatas);
            //서버에서 직접 렌더링
            res.render( path.join(__dirname ,"../views/subscribeMain"),{newsData: pressList});
        }
    });
});


//모든 press 이름 가져오는 함수
function getAllPress(newsDatas){
    let preeList = [];
    _.forEach(newsDatas,(val)=>{
        preeList.push({_id : val._id, pressimgurl : val.pressimgurl , state: val.state});
    });
    return preeList;
}

router.get('/main', (req,res)=>{
    //정적인 페이지 렌더링
    res.sendFile(path.join(__dirname , "../public/main.html"));
});

//json 데이터를 기반으로 자동으로 데이터 생성하는 라우팅
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