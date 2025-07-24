export class Database {
  #database;
  constructor() {
    this.#database = [];
  }

  async saveUser(user) {
    this.#database.push(user);
  }
}
