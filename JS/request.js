let requests = {
  received: [],
  sent: []
    received: [],
    sent: []
};

let savedRequests = localStorage.getItem("requests");

if (savedRequests) {
  requests = JSON.parse(savedRequests);
}


function changeTab(name, btn) {

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.classList.remove("active");
  });
    document.getElementById("received").style.display = "none";
    document.getElementById("sent").style.display = "none";
    document.getElementById("newList").style.display = "none";

  if (btn) {
    btn.classList.add("active");
  }

  document.getElementById("received").style.display = "none";
  document.getElementById("sent").style.display = "none";
  document.getElementById("newList").style.display = "none";
    document.getElementById(name).style.display = "flex";

  if (name === "received") {
    document.getElementById("received").style.display = "flex";
  }
    let tabs = document.getElementsByClassName("tab");

  else if (name === "sent") {
    document.getElementById("sent").style.display = "flex";
  }
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

  else {
    document.getElementById("newList").style.display = "flex";
  }
    btn.classList.add("active");
}


function showNew() {

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.classList.remove("active");
  });

  changeTab("new", null);
    changeTab("newList", document.querySelector(".new-btn"));
}


function accept(btn) {

  let card = btn.closest(".card");

  let name = card.querySelector("h2").childNodes[0].textContent.trim();
  let image = card.querySelector("img").src;
  let message = card.querySelector("p").textContent;

  card.remove();

  let connection = {
    name: name,
    image: image,
    message: message
  };

  let connections = localStorage.getItem("connections");

  if (connections) {
    connections = JSON.parse(connections);
  }
    let card = btn.parentElement.parentElement;

  else {
    connections = [];
  }
    card.remove();

  connections.push(connection);

  localStorage.setItem("connections", JSON.stringify(connections));

  saveRequests();
  updateNumbers();

  window.location.href = "connect.html";
    updateNumbers();
}


function decline(btn) {

  let card = btn.closest(".card");
    let card = btn.parentElement.parentElement;

  card.remove();
    card.remove();

  saveRequests();
  updateNumbers();
    updateNumbers();
}


function sendReq(btn) {

  let card = btn.closest(".card");

  btn.parentElement.innerHTML = '<span class="pending">Pending</span>';

  document.getElementById("sent").appendChild(card);

  saveRequests();
  updateNumbers();
}
    btn.innerText = "Pending";

    let card = btn.parentElement.parentElement;

function updateNumbers() {
    let sentList = document.getElementById("sent");

  document.getElementById("recCount").innerText =
    document.querySelectorAll("#received .card").length;
    sentList.appendChild(card);

  document.getElementById("sentCount").innerText =
    document.querySelectorAll("#sent .card").length;
    updateNumbers();
}

function updateNumbers() {

function saveRequests() {

  requests.received =
    document.getElementById("received").innerHTML;
    let received = document.getElementById("received");
    let sent = document.getElementById("sent");

  requests.sent =
    document.getElementById("sent").innerHTML;
    document.getElementById("recCount").innerText =
        received.children.length;

  localStorage.setItem("requests", JSON.stringify(requests));
    document.getElementById("sentCount").innerText =
        sent.children.length;
}


function closeNotif() {

  let notifBox = document.getElementById("notif");

  notifBox.style.display = "none";
}