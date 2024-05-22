import debounce from "../../utils/debounce";

const paymentFormElement = document.querySelector('.paymentForm');

const initEventListeners = () => {
    paymentFormElement.addEventListener('submit', onFormSubmit);
    paymentFormElement.addEventListener('input', onInputChange);

    window.onbeforeunload = () => {
        removeEventListeners();
    };
};

const removeEventListeners = () => {
    paymentFormElement.removeEventListener('submit', onFormSubmit);
    paymentFormElement.removeEventListener('input', onInputChange);
}

const onFormSubmit = (event) => {
    event.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(function (el) {
        el.textContent = '';
    });

    const isValid = checkFormData();        

    if (isValid) {
        location.href = '/confirmation';
    }
};

const checkFormData = () => {
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        document.getElementById('nameError').textContent = 'Le nom est requis';
        isValid = false;
    }

    // Validate Card Number
    const cardNumber = document.getElementById('cardNumber').value;
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
        document.getElementById('cardNumberError').textContent = 'Le numéro de carte est invalide';
        isValid = false;
    }

    // Validate Expiry Date
    const expiryDate = document.getElementById('expiryDate').value;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
        document.getElementById('expiryDateError').textContent = 'La date d\'expiration est invalide';
        isValid = false;
    }

    // Validate CVV
    const cvv = document.getElementById('cvv').value;
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvv || !cvvRegex.test(cvv)) {
        document.getElementById('cvvError').textContent = 'Le CVV est invalide';
        isValid = false;
    }

    return isValid;
};

const onInputChange = (event) => {
    const input = event.target;
    const errorElement = document.getElementById(`${input.id}Error`);

    if (errorElement) {
        errorElement.textContent = '';
    }

    if (input.id === 'cardNumber') {
        debounce(updateCardType, 300);
    }
};

const getCardType = () => {
    const cardNumber = document.getElementById('cardNumber').value;

    if (!cardNumber) {
        return '';
    }

    return 'visa';
};

const updateCardType = () => {
    const cardType = getCardType(cardNumber);
    document.querySelector('.cardType').textContent = cardType;
};

export {
    initEventListeners
}