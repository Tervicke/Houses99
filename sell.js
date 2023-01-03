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

submit_btn.addEventListener("click", function(el){

	document.getElementById("Errors").innerHTML = "";

	var input_fields = document.getElementsByClassName("input-fields");

	for(var i = 0 ; i < input_fields.length ; i++){

		if(input_fields[i].value == ""){
			document.getElementById("Errors").innerHTML = "Please fill the complete info!"
			break;
		}

		if(i == 1 || i == 4){

			if( !isNumeric(input_fields[i].value) ){
				console.log("works")
				document.getElementById("Errors").innerHTML = "Please fill the Correct info!"
				break;
			}

		}

	}

});

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

