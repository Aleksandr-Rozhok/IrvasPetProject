function photo () {
    const previewPhoto = document.querySelectorAll('.preview');

    function createBigPhoto (e) {
        const photoDiv = document.createElement('div');
        const currentSrc = e.target.getAttribute('src');
        const id = currentSrc.split('').filter(el => !isNaN(el))[0];

        photoDiv.classList.add('customBigImg');
        photoDiv.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9;
            background-color: rgba(0, 0, 0, 0.5);`;

        photoDiv.innerHTML = `
            <img src="assets/img/our_works/big_img/${id}.png" alt="window">`;
        
        photoDiv.children[0].style.cssText = `
            padding: 2rem 5rem;
            text-align: center;
            border-radius: 1rem;
            background: #ffb903;
            box-sizing: border-box;
            height: 600px`

        document.body.append(photoDiv);
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && photoDiv) {
                photoDiv.remove();
            }
          });
        
          photoDiv.addEventListener('click', (e) => {
            if (photoDiv && e.target === photoDiv) {
                photoDiv.remove();
            }
        });
    };

    previewPhoto.forEach(photo => {
        photo.addEventListener('click', (e) => createBigPhoto(e))
    });
}

export default photo;

