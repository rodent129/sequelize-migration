import * as path from 'path';
// import Umzug from 'umzug';

export class DbMigrate {

  private umzug;
  private debugging = false;

  constructor(private sequelize, private Sequelize) {
    const Umzug = require('umzug');
    console.log('dirname:' + __dirname);
    console.log('cwd:' + process.cwd());
    this.umzug = new Umzug({
      storage: 'sequelize',
      storageOptions: {
        sequelize: this.sequelize
      },
      // logging: this.customLog.bind(this),
      // logging: false,
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

  customLog(message: any) {
    if (this.debugging) {
      console.log(message);
    }
  }
}
