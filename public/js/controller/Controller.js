/**
 * Created by donghyunkim on 2017. 3. 20..
 */
var ControllerPrototype = {
    join: function(){
        // 이벤트 핸들러를 모두 등록 시킨다
        dispatcher.register({
                //필요한 데이터를 초기화 시키는 함수
                "initViews" : function(data){
                    this.modelList.createModelList(data);
                }.bind(this),
                // 모든 뷰를 렌더링 하는 메소드
                "renderAllViews" : function(modelObj, page, titleList){
                    this.menuView.render(page);
                    this.titleListView.render(titleList);
                    this.contentsView.render(modelObj);
                }.bind(this),
                // 현재위치의 데이터를 가져오는 메소드
                "clickEvent" : function(current){
                    this.modelList.selectNews(current);
                }.bind(this),
                //서버와 통신하여 구독 취소를 하는 메소드
                "cancelClickEvent" : function(reqListener,id){
                    utility.runAjax(reqListener,'get',utility.defaultUrl+ "/newsData/updateSubState/" + id);
                }

        });
    }
};
