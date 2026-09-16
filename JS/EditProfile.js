const editDiv = document.querySelector(".edit-div");
const editBtn = document.querySelector(".edit-profile");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.querySelector(".btn-outline-secondary");
const nameInput = document.getElementById("name");
const bioInput = document.getElementById("bio");
const skillInput = document.getElementById("skillInput");
const skillsContainer = document.getElementById("skillsContainer");
const profileName = document.querySelector(".profile-details .name");
const profileBio = document.querySelector(".profile-details .bio");
const profileSkills = document.querySelector(".current-skills");
editBtn.addEventListener("click", () => {
  editDiv.hidden = false;
});
cancelBtn.addEventListener("click", () => {
  editDiv.hidden = true;
});
const savedData = localStorage.getItem("profileData");

if (savedData) {
  const profileData = JSON.parse(savedData);

  profileName.textContent = profileData.name;
  profileBio.textContent = profileData.bio;

  nameInput.value = profileData.name;
  bioInput.value = profileData.bio;
  profileSkills.innerHTML = "";

  profileData.skills.forEach((skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skills");
    skillDiv.textContent = skill;

    profileSkills.appendChild(skillDiv);
  });
}
saveBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const bio = bioInput.value.trim();

  const skills = [];

  document.querySelectorAll(".skill").forEach((skill) => {
    skills.push(skill.childNodes[0].textContent.trim());
  });

  const profileData = {
    name: name,
    bio: bio,
    skills: skills,
  };

  localStorage.setItem("profileData", JSON.stringify(profileData));

  profileName.textContent = name;
  profileBio.textContent = bio;
  editDiv.hidden = true;
});
addSkillBtn.addEventListener("click", () => {
  const skill = skillInput.value.trim();

  if (skill === "") return;

  const skillDiv = document.createElement("div");
  skillDiv.classList.add("skill");

  skillDiv.innerHTML = `
        ${skill}
        <button class="remove-skill" type="button">×</button>
    `;

  skillsContainer.appendChild(skillDiv);

  skillInput.value = "";
});
skillsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-skill")) {
    e.target.parentElement.remove();
  }
});
// shoud login before open profile page
let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "./login.html";
}
// logout
let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function (event) {

  event.preventDefault();

  localStorage.removeItem("currentUser");

  window.location.href = "./login.html";

});
