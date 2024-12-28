import { Details } from "./details.module.js";
import { UI } from "./ui.module.js";
export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);
        this.getGames(link.textContent);
      });
    });

    this.details = document.getElementById("details");
    this.loadingScreen = document.getElementById("loading");
    this.alertError = document.getElementById("errorMessage");
    this.games = document.getElementById("games");
    this.logoutIcon = document.getElementById("logout-icon");

    // handle logout function
    this.logoutIcon.addEventListener("click", () => {
      localStorage.removeItem("userData");
      window.location.href = "index.html";
    });

    this.ui = new UI();

    this.getGames("mmorpg");
  }

  // change active link function
  changeActiveLink(link) {
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
    link.classList.add("active");
  }

  // fething data from api
  async getGames(gameCategory) {
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
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameCategory}`,
        options,
      );

      if (response.ok) {
        const data = await response.json();

        this.ui.displayGames(data);
        document.querySelectorAll(".card").forEach(card => {
          card.addEventListener("click", () => {
            this.details.classList.remove("d-none");
            this.games.classList.add("d-none");
            new Details(card.dataset.id);
          });
        });
        this.alertError.classList.add("d-none");
      }
    } catch (error) {
      console.error(error);
      this.alertError.classList.remove("d-none");
    } finally {
      this.loadingScreen.classList.add("d-none");
    }
  }
}
