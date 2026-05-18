# HARDtalk · Russell 的英文跟讀工具

## 🎯 部署狀態

線上版本：`https://[你的-GitHub-username].github.io/hardtalk/`

## 📁 檔案結構

```
hardtalk/
├── index.html        ← UI + 邏輯（極少改）
├── episodes.json     ← 訪談資料（每次更新只改這個）
└── README.md         ← 這個檔案
```

## 🚀 首次部署（只做一次）

```bash
# 1. 在 GitHub 開新 repo，名稱: hardtalk
# 2. 在本機:
cd /path/to/hardtalk
git init
git add .
git commit -m "Initial: 5 episodes"
git remote add origin https://github.com/[你的username]/hardtalk.git
git branch -M main
git push -u origin main

# 3. GitHub repo → Settings → Pages → Source: main / root → Save
# 4. 等 1-2 分鐘, 網址: https://[你的username].github.io/hardtalk/
```

## 📝 未來如何新增 / 更新訪談

### 給 Claude Code 看的指令

```
我要更新 episodes.json，新增 EP.06。
這是新的訪談 JSON，請幫我:
1. 把這段 JSON 物件加到 episodes 陣列最後
2. 更新 lastUpdated 為今天
3. git add episodes.json
4. git commit -m "Add EP.06: [標題]"
5. git push

[貼 Claude 給的訪談 JSON]
```

Claude Code 會自動做完整套流程。**最快 30 秒後**你手機打開網址就是最新版。

## 🔧 維護指令

```bash
# 拉最新
git pull

# 看狀態
git status

# 手動部署測試
python3 -m http.server 8000
# 開 http://localhost:8000
```

## 🎙️ API Key 設定（在工具裡，只設一次）

1. 打開網址
2. 點右上 ⚙
3. 切到「OpenAI」→ 貼 sk- key
4. 切到「ElevenLabs」→ 貼 xi_ key
5. **這兩個 key 永久存在你瀏覽器**，網址沒變就永遠認得

## 📚 訪談類型分類

- 💼 商務 - AI、半導體、市場
- 🌱 個人成長 - 職涯、選擇、價值觀
- 🏠 生活 - 工作、家庭、平衡
- 🗺️ 時事政治 - 台美中、地緣科技
- 🎭 文化哲學 - 思辨、社會觀察

## 🎚️ 目前進度

- ✅ EP.01 AI Replaces How We Think
- ✅ EP.02 Is Remote Work Already Dead?
- ✅ EP.03 Should Founders Take Vacations?
- ✅ EP.04 When Should You Quit a Job You're Good At?
- ✅ EP.05 Is Work-Life Balance a Lie?
- 🔒 EP.06-10 待解鎖（請 Claude 給新劇本）
