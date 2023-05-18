const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// 設置body-parser中間件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 假設記錄存儲在一個數組中
let records = [];

// 處理GET請求，返回所有記錄
app.get("/records", (req, res) => {
  res.json(records);
});

// 處理POST請求，新增記錄
app.post("/records", (req, res) => {
  const { date, productName, price } = req.body;

  // 做一些驗證和處理

  const record = {
    date: date,
    productName: productName,
    price: price
  };

  records.push(record);
  res.json(record);
});

// 啟動服務器

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
$(document).ready(function() {
  // 在頁面加載時向後端請求所有記錄
  fetchRecords();
});

// 向後端請求所有記錄
function fetchRecords() {
  $.ajax({
    url: "/records",
    type: "GET",
    success: function(data) {
      displayRecords(data);
    },
    error: function(error) {
      console.log("Error:", error);
    }
  });
}

// 將記錄顯示在前端
function displayRecords(records) {
  const recordsBody = $("#recordsBody");
  recordsBody.empty();

  records.forEach(function(record) {
    const row = $("<tr></tr>");
    const dateCell = $("<td></td>").text(record.date);
    const productNameCell = $("<td></td>").text(record.productName);
    const priceCell = $("<td></td>").text(record.price);

    row.append(dateCell, productNameCell, priceCell);
    recordsBody.append(row);
  });
}
