/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var NewsProperty = {
    newsKey : 0,
    title : "",
    newslist : [],
    imgurl : "",
    subState : 0
};


var NewsModelPrototype = {
    getNewsKey : function(){
        return this.newsKey;
    },
    getTitle : function(){
        return this.title;
    },
    getNewsList : function(){
        return this.newslist;
    },
    getImgurl : function(){
        return this.imgurl;
    },
    getSubState : function(){
        return this.subState;
    },
    setNewsKey : function(newsKey){
        this.newsKey = newsKey;
    },
    setTitle : function(title){
        this.title = title;
    },
    setNewsList : function(newslist){
        this.newslist = newslist;
    },
    setImgurl : function(imgurl){
        this.imgurl = imgurl;
    },
    setSubState : function(subState){
        this.subState = subState;
    },
};

