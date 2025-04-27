// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
// ---------------------------- UNLOCK THE GATHER COLUMN ---------------------------- //
let gatherColumnElement = document.getElementById("gather-column1")
function unlockGathering() {
    if(gatherColumnElement) {
        gatherColumnElement.style.display = "flex"
    } else {
        gatherColumnElement.style.display = "none"
    }
}

// ---------------------------- GATHERING: GATHER WOOD ---------------------------- //
// ---------------------------- GATHERING: GATHER WOOD ---------------------------- //
function gatherWood() {
    const wrapper = document.querySelectorAll('.button-wrapper')[2];
    wood = wood + Math.floor((10 * (level * 1.2)))
    startCooldown(wrapper, 45000); // 60s

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.innerHTML = "branches and logs scatter across the forest floor.";
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

    rendering()()
}


// ---------------------------- GATHERING: GATHER STONE ---------------------------- //
// ---------------------------- GATHERING: GATHER STONE ---------------------------- //
let stoneRowElement = document.getElementById("stone-row").style.display = "none"
function gatherStone() {
    const wrapper = document.querySelectorAll('.button-wrapper')[3];
    stone = stone + Math.floor((8 * (level * 1.2)))
    stoneRowElement = document.getElementById("stone-row").style.display = "block"
    startCooldown(wrapper, 60000); // 60s

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.innerHTML = "you pick up scraps of rock.";
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

    rendering()
}