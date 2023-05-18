var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// app.js
//----------------------------------------------------------------------------------------------------------------

// 假設價格資料存儲在一個陣列中
let prices = [];

// 當表單提交時的事件處理函數
document.getElementById('priceForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 防止頁面重新加載

  // 獲取表單值
  const date = document.getElementById('date').value;
  const productName = document.getElementById('productName').value;
  const price = document.getElementById('price').value;

  // 將價格數據添加到陣列中
  prices.push({ date, productName, price });

  // 清空表單值
  document.getElementById('date').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('price').value = '';

  // 更新表格或清單
  updateTable();
});

// 搜尋功能的事件處理函數
function search() {
  const searchTerm = document.getElementById('search').value;
  const filteredPrices = prices.filter(price => price.productName.toLowerCase().includes(searchTerm.toLowerCase()));

  updateTable(filteredPrices);
}

// 更新表格或清單的函數
function updateTable(data = prices) {
  const table = document.getElementById('priceTable');

  // 清空表格內容
  table.innerHTML = `
    <tr>
      <th>日期</th>
      <th>商品名稱</th>
      <th>商品價格</th>
    </tr>
  `;

  // 填充表格或清單
  data.forEach(price => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${price.date}</td>
      <td>${price.productName}</td>
      <td>${price.price}</td>
    `;
    table.appendChild(row);
  });
}
