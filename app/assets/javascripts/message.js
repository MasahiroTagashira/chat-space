$(function(){

  var buildHTML = function(message) {
    var message_infoTemplate = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="message__info">` + 
        `<div class="message__info--user-name">` + 
        message.user_name + 
        `</div>` + 
        `<div class="message__info--date">` + 
        message.created_at + 
        `</div>` + 
      `</div>`;

    if (message.content && message.image) {
      html = message_infoTemplate +
        `<div class="message__text">` + 
          `<p class="message__text__content">` + 
          message.content + 
          `</p>` + 
          `<img class="message__text__content--image", src=` + message.image + `>` + 
        `</div>` + 
      `</div>`
    } else if (message.content) {
      html = message_infoTemplate +
        `<div class="message__text">` + 
          `<p class="message__text__content">` + 
          message.content + 
          `</p>` + 
        `</div>` + 
      `</div>`
    } else if (message.image) {
      html = message_infoTemplate +
        `<div class="message__text">` + 
          `<img class="message__text__content--image", src=` + message.image + `>` + 
        `</div>` + 
      `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: "GET",
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("メッセージの同期に失敗しました");
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});