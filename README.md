## mvc 패턴과 observer패턴 nodes js 적용 news stand

## develop_news_stand_node의 목적
- node.js와 mongodb를 사용하여 리펙토링 한다
- 구독 기능추가

## 추가사항

- import해서 사용
- **api 설명 작성**
- **변수이름 정리 및 메소드 이름 정리, 범용적인 것으로 사용**
- 클레스 다이어그램 및 데이터 흐름도 작성.
- ver 1.0 부터 현재 까지의 수정 사항 및 어려웟던 부분 블로그 정리
- 로그인 기능 및 인증기능
- **mysql을 사용한 데이터 처리**


## 완성사항

- observer 패턴을 사용하여 리펙토링 한다
- node.js와 mongodb를 사용하여 리펙토링 한다
- controller 구현
- 기준을 인덱스로
- 최대한 의존성을 감소시켜야 한다 (인자로 넘겨서 준다)
- 결합도를 낮추기
- 라우팅 처리
- 데이터베이스 모듈 처리
- 주석 작성


## News Stand view API

### What?
- News stand UI 구성을 쉽게 진행 할수 있도록 4 가지의 view component를 제작.

### View component
1. ContentsView
 - News stand의 title, img, news list와 삭제 버튼을 렌더링 하는 객체.
2. MenuView
 - News stand 상단의 오른쪽 메뉴와 페이지, 앞/뒤로 가기 버튼을 렌더링하는 객체.
3. TitleListView
 - News stand의 좌측 title list를 렌더링 하는 객체.
4. ContentsSubscribeView
 - 구독할 데이터의 정보를 렌더링하는 객체.


### Variable / Method

### Useage
