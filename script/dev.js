function handleListPage() {
  const urlList = [];
  const trList = document.querySelectorAll('tr');

  for (let i = 1; i < trList.length; i++) {
    const isDone = trList[i].children[5].children[0].value;
    if (isDone === '否') urlList.push(trList[i].children[7].children[0].getAttribute('href'));
    console.log(trList[i].children[2].textContent, trList[i].children[3].textContent);
  }

  if (urlList.length !== 0) {
    urlList.forEach(url => GM_openInTab(location.origin + url, { active: true }));
  } else {
    alert('已完成所有评教，请及时提交！！！');
  }
}

function handleEditPage() {
  const tdList = document.querySelectorAll('[name="zbtd"]');
  for (const td of tdList) {
    td.children[0].click();
  }
  tdList[tdList.length - 3].children[2].click();

  const submit = document.getElementById('bc');
  submit.click();
}

function main() {
  const currentUrl = location.pathname;

  if (currentUrl.includes('/jsxsd/xspj/xspj_list.do')) {
    handleListPage();
  } else if (currentUrl.includes('/jsxsd/xspj/xspj_edit.do')) {
    handleEditPage();
  }
}

main();
