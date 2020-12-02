
// ---- STEP 2 JS ---- \\

window.onload = function() {
    initStep2();
}

// -- INIT STEP 2 --
function initStep2() {
    if(localStorage.getItem('step2FormConfirmed') == 'Y') {
        console.log(JSON.parse(localStorage.getItem('step2Form')))
        document.getElementById("email").value = JSON.parse(localStorage.getItem('step2Form')).email;
        document.getElementById("password").value = JSON.parse(localStorage.getItem('step2Form')).password;
        document.getElementById("rePassword").value = JSON.parse(localStorage.getItem('step2Form')).rePassword;

        document.getElementById("cb2").checked = JSON.parse(localStorage.getItem('step2Form')).standartPackage;
        document.getElementById("cb3").checked = JSON.parse(localStorage.getItem('step2Form')).premiumPackage;
       
    }
}
// -- INIT STEP 2 --

// -- FORM REQUIRED FIELDS (onblur function) --
function requiredField(input, val) {

    if (input.value.length < 1) {
        input.classList.add('error');
    }
    else if(val == 'email'){
    	let emailRegex = input.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
			if(emailRegex) {
				input.classList.remove('error')
			}else{
				input.classList.add('error')
			}	
    }
    else if(val == 'password') {
        if(input.value.length >= 4) {
        	input.classList.remove('error');
        }else {
            input.classList.add('error');
        }
    }
    else if(val == 'rePassword') {
        if(input.value.length >= 4 && input.value == document.getElementById('password').value) {
        	input.classList.remove('error');

        }else {
            input.classList.add('error');
        }
    }
    else{
        input.classList.remove('error');
    }

}
// -- FORM REQUIRED FIELDS (onblur function) --

function goBackStep1Page() {
	location.href = "../pages/step1.html";
}

function submitStep2Form() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let rePassword = document.getElementById("rePassword");

    let cb2 = document.getElementById("cb2");
    let cb3 = document.getElementById("cb3");

    let emailReg = email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(email.value && emailReg) {
        email.classList.remove('error')
    }else {
        email.classList.add('error')
        return false;
    }

    if(password.value && password.value.length >= 4) {
        password.classList.remove('error')
    } else {
        password.classList.add('error')
        return false;
    }

    if(rePassword.value && rePassword.value.length >= 4 && rePassword.value == password.value) {
        rePassword.classList.remove('error')
    } else {
        rePassword.classList.add('error')
        return false;
    }

    if(cb2.checked || cb3.checked) {
        document.getElementById('cb2-error-handler').classList.remove('cb-error')
        document.getElementById('cb3-error-handler').classList.remove('cb-error')
    }else {
        document.getElementById('cb2-error-handler').classList.add('cb-error')
        document.getElementById('cb3-error-handler').classList.add('cb-error')
        return false;
    }

    let step2Form = document.getElementById("form-step2")
    localStorage.setItem('step2FormConfirmed', 'Y')
    localStorage.setItem('step2Form', JSON.stringify({
        'email': email.value,
        'password': password.value,
        'rePassword': rePassword.value,

        'standartPackage': cb2.checked,
        'premiumPackage': cb3.checked
    }))
    
    step2Form.action = '../pages/step3.html';
}