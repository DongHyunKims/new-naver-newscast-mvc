/**
 * Created by donghyunkim on 2017. 3. 17..
 */

//이벤트 핸들 부분

//리스트 클릭 핸들러
function listClickHandler(newsModelList) {
    let contentDom = utility.$selector("#newsContents");
    let headerDom = utility.$selector("header");
    let key =  Number(event.target.id);
    menuView.renderMenu(newsModelList,headerDom,key,arrowClickHandler);
    highLight(key);
    contentsView.renderContents(newsModelList, contentDom,key,removeNewsClickHandler);
}

//prev,next 버튼 클릭 핸들러
function arrowClickHandler (newsModelList){
    let key = Number(utility.$selector("hidden").id);
    let page = newsModelList.selectPage(key);
    let currentSite = page.currentPage;
    let totalpage = page.totalPage;
    if (event.target.parentElement.className == "left") {

        if (currentSite > 1) {
            currentSite--;
        } else if (currentSite === 1) {
            currentSite = totalpage;
        }
    } else {
        if (currentSite < totalpage) {
            currentSite++;
        } else if (currentSite === totalpage) {
            currentSite = 1;
        }
    }

    let selectedKey = newsModelList.getNewsKey(currentSite-1);
    let contentDom = utility.$selector("#newsContents");
    let headerDom = utility.$selector("header");
    contentsView.renderContents(newsModelList,contentDom,selectedKey,removeNewsClickHandler);
    highLight(selectedKey);
    menuView.renderMenu(newsModelList,headerDom,selectedKey,arrowClickHandler);

}

//구독취소버튼 클릭 핸들러
function removeNewsClickHandler(newsModelList){
    let key = Number(utility.$selector("hidden").id);

    newsModelList.deleteNews(key);




    let titleListDom = utility.$selector("#titleList");
    let contentDom = utility.$selector("#newsContents");
    let headerDom = utility.$selector("header");



    // 전체페이지를 렌더링 해야한다.
    let selectedKey = 0;

    if(newsModelList.getNewsModelList().length === 0){
        selectedKey = undefined;
    }else{
        selectedKey = newsModelList.getNewsModelList()[0].newsKey;
    }
    menuView.renderMenu(newsModelList,headerDom,selectedKey,arrowClickHandler);
    titleListView.renderTitleList(newsModelList,titleListDom,listClickHandler,highLight,selectedKey);
    contentsView.renderContents(newsModelList,contentDom,selectedKey,removeNewsClickHandler);
}

//글자색 강조 함수
function highLight(key) {
    var dom = document.querySelectorAll("nav>ul>li");
    dom.forEach(function (value) {
        value.style.color = "black";
    });
    utility.$selector("nav>ul>#\\3"+key).style.color = "blue";
}