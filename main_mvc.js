/**
 * Created by donghyunkim on 2017. 3. 14..
 */
    //"./data/newslist.json"


(function() {

    let titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);
    //let titleListView2 = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);
    let menuView = utility.makeObject(MenuViewProperty,MenuViewProtoType);
    let contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);

    //ajax 콜백함수
    function reqListener() {

        let jsonDatas = JSON.parse(this.responseText);
        //console.log(jsonDatas);
        let newsListObj = createNewsList(jsonDatas);

        let headerDom = utility.$selector("header");
        //렌더링 부분
        let titleListDom = utility.$selector("#titleList");
        let contentDom = utility.$selector("#newsContents");
        let sideDom = utility.$selector(".sideArea");

        menuView.render(newsListObj,headerDom,0,arrowClickHandler);

        let content = {viewObj : contentsView, domObj: contentDom,handlerFn : removeNewsClickHandler};
        let menu = {viewObj: menuView,domObj:headerDom, handlerFn: arrowClickHandler};


        titleListView.render(titleListDom,newsListObj,content,menu,highLight,0);


        //titleListView2.render(sideDom,newsListObj,content,menu,highLight,0);


        contentsView.render(newsListObj,contentDom,0,removeNewsClickHandler);


    }




    //newsList를 만드는 함수
    function createNewsList(jsonDatas){
        NewsModelListProperty.newsModelList = jsonDatas.map(function(val,idx){
            return utility.makeObject(convertNewsObj(val,idx),NewsModelPrototype);
        });
        return utility.makeObject(NewsModelListProperty,NewsModelListPrototype);
    }

    //json데이터를 class로 바꾸어주는 함수
    function convertNewsObj(data,idx){
        for(let key in data){
            NewsProperty[key] = data[key]
        }
        NewsProperty.newsKey = idx;
        return utility.makeObject(NewsProperty,NewsModelPrototype);
    }

    document.addEventListener("DOMContentLoaded",utility.runAjax(reqListener,"GET","./data/newslist.json"));


})();


