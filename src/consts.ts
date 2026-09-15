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

// ── 法定揭露：全部待補 ─────────────────────────────────────────────
// 問公司時要拿到的東西：
//   1. 登錄公司全名（保險公司或保經代公司）
//   2. 業務員登錄字號
//   3. 公司規定放在個人網站上的聲明文字（很多公司有固定版本）
//   4. 個人網站是否需要送審、審核編號
export const DISCLOSURE = {
  companyName: '（登錄公司全名，待補）',
  registrationNo: '（業務員登錄字號，待補）',
  statement: '（公司規定的聲明文字，待補）',
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
