console.warn("Event Listeners File will cause errors, these do not change gameplay")

forgeButton.addEventListener("mouseenter", () => {
    forgeMaterials.style.display = "block"
})

forgeButton.addEventListener("mouseleave", () => {
    forgeMaterials.style.display = "none"
})

forgeFishingPoleButton.addEventListener("mouseenter", () => {
    fishingPoleMaterials.style.display = "block"
})

forgeFishingPoleButton.addEventListener("mouseleave", () => {
    fishingPoleMaterials.style.display = "none"
})