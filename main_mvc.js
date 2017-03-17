/**
 * Created by donghyunkim on 2017. 3. 14..
 */
    //"./data/newslist.json"


(function() {

    //ajax 콜백함수
    function reqListener() {

        let jsonDatas = JSON.parse(this.responseText);
        //console.log(jsonDatas);
        let newsListObj = createNewsList(jsonDatas);

        let headerDom = utility.$selector("header");
        //렌더링 부분
        let titleListDom = utility.$selector("#titleList");
        let contentDom = utility.$selector("#newsContents");

        menuView.renderMenu(newsListObj,headerDom,0,arrowClickHandler);
        titleListView.renderTitleList(newsListObj,titleListDom,listClickHandler,highLight,0);
        contentsView.renderContents(newsListObj,contentDom,0,removeNewsClickHandler);

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


