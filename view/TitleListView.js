/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var TitleListViewProperty = {
    titleListViewKey : 0,
    renderingDom : {},
};

//모델리스트, 랜더링할 돔, 영향을 줄 dom, view, 핸들러
var TitleListViewProtoType = {

    //titleView를 렌더링하는 메소드
    render : function(titleListObj){
        let newsTitleListTemplate = utility.$selector(".titleListTemplate").innerText;
        newsTitleListTemplate = newsTitleListTemplate.replace("{{dataList}}", titleListObj.titleList.map(function (title,idx) {
            return "<li class="+ idx +">" + title + "</li>"
        }).join(""));
        this.renderingDom.innerHTML = newsTitleListTemplate;

        this.highLight(titleListObj.current);
        this.setEvent();

    },
    getTitleListViewKey : function(){
        return this.titleListViewKey;
    },
    setTitleListViewKey : function(titleListViewKey){
        this.titleListViewKey = titleListViewKey;
    },
    getRenderingDom: function(){
        return this.renderingDom;
    },
    setEvent : function(){
        this.listClickHandler();
    },
    setRenderingDom : function(renderingDom){
        this.renderingDom = renderingDom;
    },
    //title 리스트 클릭 핸들러
    listClickHandler : function () {
        let listDom = utility.$selector(".titleUl");
        listDom.addEventListener("click",(event)=>{
            if(event.target.tagName === "LI") {
                let current = Number(event.target.className);
                dispatcher.emit({"type": "clickEvent"}, [current]);
            }
        });
    },
    //글자색 강조 함수
    highLight : function(current) {
        let dom = document.querySelectorAll(".titleListNav>ul>li");
        dom.forEach(function (value) {
            value.style.color = "black";
        });
        utility.$selector("nav>ul>.\\3"+current).style.color = "blue";
    }
};



