let users = [];


// Read data.json
fetch("../data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        users = data;

        let received = document.getElementById("received");

        received.innerHTML = "";

        for (let i = 0; i < users.length; i++) {

            let card = document.createElement("div");

            card.className = "card";

            card.innerHTML =
                '<div class="left">' +
                    '<img src="https://randomuser.me/api/portraits/women/' +
                    (40 + i) + '.jpg">' +

                    '<div>' +
                        '<h2>' + users[i].name +
                        ' <span>New</span></h2>' +

                        '<p>Wants ' +
                        users[i].canTeach +
                        ' for ' +
                        users[i].wantsToLearn +
                        '</p>' +
                    '</div>' +
                '</div>' +

                '<div class="right">' +
                    '<button class="accept" onclick="accept(this)">' +
                    '<i class="fa-solid fa-check"></i> Accept</button>' +

                    '<button class="decline" onclick="decline(this)">' +
                    '<i class="fa-solid fa-xmark"></i> Decline</button>' +
                '</div>';

            received.appendChild(card);
        }

        updateNumbers();
    });


// Change Tab
function changeTab(name, btn) {

    document.getElementById("received").style.display = "none";
    document.getElementById("sent").style.display = "none";
    document.getElementById("newList").style.display = "none";

    document.getElementById(name).style.display = "flex";

    let tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    btn.classList.add("active");
}


// New Request
function showNew() {

    document.getElementById("received").style.display = "none";
    document.getElementById("sent").style.display = "none";

    document.getElementById("newList").style.display = "flex";
}


// Accept
function accept(btn) {

    btn.parentElement.parentElement.remove();

    updateNumbers();
}


// Decline
function decline(btn) {

    btn.parentElement.parentElement.remove();

    updateNumbers();
}


// Send
function sendReq(btn) {

    btn.innerText = "Pending";

    let card = btn.parentElement.parentElement;

    document.getElementById("sent").appendChild(card);

    updateNumbers();
}


// Update numbers
function updateNumbers() {

    document.getElementById("recCount").innerText =
        document.getElementById("received").children.length;

    document.getElementById("sentCount").innerText =
        document.getElementById("sent").children.length;
}