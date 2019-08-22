$(function () {

  $(window).on('load', function () {
    if (document.URL.match('messages')) {
      $('.content').ready(function () {
        $('.content').animate({
          scrollTop: $('.content')[0].scrollHeight
        }, 0);

      });
    }
  });







  $(".fa-image").click(function () {
    $("input[type='file']").trigger('click');
  });

  function buildHtml(data) {
    if (data.body && data.image) {
      var html = `<div class="post" data-id = ${data.id}>
                <p class="post__user">
                    ${data.user}
                  <span class="post__date">
                    ${data.created_at}
                  </span>
                </p>
                  <div class="post__content">
                    <p>${data.body}</p>
                    <img src = "${data.image}" >
                  </div>
              </div>`
      return html;

    }
    if (data.body) {
      var html = `<div class="post" data-id = ${data.id}>
                <p class="post__user">
                    ${data.user}
                  <span class="post__date">
                    ${data.created_at}
                  </span>
                </p>
                  <div class="post__content">
                    <p>${data.body}</p>

                  </div>
              </div>`
    }
    if (data.image) {
      var html = `<div class="post" data-id = ${data.id}>
                    <p class="post__user">
                      ${data.user}
                      <span class="post__date">
                      ${data.created_at}
                      </span>
                    </p>
                    <div class="post__content">
                      <img src="${data.image}">
                    </div>
                  </div>`
    }
    return html;

  }


  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
        url: url,
        type: 'Post',
        data: formdata,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function (data) {
        var html = buildHtml(data)
        $('.content').append(html);
        $('#message_body').val("");
        $('.formContent__input').val('');
        $('.content').animate({
          scrollTop: $('.content')[0].scrollHeight
        }, 'fast');
      })
      .fail(function () {
        alert("メッセージを入力してください");
      })
      .always(() => {
        $(".form__button").removeAttr("disabled");
      });
  });


  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.post:last').data('id')
    var room_id = $('.title').data('id')
    var url = `/rooms/${room_id}/api/messages`
    $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {
          id: last_message_id
        }
      })
      .done(function (messages) {
        var insertHTML = ''
        messages.forEach(function (message) {
          insertHTML = buildHtml(message);
          $('.content').append(insertHTML);
          $('.content').animate({
            scrollTop: $('.content')[0].scrollHeight
          }, 'fast');
        })
      })

      .fail(function () {
        console.log('error');
      });
  };






  $(window).on('load', function () {
    if (document.URL.match('messages')) {

      setInterval(reloadMessages, 5000);
    }
  });

});