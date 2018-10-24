import * as path from 'path';
// import Umzug from 'umzug';

export class DbMigrate {

  private umzug;

  constructor(private sequelize, private Sequelize) {
    const Umzug = require('umzug');
    console.log('dirname:' + __dirname);
    console.log('cwd:' + process.cwd());
    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.sequelize
      },
      migrations: {
        params: [
          this.sequelize.getQueryInterface(),
          this.sequelize.constructor
        ],
        path: path.resolve('src', 'electron', 'db', 'migrations'),
        pattern: /\.js$/
      }
    });
  }

  getUmzug() {
    return this.umzug;
  }
}
