# 06 Sổ tay Vận hành và Bắt Lỗi (Operations Runbook)

## Các Thước Đo Ghi Nhặt Nhật ký Đoan Cốt (Key Logging Dimensions)

Khi khạc đờm phun ra một bọc nhật ký sự kiện, nhớ phải nhét cho lọt tọc ít nhất mớ sính lễ dắt theo này vào giỏ:

- `runId` 
- `stepKey`
- `attempt`
- `taskId`
- `projectId`
- `errorCode`

## Độc Lỗi Chém Đầu Phổ Thông Bới Móc Kê Đơn Vịn Dấu Đi Trị Bệnh Độc Chiêu

### 1) Trúng Đạn `fetch failed` / Sầm Lỗ Tắt `terminated`

Dáng vẽ triệu chứng y hạch:

- Rớt mạng chập mạch giữa đụt ống LLM hoặc dây nối thần kinh bị cứa đứt tới các trạm cắm rút nhà thầu bên ngoài (provider). 

Chiêu châm cứu đè kim:

1. Rọi kiếng soi lúp thẳng vô móng giò bảng xét nghiệm mã chứng `errorCode` có hiện bóng dòng chữ nhọt `NETWORK_ERROR` hay chưa?
2. Bấm vé số chờ mong rà lục đọt mầm cơ hội coi hên hên có trúng mánh tuột về lưới trạm gài bài Retry lại cho đợt tiếp chưa. 
3. Xem vớt nốt đoạn đuôi mẻ nhắm xác cho trót, liệu con cuồn cuộn mã run kia có vấp oạch chổng tứ túc té nằm im chờ mai dập chữ lên trán cái ấn bảng `run.error` không ta? 

### 2) Mép Miệng Chui Nhá Bên Màn Front-End Khóc Tế La Chỉnh Tề Rồi Cơ Mà Cái Họng Dướt Sợi Ngầm Nó Còn Đang Khoẳng Chảy Chữ 

Rọi kim phân luồng Đục Mạch Thăm Tim:

1. Khoét mắt nhìn xoáy tròng vô mớ rác ruột của thúng rổ run events, kiếm móng coi lòi đuôi chậm trễ mọc mặt bốc bưng cái bánh dạt dư rỉ rả `step.chunk` dòm ló sau rèm không?
2. Nghía xuống chót đít rể, rình coi móc ngàm cái khuyên chì rúng ép tới được cắm điểm trụ ranh đỉnh cục chốt khoá lẩy chưa `step.complete` hay cắm nấc chót gài cửa xập cừa `run.complete` chưa thế? 
3. Thử mò cọc rào kiểm xem nấc cọc vạch Key `stepKey` có bị lũ sâu mọt xỏ lá dán tem bậy bơm cứt chèn cái đuôi dộng mả nhảm dơ cho mớ hậu tố biến hình nhảy đâm bang không? 

### 3) Ọng Táy Lút Cán Kéo Ghì Sợi Phục Sinh Refresh Cái Cụp Mặt Phẳng Xịt Thiếu Máu Trạng Thái Sạch Sành Sanh

Rọi kim phân luồng Đục Mạch Thăm Tim:

1. Đập gõ cái chày dọng thử cửa cung `GET /api/runs/:id` xem móc vớt ra được lá ảnh chụp thần trọn dạng ngọc nạp hay rớt mồng? 
2. Khua lưới móc lưỡi vô mâm trầu `GET /api/runs/:id/events?afterSeq=` móc xem hên xui múc mụch vớt ra được chuỗi xâu xì ra hạt ngọc ứa tràn chẽn sự kiện không hỉ?
3. Bứng mặt lột soi đầu não Frontend coi thử phỉa bả có nhón nhẹp nộp xẻ hùa đút cho rập dập dồn xâu cái díp thẻ quẹt đếm số seq đều cái tằng tằng mà nối lên không hả trời?

### 4) Cổng Điện Thổ Công Hổ Tướng Redis Sầm Bưng Cự Cại Trả Véo Vé Từ Mặt Tiếng Tút Nẹt Vùng Mùng Lên Vọt Chặn Màn Hình Chớp Loá

Vắn đồn báo khẩu:

- Cái thằng điện đài Redis chỉ bị bắt ngồi rung đùi gánh vác việc la ré thổi càng phát truyền âm thanh múa sự kiện lên mạng phát đạn loa realtime liền tay thôi chứ; ông lão MySQL mới là Đấng Lưu Truyền Sử Ký Nằm Kệnh Sự Thật Bất Hủ đấy á. 

Chiêu châm cứu đè kim:

1. Bốc loa hồi sinh lay ông lão điện đài phụt sóng Redis cho bốc lại. 
2. Trớ trêu không tạt vô lổ lòi bốc lên được trong chốc lát, thì soi thử xáp mặt cấn bấu coi cái rổ bưng giỏ sự kiện trạm run có ném xuống ình vô ruột bụng cơ sở của thằng kho dữ liệu lót đáy êm đẹp ko, có mụi nằm thì kéo giỏ lưới móc nắp sau của sụm thẻ đuôi tịt ngòi afterseq đem ngoai ngoi vọt lền mà bù dậm đi nặn lại nụ vẻ đét đẹn cho cái bộ mặt hiện hình trên chiếu giao diện UI đặng xong phé. 

## Cửa Lời Nói Lót Gạch Mời Lên Nghía Tòa Đỉnh

1. Đè đúc đóng búa vô cái bồ mảng Bảng tỷ số bốc lỗi hở xì hơi chiếu vô phím điểm mâm mảng ngạch chánh của anh cu RUN lên: đo bới ngọn dằm đoát tỉ số hục tặc `failed / total`.
2. Khoét xẻ cơi sâu khoang ổ theo lườn rọc dấu rải rạ phơi vụn nát của số lượt bị dập trễ ngáp đạp té dọng cục lầm cục tức khứ hồi văng lộn cổ tái diễn retry của tụi step.  
3. Ghim cắm cây đo độ báo cháy đếm thò dò vạch độ mọc đuôi thò lòi hụt sẩy bước sảy số phập phùng trống rỗng của vệt kẽ nứt độ nhảy sảy chạc seq gap.

## Chỉ Lối Dúi Chuôi Lưỡi Thuổng Róc Canh Chọt Khoét Giỡn Mặt Lệnh Bốc Bới Tay Tay Vo 

- Trùn đất Mò Run: Gạt vạch chỉa theo mùi mã nhận diện con `runId`.
- Trùn đất Mò Step: Đuôi mũi đu đeo cạp dấn chỉ số kẹp cặp đuôi chuỗi đánh chữ ngàm móc vô cái phệt `runId + stepKey`.
- Lùng Lỗ Tìm Sự Kiện Vắt Dòng: Soi theo lối dọc vệt dải đánh nhãn `runId` tròng kèm rớ tróc dây tời vắt lệnh dệt xâu `order by seq`. 
- Bới Giẻ Rách Canh Mẻ Mòn Lượt Đếm Attempt: Phanh vuốt vắt giò theo dấu đinh ba thẻ chìa cặp nách `runId + stepKey + attempt`. 
