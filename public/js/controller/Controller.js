/**
 * Created by donghyunkim on 2017. 3. 20..
 */
var ControllerPrototype = {
    join: function(){
        // 이벤트 핸들러를 모두 등록 시킨다
        dispatcher.register({

                "initViews" : function(data){
                    this.modelList.createModelList(data);
                }.bind(this),
                "renderAllViews" : function(modelObj, page, titleList){
                    this.menuView.render(page);
                    this.titleListView.render(titleList);
                    this.contentsView.render(modelObj);
                }.bind(this),
                "clickEvent" : function(current){
                    this.modelList.selectNews(current);
                }.bind(this),
                "cancelClickEvent" : function(reqListener,id){
                    utility.runAjax(reqListener,'get',utility.defaultUrl+ "/newsData/updateSubState/" + id);
                }

        });
    }
};
