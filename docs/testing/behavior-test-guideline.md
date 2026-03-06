# Hướng dẫn Kiểm thử Hành vi (Behavior Test Guideline)

## Mục tiêu Trọng tâm (Goal)
- Xem mỗi bài kiểm thử như một hợp đồng ràng buộc của sản phẩm, gói gọn qua 3 chặng: Đầu vào (Input) -> Thực thi (Execution) -> Kết quả (Result).
- Chặn đứng mọi sự thoái lui sụt trượt (regressions) bằng cách bám sát khâu rà soát kết quả thật sự (ví dụ: truy xét cục payload, trường dữ liệu cắm vào DB, chốt hợp đồng được trả về, hay nắm bắt sự kiện chu kỳ vòng đời lifecycle events).

## Quy Chế Bắt Buộc (Mandatory Rules)
- Tuyệt đối Không sử dụng `toHaveBeenCalled()` làm xác nhận kiểm chiếu độc tôn duy nhất.
- Tại mỗi bài `test`, yêu cầu bắt buộc là phải đưa vô kiểm chứng ít nhất một giá trị phản ánh góc mặt nghiệp vụ kinh doanh rõ rệt (concrete business value).
- Đối với mọi khối `worker handler`, kịch bản bắt ngang phải được bao trọn 3 cửa ải:
  - Cửa ngõ thất bại (failure path)
  - Cửa ngõ hanh thông (success path)
  - Kịch bản nhánh chẽ lõi yếu (key branch path)
- Một lệnh triệt Bug, sinh ra nắp kẹp Regression test kèm theo là chân lý đính kèm.

## Quy Luật Nắn Khối Giả Lập (Mock Rules)
- Các mảng BẮT BUỘC rào mock: Căn cứ cấu trúc cơ sở dữ liệu, nhà cung cấp tích hợp AI, ngăn chứa lưu trữ dữ liệu, trạm HTTP phát ngoại vi.
- Đối tượng TỪ CHỐI rào mock: Không làm xiếc đánh lừa các chức năng ngay tại vùng đệm ta đang xắn tay thử nghiệm, và cũng đừng đi chọc tay vào giá trị hằng số tự nội (business constants).
- Tránh đi vào vết xe đổ: Mock giả nhưng phỉnh theo ý mình (VD: "Thiết đặt cho nó nhè ra chữ X", sau đó hớn hở viết kiểm tra xem "Nó nhè ra X phải không" - Tự biên tự diễn). 

## Lưới Kéo Bắt Buộc Tại Các Tầng (Required Layers)
- `tests/unit/helpers`: Dùng mổ phẫu payload sinh lời khuyên phán trợ.
- `tests/integration/api/contract`: Dành cho tầng quy ước hợp đồng của route và xác thực mã chứng minh thẩm quyền.
- `tests/unit/worker`: Trạm quan trắc luồng nhánh rẻ nhánh + đính kèm định vị rà soát chốt giữ lại kho bãi dữ liệu (persistence assertions).
- `tests/integration/chain`: Điểm trung chuyển của khối tải dữ liệu hàng chờ (queue payload handoff) đan chéo với cách thức ngốn nuốt thông tin thực thi từ worker.
- `tests/unit/optimistic`: Trực nhật bắt giữ và theo dõi nhịp kết màn hiển lộ giao diện front-end (SSE báo về + ui target-state quyện đồng nhất).

## Tổ hợp Lệnh Chạy Biên Dịch (Execution Commands)
- `npm run test:behavior:unit`
- `npm run test:behavior:api`
- `npm run test:behavior:chain`
- `npm run test:behavior:guards`
- `npm run test:behavior:full`

## Trạm Kiểm Duyệt Chui Nhánh Tích Hợp (Merge Gate)
- Rào chắn phòng vệ của Behavior guards PHẢI nhả còi "Pass (Thông quá)".
- Phát minh loại route/task type mới, buộc phải xướng tên điểm cắm tại bảng ma trận & chỉ dẫn liên hoàn (catalogs/matrices).
- Phi vụ tháo vá Regression mà ngó mặt lại chưa dắt túi bài kiểm thử hành vi nào, bị hất cẳng với lý lịch CHƯA HOÀN TẤT. 
