# Tài liệu Hợp nhất Môi trường Thực thi AI (AI Runtime Unification)

Thư mục này là tập hợp các tài liệu chính thức cho dự án "Tái cấu trúc và Hợp nhất Môi trường Thực thi AI", với mục đích giúp bất kỳ kỹ sư nào mới vào hoặc một mô hình ngôn ngữ (AI model) lạ lẫm có thể lập tức tiếp quản quy trình và thi hành nhiệm vụ ngay cả khi thiếu vắng hoàn toàn những dữ kiện ngữ cảnh của cuộc trò chuyện (without context).

## Danh mục Tài liệu

1. [01-Tổng quan Kiến trúc (01-architecture.md)](./01-architecture.md)
2. [02-Mô hình Dữ liệu (02-data-model.md)](./02-data-model.md)
3. [03-Giao thức Sự kiện và Đồng hồ (03-event-protocol.md)](./03-event-protocol.md)
4. [04-Hợp đồng Giao thức API (04-api-contract.md)](./04-api-contract.md)
5. [05-Cẩm nang Chuyển đổi (05-migration-playbook.md)](./05-migration-playbook.md)
6. [06-Vận hành và Khắc phục sự cố (06-operations-runbook.md)](./06-operations-runbook.md)
7. [07-Kiểm thử và Nghiệm thu (07-testing-acceptance.md)](./07-testing-acceptance.md)
8. [08-Thiếu hụt Tồn đọng & Hành động Tiếp theo (08-open-gaps.md)](./08-open-gaps.md)

## Duy nhất Một Điểm Sự Thật (Single Source of Truth)

- Bảng tổng quan trạng thái thực thi: `docs/AI_RUNTIME_UNIFICATION_EXECUTION_MASTER_PLAN.md`
- Định nghĩa kiểu Runtime: `src/lib/run-runtime/types.ts`
- Dịch vụ Runtime: `src/lib/run-runtime/service.ts`
- Phát hành sự kiện: `src/lib/run-runtime/publisher.ts`
- Cầu nối nhiệm vụ: `src/lib/run-runtime/task-bridge.ts`

## Các Ràng buộc Cứng (Bắt buộc phải tuân theo)

- KHÔNG xây dựng tầng tương thích (no compatibility layer).
- KHÔNG sử dụng cơ chế dự phòng lùi tự động ngầm (no implicit fallback).
- Môi trường Trạng thái (State) CHỈ BẢO LƯU bản đồ các điểm tham chiếu (references), KHÔNG chứa một mớ hỗn độn các đoạn chữ khối lượng lớn.
- Tất thảy vòng lặp sự kiện BẤT DI BẤT DỊCH buộc phải rà soát để luân chuyển tăng dần dựa trên trục đếm tự tịnh tiến `seq` bằng một ngả đẩy hướng một chiều (monotonically increasing) xuyên suốt thời kỳ thanh toán và xử lý dứt điểm rập khuôn một nhịp luân hồi. 
