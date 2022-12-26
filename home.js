// loads the navbar
$(function(){
	$("#navbar-container").load("navbar.html");
});

$(window).on('load',function(){
	$.ajax({
		url :"http://127.0.0.1:5000/data",
		type:"GET",
		beforeSend: function(){
			loading_image = document.createElement('img'); 
			loading_image.setAttribute('id','loading');
			loading_image.src = "images/loading-gif.gif";
			document.body.appendChild(loading_image)
		},
		success: function(response , status) {
			document.getElementById('loading').remove()
			update_data(response)
			console.log("works");
		},
	})

})

function clicked(el){
	tile = el.target.parentNode
	console.log(tile.id)
}


function update_data(response){
	var tiles_list = [];
	var banners_list = [];
	var owners_list = [];
	var prices_list = [];
	for(var i = 0 ; i < response.length ; i++){
		tile = document.createElement('div');
		
		banner = document.createElement('img');
		owner = document.createElement('p');
		price = document.createElement('p');

		tile.addEventListener("click", function(el){
			clicked(el);
		});

		tile.setAttribute('class','tile')
		tile.setAttribute('id',i)
		banner.setAttribute('class','banner')
		owner.setAttribute('class','owner')
		price.setAttribute('class','price')

		owner.innerHTML = "@ " + response[i][1]
		price.innerHTML = "$ " + response[i][7]
		banner.src = "data:image/png;base64, " + response[i][6]

		tile.appendChild(banner)
		tile.appendChild(price)
		tile.appendChild(owner)

		banners_list.push(banner)

		owners_list.push(owner)
		tiles_list.push(tile)

		
		document.getElementById("tiles-container").appendChild(tile);
	}

}


