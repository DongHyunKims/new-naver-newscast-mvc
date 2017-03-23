/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var NewsProperty = {
    _id : 0,
    press : "",
    newslist : [],
    imgurl : "",
    state : 0,
    pressimgurl : "",
};


var NewsModelPrototype = {
    getNewsKey : function(){
        return this.newsKey;
    },
    getPress : function(){
        return this.press;
    },
    getNewsList : function(){
        return this.newslist;
    },
    getImgurl : function(){
        return this.imgurl;
    },
    getSubState : function(){
        return this.state;
    },
    getPressImgurl : function(){
        return this.pressimgurl;
    },
    setNewsKey : function(newsKey){
        this.newsKey = newsKey;
    },
    setPress : function(title){
        this.press = press;
    },
    setNewsList : function(newslist){
        this.newslist = newslist;
    },
    setImgurl : function(imgurl){
        this.imgurl = imgurl;
    },
    setState : function(subState){
        this.subState = subState;
    },
    setPressImgurl : function(pressimgurl){
        this.pressimgurl = pressimgurl;
    },

};

