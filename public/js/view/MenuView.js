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
    renderingDom : {},
};

var MenuViewProtoType = {

    //menu rendering 메소드
    render : function(pageData){
        let totalPage = pageData.totalPage;
        let currentPage = this.total === 0 ? 0 : pageData.currentPage;

        let mainTemplate = document.querySelector(".menuTemplate").innerText;
        mainTemplate = mainTemplate.replace("{{currentPage}}", currentPage);
        mainTemplate = mainTemplate.replace("{{totalPage}}", totalPage);
        this.renderingDom.innerHTML = mainTemplate;
        this.setEvent();
    },
    getMenuViewKey : function(){
        return this.menuiewKey;

    },
    setMenuViewKey : function(menuViewKey){
        this.menuViewKey = menuViewKey;
    },
    getRenderingDom: function(){
        return this.renderingDom;
    },
    setRenderingDom : function(renderingDom){
        this.renderingDom = renderingDom;
    },
    setEvent : function(){
        this.arrowClickHandler();
    },
    //prev,next 버튼 클릭 핸들러


    arrowClickHandler : function() {
        let pageData = utility.$selector(".paging").innerText.split(" ");
        let currentPage = Number(pageData[0]);
        let totalPage = Number(pageData[2]);

        let btnDom = utility.$selector(".btn");

        btnDom.addEventListener("click", (event)=>{
            let arrowDiv = event.target.parentElement;
            if (arrowDiv.className == "left") {
                if (currentPage > 1) {
                    currentPage--;
                } else if (currentPage === 1) {
                    currentPage = totalPage;
                }
            } else {
                if (currentPage < totalPage) {
                    currentPage++;
                } else if (currentPage === totalPage) {
                    currentPage = 1;
                }

            }
            dispatcher.emit({"type" : "clickEvent"},[currentPage-1]);
        });

    },

};





