/**
 * Created by donghyunkim on 2017. 3. 24..
 */
var mongoose = require("mongoose");


module.exports = function dbConnection(){
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
};