import { showPopup } from "../services/services";
import { postData } from "../services/services";
import { closePopup } from "../services/services";
import { validateInput } from "../services/services";
import { clearAllFieldsAfterPost } from "../services/services";

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector),
          phoneInputs = document.querySelectorAll('[data-phone]'),
          nameInputs = document.querySelectorAll('[data-name]');

    const message = {
        loading: '../assets/img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formNotice = e.target.querySelector('.form_notice');

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            formNotice.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/posts', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    clearAllFieldsAfterPost(phoneInputs);
                    clearAllFieldsAfterPost(nameInputs);
                    statusMessage.remove();
                })
        })
    }

    function closeFormMessage(thanksModal, popup, form) {
        thanksModal.remove();
        closePopup(popup);
        form.style.display = 'block';
    }

    function showThanksModal(message) {
        const popupWindow = document.querySelector('.popup_engineer'),
              prevModalDialog = popupWindow.querySelector('.popup_content')
              
        showPopup(popupWindow);
        prevModalDialog.style.display = 'none';

        const thanksModal = document.createElement('div');
        thanksModal.innerHTML = `
            <div class="popup_content text-center">
                <button type="button" class="popup-message_close popup_close"><strong>&times;</strong></button>
                <div class="form"><span class="popup__message">${message}</span></div>
            </div>`

        popupWindow.querySelector('.popup_dialog').append(thanksModal);

        const messageCloseButton = thanksModal.querySelector('.popup-message_close');

        messageCloseButton.addEventListener('click', () => closeFormMessage(thanksModal, popupWindow, prevModalDialog));

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && thanksModal) {
                closeFormMessage(thanksModal, popupWindow, prevModalDialog);
            }
        });

        popupWindow.addEventListener('click', (e) => {
            if (thanksModal && e.target === popupWindow) {
                closeFormMessage(thanksModal, popupWindow, prevModalDialog);
            }
        });

        setTimeout(() => {
            closeFormMessage(thanksModal, popupWindow, prevModalDialog);
        }, 4000)
    }

    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => validateInput(e.target.value, input, 'number'))
    })

    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => validateInput(e.target.value, input, 'name'))
    })
}

export default forms;