# django-prac-005 + react-prac-002

## 활용스택

1. REACT
   > localhost:3000 에서 프론트 담당
   1. create-react-app
   2. axios, axios-hooks
   3. antd
2. DJANGO
   > localhost:8000 에서 백엔드 API 구성
   1. djangorestframework, jwt
   2. postgresql
   3. gunicorn
3. MS AZURE
   > 프리티어를 활용한 서버 구성 연습
   1. App Services (우분트, 벡엔드)
   2. 스토리지 (프론트 엔드)


## 구현대상

인스타그램 클론 :smile:

### 구현 페이지
1. 메인페이지
   1. 홈
   2. 회원가입
   3. 로그인
2. 서브페이지 (사이드, 푸터, 헤더)
   1. 헤더 + nav
   2. 사이드
      1. 유저 제안

### 구현로직
#### 프론트

1. 회원가입 > 로그인
2. 로그인 > 홈
3. 홈에서 POST LIST 확인
4. USER FOLLOW UNFOLLOW
5. POST LIKE UNLIKE
6. POST COMMENT 구현

#### 벡엔드

1. DRF JWT 인증
2. DRF POST VIEWSETS
3. MODEL FILTERING


## 기존방식과의 차이

1. Dotenv 대신 envrions 사용
2. useLocalStorage hook 대신 직접 짠 컴포넌트로 대체
3. 환경설정 세분화
4. token expire 기간 짧게 설정
