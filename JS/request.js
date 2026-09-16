let requests = {
    received: [],
    sent: []
};

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

function showNew() {
    changeTab("newList", document.querySelector(".new-btn"));
}

function accept(btn) {

    let card = btn.parentElement.parentElement;

    card.remove();

    updateNumbers();
}

function decline(btn) {

    let card = btn.parentElement.parentElement;

    card.remove();

    updateNumbers();
}

function sendReq(btn) {

    btn.innerText = "Pending";

    let card = btn.parentElement.parentElement;

    let sentList = document.getElementById("sent");

    sentList.appendChild(card);

    updateNumbers();
}

function updateNumbers() {

    let received = document.getElementById("received");
    let sent = document.getElementById("sent");

    document.getElementById("recCount").innerText =
        received.children.length;

    document.getElementById("sentCount").innerText =
        sent.children.length;
}
