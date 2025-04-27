// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE CRAFT COLUMN ---------------------------- //
let craftColumnElement = document.getElementById("buyables-column2")
function unlockCrafting() {
    if(craftColumnElement) {
        craftColumnElement.style.display = "flex"
    } else {
        craftColumnElement.style.display = "none"
    }
}

// ---------------------------- CRAFTING: CRAFT STICKS ---------------------------- //
// ---------------------------- CRAFTING: CRAFT STICKS ---------------------------- //
let stickRowElement = document.getElementById("stick-row").style.display = "none"
function craftSticks() {
    if(wood >=1) {
        wood--
        stick+=3
        stickRowElement = document.getElementById("stick-row").style.display = "block"

        const newNotification = document.createElement("div");
        newNotification.classList.add("notification");
        newNotification.textContent = "you seperate the wood.";
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
    } else {
        wood = wood
        notEnoughMaterials()
    }

    rendering()
}