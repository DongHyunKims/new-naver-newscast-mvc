/**
 * Created by donghyunkim on 2017. 3. 16..
 */
/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var ContentsViewProtoType = {

    //contents를 렌더링하는 메소드
    render : function(newsModelList,contentsDom,key,eventHandler){

        var mainTemplate = utility.$selector("#newsTemplate").innerText;
        let contents = this.getContents(newsModelList,key);
        if(key===undefined) {
            contentsDom.innerHTML =  "";
        }else {
            mainTemplate = mainTemplate.replace("{{newsKey}}", contents.newsKey);
            mainTemplate = mainTemplate.replace("{{title}}", contents.title);
            mainTemplate = mainTemplate.replace("{{imgurl}}", contents.imgurl);
            mainTemplate = mainTemplate.replace("{{newsList}}", contents.newslist.map(function (val) {
                return "<li>" + val + "</li>"
            }).join(""));
            
        contentsDom.innerHTML = mainTemplate;
        let buttonDom = utility.$selector("button");
            buttonDom.addEventListener("click", eventHandler.bind(this,newsModelList));
        }


    },
    //title 리스트를 가져오는 메소드
    getContents : function(newsModelList,key){

        return newsModelList.selectNews(key);
    },
    getContentsViewKey : function(){
        return this.contentsViewKey;

    },
    setContentsViewKey : function(contentsViewKey){
        this.contentsViewKey = contentsViewKey;
    }
};


var ContentsViewProperty = {
    contentsViewKey : 0,
};

var contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);






