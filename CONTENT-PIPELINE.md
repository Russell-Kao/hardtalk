# 📝 內容生產流程

> Claude 是這個專案的**主編 + 編劇 + 研究員**。
> 模式：**Claude 主動推薦主題 · Russell 選 · Claude 寫**

---

## 角色

```
┌─────────────────────────────────────────┐
│  Russell                                │
│  - 選主題（從 Claude 推薦清單挑）         │
│  - 練完給回饋（哪集太硬、哪集剛好）       │
│  - 標記讀熟                              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Claude (主編)                          │
│  - 每週主動推薦 5-8 個主題給 Russell     │
│  - 根據選擇做研究 + 寫腳本               │
│  - 給出完整 JSON + research notes        │
│  - 標出每集訓練什麼 muscle               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Claude Code (工程)                     │
│  - append JSON 到 episodes.json          │
│  - git commit + push                     │
│  - 自動部署                              │
└─────────────────────────────────────────┘
```

---

## Russell 那邊的標準提問

當你準備聽下一集，跟 Claude 說：

> **「給我下一波主題推薦」**

我會回給你 5-8 個提案的卡片，長這樣：

```
🎯 本週主題推薦 (Week 2 候選)

A. 💼 "Why Most AI Tools Are Solving the Wrong Problem"
   → 你每天用爛 AI 工具的怨氣可以爆發
   → 訓練：怎麼用具體例子打臉抽象主張
   → 難度：中

B. 💼 "Is NVIDIA's Valuation a Bubble?"
   → 半導體圈必聊、財務術語
   → 訓練：data-driven argument
   → 難度：中高

C. 💼🗺️ "Has Apple Lost China?"
   → 跨國商業 + 地緣政治輕量版
   → 訓練：避免選邊但要有觀點
   → 難度：中高

[...更多選項]

選一個告訴我，我寫。或跟我說「我都不喜歡，給我別的」。
```

---

## 你回我的方式（超簡單）

只要回**字母**就好：

> 「**A**」

或者帶一點補充：

> 「A，但讓 Stephen 更兇一點」

> 「C，但把場景換成日本電子業」

---

## Claude (主編) 收到後做的事

每集生產流程（你看不到，但我內部跑這個）：

### Step 1 · 研究（10 分鐘）
- 找 5-8 篇相關報導（Bloomberg、FT、Nikkei、HBR、SCMP）
- 列出議題的 6-8 個主流觀點
- 找出最尖銳的反方論點（這些會變 Stephen 的彈藥）

### Step 2 · 你的立場設定
- 推測你會站哪邊（基於你的職涯背景）
- 設計你 6 個 turn 的核心論點

### Step 3 · Stephen 的 6 個攻擊
依固定結構：
1. **扭曲論點** - 把你說的話變難聽
2. **逼具體例子** - 不接受抽象原則
3. **拿你過去打你** - 引用你說過的矛盾
4. **邏輯漏洞** - 你的方案哪裡不可行
5. **動機抹黑** - 你只是為了某種利益
6. **最後一句** - In one sentence...

### Step 4 · 寫腳本
- 英文（口語、有重音、有情緒）
- 中文（不是直譯、是「中文母語者會這樣理解的版本」）
- `<em>` 標記出每個 turn 最該記住的句型

### Step 5 · 給你輸出
- 完整 episode JSON（直接給 Claude Code）
- research notes（背景補充，讓你下次跟同事討論有底氣）
- 訓練重點摘要（這集練什麼、為什麼）

---

## 主題庫（Claude 內部用）

我心裡有一個主題池，隨時抽取做 weekly 推薦。當下這個 pool 包含：

**💼 商務類** (你工作直接相關)
- Why Most AI Tools Are Solving the Wrong Problem
- Is NVIDIA's Valuation a Bubble?
- Has Apple Lost China?
- Why Taiwanese Companies Can't Move Like Silicon Valley
- Should Tech Companies Take Political Positions?
- Is "Made in Taiwan" Becoming a Liability?
- Are MBAs Worth It in the AI Era?

**🌱 個人成長類**
- Why Gen Z Refuses to Become Managers
- Should Founders Date Their Investors? (cultural)
- Is Networking Just Legalized Manipulation?
- When Should You Fire a Friend?

**🗺️ 時事政治類** (進階)
- Trump 2.0 and the Asian Tech Industry
- Can TSMC Really Protect Taiwan?
- Is the US-China Tech War Actually Helping Asia?
- Why Western Media Gets Asia Wrong

**🎭 文化哲學類**
- Does AI-Written Poetry Count as Poetry?
- Is "Authenticity" the New Conformity?
- Should We Tell AI the Truth About Ourselves?

**🏠 生活類**
- Is Living Alone the New Marriage?
- Why You Should Quit Your Therapist

每週推薦時我會根據：
- 你最近練的類型 → 換換口味
- 學習曲線 → 不要連續兩集太難
- 時事相關性 → 議題夠新鮮

---

## 如果你想自己給主題

當然可以，跟我說：

> **「我想練 [主題]」**

我會跑同樣的流程，但跳過「推薦階段」。

範例：
> "我想練『遠距領導 vs 進辦公室』，因為下週要跟老闆談這件事"

我回:
> "好，我先問你三個問題確認你的立場——你比較傾向 X 還是 Y？" → 然後寫

---

## 不做的事

- ❌ 你不必每集都研究議題（那是我的工作）
- ❌ 你不必想標題（那是我的工作）
- ❌ 你不必修腳本（如果有問題，跟我說，我改）
- ❌ 你不必管 episodes.json 格式（那是 Claude Code 的工作）

**你只要做兩件事**：選主題、練。

---

## 開始 Week 2

跟我說一句：

> **「給我 Week 2 的主題推薦」**

我會立刻給你 5-8 個提案讓你選。
