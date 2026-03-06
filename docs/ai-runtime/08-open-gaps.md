# 08 Điểm Khuyết Tồn đọng và Lịch Trình Tác Chiến Kế Tiếp (Open Gaps & Next Steps)

## Thẻ Trận Đã Dọn Điểm Hạ Gục (Resolved)

1. Mảng danh xưng điêm chỉ loạn xà ngầu của nhãi nhép Retry Step (cái mếu máo dán đuôi hậu tố tự nhảy) đã bị đút bao bố dọn sạch.
2. Vệt nứt rò rỉ thiếu mảnh đứt đầu mất thẻ `runId` trôi dạt dọc đường dắt tới thảm hoạ lủng cầu nối (`bridge`) nay đã đục vá nhồi thạch cao cứng nhắc rồi. 
3. Chứng nan y đứt liên lạc, cọc cạch vểnh vênh điểm đến (终态 - endpoint state) giữa ông nội `run` và thằng chắt `step` đã có bàn tay cõi Backend thun thắt tròng khóa ép đính cho cộp chuẩn mực lại nhau. 
4. Lằn giao lộ Huyết mạnh Trục đườnh chính cõi Frontend cho con hàng `story/script` đã chẻ cung lật lọng dời bước chuyển hẳn lối chuyên biệt (Single Channel) của nhà `run-event` (Tát rớt hất cẳng cái trạm gác trầu rìa lượm rác khom trôn ngóng `task SSE` thuở nảo thuở nào). 
5. Cổ xe lu `GraphExecutor`, bộ kềm nạp `PipelineGraph`, và cỗ máy xáo mẻ ruồi `QuickRunGraph` bện đã nhét tọc mốc khoá yên vị trọn gói, còn thả câu ngoắc móc đính chắc nịch vào cặp mạch ruột xương chánh hãng của bộ đội worker gồng ránh.
6. Làng chài `src/lib/ai-runtime/` đã đẽo gạch xây móng lập nhà, bưng phật bắt ấn nịt vô 2 cái dải chánh của phường `story/script` ngon lành. 

## Cửa Rào Nơi Khuyết Trám Chưa Đầy (Not Fully Closed)

1. Toán phu phen le que của đám lính lác AI đánh lẻ vặt vảnh, dẫu mới ráo riết cạp gọn được có một đợt đùa quân Đợt 1 đi sang chánh lộ, vẫn còn lót mót nhón lòi ra mấy anh phơi mặt nhúng chàm tọt dỏm tự ý thông nòng với cổng cung đình ngoại lai `llm-client` cũ (Vi dụ điểm danh bè phái `shot`, con ốc `text.worker`, hay rờ díp ổ chuột `storyboard-phases`) - Toàn rặt đồ chờ ngày ngửa tay bắt cột quy chầu.
2. Sạp gánh trưng diện và giật dây cầm tay cho khối Hình ảnh (Image) / Chớp nhoáng (Video) / Lọc cọc gõ chập (Audio), đành hanh ngó sang khau bày binh trên bệ đài thì vẫn trơ vơ mòn mỏi ngóc cổ tựa dựa mâm sạp ngạch ống đi ngông của trạm `task-state`, mãi chưa gồng xê dịch lôi phăng phăng cuốn xéo tấp qua gác ngõ bến bãi `run-store`. 
3. Giàn dáo chống móng xưa nhãi con `task-stream` còi vổn vẹn sắm gánh xách nước vác bao trên công trường những thửa dạt ranh phi `run`, nên hãy trơ lì ngáo mạng gầy giàn gánh chưa bị trục xuất đập bát gỡ bỏ.

## Lịch Điểm Danh Đấu Trận Gấp Rút Tiếp Chờ (Next Iteration Piorities)

1. Tối Mật Điểm Thượng Đình P0 (Priority 0): Đem hết nguyên gánh bè rễ lũ dân quân cỏn con AI worker handler chui nhủi gom xốc xéo rọn lùa tống tập trung đổ đống cho trạm trung tâm `src/lib/ai-runtime/`.
2. Tối Mật Điểm Thượng Đình P0: Nhào nặn hợp bích chẻ ngọn trát vữa xây một thể đúc khuôn bộ sậu điều kiển đài phát giao diện chạy ngầm (Runtime UI & Cancellation) của trọn gói Hình/Video/Âm, lùa vẹt vào nằm gọn lỏn xài chung đĩa gác mâm `run-store`.
3. Bức Bách Vạch Tiếp Giáp P1: Thu chổi dạt quét rinh mốc cạp bỏ đi nguyên dàn xương cắm làm kho dẫn lưu điểm tin báo dạng trạm bơm trích luồng dữ liệu của tay trọc luồng `task-stream` còn dai dẳng đeo bám đọng nợ.
4. Bức Bách Vạch Tiếp Giáp P1: Cho phủ rơm đóng dấm đan bít kín rào test lưới hồi quy vạch giăng chằng chịt toàn diện tóm sát ván, đun rác mảng móc mục vụng thiêu cho sạch gọng dây nhợ `dead code`. 

## Bằng Chứng Phê Chuẩn (Definition of Done - DoD)

1. Cặp phò mã trộm long tráo phụng `story_to_script_run` cùng `script_to_storyboard_run` rập tâm cùng ngồi đồng cưỡi kiệu do tướng lướt phím `graph runtime` kéo đai cầm cán.
2. Vén mành chéo giang sơn thống nhất: Đám tiểu tốt cõng nhãn hiệu AI route phơi thẻ trình làng trưng độ bốc mốc tình trạng chầu một cửa vào một cái lạch truyền tin giao thư Runtime Protocol tông thẳng. 
3. Tiếng chuông trống lệnh `npm run test:regression` thét một tiếng Xanh Muợt Bát Ngát (All Green).
4. Phơi cái Bảng Mẹ Kỷ yếu dán tem lên mụi thớt đầu lêu cao chót vót của trang Chủ Đích Nhạc Chưởng Tướng Lệnh Master Plan phệt nết đổi màu sáng bóng dọng ngay mộc `✅ Đã Ngả Bàn Hưởng Thái Bình (Done - Checked)`.
