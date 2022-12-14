
////////////// Spinner Loading //////////////
const toggleSpinner = spinner => {
     document.getElementById("spinner").style.display = spinner;
}

////////////// blank input warning //////////////
const blankInput = warning => {
     document.getElementById("blank-input").style.display = warning;
}

/////////////// incorrect items input warning //////////////
const incorrectInput = CorrectMsg => {
     document.getElementById("incorrect-input").style.display = CorrectMsg;
}


/////////////// Load Phone data //////////////
const phoneDataLoad = () => {
  const searchBox = document.getElementById("search-box").value;
  document.getElementById("search-box").value = "";
  
  const cardContainer = document.getElementById("cards-container");
    cardContainer.textContent = "";
  
    //  clear single cards container data
  const cardsContainerrow = document.getElementById("row-container");
     cardsContainerrow.textContent = ""; 
  toggleSpinner("block");
  incorrectInput("none")
  
  if (searchBox == "") {
     blankInput("block");
     toggleSpinner("none");
  }
  else {
     blankInput("none");
     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox}`)
        .then(res => res.json())
        .then(data => displayResult(data.data));
  }
};


/////////////// Display Phone items //////////////
const displayResult = (phone) => {
 const cardContainer = document.getElementById("cards-container");
    cardContainer.textContent = "";
    toggleSpinner("none");

  if (phone.length == 0) {
    toggleSpinner("none")
    incorrectInput("block")
  }
  else {
    phone.forEach(phones => {
          const div = document.createElement("div");
          div.classList.add("col");
          div.innerHTML = `
  <div class="card h-100 shadow p-3">
  <img src="${phones.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Model: ${phones.phone_name}</h5>
    <p class="card-text">Brand: ${phones.brand}</p>
    <button style = "background-color:#32ba7c; width: 120px; height: 40px" onclick = "phoneDetails('${phones.slug}')" class = "rounded text-white border-0">Full Details</button>
   
  </div>
  </div>
  `;
      cardContainer.appendChild(div);
      });
  };
 
};


/////////////// Load single Phone details //////////////
const phoneDetails = async phoneDetails => {
  const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${phoneDetails}`;
  const res = await fetch(phoneDetailsUrl);
  const data = await res.json();
        displaySinglePhone(data);
};


/////////////// Display single Phone items //////////////
const displaySinglePhone = singlePhones => {
    const cardsContainerrow = document.getElementById("row-container");
    cardsContainerrow.textContent = "";
    const div = document.createElement("div");
    div.classList.add("row");
    div.innerHTML = `
    <div class="col-md-4";>
    <img style = "width: 940px" src="${singlePhones.data.image}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${singlePhones.data.name}</h5>
      <p class="card-text mb-1"><span class = "fw-bold">Brand:</span> ${singlePhones.data.brand}</p>
      <p class="card-text mb-1"><span class = "fw-bold">ChipSet:</span> ${singlePhones.data.mainFeatures.chipSet}</p>
      <p class="card-text mb-1"><span class = "fw-bold">display Size:</span> ${singlePhones.data.mainFeatures.displaySize}</p>
      <p class="card-text mb-1"><span class = "fw-bold">memory:</span> ${singlePhones.data.mainFeatures.memory}</p>
      <p class="card-text mb-1"><span class = "fw-bold">Sensors:</span>
      ${singlePhones.data.mainFeatures.sensors[0]}
      ${singlePhones.data.mainFeatures.sensors[1]} ,
      ${singlePhones.data.mainFeatures.sensors[5]} ,
      ${singlePhones.data.mainFeatures.sensors[6]}  
      </p>
      <p class="card-text mb-1"><span class = "fw-bold">Bluetooth:</span> ${singlePhones.data.others?.Bluetooth}</p>
      <p class="card-text mb-1"><span class = "fw-bold">GPS:</span> ${singlePhones.data.others.GPS}</p>
      <p class="card-text mb-1"><span class = "fw-bold">USB:</span> ${singlePhones.data.others.USB}</p>
      <p class="card-text mb-1"><span class = "fw-bold">NFC:</span> ${singlePhones.data.others.NFC}</p>
      <p class="card-text mb-1"><span class = "fw-bold">Radio:</span> ${singlePhones.data.others.Radio}</p>
      <p class="card-text"><small class="text-muted">${singlePhones.data.releaseDate ? singlePhones.data.releaseDate: "no available release date"}</small></p>
    </div>
  </div>
    `
    cardsContainerrow.appendChild(div)
}
