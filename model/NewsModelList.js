/**
 * Created by donghyunkim on 2017. 3. 16..
 */


var NewsModelListProperty = {
    newsModelListKey : 0,
    newsModelList : []
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
    //필요한 뉴스 하나만 검색하는 메소드
    selectNews : function(newsKey) {
        return this.newsModelList.filter((val)=>{
            return val.newsKey === newsKey;
        })[0];
    },
    //타이틀을 가져 오는 메소드
    selectNewsTitle : function(){
        let titleList = [];
        this.newsModelList.forEach(function(val){
            titleList.push({key : val.newsKey , title :val.title});
        });
        return titleList;

    },
    //현재 패이지와 전체페이지를 가져오는 메소드
    selectPage : function(newsKey){
        let pageObject = {
            currentPage : 0,
            totalPage : this.newsModelList.length
        };

        this.newsModelList.forEach(function(val,idx){
            if(val.newsKey === newsKey){
                pageObject.currentPage = idx+1;
            }
        });
        return pageObject;
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
    }
};
