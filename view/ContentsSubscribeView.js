/**
 * Created by donghyunkim on 2017. 3. 19..
 */




var ContentsSubscribeViewPrototype = {

    //contents를 렌더링하는 메소드
    render : function(renderingDom){

        let mainTemplate = utility.$selector(".subscribeTemplate").innerText;
        this.createContent();
        let contentsList = this.contentsList;
        console.log(contentsList);
        let resultHtml = "";
        let tempHtml = "";
        let divHtml = "<div class='col-sm-3 {{idx}}' > <img class={{idx}} src={{titleimgurl}} alt='' width='70' height='60'> </div>";


        let length = contentsList.length;

        if(contentsList.length === 0) {
            renderingDom.innerHTML = "";
        }else {

            for (let i = 1; i <= length; i++) {
                divHtml = divHtml.replace("{{titleimgurl}}", contentsList[i-1].getTitleImgurl());
                divHtml = divHtml.replace(/{{idx}}/g, i-1);
                tempHtml += divHtml;
                if(i % 4 === 0 || i === length) {
                    resultHtml += "<div class='row'>" + tempHtml + "</div>";
                    tempHtml = "";
                }
                divHtml = "<div class='col-sm-3 {{idx}}' > <img class={{idx}} src={{titleimgurl}} alt='' width='70' height='60'> </div>";
            }

            mainTemplate = mainTemplate.replace("{{subscribeList}}", resultHtml);
            renderingDom.innerHTML = mainTemplate;
        }


       let subscribeBtn = utility.$selector(".subscribeBtn");
        subscribeBtn.addEventListener("mouseover",this.subscribeMouseoverHandler.bind(this));

        subscribeBtn.addEventListener("mouseout",this.subscribeMouseoutHandler.bind(this));


    },
    getContentsSubscribeViewKey : function(){
        return this.contentsSubscribeViewKey;
    },
    setContentsSubscribeViewKey : function(contentsSubscribeViewKey){
        this.contentsSubscribeViewKey = contentsSubscribeViewKey;
    },
    getContentSubscribeData : function(){
        return this.contentSubscribeData;
    },
    setContentSubscribeData: function(contentSubscribeData){
        this.contentSubscribeData = contentSubscribeData;
    },
    getContentsList : function(){
        return this.contentsList;
    },
    setContentsList: function(contentsList){
        this.contentsList = contentsList;
    },
    getSubscribeContentsList : function(){
        return this.subscribeContentsList;
    },
    setSubscribeContentsList: function(subscribeContentsList){
        this.subscribeContentsList = subscribeContentsList;
    },
    getRenderingViews : function(){
        return this.renderingViews;
    },
    setRenderingViews : function(renderingViews){
        this.renderingViews = renderingViews;
    },
    getCurrent : function(){
        return this.current;
    },
    setCurrent : function(current){
        this.current = current;
    },
    createContent : function(){
        this.contentSubscribeData = this.contentsList[this.current];
    },
    removeContent : function(){
        this.contentsList.splice(this.current, 1);
    },
    subscribeMouseoverHandler : function(){

        let element = event.target;


        if(element.tagName == "IMG"){
            this.imgElement = element;
            element.parentNode.innerHTML = "<button class='btn btn-primary " + element.className + "' style='height:60px; width:70px;'>구독</button>";
        }

        let subBtn = element;
        let idx = subBtn.classList[2];
        console.log(subBtn);

        subBtn.addEventListener("click",function(){
            console.log("dd");
        })



    },
    subscribeMouseoutHandler : function(){
        let element = event.target;
        let elementParent = {};
        if(element.tagName == "BUTTON"){
            elementParent = element.parentNode;
            elementParent.innerHTML = "";
            elementParent.appendChild(this.imgElement);
        }
    }
};

var ContentsSubscribeViewProperty = {
    contentsSubscribeViewKey : 0,
    contentSubscribeData: {},
    contentsList : [],
    renderingViews : [],
    current: 0,
    imgElement: {},
    subscribeContentsList: []
};

