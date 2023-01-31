const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
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

const showPopup = (popup) => (popup.style.display = "flex");
const closePopup = (popup) => (popup.style.display = "none");

const saveBalconyParameters = (value, el) => {
  let key = el.getAttribute("id") ? el.getAttribute("id") : Object.keys(el.dataset)[0];
  if (key) {
    localStorage.setItem(key, value);
  }
};

function validateInput(value, input, type) {
  const onlyNumbersRegex = /^[0-9]+$/;
  let checkForPhone = onlyNumbersRegex.test(value) && value.length > 7 && value.length <= 10,
    checkForSize = onlyNumbersRegex.test(value),
    checkForName = value.length < 3 || value.length > 15,
    validateStatus;

  if (value === "") {
    input.style.border = "";
    validateStatus = false;
  } else if (type === "number" ? !checkForPhone : type === "size" ? !checkForSize : checkForName) {
    input.style.border = "1px solid red";
    validateStatus = false;
  } else {
    input.style.border = "1px solid green";
    validateStatus = true;
  }

  saveBalconyParameters(value, input);
  return validateStatus;
}

function clearAllFieldsAfterPost(fieldsArr) {
  fieldsArr.forEach((field) => {
    field.style.border = "";
    field.value = "";
  });
}

function addCloseEvent(elem, closeButton) {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && elem.style.display === "flex") {
      closePopup(elem);
      localStorage.clear();
    }
  });

  elem.addEventListener("click", (e) => {
    if (elem.style.display === "flex" && e.target === elem) {
      closePopup(elem);
      localStorage.clear();
    }
  });

  closeButton.addEventListener("click", () => {
    closePopup(elem);
    localStorage.clear();
  });
}

function goToTheNextPopup(oldPopup, newPopup) {
  closePopup(oldPopup);
  showPopup(newPopup);
}

function closeFormMessage(thanksModal, popup, form) {
  thanksModal.remove();
  closePopup(popup);
  form.style.display = "block";
}

function showThanksModal(currPopup, message) {
  const popup = document.querySelector(currPopup),
    prevModalDialog = popup.querySelector(".popup_content");

  showPopup(popup);
  prevModalDialog.style.display = "none";

  const thanksModal = document.createElement("div");
  thanksModal.innerHTML = `
      <div class="popup_content text-center">
          <button type="button" class="popup-message_close popup_close"><strong>&times;</strong></button>
          <div class="form"><span class="popup__message">${message}</span></div>
      </div>`;

  popup.querySelector(".popup_dialog").append(thanksModal);

  const messageCloseButton = thanksModal.querySelector(".popup-message_close");

  messageCloseButton.addEventListener("click", () => {
    closeFormMessage(thanksModal, popup, prevModalDialog);
    clearTimeout(closePopupTimeout);
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && thanksModal) {
      closeFormMessage(thanksModal, popup, prevModalDialog);
      clearTimeout(closePopupTimeout);
    }
  });

  popup.addEventListener("click", (e) => {
    if (thanksModal && e.target === popup) {
      closeFormMessage(thanksModal, popup, prevModalDialog);
      clearTimeout(closePopupTimeout);
    }
  });

  const closePopupTimeout = setTimeout(() => {
    closeFormMessage(thanksModal, popup, prevModalDialog);
  }, 4000);
}

export { postData };
export { getResources };
export { showPopup };
export { closePopup };
export { validateInput };
export { clearAllFieldsAfterPost };
export { saveBalconyParameters };
export { addCloseEvent };
export { goToTheNextPopup };
export { closeFormMessage };
export { showThanksModal };
