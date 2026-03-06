# Tiêu Chuẩn Viết Bài Kiểm Thử Hành Vi

## 1. Khi nào bắt buộc viết hoặc cập nhật bài kiểm thử (test)

| Tình huống phát sinh | Yêu cầu bắt buộc |
|---|---|
| Sửa đổi logic của hàm xử lý worker (worker handler) | Bắt buộc phải có bài kiểm thử hành vi (behavior test) tương ứng |
| Sửa lỗi (fix bug) | Bắt buộc phải thêm mới bài kiểm thử hồi quy (regression test), tên hàm `it()` phải thể hiện rõ tình huống lỗi đó |
| Thêm mới API route hoặc task type (loại tác vụ) | Bắt buộc phải cập nhật vào ma trận tại `tests/contracts/` |
| Sửa đổi hậu tố câu lệnh prompt, thao tác tiêm ảnh tham chiếu (referenceImages) hoặc ghi lại trường dữ liệu (DB) | Bắt buộc phải có phần code kiểm tra và xác nhận (assert) hành vi |

Không thể tuyên bố hoàn thành tính năng nếu như chưa vượt qua lệnh `npm run test:regression`.

---

## 2. Lệnh xác nhận (Assertion) bắt buộc phải kiểm chứng hành vi (kiểm tra giá trị cụ thể)

**Cách viết chuẩn xác**:
```ts
// Xác nhận xem cơ sở dữ liệu đã ghi đúng giá trị của trường chưa
const updateData = prismaMock.globalCharacterAppearance.update.mock.calls.at(-1)?.[0].data
expect(updateData.description).toBe('AI_EXTRACTED_DESCRIPTION')

// Xác nhận hàm tạo ảnh đã nhận được thông số truyền vào chính xác
const { prompt, options } = readGenerateCall(0)
expect(prompt).toContain(CHARACTER_PROMPT_SUFFIX)
expect(options.referenceImages).toEqual(['https://ref.example/a.png'])

// Xác nhận giá trị trả về
expect(result).toEqual({ success: true, count: 2 })
```

**Cách viết bị cấm** (Không được dùng làm lệnh xác nhận chính và duy nhất):
```ts
expect(fn).toHaveBeenCalled()        // Chỉ biết là "đã được gọi", không biết là "đã truyền thông số gì"
expect(fn).toHaveBeenCalledTimes(1)  // Không có ý nghĩa nếu như việc gọi 1 lần không mang lại giá trị nghiệp vụ
```

---

## 3. Quy chuẩn tạo Mock

**Bắt buộc Mock (Giả lập)**:
- `prisma` (Áp dụng cho mọi thao tác với cơ sở dữ liệu)
- Gọi LLM / `chatCompletionWithVision` / `generateImage`
- Lưu trữ COS / `uploadToCOS` / `getSignedUrl`
- Yêu cầu HTTP ra bên ngoài (ví dụ: `fetchWithTimeoutAndRetry`)

**Tuyệt đối Cấm Mock**:
- Hàm nghiệp vụ chính mà bạn đang trực tiếp kiểm thử
- Các hằng số (constants) nội bộ của dự án (ví dụ `CHARACTER_PROMPT_SUFFIX`), hãy import và sử dụng trực tiếp.

**Nghiêm cấm kiểu "Tự tung tự tác" (Tự mock tự kiểm tra)**:
```ts
// SAI LẦM: Mock trả về biến X, ngay sau đó lấy X đi kiểm tra - không đi qua chút logic nghiệp vụ nào.
mockLLM.mockReturnValue('result')
expect(await mockLLM()).toBe('result')  // Một bài Test vô giá trị

// ĐÚNG CHUẨN: Mock AI trả về giá trị X, rồi kiểm tra xem nghiệp vụ có đem X lưu vào database hay không.
llmMock.getCompletionContent.mockReturnValue('phụ nữ dáng cao')
await handleTask(job)
expect(prismaMock.update.mock.calls.at(-1)[0].data.description).toBe('phụ nữ dáng cao')
```

---

## 4. Quy chuẩn Dữ liệu Kiểm thử

- Về các **trường quyết định rẽ nhánh logic**, buộc phải chia thành các bài `it()` riêng biệt, ví dụ:
  - Trường hợp `Có extraImageUrls` và `Không có extraImageUrls` phải viết thành hai bài case khác nhau.
  - Trường hợp `isBackgroundJob: true` và `false` phải tách riêng.
- Về các **trường chỉ để truyền qua mượn đường** (như `taskId`, `userId` - mà mã code không can thiệp xử lý đoạn giữa) thì có thể dùng giá trị tượng trưng (placeholder) kiểu `'task-1'`.
- Về **Quy tắc đặt tên mỗi hàm `it()`**: Để theo định dạng `[Điều kiện] -> [Kết quả mong đợi]`

**Ví dụ viết tên**:
```
Có ảnh tham khảo -> Kết quả phân tích AI được ghi vào trường description
Không có ảnh tham khảo -> Không kích hoạt gọi AI, trường description giữ nguyên
Gọi AI bị lỗi -> Quy trình chính vẫn báo thành công, description không bị ghi giá trị rác
Thiếu thông số bắt buộc -> Bắn ra lỗi có chứa tên trường tham số bị thiếu
Xác nhận hàng loạt 2 nhân vật -> Sẽ xử lý lần lượt từng nhân vật, biến count trả về giá trị 2
```

---

## 5. Cấu trúc chuẩn của một Tệp Kiểm Thử (Test file)

```ts
// 1. Dùng vi.hoisted để rào trước tất cả các mock (Bắt buộc khai báo trước lệnh import)
const prismaMock = vi.hoisted(() => ({ ... }))
const llmMock = vi.hoisted(() => ({ ... }))

// 2. Đăng ký vi.mock (Cũng nằm trước lệnh import)
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/llm-client', () => llmMock)

// 3. Tiến hành import mã nghiệp vụ thật (Phải nằm sau khối đăng ký mock)
import { handleXxxTask } from '@/lib/workers/handlers/xxx'

// 4. Bọc lại bằng khối describe + đặt beforeEach để làm mới mock 
describe('hành vi chuẩn của worker xxx', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('[Điều kiện] -> [Kết quả]', async () => {
    // Bước 1 Chuẩn bị: Tiến hành thiết lập giá trị mock đặc thù cho kịch bản hiện tại
    // Bước 2 Dàn dựng: Xây dựng job, ví dụ buildJob(payload, taskType)
    // Bước 3 Triển khai: Đưa vào chạy, ví dụ await handleXxxTask(job)
    // Bước 4 Khẳng định: Dùng assert để kiểm tra sát sao các giá trị thực tế sinh ra
  })
})
```

---

## 6. Lệnh Chạy Kiểm Thử

| Tình huống | Câu Lệnh |
|---|---|
| Sửa logic của worker | `BILLING_TEST_BOOTSTRAP=0 npx vitest run tests/unit/worker` |
| Sửa một tệp cụ thể nào đó | `BILLING_TEST_BOOTSTRAP=0 npx vitest run tests/unit/worker/xxx.test.ts` |
| Sửa API route | `BILLING_TEST_BOOTSTRAP=0 npx vitest run tests/integration/api` |
| Sửa helpers / các file hằng số | `BILLING_TEST_BOOTSTRAP=0 npx vitest run tests/unit/helpers` |
| Rà soát diện rộng (regression) trước khi commit | `npm run test:regression` |

---

## 7. Giải thích Thư mục

| Tên Thư mục | Chức năng (Ý nghĩa sử dụng) |
|---|---|
| `tests/unit/worker/` | Nơi lưu bài kiểm thử hành vi cho worker handler (Trụ cột phòng thủ chính của dự án) |
| `tests/unit/helpers/` | Nơi thử nghiệm các hàm thuần (pure functions) / hàm công cụ (utils) |
| `tests/unit/optimistic/` | Nơi kiểm tra cách hành xử của frontend state hook |
| `tests/integration/api/contract/` | Bắt các hợp đồng (contract) của API router (Mã 401/400/200 + Lọc Payload) |
| `tests/integration/chain/` | Chuỗi logic liền mạch từ hàng đợi queue → tới lúc worker xử lý xong → Chốt kết quả |
| `tests/contracts/` | Các tập ma trận và rào chắn hệ thống route/tasktype/requirements |
| `tests/helpers/fakes/` | Các tiện ích ngụy trang (mock) phổ thông (cho LLM, media, providers) |

---

## 8. Tuyệt chiêu rà soát rác kiểm thử (Tránh bị xanh ảo - False Positive)

Sau khi nhào nặn xong bài test, hãy điểm mặt kiểm tra lại bằng bí quyết dưới đây để đảm bảo độ uy tín cho "nút bài test qua xanh vèo":

1. Tạm thời bôi đỏ (comment) tắt bỏ đoạn mã nghiệp vụ bạn vừa lập trình, lúc này hệ thống bài test phải chớp cảnh báo "Màu Đỏ ngầu (Tạch)".
2. Tháo bôi đỏ (bỏ ghi chú) khối logic kia về vị trí cũ, hệ thống test lại gật đầu báo "Màu Xanh trong (Qua bài)".
3. Trường hợp khi tắt hẳn đoạn mã đi mà bảng báo Test vẫn sáng "Màu Xanh", xin chia buồn! Câu lệnh khẳng định (Assertion) của bạn hoàn toàn sáo rỗng và đang lọt thỏm không bắt dính vào chân diện mục của logic.
