# 1: Mục tiêu Dự án

## Mục tiêu Cốt lõi
- Hợp nhất toàn bộ các tác vụ AI vào một Môi trường thực thi (Runtime) duy nhất: `LangGraph + AI SDK + MySQL Checkpointer`.
- Giữ nguyên hiện trạng của các API không liên quan đến AI, tránh cải tạo không cần thiết.
- Đồng bộ hóa các luồng xử lý trạng thái, tự động thử lại (retry), hủy bỏ (cancel), phát lại (replay), ghi log và cú pháp báo lỗi nhằm xóa bỏ xung đột do hệ thống đang tồn tại chạy dựa trên nhiều mô hình thực thi khác nhau.

## Lý do thực hiện
- Hiện tại, hệ thống chạy song song quá nhiều mô hình thực thi và mô hình quản lý trạng thái, dẫn tới các hệ lụy:
  - Trạng thái giữa các bước thi hành bị ghi đè, sai lệch vị trí hoặc bị lặp lại.
  - Các cấp độ retry tự cắn xé lẫn nhau (Vừa retry trên hàng đợi, vừa tự retry trong bước xử lý, cộng thêm retry lúc parse dữ liệu).
  - Phía giao diện (frontend) phải tự còng lưng gánh thêm các mảng code đắp vá gộp lỗi (Điển hình như tự cắt mã fix hậu tố stepId khi retry).
  - Chi phí và thời gian đào truy tìm nguyên nhân lỗi (troubleshoot) rất cao.

## Ràng buộc Cứng (Bắt buộc phải thỏa mãn)
- A. Tối giảm State (State 瘦身): State chỉ được quyền mang siêu dữ liệu (metadata) và mã tham chiếu cơ sở dữ liệu (DB refs), nghiêm cấm lưu trữ các đoạn văn bản khổng lồ.
- B. Đồng hồ logic (Logic Clock): Bộ phát mã đếm `graph_events.seq` phải đếm tiến liên tục không lùi; hễ frontend bắt được dấu hiệu nhảy số (mất chuỗi), phải ngay lập tức chạy code bù lấp bằng cách lấy lại `afterSeq`.

## Kỳ vọng Trước và Sau chuyển đổi
- Trước khi đổi: Lệnh thi hành, sự kiện truyền phát liên tục (stream), tính năng phát lại và cơ chế gom móc trạng thái rơi vung vãi qua nhiều hệ lưu trữ.
- Sau khi đổi: Trở thành một khối "Unified Run Runtime", truy xuất tại một Điểm Chân Lý duy nhất, với một bộ khung quy chế sự kiện và cơ chế phục hồi được chuẩn hóa.

## Ước lượng Quy mô Chỉnh sửa (Cập nhật động)
- Số lượng tệp tin (files) dự kiến: 75-105 tệp.
- Số dòng code (lines) dự kiến: 8000-13000 dòng.
- Sổ tệp đã tiến hành sửa đổi hiện tại: 26 tệp (Cộng dồn qua kỳ này, bao gồm runtime/service/bridge/worker/frontend hooks/regression test/Tập tài liệu).

# 2: Tiến độ Các Giai đoạn + Vị trí Mã Code Sửa tương ứng

## Quản lý Tổng quan Các Giai Đoạn 
- ✅ Giai đoạn 1 (Phase 1): Đã chốt phương án Thiết kế Kiến trúc (LangGraph + AI SDK + MySQL Checkpointer; Chỉnh lại một mối áp dụng toàn dải AI, còn ngoại tuyến phi-AI giữ nguyên).
- ✅ Giai đoạn 2 (Phase 2): Khởi tạo Tổng Tài liệu Chỉ huy (Master Plan) và duy trì bảo tàng liên tục.
- ✅ Giai đoạn 3 (Phase 3): Xây bộ khung xương Runtime + Áp các mô hình `graph_*` mới cho nhánh Prisma.
- ✅ Giai đoạn 4 (Phase 4): Chốt mã Run API (`/api/runs`).
- ✅ Giai đoạn 5 (Phase 5): Mạch số nhịp logic `seq` + Luồng thuật toán bù đắp khi nhảy thiếu số bên phía Frontend.
- 🔄 Giai đoạn 6 (Phase 6): Bề mặt thống nhất AI SDK (Đã nhổ và cấy xong nhánh lõi chính, còn lại đang gom những ngõ tác vụ lẻ tẻ).
- 🔄 Giai đoạn 7 (Phase 7): Xử lý GraphExecutor + Cặp đôi QuickRunGraph/PipelineGraph (Đã đặt nền móng và nối vào huyết mạch lõi).
- 🔄 Giai đoạn 8 (Phase 8): Chuyển khẩu (Migration) cho các kịch bản dài kỳ, phức tạp (story_to_script_run / script_to_storyboard_run).
- ⏸ Giai đoạn 9 (Phase 9): Hoàn thiện di dời cuốn chiếu cho tất thảy các tác vụ AI còn sót lại.
- 🔄 Giai đoạn 10 (Phase 10): Tổng vệ sinh luồng mã thực thi cũ cõi và Giao thức sự kiện tiền nhiệm (Dọn rác code tiến hành linh hoạt liên tục).
- ⚠️ Cảnh báo Rủi ro (Phase Risk): "Sang sông" cùng một lúc tất tần tật là một chuyện vô cùng mạo hiểm, do đó lệnh cấm dứt khoát phải khép cửa khóa chặn qua mỗi chặng đường (gatekeeping) mới bước tiếp.

## Giai đoạn 2 (Đang vận hành) - Tổng Tài Liệu Chỉ Đạo (Master Plan)
- 🔄 Tác vụ: Soạn thảo và bảo dưỡng cuốn chỉ nam "Cẩm nang Quyết Thư".
  - Đường dẫn tệp: `docs/AI_RUNTIME_UNIFICATION_EXECUTION_MASTER_PLAN.md`
  - Yêu cầu quy chuẩn: Cứ mỗi nhát quốc phập xuống sửa thêm bớt dòng code nào, tài liệu này bắt buộc phải là nơi được update trang thái lên dòng sớm nhất, rồi mới được phép dấn thân đi tiếp.

## Giai đoạn 3 (Phase 3) - Cột trụ Runtime & Sơ đồ hóa Dữ liệu
- ✅ Tác vụ: Rót thêm mô hình bảng vào Prisma cùng mạng lưới Index.
  - Tệp chỉnh sửa: `prisma/schema.prisma`
  - Mô hình được đổ vô: `graph_runs`, `graph_steps`, `graph_step_attempts`, `graph_events`, `graph_checkpoints`, `graph_artifacts`
  - Đòi hỏi cam kết:
    - Bảng `graph_events` chèn thêm thẻ bài `seq`, đóng đinh duy nhất với cặp chìa khóa hợp thể bọc lót `(run_id, seq)`.
    - Bảng `graph_runs` gắn kèm `last_seq` để đáp ứng đà tịnh tiến nối dây con số cho từng chuỗi run.
    - Cột `graph_runs.taskId` bắc cầu ràng buộc chiếu xạ Duy nhất 1-1 ghép cặp (run <-> task), trợ giúp thu lệnh Hủy và Theo dấu (tracking).
- ✅ Tác vụ: Mở lớp Type chỉ định và Dịch vụ (Service) cho bộ Run
  - File: `src/lib/run-runtime/types.ts`
  - File: `src/lib/run-runtime/service.ts`
  - File: `src/lib/run-runtime/publisher.ts`
  - File: `src/lib/run-runtime/task-bridge.ts`
  - File: `src/lib/run-runtime/workflow.ts`
  - Sức mạnh mang tới:
    - Hàm gọi createRun/getRun/requestCancel/listEventsAfterSeq/appendEventWithSeq.
    - Bộ công cụ phóng tin sự kiện Run event publish + cầu nối kiều hối sự kiện task event bridge.
    - Bộ bảo vệ trần rào bùng nổ Size cho State (64KB).
- ⚠️ Cảnh báo Rủi ro: Quá trình sửa đổi cấu trúc DDL xen ngang với tập bảng đang chạy vắt chân lên cổ cho cao điểm tương tác hệ thống. Trị tuyệt đối khung cửa lưu chuyển Migration và sắp lịch tạo Index cho nhịp nhàng.

## Giai đoạn 4 (Phase 4) - Cổng Giao Tiếp (Run API)
- ✅ Tác vụ: Nới rộng các đường Route chạy cổng Interface. 
  - `src/app/api/runs/route.ts` -> sinh đường cổng `POST /api/runs`, `GET /api/runs`
  - `src/app/api/runs/[runId]/route.ts` -> sinh đường cổng `GET /api/runs/:runId`
  - `src/app/api/runs/[runId]/events/route.ts` -> sinh đường cổng `GET /api/runs/:runId/events?afterSeq=`
  - `src/app/api/runs/[runId]/cancel/route.ts` -> sinh đường cổng `POST /api/runs/:runId/cancel`

## Giai đoạn 5 (Phase 5) - Nhịp Logic Clock và Cơ Chế Kéo Bù Mất Số
- ✅ Tác vụ: Giăng lưới chuỗi số tuần hoàn nhịp điệu Runtime event.
  - File: `src/lib/run-runtime/service.ts`
  - Cam kết: Nằm gọn gàng trong khuôn khổ 1 kịch bản (transaction) sẽ lo liệu khoán chia `seq`, tự ném viết event, cập nhật chỉ số cọc thẻ `run.last_seq`.
- ✅ Tác vụ: Lưu truyền mã `runId` xuyên không thông qua lưới sự kiện Worker.
  - File: `src/lib/workers/shared.ts`
  - Diễn giải: Cây cầu `withFlowFields` đã bị ép tẩm thêm chất làm duy nhất `runId` (chuốt ra từ thân payload/meta), bọc đường ranh giới xác nhận suốt dòng đời cho processing/progress/stream/completed/failed để tìm về quê quán nguồn lội run event.
- ✅ Tác vụ: Độ nòng pháo cho lưới kiều hối task->run event (Nhận dạng progress).
  - File: `src/lib/run-runtime/task-bridge.ts`
  - Diễn giải: Sự kiện tiến độ `task.progress` nay đã phán đoán thông minh dựa trên logic tệp `stage/done/error` để ép ra khuôn kết tinh `step.complete/step.error`, và ấn định pháp lệnh quy nhất chỉ một cho cách móc tách giá trị `stepKey` / `attempt` / phân luồng mã lane. Khu vực truyền tải stream được nhồi nắp đóng phòng rủi ro với chốt ngàm mặc định `step:${taskType}` rơi đổ mất thông tin mảnh vỡ.
- ✅ Tác vụ: Thu bén đúc kết lại các cực điểm đích (Run/step 终态投影收敛).
  - File: `src/lib/run-runtime/service.ts`
  - Diễn giải: Phát lệnh bài khi kết sổ `run.complete/run.error/run.canceled` sẽ ôm theo bồi đắp tổng thu gom hàng sỉ những step đang trôi vất vưởng do chưa bắt chốt đích; củng cố khâu gỡ não và bung giải mã thệp thư báo lỗi (xuyên chèn tận Error message bị vùi lấp tầng nhánh trong) để đốc thúc dập tiến độ của trạng thái running đởn, né tiếng lóng "Run thì đòi thăng ván trích sổ mà mớ step vẫn ngâm giấm rướn sức Running."
- ✅ Tác vụ: Test hồi quy vòng xuyến kiểm sát quy củ bộ quy tắc Kiều Hối.
  - File: `tests/unit/run-runtime/task-bridge.test.ts`
  - Lưới che phủ độ mượt (coverage): San mượt làn luồng Stream lane, bù mã khoá Key `stepKey` xài lấp hố mìn cho lằn stream bị mất tích `stepId`, thông nòng trích tinh tiến độ xử lý processing done/error, ánh xạ map theo complete, tự bật màn chắn lọc rác đối với ngạch khuyết `runId` tơ hơ.
- 🔄 Tác vụ: Điều chuỗi điều hưởng luồng bắt mồi lấy seq phía Frontend.
  - File: `src/lib/query/hooks/run-stream/run-request-executor.ts`
  - Diễn giải: Khi đầu cắm cổng phản hồi giắt sẵn `runId` vào túi, Frontend sẽ ưu tiên chạy thẳng đại lộ `/api/runs/:runId/events?afterSeq=` để vét kéo nhặt tăng dồn tiến triển đơn điệu qua từng `seq`. Cánh cửa phập phòng SSE của Task dẹp lui làm phương án sơ cua che gió cho luồng nghèo hột ngọc `runId`.
- ✅ Tác vụ: Viết bài test sấy khâu luồng dòng chảy run events (Pull stream)
  - File: `tests/unit/helpers/run-request-executor.run-events.test.ts`
  - Phủ nắp bưng lưới: Hễ mà cục cưng `async + runId` báo đậu điểm danh thì thét lùi chuyển nẻo đi thẳng qua `/api/runs/:runId/events` và nặn ép phọt ra cực điểm kết bài chung cuộc (terminal state).
- ✅ Tác vụ: Bộ não State-machine găm giữ của cải payload khai vận `run.start`
  - File: `src/lib/query/hooks/run-stream/state-machine.ts`
  - Chi tiết: Biến cố phất buồm khai chiến `run.start` sẽ làm động tác châm ngòi thò tay gieo cắm rơi xuống mặt đĩa tệp thân payload, để hậu thế mần công tác rã đông (restore/debug) sẽ nắm trong tay đục khoét xem tận cốt nguồn thông tin siêu nhân `taskId/runId`.
- 🔄 Tác vụ: Bảo hành chống lộn xộn luồng trật tự tiêu nạp phía Front-end
  - Di dời File: Mảng vùng vẫy `src/lib/query/hooks/run-stream/*` (Vén rèm bê về đại bản doanh tủ kính mới mang tên RunStoreV2)
  - Đòi hỏi: Lệnh lùng quét săn phát lệnh truy nã, thấy văng số lòi sẹo seq là thợ máy nhào vào móc vớt liền, tròng sẵn máy gọt rác loại trùng lắp.
- ✅ Tác vụ: Thay áo dỡ rã thay dây nhợ luồng điều hướng chạy của mạch Mấu Truyện (Story/script) đổi thuần giao thức kênh độc tôn chạy ngầm của Run-event
  - File:
    - `src/lib/query/hooks/run-stream/run-request-executor.ts`
    - `src/lib/query/hooks/run-stream/recovered-run-subscription.ts`
    - `src/lib/query/hooks/run-stream/run-stream-state-runtime.ts`
    - `src/lib/query/hooks/useStoryToScriptRunStream.ts`
    - `src/lib/query/hooks/useScriptToStoryboardRunStream.ts`
    - `src/app/[locale]/workspace/[projectId]/modes/novel-promotion/hooks/useWorkspaceExecution.ts`
    - `src/app/[locale]/workspace/[projectId]/modes/novel-promotion/hooks/useNovelPromotionWorkspaceController.ts`
  - Đọc diễn văn: Vứt sọt rác cởi trói cái nịt đứt chỉ sơ cua sse task-steamer của nhóm nhà Mấu truyện/Kịch bản (Story/script). Đã ấn định ốp luật quy y cho phương thức mưu trí hồi trần - thi hành qua kênh hỏi đáp vòng `/api/runs/:runId/events` luân hồi cùng mớ lưới bắt số lụm bù thẻ díp `seq`. Kệnh bấm ngừng phanh dẹp cửa phải qua thẳng trạm `/api/runs/:runId/cancel`.
- ⚠️ Nỗi khiếp sợ rủi ro: Đám tàn binh bầy nhầy giữa luồng Stream real-time trượt đua cùng luồng vá víu đổ rác kiện event lặp gây bầy nhầy tụt điểm số state. Kiên quyết thanh lọc ép chuẩn rà lưới tẩy trùng lắp theo díp mã số thẻ `seq`. 

## Giai đoạn 6 (Phase 6) Tầng gọi Chung Quanh Gộp Bó Gọi Tổng Chỉ Huy AI SDK
- ✅ Tác vụ: Bồi thềm lớp Nền Máng Xương Cốt AI Runtime
  - Khu thư mục: `src/lib/ai-runtime/`
  - File cấu thành:
    - `src/lib/ai-runtime/types.ts`
    - `src/lib/ai-runtime/errors.ts`
    - `src/lib/ai-runtime/client.ts`
    - `src/lib/ai-runtime/index.ts`
  - Đồ chơi chức năng: Thu vào một rổ phép gọi cho các con bước step, thuần dòng quy nhất dạng thức ọc lỗi bốc phốt, nắn ép cơ cấu xuất thân bưu kiện lượng phí (usage).
- 🔄 Tác vụ: Nắm đầu nhóm Trạm gác lính (handler) dây xích chủ chốt vặn mình đổi nài chui lên lưng gánh vác của AI Runtime
  - Nhập trạm thư báo File:
    - `src/lib/workers/handlers/story-to-script.ts`
    - `src/lib/workers/handlers/script-to-storyboard.ts`
- ✅ Tác vụ: Cuộc di dân ồ ạt băng đàng đồng bộ cho lũ lính đi nhặt rác văn bản (handler) lẻ tẻ qua tay nải của trạm AI Runtime (Đợt ra quân Cánh Chim Đầu Đàn - Đợt 1)
  - Nhập trạm thư báo File:
    - `src/lib/workers/handlers/analyze-global.ts`
    - `src/lib/workers/handlers/analyze-novel.ts`
    - `src/lib/workers/handlers/voice-analyze.ts`
    - `src/lib/workers/handlers/screenplay-convert.ts`
    - `src/lib/workers/handlers/clips-build.ts`
    - `src/lib/workers/handlers/episode-split.ts`
    - `src/lib/workers/handlers/asset-hub-ai-modify.ts`
    - `src/lib/workers/handlers/character-profile.ts`
- ⚠️ Khe hở hồi chuông báo động Rủi ro: Đâu đó vẫn thấy khấp khiễng bóng dáng vài kẻ giấu mặt đi đánh lẻ cắm lỗ cáp đút túi đi ngõ tắt ôm nhầm chân cái trụ cũ rích nhãn mác `llm-client` (Ví lự như phe bọn dán tem Shot/ binh nhì bệt gầm text.worker, hay phi vụ nếm mật nếm gaiStoryboard-phases). Lùng mà vét bắt di dân hết cấm chừa.

## Giai đoạn 7 (Phase 7) Động cơ Executor Graph và Khung mẫu Lập Trình (Template Graph)
- ✅ Phân nhiệm: Cho máy thổi hình đúc khuông cỗ động cơ dã thú GraphExecutor (Thêu dệt đầy đủ chiêu nộp mạng bảo hiểm giữ điểm nhớ chốt/ Tút tát xỉa tự retry lại / Húc còi kẹt bánh xe cấm vận xí cạn cancel/ Ấn kim vạch đếm bóp đồng hồ quá lữa timeout)
  - Vị trạm đóng gạch File: `src/lib/run-runtime/graph-executor.ts`
- ✅ Phân nhiệm: Kẻ bản rập vẽ bảng rẽ của nhánh cây tốc hành QuickRunGraph (Cho mớ nhiệm vụ cụt đuôi ruồi xẹt đụm một cái Node nhánh)
  - Vị trạm đóng gạch File: `src/lib/run-runtime/quick-run-graph.ts`
- ✅ Phân nhiệm: Kẻ vẽ đồ thị sơ mi dệt móc xích hệ lưu động PipelineGraph (Khung đỡ sập cho hệ liên kết rễ má lươn khươn bầy nhầy chuỗi tác vụ Pipeline)
  - Vị trạm đóng gạch File: `src/lib/run-runtime/pipeline-graph.ts`
- ✅ Phân nhiệm: Buồng test kiểm dịch soi độ gân guốc sầu đau cho động cơ GraphExecutor
  - Vị trạm đóng test: `tests/unit/run-runtime/graph-executor.test.ts`
- ⚠️ Khe hở hồi chuông báo động Rủi ro: Lũ mã ám chỉ chóp nón ngữ nghĩa lạc hậu phế tích `_r2` hoặc dây dấp đèo bòng v.v. phải đục khoét cho bay dỡ tận trốc. Miễn bàn cái chế độ làm càn đun chung nước pha tạp đồ nạc lẫn lộn đồ mới cũ.

## Kẻ dẹp loạn Bình định Danh Tính của các Chóp Bậc (Step Identity) - Nằm trong khuôn ngạch Giai đoạn 
- ✅ Phân nhiệm: Sát thủ vãi thuốc tẩy diệt mầm bậy bạ của thói nhảy ngáo ngữ nghĩa cái trò gán thêm cái mấu hậu tố gớm ghiếc linh hoạt của `stepId_retry_x`. Gò vô đúc khuôn một tấc chôn chết cọc cọc của `stepId` rạch ròi, kết hợp gắn mã vạch leo nấc đo nốc `stepAttempt`.
  - Bia mộ danh thiếp những nơi đã xử tử xóa sổ thói quen dơ xong:
    - `src/lib/workers/handlers/clips-build.ts`
    - `src/lib/workers/handlers/screenplay-convert.ts`
    - `src/lib/workers/handlers/voice-analyze.ts`
    - `src/lib/workers/handlers/episode-split.ts`
    - `src/lib/novel-promotion/story-to-script/orchestrator.ts`

## Giai đoạn 8 (Phase 8) - Hàng Chữ Máu Lửa: Tàu Vượt Suối Giao Lộ Mê Vọng (Luồng Phức Hợp - Tâm điểm lõi)
- ✅ Tác vụ nhức nhối: Buộc càng thắt cổ luồng xương sống chánh mạch xử lý tác vụ của con lính càng quét `story_to_script_run` quy chầu nối giáo vào bộ nhai điều phối PipelineGraph
  - Tập danh File: `src/lib/workers/handlers/story-to-script.ts`
- ✅ Tác vụ nhức nhối: Buộc càng thắt cổ luồng xương sống chánh mạch xử lý tác vụ của con lính càng quét `script_to_storyboard_run` quy chầu nối giáo vào bộ nhai điều phối PipelineGraph
  - Tập danh File: `src/lib/workers/handlers/script-to-storyboard.ts`
- ⏸ Chốt neo giam hạn: Tiện mưu tính đóng chuồng gông kẹp vụ án xẻ mảnh "phân tích diễn ngôn lời thoại (Voice Line Analysis)" đóng đinh cắm thành một cục Node nằm gá lên chuỗi móc nối vẽ băng chuyền dựng ảnh storyboard.
- ⚠️ Hố lọt sinh tử rủi ro mạn phép: Đong lường sao cho cái chất đùn phụt ghi nháp sản vật đẻ ra (product output) nó đi vào cửa nại phải đạt trình đồng điệu nhất khoát, chéo cành chéo đọt ở cái mảng gọi phép tua cuộn phát lại (replay playback consistency).

## Giai đoạn 9 (Phase 9) - Hốt trọn mẻ lưới đưa tụi Tác vụ AI cắp nách gom vào Rọ
- ⏸ Bài phân ngạch: Xắn tay đóng gói gom nạp tập thể dòng họ đám AI lắt nhắt của (Vẽ ảnh Hình tướng/Chế khung nhúc nhích Video/ Khò bóp Méo mó Giọng Âm vực Voice/ Rì rào Phù thủy nhào nặn chế biến mỏ Tài sản Kho bãi AssetHub). Quây bạt dồn tụi nó đè nén vào chịu kiếp kiểm soát ôm đồng nhất của RunRuntime. 
- ⚠️ Rào dây gai Rủi ro: Chặn tiệt đường nẻo thoái lui vẫy đuôi, KHÔNG một thằng Route API nào mang gông AI mà xí xới đào hầm trốn hủi theo cái lạch nẻo mòn lộ cũ phế truất hồi xưa vát xác thi hành ngầm. Giết không tha. 

## Giai đoạn 10 (Phase 10) - Cuốn mền quét rác đóng mộc chốt hạ Thu xếp
- ⏸ Mũi đinh xuất kích: Hô hoán gặt hết mọi con kênh bóp ngòi cúng nổ của AI dời vựa rước vào cửa nhà đài `createRun`.
- ⏸ Mũi đinh xuất kích: Ban án chém rụng cắt đuôi lột sình dìm vùi sâu cả rổ lộ giới thực thi lậu nhậu khét xẹt của công nông binh Worker AI tiền cựu. Bức tử chôn thân luôn bọn rùa lề xề giọt nước mứa task-stream cũ đang rót xối trôi tàn dư về Event write xưa cỏi.
- ⏸ Mũi đinh xuất kích: Quét lá mã ôi thiu vứt xó rách ruột code lác thác lủng lẳng dây chết (dead code) lẫn ba cái mã phom giống dòng giống loài ẻo lả (Outdate Type defs).
- ✅ Mũi đinh xuất kích: Cày lại nháp đấp xây lên cung điền tài liệu thánh chỉ dặn dò hậu thế ngự chỉ về cách vận dụng RunRuntime sau cơn binh biến, thêu bện kèm sợi dây dẫn nạp kéo vào cổng tam quan `README.md`
  - Đất rọc quy hoạch thư mục: `docs/ai-runtime/`
  - Trái tệp được ra điêu đẻ hạt:
    - `README.md`
    - `01-architecture.md`
    - `02-data-model.md`
    - `03-event-protocol.md`
    - `04-api-contract.md`
    - `05-migration-playbook.md`
    - `06-operations-runbook.md`
    - `07-testing-acceptance.md`
    - `08-open-gaps.md`
  - Treo bảng quảng cáo Update: `README.md` Dán cái bia địa chỉ chỉ nẻo mời chào lôi nhau xem gióng chiếu dẫn qua động tài liệu mới.
- ⚠️ Con kiến đánh nổ cái đình - Rủi ro: Quên bẵng khâu dọn hốt chùi hầm phế; cần phải kích hoạt cỗ máy máy quét rọi ngõ ngách tra tấn lục xét tóm giò bâu dính (Text scanning Toàn Thân Cấu trúc Code Base) nhằm moi cho kỳ được mà kết phán tiêu diệt. 

# 4: Chiến Bày Cách Buộc Nhận Thu Nghiệm Test 

## Cột mốc Định Đoạt Chốt Đếm Đóng Số
- Độ bám đồng bộ trạng thái luồng (State Consistency):
  - Phải giật cúp là `SỐ KHÔNG (0 Lần)` mọc ra mụn cơm phồng rộp làm trái nết cho cái trò trớ trêu: "Màn hình dọc vách dậu trái nó báo đã Đích Điểm mà ngó sang cái bản mặt thớt chính thì nó vẫn làm cái mòi thoi thóp ọc ọc phụt rỉ nước luồng stream".
  - Phải đạt `SỐ KHÔNG (0 Lần)` trồi cái nhọt bung chỉ rách thịt đúp xì phồng làm mấy cái nấc chặn Step nó chít nghẹt rồi tự đẻ lây bịnh ra hai ba tròng lên nhau bệt bệt múa rối (trùng đè vị trí lệch pha).
- Sinh ngực bật náp hồi sinh đội mồ (Recoverability Power):
  - Lướt bão F5 bung fẹc nạp lại màn hình dệt phát là Móc Tóm lên sống lại lỳ 100% rành mạch y khuôn xị độ vẹn nguyên hình dáng (Trong ranh giới 1 kiếp tái sinh đồng gốc `run`).
  - Tung tuyệt chiêu cắc cớ rút điện bóp chết đứt nửa nòng mảng nhảy hụt số seq của phe con người, bảo độ chỉ trong `1 cú lôi kéo補拉 (Bù đắp luồn lách phốt nhảy)` chớp mắt là xòe ra hoàn lặn y bóc như chưa từng hụt.
- Gân guốc chai sần sức chịu đựng (Stability):
  - Hể có thằng giặc bệnh hoạn (lỗi vặt gỡ được) đập u đầu, chiếu cáo theo sách giáo khoa lôi tụi nó dậy làm lại (Automatic Retry).
  - Bắt mạch thằng dính tà ma không gượng nổi (Bệnh vô đối xì bùn Failed), la lên phát còi cho dân thiên hạ bu xem Chết Thảm Hại ngáy khò đứt đoạn thẳng căng (Báo gắt rõ ràng chớ che).
- Nới mắt soi thấu tận cội (Observability):
  - Thảy cái log xả thải trọng yếu ra vũng, móc đính cho chắc 3 thanh sắt rọi định vị `runId/stepKey/attempt`. Hở cái là toi.

## Công phò Kẹp Đo Xác Minh Định Thu Nhận
- Tế bào phân li (Đấu Single-Unit-Test): Ráp test thử chọt kim qua runtime / vạn biến nhảy múa chuỗi event seq / dàn bạt cắm state guard gánh bảo vệ / rẽ bẻ cung hướng đổ ải Error mapping. 
- Ngồi nhậu gom sòng chụm Integrated Test: Xắn ống quần đu rèo bệt xuống test lòi dom cái sườn cung `story_to_script_run` / luồng ống `script_to_storyboard_run` bằng đủ mọi cách thức móc từ Cửa Sinh-Thành Cáo (Thắng) / Cửa Đóng-Tội Thác (Đứt bóng) / và cái cửa Mò Về Đạp Bóng (Retry hồi lại).
- Lùng vây gom lưới bẻ giò Băng Đảng Regression: Bóp nút xả `npm run test:regression`, đòi hỏi kết quả xanh rì vắt kiệt giọt máu u nhọt bám lính.

## Lịch Sử Điểm Chỉ Test Chọt (Ghi Nhận Chồng Thêm Xát Nuốt)
- ✅ `npx vitest run tests/unit/run-runtime/task-bridge.test.ts`
- ✅ `npx vitest run tests/unit/run-runtime/task-bridge.test.ts tests/unit/helpers/run-stream-state-machine.test.ts`
- ✅ `npx vitest run tests/unit/helpers/run-request-executor.run-events.test.ts tests/unit/run-runtime/task-bridge.test.ts tests/unit/helpers/run-stream-state-machine.test.ts`
- ✅ `npx vitest run tests/unit/helpers/run-request-executor.run-events.test.ts tests/unit/helpers/recovered-run-subscription.test.ts tests/unit/run-runtime/graph-executor.test.ts`
- ✅ `npm run build`
- ✅ Thác nhảy vạch chặn canh giữ thúi nhịp của lệnh `npm run test:regression` (Lộ tuyến guard phase) đã xuất ải vinh danh (Cả bịch mới cấy tệp catalog lộ hướng trạm run routes cũng không si nhê xiên tủng).
- ⚠️ Lôi đao chém dạo đâm chọt qua chặng bóp cò lần 2 đâm lùi sào nhét ứ của phát pháo `npm run test:regression`, bị bủa vây ngẹt phẹc bởi nhóm test cổ lỗ sĩ gào thét dội pháo đứt ruột rớt điểm do tàn dư lịch sử (Những tên cứng đầu phản đồ này chẳng bà con dòng máu ăn nhập chi với vụ mình di đời đổi chỗ Runtime cải biến lần này hết cả nha!):
  - Bắn gẫy rụng 2 em: `tests/unit/optimistic/task-target-overlay.test.ts`
  - Bắn gẫy rụng 1 em: `tests/unit/billing/cost-error-branches.test.ts`
- ✅ Lập đàn cúng xả đúc nồi Code tiếp theo `npm run build` (Nồi súp gọt băm vọc cho xúi cái tay vào hố lửa bộ khung óc `run-request-executor`, đâm xuyên ngõ gạch là pass sướng rơn). 

## Cuốn sổ Diêm Vương Kê Tội Hiện Trạng Lỗi Gập Chốt (Dặn Khắc Bia Dọng Trước Mới Được Đi)
- ⚠️ Cánh đồng hoa dừa héo test Guard Phủ Đầu lác đác cỏ cháy, chẳng xanh đượm xanh nguyên (test:regression hụt chân vấp lác đác 3 em ngỏn ngoẻn lụn xương Test vướng mắc sút giảm nhịp hồi quy ngầm đến từ mầm họa cỗi thâm của mấy anh phá bĩnh song hành hay nhét tàn dư lịch sử ném vào, ngăn họng bóp phát pháo lệnh xả `test:regression` kẹt không hộc xanh lơ được).
- ⚠️ Cửa sập sẩy xổng Lò vọc xông đất làm dạo local chui xó hầm cấu trúc Redis đi vắng không ai canh ở nhà số hẻm `127.0.0.1:16379`. Máy xúc cạp mẻ răng lúc vồ tạt ngang cơn khui xới lệnh `next build`. Loa thùng nó thét tru tre gào khan bịnh khước từ nhổ neo đâm thủng Redis quá trời phát nhật ký tít mù. Cơ mà, may sao của đút lò sinh sản xây thành Build artifact nó vẫn ấp ỉa lòi rặn sinh phọt ra được bộ rễ trọn vẹn chứ chưa bị phá banh xập mui sập mái. 

# 5: Góc Ngỏ Lời Gợi Khẽ Đính Kèm (Phụ gia vắt vai)
- Bản văn nộp mạng này là Cái Bia Đá Lịch Sử Mõ Tòa Đích Chân để đi cày ruộng múa gươm mà phang Code, không xê xức. Nó phải nhịp tim thở nối sống hòa múc cùng cỗ xe Code base nhé.
- Thò đũa vô Lập lệnh Phán cấm ngặt nghèo xạo đui rúc đâm thụt giả làm lơ lùi lại (implicit fallback). Cấm vọc ngứa tay gò gá hàn chắp múa riêu "Lớp vỏ khít Tương Thích (Compatibility layer)". Cấm họng nín câm nuốt cay ngậm đắng lịm chết giấu giếm cái Lỗi ọc nhè tịt còi (Silent Error Swallowing). 
- Bị vướng gót sập hầm xóc họng ở chỗ khỉ ho cò gáy dạt nào đó hở? Xì tóp ngay. Đi lấy bút lông điểm đít ghi mẹ ngay vào rổ `⚠️ Danh Sách Vướng Mắc/Vấn Đề Problem` xong xuôi rành rẽ hẵng bò lết đi vạch gươm cày cái danh khoản trâu cày đang nợ dở được phép xắt tiếp theo. 
