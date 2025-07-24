export class Database {
  #database;
  constructor() {
    this.#database = [];
  }

  async saveUser(user) {
    return new Promise((resolve, reject) => {
      this.#database.push(user);
      resolve();
    });
  }
}
