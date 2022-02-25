function loadData() {
  const input = document.getElementById("search-input");
  const inputText = input.value;
  if (inputText == "") {
    const error = document.getElementById("error");
    error.innerText = "Please Enter a KeyWord !";
  } else {
    const error = document.getElementById("error");
    error.innerText = "";
    input.value = "";
    console.log(inputText);
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputText} `;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPlayer(data.player));
  }
}
function displayPlayer(players) {
  const container = document.getElementById("container");
  container.textContent = "";
  players.forEach((player) => {
    console.log(player);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
       <div onclick="loadDetails('${player.idPlayer}')" class="card">
            <img src="${player.strThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p class="card-text">
                Click To See Player Details
              </p>
            </div>
          </div>
       `;
    container.appendChild(div);
  });
}
function loadDetails(details) {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayerDetails(data.players[0]));
}
function displayPlayerDetails(player) {
  const container = document.getElementById("container2");
  container.innerHTML = ` 
    <div class="card">
        <img src="${player.strThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">
            <span><b>Sports:</b> ${player.strSport}</span><br>
            <span><b>Team:</b> ${player.strTeam} ${player.strTeam2}</span><br>
            <span><b>Nationality:</b> ${player.strNationality}</span><br>
            <span><b>Gander:</b> ${player.strGender}</span><br>
            <span><b>Date of Brith:</b> ${player.dateBorn}</span><br>
            <span><b>Heigth:</b> ${player.strHeight}</span><br>
            <span><b>Description:</b> ${player.strDescriptionEN}</span>
            </p>  
        </div>
    </div>   `;
}
