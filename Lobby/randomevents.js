let rngFishingPoleEvent;
setInterval(() => {
    if(fishingPoleAmount === 1) {
        rngFishingPoleEvent = Math.round(Math.random() * 100000) // 0 - 10000
        console.log(`Fishing RNG Event # Chosen: ${rngFishingPoleEvent}`)

            if(rngFishingPoleEvent >= 50000 && rngFishingPoleEvent <= 100000) { // 1 in 2 chance
                const newNotification = document.createElement("div");
                newNotification.classList.add("notification");
                newNotification.textContent = "your fishing pole picked up 10 wood.";
                newNotification.style.background = "none";
                newNotification.style.lineHeight = "1.2";
                wood +=10
                notificationsContainer.insertBefore(newNotification, notificationsContainer.firstChild);
                check20thNotif()
           }
    }
}, Math.ceil(Math.random() * 125000) * 1.35) // 0 - 150s (estimate)











function check20thNotif() {
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