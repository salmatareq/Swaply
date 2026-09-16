document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openOfferModalBtn");
    const modalOverlay = document.getElementById("customOfferModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const cancelBtn = document.getElementById("cancelModalBtn");
    const offerForm = document.getElementById("uniqueOfferForm");
    const container = document.getElementById("dynamicOffersContainer");
    const skillSelect = document.getElementById("skillSelection");

    fetch("../options.json")
        .then(response => response.json())
        .then(data => {
            if (data && data.courses) {
                data.courses.forEach(course => {
                    const option = document.createElement("option");
                    option.value = course;
                    option.textContent = course;
                    skillSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error loading courses:", error));

    let userOffers = JSON.parse(localStorage.getItem("swaplyUserOffers")) || [];

    function renderOffers() {
        if (userOffers.length === 0) {
            container.innerHTML = `<div class="empty-state-text">No active offers added. Click "Add Offer" to start.</div>`;
            return;
        }

        container.innerHTML = "";
        userOffers.forEach((item, idx) => {
            const badge = document.createElement("div");
            badge.className = "offer-item-badge";
            badge.innerHTML = `
                <span><i class="fa-solid fa-handshake"></i> <strong>${item.skill}</strong> (${item.day})</span>
                <i class="fa-solid fa-xmark offer-delete-icon" onclick="removeOffer(${idx})"></i>
            `;
            container.appendChild(badge);
        });
    }

    function toggleModal(show) {
        modalOverlay.style.display = show ? "flex" : "none";
    }

    if (openBtn) openBtn.addEventListener("click", () => toggleModal(true));
    if (closeBtn) closeBtn.addEventListener("click", () => toggleModal(false));
    if (cancelBtn) cancelBtn.addEventListener("click", () => toggleModal(false));

    window.addEventListener("click", (e) => {
        if (e.target === modalOverlay) toggleModal(false);
    });

    if (offerForm) {
        offerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const skill = skillSelect.value;
            const checkboxes = document.querySelectorAll(".day-checkbox:checked");
            const selectedDays = Array.from(checkboxes).map(cb => cb.value);

            if (skill && selectedDays.length > 0) {
                selectedDays.forEach(day => {
                    userOffers.push({ skill, day });
                });
                localStorage.setItem("swaplyUserOffers", JSON.stringify(userOffers));
                renderOffers();
                offerForm.reset();
                toggleModal(false);
            }
        });
    }

    window.removeOffer = function (index) {
        userOffers.splice(index, 1);
        localStorage.setItem("swaplyUserOffers", JSON.stringify(userOffers));
        renderOffers();
    };

    renderOffers();
});