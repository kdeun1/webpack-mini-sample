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

4. webpack 설정
    - `webpack.config.js` 파일에 설정을 입력한다.
    - `entry`는 시작(진입) 파일이며, 사용하는 모듈들을 파악한다.
    - `output`은 만들어진 최종 파일을 내보내는 옵션이다.
        - `filename`은 최종파일 명
        - `path`는 폴더이며, 이 때, node에서 제공하는 path 모듈(파일이나 폴더의 경로 작업을 위한 유틸)을 활용한다. 현재 경로 하위(__dirname)에 dist라는 폴더를 의미
    - `src` 폴더를 생성하고 폴더 내부에 `util.js` 파일을 만든다.
        - `src`라는 소스 디렉토리 폴더를 생성한다.
        - utils.js 파일 안에 함수를 만들고 export한다.
        - index.js 파일을 src 폴더 내부로 넣고, utils.js의 함수들을 활용(import)해본다.
    - webpack을 실행해서 bundle 만들기
        - `package.json` 파일 내 `scripts` 옵션에 각종 명령어를 추가해볼 수 있다.
        - scripts에 `"build": "webpack"`이라고 적어준다.
        - terminal에서 `npm run build`를 입력한다. 배포 디렉토리 `dist` 폴더가 생성되었으며, 내부에 main.js 파일이 생성되었다. 이 과정을 흔히 `번들링`이라고 한다.
        - 이렇게 2개의 파일을 하나의 파일로 합쳐주는 것이 웹팩의 역할이다. 또한 dist 폴더 내 파일을 열어보면 웹팩이 소스코드를 최적화(uglify/minify)해놓았다. 브라우저가 해석하기에 코드 량이 적어 성능이 좋아지며, 코드의 난독화로 인해 약간의 보안성을 가진다.
    - main.js 파일을 index.html에서 사용
        - index.html 파일 내 script src 경로를 index.js -> ./dist/main.js로 변경한다. 웹팩이 만든 번들파일을 참조하도록 수정하였다.
        - `npm run build` 후 로컬 서버를 띄운다.


# 참조
- webpack 프론트엔드 필수 개발환경 셋팅[https://www.youtube.com/watch?v=zal9HVgrMaQ]

- 웹팩(Webpack) 기본 사용법 (CLI)[https://www.daleseo.com/webpack-basics/]