## Ritsu-matchの概要
 Ritsu-matchは立命館大学のアプリ開発サークルである「歩くアルパカ+R」が現在開発をしている大学内限定のマッチングアプリです。
このプロジェクトのメンバーは現在合計で6人で、その内、エンジニアは3人でデザインは3人です。
## 今後実装予定の機能と使用しているフレームワークや技術
機能としては、立命館生のみ（今後は他大学にも対応させていく方針）が利用できるマッチングアプリで、友達マッチング機能、恋人マッチング機能、チャット機能、空きコママッチング機能、自動合コンセッティング機能等の実装を現在検討しています。
使用しているフレームワークはreactnativeとfirebaseとdjangoです。チャット機能は納期や工数を考慮して、ひとまずはFireStoreで作成をしています。自動合コン機能と空きコママッチングはwebRTCを用いたP2P通信によって実装する予定です。ただ、知識が何もないため、現在1から勉強しながら実装をします。
## 今後の展望や予定
今後大学内で市場規模の調査等を行って、アプリ内課金の価格帯やアプリ全体の方針を慎重に決めていこうと考えています。
また、現在作っているこのサービスは、「インターネット異性紹介事業を利用して児童を誘引する行為の規制等に関する法律」（通称：出会い系サイト規制法) に抵触してしまうため、現在警察署に申請手続きを行っているところです。
一応目標としては、今年の夏休み前までにリリースをし、ユーザーをある程度獲得して、夏休み中暇な立命館生をターゲットに規模を拡大していきたいと考えています。



## 開発メモ

### ナビゲータの階層構造

StackNavigator(App.js)

|

└── Home (Screen)

     └── TabNavigator
     
          ├── HomeView (Tab Screen)
          
          ├── Friends (Tab Screen)
          
          ├── Talk (Tab Screen)
          
          └── MyPage (Tab Screen)

### firebaseログイン実装についての機能概要
アカウント作成後の初回ログイン時にusersコレクション内にドキュメントが作成されるように機能実装中


