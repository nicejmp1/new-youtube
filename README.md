# youtubeAPI를 이용한 Music Chart 만들기
youtube API를 이용한 Music Chart 만들기 사이트 입니다. 

![image](https://github.com/nicejmp1/new-youtube/assets/163364733/3a16d19c-f394-4ca9-93cf-6a0308258106)

# 사용한 기술 
- React 설치: `npx create-react-app 폴더이름` 명령어로 새로운 리액트 앱을 생성합니다. 현재 디렉토리에 설치하려면 폴더 이름 대신 `.`를 사용하세요.

- react-router-dom 설치: `npm install react-router-dom` 명령어로 SPA(Single Page Application) 내 라우팅을 관리할 수 있는 라이브러리를 설치합니다.

- Axios 설치: `npm install axios` 명령어로 비동기 통신을 위한 API 라이브러리를 설치합니다.

- React Icons 설치: `npm install react-icons` 명령어로 다양한 아이콘을 프로젝트에 추가할 수 있습니다.

- React Player 설치: `npm install react-player` 명령어로 유튜브 및 다른 비디오 스트리밍 서비스를 재생할 수 있는 컴포넌트를 설치합니다.

- Sass 설치: `npm install sass` 명령어로 CSS 전처리기를 설치합니다.

- React Helmet Async 설치**: `npm install react-helmet-async` 명령어로 SEO를 개선할 수 있는 도구를 설치합니다.

- YoutubeAPI 사용

# 주요 기능
- **검색기능** :검색 기능을 이용하여 원하는 음악을 손쉽게 검색할 수 있습니다.
- **차트기능** : JSON 파일로 구성된 차트를 통해 재생 리스트에 곡을 추가할 수 있습니다
- **나만의플레이리스트** : 사용자가 직접 곡을 추가하고 관리할 수 있는 나만의 플레이리스트를 제공합니다.
- **플레이목록** : 현재 재생 중인 음악과 다음 재생될 음악의 목록을 보여줍니다.
- **바로재생, 리스트추가, 나만의플레이리스트추가** :  음악을 바로 재생하거나, 재생 목록에 추가하거나, 나만의 플레이리스트에 추가할 수 있는 기능을 제공합니다.

# 검색기능 
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/3178e72a-7e4b-4c60-a439-4cfba832a5d6)
> 해당 검색 기능을 통해 사용자가 듣고 싶은 노래 리스트를 10곡까지 검색할 수 있습니다.


# 차트기능 
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/e8657061-8299-4a2a-b339-321f646c6593)
> 웹크롤링을 이용해 만든 JSON 파일로 각 차트별 Top100 리스트를 만들어 두었습니다.

# 나만의 플레이리스트 
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/9f528a6a-42fe-42c4-8347-497264d73a77
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/bb8d463e-1d4d-4007-b508-b7075a746cbb)
> 원하는 곡을 나만의 플레이리스트에 저장해 언제든지 본인이 원하는 음악만 듣게 구현하였습니다.
# 플레이목록 
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/440db274-1d2e-4cde-b66e-30b845fe8ea8)
> 햄버거 메뉴 토글을 이용하여 듣지 않을땐 접어놓고 듣고 싶을때 펼쳐놓게 만들어 두었습니다. 추가로 랜덤 셔플기능과 한곡 듣기 기능을 구현하였습니다.

# 바로재생, 리스트추가, 나만의 플레이리스트 추가
![image](https://github.com/nicejmp1/new-youtube/assets/163364733/4fda7d39-90e2-4628-8914-3538ca579018)
> 해당 토글 버튼을 활용하여 바로재생, 리스트추가, 나만의 플레이리스트 추가를 구현하였습니다.




