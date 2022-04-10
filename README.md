# webpack-mini-sample
프론트엔드 개발을 위한 웹팩 설정

## 내용 요약
1. 간단한 html + js 파일 방식
    - index.html과 index.js 파일을 만든다. html 파일 안에 js 스크립트 코드를 넣는 방식은 옛날 방식이다.
    - <meta charset="UTF-8"> 태그를 사용함으로서, 한글이 나타날 수 있도록 문자셋 속성(해당 HTML 문서의 문자 인코딩 방식)을 UTF-8로 사용한다.
    - html과 js를 분리하는 것은 관리적인 측면에서 좋다. 또한, 외부 라이브러리를 cdn 방식으로도 많이 사용했었다.
    - 하지만, JS파일과 html의 종속으로 인해 독립이 안되어 html 의존적이므로, html 없이 js를 정상적으로 작동할 수 없게 되었다. 외부 라이브러리의 추가로 인해 js상의 전역 스페이스가 오염되는 단점이 존재한다. 그리고 외부 라이브러리를 추가할 때마다 HTML에 계속 코드를 추가해야한다.


# 참조
- webpack 프론트엔드 필수 개발환경 셋팅[https://www.youtube.com/watch?v=zal9HVgrMaQ]

- 웹팩(Webpack) 기본 사용법 (CLI)[https://www.daleseo.com/webpack-basics/]