/**
 * Created by donghyunkim on 2017. 3. 20..
 */


var dispatcher = require("./dispatcher");
var ControllerPrototype = {
    join: function(){
        // 이벤트 핸들러를 모두 등록 시킨다
        dispatcher.register({
                "initAllData" : function(res,idx){
                    this.modelList.initNewsModelList(res,idx);
                }.bind(this),
                "getOneDataIdx" : function(idx){
                    return this.modelList.getOneModelByIdx(idx);
                }.bind(this),
                "getAllData" : function(){
                    return this.modelList.getAllData();
                }.bind(this),
                "getTitleList" : function () {
                    return this.modelList.getTitleList();
                }.bind(this),
                "getPageByIdx" : function(idx){
                    return this.modelList.getPageByIdx(idx);
                }.bind(this),
                "renderPage" : function(res,renderingData){
                    res.render("main",renderingData);
                }

        });
    }
};

module.exports = ControllerPrototype;
