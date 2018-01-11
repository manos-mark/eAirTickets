
$(document).ready(function() {
	//load data from Trello
	loadFlights();	
	//add action listener to buttons
	$( "div.container" ).on('click','a.depA', function(){
		$('#depCity').html( 'Departure City: ' + $(this).text() );
		localStorage['depCity'] = $('#depCity').text().substring(16);
	});
	$( "div.container" ).on('click','a.arrA', function(){
		$('#arrCity').html( 'Arrival City: ' + $(this).text() );
		localStorage['arrCity'] = $('#arrCity').text().substring(14);
	});

	$( "div.container" ).on('click','a.changeIndex', function(){
		localStorage['depDate'] = $('#depDate').val();
		localStorage['arrDate'] = $('#arrDate').val();
		console.log(localStorage['depDate']);
	});

});


async function loadFlights(){
	var cards = await findCards();
	var flights = findFlights(cards);
	
	var deps = [];
	for( var fl of flights){
		deps.push(fl.departure);
	}
	var uniqueDeps = deps.filter( onlyUnique );
	for( let d of uniqueDeps ){
		$("#departure").append('<li><a class="depA">'+d+'</a></li>');
	}

	var arrs = [];
	for( var fl of flights){
		arrs.push(fl.arrival);
	}
	var uniqueArrs = arrs.filter( onlyUnique );
	for( let d of uniqueArrs ){
		$("#arrival").append('<li><a class="arrA">'+d+'</a></li>');
	}
}

function findFlights(cards){
	arr = [];
	for( let d of cards ){
		var infos = d.name.split(',');
		arr.push({
			departure : infos[0].substring(0,3),
			arrival : infos[0].substring(4,7)
		});
	}
	return arr;
}

//find all cards from Cards List
async function findCards(){
	var cards = await Trello.get("/lists/" + '5a22dff14bbbf07dff16afc4' + "/cards", function (list) {
		cards = list.slice();
	});
	return cards;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}