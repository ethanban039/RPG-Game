// Notifications
let notificationsContainer = document.getElementById("notificationsContainer");
let newNotification = document.createElement("div")


// Renders Everything
const materialinventory = document.getElementById("materials-inventoryid")
const matchCountElement = document.getElementById("matchCount")

function rendering() {
    if (materialinventory) {
        materialinventory.style.visibility = "visible" // Makes the material inventory visible
    }
    if(matchCountElement) {
        matchCountElement.textContent = matches // Updates matches when spent / gained
    }
}



let matches =  0


// Button Cooldowns & Button Function

function startCooldown(buttonWrapper, duration) {
    const button = buttonWrapper.querySelector('.action-button');
    const overlay = buttonWrapper.querySelector('.cooldown-overlay');

    overlay.style.transition = 'none';
    overlay.style.width = '100%';
    void overlay.offsetWidth;
    overlay.style.transition = `width ${duration}ms linear`;
    overlay.style.width = '0%';

    button.disabled = true;
    buttonWrapper.classList.add('cooldown-active');

    setTimeout(() => {
        button.disabled = false;
        buttonWrapper.classList.remove('cooldown-active');
    }, duration);
}

function lightmatch() {
    const wrapper = document.querySelectorAll('.button-wrapper')[0];
    startCooldown(wrapper, 1);

    const matchCountElement = document.getElementById("matchCount");
    matches++;

    const notificationsContainer = document.getElementById("notificationsContainer");

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.textContent = "The match burns.";

    newNotification.style.background = "none";
    newNotification.style.margin = "-5px auto 0 auto";

    notificationsContainer.appendChild(newNotification);

    // Only fade in (no fade out)
    setTimeout(() => {
        newNotification.classList.add("show");
    }, 10);

    // Limit: after 21 notifications, remove the oldest one
    if (notificationsContainer.children.length > 21) {
        notificationsContainer.removeChild(notificationsContainer.children[0]);
    }

    rendering();
}


function lightfire() {
    const wrapper = document.querySelectorAll('.button-wrapper')[1];

    if(matches >=1) {
        matches--
        startCooldown(wrapper, 8000);
        rendering()
    } else {

    }
}

