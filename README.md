# **🚀 Khám phá thế hệ tiếp theo của quy trình sáng tạo Video/Phim AI | [Tham gia danh sách chờ thử nghiệm Web ngay](https://www.waoowaoo.com/)**
<p align="center">
  <img src="public/banner.png" alt="waoowaoo" width="600">
</p>

# waoowaoo AI Studio
>[!IMPORTANT]
>⚠️ **Lưu ý về phiên bản Beta**: Dự án này hiện đang ở giai đoạn thử nghiệm ban đầu. Vì tạm thời chỉ có một mình tôi phát triển, hệ thống có thể sẽ có một số lỗi (bug) và điểm chưa hoàn thiện. Chúng tôi đang liên tục cập nhật và sửa lỗi rất nhanh—**rất mong các bạn tham gia nhóm để phản hồi lỗi và đóng góp ý kiến, cũng như theo dõi các bản cập nhật mới nhất! Hiện tại tiến độ cập nhật sẽ diễn ra rất thường xuyên, trong tương lai sẽ bổ sung thêm rất nhiều tính năng mới và tối ưu hóa hiệu suất, với mục tiêu trở thành công cụ AI mạnh mẽ nhất trong ngành!**

<img src="https://github.com/user-attachments/assets/7af53594-88bd-4d96-95dd-581c55e57635" width="30%">

Một công cụ tạo video truyện ngắn / truyện tranh mạnh mẽ được hỗ trợ bởi AI, cho phép tự động phân tích kịch bản từ tiểu thuyết để tạo ra các phân cảnh, nhân vật, bối cảnh, và ghép chúng lại thành một video hoàn chỉnh.

---

## ✨ Các Tính năng Nổi bật

| Biểu tượng | Chức năng | Mô tả |
|:---:|---|---|
| 🎬 | **Phân tích Kịch bản bằng AI** | Tự động đọc hiểu tiểu thuyết, trích xuất thông tin nhân vật, bối cảnh và diễn biến cốt truyện |
| 🎨 | **Tạo Hình Nhân vật & Bối cảnh** | Sử dụng AI để tạo ra hình ảnh nhân vật và cảnh vật với tính đồng nhất cao |
| 📽️ | **Sản xuất Video Phân cảnh** | Tự động tạo các khung hình/phân cảnh (storyboard) và dựng thành video |
| 🎙️ | **Lồng tiếng AI** | Tổng hợp và giả lập giọng nói cho nhiều nhân vật khác nhau |
| 🌐 | **Hỗ trợ Đa ngôn ngữ** | Giao diện hỗ trợ song ngữ, tiện lợi chuyển đổi ở góc trên bên phải |

## 🚀 Hướng dẫn Bắt đầu Nhanh

**Yêu cầu bắt buộc**: Bạn cần cài đặt [Docker Desktop](https://docs.docker.com/get-docker/) trước.

```bash
git clone https://github.com/saturndec/waoowaoo.git
cd waoowaoo
docker compose up -d
```

Truy cập địa chỉ [http://localhost:13000](http://localhost:13000) để bắt đầu sử dụng!

> Ở lần khởi chạy đầu tiên, cơ sở dữ liệu sẽ được tự động khởi tạo, bạn không cần phải cấu hình thêm bất cứ thứ gì.

> ⚠️ **Nếu bạn thấy trang web tải chậm hoặc bị lag**: Chế độ HTTP thông thường có thể khiến trình duyệt giới hạn số lượng kết nối mạng đồng thời. Bạn có thể cài đặt [Caddy](https://caddyserver.com/docs/install) để bật HTTPS khắc phục tình trạng này:
> ```bash
> caddy run --config Caddyfile
> ```
> Sau đó truy cập vào địa chỉ [https://localhost:1443](https://localhost:1443)

### 🔄 Cách Cập nhật lên Phiên bản Mới nhất

```bash
git pull
docker compose down && docker compose up -d --build
```

---

## 🔧 Cấu hình API

Sau khi khởi chạy thành công, hãy vào mục **Cài đặt (Settings)** để thiết lập API Key cho các dịch vụ AI. Hệ thống đã có sẵn hướng dẫn chi tiết bên trong.

> 💡 **Khuyên dùng**: Hệ thống đã được thử nghiệm và hoạt động tốt với API của ByteDance Volcano Engine (Seedance, Seedream) và Google AI Studio (Banana). Các mô hình tập trung vào khởi tạo văn bản hiện tại yêu cầu sử dụng OpenRouter API.

---

## 📦 Công nghệ Sử dụng

- **Framework (Khung làm việc)**: Next.js 15 + React 19
- **Database (Cơ sở dữ liệu)**: MySQL + Prisma ORM
- **Queue (Hàng đợi)**: Redis + BullMQ
- **Styling (Giao diện)**: Tailwind CSS v4
- **Auth (Xác thực)**: NextAuth.js

## 📦 Hình ảnh Giao diện Thực tế
![4f7b913264f7f26438c12560340e958c67fa833a](https://github.com/user-attachments/assets/fa0e9c57-9ea0-4df3-893e-b76c4c9d304b)
![67509361cbe6809d2496a550de5733b9f99a9702](https://github.com/user-attachments/assets/f2fb6a64-5ba8-4896-a064-be0ded213e42)
![466e13c8fd1fc799d8f588c367ebfa24e1e99bf7](https://github.com/user-attachments/assets/09bbff39-e535-4c67-80a9-69421c3b05ee)
![c067c197c20b0f1de456357c49cdf0b0973c9b31](https://github.com/user-attachments/assets/688e3147-6e95-43b0-b9e7-dd9af40db8a0)


## 🤝 Đóng góp Phát triển

Dự án này được bảo trì độc lập bởi đội ngũ phát triển nòng cốt (core team). Chúng tôi rất hoan nghênh sự đóng góp của bạn thông qua các cách sau:

- 🐛 Mở [Tính năng Báo Lỗi (Issue)](https://github.com/waoowaooAI/waoowaoo/issues) để báo cáo bug
- 💡 Gửi [Đề xuất (Issue)](https://github.com/waoowaooAI/waoowaoo/issues) để gọi ý tính năng mới
- 🔧 Gửi Pull Request (PR) để đội ngũ tham khảo — chúng tôi sẽ xem xét cẩn thận từng ý tưởng trong PR, nhưng để đảm bảo tính đồng nhất, đội ngũ cốt lõi sẽ tự triển khai các thay đổi thay vì ghép trực tiếp mã nguồn (merge PR) từ bên ngoài.

---

**Được tạo ra với ❤️ từ đội ngũ waoowaoo**

## Lịch sử Lượt Thích (Star)
[![Lịch sử Thống kê Star](https://api.star-history.com/svg?repos=waoowaooAI/waoowaoo&type=date&legend=top-left)](https://www.star-history.com/#waoowaooAI/waoowaoo&type=date&legend=top-left)
