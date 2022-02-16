# trade-on-frontend <!-- omit in toc --> 

<p>
 <a href="https://slime-bromine-8a9.notion.site/User-Story-8de5d7e63dab4d5cbf65160cdf53d17d" target="_blank">
    <img alt="User Story" src="https://img.shields.io/badge/User%20Story-Yes-yellow" />
  </a>
  <a href="https://hackmd.io/@ST0HtQp5T0Cw_bEqVtdStA/B1vji3gk5" target="_blank">
    <img alt="API Documentation" src="https://img.shields.io/badge/API%20Documentation-Yes-yellow" />
  </a>
  <a href="https://drive.google.com/file/d/13En38xIpT3296hwi91ZlR5_z3woPgkLt/view" target="_blank">
    <img alt="Database structure" src="https://img.shields.io/badge/Database%20structure-Yes-yellow" />
  </a>
</p>

這是一個使用 React 建立的前端專案，希望整合贈物社團上不一致的資訊規格與繁瑣的贈送流程，打造一個方便管理的贈物平台。

![](https://i.imgur.com/PaPN7SY.png)

## Menu - 目錄 <!-- omit in toc --> 

- [Demo - 專案展示](#demo---專案展示)
- [Initial - 專案緣起](#initial---專案緣起)
- [Features - 專案功能](#features---專案功能)
- [Technical Skills - 專案使用的技術](#technical-skills---專案使用的技術)
- [Content - 專案內容](#content---專案內容)
- [Execution - 專案執行](#execution---專案執行)
- [Links - 專案相關連結](#links---專案相關連結)
- [Contributor and Responsibility - 開發人員與職責分工](#contributor-and-responsibility---開發人員與職責分工)

## Demo - 專案展示

[Trade On 贈物網站](https://tradeon.netlify.app/#/)：前台沒有權限限制，後台僅限管理員進入

```
管理員
帳號：admin123@mail.com
密碼：admin123
```

## Initial - 專案緣起

這個專案源於[程式導師實驗計畫第五期](https://bootcamp.lidemy.com/)的期末專題，以 [Jane](https://github.com/Jane0901) 發想的贈物平台做為主題。

在斷捨離物品時，雖然有 FB 社團提供大家贈物，不過發文與留言格式混亂，而且一次贈送 / 索取多個物品，自己還要另外紀錄每個物品的交易情況。

為了解決上述問題，我們建立了 Trade On 贈物平台。Trade On 有格式統一的物品資訊，以及清楚的贈物流程，可以方便管理每一筆贈物 / 索物交易。另外，我們還有提供交易的一對一留言功能，增進會員的贈物 / 索物使用者體驗。

**專案核心價值**
- 對於贈物者：減少贈物的時間成本，能夠輕鬆上架物品，並且方便管理物品資訊
- 對於索物者：快速瀏覽格式一致的物品資訊，方便找到自己需要的物品
- 對於雙方：直接留言互動讓溝通更方便，以及藉由清楚的贈物 / 索物紀錄，更好掌握交易進度

## Features - 專案功能

- 前台
  1. 贈物物品展示
  2. 新增、編輯贈物物品
  3. 成立交易，包含索取者留言、贈物者決定受贈者
  4. 查看交易紀錄，可透過交易類別（贈物、索物）與交易進程（待填資料、待付運費、交貨中、已完成、已取消）做篩選
  5. 管理單筆交易，可推進交易進程、與交易者聯繫
  6. 查看個人資料，瞭解他人的贈與、索取紀錄
  7. 編輯個人資料，包含更改密碼、編輯大頭照、設定個人交易偏好
  8. 查看常見問題，瞭解贈物網站的交易流程
  9. 會員登入與註冊

- 後台
  1. 會員權限管理，包含更改身份（一般會員、管理員）、更改發文與留言權限
  3. 贈物文管理，可上架或下架贈物文
  4. 物品分類管理 (CRUD)
  5. 常見問題管理 (CRUD)

## Technical Skills - 專案使用的技術

套件                                                                          | 敘述
---------------------------------------------------------------------------- | ---------------------------------------------
[React Hooks](https://reactjs.org/)                                          | 具有彈性的 JavaScript 函式庫，用以建立使用者介面
[React Router](https://reactrouter.com/)                                     | 使用 HashRouter 建立路由
[styled-components](https://styled-components.com/docs/basics)               | JSX 語法撰寫 CSS 樣式
[Formik](https://formik.org/)                                                | 表單函式庫，幫助管理表單狀態
[Yup](https://github.com/jquense/yup)                                        | 設置表單驗證規則
[React Slick](https://react-slick.neostack.com/)                             | 圖片輪播功能
[slick](https://github.com/kenwheeler/slick)                                 | 圖片輪播功能
[react-responsive-carousel](https://github.com/leandrowd/react-responsive-carousel)                                 | 圖片輪播功能
[react-images-uploading](https://github.com/vutoan266/react-images-uploading)| 圖片上傳功能
[react-image-crop](https://github.com/DominicTobias/react-image-crop)        | 圖片裁切功能
[jwt-decode](https://www.npmjs.com/package/jwt-decode)                       | 解碼 Base64Url 編碼的 JWT token
[axios](https://axios-http.com/docs/intro)                                   | HTTP 請求工具，可以用在瀏覽器和 node.js 中
[sweetalert2](https://sweetalert2.github.io/)                                | 替代 JavaScript 原生的彈跳視窗

其他                                                                                             | 敘述
------------------------------------------------------------------------------------------------ | --------------------------
[prettier](https://prettier.io/)                                                                 | 統一程式碼格式
[ESLint](https://eslint.org/docs/user-guide/configuring/)                                        | 統一程式撰寫風格
[Netlify](https://docs.netlify.com/?_ga=2.190209259.1714598831.1634974332-1934839556.1633767074) | 前端部屬工具
[Figma](https://www.figma.com/)                                                                  | 設計稿繪製
[miro](https://miro.com/)                                                                        | User Flow 與 Wireframe 繪製

## Content - 專案內容

平台使用者分為一般會員和管理員，一般會員可在前台網站「贈物」、「索物」、「查看交易紀錄」、「與交易者聯繫」、「編輯個人資料」，而管理員則可以在後台針對「會員」、「贈物文」、「物品分類」以及「常見問題」做管理。

**前台**

- 登入
![](https://i.imgur.com/MoBRq0j.gif)

- 新增贈物文
![](https://i.imgur.com/3KlamYz.gif)

- 索取者留言索物
![](https://i.imgur.com/CuHdAOC.gif)

- 贈物者決定受贈者，同時成立交易紀錄
![](https://i.imgur.com/ITpj4gk.gif)

- 交易過程

  - 索物者視角，主要推進交易進程
![](https://i.imgur.com/L17xOcN.gif)

  - 贈物者視角，等待索物者推進交易進程
![](https://i.imgur.com/AVdgu3H.gif)

- 編輯、查看個人資料
![](https://i.imgur.com/s52ZW0m.gif)

**後台**

- 管理會員權限、上架與下架贈物文
![](https://i.imgur.com/ckeTMJV.gif)

- 新增、編輯、刪除物品分類
![](https://i.imgur.com/YfoFCOW.gif)


## Execution - 專案執行

`npm install` 安裝專案所需套件

`npm start` 啟動專案

## Links - 專案相關連結

- [Trado On 後端專案](https://github.com/JennieChu713/trade-on_backend)
- [API 文件](https://hackmd.io/@ST0HtQp5T0Cw_bEqVtdStA/B1vji3gk5)
- [資料庫關聯圖](https://drive.google.com/file/d/13En38xIpT3296hwi91ZlR5_z3woPgkLt/view)

## Contributor and Responsibility - 開發人員與職責分工

[Jane Chen](https://github.com/Jane0901)
1. 負責團隊資源協調與協作機制建立，實踐各階段的產品開發目標
2. 負責前台功能開發，包含新增或編輯贈物文頁、個人資料頁、交易紀錄頁、交易詳情頁、登入頁、註冊頁
3. 協同前台功能開發，包含編輯個人資料頁、常見問題頁
4. 協同後台管理常見問題頁的功能開發
5. 協同團隊建立 router
6. 協同團隊進行 Netlify 部署
7. 協同團隊確立專案規格（User Story、設計稿）

[Genie](https://github.com/4genie)
1. 負責前台功能開發，包含禮物貼文頁、常見問題頁
2. 負責後台功能開發，包含會員管理頁、贈物文管理頁、分類管理頁、常見問題管理頁
3. 協同團隊建立 router
4. 協同團隊確立專案規格（User Flow、Wireframe、設計稿）

[Wei](https://github.com/jweiliao)
1. 負責前台編輯個人資料頁的功能開發
2. 協同前台功能開發，包含物品圖片上傳、表單驗證
3. 協同團隊建立 router
4. 協同團隊進行 Netlify 部署
5. 協同團隊確立專案規格（User Flow、Wireframe、設計稿）

[Jennie Chu](https://jenniechu713.github.io/resume/)
1. 負責後端的開發，包含
- 登入、註冊，編輯使用者資料，包含密碼修改、頭像上傳等
- 贈送文章的刊登、編輯與刪除
- 新增、編輯或刪除刊登文上的留言和回覆，以及交易進程中 1:1 的留言與回覆
- 建立或取消交易（會依照流程階段進行限制取消的機制）
- 後台管理員身份驗證 endpoint、發文和留言權限操作等功能
2. 負責建立資料庫架構與設定種子資料
3. 進行 AWS EC2 部署，並設定 nginx 和 pm2
4. 協同團隊確立專案規格（User Flow、Wireframe、設計稿）
