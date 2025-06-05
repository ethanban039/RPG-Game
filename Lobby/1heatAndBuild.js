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
const stoneCountElement = document.getElementById("stoneCount")
const fishingPoleCountElement = document.getElementById("fishingPoleCount")

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
    if(stoneCountElement) {
        stoneCountElement.textContent = stone // Updates stone when spent / gained
    }
    if(fishingPoleCountElement) {
        fishingPoleCountElement.textContent = fishingPoleAmount // Updates when you have the fishing pole
    }
}


// Materials
let matches =  0
let wood = 0
let stick = 0
let stone = 0

// Tools
let fishingPoleAmount = 0


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
let amountofHuts = 0
let population = 0

// Stages of the game (stagesofgame.txt)
let stageOfGame = 1


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
    startCooldown(wrapper, 10); // 10s
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
        startCooldown(wrapper, 12); // 12s
        lightedfireamount+=1
        temperature +=10
        document.title = "A Firelit Room"
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "the fire is roaring.";
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
let workBenchContainer = document.getElementById("workBenchWrapper")
let forgeContainer = document.getElementById("forgeWrapper")
let hutContainer = document.getElementById("hutWrapper")

function unlockBuildings() {
    if(buildColumnElement) {
        buildColumnElement = document.getElementById("buyables-column1").style.display = "flex"
        buildColumnElement = document.getElementById("buyables-column1").style.position = "absolute"

        workBenchContainer = document.getElementById("workBenchWrapper").style.display = "block" // Shown when first unlocked
        forgeContainer = document.getElementById("forgeWrapper").style.display = "none" // Hidden until workbench is bought
        hutContainer = document.getElementById("hutWrapper").style.display = "none" // Hidden until forge is bought
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
        unlockForgeCraft()
        unlockGathering()
        workBenchButton = document.getElementById("work-bench").style.cursor = "not-allowed"
        workBenchButton = document.getElementById("work-bench").style.color = "rgb(68, 68, 68)"
        workBenchButton = document.getElementById("work-bench").style.textDecoration = "none"
        workBenchMaterials = document.getElementById("workBenchMaterials").style.display = "none"

        workBenchBuilt = true
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.innerHTML = "crafting suddenly exists.";
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
    } else if(wood < 5 && workBenchBuilt === false) {
        lightedfireamount = lightedfireamount
        wood = wood
        notEnoughMaterials()
    } else if(workBenchBuilt === true) {
        console.warn("User tried to buy something already bought")
    }

    rendering()
}


// ---------------------------- BUILD FORGE (ONE TIME BUYABLE) ---------------------------- //
// ---------------------------- BUILD FORGE (ONE TIME BUYABLE) ---------------------------- //

function unlockForgeCraft() {
    forgeContainer = document.getElementById("forgeWrapper").style.display = "block"
}

let forgeBuilt = false
let forgeButton = document.getElementById("forge")
let forgeMaterials = document.getElementById("forgeMaterials")
function buildForge() {
    if(stone >=5 && forgeBuilt === false) {
        stone-=5
        unlockForge()
        unlockHutBuild()
        forgeButton = document.getElementById("forge").style.cursor = "not-allowed"
        forgeButton = document.getElementById("forge").style.color = "rgb(68, 68, 68)"
        forgeButton = document.getElementById("forge").style.textDecoration = "none"
        forgeMaterials = document.getElementById("forgeMaterials").style.display = "none"

        forgeBuilt = true
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.innerHTML = "you can now craft tools.";
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
    } else if(stone < 5 && forgeBuilt === false) {
        stone = stone
        notEnoughMaterials()
    } else if(forgeBuilt === true) {
        console.warn("User tried to buy something already bought")
    }

    rendering()
}

// ---------------------------- BUILD HUT  ---------------------------- //
// ---------------------------- BUILD HUT  ---------------------------- //

function unlockHutBuild() {
    hutContainer = document.getElementById("hutWrapper").style.display = "block"
}

let hutMaterials = document.getElementById("hutMaterials")
let hutButton = document.getElementById("hut")
function buildHut() {
    const wrapper = document.querySelectorAll('.button-wrapper')[4];
    if(wood >= 30 && stone >=15) {
        wood-=30
        stone-=30
        startCooldown(wrapper, 3000); // 3s
        amountofHuts +=1
        population = population + Math.ceil(Math.random() *3)
        console.log(population)
        
        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "you build a small shack, which attract little visitors.";
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
    } else {
        notEnoughMaterials()
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

setInterval(() => {
    console.clear()
    console.warn("Console Cleared")
}, 10000) // Every 10s, clear console