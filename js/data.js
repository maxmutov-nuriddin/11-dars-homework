const info = new URLSearchParams(location.search).get("name");
// console.log(info);

const boxs = document.querySelector('.boxs');
const innerBox = document.querySelector('.inner-box');


function boxFun(element, flowDataLength, flowsData, reposData) {
  return `<div class="card border border-0" style="width: 17rem;">
  <img src="${element.avatar_url}" class="card-img-top border rounded-circle" >
  <span class="position-absolute end-0 mx-1 my-1 border rounded-5 px-2 py-1 bg-warning text-bg-secondary" style="bottom:32%; font-size:10px;">${element.id}</span>
    <div class="card-body border rounded-4 mt-2 text-center">
      <a href="${element.html_url}" class="card-title fw-bold fs-4">${element.login}</a>
      <div class="flowers-box d-flex justify-content-evenly align-items-center">
        <p class="flowers-text">${flowDataLength.length} followers</p>
        <p class="flowers-texts">${flowsData.length} following</p>
        <p class="flowers-texts">${reposData.length} repository</p>
      </div>
    </div>
  </div>`;
}

function reposFun(item) {
  return`
    <a class="" href="${item.html_url}">${item.name}</a>
  `
}




async function getPosts() {
  try {
    let res = await fetch(`https://api.github.com/search/users?q=${info}`);
    let flow = await fetch(`https://api.github.com/users/${info}/followers`);
    let flows = await fetch(`https://api.github.com/users/${info}/following`);
    let repos = await fetch(`https://api.github.com/users/${info}/repos`);

    if (flow.ok === false) {
      throw new Error(`Error: ${flow.status} ${flow.statusText}`);
    }
    if (flows.ok === false) {
      throw new Error(`Error: ${flows.status} ${flows.statusText}`);
    }
    if (repos.ok === false) {
      throw new Error(`Error: ${repos.status} ${repos.statusText}`);
    }
    if (res.ok === false) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    let flowsData = await flows.json();
    let flowData = await flow.json();
    let reposData = await repos.json();
    let data = await res.json();


    reposData.map((item) => {
      // console.log(item);
      innerBox.innerHTML += reposFun(item);
    })




    // console.log(flowData.length);

    let posts = data.items;

    let filt = posts.filter((item) => item.login === info);

    filt.map((item) => {
      console.log(item);
      boxs.innerHTML += boxFun(item, flowData, flowsData, reposData);
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

getPosts();