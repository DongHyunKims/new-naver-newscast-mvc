/**
 * Created by donghyunkim on 2017. 3. 16..
 */

//utility 객체 공용으로 사용할
var utility = {
        $ : document,
        $selector : function(selector){
            return document.querySelector(selector);
        },
        runAjax : function(reqListener, method, url){
            var oReq = new XMLHttpRequest();
            //reqListener 제일 마지막에 실행된다.
            oReq.addEventListener("load", reqListener);
            oReq.open(method, url);
            oReq.send();
        },
        makeObject : function (property, proto){
            //프로토 타입에 넣을 메소드를 모두 지정한다
            var obj = Object.create(proto);
            Object.keys(property).forEach(function(val){
                //해당 프로퍼티가 없으면 만든후 할당하고 아니면 덮어쓴다
                obj[val] = property[val];
            });
            return obj;
        }
    };
