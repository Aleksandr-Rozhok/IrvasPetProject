const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
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

const showPopup = (popup) => popup.style.display = 'flex';
const closePopup = (popup) => popup.style.display = 'none';

export {postData};
export {getResources};
export {showPopup};
export {closePopup};