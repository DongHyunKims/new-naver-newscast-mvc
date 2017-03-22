/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var NewsData = require( "../../../models/newsDatas");
var _ = require("underscore");
var dispatcher = require("../controller/dispatcher")





var NewsModelListPrototype = {
    initNewsModelList : function(res,idx){
        NewsData.find({},(err,newsDatas)=>{
            if(err) console.log(err);
            else if(!newsDatas.length) console.log("not found");
            else {
               // console.log(newsData);
                this.newsModelList = newsDatas;

                let page = this.getPageByIdx(idx);
                let newsData = this.getOneModelByIdx(idx);
                let pressList = this.getTitleList();


                dispatcher.emit({type:"renderPage"},[res,{newsData:newsData, pressList : pressList, page:page}]);
            }
        });
    },



    getAllModels: function(){
        return this.newsModelList;
    },
    getOneModelById : function(_id){
        let idx = getIndexById(_id);
        return this.newsModelList[idx];
    },
    getIndexById(_id){
        return _.findIndex(this.newsModelList,{_id : _id});
    },
    createRenderingData(){
    },
    getPageById : function(_id){
        return {currentPage : getIndexById(_id) + 1 , totalPage : this.newsModelList.length };
    },
    getTitleList : function(){

        let pressList = [];
        _.forEach(this.newsModelList,(val)=>{

            pressList.push(val.press);
        });

        return pressList;
    },
    getPageByIdx : function(idx){
        return {currentPage : idx + 1 , totalPage : this.newsModelList.length };
    },
    getOneModelByIdx : function(idx){
        return this.newsModelList[idx];
    },




};




module.exports = NewsModelListPrototype;