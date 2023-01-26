import { showPopup } from "../services/services";
import { closePopup } from "../services/services";

function modal(mainPopup, actionButton, closeButton, popupForTimer) {
    const engineerPopup = document.querySelector(mainPopup),
          callButton = document.querySelectorAll(actionButton),
          closeEngineerPopup = engineerPopup.querySelector(closeButton); 


    callButton.forEach(elem => elem.addEventListener('click', () => showPopup(engineerPopup)));
    closeEngineerPopup.addEventListener('click', () => closePopup(engineerPopup));

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && engineerPopup.style.display === 'flex') {
            closePopup(engineerPopup);
        }
      });
    
    engineerPopup.addEventListener('click', (e) => {
        if (engineerPopup.style.display === 'flex' && e.target === engineerPopup) {
            closePopup(engineerPopup);
        }
    });

    if (popupForTimer) {
        setTimeout(function () {
            showPopup(document.querySelector(popupForTimer));
        }, 60000);
    }
}

export default modal;