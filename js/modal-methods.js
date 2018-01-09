//open modal
function openInfoModal(){
	//clear previous data
	clearData();

	//find which element trigered the modal
	var modalTriger = $(this).parents('.card').parent();
	//get the values from html
	var code = $(modalTriger).find('.flight_code').text();
	var price = $(modalTriger).find('.price').text().substr(2);//remove euro
	var ticketsCount = $(modalTriger).find('.ticketsCount').val();
	
	//if requested tickets are available
	if( availabilityCheck(modalTriger,ticketsCount) ){
		//open modal
		$('#infoModal').modal('open');
		//set the values on modal
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
		$('#alertModal').find('h5').text("Your flight code is ");
		$('#alertModal').find('p').html(Math.random().toString().substring(2));
		$('#alertModal').modal('open');
		//change availability on Trello
		// var cards = await findCards();
		// Trello.put("/cards/" + cards[modalTriger.attr('id')].id, { 
		// 	desc:''
		// });
		//add ticket on Trello's list 
		Trello.post("/cards/", { 
			name: 'sname ' + $('#sname').val() + ', '  
				+ 'name ' + $('#name').val() + ', ' 
				+ 'bdate ' + $('#datepicker').val() + ', ' 
				+ 'pass_num ' + $('#pass_num').val() + ', ' 
				+ 'flight_code ' + $('#flight_code').text() + ', '
				+ 'seats_count ' + $('#seats_count').text() + ', '
				+ 'price ' + $('#price').text() + ', '
				+ 'visa ' + $('#visa').val(), 
			desc: 'accepted',
			idList: '5a542a603da9420338791f93'
		});
	}else{
		$('#visaModal').modal('close');
		$('#alertModal').find('h5').text("Visa Code is not valid!");
		$('#alertModal').find('p').html('');
		$('#alertModal').modal('open');
		//change availability on Trello
		// var cards = await findCards();
		// Trello.put("/cards/" + cards[modalTriger.attr('id')].id, { 
		// 	desc:''
		// });
		//add ticket on Trello's list 
		Trello.post("/cards/", { 
			name: 'sname ' + $('#sname').val() + ', '  
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

