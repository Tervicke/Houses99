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

function clicked(el , response){
	console.log(tile)
	tile = el.target.parentNode
	console.log(tile.id)
	document.getElementById('tiles-container').remove()
	view = document.createElement('div');
	view.setAttribute('id','view')
	document.body.appendChild(view)

	container =  document.createElement('div')
	container.setAttribute('id','container')
	document.getElementById('view').appendChild(container)

	image = document.createElement('img')
	image.setAttribute('id','view-image')

	document.getElementById('container').appendChild(image)
	image.src = "data:image/png;base64, " + response[tile.id][6]
	owners_info = document.createElement('div')
	owners_info.setAttribute('id','owners-info')
	owners_info.style.height = image.height.toString();
	container.appendChild(owners_info)

	owner_name = document.createElement('p')
	owner_name.innerHTML = "Name : " + response[tile.id][1]
	owner_name.setAttribute('id','owner-name')
	owners_info.appendChild(owner_name)

	owner_no= document.createElement('p')
	owner_no.innerHTML = "Contact : " + response[tile.id][2]
	owner_no.setAttribute('id','owner-no')
	owners_info.appendChild(owner_no)

	owner_adress= document.createElement('p')
	owner_adress.innerHTML = "Adress: " + response[tile.id][5]
	owner_adress.setAttribute('id','owner-adress')
	owners_info.appendChild(owner_adress)

	rent = document.createElement('p')
	rent.innerHTML = "Rent : $ " + response[tile.id][7]
	rent.setAttribute('id','rent')
	owners_info.appendChild(rent)

	email = document.createElement('button')
	email.setAttribute('id','email-btn')
	email.innerHTML = 'Email'
	owners_info.appendChild(email)


	rentnow = document.createElement('button')
	rentnow.setAttribute('id','rentnow-btn')
	rentnow.innerHTML = 'Rent now'
	owners_info.appendChild(rentnow)

	console.log(email)
	console.log('helloworld')
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
			clicked(el,response);
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


