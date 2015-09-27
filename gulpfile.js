var fs = require('fs');
// gulp本体
var gulp = require('gulp');
// エラーハンドリング
var plumber = require('gulp-plumber');
// ファイル名変更
var rename = require('gulp-rename');
// EJS本体
var ejs = require("gulp-ejs");

var connect = require('gulp-connect');

var styledocco = require('gulp-styledocco');
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
//var jade = require('gulp-jade');
var watch = require('gulp-watch');
// タスク定義
gulp.task('wa', function (callback) {
    // index.ejsとindex.jsonの両方を監視
    gulp.watch(['./app/*.ejs', './app/*.json',], function (e) {
        // 削除以外 == 追加 or 変更
        if (e.type != "deleted") {
            // 最新のJSONファイルを同期読み込みしてオブジェクトを生成
            var json = JSON.parse(fs.readFileSync("./app/index.json"));

            gulp.src(["./app/*.ejs",'!' + "./app/_*.ejs"])
                .pipe(plumber())
                // オブジェクトを渡してデータの当て込み
                .pipe(ejs(json))
                // index.htmlに名前を変更

                .pipe(gulp.dest("./app/htdocs"))
        }
    });
});





gulp.task('styledocco', function () {
  gulp.src('./src/**/*.css')
    .pipe(styledocco({
      out: 'docs',
      name: 'My Project',
      'no-minify': true
    }));
});
gulp.task('jade', function () {
  gulp.src('./*.jade')
    .pipe(watch('./*.jade'))  // ここを追加しただけ！
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./static/'))
});



gulp.task('connect', function() {
  connect.server({
    root: __dirname + '/red',//ルートディレクトリ
    livereload: true //ライブリロード
  });
});

//'html'に、htmlファイルをリロードする処理を登録
gulp.task('html', function () {
  gulp.src(__dirname + '/red/*.html')
    .pipe(connect.reload());
    fs.readFile(__dirname + '/red/index.html', 'utf8', function (err, text) {
      console.log('text file!');
      console.log(text);
      console.log('error!?');
      console.log(err);
  });
});

//監視：HTMLファイルが変更されたら'html'を実行
gulp.task('ww', function () {
  gulp.watch(['./red/*.html'], ['html']);

});

//デフォルトタスクに登録
gulp.task('default', ['connect', 'ww']);




/*
app.set("views",__dirname + "/view");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(app.router);
app.use(express.static(__dirname + "/public"));
app.get('/new', function(req, res) {
  //res.sendFile(__dirname + "/public/index.html");
  res.render("index");
});
app.post('/cre', function(req, res) {
res.send(req.body.na);
});
//app.use(morgan('dev'));
app.listen(3000);
console.log(__dirname);
console.log("start...");
*/
