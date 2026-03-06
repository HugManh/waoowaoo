# 02 Mô hình Dữ liệu

Phần này phân tích rọi chiếu thẳng vào các mô hình liên đới tới "đồ thị luân chuyển (graph)" đã được bưng vào mọc rễ nhúng nhét trong góc tủ `prisma/schema.prisma`. 

## Danh sách Bảng

1. `graph_runs`
2. `graph_steps`
3. `graph_step_attempts`
4. `graph_events`
5. `graph_checkpoints`
6. `graph_artifacts`

## graph_runs

Công năng: Bức tượng thờ làm Mẹ Tái Sinh Tối Cao nắm đầu một Lượt Khai Màn Xung Trận (Run) trọn bộ của tác vụ AI.

Các ngọn cờ thông số chủ lực:

- `id`
- `userId`, `projectId`, `episodeId`
- `workflowType`, `taskType`, `taskId`
- `status` (`queued|running|completed|failed|canceling|canceled`) (Chầu Rìa Đợi|Cởi Quần Chạy|Cắm Cờ Thắng|Sụp Máng Toang|Đang Gào Kêu Thắng Kít|Sổ Bỏ Phủủi Bủi)
- `lastSeq`: Kẻ soi mõ chạy chỉ kim trên chiếc đồng hồ đếm sự kiện xoay vòng rổ luồng ở trong nôi thằng trùm run.
- `input`, `output`, `errorCode`, `errorMessage`
- `cancelRequestedAt`, `queuedAt`, `startedAt`, `finishedAt`

Đai siết ràng buộc:

- `taskId` buộc ngậm niêm yết chuẩn duy nhất (Một task rành rành ẵm gọn một bào thai đẽo nặn đút một khuôn run).

## graph_steps

Công năng: Bản nháp phác vẽ hình rọi hắt bong bóng cho những nấc nhún nhảy (Step) leo bộ cắm rễ trong rặng run. 

Các ngọn cờ thông số chủ lực:

- Đóng đinh hợp thể `runId + stepKey` là độc nhất vô nhị.
- `status` (`pending|running|completed|failed|canceled`) 
- `currentAttempt` (Nấc lính tiên phong điểm trỏ gậy dò đường đếm xỉa tróc rớt ngáng bao bận rớt rụng).
- `stepIndex`, `stepTotal`
- `lastErrorCode`, `lastErrorMessage`

## graph_step_attempts

Công năng: Tờ giấy phơi nảy rành rọt từng chặng lịch phơi bày rỉa lóc cẩn thận thói bướng trỏ mặt ngóc đầu đâm gục tái giá của cái nấc step (Sổ đếm tội trầy trật nướng tiền).

Các ngọn cờ thông số chủ lực:

- Cục chìa dập lửa kẹp gông bộ ba nhốt tròng `runId + stepKey + attempt` bóp chết chỉ làm cho nẻo đường duy nhất có một không hai.
- `status`
- `outputText`, `outputReasoning` (Ghi âm xuất ngôn bóp còi lảm nhảm khỉ ho cò gáy suy tâm bão lòi não ra chữ hay gì dán vô đây).
- `errorCode`, `errorMessage`
- `usageJson` (Cột xé thẻ giấy kiểm đếm cái cọng lông bạc xót túi tiền đốt lủng bọc tiêu cho màn múa võ đi đong tút đếm cống nạp của AI ra cái mã dẻo json).

## graph_events

Công năng: Cuốn sổ bọc bọc lớp nhung dày thu vẹm gói giữ vết bánh in in ngấn tích để xui rủi sập trạm là đem ra nặn bốc hồi chiếu lại từ gốc tới cọng xé phay làm đồ sắm phát bận khất thực.

Các ngọn cờ thông số chủ lực:

- `runId` 
- `seq` (Nòng đếm răng kim châm không thụt lùi xoay vô cấp vòng gảy tiến lên trong nồi lội chậu ruột cha run).
- `eventType`
- `stepKey`, `attempt`, `lane`
- `payload`

Đai siết ràng buộc:

- Kẹp đầu khoá cùm liên danh `(runId, seq)` nhét sổ lồng lộng quy củ tính duy nhất.

## graph_checkpoints

Công năng: Ngọn đuốc châm điểm cắn neo chờ chừa đường sấy khô lặn ngụp ngoi phọt lại tại góc ngã của lóng trạm nhánh graph.

Các ngọn cờ thông số chủ lực:

- `runId`, `nodeKey`, `version`
- `stateJson`
- `stateBytes`

Chiến lược còng dây khoá neo nhốt giới nghiêm gắt gao:

- Gác mõ đặt điểm tựa xông rình cân móc kìm kẹp sình chướng dội của State, với trần mức bung dọng gò chật ở khoản `64KB` (`RUN_STATE_MAX_BYTES`).
- State lọt ổ chỉ dành cho nón tham chiếu (refs) nương ghé cất gởi, cấm ngoắc nhét kéo tụ họp lu loa cho ba cái đống văn chương dề dạc xập xênh mập dái tổ xủ bự chà bá kềnh rên phình chướng chứa vào họng nhồi vô.

## graph_artifacts

Công năng: Chỗ cột rễ đu đeo rọi thẻ biển móc thẻ phơi gởi ké trạm nương xác các bùa pháp bảo sản phẩm do đẻ ra ở lúc bay sô thi triển đụng dao đụng thớt (ví như cục mòng dong sạp lưu trữ trên hàng kho tàng DB, giạt trôi bên kệ mây lưới object storage móc ghim ngàm băm mã thắt chốt version hash).

Tuyệt chiêu bày mưu dọn lối khuyến cáo dành phần rải ổ (Storage layout suggestion):

- `artifactType`
- `refType` (db/object-storage)
- `refId` hoặc xài đinh nối `uri`
- `metaJson`

## Thời Khắc Biểu Kế Và Kê Lưới Đan Chuyền Luồng Rổ Hàng Tráo Tay (Trạm Tác Lập Trình Giao Dịch Transaction)

Con gõ mỏ ngậm phèng la chiêu pháp `appendRunEventWithSeq` được bó chân buộc ngàm gõ chuông trong một hộp kính nhốt trọn vỏn vẹn đúng một phiên Giao dịch duy nhất:

1. Sang số cộng điểm vào ví `graph_runs.lastSeq += 1` 
2. Luồn chọc thọc ruột chốt nhét tọt vô lỗ cái bảng đinh kẹp của `graph_events(seq=lastSeq)`
3. Tung phép soi rọi phả cập nhật phủ đính vẽ lại lớp rọi bóng cho anh kép chóp màn step/run (Updating the projections).

Làm vầy để chắp tay gõ mõ hứa trước bàn dân thiên hạ đảm bảo rằng:

- Mãi mãi cạch mặt không bao giờ thụt lố vọc ngoáy sinh đôi ra nguyên bầy thằng cu con số thẻ giống nhau nằm trong díp mã gãy seq. 
- Ngay khi xướng tin phát tờ rơi thì cái díp chiếu rọi phết nước sơn phản chiếu cũng gật đầu đồng thuận ký biên bản chốt kèo gộp đi chung tay nhau dắt qua ranh cập bến đồng bộ chát chúa tuyệt bích mỹ mãn. 
