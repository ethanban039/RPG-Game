// Notifications
let notificationsContainer = document.getElementById("notificationsContainer");
let newNotification = document.createElement("div")


// Renders Everything
const materialinventory = document.getElementById("materials-inventoryid")
const matchCountElement = document.getElementById("matchCount")
const woodCountElement = document.getElementById("woodCount")

function rendering() {
    if (materialinventory) {
        materialinventory.style.visibility = "visible" // Makes the material inventory visible
    }
    if(matchCountElement) {
        matchCountElement.textContent = matches // Updates matches when spent / gained
    }
    if(woodCountElement) {
        woodCountElement.textContent = wood // Updates wood when spent / gained
    }
}


// Materials
let matches =  0
let wood = 0

// Amount Of Completions
let lightedfireamount = 0


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




// ---------------------------- LIGHT MATCH ---------------------------- //
function lightmatch() {
    const wrapper = document.querySelectorAll('.button-wrapper')[0];
    startCooldown(wrapper, 10000); // 10s
    matches++;

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.textContent = "the match burns.";

    newNotification.style.background = "none";
    newNotification.style.lineHeight = "0";

    notificationsContainer.insertBefore(newNotification, notificationsContainer.firstChild);

    setTimeout(() => {
        const notifications = notificationsContainer.children;
        const total = notifications.length;
    
        for (let i = 0; i < total; i++) {
            let opacity = 1 - (i / 20);
            opacity = Math.max(opacity, 0);
            notifications[i].style.opacity = opacity;
        }
    
        if (notificationsContainer.children.length > 21) {
            notificationsContainer.removeChild(notificationsContainer.lastChild);
        }
    }, 1)
}

// ---------------------------- LIGHT FIRE ---------------------------- //
function lightfire() {
    const wrapper = document.querySelectorAll('.button-wrapper')[1];

    if(matches >=1) {
        matches--
        startCooldown(wrapper, 12000); // 12s
        lightedfireamount+=1
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the fire roars.";
    
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0";
    
        notificationsContainer.insertBefore(newNotification, notificationsContainer.firstChild);
    
        setTimeout(() => {
            const notifications = notificationsContainer.children;
            const total = notifications.length;
        
            for (let i = 0; i < total; i++) {
                let opacity = 1 - (i / 20);
                opacity = Math.max(opacity, 0);
                notifications[i].style.opacity = opacity;
            }
        
            // Limit: after 21 notifications, remove the oldest one
            if (notificationsContainer.children.length > 21) {
                notificationsContainer.removeChild(notificationsContainer.lastChild);
            }
        }, 1)
    } else {
        notEnoughMaterials()
    }
}


let woodRowElement = document.getElementById("wood-row").style.display = "none"
const checkfireamount =  setInterval(() => {
    if(woodRowElement) {
        if(lightedfireamount >= 2) { // When the fire has been stoked twice, the wood option is now visible in materials
            woodRowElement = document.getElementById("wood-row").style.display = "block"
            wood+=5
            clearInterval(checkfireamount)
        } else  {
            woodRowElement = document.getElementById("wood-row").style.display = "none"
        }
    }
}, 50)


setInterval(() => { // Renders every currency every 10ms
    rendering()
},10)





function notEnoughMaterials() { // The function for when you don't have enough material for something
    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.textContent = "you do not have enough.";

    newNotification.style.background = "none";
    newNotification.style.lineHeight = "0";

    notificationsContainer.insertBefore(newNotification, notificationsContainer.firstChild);

    // After adding, update opacity for all notifications
    setTimeout(() => {
        const notifications = notificationsContainer.children;
        const total = notifications.length;
    
        for (let i = 0; i < total; i++) {
            let opacity = 1 - (i / 20); // 0th item = 1.0, 20th item = 0.0
            opacity = Math.max(opacity, 0); // Don't go below 0
            notifications[i].style.opacity = opacity;
        }
    
        // Limit: after 21 notifications, remove the oldest one
        if (notificationsContainer.children.length > 21) {
            notificationsContainer.removeChild(notificationsContainer.lastChild);
        }
    }, 1)

    rendering();
}