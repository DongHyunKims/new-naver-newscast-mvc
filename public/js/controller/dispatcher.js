/**
 * Created by donghyunkim on 2017. 3. 20..
 */
const dispatcher = {
    register : function(eventHandlerList){
        this.eventHandlerList = eventHandlerList;
    },
    emit : function(typeObj, data){
        //이벤트 핸들러의 내용을 가져와 apply를 통해 배열로 된 인자를 넣고 실행 시킨다
        this.eventHandlerList[typeObj.type].apply(null,data);
    }
};