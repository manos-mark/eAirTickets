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


//open format modal
function openModal(){
	//find which element trigered the modal 
	//find the root parent 
	modalTriger = $(this).parents('.card').parent();

	//open modal
	$('#modalFormat').modal('open');

	// // find the children with class flight and get the value
	// var trigerTitle = $(modalTriger).find('.flight').text();
	// $('#image_title').val(trigerTitle);

	// //find the children with class card-content and get the text
	// var trigerContent = $(modalTriger).find('.card-content').children().text();
	// $('#image_description').val(trigerContent);

}

//format modal
function submitModal(){
	// // // find the children with class card-title and set the value
	// $(modalTriger).find('.card-title')
	// 							.text( $('#image_title').val() );
	// // //find the children with class card-content and set the text	
	// $(modalTriger).find('.card-content').children()
	// 							.text( $('#image_description').val() );

	// Materialize.toast('Card ' + modalTriger.attr('id') + ' Formated!', 4000);	

}

function clearData(){
	 // $('#add_image_title').val('');
	 // $('#add_image_title').off( "focus" );
	 // $('#add_image_description').val('');
	 // $('#add_image_description').off( "focus" );
}

