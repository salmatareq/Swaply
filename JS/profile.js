const uploadBtn = document.querySelector(".edit-image");
const imageInput = document.getElementById("imageInput");
const profileImage = document.querySelector(".profile-pic img");
const profileImage2 = document.querySelector("#profileImage");
const savedImage = localStorage.getItem("profileImage");

if (savedImage) {
  profileImage.src = savedImage;
  profileImage2.src = savedImage;
}

uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      profileImage2.src = reader.result;

      localStorage.setItem("profileImage", reader.result);
    };

    reader.readAsDataURL(file);
  }
});
