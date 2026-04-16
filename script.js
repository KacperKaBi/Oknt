// Smooth fade-in sekcji przy scrollu
const fadeElements = document.querySelectorAll(".fade-in");

function handleFadeIn() {
    const trigger = window.innerHeight * 0.85;

    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < trigger) {
            el.classList.add("visible");
        }
    });
}

// Smooth scroll dla linków nawigacji (jeśli przeglądarka nie wspiera scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top,
                behavior: "smooth"
            });
        }
    });
});

// Mała animacja kliknięcia przycisków
function addClickRipple(button) {
    button.addEventListener("click", function (e) {
        const rect = button.getBoundingClientRect();
        const circle = document.createElement("span");
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const existing = button.getElementsByClassName("ripple")[0];
        if (existing) {
            existing.remove();
        }

        button.appendChild(circle);
    });
}

// Dodaj ripple do przycisków
document.addEventListener("DOMContentLoaded", () => {
    handleFadeIn();

    const buttons = document.querySelectorAll(".btn, .nav-join, .panel-btn");
    buttons.forEach(addClickRipple);
});

window.addEventListener("scroll", handleFadeIn);

/* Dynamiczny efekt tła (opcjonalne lekkie poruszanie gridu) */
const bgGrid = document.querySelector(".bg-grid");
let lastX = 0;
let lastY = 0;

window.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    lastX += (x - lastX) * 0.08;
    lastY += (y - lastY) * 0.08;

    if (bgGrid) {
        bgGrid.style.transform = `translate(${lastX}px, ${lastY}px)`;
    }
});
