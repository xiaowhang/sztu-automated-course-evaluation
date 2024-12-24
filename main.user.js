// ==UserScript==
// @name            SZTU自动评教
// @namespace       https://github.com/xiaowhang/sztu-automated-course-evaluation
// @version         0.1.3
// @description     深圳技术大学自动评教——2024-2025-1
// @author          xiaowhang
// @match           https://jwxt.sztu.edu.cn/jsxsd/framework/xsMain.htmlx#*
// @match           https://jwxt.sztu.edu.cn/jsxsd/xspj/xspj_list.do*
// @match           https://jwxt.sztu.edu.cn/jsxsd/xspj/xspj_edit.do*
// @grant           none
// @license         MIT
// ==/UserScript==


const URLS = {
  MAIN: 'https://jwxt.sztu.edu.cn/jsxsd/framework/xsMain.htmlx#',
  LIST: 'https://jwxt.sztu.edu.cn/jsxsd/xspj/xspj_list.do',
  EDIT: 'https://jwxt.sztu.edu.cn/jsxsd/xspj/xspj_edit.do',
};

function handleListPage() {
  const urlList = [];

  const trList = document.querySelectorAll('tr');

  for (let i = 1; i < trList.length; i++) {
    const isDone = trList[i].children[5].children[0].value;
    if (isDone === '否') urlList.push(trList[i].children[7].children[0].getAttribute('href'));
    console.log(trList[i].children[2].textContent, trList[i].children[3].textContent);
  }

  if (urlList.length !== 0) {
    urlList.forEach(url => window.open(url));
  } else {
    alert('已完成所有评教，请点赞老师后及时提交！！！');
  }
}

function handleEditPage() {
  const tdList = document.querySelectorAll('[name="zbtd"]');
  console.info(tdList);
  for (const td of tdList) {
    td.children[0].click();
  }
  tdList[tdList.length - 2].children[2].click();

  const submit = document.getElementById('bc');
  submit.click();

  setTimeout(function () {
    window.close();
  }, 2000);
}

function main() {
  const currentUrl = location.pathname;

  if (URLS.LIST.includes(currentUrl)) {
    handleListPage();
  } else if (URLS.EDIT.includes(currentUrl)) {
    handleEditPage();
  }
}

main().catch(err => console.error('脚本执行出错:', err));
