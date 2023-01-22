import { validateInput } from "../services/services";
import { clearAllFieldsAfterPost } from "../services/services";
import { saveBalconyParameters } from "../services/services";
import modal from "./modal";

function calc() {
    const balconyIcons = document.querySelectorAll('.balcon_icons_img'),
          bigBalconyImg = document.querySelectorAll('.big_img img'),
          balconySize = document.querySelectorAll('[data-size]'),
          buttonFurther = document.querySelector('.popup_calc_button');

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
        clearAllFieldsAfterPost(balconySize);
        modal('.popup_calc_profile', '.popup_calc_button' , '.popup_calc_profile_close');

    }

    balconyIcons.forEach(img => img.addEventListener('click', (e) => activeBalconyImg(e)));
    balconySize.forEach(input => input.addEventListener('input', (e) => validateInput(e.target.value, input, 'size')));
    buttonFurther.addEventListener('click', activateCalcProfilePopup)


}

export default calc;