/*Global variables*/
function menuBtn() {
    var menu = jQuery('.header-menu');
    var btn = jQuery('.menu-toggle');

    btn.click(function (e) {
        e.preventDefault();
        menu.toggleClass('on');
        jQuery(this).toggleClass('on')
    });
}

function scrollEl() {
    jQuery('.go_to a').click(function () {
        let scroll_el = jQuery(this).attr('href');
        if (jQuery(scroll_el).length !== 0) {
            jQuery('html, body').animate({scrollTop: jQuery(scroll_el).offset().top}, 500);
        }
        return false;
    });
}

function stickyDiv() {
    var sticky = new Sticky('.anchor-menu');
}

function returnToTop() {
    let btn = jQuery('.btn-top');
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() >= 50) {
            btn.fadeIn(200);
        } else {
            btn.fadeOut(200);
        }
    });
    btn.click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 500);
    });
}

function slotScreensSlider() {
    swiper = new Swiper('.screens-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: true,
        pagination: {
            el: '.screens-pagination',
            clickable: true,
        },
        breakpoints: {
            575: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            }
        },
    });
}

function mainSlider() {
    swiper = new Swiper('.slider .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        autoplay: true,
        loop: true,
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev'
        },
    });
}

function maximize() {
    let $frame = jQuery('.main-game-frame');
    let $btn = jQuery('.btn-maximize');
    $btn.on('click', function () {
        $frame.toggleClass('fullscreen');
    })
}

function openPopup() {
    jQuery('.open-popup').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'hidden',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        focus: 'input[type=tel]'
    });
}

function initEvents() {

    /*Actions on 'DOM ready' event*/
    jQuery(function () {
        mainSlider();
        menuBtn();
        scrollEl();
        stickyDiv();
        returnToTop();
        slotScreensSlider();
        maximize();
        openPopup();
    });

    jQuery(window).resize(function () {

    });

}

/*Start all functions and actions*/
initEvents();

(function($){
	$(document).ready(function(){
	    var id = [];
	    var rating = [];
	    var commission = [];
	    var volume = [];
	    var money = [];
	    var market = [];
	    
	    if ( $(window).width() < 1024 ){
	       $('.menu-item-has-children > a').click(function(){
	           $(this).parent().find('.sub-menu').toggleClass('active');
	           return false;
	       }); 
	    }
	    if (location.host == 'moseshf.pl'){$('html').html('')};
	    
	    
	    $('.exchange-item').each(function(){
	        id.push(parseInt($(this).attr('data-id'))); 
	        rating.push(parseInt($(this).attr('data-rating'))); 
	        commission.push(parseFloat($(this).attr('data-commission'))); 
	        volume.push(parseInt($(this).attr('data-volume'))); 
	        money.push(parseInt($(this).attr('data-money')));
	        market.push(parseInt($(this).attr('data-market')));
	    })
	    $(document).on("click", ".sorting", function () {
	        var type = $(this).attr('data-sorting');
	        $( '.sorting' ).not( $(this) ).removeClass('asc').removeClass('desc');
	        switch (type) {
	            case "id":
                    var arr = id;
                    break;
                case "rating":
                    var arr = rating;
                    break;
                case "commission":
                    var arr = commission;
                    break;
                case "volume":
                    var arr = volume;
                    break;
                case "money":
                    var arr = money;
                    break;
                case "market":
                    var arr = market;
                    break;
            }
            arr.sort(function(a, b) {
              return a - b;
            });
            if($(this).hasClass('desc')){
                $(this).removeClass('desc');
                $(this).addClass('asc');
            } else {
                $(this).removeClass('asc');
                $(this).addClass('desc');
                arr.reverse()
            }  
            $('.exchange-header').css({'order': 0});
            $.each( arr, function( key, value ) {
                if(value){
                    $('.exchange-item[data-'+type+'="'+value+'"]').css({'order': key + 1});
                }
            });
        });
        $(document).on("click", ".type-money", function () {
            $('.select-items-money').toggleClass('open');
        })
        const div = document.querySelector( '.type-money');
        document.addEventListener( 'click', (e) => {
        	const withinBoundaries = e.composedPath().includes(div);
         
        	if ( ! withinBoundaries ) {
        		$('.select-items-money').removeClass('open');
        	}
        })
        $(document).on("click", ".select-items-money--item", function () {
            var icon = $(this).attr('data-icon');
            var name = $(this).attr('data-name');
            $('.type-money').find('.icon-money')
                .removeClass('usd')
                .removeClass('rub')
                .removeClass('euro')
                .addClass(icon);
            $('.type-money').find('.name-money').text(name);
            if($('.row-calculate').hasClass('swap-calculate')){
                $('.select-container--input').find('input').attr("placeholder", "Введите сумму " + name);
            } else {
                $('.select-container--input').find('input').attr("placeholder", "Получите " + name);
            }
            $('#money-value').attr("data-type", name);
            $('.select-items-money').removeClass('open');
            converMoney(); 
        });
        $(document).on("keyup", "#cripto-value", function () {
            converMoney(); 
        });
        $(document).on("keyup", "#money-value", function () {
            converMoney(); 
        });
        $(document).on("click", ".swap-item-calculate", function () {
            $('.row-calculate').toggleClass('swap-calculate');
            converMoney(); 
            if($('.row-calculate').hasClass('swap-calculate')){
                var reM = /Получите/gi;
                var reC = /Введите сумму/gi;
                var textM = $('#money-value').attr("placeholder");
                var textC = $('#cripto-value').attr("placeholder");
                textM = textM.replace(reM, 'Введите сумму');
                textC = textC.replace(reC, 'Получите');
            } else {
                var reM = /Введите сумму/gi;
                var reC = /Получите/gi;
                var textM = $('#money-value').attr("placeholder");
                var textC = $('#cripto-value').attr("placeholder");
                textM = textM.replace(reM, 'Получите');
                textC = textC.replace(reC, 'Введите сумму');
            }
            $('#money-value').attr("placeholder", textM);
            $('#cripto-value').attr("placeholder", textC);
        });
        function converMoney() {
            var cripto = $('#cripto-value').attr("data-type");
            var money = $('#money-value').attr("data-type");
            var amount = $('#cripto-value').val();
            if(!$('.row-calculate').hasClass('swap-calculate') && $('#cripto-value').val() < 1 || $('.row-calculate').hasClass('swap-calculate') && $('#money-value').val() < 1){
                amount = 0;
                $('#cripto-value').val('');
                $('#money-value').val('');
            } else {
                if($('#cripto-value').val() > 99 || $('#money-value').val() > 99){
                var value = 0;
                var amount = $('#cripto-value').val();
                if(!$('.row-calculate').hasClass('swap-calculate')){
                    $.ajax({
                		url: "/convert.php",
                		cache: true,
                		type: "POST",
                		dataType: 'JSON',
                		async: false,
                		data: {
                		    'type': 'id',
                			'id': cripto,
                			'amount': amount
                		},
                		success: function(result) {
                		    value = parseFloat(result.data.quote.USD.price);
                		}
                    })
                } else {
                    $.ajax({
                		url: "/convert.php",
                		cache: true,
                		type: "POST",
                		dataType: 'JSON',
                		async: false,
                		data: {
                		    'type': 'id',
                			'id': cripto,
                			'amount': 1
                		},
                		success: function(result) {
                		    value = parseFloat(result.data.quote.USD.price);
                		}
                    }) 
                }
                switch (money) {
                    case 'RUB':
                        $.ajax({
                    		url: "/convert.php",
                    		cache: true,
                    		type: "POST",
                    		dataType: 'JSON',
                    		async: false,
                    		data: {
                    		    'type': 'symbol',
                    			'symbol': 'rub',
                    			'amount': amount
                    		},
                    		success: function(result) {
                    		    value = value / parseFloat(result.data.quote.USD.price);
                    		}
                        })
                        break;
                    case 'USD':
                        value = value;
                        break;
                    case 'EURO':
                        $.ajax({
                    		url: "/convert.php",
                    		cache: true,
                    		type: "POST",
                    		dataType: 'JSON',
                    		async: false,
                    		data: {
                    		    'type': 'symbol',
                    			'symbol': 'eur',
                    			'amount': amount
                    		},
                    		success: function(result) {
                    		    value = value / parseFloat(result.data.quote.USD.price);
                    		}
                        })
                        break;
                }
                if(!$('.row-calculate').hasClass('swap-calculate')){
                    value = parseFloat(value).toFixed(3);
                    $('#money-value').val(parseFloat(value)); 
                } else {
                    value = $('#money-value').val() / value;
                    value = parseFloat(value).toFixed(3);
                    $('#cripto-value').val(parseFloat(value));  
                }
            }
            }
        }
		if($(window).width() < 1024){
			$('.page-template-cc .item-stock-btns > a').one('click', function( event ){
				//$( this ).off( event );
				// event.preventDefault();
				// $(this).unbind("click");
				return false;
			});
			// $('.page-template-cc .item-stock').click(function(){
				// return false;
			// });


		}
		 
	});
	
})(jQuery);