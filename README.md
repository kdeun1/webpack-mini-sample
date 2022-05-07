# webpack-mini-sample
프론트엔드 개발을 위한 웹팩 설정

## 내용 정리
1. 간단한 html + js 파일 방식
    - index.html과 index.js 파일을 만든다. html 파일 안에 js 스크립트 코드를 넣는 방식은 옛날 방식이다.
    - `<meta charset="UTF-8">` 태그를 사용함으로서, 한글이 나타날 수 있도록 문자셋 속성(해당 HTML 문서의 문자 인코딩 방식)을 UTF-8로 사용한다.
    - html과 js를 분리하는 것은 관리적인 측면에서 좋다. 또한, 외부 라이브러리를 cdn 방식으로도 많이 사용했었다.
    - 하지만, JS파일과 html의 종속으로 인해 독립이 안되어 html 의존적이므로, html 없이 js를 정상적으로 작동할 수 없게 되었다. 외부 라이브러리의 추가로 인해 js상의 전역 스페이스가 오염되는 단점이 존재한다. 그리고 외부 라이브러리를 추가할 때마다 HTML에 계속 코드를 추가해야한다.

2. package.json 설치
    - `npm init -y` 실행한다. `-y` 명령어는 모두 yes로 일괄 적용된다.
    - package.json 파일이 생성된다. 외부 라이브러리를 체계적으로 관리하기 위해 node.js 패키지 매니저인 NPM을 도입하였다.

3. webpack 5 설치
    - `npm install webpack webpack-cli --save-dev`
    - webpack은 웹팩의 핵심 패키지라 설치한다.
    - webpack-cli는 커멘드라인으로 webpack을 실행할 수 있게 해준다.
    - 개발할 때만 필요하므로 `--save-dev` 옵션을 사용하였다.
    - 명령어 실행하면 `node_modules` 폴더와 `package-lock.json` 파일이 생성된다. `node_modules` 폴더가 git에 올라가지 않기 위해 `.gitignore` 파일을 만들어 규칙을 설정해준다. 간단한 .gitignore 파일을 생성하는데 도움을 주는 사이트[https://www.gitignore.io/] 는 다음과 같다. vscode, node 환경에서의 규칙을 가져왔다.
    - webpack 설정을 위해 `webpack.config.js` 파일을 생성한다. 웹팩 명령어를 실행했을 때, 파일 내 설정을 자동으로 적용해준다.

4. webpack 설정
    - `webpack.config.js` 파일에 설정을 입력한다.
    - `entry`는 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 시작(진입)점이자 자바스크립트 파일 경로이다.
        - 엔트리 포인트는 여러 개가 될 수도 있다. 엔트리 포인트를 분리하는 경우는 SPA가 아닌 특정 페이지로 진입했을 때, 서버에서 해당 정보를 내려주는 형태의 MPA(멀티 페이지 어플리케이션)에 적합하다.
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
        - index.html 내부에 `<script>` 태그를 추가하여 js파일을 넣을 필요가 없다. 자동으로 `<script>` 태그를 만들어준다.

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
        - webpack 5는 uglifyJs대신 terser-webpack-plugin이 사용되었다. uglify 플러그인이 ES6+이후로 지원하지 않기 때문에 현재 deprecated 상태이며 terser가 선택되었다.

7. css 설정
    - `npm i -D style-loader css-loader` 명령어를 입력한다. (internal css 방식)
        - css-loader는 css 파일을 자바스크립트 코드로 변환하여 읽을 수 있게 한다.
        - style-loader는 자바스크립트로 변경된 스타일시트를 동적으로 돔에 추가해준다. 한마디로 css를 `<style>` 태그로 만들어서 `<head>`에 넣어준다. 이 때, css-loader와 함께 사용된다. 번들된 css를 CSSOM으로 변경시킨다.
        - style-loader, css-loader는 webpack.config.js에서 module 속성에 세팅해준다.
    - webpack.config.js 내 css 확장자에 대한 세팅
        - use 속성의 값은 배열인데, ['style-loader', 'css-loader']의 값이 들어가며, 역순방향(우측에서 좌측으로)으로 loader가 적용된다.
    - src 폴더에 style.css 파일을 만들고 적용한다.
        - style.css 파일 내 body 태그에 스타일 변경 코드를 작성한다.
        - index.js 파일에 style.css를 import한다.
        - npm start 명령어를 실행하며 설정된 스타일을 확인해본다.
        - 리터럴 형식으로 `<head>` 내부에 `<style>` 이 들어가있다.
    - src/header.css 파일을 생성하고 적용한다.
        - header.css 파일 내 h1 태그에 스타일 변경 코드를 작성한다.
        - index.js 파일에 import한다.
        - 리터럴 형식으로 `<head>` 내부에 `<style>` 이 하나 더 추가되어있다.
        - 이처럼 css 태그가 늘어나면 `<style>` 태그가 늘어난다.

8. mini-css-extract-plugin 설치 및 설정
    - style-loader, css-loader를 사용하여 css 파일을 리터럴 방식으로 html에 추가하는 방식보다는 css 파일을 별도로 만들어서 가져오는 형태를 적용할 수 있다. (external css 방식)
    - `npm i -D mini-css-extract-plugin` 명령어를 입력한다.
    - webpack.config.js에서 세팅을 해준다.
        - plugins 속성에 `new MiniCssExtractPlugin({ filename: 'common.css' })`를 추가해준다.
        - modules.rules에서 css 확장자 규칙을 `test: /\.css$/i`로 변경하고 `use: [MiniCssExtractPlugin.loader, 'css-loader']`로 변경해준다. `<head>` 태그에 `<style>`을 추가하는 방식이 아니라 외부에서 가져오는 역할을 하기 때문에 style-loader 대신에 MiniCssExtractPlugin.loader로 변경하였다.
    - `npm run build` 명령어로 빌드를 해본다.
        - dist 폴더 내 common.css 파일이 추가되었다. 그리고 dist/index.html을 열어보면 `<link href="common.css" rel="stylesheet" />` 로 파일을 불러오는 것을 알 수 있다.

9. file-loader로 이미지 파일 불러오기
    - `npm i -D file-loader` 명령어를 실행한다.
    - webpack에서 실제 사용하는 파일을 출력 폴더 밑에 복사본을 만든다.
    - 이미지 파일을 import해서 html에 추가해보자
        - src 폴더 안에 images 폴더를 생성하고 이미지 파일을 하나 넣어놓았다. 그리고 index.js 파일에서 해당 이미지 파일을 logo로 import한다. 그리고 logo를 innerHTML안에 추가한다.
        - npm start를 하면 해당 파일을 처리할 loader가 없기 때문에 에러가 발생한다. 
    - webpack.config.js 파일에서 방금 설치한 file-loader를 세팅해보자.
        - module.rules에 `{ test: /\.(png|jpg)$/, use: ['file-loader'] }`를 추가한다.

10. clean-webpack-plugin로 이전 빌드물 제거하기
    - `npm i -D clean-webpack-plugin` 명령어를 실행한다.
    - clean-webpack-plugin은 성공적으로 빌드 시 output.path 디렉토리에 있는 모든 파일과 사용하지 않는 모든 웹팩 자산들을 제거해주는 플러그인이다.
    - html-webpack-plugin이나 mini-css-extract-plugin과 같은 플러그인과 달리 clean-webpack-plugin은 default export가 설정되어있지 않아 object destructuring해서 가져와야한다.
        - js파일에서 이미지 파일을 import한다. 그리고 빌드하게 되면 import된 이미지도 같이 빌드된다. 이미지를 교체 후에 빌드하면 이전 이미지도 남아있게 된다. 사용하지 않는 이미지를 import하지 않는다.
        - 해당 플러그인 설치 후 세팅하고 빌드하면 불필요한 이미지 파일이 사라진다.

11. webpack-bundle-analyzer 사용해보기
    - `npm i -D webpack-bundle-analyzer` 명령어를 실행한다.
    - 서버 실행 시 분석창이 매번 열리는데, 이를 설정 값을 통해 원하는 html파일명과 열리지 않게 설정한다.

12. Asset Modules 구성하기 (webpack 5)
    - 애셋 모듈은 로더를 추가로 구성하지 않아도 애셋 파일(폰트, 아이콘 등)을 사용할 수 있도록 해주는 모듈이다. Asset Modules는 Asset 파일들을 처리하는 방식들을 모아놓은 모듈이고, 정의하는 방식에 따라 브라우저가 한 번에 다운로드 하는 파일의 개수, 파일의 용량을 결정한다.
    - webpack 5 이전에는 아래의 로더를 사용했다.
        - raw-loader : 파일을 문자열로 그대로 자바스크립트로 가져온다.
        - file-loader : 모듈의 내용을 그대로 복사해서 출력 폴더 밑에 복사한다.
        - url-loader : 파일의 크기가 limit 값보다 작은 경우 dataURI 형식으로 번들 파일의 인라인으로 내용으로 추가된다. 파일 크기가 큰 경우 다른로더가 처리할 수 있도록 fallback 옵션을 제공한다. fallback 옵션을 입력하지 않으면 file-loader가 처리한다.
    - 위의 로더를 대체하기 위해서 애셋 모듈에는 4가지 새로운 모듈이 추가되었다.
        - asset/resource
            - 별도의 파일을 내보내고 URL을 추출한다. 다시 말해서 빌드 후 asset 파일을 출력 디렉토리로 내부내고, 해당 경로를 번들에 추가한다. v5 이전에는 file-loader를 사용해서 처리하였다.
            - 이미지명을 해시로 저장하여 이름이 같은 채로 캐싱된 것을 불러오는 오류를 방지할 수 있다. 해시로 캐시 무력화를 없애기 위함이다.
        - asset/inline
            - 애셋의 data URI를 내보낸다. v5 이전에는 url-loader를 사용하여 처리하였다.
            - Data URI Scheme 방식을 사용하여 리소스를 외부에서 가져오지 않고, 파일 자체를 문서에 임베드시킨다.
            - base64로 인코딩되어 원본 파일보다 용량이 커진다. 또한, 긴 문자열로 인해 소스 가독성이 떨어지며, 브라우저에 따라 문자열 길이 제한때문에 용량이 큰 이미지는 처리가 어렵다.
        - asset/source
            - 애셋의 소스코드를 내보낸다. v5 이전에는 raw-loader를 사용하여 처리하였다.
        - asset
            - data URI와 별도의 파일 내보내기 중 자동으로 선택한다. v5 이전에는 애셋 크기 제한(limit)가 있는 url-loader를 사용하였다.
            - v4의 url-loader에 limit 용량이 넘어가면 fallback 효과가 발동되어 file-loader로 넘어가는 것처럼, asset에 parser.dataUrlCondition.maxSize 옵션을 활용하여 fallback 효과를 줄 수 있다.
    - 버그 발견
        - webpack5 환경에서 CleanWebpackPlugin을 사용 + asset modules의 generator를 사용한다. 이 때, filename에 있는 static 폴더가 남아있는 상태에서 다시 빌드를 한다면 -4048 에러가 발생한다.
        - CleanWebpackPlugin을 사용하지 않고, webpack 5의 output.clean 옵션을 사용하면 해당 버그가 발생하지 않는다. CleanWebpackPlugin을 output.clean 옵션으로 대체하겠다.


# 참조
- webpack 프론트엔드 필수 개발환경 셋팅[https://www.youtube.com/watch?v=zal9HVgrMaQ]

- 웹팩(Webpack) 기본 사용법 (CLI)[https://www.daleseo.com/webpack-basics/]

- webpack bundle analyzer 웹팩 플러그인 설정 방법[https://pusha.tistory.com/entry/webpack-bundle-analyzer-%EC%9B%B9%ED%8C%A9-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95]

- 웹팩 Asset Modules[https://tecoble.techcourse.co.kr/post/2021-08-30-webpack-asset-modules/]

- 프론트엔드 개발 완경 공부 6 자주 사용되는 로더[https://velog.io/@jakeseo_me/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B3%B5%EB%B6%80-6-%EC%9E%90%EC%A3%BC-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-%EB%A1%9C%EB%8D%94]