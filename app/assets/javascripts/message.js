$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main_message_date" data-message-id=${message.id}>
         <div class="chat-main_message_date_info">
           <div class="chat-main_message_date_info_user-name">
             ${message.user_name}
           </div>
           <div class="chat-main_message_date_info_date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main_message_date_info_contents">
           <p class="chat-main_message_date_info_contents">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main_message_date" data-message-id=${message.id}>
         <div class="chat-main_message_date_info">
           <div class="chat-main_message_date_info_user-name">
             ${message.user_name}
           </div>
           <div class="chat-main_message_date_info_date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main_message_date_info_contents">
           <p class="chat-main_message_date_info_contents">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }


  $('#new_message').on('submit', function(e){
    console.log("new")
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("done")
      var html = buildHTML(data);
      $('.chat-main_message').append(html);
      $('form')[0].reset();
      $( ".form__submit").prop( "disabled", false );
      $('.chat-main_message').animate({ scrollTop: $('.chat-main_message')[0].scrollHeight},'fast');
    });
  });

    var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.chat-main_message_date:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main_message').append(insertHTML);
      $('.chat-main_message').animate({ scrollTop: $('.chat-main_message')[0].scrollHeight});
    }
  })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});