# 07 Tiêu chuẩn Kiểm thử và Nghiệm thu (Testing & Acceptance)

## Mục tiêu Nghiệm thu (Acceptance Goals)

1. Trạng thái Trùng sóng (State Consistency): Tuyệt đối không xuất hiện lỗi hiển thị "run đã gõ chiêng báo hoàn thành mà step hiện chạy vẫn hụt kim xoay vòng vòng báo `running`".
2. Trình tự Thẳng lối (Sequence Consistency): Quá trình thụ thụ đẩy tiến thẳng bằng trục nhịp `seq` tự tăng, mấy sự kiện xào đi xào lại trùng khớp rập khuôn phải bị sút văng không được làm đảo lùi thụt hạng vòng xoay. 
3. Kế sinh Phục hồi Toàn vẹn (Recovery Consistency): Nhấn lại nút F5 phải bung lụa mở lột tung lại nguyên măm chập hình snapshot của luồng run cùng đống bù dầy gom lặt (incremental) còn lại cho trọn.
4. Lỗi lầm phải được Điểm mặt gọi Tên (Explainable Failures): Bảng cáo trạng `run.error` / `step.error` bắt buộc phải xăm rạch ròi thẻ mã lỗi (error code) cùng thư báo điếng hồn cụ thể.

## Ma trận Kiểm thử Mức sàn (Minimum Testing Matrix)

Mỗi mạch rễ chủ lõi (Core workflow) ít nhất phải trùm kín chăn lên đầu lên gối 5 mặt trận:

1. Luồng Lướt sóng hanh thông (Success path)
2. Luồng Lì lợm bật Cứu sóng (Có cửa xoay đầu Retry lại rồi báo vinh quang)
3. Luồng Chạm gót mồ hôi Liệm Tử (Lỗi câm thắt cổ Không có cửa Retry)
4. Luồng Phạt ngang Cắt Còi (Luồn Cancel vỡ mũi giữa chừng)
5. Luồng Đạp nút Tái sinh (F5 Refresh mọc cành đâm nhánh mới)

## Thớt Kiểm thử mới vừa nhồi thêm trên sạp (Current Additions)

1. `tests/unit/run-runtime/task-bridge.test.ts`
2. `tests/unit/helpers/run-request-executor.run-events.test.ts`

## Trật tự Ra lệnh Gợi ý (Recommended Commands)

```bash
npx vitest run tests/unit/run-runtime/task-bridge.test.ts
npx vitest run tests/unit/helpers/run-request-executor.run-events.test.ts
npx vitest run tests/unit/helpers/run-stream-state-machine.test.ts
npm run build
npm run test:regression
```

## Khúc mắc Nỗi kẹt xe Đoạn đường Hiện Giờ (Known Blockers)

Lão gạc lính chì `test:regression` hiện còn rớt lại đằng sau trơ trọi một rổ báo động rụng bi thảm đến từ đám sành sứ di tích của nếp cũ (Không có dây mơ rễ má móc tới cõi ranh đồ tể tái định hình `run-runtime` đợt rày):

1. `tests/unit/optimistic/task-target-overlay.test.ts`
2. `tests/unit/billing/cost-error-branches.test.ts`

Mớ ngòng ngọc gò đống này đành quăng cho rảnh rồi ôm lại sửa riêng từng cụm, vá sạch tinh tươm hẵng múa gậy khuyêng tù văng cáo bái lên xanh mượt cả thảm (full regression pass green). 
