/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var TitleListViewProperty = {
    titleListViewKey : 0,
    titleListData: [],
    renderingViews : [],
    contentsList : [],
    current : 0,
};

//모델리스트, 랜더링할 돔, 영향을 줄 dom, view, 핸들러
var TitleListViewProtoType = {

    //titleView를 렌더링하는 메소드
    render : function(renderingDom){
        this.createTitleList();
        let newsTitleListTemplate = utility.$selector('#newsTitleListTemplate').innerText;
        newsTitleListTemplate = newsTitleListTemplate.replace("{{newsList}}", this.titleListData.map(function (title,idx) {
            return "<li class="+ idx +">" + title + "</li>"
        }).join(""));

        renderingDom.innerHTML = newsTitleListTemplate;
        // let highlight;
        // let key;
        // if(argArr[argArr.length-2] !== undefined && argArr[argArr.length-1] !== undefined){
        //     highlight = argArr[argArr.length-2];
        //     key = argArr[argArr.length-1];
        //     highlight(key);
        // }
        let listUl = utility.$selector(".titleUl");
        //바인드를 apply사용하는 법
        listUl.addEventListener("click",this.listClickHandler.bind(this,this.renderingViews,this.current));
        this.highLight();

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
    listClickHandler : function (renderingViews,current) {
        current =  Number(event.target.className);
        //let renderingViews = this.renderingViews;
        for(let i = 0; i < renderingViews.length; i++){
            // if(Object.prototype.toString.call(renderingViews[i]) !== "[object Object]"){
            //     break;
            // }

            let viewObj =  renderingViews[i].viewObj;
            let domObj = renderingViews[i].domObj;
            viewObj.setCurrent(current);
            viewObj.render(domObj);
        }
        // if(argArr[argArr.length-2] !== event) {
        //     argArr[argArr.length-2](key);
        // }
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