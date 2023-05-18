$(document).ready(function() {
    // 在頁面加載時向後端請求所有記錄
    fetchRecords();

    // 監聽表單提交事件
    $("#recordForm").submit(function(event) {
        event.preventDefault();

        // 獲取表單數據
        const date = $("#date").val();
        const productName = $("#productName").val();
        const price = $("#price").val();

        // 清空輸入框
        $("#date").val("");
        $("#productName").val("");
        $("#price").val("");

        // 向後端發送新增記錄的請求
        addRecord(date, productName, price);
    });
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

// 向後端發送新增記錄的請求
function addRecord(date, productName, price) {
    $.ajax({
        url: "/records",
        type: "POST",
        data: {
            date: date,
            productName: productName,
            price: price
        },
        success: function(data) {
            displayRecord(data);
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

// 將新增的記錄顯示在前端
function displayRecord(record) {
    const row = $("<tr></tr>");
    const dateCell = $("<td></td>").text(record.date);
    const productNameCell = $("<td></td>").text(record.productName);
    const priceCell = $("<td></td>").text(record.price);

    row.append(dateCell, productNameCell, priceCell);
    $("#recordsBody").append(row);
}
$(document).ready(function() {
    // 在頁面加載時向後端請求所有記錄
    fetchRecords();

    // 監聽表單提交事件
    $("#recordForm").submit(function(event) {
        event.preventDefault();

        // 獲取表單數據
        const date = $("#date").val();
        const productName = $("#productName").val();
        const price = $("#price").val();

        // 清空輸入框
        $("#date").val("");
        $("#productName").val("");
        $("#price").val("");

        // 向後端發送新增記錄的請求
        addRecord(date, productName, price);
    });
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

// 向後端發送新增記錄的請求
function addRecord(date, productName, price) {
    $.ajax({
        url: "/records",
        type: "POST",
        data: {
            date: date,
            productName: productName,
            price: price
        },
        success: function(data) {
            saveRecordLocally(data); // 保存記錄到本地存儲
            window.location.href = "results.html"; // 重定向到results.html
        },
        error: function(error) {
            console.log("Error:", error);
        }
    });
}

// 將新增的記錄保存到本地存儲
function saveRecordLocally(record) {
    const records = localStorage.getItem("records");

    if (records) {
        const parsedRecords = JSON.parse(records);
        parsedRecords.push(record);
        localStorage.setItem("records", JSON.stringify(parsedRecords));
    } else {
        localStorage.setItem("records", JSON.stringify([record]));
    }
}
