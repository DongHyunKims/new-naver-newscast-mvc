/**
 * Created by donghyunkim on 2017. 3. 22..
 */

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
var _ = require("underscore");
var ejs = require('ejs');
var path = require('path');
var NewsData = require("./models/newsDatas");

var app = express();

//mongoose 가져 오기


//connection 객체를 가져온다
mongoose.connect("mongodb://localhost/news_stand_db");

//mongoose의 커넥셕 객체를 가져온다
var dbConnection = mongoose.connection;


dbConnection.on("error", console.error.bind(console,"connection error : "));

//연결이 잘 되었다면 "connection successfully" 로그를 제공해 준다 open이나 error 이벤트를 홯용하여 접속 실패와 성공시 handling이 가능하다
dbConnection.once("open",()=>{
    console.log("connection successfully");
});


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/data"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set("view engine","ejs");


app.listen(3000, (req,res)=>{
 console.log("3000 PORT OPENED!!");
});




app.get('/',(req,res)=>{
    NewsData.find({}).exec((err,newsDatas)=>{
        if(err) console.log(err);
        else if(!newsDatas.length) console.log("not found");
        else {


            let pressList = getAllPress(newsDatas);

            //console.log(pressList);
            res.render("subscribeMain",{newsData: pressList});
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





//전체 뉴스 데이터를 받아 오는 라우팅.
app.get('/main', (req,res)=>{

    res.sendFile(__dirname + "/public/main.html");

});



app.get('/data',(req,res)=>{
    NewsData.find({state:1}).exec((err,newsDatas)=>{
        if(err) console.log(err);


        else if(!newsDatas.length)  res.json([{_id : 0, press:"구독된 뉴스 없음", imgurl : "http://english.tw/wp-content/themes/qaengine/img/default-thumbnail.jpg", newslist : ["구독된 뉴스 없음"] , pressimgurl : "http://www.ecolab.com/Areas/EcolabSite/img/catalog-default-img.gif", state : 0}]);
        else {
            res.json(newsDatas);
        }
    });
});


app.get('/updateSubState/:id',(req,res)=>{



    let keyState = req.params.id.split("_");
    let _id = keyState[0];
    let subState = Number(keyState[1]);
    let toggle = 0;


    if(subState === 1){
        toggle = 0;
    }else{
        toggle = 1;
    }

    NewsData.findOneAndUpdate({_id : _id},{state : toggle},(err,newsData)=>{

        if(err) return res.status(500).send(err);
        if(!newsData) return res.status(404).send({ err: "User not found" });

        res.json(newsData);

    });
});


//자동 생성
app.get('/auto_insert',(req,res)=>{
    fs.readFile('./public/data/newslist.json','utf8',(err, data)=>{
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