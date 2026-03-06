# Nhật ký Cập nhật / Changelog

Tất cả các thay đổi đáng chú ý của dự án sẽ được ghi lại trong tệp này.

---

## [v0.2] - 28/02/2026

### ✨ Tính năng Mới
- Bổ sung hỗ trợ định dạng hình ảnh và video tương thích với OpenAI.

### 🐛 Sửa lỗi
- Khắc phục sự cố dự án yêu cầu phải chọn lại mô hình (model) sau khi đã thiết lập mô hình mặc định.
- Khắc phục sự cố trong một số trường hợp không đọc được thông số độ phân giải (resolution).
- Hoàn thiện và sửa lỗi kết nối luồng mô hình cho kiến trúc LangGraph.
- Sửa lỗi trong đó phần tham số cấu hình mặc định không phản hồi hiển thị tùy chọn.
- Xử lý triệt để vấn đề hệ thống vẫn tiếp tục tính tiền sau khi người dùng đã tắt chức năng tính phí (billing-off).
- Khắc phục vấn đề đánh giá sai lệch, nhận nhầm mô hình tương thích API OpenAI (`openai-compatible`) thành luồng suy luận gốc của OpenAI.
- Sửa lỗi hệ thống bị sập bộ phân tích khi xử lý định dạng chuỗi JSON.

### ⚙️ Tối ưu hóa
- Điều chỉnh thay đổi cấu hình tính phí mặc định hệ thống sang chế độ tắt (off).
- Tăng cường khả năng hạn chế định dạng JSON nghiêm ngặt trong các câu lệnh nhắc (prompt).

---

## [v0.2.1] - 28/02/2026

### 🐛 Sửa lỗi
- Khắc phục tình trạng nội dung do AI tạo ra không sử dụng cùng ngôn ngữ ứng với thiết lập chung của trang web.
- Sửa lỗi yêu cầu API từ giao diện người dùng (frontend) gửi thiếu tham số tiêu đề `Accept-Language`, dẫn đến việc bị đẩy cấu hình vùng (`locale`) rơi về ngôn ngữ mặc định của trình duyệt. 

---

## [v0.1] - 27/02/2026

### 🎉 Phiên Bản Phát Hành Đầu Tiên (First Release)
- Phiên bản mở mã nguồn ban đầu của dự án.
