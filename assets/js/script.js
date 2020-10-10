let b7Validator= {
    handleSubmit:(event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        b7Validator.clearErrors();

        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            let check = b7Validator.checkInput(input);
            if (check !== true) {
                send = false;
                b7Validator.showError(input, check);
            }
        }

        send = false;
        if (send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (const key in rules) {
               let rulesDetails = rules[key].split('=');

               switch (rulesDetails[0]) {
                   case 'required':
                       if (input.value == '') {
                           return 'Campo não pode ser vazio.';
                       }
                       break;
                   case 'min':
                        break;
               }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#f00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].style = '';
        }
        
        let errorElements = document.querySelectorAll('.error');
        for (let index = 0; index < errorElements.length; index++) {
            errorElements[index].remove();            
        }
    }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', b7Validator.handleSubmit)