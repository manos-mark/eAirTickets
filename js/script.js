$(document).ready(function() {

	//load data from Trello
	loadCards();	
	
	//initialize all modals
	$('.modal').modal();

	//add action listener to cards button
	$( "div.container" ).on('click','a.modal-triger', openInfoModal);
	
	//add action listeners to modals buttons
	var infoForm = $('#infoModal').children();
	$(infoForm).submit(submitInfoModal);

	//add action listeners to modals buttons
	var visaForm = $('#visaModal').children();
	$(visaForm).submit(submitVisaModal);
});

//collect data from Json and display cards
async function loadCards(){
	// Retrieve the template data from the HTML (jQuery is used here).
	var template = $('#entry-template').html();
	// Compile the template loadData into a function
	var templateScript = Handlebars.compile(template);
	var cnt = 0;
	var cards = await findCards();

	for( let d of cards ){
		var infos = d.name.split(',');

		if( infos[0].substring(0,3) == localStorage['depCity'] 
			&& infos[0].substring(4,7) == localStorage['arrCity'] 
				&& infos[2].substring(1) == localStorage['depDate'] ){
			// Use the data that we need with handlebars
			var context = { "id": cnt, "flight": infos[0], "date":infos[2], "company":infos[4], "hours":infos[3], "code":infos[5], "price":infos[1], "avaliability": d.desc };
			var html = templateScript(context);
			// Insert the HTML code into the page
			$("#entry-template").append(html);
			//append the new card
			$("#main").append(html);	
			cnt++;
		}
	}

  	lastId = countId = cnt;
	//set the quotes count 
	$('#count').text(countId);

	loadPagination(countId);//needs to be done after the card elements are ready
}

//find all cards from Cards List
async function findCards(){
	var cards = await Trello.get("/lists/" + '5a22dff14bbbf07dff16afc4' + "/cards", function (list) {
		cards = list.slice();
	});
	return cards;
}