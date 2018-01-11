//open modal
function openInfoModal(){
	//clear previous data
	clearData();

	//find which element trigered the modal
	modalTriger = $(this).parents('.card').parent();
	//get the values from html
	var code = $(modalTriger).find('.flight_code').text();
	var price = $(modalTriger).find('.price').text().substr(2);//remove euro
	var ticketsCount = $(modalTriger).find('.ticketsCount').val();
	var path = $(modalTriger).find('.flight').text();

	//if requested tickets are available
	if( availabilityCheck(modalTriger,ticketsCount) ){
		//open modal
		$('#infoModal').modal('open');
		//set the values on modal
		$('#path').html(path);
		$('#flight_code').html(code);
		$('#seats_count').html(ticketsCount);
		$('#price').html(price*ticketsCount); 
	}else{
		$('#alertModal').find('h5').text('Sorry, the number of tickets you requested is not available.');
		$('#alertModal').find('p').html('');
		$('#alertModal').modal('open');
	}

	
}

//the availability check and age validation passed
//check the visa code
function submitInfoModal(){
	
	//clear previous data
	$('#visa').val('');
	$('#visa').off('focus');

	//close previous modal
	$('#infoModal').modal('close');
	//open modal
	$('#visaModal').modal('open');
}

async function submitVisaModal(){
	//NSA check if code is valid
	if( visaCheck($('#visa').val()) ){

		//change values on modal
		$('#visaModal').modal('close');
		$('#alertModal').find('h5').html("Confirmation completed succesfully!<br>");
		$('#alertModal').find('p').html(
				'Flight: ' + $('#path').text() + '<br>' 
				+ 'Surname: ' + $('#sname').val() + '<br>'  
				+ 'Firstname: ' + $('#name').val() + '<br>' 
				+ 'Birth date: ' + $('#datepicker').val() + '<br>' 
				+ 'Passport number: ' + $('#pass_num').val() + '<br>' 
				+ 'Flight code: ' + $('#flight_code').text() + '<br>'
				+ 'Total tickets: ' + $('#seats_count').text() + '<br>'
				+ 'Price: ' + $('#price').text() + '<br>'
				+ 'Visa code: ' + $('#visa').val() + '<br>'
				+ 'Flight code: ' + Math.random().toString().substring(2)
		);
		$('#alertModal').modal('open');

		//change availability on Trello
		var cards = await findCards();
		var avaliability = $(modalTriger).find('.avaliability').text().substr(16);
		console.log( parseInt(avaliability) - parseInt($('#seats_count').text()) );
		Trello.put("/cards/" + cards[modalTriger.attr('id')].id, { 
			desc:'Available Seats:'+ ( parseInt(avaliability) - parseInt($('#seats_count').text()) ) +'/100'
		});

		//add ticket on Trello's list 
		Trello.post("/cards/", { 
			name: 'Flight: ' + $('#path').text() + ', ' 
				+ 'sname ' + $('#sname').val() + ', '  
				+ 'name ' + $('#name').val() + ', ' 
				+ 'bdate ' + $('#datepicker').val() + ', ' 
				+ 'pass_num ' + $('#pass_num').val() + ', ' 
				+ 'flight_code ' + $('#flight_code').text() + ', '
				+ 'seats_count ' + $('#seats_count').text() + ', '
				+ 'price ' + $('#price').text() + ', '
				+ 'visa ' + $('#visa').val() + ', '
				+ 'Flight code: ' + Math.random().toString().substring(2), 
			desc: 'accepted',
			idList: '5a542a603da9420338791f93'
		});
	}
	else{
		//change values on modal
		$('#visaModal').modal('close');
		$('#alertModal').find('h5').html("Confirmation was not succesfull!<br>");
		$('#alertModal').find('p').html(
				'Flight: ' + $('#path').text() + '<br>' 
				+ 'Surname: ' + $('#sname').val() + '<br>'  
				+ 'Firstname: ' + $('#name').val() + '<br>' 
				+ 'Birth date: ' + $('#datepicker').val() + '<br>' 
				+ 'Passport number: ' + $('#pass_num').val() + '<br>' 
				+ 'Flight code: ' + $('#flight_code').text() + '<br>'
				+ 'Total tickets: ' + $('#seats_count').text() + '<br>'
				+ 'Price: ' + $('#price').text() + '<br>'
				+ 'Visa code: ' + $('#visa').val() + '<br>'
		);
		$('#alertModal').modal('open');

		//add ticket on Trello's list 
		Trello.post("/cards/", { 
			name: 'Flight: ' + $('#path').text() + ', '
				+ 'sname ' + $('#sname').val() + ', '  
				+ 'name ' + $('#name').val() + ', ' 
				+ 'bdate ' + $('#datepicker').val() + ', ' 
				+ 'pass_num ' + $('#pass_num').val() + ',' 
				+ 'flight_code ' + $('#flight_code').text() + ', '
				+ 'seats_count ' + $('#seats_count').text() + ', '
				+ 'price ' + $('#price').text() + ', '
				+ 'visa ' + $('#visa').val(), 
			desc: 'rejected',
			idList: '5a542a603da9420338791f93'
		});
	}
}

function clearData(){
	$('#sname').val('');
	$('#sname').off("focus");
	$('#name').val('');
	$('#name').off("focus");
	$('#datepicker').val('');
	$('#datepicker').off("focus");	
	$('#pass_num').val(''); 
	$('#pass_num').off("focus");
}

