$(document).ready(function() {

	//load data from json
	loadData();	

	//initialize all modals
	$('.modal').modal();

	//add action listeners to card buttons 
	$( "div.container" ).on('click','a.modal-triger', openInfoModal);
	
	//add action listeners to modals buttons
	// $('#formatButton').on('click', submitInfoModal);
	var infoForm = $('#infoModal').children();
	$(infoForm).submit(submitInfoModal);

	//add action listeners to modals buttons
	// $('#confirmButton').on('click', submitVisaModal);
	var visaForm = $('#visaModal').children();
	$(visaForm).submit(submitVisaModal);
});




//collect data from Json and display cards
async function loadData(){
	// Retrieve the template data from the HTML (jQuery is used here).
	var template = $('#entry-template').html();
	// Compile the template loadData into a function
	var templateScript = Handlebars.compile(template);
	var id = 0;

	var cards = await findCards();

	for( let d of cards ){
		await Trello.get('cards/' +d.id+ '/attachments', function(attachments){
			var infos = d.name.split(',');

			// Use the data that we need with handlebars
			var context = { "id": id, "flight": infos[0], "date":infos[2], "company":infos[4], "hours":infos[3], "code":infos[5], "price":infos[1], "avaliability": d.desc };
			var html = templateScript(context);
			// Insert the HTML code into the page
			$("#entry-template").append(html);
			//append the new card
			$("#main").append(html);	
		})
		id++;
	}

  	lastId = countId = id; //count is equal with the last id given
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