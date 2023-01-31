import { postData } from "../services/services";
import { validateInput } from "../services/services";
import { clearAllFieldsAfterPost } from "../services/services";
import { showThanksModal } from "../services/services";

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector),
          phoneInputs = document.querySelectorAll("[data-phone]"),
          nameInputs = document.querySelectorAll("[data-name]");

    const message = {
        loading: "../assets/img/form/spinner.svg",
        success: "Спасибо! Мы скоро с вами свяжемся",
        failure: "Что-то пошло не так..."
    }

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formNotice = e.target.querySelector(".form_notice");
            const currentPopup = e.target.parentElement.parentElement.parentElement.parentElement.className;

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            formNotice.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const objectFromForm = Object.fromEntries(formData.entries());

            if (localStorage.getItem("profile")) {
                objectFromForm["width"] =  localStorage.getItem('width');
                objectFromForm["height"] =  localStorage.getItem("height");
                objectFromForm["profile"] =  localStorage.getItem("profile");
                objectFromForm["variant"] =  localStorage.getItem("variant");
                objectFromForm["type"] =  localStorage.getItem("type");
            }

            const json = JSON.stringify(objectFromForm);

            postData("http://localhost:3000/posts", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(`.${currentPopup}`, message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(`.${currentPopup}`, message.failure);
                })
                .finally(() => {
                    form.reset();
                    clearAllFieldsAfterPost(phoneInputs);
                    clearAllFieldsAfterPost(nameInputs);
                    localStorage.clear();
                    statusMessage.remove();
                });
        })
    }

    phoneInputs.forEach(input => {
        input.addEventListener("input", (e) => validateInput(e.target.value, input, "number"));
    })

    nameInputs.forEach(input => {
        input.addEventListener("input", (e) => validateInput(e.target.value, input, "name"));
    })
}

export default forms;