# Tiêu chuẩn Kiểm thử Hành vi (Behavior Test Standard)

## Phạm vi áp dụng (Scope)
- `tests/integration/api/contract/**/*.test.ts`
- `tests/integration/chain/**/*.test.ts`
- `tests/unit/worker/**/*.test.ts`

## Các Yêu cầu Bắt buộc (Must-have)
- Giám định sát sao (Assert) các kết quả có thể quan sát được: Lọc payload trả lời / mã trạng thái response, theo dấu các trường dữ liệu ghi xuống máy chủ, hoặc bóc móc payload của hàng chờ (queue/job payload).
- Gắn kèm ít nhất một lệnh khẳng định "chân trị" (concrete-value assertion) cho từng đầu nhánh nghiệp vụ lõi trong hệ thống.
- Bọc test phủ đầu ít nhất một nhánh bị "sảy chân (failure branch)" cho mỗi route (tuyến đường) hoặc handler chỉ định.

## Các Mẫu Mã Nghiêm Cấm (Forbidden patterns)
- Kiếm chứng các hợp đồng bằng cách soi text trên mã nguồn (Ví dụ rập khuôn soi xem route code có dính thẻ tag chức năng nào như kiểu chứa chữ `apiHandler`, `submitTask`, `maybeSubmitLLMTask`).
- Chỉ vịn víu các lệnh xác nhận qua loa, lỏng lẻo như xài móc cài `toHaveBeenCalled()` làm nhân chứng sống.
- Lập ra những bài thi trên cấu trúc, đậu cái vèo nhưng không thực tiễn chạm ngõ một giọt logic nào của code route/worker.

## Chất lượng Khẳng định (Assertion) Tối thiểu
- Rất khuyến khích (Prefer) cách làm lấy bộ khung `toHaveBeenCalledWith(...)` rào kèm với hàm lọc thuộc tính `objectContaining(...)` đối với các tập trường dữ liệu tối quan trọng.
- Kiểm duyệt rạch ròi, chính xác từng giá trị của thuộc tính nghiệp vụ (như `description`, `imageUrl`, `referenceImages`, `aspectRatio`, `taskId`, `async`).
- Đối vối mạng lưới chuỗi việc chờ (async task chains), làm bước chặn soi cách dàn xếp trên luồng queue và thẩm tra cả dữ liệu phụ job (Job metadata, vd: `jobId`, `priority`, `type`). 

## Quy tắc Hồi quy Lỗi (Regression rule)
- Mỗi khi vá một con Bug cũ nào thì "dứt khoát" phải đúc tương ứng một bản sao lưu tình huống test hồi quy (Regression test case).
- Khi sửa mã diệt lỗi (Bug fix) mà bỏ quên không bù đắp thêm một bài test kiểm tra hành vi, thì bản thân hành động sửa mã đấy được phán quyết là CHƯA TRÒN TRÁCH NHIỆM (incomplete)!
