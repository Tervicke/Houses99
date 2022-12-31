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

function update_data(response){
	id = sessionStorage.getItem('clicked')
	document.getElementById('view-image').src = "data:image/png;base64, " + response[id][6]
	document.getElementById('owner-name').innerHTML = "Name : "+response[id][1]
	document.getElementById('owner-no').innerHTML = "Contact : "+response[id][2]
	document.getElementById('owner-adress').innerHTML = "Adress : " +response[id][5]
	document.getElementById('rent').innerHTML = "Rent : " +response[id][7]
	document.getElementById('container').style.display = 'block'
	console.log("helloworld")
}

