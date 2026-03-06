# 03 Giao thức Sự kiện và Đồng hồ thời gian (Event Protocol & Clock)

## Các loại Sự kiện trong RunEventV2

- `run.start` (Bắt đầu đợt Run)
- `step.start` (Bắt đầu chặng Step)
- `step.chunk` (Mảnh vỡ stream từ Step)
- `step.complete` (Hoàn thành Step)
- `step.error` (Step vướng lỗi)
- `run.complete` (Hoàn thành trọn vẹn Run)
- `run.error` (Run vướng lỗi)
- `run.canceled` (Lệnh Run bị hủy)

## Cấu trúc Trường chuẩn hóa (Unified Fields)

- `runId` (Mã định danh của dải Run)
- `projectId` (Mã Dự án)
- `userId` (Mã Người dùng)
- `seq` (Chỉ số thứ tự đếm duy nhất, chỉ hiển thị đối với những run event đã chốt lưu trữ bền vững persistent xuống DB)
- `eventType` (Loại sự kiện)
- `stepKey` (Mã Key của Step - dành riêng cho hệ step event)
- `attempt` (Lượt thử - dành riêng cho hệ step event)
- `lane` (Phân luồng đối với mảng chunk event: Gồm `text|reasoning`)
- `payload` (Gói hàng vận chuyển dữ liệu chính)
- `createdAt` (Mốc thời gian khởi tạo)

## Bộ Quy tắc móc nối (Mapping) chuyển dịch từ task -> run (Cơ chế đang vận hành)

Nguồn chiếu: `src/lib/run-runtime/task-bridge.ts`

1. `task.lifecycle + task.created` -> chiếu sang -> `run.start`
2. `task.lifecycle + task.processing` -> chiếu sang -> `step.start`
3. `task.stream` -> chiếu sang -> `step.chunk`
4. `task.lifecycle + task.processing + done/stage=complete` -> chiếu sang -> `step.complete`
5. `task.lifecycle + task.processing + stage=error hoặc payload.error` -> chiếu sang -> `step.error`
6. `task.lifecycle + task.completed` -> chiếu sang chốt hạ -> `step.complete` + `run.complete`
7. `task.lifecycle + task.failed` -> chiếu sang báo tử -> `step.error` + `run.error`

Luật bổ sung kẹp kèm:

- Nếu lỡ nhịp stream bị rỗng thiếu mất `stepId`, thì hệ thống tự fallback vá mù thành `step:${taskType}`.
- Có thể tách bóc chiết xuất thông số `runId` đè móc từ thẳng trong `payload` hoặc từ hộc `payload.meta`.

## Bức tường phòng thủ Trật tự Giao trễ (Order Guarantee)

- Mặt trận phía sau (Backend): Kẹp nêm liên danh `(runId, seq)` trở lên Độc Nhất, và dùng chính gọng kéo seq làm thang chỉ mục truy vấn (query by seq).
- Mặt trận tiền phương (Frontend): Mọi sự kiện tiếp thụ chạy ứng dụng Bắt Buộc phải tiến bước tịnh tiến bám sát mũi dao seq; Nếu như có đụng độ lặp nhại một vạch seq nào, ngay lập tức đá hất văng (skip).

## Nghệ Thuật Ứng Phó hụt mạng nhảy số (Gap/Skip Sequence Resolution - Mục Tiêu Sắp Tới)

Khi tay lưới kéo nhằm một lưới sự kiện lạ lùng báo lỗi nhịp hụt: `seq > lastSeq + 1`:

1. Không rề rà, nổ súng đánh úp một phát bắn tức thì bằng đường gọi `GET /api/runs/:id/events?afterSeq=lastSeq`
2. Ưu tiên vá dập bịt lỗ hổng móc đủ mảnh đã mất mác rồi mới tính đường lướt chạy ráp chuỗi sự kiện realtime đang trào ra tiếp.

Tình hình thực tiễn:

- Hiện tại trận địa phía trước (Frontend) đã mấp mé nhập sòng luồng cơ chế kéo dồi kéo dập gia tăng tích hợp sự kiện từ run rồi;
- Chiêu thức "Xoi xét rà soát chủ động (Explicit gap detection) + tự kéo căng bù sụp (Auto complement/pull)" thì vẫn còn dang dở ngâm háng xó góc (Hỏi thêm trong tập `08-open-gaps.md`).
