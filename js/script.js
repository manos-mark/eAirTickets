$(document).ready(function() {

	//load data from json
	loadData();	

	//initialize all modals
	$('.modal').modal();

	//add action listeners to card buttons 
	$( "div.container" ).on('click','a.modal-triger', openModal);
	
	//add action listeners to modals buttons
	$('#formatButton').on('click', submitModal);

});



//collect data from Json and display cards
function loadData(){
	// Retrieve the template data from the HTML (jQuery is used here).
	var template = $('#entry-template').html();
	// Compile the template loadData into a function
	var templateScript = Handlebars.compile(template);

	//find all cards from Cards List
	Trello.get("/lists/" + '5a22dff14bbbf07dff16afc4' + "/cards", function (resp) {
		var id = 0;
		resp.forEach(function(d){

			Trello.get('cards/' +d.id+ '/attachments', function(attachments){
				var infos = d.name.split(',');

				// Use the data that we need with handlebars
				var context = { "flight": infos[0], "date":infos[2], "company":infos[4], "hours":infos[3], "code":infos[5], "price":infos[1], "avaliability": d.desc };
				var html = templateScript(context);
				// Insert the HTML code into the page
				$("#entry-template").append(html);
				//append the new card
				$("#main").append(html);
				
			})
			  
			id++;
		})

      	lastId = countId = id; //count is equal with the last id given
		//set the quotes count 
		$('#count').text(countId);

		loadPagination(countId);//needs to be done after the card elements are ready

    }, function (error) { console.log("error:", error) });
}


//open modal
function openModal(){
	//clear previous data
	clearData();

	//find which element trigered the modal
	var modalTriger = $(this).parents('.card').parent();

	//open modal
	$('#modalFormat').modal('open');

	//set the values on modal
	var code = $(modalTriger).find('.flight_code').text();
	$('#flight_code').text('Flight Code: ' + code);

	var price = $(modalTriger).find('.price').text().substr(2);//remove euro
	var ticketsCount = $(modalTriger).find('.ticketsCount').val();
	$('#seats_count').text('Total Tickets: ' + ticketsCount);
	$('#price').text('Total Cost: ' + price*ticketsCount +'€'); 
}

//submit modal
function submitModal(){
	// var bdate = $('#datepicker').val();
	
	// if( validateAge(bdate) ){
		
	// }else{

	// }

	// Materialize.toast('Card ' + modalTriger.attr('id') + ' Formated!', 4000);	
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

