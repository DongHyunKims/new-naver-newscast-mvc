/**
 * Created by donghyunkim on 2017. 3. 16..
 */
/**
 * Created by donghyunkim on 2017. 3. 16..
 */



// {modelObj : , current}
var ContentsViewProtoType = {
    //contents를 렌더링하는 메소드
    render : function(contentData){
        let contentObj = contentData.modelObj;
        let current = contentData.current;
        let mainTemplate = utility.$selector(".contentTemplate").innerText;

        if(contentData===undefined) {
            renderingDom.innerHTML =  "";
        }else {
            mainTemplate = mainTemplate.replace("{{idx}}", current);
            mainTemplate = mainTemplate.replace("{{title}}", contentObj.title);
            mainTemplate = mainTemplate.replace("{{imgurl}}", contentObj.imgurl);
            mainTemplate = mainTemplate.replace("{{dataList}}", contentObj.newslist.map(function (val) {
                return "<li>" + val + "</li>"
            }).join(""));
        }
        this.renderingDom.innerHTML = mainTemplate;
        this.setEvent();
    },
    getContentsViewKey : function(){
        return this.contentsViewKey;
    },
    setContentsViewKey : function(contentsViewKey){
        this.contentsViewKey = contentsViewKey;
    },
    getRenderingDom: function(){
        return this.renderingDom;
    },
    setRenderingDom : function(renderingDom){
        this.renderingDom = renderingDom;
    },
    setEvent : function(){
        this.cancelClickHandler();
    },
    //구독취소 핸들러
    cancelClickHandler :  function (){
        let current = Number(utility.$selector("hidden").className);
        let btnDom = utility.$selector("button");
        btnDom.addEventListener("click",function () {
            dispatcher.emit({"type":"cancelClickEvent"}, [current]);
        });

    }
};

var ContentsViewProperty = {
    contentsViewKey : 0,
    renderingDom : {},
};

//var contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);






