# AGENTS.md

## Phạm vi áp dụng
- Quy định này áp dụng cho tất cả các thư mục và tệp tin trong kho lưu trữ (repository) này.
- Nếu ở các thư mục cấp dưới có lưu một tệp `AGENTS.md` khác, những quy định cấp dưới đó chỉ có thể được dùng làm phần phụ lục bổ sung thay vì làm suy giảm đi độ ràng buộc nghiêm ngặt ở trong tài liệu này.

## Mục tiêu Dự án và Nguyên tắc Viết Code
- Hệ thống này được lập ra dưới góc độ của một dự án hoàn toàn mới, vì vậy sự `Đồng Nhất` (Uniformity) và `Rõ ràng - Ngắn gọn` (Simplicity) được nâng độ ưu tiên lên vị trí đầu.
- Tuyệt đối nghiêm cấm việc biện bạch lý do "để tương thích chuẩn mã code cũ/thao tác cũ" mà nhúng vào hệ thống các luồng xử lý thừa thãi, cầu tương thích (compatibility layer), chuỗi logic chạy song song (dual-track) hay áp dụng bản vá tạm bợ.
- Mọi khía cạnh đổi mới cũng như tái cấu trúc (refactoring) ưu tiên việc phục vụ cho sự nhất quán, dễ bảo trì và dễ tra cứu mã, tuyệt nhiên không phải dùng để bù đắp các di sản thừa của hệ thống.
- Cấm toàn diện hành động xài chuẩn mô hình `any` trong TypeScript, mọi đoạn khai báo bộ thiết kế đều rạch ròi.

## Quy Củ Các Mô-Đun Và Tệp Mã
- Nếu phát sinh tình huống code dài, thì mã phải gãy góc chẻ nhỏ lại qua mô hình mô-đun với phạm vi nghĩa vụ khác biệt.
- Trừ phi một tệp phải mang nặng những công tác quá cộm cán chung (Ví dụ: giao diện UI đan xen với cấu hình luồng trạng thái, gọi lệnh Request hoặc nhúng lẫn với chuyển quy trình dữ liệu) thì nó phải bị thu gọn - phân nhỏ ra.
- Quy chuẩn thiết kế (public capabilities) có thể được tách biệt ra để cho phép hệ thống gọi đi gọi lại thuận tiện, tránh tư duy copy-paste xơ xác.
- Khi đặt tên biến nhớ chú tâm tới vai trò định nghĩa cụ thể, bên cạnh đó kết cấu cấu trúc thư mục hãy đảm bảo đẩy nhanh chuỗi thời gian phân nhóm, tìm dấu, nhìn code của developer.

## An Toàn Dữ Liệu & Thao Tác Trọng Yếu Rủi Ro
- Toàn bộ cơ cấu hành động nào trực tiếp dắt đến kết quả làm `xóa`, `mất trắng`, `bị đè lên`, `hư hỏng cấu trúc` và thậm chí nguy cơ can thiệp `không được đảo ngược phục hồi` với dữ liệu phải bị thẩm định kỹ ở chốt đòi hỏi cấp quyền phê chuẩn của chủ nhân thao tác/người dùng.
- Khi cơ quan chuẩn nhận không cho thông qua, quyền khai diễn chỉ được hạn chế ở chế độ tra cứu vô phím đọc Read-Only, đồng thời đi sâu phân giải dự kiến hậu quả. Cấm quyết đoán chạy.
- Phù hợp với tiêu chí trên, mọi ứng xử liên quan rễ DB, các script dọn dẹp bộ nhớ/quét tài nguyên/copy chồng đè files luôn luôn đẩy ở chế độ rủi ro mức độ cao.
- Có thể cho triển khai bình thường mà không ngăn chặn đối với những chế tài phân loại kiểm thử, lệnh khởi dựng build - đều phi nguy hại.
- Có thể chạy quy trình kiểm định test, build an bình không có bất cập sự cố mang mức độ tàn phá.


## Tư Duy & Lẽ Đưa Ra Quyết Định Chuyên Môn
- Bất cứ cơ chế hướng chuyển đều rập khuôn mô thức tư duy tính chất tối thượng (First principles): Bạn cần phân định hướng đối tượng cái đích đến là gì, kìm nén ở những hạn mức và phanh phui thực tại; sau đố mới bẻ hướng con đường đi thực tế kế đến.
- Khước từ hoàn toàn phương pháp mượn lối nhận định thói quen truyền thống “thường thấy nó như vậy” và đổ lỗi "chiều dài lịch sử đã quy kết". Đòi hỏi diễn giải cụ thể lý lịch cội nguồn tính năng hoặc tiêu chuẩn sàng lược dựa trên cơ sở gì.
- Công tác hoàn thiện không nên tạo vòng bao bọc quá dày, làm ra dáng phô trương cho độ phức tạp vô thực, ngăn trừ các chuẩn ảo lý thuyết (vô hiệu) cũng như là rườm rà Over-design.

## Giới Hạn Câu Lệnh Cùng Lệnh Thao Tác Lịch Sử Git
- Vô hiệu hoá trọn gói các định dạng lệnh ngoài hệ thống cấu trúc Query điều hướng trên Git mang định dạng Chỉ Cho Đọc.
- Chấp thuận cho mở một số giới hạn kiểm duyệt các dấu ấn kho hay báo hiệu qua Query, gồm ví dụ điển hình sau: `git status`, `git log`, `git diff`, `git show`, tính cả câu gọi tên chi nhánh mã `git branch` (trong phương án thụ động Chỉ cho Đọc).
- Các định dạng điều phối mang tư cách chuyển tải biến hóa trạng thái nền lưu đồ lịch sử đều Bắt buộc bão hòa có sự chuẩn thuận gật đầu, chúng đề cập như: `commit`, `push`, `pull`, `merge`, `rebase`, `cherry-pick`, `reset`, hành lang xử lý di biến qua lại `checkout` (kèm thay đổi mã), hoặc kiến trúc nhánh phân kỳ mới/quét nhánh cũ branch... cộng điểm đính dán Tag.
- Khoảnh khắc mà chuẩn phép duyệt còn vắng mặt, chặn tất thảy lệnh viết lại (overwrite), tạm giữ (staging file), gửi duyệt Commit, đồng bộ, lui quy trình cũ hoặc thay trắng đổi đen biên soạn sự lưu cữu cũ.
- Được hỗ trợ thiết đặt test dự án build hay công cụ phát tín hiệu test kiểu code lint.

## Lộ Sạch Mọi Dấu Hiệu - Tuyệt Vời Không Giấu Nhẹm Lỗi Chết Trân
- Khống chế gọt dũa mấy mẫu mô hình chống chế chìm, tránh ném đi hệ thống phản hồi ngó sang rủi ro tìm tàng ẩn khuất; cấm mọi công trình tự biên tự diễn (khi không chịu cấp quyền) như mô hình LLM A chập mạch mà phi ngay xài ké LLM B, bỏ luôn những sai số bốc lửa lầm lỗi, hở mớ tính năng tự lấy biến định danh thế chân hay dở mưu "Fake data/Fake ID".
- Định tuyến hoạt động đi đến con đường Bất Thành thì kêu lên Bất Thành mà Cấm Bước Đi Lui Ngầm Đảo Chiều: Từ chối chối bỏ những bão lỗi chết đằng trong, tự vá cấu hình hay rớt bậc chất lượng tự định đoạt AI. Chắc chắn rành mạch mọi ứng xử lỗi phải "sập nguồn" và hô lên rành mạch đúng trạm!


## Bản Lĩnh Hãy Giải Mã Cho "Gã Đích Chân Định Hướng" Tới Cùng
- Xin hãy buông thõng câu hỏi để vớt lên bề chìm đắm về sự thèm khát cái cốt ý điều tớ cần là sao đây (khoan chưa nói tới tớ đã nói thế nào). 
- Chủ sự dự án đôi bận mù lối hướng kỹ thuật lập trình... có khả năng thua bạn tới một dặm.
- Xem như một bài lời tớ là hệ đối chiếu tham khảo không bao quát quyền hạn tuyệt đối - Dẫu thấy bọt bèo sai lý, nhúng tay vặn cung chấn chỉnh ngay.

## Quy Chuẩn Xét Duyệt (Tiêu Chuẩn Test)

Quy chuẩn tổng thế và bao quát hãy vào phân mục [`agent/testing.md`](agent/testing.md), Còn cẩm nang dưới này là bộ trói chân định chế cao nhất:

- Mở điểm tính năng cộng hưởng mới hoàn toàn hoặc vặn sửa logic hệ là buộc lòng đẻ trứng mang chuỗi Test kiểm duyệt; đã có thay đổi ở mã chức năng buộc theo đổi ở mã tập xét kiểm. Bảo lãnh tính đồng điệu như hình với bóng. 
- Môi trường sửa rễ cành logic từ worker / chỉnh sửa ngắt Bug / Đắp nối luồng Route / Thêm phân dòng Task Type → Là ấn định sửa đổi kiểm thức cho cái đã đính (Up level test code)
- Mạng sửa lỗi (Fix Bug) là định ước bổ túc phần Test Check rủi ro tương xứng lỗi, mệnh lệnh `it()` vác hẳn tình huống sinh bệnh ấy lên ngã ba.
- Xác quyết thông số buộc phải chạm đến chân dung kết quả thực đo lường bằng con mắt (Kiểm sát chi tiết nội vi trường Database (DB), Đầu vô đầu ra API function Request - Response), Nghiêm khắc bài trừ những trò soi câu hàm chạy chưa bám mảng rỗng tếch `toHaveBeenCalled()`.
- Lập vạch cấm hành vi “Được đạn tự hô súng bắn”: Giả cách biến biến lấy ra chữ X rinh luôn chữ X mà ngó lơ chẳng dính tí định danh kinh doanh cốt tủy nào.