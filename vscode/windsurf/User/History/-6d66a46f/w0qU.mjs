export class Database {
  constructor() {
    this.database = [];
  }

  async saveUser(user) {
    this.database.push(user);
  }
}
