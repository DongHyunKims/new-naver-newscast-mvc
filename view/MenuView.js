/**
 * Created by donghyunkim on 2017. 3. 16..
 */

/**
 * Created by donghyunkim on 2017. 3. 16..
 */
/**
 * Created by donghyunkim on 2017. 3. 16..
 */


var MenuViewProperty = {

    menuViewKey : 0,
    menuList : ["전체언론사","My news"],
};

var MenuViewProtoType = {

    //menu rendering 메소드
    renderMenu : function(newsModelList,headerDom,key){

        var mainTemplate = document.querySelector("#newsMenuTemplate").innerText;
        let pages = this.getPage(newsModelList,key);

        mainTemplate = mainTemplate.replace("{{currentPage}}", pages.currentPage);
        mainTemplate = mainTemplate.replace("{{totalPage}}", pages.totalPage);
        mainTemplate = mainTemplate.replace("{{menuList}}", this.menuList.map(function (val) {
            return "<li>" + val + "</li>"
        }).join(""));

        headerDom.innerHTML = mainTemplate;

        let arrowBtnDom = document.querySelector(".btn");
        arrowBtnDom.addEventListener("click", arrowClickHandler.bind(this,newsModelList));
    },
    //title 리스트를 가져오는 메소드
    getPage : function(newsModelList,key){
        return newsModelList.selectPage(key);
    },
    getMenuViewKey : function(){
        return this.contentsViewKey;

    },
    setMenuViewKey : function(contentsViewKey){
        this.contentsViewKey = contentsViewKey;
    }

};


var menuView = utility.makeObject(MenuViewProperty,MenuViewProtoType);







