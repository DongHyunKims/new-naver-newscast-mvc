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
    menuList : ["전체언론사 > ","My news"],
    contentsList : [],
    renderingViews : [],
    current: 0,
    total: 0
};

var MenuViewProtoType = {

    //menu rendering 메소드
    render : function(renderingDom){
        this.total = this.contentsList.length;
        let currentPage = this.total === 0 ? 0 : this.current+1;
        let mainTemplate = document.querySelector(".menuTemplate").innerText;

        mainTemplate = mainTemplate.replace("{{currentPage}}", currentPage);
        mainTemplate = mainTemplate.replace("{{totalPage}}", this.total);
        mainTemplate = mainTemplate.replace("{{dataList}}", this.menuList.map(function (val) {
            return "<li>" + val + "</li>"
        }).join(""));

        renderingDom.innerHTML = mainTemplate;

        let arrowBtnDom = document.querySelector(".btn");
        arrowBtnDom.addEventListener("click", this.arrowClickHandler.bind(this,this.renderingViews,currentPage, this.total));

    },
    getMenuViewKey : function(){
        return this.contentsViewKey;

    },
    setMenuViewKey : function(contentsViewKey){
        this.contentsViewKey = contentsViewKey;
    },
    addMenu : function(menu){
        this.menuList.push(menu);
    },
    getPageData : function(){
        return this.pageData;
    },
    setPageData: function(pageData){
        this.pageData = pageData;
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
    getTotal : function(){
        return this.total;
    },
    setTotal: function(total){
        this.total = total;
    },
    //prev,next 버튼 클릭 핸들러
    arrowClickHandler : function(renderingViews,currentPage,total) {
        let totalpage = total;

        if (event.target.parentElement.className == "left") {
            if (currentPage > 1) {
                currentPage--;
            } else if (currentPage === 1) {
                currentPage = totalpage;
            }
        } else {
            if (currentPage < totalpage) {
                currentPage++;
            } else if (currentPage === totalpage) {
                currentPage = 1;
            }
        }

        for (let i = 0; i < renderingViews.length; i++) {
            let viewObj = renderingViews[i].viewObj;
            let domObj = renderingViews[i].domObj;
            viewObj.setCurrent(currentPage-1);
            viewObj.render(domObj);
        }
        // if (argArr[argArr.length - 2] !== event) {
        //     argArr[argArr.length - 2](selectedKey);
        // }
    },

};


//var menuView = utility.makeObject(MenuViewProperty,MenuViewProtoType);



