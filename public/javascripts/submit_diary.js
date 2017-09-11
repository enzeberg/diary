var form = document.querySelector('form');


form.addEventListener('submit', e => {
  e.preventDefault();
  var diaryText = form.elements.text.value;
  var saveBtn = document.querySelector('#save-btn');
  var saveBtnPurpose = saveBtn.dataset.purpose;
  var diaryId = saveBtn.dataset.diaryId;
  if (diaryText) {
    var diary = {
      title: form.elements.title.value, // The tittle of a diary can be empty.
      weather: form.elements.weather.value,
      text: diaryText
    };
    diaryApp.request({
      method: 'POST',
      pathname: saveBtnPurpose === 'Create' ? '/new_diary' : `/diary/edit/?id=${diaryId}`,
      contentType: 'application/json', // 若不设置，则服务器端的req.body为{}
      body: JSON.stringify(diary)
    }, (err, responseText) => {
      if (err) {
        alert(err.toString());
      } else {
        console.log('res: ', responseText);
        console.log(typeof responseText);
        var parsed = JSON.parse(responseText);
        if (parsed.retStatus === 'Success' && parsed.redirectTo) {
          window.location.href = parsed.redirectTo;
        }
      }
    });
  } else {
    alert('The text of a diary cannot be empty.');
  }

});