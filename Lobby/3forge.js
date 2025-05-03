// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE FORGE COLUMN ---------------------------- //
let forgeColumnElement = document.getElementById("buyables-column3")
function unlockForge() {
    if(forgeColumnElement) {
        forgeColumnElement.style.display = "flex"
    } else {
        forgeColumnElement.style.display = "none"
    }
}

// ---------------------------- FORGING: FORGE FISHING POLE ---------------------------- //
// ---------------------------- FORGING: FORGE FISHING POLE ---------------------------- //
let fishingPoleForged = false
let forgeFishingPoleButton = document.getElementById("ffishing-pole")
let fishingPoleMaterials = document.getElementById("fishingPoleMaterials")

let toolInventory = document.getElementById("tools-inventoryid").style.visibility = "hidden"
function forgeFishingPole() {
    if(stick >=15 && stone >=3 && fishingPoleForged === false) {
        stick -=15
        stone -=3
        fishingPoleAmount = 1
        rendering()
        toolInventory = document.getElementById("tools-inventoryid").style.visibility = "visible"

        forgeFishingPoleButton = document.getElementById("ffishing-pole").style.cursor = "not-allowed"
        forgeFishingPoleButton = document.getElementById("ffishing-pole").style.color = "rgb(68, 68, 68)"
        forgeFishingPoleButton = document.getElementById("ffishing-pole").style.textDecoration = "none"
        fishingPoleMaterials = document.getElementById("fishingPoleMaterials").style.display = "none"

        fishingPoleForged = true

        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.innerHTML = "fishing events are at your stake.";
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
    } else if ((stick < 15 || stone < 3) && fishingPoleForged === false) {
        stick = stick
        stone = stone
        notEnoughMaterials()
    } else if (fishingPoleForged === true) {
        console.warn("User tried to forge something already forged")
    }

    rendering()
}