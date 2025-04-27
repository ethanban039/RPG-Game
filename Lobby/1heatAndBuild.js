// Notifications
let notificationsContainer = document.getElementById("notificationsContainer");
let newNotification = document.createElement("div")

// Console Warnings
console.warn("Currencies may be bugged with undefined functions or stray characters")


// Renders Everything
const materialinventory = document.getElementById("materials-inventoryid")
const matchCountElement = document.getElementById("matchCount")
const woodCountElement = document.getElementById("woodCount")
const stickCountElement = document.getElementById("stickCount")

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
    if(stickCountElement) {
        stickCountElement.textContent = stick // Updates sticks when spent / gained
    }
}


// Materials
let matches =  0
let wood = 0
let stick = 0

// Temperature Related
let temperature = 5 // celcius

// Player Stats
let hp = 100
let gold = 0
let level = 1
let currentxp = 0
let xpneeded = 100

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
// ---------------------------- LIGHT MATCH ---------------------------- //
function lightmatch() {
    const wrapper = document.querySelectorAll('.button-wrapper')[0];
    startCooldown(wrapper, 10000); // 10s
    matches++;

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.textContent = "the match burns.";

    newNotification.style.background = "none";
    newNotification.style.lineHeight = "0.2";

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

    rendering()
}

// ---------------------------- LIGHT FIRE ---------------------------- //
// ---------------------------- LIGHT FIRE ---------------------------- //
function lightfire() {
    const wrapper = document.querySelectorAll('.button-wrapper')[1];

    if(matches >=1) {
        matches--
        startCooldown(wrapper, 12000); // 12s
        lightedfireamount+=1
        temperature +=10
        document.title = "A Firelit Room"
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the fire lights with brightness.";
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0.2";
    
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
    } else{
        notEnoughMaterials()
    }

    rendering()
}


let woodRowElement = document.getElementById("wood-row").style.display = "none"
const checkfireamount =  setInterval(() => {
    if(woodRowElement) {
        if(lightedfireamount >= 2) { // When the fire has been stoked twice, the wood option is now visible in materials
            woodRowElement = document.getElementById("wood-row").style.display = "block"
            wood = wood + 5
            unlockBuildings()
            rendering()
            clearInterval(checkfireamount)
        } else  {
            woodRowElement = document.getElementById("wood-row").style.display = "none"
        }
    }
}, 50)




// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE BUILD COLUMN ---------------------------- //
let buildColumnElement = document.getElementById("buyables-column1")
function unlockBuildings() {
    if(buildColumnElement) {
        buildColumnElement = document.getElementById("buyables-column1").style.display = "flex"
        buildColumnElement = document.getElementById("buyables-column1").style.position = "absolute"
    } else {
        buildColumnElement = document.getElementById("buyables-column1").style.display = "none"
    }
}

// ---------------------------- BUILD WORKBENCH (ONE TIME BUYABLE) ---------------------------- //
// ---------------------------- BUILD WORKBENCH (ONE TIME BUYABLE) ---------------------------- //

let workBenchBuilt = false
let workBenchButton = document.getElementById("work-bench")
let workBenchMaterials = document.getElementById("workBenchMaterials")
function buildWorkBench() {
    if(wood >=5 && workBenchBuilt === false) {
        wood-=5
        unlockCrafting() // JAVASCIRPT SOURCE = 2craft.js
        unlockGathering()
        workBenchButton = document.getElementById("work-bench").style.cursor = "not-allowed"
        workBenchButton = document.getElementById("work-bench").style.color = "rgb(68, 68, 68)"
        workBenchButton = document.getElementById("work-bench").style.textDecoration = "none"
        workBenchMaterials = document.getElementById("workBenchMaterials").style.display = "none"

        workBenchBuilt = true
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.innerHTML = "the basic workbench has been built.";
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "1.0";
    
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
    } else if(wood < 5 && workBenchBuilt === false) {
        lightedfireamount = lightedfireamount
        wood = wood
        notEnoughMaterials()
    } else if(workBenchBuilt === true) {
        console.warn("User tried to buy something already bought")
    }

    rendering()
}











function notEnoughMaterials() { // The function for when you don't have enough material for something
    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.textContent = "you do not have enough.";

    newNotification.style.background = "none";
    newNotification.style.lineHeight = "0.2";

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








// Temperature Checker
setInterval(() => {
    if(temperature >=27) {
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the room is hot.";
    
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0.2";
    
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
    } else if(temperature <=26 && temperature >=11) {
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the room is warm.";
    
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0.2";
    
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
    } else if (temperature <=10 && temperature >= 0) {
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the room is cold.";
    
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0.2";
    
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
    } else {
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the room is freezing.";
    
        newNotification.style.background = "none";
        newNotification.style.lineHeight = "0.2";
    
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
    }

}, 30000)


setInterval(() => { // Temperature decreases by 1c every 10 seconds
    temperature-=1
}, 10000)

