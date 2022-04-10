# webpack-mini-sample
프론트엔드 개발을 위한 웹팩 설정

## 내용 요약
1. 간단한 html + js 파일 방식
    - index.html과 index.js 파일을 만든다. html 파일 안에 js 스크립트 코드를 넣는 방식은 옛날 방식이다.
    - <meta charset="UTF-8"> 태그를 사용함으로서, 한글이 나타날 수 있도록 문자셋 속성(해당 HTML 문서의 문자 인코딩 방식)을 UTF-8로 사용한다.
    - html과 js를 분리하는 것은 관리적인 측면에서 좋다. 또한, 외부 라이브러리를 cdn 방식으로도 많이 사용했었다.
    - 하지만, JS파일과 html의 종속으로 인해 독립이 안되어 html 의존적이므로, html 없이 js를 정상적으로 작동할 수 없게 되었다. 외부 라이브러리의 추가로 인해 js상의 전역 스페이스가 오염되는 단점이 존재한다. 그리고 외부 라이브러리를 추가할 때마다 HTML에 계속 코드를 추가해야한다.

2. package.json 설치
    - `npm init -y` 실행한다. `-y` 명령어는 모두 yes로 일괄 적용된다.
    - package.json 파일이 생성된다. 외부 라이브러리를 체계적으로 관리하기 위해 node.js 패키지 매니저인 NPM을 도입하였다.

3. webpack 설치
    - `npm install webpack webpack-cli --save-dev`
    - webpack은 웹팩의 핵심 패키지라 설치한다.
    - webpack-cli는 커멘드라인으로 webpack을 실행할 수 있게 해준다.
    - 개발할 때만 필요하므로 `--save-dev` 옵션을 사용하였다.
    - 명령어 실행하면 `node_modules` 폴더와 `package-lock.json` 파일이 생성된다. `node_modules` 폴더가 git에 올라가지 않기 위해 `.gitignore` 파일을 만들어 규칙을 설정해준다. 간단한 .gitignore 파일을 생성하는데 도움을 주는 사이트[https://www.gitignore.io/]는 다음과 같다. vscode, node 환경에서의 규칙을 가져왔다.
    - webpack 설정을 위해 `webpack.config.js` 파일을 생성한다. 웹팩 명령어를 실행했을 때, 파일 내 설정을 자동으로 적용해준다.


# 참조
- webpack 프론트엔드 필수 개발환경 셋팅[https://www.youtube.com/watch?v=zal9HVgrMaQ]

- 웹팩(Webpack) 기본 사용법 (CLI)[https://www.daleseo.com/webpack-basics/]