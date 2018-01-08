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
		$('#flight_code').text('Flight Code: ' + code);
		$('#seats_count').text('Total Tickets: ' + ticketsCount);
		$('#price').text('Total Cost: ' + price*ticketsCount +'€'); 
	}else{
		$('#alertModal').find('p').text('Sorry, the number of tickets you requested is not available.');
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

function submitVisaModal(){
	//NSA check if code is valid
	if( visaCheck($('#visa').val()) ){
		$('#visaModal').modal('close');
		$('#alertModal').find('p').text("Your flight code is "+Math.random().toString().substring(2));
		$('#alertModal').modal('open');
	}else{
		$('#visaModal').modal('close');
		$('#alertModal').find('p').text("Visa Code is not valid!");
		$('#alertModal').modal('open');
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

