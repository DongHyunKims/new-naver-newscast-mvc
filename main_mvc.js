/**
 * Created by donghyunkim on 2017. 3. 14..
 */
    //"./data/newslist.json"




(function() {

    let titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);
    let menuView = utility.makeObject(MenuViewProperty,MenuViewProtoType);
    let contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);
    let contentsSubscribeView = utility.makeObject(ContentsSubscribeViewPrototype,ContentsSubscribeViewProperty);

    //ajax 콜백함수
    function reqListener() {

        let jsonDatas = JSON.parse(this.responseText);
        let newsListObj = createNewsList(jsonDatas);
        //구독되지 않은 정보리스트
        let contentList = newsListObj.getNewsModelList();
        //구독 된 정보리스트
        let subscribeList = [];

        subscribePage(contentList,subscribeList);

        let subscribeBtn = utility.$selector("#subscribeBtn");
        subscribeBtn.addEventListener("click",subscribeClickHandler.bind(null,contentList,subscribeList));
    }

    // 구독 밑 구독 한 목록에 대한 이벤트핸들러
    function subscribeClickHandler(contentList,subscribeList){
        if(event.target.className === "addSubscribe"){
            subscribePage(contentList,subscribeList);
        }else{
            utility.$selector("#mainArea").innerHTML = "<div id='titleList'> </div> <section class='content' id='newsContents'> </section>";
            newsStandPage(subscribeList,contentList);
        }
    }

    //뉴스스텐트 페이지 로딩
    function newsStandPage(contentList,subscribeList){
        //렌더링 할 dom
        let headerDom = utility.$selector("header");
        let titleListDom = utility.$selector("#titleList");
        let contentDom = utility.$selector("#newsContents");

        //영향을 받는 view를 {viewObj : contentsView, domObj: contentDom}; 같은 형식으로 지정하여 배열로 넣어주면 자동으로 영향을 받는 뷰들이 렌더링 된다
        let content = {viewObj : contentsView, domObj: contentDom};
        let menu = {viewObj: menuView, domObj:headerDom};
        let title = {viewObj: titleListView, domObj: titleListDom};

        menuView.setRenderingViews([content,menu,title]);
        menuView.setContentsList(contentList);
        menuView.setCurrent(0);
        menuView.setState(0);
        menuView.render(headerDom);

        titleListView.setRenderingViews([menu,content,title]);
        titleListView.setContentsList(contentList);
        titleListView.setCurrent(0);
        titleListView.render(titleListDom);

        contentsView.setRenderingViews([content,menu,title]);
        contentsView.setCancelSubList(subscribeList);
        contentsView.setContentsList(contentList);
        contentsView.setCurrent(0);
        contentsView.render(contentDom);
    }

    // 구독 목록 페이지 로딩
    function subscribePage(contentList,subscribeList){
        //렌더링 할 dom
        let mainAreaDom = utility.$selector("#mainArea");
        let headerDom = utility.$selector("header");

        menuView.setContentsList(contentList);
        menuView.setCurrent(0);
        menuView.setState(1);
        menuView.render(headerDom);

        contentsSubscribeView.setContentsList(contentList);
        contentsSubscribeView.setSubscribeContentsList(subscribeList);
        contentsSubscribeView.render(mainAreaDom);

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


