# MAINTAIN.md — 專案維護手冊暨作業紀錄

> **給未來處理本專案的任何人（含 AI 助理）：**
> 任何對本專案的作業（改碼、改文案、改揭露資料、改部署、新增文章、切換審閱模式等），
> 做完後都必須更新本檔案：
> 1. 在下方「作業紀錄」表格新增一列（日期、內容、影響範圍、狀態）。
> 2. 若改變了專案結構、流程、規範，同步更新對應章節，不要只寫紀錄。
> 3. 若有待辦新增或完成，同步更新「待辦」章節。
>
> 這個檔案是本專案唯一的交接窗口。改了東西沒寫下來 = 沒做完。

---

## 1. 專案定位

- **站名**：protect.tedshen.link — 「Ted｜保險服務」
- **身分**：沈裕德 Ted 以「登錄保險業務員」身分的正式管道，和 grow 的個人學習筆記分開。
- **網址**：`https://protect.tedshen.link`（`public/CNAME` 管自訂網域，GitHub Pages 部署）
- **Repo**：`https://github.com/TedShen/tedshen-protect.git`，分支 `main`，push 即部署。
- **狀態**：**正式上線**（2026-09-15）。公司確認：不放公司 logo 就不需送審。
- **Slogan**：先看缺口、再談保障，不多買、不亂買。

### 三站關係（不可破壞）

| 站 | 身分 | 保險內容 |
|---|---|---|
| tedshen.link | 身分頁 | 只列入口 |
| grow.tedshen.link | 財務教練 | Notes 有「保險學習」筆記，純觀念、無 CTA、不連到這裡 |
| protect.tedshen.link（本站） | 登錄業務員 | 可談險種與規劃，每頁帶法定揭露，可單向連到 grow Notes 當延伸閱讀 |

**連結方向只有一個：protect → grow Notes。grow Notes 永遠不連回 protect**，否則 Notes 的「非招攬」立場就破了。
新增 grow 筆記時，手動在 `src/consts.ts` 的 `NOTES_LINKS` 加一筆。

---

## 2. 技術棧與部署

- **框架**：Astro `^7.2.10`，Node `>=22.12.0`，`@astrojs/sitemap`。
- **設定**：`astro.config.mjs` — `site: https://protect.tedshen.link`，`trailingSlash: 'always'`（canonical、sitemap、站內連結統一尾斜線）。
- **部署**：`.github/workflows/deploy.yml` — push 到 `main` 即 build + 部署到 GitHub Pages（`withastro/action@v3`）。
- **靜態資源**：`public/` — `CNAME`、`avatar.jpg`（原圖，schema 用）、`avatar-192.jpg`（首頁 Hero 用，6KB）、`og.jpg`（1200×630 分享預覽圖）、`favicon.ico/.svg`、`llms.txt`（給 AI 引用本站時的說明）。
- **RSS**：`src/pages/rss.xml.ts`（`@astrojs/rss`，只收非 draft 文章），各頁 `<head>` 有 `alternate` 連結。

### 本機預覽

```sh
npm install
npm run dev        # 開發
npm run build      # 正式 build（揭露資料有「待補」會直接失敗，見 §4）
npm run preview    # 預覽 build 成果
```

揭露資料還沒填、只想先看畫面：`PROTECT_ALLOW_PLACEHOLDER=1 npm run build`
（PowerShell：`$env:PROTECT_ALLOW_PLACEHOLDER='1'; npm run build`）

### 審閱模式（給公司的人看、暫時下架用）

在 `.github/workflows/deploy.yml` 的 build 步驟加回 `env: PROTECT_PREVIEW: '1'`，效果：

- 全站 `noindex`、robots 全擋、不產 sitemap、頂端有橘色橫幅。
- 佔位符防呆自動放行（不用填揭露資料也能 build）。

正式上線時把那行拿掉即可。相關程式碼：`astro.config.mjs`（`PREVIEW` 常數）、`src/layouts/Base.astro`（meta + 橫幅）、`src/pages/robots.txt.ts`。

---

## 3. 目錄與關鍵檔案

```
public/                  CNAME、avatar.jpg、og.jpg、favicon
src/
  consts.ts              ★ 全站唯一事實來源：站名、連結、PERSON、DISCLOSURE、NOTES_LINKS
  content.config.ts      posts collection 的 frontmatter schema（含 relatedNote、image(選填，1200×630)）
  layouts/Base.astro     全站 layout：SEO/OG/JSON-LD、RSS alternate、深淺色、審閱橫幅、footer 導覽（內文連結用 --brand-dark，過 WCAG AA）
  components/Disclosure.astro        ★ 法定揭露區塊，每頁必放，文字全來自 DISCLOSURE
  components/OfficialChannels.astro  官方管道 + 防冒用「我不會做的事」
  pages/index.astro      首頁：Hero → 三步 → 文章(5篇) → 延伸閱讀 → CTA → 揭露 → 官方管道（帶 Person schema）
  pages/404.astro        404：回首頁 / 看文章列表（非服務頁，不掛 Disclosure）
  pages/posts/index.astro  文章列表
  pages/posts/[slug].astro 文章頁：自動帶延伸閱讀(relatedNote)、CTA、揭露（帶 BlogPosting + BreadcrumbList schema）
  pages/robots.txt.ts    審閱模式全擋 / 正式模式 Allow + sitemap
  pages/rss.xml.ts       RSS feed（只收已發布文章）
  content/posts/*.md     客戶版文章（draft=true 不會 build）
```

### `src/consts.ts` 現況（改任何聯絡方式只改這裡）

- 官方管道（保險線專用，和財務教練 `@tedshen.grow` 那組不要混用）：LINE `https://lin.ee/SIX75CN`、Threads/IG `@tedshen.protect`、`ted@tedshen.link`。
- `DISCLOSURE`：`companyName: 正遠保險經紀人股份有限公司`；`registrationNo` 選填（Ted 目前選擇不公開，留空，`Disclosure.astro` 會自動隱藏該行）；`qualifications`：人身、財產、投資型、外幣收付非投資型；`reviewNo` 留空（有審核編號再填）。
- `NOTES_LINKS`：目前 1 筆（保單健檢觀念筆記）。

---

## 4. 法規與防呆（動之前先看）

1. **上線防呆**：`astro.config.mjs` 會檢查 `DISCLOSURE` 是否含「待補」字樣，有就 build 失敗。這是故意的，不要繞過（本機預覽才用 `PROTECT_ALLOW_PLACEHOLDER=1`）。
2. **每頁必有法定揭露**：`Disclosure.astro` 已掛在首頁、文章列表、文章頁。新增頁面時必須引用它。
3. **不放 logo 不送審**（2026-09-15 公司確認）。若未來要放公司 logo，必須先走送審並把 `reviewNo` 填上。
4. **單向連結**：本站可連 grow Notes；grow Notes 不可連回本站。
5. **客戶版 vs 筆記版**：本站文章（登錄業務員身分）可談險種與規劃；grow Notes 只能談純觀念、無 CTA。

---

## 5. 寫文章流程

1. 在 `src/content/posts/*.md` 新增檔案，frontmatter（見 `src/content.config.ts`）：
   `title`、`description`、`pubDate`、`updatedDate`(選填)、`tags`(選填)、`relatedNote`(選填，grow Notes 網址，會自動出「延伸閱讀」)、`draft`（預設 false）。
2. 內文不用手動加 CTA 和揭露，模板會自動帶。
3. 草稿先設 `draft: true`，發布時改 `false`（或刪掉該行）。

---

## 6. 待辦

- [x] 範例草稿已刪除，首篇正式文章「什麼是對的保險？」已發布（2026-09-18）。
- [ ] （以下由作業者增刪，完成就打勾並移到作業紀錄）

---

## 7. 作業紀錄

| 日期 | 作業內容 | 影響範圍 | 狀態 / 備註 |
|---|---|---|---|
| 2026-09-15 | 初版上線：保險服務站（未公開審閱版） | 全站 | 已完成（commit `35a6547` 起）|
| 2026-09-15 | 加入審閱模式：noindex、橫幅、無 sitemap、robots 全擋 | `astro.config.mjs`、`Base.astro`、`robots.txt.ts`、`deploy.yml` | 已完成（`ab365a0`）|
| 2026-09-15 | 官方管道換成保險線專用帳號 | `src/consts.ts`、`OfficialChannels.astro` | 已完成（`4d7c051`）|
| 2026-09-15 | 正式上線：填揭露資料、移除審閱模式 | `src/consts.ts`、`deploy.yml` | 已完成（`97ccdad`）|
| 2026-09-15 | 揭露：列出已取得的登錄資格（人身、財產、投資型、外幣） | `src/consts.ts`、首頁 Hero | 已完成（`60d0ca7`）|
| 2026-09-18 | 新增本維護手冊，規定未來任何作業都要更新紀錄 | `MAINTAIN.md` | 已完成 |
| 2026-09-18 | SEO 稽核 warnings 全修：描述擴寫（65/40/60/61 字）、新增 404、修 Base 失效註解＋補 Person/BlogPosting schema、內文連結改 brand-dark（過 AA）；build＋線上驗證 robots/sitemap 正常 | `src/consts.ts`、`src/pages/index.astro`、`src/pages/posts/index.astro`、`src/pages/404.astro`（新增）、`src/pages/posts/[slug].astro`、`src/layouts/Base.astro`、`src/components/OfficialChannels.astro`、草稿 md | 已 push（`d7d3451`）|
| 2026-09-18 | SEO 稽核 opportunities 全修：文章 image frontmatter 管線（自訂 1200×630 首圖）、avatar-192 縮圖（100KB→6KB）、RSS feed＋head alternate、public/llms.txt；BlogPosting/Person 上次已補 | `src/content.config.ts`、`src/pages/posts/[slug].astro`、`src/pages/index.astro`、`public/avatar-192.jpg`（新增）、`src/pages/rss.xml.ts`（新增）、`src/layouts/Base.astro`、`public/llms.txt`（新增）、`package.json`（＋@astrojs/rss） | 已 push（`d7d3451`）|
| 2026-09-18 | 「什麼是對的保險？」定稿發布（draft:false），刪除範例草稿，待辦結案 | `src/content/posts/what-is-right-insurance.md`（新增）、範例草稿（刪除） | 未 push |
| <!-- 之後新增列請插在這一行之上 --> | | | |

**紀錄格式**：`| YYYY-MM-DD | 做了什麼（一句話） | 改了哪些檔案 | 狀態 |`。commit hash 有的話附上。
