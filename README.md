# protect.tedshen.link

沈裕德 Ted 的保險服務站。以「登錄保險業務員」身分的正式管道，和 grow 的個人學習筆記分開。

狀態：**審閱模式**。網址 <https://protect.tedshen.link> 只給拿到連結的人看：全站 noindex、robots 全擋、不產 sitemap、頂端有橫幅、登錄資料是佔位符。未列在 tedshen.link 身分頁，grow 也不連過來。

審閱模式的開關在 `.github/workflows/deploy.yml` 的 `PROTECT_PREVIEW`。正式上線時刪掉那兩行。

## 三站的關係

| 站 | 身分 | 保險內容 |
|---|---|---|
| tedshen.link | 身分頁 | 只列入口 |
| grow.tedshen.link | 財務教練 | Notes 有「保險學習」筆記，純觀念、無 CTA、不連到這裡 |
| protect.tedshen.link | 登錄業務員 | 可談險種與規劃，每頁帶法定揭露，可單向連到 grow Notes 當延伸閱讀 |

連結方向只有一個：protect → grow Notes。grow Notes 永遠不連回 protect，否則 Notes 的「非招攬」立場就破了。

## 上線前檢查清單

1. **問公司**：業務員個人網站的規定、是否需要送審。拿到：登錄公司全名、登錄字號、規定的聲明文字、審核編號（若有）。
2. 填 `src/consts.ts` 的 `DISCLOSURE`。只要還有「待補」字樣，`npm run build` 會直接失敗，這是故意的。
3. 把範例草稿 `src/content/posts/policy-review-what-to-look-at.md` 改成自己的內容，或刪掉。
4. 刪掉 `.github/workflows/deploy.yml` 裡的 `PROTECT_PREVIEW` 兩行，push。
5. 回 `tedshen-hub` 把保險線加進身分頁，並在 grow 的 `PERSON.sameAs` 加上這站。

## 本機預覽

揭露資料還沒填之前，build 會被擋。要先看畫面：

```sh
npm install
PROTECT_ALLOW_PLACEHOLDER=1 npm run build
npm run preview
```

PowerShell 的寫法：`$env:PROTECT_ALLOW_PLACEHOLDER='1'; npm run build`

## 寫文章

放在 `src/content/posts/*.md`，frontmatter 見 `src/content.config.ts`。
`relatedNote` 填 grow Notes 的網址，文章底部會自動出現「延伸閱讀」。
每篇自動帶 CTA 和法定揭露，不用手動加。
