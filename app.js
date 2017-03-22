/**
 * Created by donghyunkim on 2017. 3. 22..
 */

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
var controller = require("./public/js/controller/Controller");
var dispatcher = require("./public/js/controller/dispatcher");
var modelList = require("./public/js/model/NewsModelList");


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

//전체 뉴스 데이터를 받아 오는 라우팅.
app.get('/', (req,res)=>{

    NewsData.find({},(err,newsData)=>{

        if(err) return res.status(500).send(err);
        if(!newsData.length) return res,status(404).send({err : "newsData not found"});

        //console.log(newsData);

        //res.render("main.ejs",)

    });

    //res.render("main.ejs");
});




//자동 생성
app.get('/auto_insert',(req,res)=>{
    fs.readFile('./public/data/newslist.json','utf8',(err, data)=>{
        if (err) throw err;
        //console.log(data);
        let jsonData = [];
        jsonData = JSON.parse(data);
        //console.log(jsonData[0]);
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