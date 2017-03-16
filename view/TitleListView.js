/**
 * Created by donghyunkim on 2017. 3. 16..
 */

var TitleListViewProtoType = {

    //titleView를 렌더링하는 메소드
    renderTitleList : function(newsModelList,titleListDom,eventHandler,highlight,key){


        let newsTitleListTemplate = utility.$selector('#newsTitleListTemplate').innerText;
        // let template = Handlebars.compile(newsTitleListTemplate);
        let titleListData = this.getTitleList(newsModelList);


        newsTitleListTemplate = newsTitleListTemplate.replace("{{newsList}}", titleListData.map(function (val) {
            return "<li id="+ val.key +">" + val.title + "</li>"
        }).join(""));


        titleListDom.innerHTML = newsTitleListTemplate;


        let listUl = utility.$selector("#titleUl");
        listUl.addEventListener("click",eventHandler.bind(this,newsModelList))



            if(highlight !== undefined && key !== undefined){
                highlight(key);
            }



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
    }

};


var TitleListViewProperty = {
    titleListViewKey : 0,
};

var titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);