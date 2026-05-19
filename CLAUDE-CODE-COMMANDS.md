# 🚀 給 Claude Code 的指令

## 第一次部署

複製下面整段，貼給 Claude Code（在 hardtalk 資料夾裡）:

---

```
請幫我把這個 hardtalk 專案部署到 GitHub Pages。

步驟：

1. 確認當前目錄有這三個檔案：
   - index.html
   - episodes.json
   - README.md

2. 初始化 git 並推到 GitHub：
   - 建立新的 GitHub repo (名稱: hardtalk, public)
   - git init && git add . && git commit -m "Initial: HARDtalk practice tool with 5 episodes"
   - 加 remote 並 push 到 main 分支

3. 啟用 GitHub Pages：
   - 用 gh CLI 啟用 Pages：gh api repos/{owner}/hardtalk/pages -X POST -f source[branch]=main -f source[path]=/
   - 或告訴我如何手動到 Settings → Pages 設定

4. 給我最終網址 (應該是 https://[username].github.io/hardtalk/)

5. 確認網站能載入後，告訴我下一步做什麼
```

---

## 未來新增訪談（EP.06、EP.07...）

當 Claude 給你新訪談的 JSON 時，貼給 Claude Code：

```
請幫我更新 hardtalk 專案，新增一集訪談。

要做的事：
1. 讀取 episodes.json
2. 把下面這段 JSON 物件加到 episodes 陣列最末端
3. 更新 lastUpdated 欄位為今天日期
4. 確認 JSON 格式有效
5. 請我把 OPENAI_API_KEY 設好後，跑 node generate-audio.mjs 合成新音檔
6. git add episodes.json audio/
7. git commit -m "Add EP.XX: [從 JSON 取 title]"
8. git push origin main
9. 告訴我幾分鐘後網址會更新

新訪談 JSON：
[在這裡貼 Claude 給的整段 JSON 物件]
```

## 預先合成音檔（首次或新集後）

```powershell
# PowerShell
$env:OPENAI_API_KEY = "sk-..."
node generate-audio.mjs
```

Script 會自動 skip 已存在的 mp3，所以重跑很便宜。產出在 `audio/{epId}/{idx}.mp3`。

---

## 修 Bug 或更新 UI（你要動 index.html 時）

```
請幫我更新 hardtalk 專案的 index.html。

要改的內容：
[描述要改什麼，或貼新的 index.html]

完成後：
1. git add index.html
2. git commit -m "Fix/Update: [描述]"
3. git push origin main
```

---

## 我（Claude）以後給你新訪談時的格式

我會給你長這樣的 JSON 物件（一整集），你直接複製給 Claude Code：

```json
{
  "id": "ep06",
  "num": "EP.06",
  "title": "...",
  "tagline": "...",
  "tag": "🌱 個人成長",
  "lines": [
    {"role":"host", "en":"...", "tw":"..."},
    {"role":"you", "en":"...", "tw":"..."},
    ...
  ]
}
```

完全標準格式，Claude Code 直接 append 進 episodes.json 即可。
