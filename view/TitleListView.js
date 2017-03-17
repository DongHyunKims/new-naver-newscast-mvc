/**
 * Created by donghyunkim on 2017. 3. 16..
 */





//모델리스트, 랜더링할 돔, 영향을 줄 dom, view, 핸들러
var TitleListViewProtoType = {

    //titleView를 렌더링하는 메소드
    render : function(renderingDom,modelList){
        let newsTitleListTemplate = utility.$selector('#newsTitleListTemplate').innerText;
        let titleListData = this.getTitleList(modelList);

        newsTitleListTemplate = newsTitleListTemplate.replace("{{newsList}}", titleListData.map(function (val) {
            return "<li class="+ val.key +">" + val.title + "</li>"
        }).join(""));

        let argArr = Array.prototype.slice.call(arguments);
        renderingDom.innerHTML = newsTitleListTemplate;

        let highlight;
        let key;

        if(argArr[argArr.length-2] !== undefined && argArr[argArr.length-1] !== undefined){
            highlight = argArr[argArr.length-2];
            key = argArr[argArr.length-1];
            highlight(key);
        }

        argArr.slice(1);
        let listUl = utility.$selector(".titleUl");
        //바인드를 apply사용하는 법
        listUl.addEventListener("click",this.listClickHandler.bind.apply(this.listClickHandler,[this].concat(argArr.slice(1))));


    },
    //title 리스트를 가져오는 메소드
    getTitleList : function(newsModelList){
        return newsModelList.selectNewsTitle();
    },
    getTitleListViewKey : function(){
        return this.titleListViewKey;
    },
    setTitleListViewKey : function(titleListViewKey){
        this.titleListViewKey = titleListViewKey;
    },
    listClickHandler : function (modelList) {
     let key =  Number(event.target.className);
     let argArr = Array.prototype.slice.call(arguments);
        for(let i = 1; i < argArr.length-1; i++){
            if(Object.prototype.toString.call(argArr[i]) !== "[object Object]"){
                break;
            }
            let viewObj =  argArr[i].viewObj;
            let domObj = argArr[i].domObj;
            let handlerFn = argArr[i].handlerFn;
            viewObj.render(modelList,domObj,key,handlerFn);
            }
        if(argArr[argArr.length-2] !== event) {
            highLight(key);
        }
    }
};


var TitleListViewProperty = {
    titleListViewKey : 0,
};

var titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);