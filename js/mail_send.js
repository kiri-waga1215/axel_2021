$(function() {
    // お問い合わせ送信
    $("#submit_btn").on("click", function() {
        $('#form__err').hide();
        // フォームの値を取得し、post_dataに詰める
        var form_data = $(".contact__form").serializeArray();
        var post_data = {};
        for (key in form_data) {
            post_data[form_data[key]["name"]] = form_data[key]["value"];
            $("[name="+form_data[key]["name"]+"]").removeClass("err");
        }
        // Ajax通信開始
        $.ajax({
            url: "/send",
            type: "POST",
            timeout: 100000,
            cache: false,
            data: JSON.stringify(post_data),
            contentType: 'application/json',
            dataType: 'json'
        }).done(function (response, textStatus, jqXHR) {
            if('errors' in response){
                // エラー表示
                var name_list = {
                    name: "お名前",
                    company: "会社名",
                    department: "部署名",
                    url: "会社URL",
                    email: "メールアドレス",
                    email_confirm: "確認用メールアドレス",
                    tel: "電話番号",
                    inquiry_type: "ご相談種別",
                    inquiry: "ご相談内容",
                };
                var reason_list = {
                    'confirm not matched': "確認用と入力を一致させてください",
                    'incorrect format': "正しい形式で入力してください",
                    '500 chars or less': "500文字以内で入力してください",
                };
                $("#form__err").html("入力内容をご確認ください。<br>");
                $("#form__err").show();
                $.each(name_list, function(key, name){
                    if(!(key in response.errors)) return;
                    $("[name="+key+"]").addClass("err");

                    messages = response.errors[key];
                    messages = $.map(messages, function(val){
                        var msg = "入力してください";
                        if(val in reason_list) msg = reason_list[val];
                        return msg;
                    });

                    $("#form__err").append(name+": "+messages.join('/')+"<br>");
                });
            } else {
                // 申込みIDセット
                if('request_id' in response){
                    $('#formResult').data('request_id', response.request_id);
                }
                // 正常終了
                $(".faq__inner").addClass("sending");
                $(".contact__form").addClass("sending");
                $("#submit_btn").addClass("sending");
                $('#form__err').hide();
                $('#formResult').load("/html/thanks.html");
                $('.contact__done').fadeIn(1000);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // エラー表示
            $("#form__err").text("通信ができませんでした。ネットワークに接続されていることを確認し、時間を置いて再度お試しください。");
            $("#form__err").show();
        }).always(function (data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
            // 共通
            $("#contact").attr("data-aos","");
            var href = '#contact';
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            position-=50;
            $('body,html').stop().animate({scrollTop: position}, 1500);
        });
    });
});
