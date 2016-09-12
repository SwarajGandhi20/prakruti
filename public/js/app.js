$(document).ready(function() {
  $('.btn.gw-btn').click(function() {
    var email = $('#email').val();
    var dataObj = {
      email : email
    };
    $.ajax({
      method: 'POST',
      url: '/subscribe',
      contentType: 'application/json',
      data: JSON.stringify(dataObj)
    })
    .done(function() {
      console.log("success data");
    })
    .fail(function() {
      console.log("fail to post data.");
    })
  })
});
