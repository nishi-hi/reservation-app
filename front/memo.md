## Angularアプリケーションの作成

```
root@3cd2237108b2:/workspaces/reservation-app# ng new reservation-app
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

## Webサーバの起動
```
root@da07f1e18120:/workspaces/front/reservation-app# ng serve 
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.35 MB | 
polyfills.js          | polyfills     | 333.18 kB | 
styles.css, styles.js | styles        | 230.92 kB | 
main.js               | main          |  48.34 kB | 
runtime.js            | runtime       |   6.52 kB | 

                      | Initial Total |   2.95 MB

Build at: 2023-10-22T11:59:45.348Z - Hash: 6394cbc5dbb318da - Time: 11615ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
```

## Bootstrap
### インストール
```
root@da07f1e18120:/workspaces/front# cd reservation-app

root@da07f1e18120:/workspaces/front/reservation-app# npm i bootstrap --save

added 2 packages, and audited 973 packages in 12s

118 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### 読み込み

### angular.json
33、96行目を追加する。
```
32             "styles": [
33               "node_modules/bootstrap/dist/css/bootstrap.min.css",
34               "src/styles.scss"
35             ],
[中略]
95             "styles": [
96               "node_modules/bootstrap/dist/css/bootstrap.min.css",
97               "src/styles.scss"
98             ],
```

## ナビゲーションバーのコンポーネント作成

`common/navbar/`以下に`navbar.component.html`、`navbar.component.scss`、`navbar.component.ts`を作成する

`app.module.ts`でナビゲーションバーのコンポーネントを読み込む
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
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

`app.component.html`上部にあるstyleタグを削除して`<app-navbar></app-navbar>`に差し替える

試しに`navbar.component.html`にBootstrapの公式ドキュメントのコードをペーストする
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

## 商品リストのコンポーネント作成
```
root@479004939b05:/workspaces/front/reservation-app# ng generate component product-list
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

product-list.component.htmlにBootstrapの公式ドキュメントのサンプルをペーストする。
```
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

assetsフォルダに画像格納用のimgフォルダを作成する。

imgフォルダに画像をダウンロードして設置する。

画像のパス`./assets/img/placeholder.svg`をimgタグのsrcにセットする。

レスポンシブなレイアウトにする。

