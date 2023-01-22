const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const showPopup = (popup) => popup.style.display = 'flex';
const closePopup = (popup) => popup.style.display = 'none';

const saveBalconyParameters = (value, el) => {
    let key = el.getAttribute('id') ? el.getAttribute('id') : Object.keys(el.dataset)[0];
    if (key) {
        localStorage.setItem(key, value);
    }   
};

function validateInput(value, input, type) {
    const onlyNumbersRegex = /^[0-9]+$/;
    let checkForPhone = onlyNumbersRegex.test(value) && value.length > 7 && value.length <= 10,
        checkForSize = onlyNumbersRegex.test(value),
        checkForName = value.length < 3 || value.length > 15;

    if (value === '') {
        input.style.border = '';
    } else if (type === 'number' ? !checkForPhone : type === 'size' ? !checkForSize : checkForName) {
        input.style.border = '1px solid red';
    } else {
        input.style.border = '1px solid green';
    }

    saveBalconyParameters(value, input);
};

function clearAllFieldsAfterPost(fieldsArr) {
    fieldsArr.forEach(field => field.style.border = '');
};

function activateNextStep(inputs) {
    clearAllFieldsAfterPost(inputs);

    modal('.popup_calc_profile', '.popup_calc_button' , '.popup_calc_profile_close');
}

export {postData};
export {getResources};
export {showPopup};
export {closePopup};
export {validateInput};
export {clearAllFieldsAfterPost};
export {saveBalconyParameters};