/**
 * Created by donghyunkim on 2017. 3. 16..
 */


var NewsModelListProperty = {
    newsModelListKey : 0,
    newsModelList : [],
};

var NewsModelListPrototype = {
    getNewsModelListKey : function(){
        return this.newsModelListKey;
    },
    setNewsModelListKey : function(newsModelListKey){
        this.newsModelListKey = newsModelListKey;
    },
    getNewsModelList : function(){
        return this.newsModelList;
    },
    setNewsModelList : function(newsModelList){
        this.newsModelList = newsModelList;
    },
    //뉴스 구독 추가 메소드
    addNews : function(newsObj){
        return this.newsModelList.push(newsObj);

    },
    //뉴스 구독 삭제 메소드
    deleteNews : function(newsKey){
        for (var i = 0; i < this.newsModelList.length; i++) {
            if (this.newsModelList[i].getNewsKey() === newsKey) {
                this.newsModelList.splice(i, 1);
                break;
            }
        }
    },

    cancelSubscribe : function(idx){
        this.newsModelList.splice(idx, 1);
        dispatcher.emit({"type":"renderAllViews"},this.createRenderingData(idx));

    },
    //필요한 뉴스 하나만 검색하는 메소드
    selectNews : function(idx) {
        dispatcher.emit({"type" : "renderAllViews"}, this.createRenderingData(idx));
    },
    //타이틀을 가져 오는 메소드
    selectNewsTitle : function(idx){
        let titleList = [];
        this.newsModelList.forEach(function(val){
            titleList.push(val.title);
        });
        return {current : idx , titleList : titleList};

    },
    //현재 패이지와 전체페이지를 가져오는 메소드
    selectPage : function(index){
        return  {
            currentPage : index+1,
            totalPage : this.newsModelList.length,
        };
    },
    //해당 키에 맞는 news의 index를 가져오는 메소드
    getNewsIndex : function(newsKey){
        let index  = 0;
        for(let i = 0; i < this.newsModelList; i++){
            if(this.newsModelList[i].getNewsKey() === newsKey){
                index = i;
                break;
            }

        }
        return index;
    },
    //인자로 들어온 index에 상응하는 news의 키 값을 가져오는 함수
    getNewsKey : function(index){
        return this.newsModelList[index].getNewsKey();
    },
    //newsList를 만드는 함수
    createModelList : function(jsonDatas){
        this.newsModelList = jsonDatas.map((val,idx)=>{
            return utility.makeObject(this.convertObj(val,idx),NewsModelPrototype);
        });
        dispatcher.emit({"type" : "renderAllViews"},this.createRenderingData(0));
    },
    //json데이터를 class로 바꾸어주는 함수
    convertObj : function (data,idx){
        for(let key in data){
            NewsProperty[key] = data[key]
        }
        NewsProperty.newsKey = idx;
        return utility.makeObject(NewsProperty,NewsModelPrototype);
    },
    createRenderingData : function(idx){

        return [{current : idx , modelObj : this.newsModelList[idx]},this.selectPage(idx), this.selectNewsTitle(idx)];
    }
};
