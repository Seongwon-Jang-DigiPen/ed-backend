var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nunjucks = require("nunjucks");

var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
const { google } = require("googleapis");
const jsonData = require("./everitday.json");
const client_email = jsonData.client_email;
const private_key = jsonData.private_key;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);

app.get("path", function (req, res, next) {
  res.send("GoodBye");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
/*
async function bootstrap() {
  // json 파일을 가지고 인증할 때 다음과 같이 사용합니다.
  // scope는 spread sheet만 주었습니다.
  const authorize = new google.auth.JWT(client_email, null, private_key, [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ]);
  // google spread sheet api 가져오기
  const googleSheet = google.sheets({
    version: "v4",
    auth: authorize,
  });
  // 실제 스프레드시트 내용 가져오기
  const context1 = await googleSheet.spreadsheets.values.get({
    spreadsheetId: "17br-MrWcdKYABxBqwc6ExjZ21w25hE5rwgUG8IyA40U",
    range: "A1:ZZ",
  });
  console.log(context1.data.values);
}
bootstrap();
*/
//module.exports = app;
