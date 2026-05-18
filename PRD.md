# HARDtalk · PRD

> **Version**: 1.0 · 2026-05-18
> **Owner**: Russell
> **Mode**: 個人學習工具 · 最少維護 · 最快上線

---

## 1. 一句話描述

**Russell 個人的英文「被質疑時反應力」訓練工具**——BBC HARDtalk 風格的雙人對戰訪談，純 podcast 體驗。

## 2. 為什麼存在

- 我會講英文，但**被挑戰、被打斷、被質疑時會卡**
- 市場上沒有專門訓練「被追問下的即時反應」的工具
- TED 風格教的是「事前準備好的內容怎麼講」，HARDtalk 教的是「被逼到角落怎麼接」
- 這是我商務會議裡真正需要的能力

## 3. 設計原則

| 原則 | 意思 |
|---|---|
| **最少維護** | 一次部署、永遠跑、不更新框架 |
| **純 podcast** | 點開就聽，不要 quiz、卡片、進度條干擾 |
| **個人工具** | 不做多人、不做付費、不做 analytics |
| **內容驅動** | 程式碼很穩定，每週只更新 episodes.json |

## 4. 不做的事

- ❌ 進階學習功能（句型表、金句卡片、跟讀模式）
- ❌ 多人 / 帳號 / 訂閱
- ❌ 自動爬蟲 / AI 生稿（內容由 Claude 主編製作）
- ❌ Analytics / tracking
- ❌ Native app（PWA 已夠）
- ❌ 後端 server

## 5. 做的事（V1 = Final）

| Feature | 狀態 |
|---|---|
| 訪談清單頁 | ✅ |
| 完整逐字稿播放 | ✅ |
| 上 / 下集導航 | ✅ |
| 英 / 中字幕分開 toggle（預設關） | ✅ |
| OpenAI / ElevenLabs / 內建 三種 TTS | ✅ |
| API key 安全儲存 (localStorage) | ✅ |
| 已讀熟標記 | ✅ |
| 速度調整 | ✅ |
| API 連線測試按鈕 | ✅ |

**這個列表就是全部**。不會再加功能。未來只增加 episodes。

## 6. 技術架構

```
Frontend: Pure HTML / CSS / JS (no framework, no build)
Storage: Browser localStorage
TTS: OpenAI (主力) / ElevenLabs (高品質) / Browser (fallback)
Content: episodes.json (Claude 寫稿)
Hosting: GitHub Pages (free)
```

## 7. 檔案結構

```
hardtalk/
├── index.html              # UI + 邏輯（不太會動）
├── episodes.json           # 訪談資料（每週更新）
├── README.md               # 部署說明
├── PRD.md                  # 本檔
├── ROADMAP.md              # 主編這邊的選題清單
├── CONTENT-PIPELINE.md     # 主編工作流
└── CLAUDE-CODE-COMMANDS.md # 給 Claude Code 的指令
```

## 8. 成功指標（給 Russell 自己看）

| 指標 | 目標 |
|---|---|
| 每週使用 | 3 次以上 |
| 完成集數 | 每週 1 集練熟 |
| 主觀感受 | "下次開會被質疑時，腦袋裡冒出 HARDtalk chunks" |

如果這三個達不到，不是工具問題，是內容方向問題 → 跟 Claude 主編討論。

## 9. 維護成本（一次性）

| 任務 | 誰做 | 頻率 |
|---|---|---|
| 部署初版 | Claude Code | 一次 |
| 寫新訪談 | Claude (PM/主編) | 每週推薦、你選、我寫 |
| 更新 episodes.json | Claude Code | 你跟它說一聲即可 |
| 修 bug | Claude Code | 極少需要 |
| **你（Russell）需要做的** | **聽 + 練 + 給回饋** | 每天 |

## 10. End of PRD

這就是全部。**不要再回來改這份 PRD**——除非工具的本質定位變了。
