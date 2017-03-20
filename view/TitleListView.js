/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var TitleListViewProperty = {
    titleListViewKey : 0,
    titleListData: [],
    renderingViews : [],
    contentsList : [],
    current : 0,
    cancelSubList : []
};

//모델리스트, 랜더링할 돔, 영향을 줄 dom, view, 핸들러
var TitleListViewProtoType = {

    //titleView를 렌더링하는 메소드
    render : function(renderingDom){
        this.createTitleList();
        let newsTitleListTemplate = utility.$selector(".titleListTemplate").innerText;
        newsTitleListTemplate = newsTitleListTemplate.replace("{{dataList}}", this.titleListData.map(function (title,idx) {
            return "<li class="+ idx +">" + title + "</li>"
        }).join(""));

        renderingDom.innerHTML = newsTitleListTemplate;
        let listUl = utility.$selector(".titleUl");

            listUl.addEventListener("click", this.listClickHandler.bind(this, this.renderingViews, this.current));
        if(this.contentsList.length !== 0) {
            this.highLight();
        }

    },
    getTitleListViewKey : function(){
        return this.titleListViewKey;
    },
    setTitleListViewKey : function(titleListViewKey){
        this.titleListViewKey = titleListViewKey;
    },
    getTitleListData : function(){
        return this.titleListData;
    },
    setTitleListData : function(titleListData){
        this.titleListData = titleListData;
    },
    getRenderingViews : function(){
        return this.renderingViews;
    },
    setRenderingViews : function(renderingViews){
        this.renderingViews = renderingViews;
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
    getCurrent : function(){
        return this.current;
    },
    setCurrent : function(current){
        this.current = current;
    },
    createTitleList : function(){
        this.titleListData = [];
        this.contentsList.forEach((val)=>{
            this.titleListData.push(val.title);
        });
    },
    //title 리스트 클릭 핸들러
    listClickHandler : function (renderingViews,current) {
        current =  Number(event.target.className);
        for(let i = 0; i < renderingViews.length; i++){
            let viewObj =  renderingViews[i].viewObj;
            let domObj = renderingViews[i].domObj;
            viewObj.setCurrent(current);
            viewObj.render(domObj);
        }
    },
    //글자색 강조 함수
    highLight : function() {
        let dom = document.querySelectorAll(".titleListNav>ul>li");
        dom.forEach(function (value) {
            value.style.color = "black";
        });
        utility.$selector("nav>ul>.\\3"+this.current).style.color = "blue";
    }
};




//var titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);