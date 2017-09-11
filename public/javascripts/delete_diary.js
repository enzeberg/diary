var deleteBtns = document.getElementsByClassName('del'); // Not Array

[].forEach.call(deleteBtns, (deleteBtn) => {
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // var targetDiaryTitle = deleteBtn.dataset.diaryTitle;
    var diaryId = deleteBtn.dataset.diaryId;
    diaryApp.request({
      method: 'DELETE',
      // pathname: `/diary/${targetDiaryTitle}`,
      pathname: `/diary/?id=${diaryId}`
    }, (err, responseText) => {
      if (err) {
        alert(err.toString());
      }
      console.log(responseText)
      var parsed = JSON.parse(responseText);
      if (parsed.retStatus === 'Success' && parsed.redirectTo) {
        window.location.href = parsed.redirectTo;
      }
    });
  });
});
