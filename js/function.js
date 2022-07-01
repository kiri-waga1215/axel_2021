// アンカーリンク スムーススクロール
$('a[href^="#"]').click(function(){
	// 移動先を取得
	let href= $(this).attr("href");
	let $target = $(href.length > 1 ? href : 'html');
	// ヘッダーメニュー分の高さをずらして移動先設定
	let header_height = $(".header").height();
	let position = $target.offset().top - header_height;
	// スムーススクロール
	$('body, html').animate({scrollTop: position}, 800, 'swing');
	return false;
});

// 個人情報にチェックを入れたら、送信ボタンが押せるようにする
$(function() {
	var check = $('#check');
	check.click(function(e) {
		$('.contact__form__submit.-active').toggleClass('--show');
		$('.contact__form__submit.-disabled').toggleClass('--none');
	});
});

// PC 資料請求ボタンをContactを過ぎたら非表示にする
$(function(){
	$(window).scroll(function (){
		// 「fadeinが付いた要素1つずつ順番に処理
		$('.contact').each(function(){
			// ページの最上部から.fadeinまでの距離を取得
			var position = $(this).offset().top;
			// スクロールした量を取得
			var scroll = $(window).scrollTop();

			// ウィンドウの高さを取得
			// $(window).height();やinnerHeightだとiOSでズレる
			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

			// スクロールした量が.fadeinを過ぎたとき
			if (scroll > position - windowHeight + 200) {
				// .fadeinに.activeを付与
				$('.btn.-fix').addClass('active');
			}

		});
	});
});

// SP ハンバーガーメニュー
$(function() {
	$('.header__nav__list__item a').on('click', function(event) {
		$('#trigger').prop('checked', false);
	});
});