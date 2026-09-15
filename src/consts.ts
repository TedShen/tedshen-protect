// protect.tedshen.link：保險服務站。這是「登錄業務員」身分的正式管道，和 grow 的個人學習筆記分開。
//
// ！！上線前必填：下面 DISCLOSURE 區塊每一項都是佔位符，要換成公司給的正式資料。
// ！！build 時會檢查，只要還有「待補」字樣就會失敗，避免不小心把佔位符推上線。

export const SITE_NAME = 'Ted ｜ 保險服務';
export const SITE_URL = 'https://protect.tedshen.link';
export const SITE_DESCRIPTION =
  '沈裕德 Ted 的保險服務頁。先看缺口、再談保障，不多買、不亂買。登錄資料與正式聯絡管道都在這裡。';

// 其他站
export const HUB_URL = 'https://tedshen.link';
export const GROW_URL = 'https://grow.tedshen.link';

// 官方聯絡管道（和 hub、grow 共用同一份值）
// 保險線專用的一組帳號（財務教練那組是 @tedshen.grow，不要混用）
export const LINE_URL = 'https://lin.ee/SIX75CN';
export const THREADS_URL = 'https://www.threads.com/@tedshen.protect';
export const INSTAGRAM_URL = 'https://www.instagram.com/tedshen.protect';
export const EMAIL = 'ted@tedshen.link';

// 站主
export const PERSON = {
  name: '沈裕德',
  alternateName: 'Ted Shen',
  jobTitle: '保險業務員',
  image: '/avatar.jpg',
};

// ── 揭露資料 ─────────────────────────────────────────────
// 公司確認：不放公司 logo 就不需送審，只寫登錄資訊即可（2026-09-15）。
// registrationNo 是選填：Ted 目前選擇不公開，之後要放再填。
export const DISCLOSURE = {
  companyName: '正遠保險經紀人股份有限公司',
  registrationNo: '', // 選填，目前不公開
  // 已取得的登錄資格
  qualifications: ['人身保險', '財產保險', '投資型保險商品', '外幣收付非投資型保險商品'],
  statement: '本網站由沈裕德個人製作與維護，內容為保險觀念說明與服務介紹，非公司官方網站。保險商品內容以各保險公司保單條款為準。',
  reviewNo: '', // 若公司有審核編號，填這裡；沒有就留空
};

// grow Notes 的保險學習筆記。這裡是單向連結：保險站連過去，Notes 不連回來。
// 新增筆記時手動加一筆。
export const NOTES_LINKS: { title: string; url: string }[] = [
  {
    title: '保單健檢：我最近學到的觀念',
    url: `${GROW_URL}/notes/insurance-learning-note/`,
  },
];
