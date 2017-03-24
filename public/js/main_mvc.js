/**
 * Created by donghyunkim on 2017. 3. 14..
 */
    //"./data/newslist.json"




(function() {
    //let contentsSubscribeView = utility.makeObject(ContentsSubscribeViewPrototype,ContentsSubscribeViewProperty);



    const titleListView = utility.makeObject(TitleListViewProperty,TitleListViewProtoType);
    const menuView = utility.makeObject(MenuViewProperty,MenuViewProtoType);
    const contentsView = utility.makeObject(ContentsViewProperty,ContentsViewProtoType);

    //sevice runner
    document.addEventListener("DOMContentLoaded", function() {
        let headerDom = utility.$selector("header");
        let titleListDom = utility.$selector("#titleList");
        let contentDom = utility.$selector("#newsContents");

        titleListView.setRenderingDom(titleListDom);
        menuView.setRenderingDom(headerDom);
        contentsView.setRenderingDom(contentDom);

        let modelList = utility.makeObject(NewsModelListProperty,NewsModelListPrototype);


        const controller = Object.assign(Object.create(ControllerPrototype),{
            modelList : modelList,
            titleListView : titleListView,
            menuView : menuView,
            contentsView : contentsView,
        });

        controller.join();
    });


    //ajax 콜백함수
    function reqListener() {


        let jsonDatas = JSON.parse(this.responseText);
        console.log(jsonDatas);
        dispatcher.emit({"type": "initViews"},[jsonDatas]);

    }
    document.addEventListener("DOMContentLoaded",utility.runAjax(reqListener,"GET",utility.defaultUrl + "/newsData/getNews"));

})();


