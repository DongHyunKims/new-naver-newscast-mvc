/**
 * Created by donghyunkim on 2017. 3. 24..
 */
//전체 뉴스 데이터를 받아 오는 라우팅.

var express = require("express");
var router = express.Router();
var NewsDataModel = require("../../models/newsDatas");


//구독된 뉴스만 가져오는 라우팅
router.get('/getNews',(req,res)=>{
    NewsDataModel.find({state:1}).exec((err,newsDatas)=>{
        if(err) console.log(err);
        else if(!newsDatas.length)  res.json([{_id : 0, press:"구독된 뉴스 없음", imgurl : "http://english.tw/wp-content/themes/qaengine/img/default-thumbnail.jpg", newslist : ["구독된 뉴스 없음"] , pressimgurl : "http://www.ecolab.com/Areas/EcolabSite/img/catalog-default-img.gif", state : 0}]);
        else {
            res.json(newsDatas);
        }
    });
});

// 구독 상태를 업데이트하는 라우팅
router.get('/updateSubState/:id',(req,res)=>{

    let keyState = req.params.id.split("_");
    let _id = keyState[0];
    let subState = Number(keyState[1]);
    let toggle = 0;
    if(subState === 1){
        toggle = 0;
    }else{
        toggle = 1;
    }
    NewsDataModel.findOneAndUpdate({_id : _id},{state : toggle},(err,newsData)=>{
        if(err) return res.status(500).send(err);
        if(!newsData) return res.status(404).send({ err: "User not found" });
        res.json(newsData);

    });
});

module.exports = router;