import { UI } from "./ui.module.js";

export class Details {
  constructor(gameId) {
    document.getElementById("closeIcon").addEventListener("click", () => {
      document.getElementById("games").classList.remove("d-none");
      document.getElementById("details").classList.add("d-none");
      
    });

    this.loadingScreen = document.getElementById("loading");
    this.alertError = document.getElementById("errorMessage");
    this.fetchGameDetails(gameId);
  }

  //handle fetch getDetailsGame function from api
  async fetchGameDetails(gameId) {
    try {
      // start call api
      this.loadingScreen.classList.remove("d-none");
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "41477b7c1fmsh8944f91c6ed3057p1853b3jsn5b5590e240a0",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        options,
      );

      if (response.ok) {
        const data = await response.json();


        new UI().displayDetailesData(data);

        this.alertError.classList.add("d-none");
      }
    } catch (error) {
      console.log(error);
      this.alertError.classList.remove("d-none");
    } finally {
      this.loadingScreen.classList.add("d-none");
    }
  }
}
