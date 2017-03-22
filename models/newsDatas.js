/**
 * Created by donghyunkim on 2017. 3. 22..
 */

//mongoose 모듈을 require 한다
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//ES6 promise
mongoose.Promise = global.Promise;

// mongoose의 Schema 함수를 통해 관계형 데이터 베이스의 스키마 처럼 설정이 가능한다.
const newsDataSchema = new Schema({
    press : {type : String, required : true},
    imgurl : {type : String, required : true},
    newslist : {type : [String], required : true},
    pressimgurl : {type : String, required : true},
    state : {type : Number, default : 0}
});

// mongoose를 통해 모델을 생성한다. 모델을 보통 대문자로 작성한다, 첫번째 인자는 컬렉션을
// collection의 이름을 명시적으로 사용하고 싶을 경우 사용
// model을 생성자 이고 instance를 생성 할수 있다. 인스턴스 생성시 초기값을 넣어 생성 가능 하다.
const NewsData = mongoose.model("newsData",newsDataSchema);
module.exports = NewsData;

