const search = document.querySelector(".search-box input");
const usersContainer = document.getElementById("usersContainer");

let users = [];

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    users = data;
    displayUsers(users);
  })
  .catch((error) => {
    console.log("Error loading JSON:", error);
  });

function displayUsers(usersToDisplay) {
  let container = "";

  usersToDisplay.forEach((user) => {
    container += `
      <div class="col-md-6">
        <div class="person-card">

          <div class="person-top">

            <div class="person-avatar">
              ${user.avatar}
            </div>

            <div>
              <h3>${user.name}</h3>

              <p>${user.job}</p>

              <span class="rating">
                <i class="bi bi-star-fill"></i>
                ${user.rating}
              </span>
            </div>

          </div>

          <span class="match-badge">
            <i class="bi bi-lightning-fill"></i>
            ${user.match}
          </span>

          <div class="skills-box">

            <div>
              <span>Can Teach</span>
              <strong>${user.canTeach}</strong>
            </div>

            <div>
              <span>Wants to Learn</span>
              <strong>${user.wantsToLearn}</strong>
            </div>

          </div>
 <div class="bts">
                        <button class="sendRequest">Request</button>
                        <a href="profile.html" class="profile-btn">
                          View Profile
                        </a></div>

        </div>
      </div>
    `;
  });

  usersContainer.innerHTML = container;
}
search.addEventListener("input", (e) => {
  searchItems(e.target.value);
});

function searchItems(searchValue) {
  let container = "";

  users.forEach((user) => {
    if (
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.job.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.canTeach.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.wantsToLearn.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      container += `
                <div class="col-md-6">
                    <div class="person-card">

                        <div class="person-top">

                            <div class="person-avatar">
                                ${user.avatar}
                            </div>

                            <div>
                                <h3>${user.name}</h3>

                                <p>${user.job}</p>

                                <span class="rating">
                                    <i class="bi bi-star-fill"></i>
                                    ${user.rating}
                                </span>
                            </div>

                        </div>

                        <span class="match-badge">
                            <i class="bi bi-lightning-fill"></i>
                            ${user.match}
                        </span>

                        <div class="skills-box">

                            <div>
                                <span>Can Teach</span>
                                <strong>${user.canTeach}</strong>
                            </div>

                            <div>
                                <span>Wants to Learn</span>
                                <strong>${user.wantsToLearn}</strong>
                            </div>

                        </div>
 <div class="bts">
                        <button class="sendRequest">Request</button>
                        <a href="profile.html" class="profile-btn">
                          View Profile
                        </a></div>

                    </div>
                </div>
            `;
    }
  });

  usersContainer.innerHTML = container;
}
const sendRequest = document.querySelectorAll(".sendRequest");

sendRequest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.textContent = "Requested";
    btn.classList.add("requested");
  });
});
