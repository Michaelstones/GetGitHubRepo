const APi = "https://api.github.com/users/";
// const APIRepo = "https://api.github.com/users/repo";

const main = document.querySelector(".main");
const form = document.querySelector(".form");
const inputEl = document.querySelector(".inputEl");

async function getUser(user) {
  const res = await fetch(APi + user);
  const data = await res.json();
  //   console.log(data);
  createUser(data);
  getRepo(user);

  return data;
}

async function getRepo(user) {
  const res = await fetch(APi + user + "/repos");
  const data = await res.json();

  cartRepo(data);
  //   console.log(data);
}
console.log(getRepo("ufe-pr"));
function createUser(data) {
  if (data) {
    const template = `
   <div class='card'>
        <div class='img-container'>
            <img src=${data.avatar_url} alt=${data.name}/>
        </div>
        <div class='content'>
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <ul>
                <li> 
                ${data.followers}
                <strong>Followers</strong>
                </li>
                <li>
                    ${data.following}
                    <strong>Following</strong>
                </li>
                <li>
                    ${data.public_repos}
                    <strong>Repos</strong>
                </li>
            </ul>
            <h4>Repos</h4>
            <div id='repos'></div>
        </div>
   </div>
   `;
    main.innerHTML = template;
  } else {
    alert("No Git Repo found");
  }
}

function cartRepo(data) {
  if (data) {
    const reposEl = document.getElementById("repos");
    data
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)
      .forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
      });
    inputEl.innerHTML = "";
  } else {
    alert("NotFound");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = inputEl.value;
  //   console.log(user);
  if (user) {
    getUser(user);
  }
  inputEl.value = "";
});
