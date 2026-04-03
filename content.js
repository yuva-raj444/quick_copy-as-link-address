let hoveredLink = null;
let hoveredElement = null;

document.addEventListener("mouseover", (e) => {
    let element = e.target;

    while (element && element.tagName !== "A") {
        element = element.parentElement;
    }

    if (element && element.href) {
        hoveredLink = element.href;
        hoveredElement = element;
    } else {
        hoveredLink = null;
    }
});

document.addEventListener("mouseout", (e) => {
    if (hoveredElement) {
        hoveredElement = null;
    }
});

document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "q") {
        if (hoveredLink) {
            try {
                await navigator.clipboard.writeText(hoveredLink);
                showToast("Link copied!");
            } catch (err) {
                showToast("Copy failed!");
            }
        } else {
            showToast("No link selected!");
        }
    }
});

function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "link-toast";

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
