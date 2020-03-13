$(function(){ 
  function buildHTML(message){
    console.log(message)
   if ( message.image ) {
     var html =
      `<div class="chat-main_message_date">
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
      `<div class="chat-main_message_date">
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
    console.log(data)
    var html = buildHTML(data);
    $('.chat-main_message').append(html);
    $('form')[0].reset();
    $( ".form__submit").prop( "disabled", false );
    $('.chat-main_message').animate({ scrollTop: $('.chat-main_message')[0].scrollHeight},'fast');
    $('.form__message').val('');
    $('.hidden').val('');
  })
  .fail(function(){
          alert('"メッセージ送信に失敗しました"');
        })
      })
    });
