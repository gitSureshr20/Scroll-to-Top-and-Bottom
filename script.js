const scrollToBottomButton = document.querySelector(".scroll-to-bottom-button");
const scrollToTopButton = document.querySelector(".scroll-to-top-button");
const loader = document.querySelector(".loader");
const userList = document.querySelector(".userList");

function showLoader() {
  loader.classList.add("showLoader");
  userList.classList.add("hide");
  scrollToBottomButton.style.display='none';
  scrollToTopButton.style.display='none';
}

function removeLoader() {
  loader.classList.remove("showLoader");
  userList.classList.remove("hide");
  scrollToBottomButton.style.display='block';
  scrollToTopButton.style.display='block';
}

async function fetchUserList() {
  showLoader();

  const response = await fetch("https://dummyjson.com/users?limit=100", {
    method: "GET",
  });
  const result = await response.json();
  if (result && result.users) showResult(result.users);

  removeLoader();
}

function showResult(getUsers) {
  userList.innerHTML = getUsers.map(
    (user) =>
      `
        <li>${user.firstName} ${user.lastName}</li>
    `
  ).join("");
}
fetchUserList();

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToBottomButton.addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});
