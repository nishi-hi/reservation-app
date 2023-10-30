## システム構成

クライアント - フロントエンド - バックエンド - データベース

| 構成要素 | 説明 |
| :- | :- |
| クライアント | ブラウザ |
| フロントエンド | Webサーバ。クライアントからリクエストを受け取ってレスポンスを返却。バックエンドからデータを取得。Angularで開発 |
| バックエンド | APIサーバ。フロントエンドからリクエストを受け取ってレスポンスを返却。データベースからデータを取得。Expressで開発 |
| データベース | DBサーバ。バックエンドからクエリを受け取って実行結果を返却。MongoDBで開発 |

## 開発の流れ

* Dockerfileを用意する
* Visual Studio Codeの拡張機能である[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)で起動したDockerコンテナ内で作業する

### 【フロントエンド】パッケージのインストールとプロジェクトの作成

Angularをインストールする

```
[/]# npm install -g @angular/cli
```

プロジェクトを作成する

```
[/]# mkdir reservation-app

[/reservation-app]# ng new reservation-app
? Would you like to enable autocompletion? This will set up your terminal so pressing TAB while typing Angular CLI 
commands will show possible options and autocomplete arguments. (Enabling autocompletion will modify configuration files
 in your home directory.) Yes
Appended `source <(ng completion script)` to `/root/.bashrc`. Restart your terminal or run the following to autocomplete `ng` commands:

    source <(ng completion script)
? Would you like to share pseudonymous usage data about this project with the Angular Team
at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more
details and how to change this setting, see https://angular.io/analytics. No
Global setting: disabled
Local setting: No local workspace configuration file.
Effective status: disabled
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss               
 ]
CREATE reservation-app/README.md (1066 bytes)
CREATE reservation-app/.editorconfig (274 bytes)
CREATE reservation-app/.gitignore (548 bytes)
CREATE reservation-app/angular.json (2909 bytes)
CREATE reservation-app/package.json (1044 bytes)
CREATE reservation-app/tsconfig.json (901 bytes)
CREATE reservation-app/tsconfig.app.json (263 bytes)
CREATE reservation-app/tsconfig.spec.json (273 bytes)
CREATE reservation-app/.vscode/extensions.json (130 bytes)
CREATE reservation-app/.vscode/launch.json (470 bytes)
CREATE reservation-app/.vscode/tasks.json (938 bytes)
CREATE reservation-app/src/main.ts (214 bytes)
CREATE reservation-app/src/favicon.ico (948 bytes)
CREATE reservation-app/src/index.html (298 bytes)
CREATE reservation-app/src/styles.scss (80 bytes)
CREATE reservation-app/src/app/app-routing.module.ts (245 bytes)
CREATE reservation-app/src/app/app.module.ts (393 bytes)
CREATE reservation-app/src/app/app.component.scss (0 bytes)
CREATE reservation-app/src/app/app.component.html (22709 bytes)
CREATE reservation-app/src/app/app.component.spec.ts (1012 bytes)
CREATE reservation-app/src/app/app.component.ts (218 bytes)
CREATE reservation-app/src/assets/.gitkeep (0 bytes)
✔ Packages installed successfully.
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint: 
hint:   git config --global init.defaultBranch <name>
hint: 
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint: 
hint:   git branch -m <name>
    Successfully initialized git.
```

Bootstrapをインストールする

```
[/reservation-app]# npm install bootstrap

added 2 packages, and audited 973 packages in 12s

118 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

angular.jsonにBootstrapを読み込む設定を追加する
```
32             "styles": [
33               "node_modules/bootstrap/dist/css/bootstrap.min.css", <- 追加
34               "src/styles.scss"
35             ],
[中略]
95             "styles": [
96               "node_modules/bootstrap/dist/css/bootstrap.min.css", <- 追加
97               "src/styles.scss"
98             ],
```

### 【フロントエンド】コンポーネントの作成

`src/app/common/navbar/`以下に`navbar.component.html`、`navbar.component.scss`、`navbar.component.ts`を作成する
- `ng generate component <コンポーネント名>`でも可能

`src/app.module.ts`でコンポーネントを読み込む
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component'; <- 追加

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent <- 追加
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`src/app.component.html`上部にあるstyleタグを`<app-navbar></app-navbar>`に差し替える

[Bootstrapの公式ドキュメント](https://getbootstrap.jp/docs/5.3/components/navbar/)をもとに`src/common/navbar/navbar.component.html`にコードを記述する
```
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <h1>Reservation</h1>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">ログイン</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">新規登録</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### 【フロントエンド】商品情報表示機能の実装

1. 商品一覧コンポーネントの作成
2. 商品詳細コンポーネントの作成
3. 商品モジュールの作成
4. 商品サービスの作成

### 【フロントエンド】商品一覧のコンポーネント作成(補足)

コンポーネントを作成する
```
[/reservation-app]# ng generate component product-list
CREATE src/app/product-list/product-list.component.scss (0 bytes)
CREATE src/app/product-list/product-list.component.html (27 bytes)
CREATE src/app/product-list/product-list.component.spec.ts (595 bytes)
CREATE src/app/product-list/product-list.component.ts (226 bytes)
UPDATE src/app/app.module.ts (586 bytes)
```

specファイルは使わないので削除する
```
root@479004939b05:/workspaces/front/reservation-app# rm src/app/product-list/product-list.component.spec.ts
```

app.component.htmlに`<app-product-list></app-product-list>`を追加する。

[Bootstrapの公式ドキュメント](https://getbootstrap.jp/docs/5.3/components/card/)をもとにproduct-list.component.htmlにコードを記述する
```
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

### 【フロントエンド】画像ファイルの設置

1. `assets`に画像格納用の`img`フォルダを作成する
2. `img`フォルダに画像ファイルを設置する
3. 画像ファイルのパス`./assets/img/placeholder.svg`を`img`タグの`src`属性にセットする

### 【バックエンド】パッケージのインストール

Expressをインストールする

```
[/]# mkdir reservation-app && cd reservation-app

[/reservation-app]# npm install express
```

MongoDBにアクセスするため、mongooseをインストールする

```
[/reservation-app]# npm install mongoose
```

### 【データベース】データベースサーバの起動、データベースの作成

[MongoDB Atlas](https://cloud.mongodb.com/)を利用する

### 【バックエンド】アプリケーションの作成

1. `index.js`
2. `routes/product.js`
3. `config/dev.js`
4. `model/product.js`
5. `sample-db.js`

## フロントエンドとバックエンドの結合

フロントエンドのDockerfileを作成する

バックエンドのDockerfileを作成する

Composeファイル(docker-compose.yml)を作成する

MongoDBへの接続情報ファイル(back\reservation-app\config\dev.js)を設置する

Dockerイメージをビルドする

```
> docker compose build
```

コンテナを起動する

```
> docker compose up -d
```

【バックエンド】APIサーバを起動する

```
reservation-app> docker exec -it reservation-app-back-1 /bin/bash

[/reservation-app-back]# node index.js
I am running
```

【フロントエンド】Webサーバを起動する

```
reservation-app> docker exec -it reservation-app-front-1 /bin/bash

[/reservation-app-front]# npm run start-dev

Warning: Running a server with --disable-host-check is a security risk. See https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a for more information.
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.35 MB | 
styles.css, styles.js | styles        | 453.79 kB | 
polyfills.js          | polyfills     | 333.18 kB | 
main.js               | main          |  34.07 kB | 
runtime.js            | runtime       |   6.53 kB | 

                      | Initial Total |   3.16 MB

Build at: 2023-10-30T02:23:59.549Z - Hash: aac25f598ceef10a - Time: 7389ms

** Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
✔ Browser application bundle generation complete.

5 unchanged chunks

Build at: 2023-10-30T02:23:59.827Z - Hash: aac25f598ceef10a - Time: 205ms

✔ Compiled successfully.
```
