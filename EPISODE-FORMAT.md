# Episode JSON Format Spec

> 給主編 Claude 看的格式合約。**只給 JSON，不要任何其他東西。**

---

## 輸出規則

主編一集訪談的輸出**只有一個 JSON object**：

- ❌ 沒有 markdown 標題（不要 `# EP.06`）
- ❌ 沒有 ```json 圍欄（只要純 JSON）
- ❌ 沒有 research notes、背景補充、訓練重點摘要
- ❌ 沒有「我接下來要寫…」「以下是…」這種引導
- ❌ 沒有額外檔案、附錄、補充資料
- ✅ 只有一個 `{...}` JSON object，end of message

如果主編想分享 research/notes，**單獨另一則訊息**講，不要混進 JSON 那則。

---

## JSON Schema

```json
{
  "id": "ep06",
  "num": "EP.06",
  "title": "<English title>",
  "tagline": "<繁體中文一句話>",
  "tag": "<emoji + 中文類別>",
  "lines": [
    {"role": "host", "en": "...", "tw": "..."},
    {"role": "you",  "en": "...", "tw": "..."},
    ...
  ]
}
```

### 欄位約束

| 欄位 | 規則 |
|---|---|
| `id` | 小寫，`ep` + 兩位數字，例如 `ep06`。從上一集 +1 |
| `num` | 大寫，`EP.` + 兩位數字，例如 `EP.06`。對應 `id` |
| `title` | 英文，名詞片語或短陳述句，<60 字元 |
| `tagline` | 繁體中文，描述「你被質疑的角度」，<50 字 |
| `tag` | 一到兩個 emoji + 中文分類。例：`"💼 商務 · 哲學"`、`"🌱 個人成長"`、`"🏠 生活 · 文化"` |
| `lines` | 陣列，總共 **13 段**，依固定 pattern |

### `lines` pattern（嚴格遵守）

```
[0]  host  — 開場攻擊（扭曲你的論點）
[1]  you   — 反駁
[2]  host  — 逼具體例子
[3]  you   — 給例子
[4]  host  — 拿你過去打你（引用矛盾）
[5]  you   — own contradictions + 重新框架
[6]  host  — 邏輯漏洞攻擊
[7]  you   — 補強
[8]  host  — 動機抹黑（你只是為了私利）
[9]  you   — fair criticism + 反擊
[10] host  — Final question. In one sentence —
[11] you   — 一句話總結
[12] host  — Thank you for coming on HARDtalk.
```

### 每段 `line` 內容

| 欄位 | 規則 |
|---|---|
| `role` | 只能是 `"host"` 或 `"you"`（全小寫） |
| `en` | 英文文本。用 `<em>...</em>` 包住每段最該記住的關鍵句型（重音/情緒/反駁招式）。每段建議 2-4 個 `<em>` |
| `tw` | 繁體中文。**不是直譯**，是中文母語者會這樣理解的版本。口語、自然、有情緒 |

---

## 反例（不要這樣）

❌ 整個輸出多了 prose：
```
好的！這是 EP.06 的腳本：

# EP.06: ...

研究筆記：
- Bloomberg 報導...
- HBR 觀點...

JSON:
{ ... }

訓練重點：這集練 reframe...
```

✅ 正確輸出（純 JSON，沒了）：
```
{"id":"ep06","num":"EP.06","title":"...","tagline":"...","tag":"...","lines":[...]}
```

或 pretty-printed 也行，但前後不要任何文字。

---

## 給主編的一句話設定

> 「從現在起，每集腳本只給我**一個 JSON object**，照 `EPISODE-FORMAT.md` 的 schema。前後沒有任何文字、沒有 markdown、沒有 research notes、沒有訓練重點。如果你想分享 notes，**用另一則訊息**講。」
