(function(){
  window.diaryApp = {};
  
  function request(options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', options.pathname, true);
    xhr.setRequestHeader('Content-Type', options.contentType || 'text/plain');
    xhr.addEventListener('load', () => {
      if (xhr.status < 400) {
        callback(null, xhr.responseText);
      } else {
        callback(new Error('Request failed: ' + xhr.statusText));
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Network error'));
    });
    xhr.send(options.body || null);
  }

  window.diaryApp.request = request;
})();
