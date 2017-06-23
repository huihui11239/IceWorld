$(function(){
	main_navs = $('.nav-item');
	sub_uls = $('.sub-nav-ul');

	function init(){
		sub_uls.each(function(){
			var items = $(this).find('.sub-nav-item');
			var num = items.length;
			items.width($(window).width()/num);
		});
	}

	main_navs.hover(function(){
		var sub = $(this).attr('sub-nav');
		if(sub){
			var sub_obj = $('.'+sub).eq(0);
			$('.sub-nav').fadeOut(300);
			sub_obj.fadeIn(400);
		}else{
			$('.sub-nav').fadeOut(300);
		}
		$('#nav-mask').fadeIn(200);
		
	},function(){})

	$('#nav-mask').mouseenter(function(){
		$('.sub-nav').fadeOut(300);
		$(this).fadeOut(400);
	})

	var tm;
	$(window).resize(function(){
		clearTimeout(tm);
		tm = setTimeout(init, 300);
	})

	init();
})
