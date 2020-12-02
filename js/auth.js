// ---- AUTH JS ---- \\

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
    else{
        input.classList.remove('error');
    }

}
// -- FORM REQUIRED FIELDS (onblur function) --

function submitLoginForm() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

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


    event.preventDefault();

    if(localStorage.getItem('api-header')) {
        let user = JSON.parse(localStorage.getItem('api-header'))
        // console.log(user)
        if(user.step2Form.email == email.value && user.step2Form.password == password.value) {
            alert('You have successfully logged:' + 'Email: ' + user.step2Form.email + ', firstName: ' + user.step1Form.firstName + ', lastName: ' + user.step1Form.lastName)
        }else {
            alert('Error...')
        }
    }
    

}