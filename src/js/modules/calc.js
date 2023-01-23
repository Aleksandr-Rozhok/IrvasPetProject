import { validateInput } from "../services/services";
import { clearAllFieldsAfterPost } from "../services/services";
import { saveBalconyParameters } from "../services/services";
import { closePopup } from "../services/services";
import { showPopup } from "../services/services";

function calc() {
    const calcPopup = document.querySelector('.popup_calc'),
          calcProfilePopup = document.querySelector('.popup_calc_profile'),
          balconyIcons = calcPopup.querySelectorAll('.balcon_icons_img'),
          bigBalconyImg = calcPopup.querySelectorAll('.big_img img'),
          balconySize = calcPopup.querySelectorAll('[data-size]'),
          buttonFurther = calcPopup.querySelector('.popup_calc_button');
          localStorage.setItem("type", "Тип1");

    function activeBalconyImg(e, defaultVal = balconyIcons[0]) {
        let currImg = e ? e.target : defaultVal;
        balconyIcons.forEach(img => img.classList.remove('do_image_more'));
        bigBalconyImg.forEach(img => img.style.display = 'none');

        if (currImg instanceof HTMLImageElement) {
            currImg.parentElement.classList.add('do_image_more');

            bigBalconyImg.forEach(img => {
                if (img.getAttribute('alt') === currImg.alt) {
                    img.style.display = 'flex';
                    saveBalconyParameters(img.getAttribute('alt'), img);
                }
            })
        }
    }

    function activateCalcProfilePopup() {
        let validateCheck = true;

        balconySize.forEach(input => {
            if (!validateInput(input.value, input, 'size')) {
                validateCheck = false;
            }
        });

        if (validateCheck) {
            clearAllFieldsAfterPost(balconySize);
            closePopup(calcPopup);
            showPopup(calcProfilePopup);
        } else {
            balconySize.forEach(input => {
                if (input.value === '') {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = '1px solid green';
                }
            }); 
        }
    }

    balconyIcons.forEach(img => img.addEventListener('click', (e) => activeBalconyImg(e)));
    balconySize.forEach(input => input.addEventListener('input', (e) => validateInput(e.target.value, input, 'size')));
    buttonFurther.addEventListener('click', activateCalcProfilePopup);
}

export default calc;