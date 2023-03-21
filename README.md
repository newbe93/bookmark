# bookmark

프론트엔드 공부를 하면서 정말 검색을 많이 했던 것 같다.<br/> 그러면서 정말 도움이 많이됐던, 내 문제를 해결해줬던 사이트들을 매번 북마크해뒀던 것 같다.<br/> 하지만 제대로 정리를 하지 못해서 어떤 사이트가 어떤 내용인지 알 수가 없었고, 또 다시 방문하고 싶은 사이트를 찾기가 힘들었다.<br/> 그래서 생각난게 바로 북마크를 카테고리별로 정리해놓을 수 있는 웹앱이었다.

- 북마크를 드래그&드롭으로 정리해보자.
- 카테고리별로 비슷한 북마크를 모아보자.
- 저장했던 북마크를 삭제, 수정 해보자. 카테고리 전체를 삭제할 수도 있다.
- 저장한 북마크를 검색해보자.
- PC용과 Mobile용 반응형 웹페이지를 만나보자.

## 🛠 사용한 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

## 프로젝트 회고

혼자서 처음부터 끝까지 직접 코드를 작성해서 하나의 프로젝트를 만들어나가면서 정말 많이 배울 수 있었고, 또 본인의 모자른 점 또한 많이 느낄 수 있었습니다. <br/>
useState를 이용해서 상태를 관리할 때는 자식컴포넌트들에게 props를 전달하기 위해 고생했었는데, 이를 해결하고자 Redux toolkit을 공부해서 정말 편리하게 사용했습니다. 또 dispatch를 통한 상태변경을 할 때, dispatch의 asynchronous 동작때문에 생기는 문제들을 해결하려고 Promise, async&await을 다시 공부했던 것도 결국 문제해결 방법은 아니었지만, 좋았습니다. <br/>
반응형 디자인을 구현하면서 고민하다가 State 관리를 통해 class를 부여하고 또 class에 여러가지 css를 주는 것은 너무 비효율적이라고 생각해서 다른 방법을 찾다가 React-responsive 라이브러리를 사용해서 useMediaQuery Hook으로 보다 쉽게 반응형 디자인을 구현할 수 있었습니다. 또 UI에 animation 효과를 주는것도 익숙해질 수 있었습니다.<br/>
또 드래그앤드롭 기능을 drag & drop API과 useRef Hook을 사용해서 구현했는데, 둘 다 처음 사용해보는 것들이어서 생소했지만 공부하면서 재미있었고 useRef는 js의 QuerySelector처럼 사용할 수 있다는 걸 알고는 다음에 필요한 때가 생기면 좀 더 수월하게 적용할 수 있을 것 같습니다.<br/>
프로젝트를 진행하면서 필요한 스택이나 기술들을 공부하고 그것을 사용해서 문제를 해결했을 때의 기쁨을 알게됐고, 아직 부족한게 많은 프로젝트라서 앞으로 더 발전하고 공부해서 다시 리팩토링 해보고 싶습니다.<br/>
그래서 다음 목표로 <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
를 공부해서 MERN 풀스택으로 다른 프로젝트를 해보고싶습니다.
