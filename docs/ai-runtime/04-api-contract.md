# 04 Hợp đồng API (API Contract)

## 1) Lệnh Khởi tạo một phi vụ Run mới

`POST /api/runs`

Chi tiết Yêu cầu (Request):

```json
{
  "projectId": "project_x",
  "episodeId": "episode_x",
  "workflowType": "story_to_script_run",
  "taskType": "story_to_script_run",
  "targetType": "NovelPromotionEpisode",
  "targetId": "episode_x",
  "input": {}
}
```

Phiếu Trả lời (Response):

```json
{
  "success": true,
  "runId": "run_x",
  "run": {}
}
```

## 2) Lệnh Truy vấn danh sách tổng các Run

`GET /api/runs?projectId=&workflowType=&status=&limit=`

Phiếu Trả lời (Response):

```json
{
  "runs": []
}
```

## 3) Lệnh Trích lục Ảnh chụp nhanh (Snapshot) của một Run

`GET /api/runs/:runId`

Phiếu Trả lời (Response):

```json
{
  "run": {},
  "steps": []
}
```

## 4) Lệnh Trích xuất Sự kiện dồn tích (Incremental Events)

`GET /api/runs/:runId/events?afterSeq=0&limit=200`

Phiếu Trả lời (Response):

```json
{
  "runId": "run_x",
  "afterSeq": 0,
  "events": []
}
```

## 5) Lệnh Hủy ngang Run (Cancel Run)

`POST /api/runs/:runId/cancel`

Phiếu Trả lời (Response):

```json
{
  "success": true,
  "run": {}
}
```

## Luật Thẩm tra Bí Phán Quyền Lực (Authentication Rules)

- Bắt buộc phải được Lệnh Phê chuẩn mộc Đăng Nhập (Login).
- Chỉ mở cửa mả chốt chui qua xem được rổ đồ vật với thẻ lòi `run.userId === session.user.id`.

## Tổ Hợp Lấn Sân Đan Chắp (Compatibility Relations)

- Con kênh giao lộ hiện hữu ngõ business route muôn đời vẫn đang dắt díu lối cũ dẫn đạp lên nấm mồ `submitTask`.
- Tuy nhiên, đường cống `submitTask` vừa thi công nạo vét lúc rày sẽ phụt ói ra đôi ngọc bội đính móc `taskId` đi kè cùng `runId` (Chỉ dích nhắm bọc vào lũ kèn cựa AI nhiệm vụ thôi nhé).
- Khu mặt trước Frontend thì cưng nựng ưu tiên mâm trầu nhặt nướng tiêu mẩu đồ run event, với cửa nẻo task SSE lùi chầu chực nhón chân nhẫn chịu thân mồi câm câu dự bị thay chốt dạt phòng hờ.
