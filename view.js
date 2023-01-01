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
			update_data(response);
		},
	})
})
function clicked(el, suggestion_data){
	
	tile = el.target.parentNode
	if(parseInt(tile.id) - 1 < 0){
		console.log(parseInt(tile.id))
		sessionStorage.setItem('clicked', suggestion_data[parseInt(tile.id)][0] - 1)
		window.location.href="http://localhost:8000/view.html"
	}
	else{
		sessionStorage.setItem('clicked', suggestion_data[parseInt(tile.id)-1][0])
		window.location.href="http://localhost:8000/view.html"
}
}


function update_data(response){
	id = sessionStorage.getItem('clicked')
	console.log(id)
	document.getElementById('view-image').src = "data:image/png;base64, " + response[id][6]
	document.getElementById('owner-name').innerHTML = "Name : "+response[id][1]
	document.getElementById('owner-no').innerHTML = "Contact : "+response[id][2]
	document.getElementById('owner-adress').innerHTML = "City : " +response[id][5]
	document.getElementById('rent').innerHTML = "Rent : " +response[id][7]
	document.getElementById('container').style.display = 'block'
	document.getElementById('suggestions-title').innerHTML = "See More in " + response[id][5]
	console.log("helloworld")
	$.ajax({
		url :"http://127.0.0.1:5000/City/\""+response[id][5]+"\"",
		type:"GET",
		beforeSend: function(){
		},
		success: function(suggestion_data, status) {
			console.log(suggestion_data)

			for(var i = 0 ; i < suggestion_data.length ; i++){

				if((suggestion_data[i][0]-1) === parseInt(id)){
				}
				else{
					tile = document.createElement('div')
					tile.setAttribute('class','tile')
					tile.setAttribute('id',i)
					document.getElementById('suggestions').appendChild(tile);

					tile.addEventListener("click", function(el){
						clicked(el,suggestion_data);
					});

					banner = document.createElement('img')
					banner.setAttribute('class','banner')
					banner.src = "data:image/png;base64, " + suggestion_data[i][6]
					tile.appendChild(banner)

					price = document.createElement('p')
					price.setAttribute('class','price')
					price.innerHTML = "$ " +suggestion_data[i][7]
					tile.appendChild(price)

					owner = document.createElement('p')
					owner.setAttribute('class','owner')
					owner.innerHTML = "@ " + suggestion_data[i][1]
					tile.appendChild(owner)


				}
			}

		},

	})

}


