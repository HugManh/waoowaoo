# 01 Tổng quan Kiến trúc

## Mục tiêu

Hợp nhất toàn bộ "ngữ nghĩa ở môi trường thực thi (runtime semantics)" của các tác vụ AI, quy gọn việc quản lý trạng thái, phát thông điệp sự kiện, xử lý hủy lệnh (cancel), phát lại quá trình (replay) và ghi nhận theo dõi lỗi thử lại (retry) vào chung trong một mô hình duy nhất.

Xin lưu ý: Chỉnh sửa này mang tính Hợp nhất ở Cấp độ Môi trường Thực thi (Runtime). Không phải là ta bẻ ghi dồn hết toàn bộ logic thực thi của vạn tác vụ vào cùng một hình thức triển khai gọi mô hình. 
Các nghiệp vụ liên quan văn bản tiếp tục dựa lưng gọi ngả LLM, còn những pha phẩy lượn mảng tạo Hình ảnh/Video thì tiếp tục cất giọng hú máy phát đa phương tiện (Media Generator) gánh lo. 

## Nguyên tắc Thiết kế

1. Một điểm tập kết Chân lý Bất Diệt (Single Source of Truth): Sử dụng MySQL là mỏ neo.
2. Thét Báo Rành Rạch - Sập Lỗi Trả Lời (Explicit Failures): Nói không với trò lấp liếm lỗi hay che lấp tự xuống cấp ngầm (silent degradation).
3. Đóng Dấu Nhãn Minh Bạch (Stable Idenfiers): ID chốt sổ `stepKey` không thay đổi, trong khi nhịp đếm thẻ chập trùng tái kiểm `attempt` được tách biệt hoàn toàn.
4. Diễn Võ Theo Trình Tự Băng Chuyền (Ordered Events): Cán dấu số đính kèm của nhịp `seq` chui vào một đường ruột cắm luồng chạy thẳng không phanh tự tăng (monotonically) nằm rúc trong lòng ruột `run`. 
5. Phục Sinh Trở Lại Vẹn Toàn (Recoverability): Trạm giập quét màn hình bóc khôi phục một cú nháy mắt + Chống lưng phọt rặn đâm chồi thêm từ những ngóc đọng tái bản dán bù (Incremental Replay).

## Phân Tách Biên Giới Hệ Thống

- `submitTask`: Đứng vai trò Mũ Đội phát lệnh khởi dựng Task (tác vụ) rập khuôn và kẹp trân trọng buộc gán dâng thẻ `runId` (cho đội quân đệ tử đánh chiếm luồng task nhãn mác AI).
- `worker`: Lao công ra dọn tay thi hành việc xác thực và truyền tống mật tin chốt xả ống nước sự kiện luồng task ra rốn trung tâm.  
- `task-bridge`: Ga cạn chuyển phà lượm lặt bốc xếp đóng thùng tái nặn cái đống rổ task event sang hàng mã run event chính hiệu.
- `run-runtime/service`: Anh chàng chuyên lo bộ đếm nhặt tem xẻ số cho phiếu `seq`, rặn mẻ bản khai đúc ghi vào bia bảng kho tàng chữ `graph` chói loọi, chuyên làm đồ họa vung xõa hình bóng đồ chiều nhại hướng phóng chiếu.
- `run-runtime/publisher`: Thằng loa đài tung tín hiệu la ré thông tri loan báo nhịp run Redis phập phồng ra khắp phường khóm. 
- Front-end gánh mảng `run-stream`: Cỗ máy xúc hứng gọng hàm ăn phễu đón ngấm những mẻ sự kiện của cái run vãi ra, qua đó ngồi nhào nặn tô nền trét lại gạch ngói cho Cổng giao diện UI. 

## Cấu trúc Luồng Di Hành Trực Tuyến Hiện Giờ (Đã Nhấn Ga Khởi Chạy Sống)

1. Phi cơ bay vào đường lộ API route khai mở đánh thức `submitTask`.
2. Hạm đội `submitTask` nhúng bút quẹt một nhát khai sinh bia lý lịch `graph_runs` chôn vào kho rồi tiện bóp cò gởi nhồi lính `runId` thọc sâu trở ngươc mang nhét vô bộ hành trang chở theo trong payload của nó.
3. Loa đài thợ hồ gánh chèn sức worker khai hoang cuốc cày rống còi bắn tống đi cái lộ trình sinh diệt của cái còng xích life-cycle/chập chùng stream khạc nhè của khóm luồn task event. 
4. Trạm dịch Ga tàu hoả `task-bridge` múa một đường kiếm móc kéo băm dẹp cái ổ mớ dồn cục task event, lột kén ra biến sắc trở mình tọc lộ trồi chóp sinh thành rành bịch cái đống gân guốc trạm gác `run.start/step.start/step.chunk/step.complete/step.error/run.complete/run.error`. 
5. Cánh tay cơ bắp thủ thư `service` kìm kẹp ấp ủ gồng gói bó nhung bao bọc trong vạch Transaction súng báo nổ tựa nêm tăng bo kéo đếm `lastSeq`, tay thì phóng viết chích tệp `graph_events`, tay kia quệt mực quẹt lại gạch ngang chép vô tủ mục bảng `graph_runs/graph_steps/graph_step_attempts`.
6. Ngồi vẫy tại chòi phía mũi con thuyền Frontend háo hức thọc đũa vô rổ kéo ra ráng miết mải qua cái nẻo mòn `/api/runs/:runId/events?afterSeq=` tranh xé phập phì gom về thu vét gạn đáy nồi những dề mảng biến cố tăng dồn chìm tích lại chưa khui. 

## Tại Cơ Sự Nào Mà Lại Bể Nồi Ngồi Được Cái Tòa Vững Trắc Hơn Tàn Phế Tòa Cũ?

- Bứng bay cái mụt ghẻ nhọt hùa nảy chồi xõa cành đẻ bầy của đuôi chặng lội về retry stepId: Từ rày gông cổ chết dí lại một mớ cái `stepId` cho chuẩn vào một nẻo, riêng cái mâm điểm đánh vằng thì đếm cộng cái thằng đánh nhại `stepAttempt` thay thế.
- Đạp vỡ cái bình pha lê thối lõi mâu thuẫn điểm chốt nháy hậu run chéo cành với mâm step: Kỷ luật dằn mặt khi chóp chốt của mảng run gõ búa thì cái rề rạ vương vãi chưa tới chốn về trạm của mấy chóp nhóm step sẽ bị gom cục gò bóp còng đầu túm hết vào rọ đóng bửng xì hơi không trượt mống nào.
- Rửa tay giác ngộ thoát nghiệp làm thân bấp bênh rủi rủ chầu rìa trù yểm vô ba cái lạch đứt khúc may rủi búng nút refresh dừa nổ SSE rách còi (Chống trò bóp bụng bấm F5 hên xui): Bởi ngọn roi quản cợt gánh vác rành mạch nên đám sự kiện kiện run xòe mở tành tành banh ra lộ đồ lết kéo giật bổ sung vô tội vạ được hoài. 

## Mặt Trận Chưa Tắt Khói (Những Gì Vẫn Đang Dang Dở)

- Cặp bài trùng `GraphExecutor` dắt díu với con tàu thoi móc ruột `PipelineGraph` vẫn còn lủng lẳng đánh chậm lề mề chưa trám hốt banh xác búng mất dạng mấy cái mạch gân khốn khổ xôi lằn dây lòng thòng rối nùi chuỗi móc dài dằng dặc cũ mèm.
- Cánh cửa lạch hậu sứt mẻ xộc xệch của cái rốn ống task SSE vẫn thói giữ nguyên để mồi dự bị lấp hố giăng cái phao (Thì tạm ngậm ngùi tặc lưỡi xuôi chịu nín đi trong vòng chớp mắt khoảng ngắn thôi, chứ kéo dông dài là phải dí còi tóm đầu cắn mỏ ngắt ngòi gom tắt sạch sẽ cho bõ ghét). 
