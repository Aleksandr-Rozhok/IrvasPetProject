import { validateInput } from "../services/services";
import { clearAllFieldsAfterPost } from "../services/services";
import { saveBalconyParameters } from "../services/services";
import { addCloseEvent } from "../services/services";
import { goToTheNextPopup } from "../services/services";

function calc() {
  const calcPopup = document.querySelector(".popup_calc"),
    calcProfilePopup = document.querySelector(".popup_calc_profile"),
    calcProfileCloseButton = calcProfilePopup.querySelector(".popup_calc_profile_close"),
    calcEndPopup = document.querySelector(".popup_calc_end"),
    calcEndCloseButton = calcEndPopup.querySelector(".popup_calc_end_close"),
    calcProfileButton = calcProfilePopup.querySelector(".popup_calc_profile_button"),
    balconyIcons = calcPopup.querySelectorAll(".balcon_icons_img"),
    bigBalconyImg = calcPopup.querySelectorAll(".big_img img"),
    balconySize = calcPopup.querySelectorAll("[data-size]"),
    buttonFurther = calcPopup.querySelector(".popup_calc_button"),
    checkboxes = document.querySelectorAll(".checkbox"),
    windowTypeSelect = document.querySelector("#view_type");

  checkboxes[0].checked = true;
  addCloseEvent(calcProfilePopup, calcProfileCloseButton);
  addCloseEvent(calcEndPopup, calcEndCloseButton);

  function activeBalconyImg(e, defaultVal = balconyIcons[0]) {
    let currImg = e ? e.target : defaultVal;
    balconyIcons.forEach((img) => img.classList.remove("do_image_more"));
    bigBalconyImg.forEach((img) => (img.style.display = "none"));

    if (currImg instanceof HTMLImageElement) {
      currImg.parentElement.classList.add("do_image_more");

      bigBalconyImg.forEach((img) => {
        if (img.getAttribute("alt") === currImg.alt) {
          img.style.display = "flex";
          saveBalconyParameters(img.getAttribute("alt"), img);
        }
      });
    }
  }

  function activateCalcProfilePopup() {
    let validateCheck = true;

    balconySize.forEach((input) => {
      if (!validateInput(input.value, input, "size")) {
        validateCheck = false;
      }
    });

    if (validateCheck) {
      clearAllFieldsAfterPost(balconySize);
      goToTheNextPopup(calcPopup, calcProfilePopup);
    } else {
      balconySize.forEach((input) => {
        if (input.value === "") {
          input.style.border = "1px solid red";
        } else {
          input.style.border = "1px solid green";
        }
      });
    }
  }

  function checkWindowsType(checkboxItem) {
    checkboxes.forEach((item) => {
      item.checked = false;
    });

    checkboxItem.checked = true;
    if (checkboxItem.getAttribute("id")) {
      localStorage.setItem("profile", checkboxItem.getAttribute("id"));
    }
  }

  balconyIcons.forEach((img) => img.addEventListener("click", (e) => activeBalconyImg(e)));
  balconySize.forEach((input) => input.addEventListener("input", (e) => validateInput(e.target.value, input, "size")));
  buttonFurther.addEventListener("click", activateCalcProfilePopup);
  calcProfileButton.addEventListener("click", () => goToTheNextPopup(calcProfilePopup, calcEndPopup));
  checkboxes.forEach((item) => item.parentElement.addEventListener("click", (e) => checkWindowsType(e.target)));
  windowTypeSelect.addEventListener("change", (e) => localStorage.setItem("variant", e.target.value));
}

export default calc;
