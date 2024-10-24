// server.js
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Khởi tạo express app
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Sử dụng body-parser để xử lý JSON

// Kết nối tới MongoDB Atlas
mongoose
    .connect(
        "mongodb+srv://kduy12354:M25i16n8h@one.i3fjw.mongodb.net/ketoan?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Định nghĩa schema và model cho collection `dataReceivedNetSalary`
const infoSchema = new mongoose.Schema({
    tnct: Object,      // Thu nhập chịu thuế
    tncn: Object,      // Thuế thu nhập cá nhân
    loan: Object,      // Khoản vay
    expense: Object,   // Chi phí
    insurance: Object  // Số tiền đóng bảo hiểm
});

// Chỉ định tên collection là `dataReceivedNetSalary`
const DataReceivedNetSalary = mongoose.model("dataReceivedNetSalary", infoSchema, "dataReceivedNetSalary");

// API để lưu dữ liệu vào collection `dataReceivedNetSalary`
app.post("/api/data", async (req, res) => {
    console.log("Received data:", req.body); // In ra dữ liệu nhận được
    try {
        // Tạo một document mới từ dữ liệu nhận được
        const dataReceivedNetSalary = new DataReceivedNetSalary(req.body);
        
        // Lưu document vào collection `dataReceivedNetSalary`
        await dataReceivedNetSalary.save();
        
        // Gửi phản hồi thành công với document đã lưu
        res.status(201).json(dataReceivedNetSalary);
    } catch (error) {
        console.error("Error saving data:", error); // In ra lỗi nếu có
        res.status(400).json({
            message: "Error saving data",
            error: error.message,
        }); 
    }
});

// Khởi chạy server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
