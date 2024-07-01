import { Ui } from './domfunctions.js';

// Games Class
export class Games {
  constructor() {
    this.fetchGames('mmorpg');

    document.querySelectorAll('.menu a').forEach((link) => {
      link.addEventListener('click', (e) => {
        document.querySelector('.menu .active').classList.remove('active');
        e.target.classList.add('active');
        this.fetchGames(e.target.dataset.category);
      });
    });

    this.ui = new Ui();
  }

  async fetchGames(category) {
    const loading = document.querySelector('.loading');
    loading.classList.remove('d-none');
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '00d566ff36msh5cfbcb84a586b5bp1ebbb2jsnbdd14e08c0dc',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const data = await res.json();

    this.ui.displayDataGame(data);
    this.startEvent();
    loading.classList.add('d-none');
  }

  startEvent() {
    document.querySelectorAll('.card').forEach((item) => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector('.games').classList.add('d-none');
    document.querySelector('.details').classList.remove('d-none');
  }
}

new Games();

// Details Class

class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById('btnClose').addEventListener('click', () => {
      document.querySelector('.games').classList.remove('d-none');
      document.querySelector('.details').classList.add('d-none');
    });

    this.getDetails(id);
  }

  async getDetails(idGame) {
    const loading = document.querySelector('.loading');
    loading.classList.remove('d-none');

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '00d566ff36msh5cfbcb84a586b5bp1ebbb2jsnbdd14e08c0dc',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`,
        options
      );
      const data = await response.json();
      this.ui.displayDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading.classList.add('d-none');
    }
  }
}
