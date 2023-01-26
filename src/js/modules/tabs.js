function tabs(themeTabs, contentTabs, containerTabs, activeClass, firstCheck, secondCheck, thirdCheck) {
    const titleTabs = document.querySelectorAll(themeTabs),
          informationTabs = document.querySelectorAll(contentTabs),
          tabHeader = document.querySelector(containerTabs);

    tabHeader.addEventListener("click", e => {
        console.log(e.target)
        if (e.target && e.target.matches(firstCheck) || e.target.matches(secondCheck) || e.target.matches(thirdCheck)) {
            titleTabs.forEach((item, i) => {
                if (item === e.target || item === e.target.parentElement || item === e.target.parentElement.parentElement) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

const hideTabContent = () => {
    informationTabs.forEach(tab => {
        tab.style.display = "None";
    });

    titleTabs.forEach(item => {
        if (item.matches(`div.${activeClass}`)) {
            item.classList.remove(activeClass);
        } else if (item.children[0].matches(`div.${activeClass}`)) {
            item.children[0].classList.remove(activeClass);
        }
    })
}

const showTabContent = (i = 0) => {
    if (titleTabs[i].children[0].classList.contains("no_click")) {
        titleTabs[i].children[0].classList.add(activeClass);
    } else {
        titleTabs[i].classList.add(activeClass);
    }

    informationTabs[i].style.display = "Flex";
}
}

export default tabs;