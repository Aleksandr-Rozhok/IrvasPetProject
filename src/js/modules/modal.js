import { showPopup } from "../services/services";
import { addCloseEvent } from "../services/services";

function modal() {
  function addAllActionForModal(mainPopup, actionButton, closeButton, popupForTimer) {
    const engineerPopup = document.querySelector(mainPopup),
      callButton = document.querySelectorAll(actionButton),
      closeEngineerPopup = engineerPopup.querySelector(closeButton);

    callButton.forEach((elem) =>
      elem.addEventListener("click", () => {
        showPopup(engineerPopup);

        if (mainPopup.includes("calc")) {
          localStorage.setItem("variant", "tree");
          localStorage.setItem("type", "Тип1");
          localStorage.setItem("profile", "cold");
        }
      })
    );

    addCloseEvent(engineerPopup, closeEngineerPopup);

    if (popupForTimer) {
      setTimeout(function () {
        showPopup(document.querySelector(popupForTimer));
      }, 60000);
    }
  }

  addAllActionForModal(".popup_engineer", ".popup_engineer_btn", ".popup_close", ".popup_engineer");
  addAllActionForModal(".popup", ".phone_link", ".popup_close");
  addAllActionForModal(".popup_calc", ".popup_calc_btn", ".popup_calc_close");
}

export default modal;
