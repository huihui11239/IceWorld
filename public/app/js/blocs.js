// Loading page complete
$(window).load(function()
{
	checkHero(); // Check hero height is correct
	animateWhenVisable();  // Activate animation when visable	
});

var setFullPage = function(obj,width,height){
		function set(){
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			var bili = winWidth/winHeight;
			var ybili = width/height;
			if(bili>=ybili){
				//窗口过宽
				obj.width(winWidth).height('auto');
				obj.css({'top':-(winWidth/ybili - winHeight)/2,'left':0});
			}else{
				//窗口过高
				obj.height(winHeight).width('auto');
				obj.css({'left':-(winHeight*ybili - winWidth)/2,'top':0});
			}
		}
		$(window).resize(function(){set();});
		set();
}

// Page ready
$(document).ready(function()
{
	$('.hero').css('height', $(window).height()+'px'); // Set initial hero height
	$('#video-bg').height($(window).height()+5);
	setFullPage($('#video-bg video'),1920,1080);
	$('#scroll-hero').click(function()
	{
		$('html,body').animate({scrollTop: $("#hero-bloc").height()+200}, 'slow');
	});
	//冰块视差滚动
	$(window).scroll(function(){
		$('.front').css('top',-$(window).scrollTop()*0.4);
		$('.back').css('top',-$(window).scrollTop()*0.15);
	});
	//元素入场动画
	window.scrollReveal = new scrollReveal({ reset: true, move: '50px'});
});

// Window resize 
$(window).resize(function()
{		
	$('.hero').css('height',getHeroHeight()+'px'); // Refresh hero height  	
	$('#video-bg').height(getHeroHeight());
}); 
 
// Get Hero Height
function getHeroHeight()
{
	var H = $(window).height(); // Window height
	
	if(H < heroBodyH) // If window height is less than content height
	{
		H = heroBodyH+100;
	}
	return H
}

// check hero height
function checkHero()
{
	P = parseInt($('.hero-nav').css('padding-top'))*2
	window.heroBodyH = $('.hero-nav').outerHeight()+P+$('.v-center').outerHeight()+50; // Set hero body height
	$('.hero').css('height', getHeroHeight() + 'px'); // Set hero to fill page height
}

// Scroll to target
function scrollToTarget(D)
{
	if(D == 1) // Top of page
	{
		D = 0;
	}
	else if(D == 2) // Bottom of page
	{
		D = $(document).height();
	}
	else // Specific Bloc
	{
		D = $(D).offset().top;
	}

	$('html,body').animate({scrollTop:D}, 'slow');
}

// Initial tooltips
$(function()
{
  $('[data-toggle="tooltip"]').tooltip()
})


// Animate when visable
function animateWhenVisable()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initail check on page load
	
	$(window).scroll(function()
	{		
		inViewCheck(); // Check object visability on page scroll
		scrollToTopView(); // ScrollToTop button visability toggle
	});		
};

// Hide all animation elements
function hideAll()
{
	$('.animated').each(function(i)
	{	
		if(!$(this).closest('.hero').length) // Dont hide hero object
		{
			$(this).removeClass('animated').addClass('hideMe');
		}
	});
}

// Check if object is inView
function inViewCheck()
{	
	$($(".hideMe").get().reverse()).each(function(i)
	{	
		var target = jQuery(this);

		a = target.offset().top + target.height();
		b = $(window).scrollTop() + $(window).height();
		
		if (a < b) 
		{	
			var objectClass = target.attr('class').replace('hideMe' , 'animated');
			target.css('visibility','hidden').removeAttr('class');
			setTimeout(function(){target.attr('class',objectClass).css('visibility','visable');},0.01);				
		}
	});
};

// ScrollToTop button toggle
function scrollToTopView()
{
	if($(window).scrollTop() > $(window).height()/3)
	{	
		if(!$('.scrollToTop').hasClass('showScrollTop'))
		{
			$('.scrollToTop').addClass('showScrollTop');
		}	
	}
	else
	{
		$('.scrollToTop').removeClass('showScrollTop');
	}
};