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
        let handler = {};

        if(this.state === 0){
            handler = this.cancelClickHandler;
        }else{
            handler = this.removeClickHandler;
        }
        buttonDom.addEventListener("click", handler.bind(this,this.renderingViews,this.current));
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
    getCancelSubList : function(){
        return this.cancelSubList;
    },
    setCancelSubList: function(cancelSubList){
        this.cancelSubList = cancelSubList;
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
    getState : function(){
        return this.state;
    },
    setState : function(state){
        this.state = state;
    },
    createContent : function(){
        this.contentData = this.contentsList[this.current];
    },
    removeContent : function(){
        this.contentsList.splice(this.current, 1);
    },
    cancelContent : function(){
        this.cancelSubList.push(this.contentsList[this.current]);
        this.contentsList.splice(this.current, 1);
    },
    //데이터 삭제버튼 클릭 핸들러
    removeClickHandler :  function (renderingViews,current){
        this.removeContent();

        current = 0;

        for (let i = 0; i < renderingViews.length; i++) {
            let viewObj = renderingViews[i].viewObj;
            let domObj = renderingViews[i].domObj;
            viewObj.setCurrent(current);
            viewObj.render(domObj);
        }
    },
    //구독취소 클릭 핸들러
    cancelClickHandler :  function (renderingViews,current){
        this.cancelContent();

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
    cancelSubList : [],
    state : 0
};

//var contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);






