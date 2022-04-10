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
    - 명령어 실행하면 `node_modules` 폴더와 `package-lock.json` 파일이 생성된다. `node_modules` 폴더가 git에 올라가지 않기 위해 `.gitignore` 파일을 만들어 규칙을 설정해준다. 간단한 .gitignore 파일을 생성하는데 도움을 주는 사이트[https://www.gitignore.io/] 는 다음과 같다. vscode, node 환경에서의 규칙을 가져왔다.
    - webpack 설정을 위해 `webpack.config.js` 파일을 생성한다. 웹팩 명령어를 실행했을 때, 파일 내 설정을 자동으로 적용해준다.

4. webpack 설정
    - `webpack.config.js` 파일에 설정을 입력한다.
    - `entry`는 시작(진입) 파일이며, 사용하는 모듈들을 파악한다.
    - `output`은 만들어진 최종 파일을 내보내는 옵션이다.
        - `filename`은 최종파일 명
        - `path`는 폴더이며, 이 때, node에서 제공하는 path 모듈(파일이나 폴더의 경로 작업을 위한 유틸)을 활용한다. 현재 경로 하위(__dirname)에 dist라는 폴더를 의미
    - `src` 폴더를 생성하고 폴더 내부에 `util.js` 파일을 만든다.
        - utils.js 파일 안에 함수를 만들고 export한다.
        - index.js 파일을 src 폴더 내부로 넣고, utils.js의 함수들을 활용(import)해본다.
    - 이제 webpack을 실행해본다.
        - `package.json` 파일 내 `scripts` 옵션에 각종 명령어를 추가해볼 수 있다.
        - scripts에 `"build": "webpack"`이라고 적어준다.
        - terminal에서 `npm run build`를 입력한다. dist 폴더가 생성되었으며, 내부에 main.js 파일이 생성되었다.
        - 이렇게 2개의 파일을 하나의 파일로 합쳐주는 것이 웹팩의 역할이다.
    - main.js 파일을 index.html에서 사용
        - script src 경로를 index.js -> ./dist/main.js로 변경
        - `npm run build` 후 로컬 서버를 띄운다.

5. html-webpack-plugin 설치 및 설정
    - build 후에 dist폴더 내 js파일만 배포하는게 아니라 html파일도 함께 존재해야 한다. 그래야 dist폴더만 배포할 경우 완벽하게 된다.
    - `npm i html-webpack-plugin` 명령어를 입력한다.
        - `webpack.config.js` 파일에서 설치한 html-webpack-plugin을 불러오고, `plugins` 옵션에 `[new HtmlWebpackPlugin()]` 를 추가한다.
        - `npm run build` 다시 빌드를 해본다. 이제 index.html이 생성된다. 하지만, 우리가 만든 html 파일이 아니다.
    - HtmlWebpackPlugin은 webpack 번들을 제공하는 HTML 파일생성을 단순화한다. 파라미터에는 객체가 들어가는데 옵션을 설정할 수 있다.
        - filename: (default: index.html) 생성될 html 파일명
        - template: 템플릿으로 사용할 html 파일의 상대/절대 경로. 기존에 만들어두었던 파일을 이용해 html을 생성
        - 참조 : https://github.com/jantimon/html-webpack-plugin#options
    - `new HtmlWebpackPlugin({ template: './index.html' })` 설정 후 다시 빌드
        - dist > index.html을 노드 서버로 돌렸을 때, template이 없는 경우 빈 html이 나오고, template 옵션에서 기존의 index.html을 이용하도록 빌드하면 정상적인 결과가 나온다.
        - index.html 내부에 <script></script> 태그를 추가하여 js파일을 넣을 필요가 없다. 자동으로 <script></script> 태그를 만들어준다.

6. webpack-dev-server 설치 및 설정
    - 코드를 수정할 때마다 웹팩 명령어를 매 번 실행해줘야한다. 개발하기 쉽게 서버를 띄워주는 역할을 한다. 
    - `npm i webpack-dev-server -D` 명령어를 입력한다.
        - `webpack.config.js` 파일에 설치한 라이브러리를 설정해준다. devServer 옵션에 static 옵션에 directory를 입력해주고, port도 설정해준다.
        - package.json 파일에서 `"start": "webpack serve --open"` 스크립트를 추가한다.
    - `npm (run) start` 명령어를 입력한다.
        - 설정한 8989 포트로 페이지가 뜬다. 하지만 컴파일 문제가 발생한다. mode 옵션이 없기 때문인데 `"start": "webpack serve --open --mode=development"` 로 수정한다.
    - `npm run build` 명령어를 입력한다.
        - 빌드시 스크립트에도 mode가 없어 컴파일 문제가 발생한다. 빌드 스크립트도 `"build": "webpack --mode=development"`와 같이 수정한다.
            - 정상적으로 (개발 모드로) 빌드를 하면 dist 폴더 내 main.js 파일이 개발 모드의 불필요한 대량의 코드들이 생성된다. 개발 모드의 코드가 복잡한 이유는 작업 중 에러가 발생했을 때 찾기 수월하기 때문이다.
        - 보통 빌드는 production 모드로 하기 때문에 명령어를 `"build": "webpack --mode=production"`로 수정한다.
            - production 모드로 빌드를 하면 코드가 한 줄로 깔끔하게 나타난다. util.js 내부의 함수를 가져와 함수 실행이 평가된 결과 값으로 코드에 존재한다.

7. css 설정
    - `npm i -D style-loader css-loader` 명령어를 입력한다.
        - css-loader는 css 파일을 읽어주고, style-loader는 css를 style 태그로 만들어서 head에 넣어준다.
        - style-loader, css-loader는 webpack.config.js에서 module 속성에 세팅해준다.
    - webpack.config.js 내 css 확장자에 대한 세팅
        - use 속성의 값은 배열인데, ['style-loader', 'css-loader']의 값이 들어가며, 역순방향(우측에서 좌측으로)으로 loader가 적용된다.
    - src 폴더에 style.css 파일을 만들고 적용한다.
        - style.css 파일 내 body 태그에 스타일 변경 코드를 작성한다.
        - index.js 파일에 style.css를 import한다.
        - npm start 명령어를 실행하며 설정된 스타일을 확인해본다.
        - 리터럴 형식으로 <head> 내부에 <style></style> 이 들어가있다.
    - src/header.css 파일을 생성하고 적용한다.
        - header.css 파일 내 h1 태그에 스타일 변경 코드를 작성한다.
        - index.js 파일에 import한다.
        - 리터럴 형식으로 <head> 내부에 <style></style> 이 하나 더 추가되어있다.
        - 이처럼 css 태그가 늘어나면 <style></style> 태그가 늘어난다.

# 참조
- webpack 프론트엔드 필수 개발환경 셋팅[https://www.youtube.com/watch?v=zal9HVgrMaQ]

- 웹팩(Webpack) 기본 사용법 (CLI)[https://www.daleseo.com/webpack-basics/]