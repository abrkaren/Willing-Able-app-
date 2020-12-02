// ---- STEP 1 JS ---- \\

// localStorage.clear()

// -- GET PUBLIC DATA --
window.onload = function() {
    countriesLength = countries.length;
	for (var i = 0;  i < countriesLength; i++) { // looping over the options
		var opt = document.createElement('option');
		opt.appendChild( document.createTextNode(countries[i].Country) );
		opt.value = countries[i].Country; 
		document.getElementById("country").appendChild(opt);
	}
	for (var i = 0;  i < countriesLength; i++) { // looping over the options
		var opt = document.createElement('option');
		opt.appendChild( document.createTextNode(countries[i].Country) );
		opt.value = countries[i].Country; 
		document.getElementById("shippingCountry").appendChild(opt);
	}
	initStep1();
}
// -- GET PUBLIC DATA --

// -- INIT STEP 1 --
function initStep1() {
	if(localStorage.getItem('step1FormConfirmed') == 'Y') {
		document.getElementById("firstName").value = JSON.parse(localStorage.getItem('step1Form')).firstName;
		document.getElementById("lastName").value = JSON.parse(localStorage.getItem('step1Form')).lastName;
		document.getElementById("country").value = JSON.parse(localStorage.getItem('step1Form')).country;
		document.getElementById("city").value = JSON.parse(localStorage.getItem('step1Form')).city;
		document.getElementById("address").value = JSON.parse(localStorage.getItem('step1Form')).address;
		document.getElementById("postalCode").value = JSON.parse(localStorage.getItem('step1Form')).postalCode;

		document.getElementById("shippingCountry").value = JSON.parse(localStorage.getItem('step1Form')).shippingCountry;
		document.getElementById("shippingCity").value = JSON.parse(localStorage.getItem('step1Form')).shippingCity;
		document.getElementById("shippingAddress").value = JSON.parse(localStorage.getItem('step1Form')).shippingAddress;
		document.getElementById("shippingPostalCode").value = JSON.parse(localStorage.getItem('step1Form')).shippingPostalCode;
	}
	if(localStorage.getItem('isUseFilledDataForShipping') == 'Y') {
		document.getElementById("cb1").checked = true
		document.getElementById("shippingCountry").disabled = true;
		document.getElementById("shippingCity").disabled = true;
		document.getElementById("shippingAddress").disabled = true;
		document.getElementById("shippingPostalCode").disabled = true;
	}
}
// -- INIT STEP 1 --

function onChangeFields(val, item) {
    if(localStorage.getItem('isUseFilledDataForShipping') === 'Y') {
		item == 'country' ? document.getElementById("shippingCountry").value = val : null;
		item == 'city' ? document.getElementById("shippingCity").value = val : null;
		item == 'address' ? document.getElementById("shippingAddress").value = val : null;
		item == 'postalCode' ? document.getElementById("shippingPostalCode").value = val : null;
	}
}

function useFilledDataForShipping(cb){
	localStorage['isUseFilledDataForShipping'] = cb.checked ? 'Y' : 'N';
	if(cb.checked) {
 		 document.getElementById("shippingCountry").value = document.getElementById("country").value;
 		 document.getElementById("shippingCountry").disabled = true;
 		 document.getElementById("shippingCity").value = document.getElementById("city").value;
 		 document.getElementById("shippingCity").disabled = true;
 		 document.getElementById("shippingAddress").value = document.getElementById("address").value;
 		 document.getElementById("shippingAddress").disabled = true;
 		 document.getElementById("shippingPostalCode").value = document.getElementById("postalCode").value;
 		 document.getElementById("shippingPostalCode").disabled = true;

 		requiredField(document.getElementById("shippingPostalCode"), 'shippingPostalCode')
	}else {
		document.getElementById("shippingCountry").disabled = false;
		document.getElementById("shippingCity").disabled = false;
		document.getElementById("shippingAddress").disabled = false;
		document.getElementById("shippingPostalCode").disabled = false;

		requiredField(document.getElementById("shippingPostalCode"), 'shippingPostalCode')
		// I can here reset input values but probably not worth it, this is not indicated in the task :)
	}
}

// -- FORM REQUIRED FIELDS (onblur function) --
function requiredField(input, val) {
    if (input.value.length < 1) {
        input.classList.add('error');
    }
    else if(document.getElementById("country").value && val == 'postalCode'){
       	countries.forEach(item => {
       		if(item.Country == document.getElementById("country").value){
                let foundRegex = input.value.match(item.Regex)
				if(foundRegex) {
					input.classList.remove('error')
					localStorage.setItem('isValidPostalCode', 'Y')
				}else{
					input.classList.add('error')
					localStorage['isValidPostalCode'] = 'N';
				}	
       		}
       	})
    }
    else if(document.getElementById("shippingCountry").value && val == 'shippingPostalCode'){
       	countries.forEach(item => {
       		if(item.Country == document.getElementById("shippingCountry").value){
                let foundRegex = input.value.match(item.Regex)
				if(foundRegex) {
					input.classList.remove('error')
					localStorage.setItem('isValidShippingPostalCode', 'Y')
				}else{
					input.classList.add('error')
					localStorage['isValidShippingPostalCode'] = 'N';
				}		
       		}
       	})
    }
    else{
        input.classList.remove('error');
    }
}
// -- FORM REQUIRED FIELDS (onblur function) --

function submitStep1Form() {
	let firstName = document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let country = document.getElementById("country");
	let city = document.getElementById("city");
	let address = document.getElementById("address");
	let postalCode = document.getElementById("postalCode");

	let shippingCountry = document.getElementById("shippingCountry");
	let shippingCity = document.getElementById("shippingCity");
	let shippingAddress = document.getElementById("shippingAddress");
	let shippingPostalCode = document.getElementById("shippingPostalCode");

	if(!firstName.value){
		firstName.classList.add('error')
		return false;
	}else firstName.classList.remove('error')

	if(!lastName.value){
		lastName.classList.add('error')
		return false;
	}else lastName.classList.remove('error')

	if(!country.value){
		country.classList.add('error')
		return false;
	}else country.classList.remove('error')

	if(!city.value){
		city.classList.add('error')
		return false;
	}else city.classList.remove('error')

	if(!address.value){
		address.classList.add('error')
		return false;
	}else address.classList.remove('error')

	if(postalCode.value && localStorage.getItem('isValidPostalCode') == 'Y') {
        postalCode.classList.remove('error')
	}else {
		postalCode.classList.add('error') // ++ 
		return false;
	}

	if(!shippingCountry.value){
		shippingCountry.classList.add('error')
		return false;
	}else shippingCountry.classList.remove('error')

	if(!shippingCity.value){
		shippingCity.classList.add('error')
		return false;
	}else shippingCity.classList.remove('error')

	if(!shippingAddress.value){
		shippingAddress.classList.add('error')
		return false;
	}else shippingAddress.classList.remove('error')

	if(shippingPostalCode.value && localStorage.getItem('isValidShippingPostalCode') == 'Y'){
		shippingPostalCode.classList.remove('error')
	}else {
		shippingPostalCode.classList.add('error')
		return false;
	}

	let step1Form = document.getElementById("form-step1")
	localStorage.setItem('step1FormConfirmed', 'Y')
	localStorage.setItem('step1Form', JSON.stringify({
		'firstName': firstName.value,
		'lastName': lastName.value,
		'country': country.value,
		'city': city.value,
		'address': address.value,
		'postalCode': postalCode.value,
		'shippingCountry': shippingCountry.value,
		'shippingCity': shippingCity.value,
		'shippingAddress': shippingAddress.value,
		'shippingPostalCode': shippingPostalCode.value
	}))
	
	step1Form.action = '../pages/step2.html';

}