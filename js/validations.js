function availabilityCheck(modalTriger,ticketsCount){
	//seperate only the first number (Available Seats:100/100)
	var arr = $(modalTriger).find('.avaliability').text().substr(16);
	var availableTickets= '';
	var i=0;

	while(arr[i] != '/'){
		availableTickets += arr[i];
		i++;
	}
	//return true if clients request is available
	return parseInt(ticketsCount) <= parseInt(availableTickets) ? true : false;
}

function visaCheck(code){
	if(code.length === 9){
		return true;
	}
	return false;	
}