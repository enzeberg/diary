var deleteAllBtn = document.querySelector('.deleteAll');
var popup = document.querySelector('.popup');
var deleteAllConfirmBtn = popup.querySelector('#delete-all-confirm'),
    deleteAllCancelBtn = popup.querySelector('#delete-all-cancel');

deleteAllBtn.addEventListener('click', (e) => {
  var diaryItem = document.querySelector('li.diary');

  // If there's no diary list item, the "Delete all" confirmation popup won't be displayed.
  if (diaryItem) {
    popup.style.display = 'block';
  }

});

deleteAllConfirmBtn.addEventListener('click', (e) => {
  diaryApp.request({
    method: 'DELETE',
    pathname: '/'
  }, (err, responseText) => {
    if (err) {
      alert(err.toString());
    }
    var parsed = JSON.parse(responseText);
    if (parsed.retStatus === 'Success' && parsed.redirectTo) {
      window.location.href = parsed.redirectTo;
    }
  });
});

deleteAllCancelBtn.addEventListener('click', (e) => {
  popup.style.display = 'none';
});