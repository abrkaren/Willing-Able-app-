// ---- STEP 3 JS ---- \\

window.onload = function() {
	initStep3();
	document.getElementById('ccExpires').min = new Date().toISOString().split("T")[0];
}

// -- INIT STEP 3 --
function initStep3() {
    if(localStorage.getItem('step3FormConfirmed') == 'Y') {
        document.getElementById("cardNumber").value = JSON.parse(localStorage.getItem('step3Form')).cardNumber;
        document.getElementById("fullName").value = JSON.parse(localStorage.getItem('step3Form')).fullName;
        document.getElementById("ccCvc").value = JSON.parse(localStorage.getItem('step3Form')).ccCvc;
        document.getElementById("ccExpires").value = JSON.parse(localStorage.getItem('step3Form')).ccExpires;
    }
}
// -- INIT STEP 3 --

function checkCardNumber() {

	onlyNumberValidate(document.getElementById('cardNumber')); // -- ONLY NUMBERS VALIDATE FUNCTION --
	
	// -- ADD SPACE --
	let ccNumber = document.getElementById('cardNumber').value.split(" ").join(""); // remove hyphens
    if (ccNumber.length > 0) {
       ccNumber = ccNumber.match(new RegExp(/.{1,4}/g)).join(" ");
    }
    // there whe can analyze which type of card it is (need more details about carts)
    document.getElementById('cardNumber').value = ccNumber
    // -- ADD SPACE --

	ccNumber.length >= 19 ? document.getElementById('cardNumber').classList.remove('error') : document.getElementById('cardNumber').classList.add('error');;
	
}


// -- ONLY NUMBERS VALIDATE FUNCTION --
function onlyNumberValidate(input) {
	function setInputFilter(textbox, inputFilter) {
	  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
	    textbox.addEventListener(event, function() {
	      if (inputFilter(this.value)) {
	        this.oldValue = this.value;
	        this.oldSelectionStart = this.selectionStart;
	        this.oldSelectionEnd = this.selectionEnd;
	      } else if (this.hasOwnProperty("oldValue")) {
	        this.value = this.oldValue;
	        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	      } else {
	        this.value = "";
	      }
	    });
	  });
	}
	// Install input filters.
	setInputFilter(input, function(value) {
	    // return /^[\d\s]+$/.test(value); });
        return /^[\d\s]*$/.test(value); });
}
// -- ONLY NUMBERS VALIDATE FUNCTION --


function requiredField(input, val) {
	if(val == 'cc-fullName') {
		input.value.length >= 8 && input.value.length <= 99? input.classList.remove('error') : input.classList.add('error');
	}

	if(val == 'cc-cvc') {
		onlyNumberValidate(document.getElementById('ccCvc')); // -- ONLY NUMBERS VALIDATE FUNCTION --
		if(input.value.length > 2 && input.value.length <= 4) {
			input.classList.remove('error')
		}else {
			input.classList.add('error')
		}
	}

	if(val == 'cc-expires') {
		console.log(input.value)
	}
}

function goBackStep2Page() {
	location.href = "../pages/step2.html";
}

function submitStep3Form() {
	let cardNumber = document.getElementById("cardNumber");
    let fullName = document.getElementById("fullName");
    let ccCvc = document.getElementById("ccCvc");
    let ccExpires = document.getElementById("ccExpires");

    if(cardNumber.value && cardNumber.value.length == 19) {
        cardNumber.classList.remove('error')
    }else {
        cardNumber.classList.add('error')
        return false;
    }

    if(fullName.value.length >= 8 && fullName.value.length <= 99) {
        fullName.classList.remove('error')
    }else {
        fullName.classList.add('error')
        return false;
    }

    if(ccCvc.value.length > 2 && ccCvc.value.length <= 4) {
        ccCvc.classList.remove('error')
    }else {
        ccCvc.classList.add('error')
        return false;
    }

    if(ccExpires.value) {
        ccExpires.classList.remove('error')
    }else {
        ccExpires.classList.add('error')
        return false;
    }


    let step3Form = document.getElementById("form-step3")
    localStorage.setItem('step3FormConfirmed', 'Y')

    localStorage.setItem('step3Form', JSON.stringify({
        'cardNumber': cardNumber.value,
        'fullName': fullName.value,
        'ccCvc': ccCvc.value,
        'ccExpires': ccExpires.value
    }))
   
    step3Form.action = '../pages/register-successful.html';
  
}