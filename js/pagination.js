//add pagination and listeners
function loadPagination(cnt){
	const cardsPerPage = 4;
	var howManyPages = Math.ceil( cnt / cardsPerPage );

	//set always on start p1 active and visible 
	$('body').on('click', '#p1', function(){
			setActive($(this));
			setCardsInvisible();
			setCardsVisible(0, cardsPerPage-1);
			$('#leftArrow').addClass('disabled');

			//if there is only one page disable the arrow 
			if( $('.pagination li').length == 3){// 3 li (two arrows and one page)
				$('#rightArrow').addClass('disabled');
			}else{
				$('#rightArrow').removeClass('disabled');
			}
	});

	//add rest list elements and listeners
	for( let i=2; i<=howManyPages; i++){//let keyword makes the i variable local to the loop instead of global
		$('.pagination').append('<li class=".page waves-effect"><a id=p' +i+ ' href="#">' +i+ '</a></li>');
		
		$('body').on('click', '#p'+i,function(){
			
			setActive($(this));
			setCardsInvisible();
			setCardsVisible(i*cardsPerPage-cardsPerPage, i*cardsPerPage-1);
			$('#leftArrow').removeClass('disabled');
			
			//if is the last page disable the arrow
			if( $(this).attr('id') == 'p'+howManyPages ){//if this is the last page
				$('#rightArrow').addClass('disabled');
			}else{
				$('#rightArrow').removeClass('disabled');
			}

		});
	}

	//add the right arrow
	$('.pagination').append('<li id="rightArrow" class="waves-effect"><a href="#"><i class="material-icons">chevron_right</i></a></li>');

	//triger to reveal the first elements
	$('#p1').click();
	
	//left arrow listener
	$('body').on('click', '#leftArrow', function(){
		if( !$(this).hasClass('disabled') ){
			var currentActive = $(this).siblings('.active');
			$(currentActive).removeClass('active');
			$(currentActive).prev().addClass('active');
			$(currentActive).prev().children().click();
		}
	});

	//right arrow listener
	$('body').on('click', '#rightArrow', function(){
		if( !$(this).hasClass('disabled') ){
			var currentActive = $(this).siblings('.active');
			$(currentActive).removeClass('active');
			$(currentActive).next().addClass('active');
			$(currentActive).next().children().click();
		}
	});
	

	function setActive(p){
		$(p).parent().addClass('active');
		$(p).parent().siblings().removeClass('active');
	}

	function setCardsVisible(min,max){
		$('.cell').each(function(i,obj){
			if( $(obj).attr('id')>=min && $(obj).attr('id')<=max ){
				$(obj).fadeIn('slow');
			}
		});
	}

	function setCardsInvisible(){
		$('.cell').each(function(i,obj){
			$(obj).css('display','none');
		});
	}

}