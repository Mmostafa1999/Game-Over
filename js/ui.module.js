export class UI {
  constructor() {}

  displayGames(data) {
    let gamesCartona = "";

    for (let i = 0; i < data.length; i++) {
      gamesCartona += `<div class="col ">
                <div data-id=${data[i].id} class="card h-100 p-2">
                 
                    <img
                      src=${data[i].thumbnail}
                      class="card-img-top object-fit-cover"
                      alt=${data[i].title} />
                     
                    <div class="card-body p-2">
                      <div
                        class="fw-semibold d-flex align-items-baseline justify-content-between">
                        <p class="text-white">${data[i].title} </p>
                        <button
                          type="button"
                          class="btn fw-semibold badge  btn-primary btn-sm">
                          Free
                        </button>
                      </div>
                      <p class="card-text text-center opacity-50 short-description pb-1 text-white">
                        ${data[i].short_description.split(" ", 12).join(" ")} 
                      </p>
                    </div>
                    <div
                      class="card-footer pt-1 pb-0 px-2 d-flex justify-content-between align-items-baseline fw-bold">
                      <span class="badge text-bg-secondary">${data[i].genre}</span>
                      <span class="badge text-bg-secondary">${data[i].platform} </span>
                    </div>
                  
                </div>
              </div>`;
    }
    document.getElementById("rowData").innerHTML = gamesCartona;
  }

  displayDetailesData(data) {
    const detailesCartona = `
   <div class="col-md-4">
              <div class="image">
                <img
                  class="w-100 object-fit-cover rounded-1"
                  src="${data.thumbnail}"
                  alt="${data.title}" />
              </div>
            </div>
            <div class="col-md-8">
              <h2>Title: ${data.title}</h2>
              <p>
                Category:
                <span class="badge text-bg-primary">${data.genre}</span>
              </p>
              <p>
                platform:
                <span class="badge text-bg-primary">${data.platform}</span>
              </p>
              <p>
                Status:
                <span class="badge text-bg-primary">${data.status}</span>
              </p>
              <p>${data.description}</p>
              <a href="${data.freetogame_profile_url}" target="_blank"
                ><button class="btn btn-outline-warning mb-5">
                  Show Game
                </button></a
              >
            </div>


  `;
    document.getElementById("detailesRow").innerHTML = detailesCartona;
  }
}
