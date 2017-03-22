/**
 * Created by donghyunkim on 2017. 3. 14..
 */
    //"./data/newslist.json"



var controllerProto = require("./controller/Controller");
var dispatcher = require("./controller/dispatcher");
var modelListProto = require("./model/NewsModelList");



module.exports = function() {
    //sevice runner
        console.log(1);
        modelList = Object.assign(Object.create(modelListProto), {
            newsModelList: []
        });

        controller = Object.assign(Object.create(controllerProto), {
            modelList: modelList,
        });

        controller.join();

};


