/**
 * Created by donghyunkim on 2017. 3. 16..
 */
/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var ContentsViewProtoType = {

    //contents를 렌더링하는 메소드
    render : function(renderingDom){

        let mainTemplate = utility.$selector(".contentTemplate").innerText;
        this.createContent();
        let contentData = this.contentData;

        if(contentData===undefined) {
            renderingDom.innerHTML =  "";
        }else {
            mainTemplate = mainTemplate.replace("{{idx}}", this.current);
            mainTemplate = mainTemplate.replace("{{title}}", contentData.title);
            mainTemplate = mainTemplate.replace("{{imgurl}}", contentData.imgurl);
            mainTemplate = mainTemplate.replace("{{dataList}}", contentData.newslist.map(function (val) {
                return "<li>" + val + "</li>"
        }).join(""));

        renderingDom.innerHTML = mainTemplate;

        let buttonDom = utility.$selector("button");
        buttonDom.addEventListener("click", this.removeNewsClickHandler.bind(this,this.renderingViews,this.current));
        }
    },
    getContentsViewKey : function(){
        return this.contentsViewKey;
    },
    setContentsViewKey : function(contentsViewKey){
        this.contentsViewKey = contentsViewKey;
    },
    getContentData : function(){
        return this.contentData;
    },
    setContentData: function(contentData){
        this.contentData = contentData;
    },
    getContentsList : function(){
        return this.contentsList;
    },
    setContentsList: function(contentsList){
        this.contentsList = contentsList;
    },
    getRenderingViews : function(){
        return this.renderingViews;
    },
    setRenderingViews : function(renderingViews){
        this.renderingViews = renderingViews;
    },
    getCurrent : function(){
        return this.current;
    },
    setCurrent : function(current){
        this.current = current;
    },
    createContent : function(){
        this.contentData = this.contentsList[this.current];
    },
    removeContent : function(){
        this.contentsList.splice(this.current, 1);
    },

    //구독취소버튼 클릭 핸들러
    removeNewsClickHandler :  function (renderingViews,current){
    this.removeContent(current);

    current = 0;

    for (let i = 0; i < renderingViews.length; i++) {
        let viewObj = renderingViews[i].viewObj;
        let domObj = renderingViews[i].domObj;
        viewObj.setCurrent(current);
        viewObj.render(domObj);
    }

    }

};

var ContentsViewProperty = {
    contentsViewKey : 0,
    contentData: {},
    contentsList : [],
    renderingViews : [],
    current: 0,
};

//var contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);






