# 05 Cẩm nang Thi hành Bước Di Dời (Migration Playbook)

## Diệu kế Cốt lõi Toàn cục (Strategy)

Tráo đổi mâm nhận diện ngữ nghĩa trong Một Phút Biến Hình Duy Nhất, Cấm tiệt dắt dây luồng chạy Song Mã chẻ nhành 2 hàng lâu dài.

## Những Cục Mốc Đã Lắp Ghép Thượng Đài 

1. Tập trận sa bàn với đội hình xưng đế của bảng `graph_*` và cụm mã run API đã xông pha ra sân.
2. Cây cầu vượt vượt biên dắt từ cửa task sang cửa run (`task->run bridge`) đã thông nòng lên sóng. 
3. Giấy khai sinh cho dấu in mộc cố chấp của thằng đi lết dò chặng Retry nấc step đã xăm vô chuẩn mực khuôn hình (Sử dụng ngàm xiên cứng khóa khóa key `stepKey` + `attempt`).
4. Khúc mặt tiền Frontend cũng đã biết điều cúi mình xưng thần bằng cách kéo rị nắm cổ áo tụi nhóc run events ưu tiên chạy trước.

## Các Mẻ Lưới Đi Tới Chưa Xong Việc

1. Dẫn độ tống nhập nguyên rổ Lớp gọi Đồng Nhất của hội `src/lib/ai-runtime/` vào đội pháo đài.
2. Dắt mối tống xuất vị tướng `GraphExecutor` vào tham chiến. 
3. Kéo luồng cuốc bộ con nài `story_to_script_run` di dời nhảy qua mâm gỗ `PipelineGraph`.
4. Kéo luồng cuốc bộ con nài `script_to_storyboard_run` di dời nhảy qua mâm gỗ `PipelineGraph`.
5. Đẩy nốt ruồng rẫy đống tàn binh Tác vụ AI phần chót vót đuôi (Móc ảnh/Xoạc video/Bóp voice) bấu vô khoác áo khung sườn runtime chót lót.
6. Cho cẩu đầu đao trảm sạch đường lui dắt nối làm nguồn tư liệu hiện hình chính tông của cái trạm vũng lầy lạch `task-stream` cũ.

## Mẫu Mực Bẻ Cột Dời Nhà Cho Mỗi Banh Loại Tác vụ (Task Type Migration Template)

1. Tạc tượng xây móng kiên cố cho dĩa danh mục cọc neo `stepKey`. 
2. Tráo đồ bộ ruột của cỗ Executor đắp qua bằng phu gánh chuyền tay ấn nút xuất bản tin rải sự kiện qua ống loa runtime (publish event). 
3. Kết cục đẻ lọt lòng rải cục lòi rơi thẳng ngay xuống đất bàn lưu trữ nghiệp vụ kinh tế, còn cái áo mủng tủ State thì quẳng cho ngậm lấy nấc cọc móc nhánh Refs thôi. 
4. Trình làng nộp thuế bằng 1 thớt nhét Test Đậu + 1 thớt test Test Rớt Được Bu Bu Bền Chống chịu + 1 thớt test Lỗi Sụm Hết đường Quất (Không có cửa tái lại). 
5. Cửa trạm thu phí cổng `test:regression` gật đầu, kéo cần trục bẻ phang vô lăng tráo nạp dồn toàn luồng băng chuyền. 

## Vạch Cấm Cửa Ải (Forbidden)

- Nghiêm trị cấm nạp cái tròng lắt léo dốt đục theo lối Tự thụt lùi che rụng lông rơi rớt câm (Kiểu lách luật tống cổ luồng: "Bạch tuộc con bị què nhào đổi phịch sang râu bạch tuộc khác lấp liếm").
- Nghiêm trị thói tiếc rẻ luyến lưu ôm dẻo tạc cái rễ cọc bẩn thỉu nhí nhố gán dán ghép của bộ đếm hậu tố thằng nhãi con stepId đời cũ.  
- Chuyên chính mạt kiếp cái trần khảm vô tội vạ dồn nhét mớ dề kho chạp toàn bụng chữ văn chương tộng vô túi chứa trạm nghỉ checkpoint. 

## Cầm Dây Trói Báo Danh Xuất xưởng Nhập Viện (Commit Flow)

1. Kéo sách báo bộ chỉ huy Mọc Đầu Update Tổng Thể (Master Plan) lại đánh trúng bôi mực hiện trạng vô cọc trước đi.
2. Sáng mắt rồi hẳn buông mài phịch tay Submit Gởi Nạp cục mã Code lôi lết lên.  
3. Quắn đít thì chạy đi vá lỗi quẹt cho kín lỗ chìm thọt hậu điểm danh biên án chốt Lệnh Rà Đoác xác nhận mọc nấm cùng lũ danh báo cùi "Sự Cố Quen Mặt Xác Định Được Đi Kèm Nằm Sơ Rơ Ra Đấy". 
