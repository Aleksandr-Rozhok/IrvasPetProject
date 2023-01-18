const showPopup = (popup) => popup.style.display = 'flex';
const closePopup = (popup) => popup.style.display = 'none';

function modal() {
    const engineerPopup = document.querySelector('.popup_engineer'),
          callButton = document.querySelector('.popup_engineer_btn'),
          closeEngineerPopup = engineerPopup.querySelector('.popup_close'),
          popup = document.querySelector('.popup'),
          closePopupBut = popup.querySelector('.popup_close'),
          phoneLink = document.querySelectorAll('.phone_link');

    callButton.addEventListener('click', () => showPopup(engineerPopup));
    closeEngineerPopup.addEventListener('click', () => closePopup(engineerPopup));
    phoneLink.forEach(elem => elem.addEventListener('click', () => showPopup(popup)));
    closePopupBut.addEventListener('click', () => closePopup(popup));

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && engineerPopup.style.display === 'flex') {
            closePopup(engineerPopup);
        } else if (e.code === 'Escape' && popup.style.display === 'flex') {
            closePopup(popup);
        }
      });
    
    engineerPopup.addEventListener('click', (e) => {
        if (engineerPopup.style.display === 'flex' && e.target === engineerPopup) {
            closePopup(engineerPopup);
        }
    });

    popup.addEventListener('click', (e) => {
        if (popup.style.display === 'flex' && e.target === popup) {
            closePopup(popup);
        }
    });

}

export default modal;
export {showPopup};
export {closePopup};