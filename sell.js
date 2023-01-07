$(function(){
	$("#navbar-container").load("navbar.html");
});

const fileInput = document.getElementById('img-input');
fileInput.onchange = (event) => {
	var SelectedImage = event.target.files[0];
	var reader = new FileReader();
	var image;
	var preview_image = document.getElementById("img-preview");

	reader.onload = function(event) {
		preview_image.src = event.target.result;
	};
	reader.readAsDataURL(SelectedImage);
}

var submit_btn =document.getElementById('submit-btn')

submit_btn.addEventListener("click", async function(el){

	document.getElementById("Errors").innerHTML = "";

	var input_fields = document.getElementsByClassName("input-fields");

	if(check_for_errors(input_fields)){
		var values = {};
		for(var i = 0 ; i < input_fields.length ; i++){
			values[i] = input_fields[i].value;
		}
	}

	var InputImage= document.getElementById('img-input').files[0];

	var reader = new FileReader();
	let imageBase64Stringsep;
	var base64String;
	console.log("next");

	reader.onload = function () {
		base64String = reader.result.replace("data:", "")
			.replace(/^.+,/, "");

		console.log(typeof(base64String))
		values[5] = base64String
		imageBase64Stringsep = base64String;

	}
	reader.readAsDataURL(InputImage)
	await sleep(3000)
	ajax_post(values)
	errors = document.getElementById("Errors")
	errors.style.color = 'green';
	errors.innerHTML = "Success!"
	remove_values(input_fields)
})

function remove_values(input_fields){

for(var i = 0 ; i < input_fields.length ; i++){
			input_fields[i].value = "";
		}

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ajax_post(data){
	data[6] = "helloworld"
	console.log("posting")
	$.ajax({
		url: 'http://127.0.0.1:5000/repeat',
		dataType: 'json',
		type: 'post',
		contentType: 'application/json',
		data: JSON.stringify(data),
		processData: false,
		success: function( response , status){
			console.log(response)
		},
		error: function( jqXhr, textStatus, errorThrown ){
			console.log( errorThrown );
		}
	});
}

function check_for_errors(input_fields){
	for(var i = 0 ; i < input_fields.length ; i++){

		if(input_fields[i].value == ""){
			document.getElementById("Errors").innerHTML = "Please fill the complete info!"
			return false;
		}

		if(i == 1 || i == 4){

			if( !isNumeric(input_fields[i].value) ){
				console.log("works")
				document.getElementById("Errors").innerHTML = "Please fill the Correct info!"
				return false;
			}

		}

	}
	return true;
}
function isNumeric(value) {
	return /^-?\d+$/.test(value);
}
