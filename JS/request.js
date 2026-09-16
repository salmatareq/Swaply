let requests = {
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

  if (btn) {
    btn.classList.add("active");
  }

  document.getElementById("received").style.display = "none";
  document.getElementById("sent").style.display = "none";
  document.getElementById("newList").style.display = "none";

  if (name === "received") {
    document.getElementById("received").style.display = "flex";
  }

  else if (name === "sent") {
    document.getElementById("sent").style.display = "flex";
  }

  else {
    document.getElementById("newList").style.display = "flex";
  }
}


function showNew() {

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.classList.remove("active");
  });

  changeTab("new", null);
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

  else {
    connections = [];
  }

  connections.push(connection);

  localStorage.setItem("connections", JSON.stringify(connections));

  saveRequests();
  updateNumbers();

  window.location.href = "connect.html";
}


function decline(btn) {

  let card = btn.closest(".card");

  card.remove();

  saveRequests();
  updateNumbers();
}


function sendReq(btn) {

  let card = btn.closest(".card");

  btn.parentElement.innerHTML = '<span class="pending">Pending</span>';

  document.getElementById("sent").appendChild(card);

  saveRequests();
  updateNumbers();
}


function updateNumbers() {

  document.getElementById("recCount").innerText =
    document.querySelectorAll("#received .card").length;

  document.getElementById("sentCount").innerText =
    document.querySelectorAll("#sent .card").length;
}


function saveRequests() {

  requests.received =
    document.getElementById("received").innerHTML;

  requests.sent =
    document.getElementById("sent").innerHTML;

  localStorage.setItem("requests", JSON.stringify(requests));
}


function closeNotif() {

  let notifBox = document.getElementById("notif");

  notifBox.style.display = "none";
}