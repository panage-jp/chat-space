$(function () {

  function appendName(name) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name" >${name['name']} </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${name['id']}" data-user-name="${name['name']}">追加</div>
                </div>`
    $('#user-search-result').append(html);

  }




  function appendUser(user) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]'   type='hidden' value='${user["id"]}'>
                  <p class='chat-group-user__name' id='chat-group-user-id' >${user["name"]}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#group-user').append(html);
  }




  $('#user-search-field').on('keyup', function () {
    var input = $(this).val()
    $.ajax({
        type: 'GET',
        url: '/users',
        data: {
          keyword: input
        },
        dataType: 'json'
      })

      .done(function (names) {
        $('#user-search-result').empty();
        var array = []
        for (var i = 0; i < $('.chat-group-user').find('#chat-group-user-id').length; i++) {
          array.push($('.chat-group-user').find('#chat-group-user-id').eq(i).text())
        };
        if (names.length != 0) {
          names.forEach(function (name) {
            var result = array.indexOf(name['name'])
            if (result === -1) {
              appendName(name);
            };
          });
        };

      })
      .fail(function () {
        alert("error")
      });
  });



  $(document).on("click", ".chat-group-user__btn--add", function () {
    var user = {
      id: $(this).attr("data-user-id"),
      name: $(this).attr("data-user-name")
    }
    $(this).parent().remove()
    appendUser(user);
  })

  $(document).on("click", ".chat-group-user__btn--remove", function () {
    $(this).parent().remove()


    var input = $("#user-search-field").val()
    $.ajax({
        type: 'GET',
        url: '/users',
        data: {
          keyword: input
        },
        dataType: 'json'
      })

      .done(function (names) {
        $('#user-search-result').empty();
        var array = []
        for (var i = 0; i < $('.chat-group-user').find('#chat-group-user-id').length; i++) {
          array.push($('.chat-group-user').find('#chat-group-user-id').eq(i).text())
        };
        if (names.length != 0) {
          names.forEach(function (name) {
            var result = array.indexOf(name['name'])
            if (result === -1) {
              appendName(name);
            };
          });
        };

      })
      .fail(function () {
        alert("error")
      })



  })
});