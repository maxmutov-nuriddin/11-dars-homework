const box = document.querySelector('.box');
const input = document.querySelector('.input');

function boxFun(element) {
  return `<div class="card border border-0" style="width: 17rem;">
  <img src="${element.avatar_url}" class="card-img-top border rounded-circle" >
  <div class="card-body border rounded-4 mt-2 text-center">
    <h5 class="card-title">${element.login}</h5>
    <a href="info.html?name=${element.login}" class="btn btn-primary">See akk</a>
  </div>
</div>`;
}

async function getPosts() {
  try {
    let inp = input.value;
    let res;
    if (inp === "") {
      res = await fetch(`https://api.github.com/users`);
    } else {
      const searchValue = input.value;
      res = await fetch(`https://api.github.com/search/users?q=${searchValue}`);
      // console.log(res);
    }
    if (res.ok === false) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    let data = await res.json();
    // console.log(data);

    box.innerHTML = "";

    let posts = inp === "" ? data : data.items;
    // console.log(posts);
    posts.map((item) => {
      box.innerHTML += boxFun(item);
    });

  } catch (err) {
    console.log("Error:", err);
  }
}

input.addEventListener("keyup", getPosts);

getPosts();