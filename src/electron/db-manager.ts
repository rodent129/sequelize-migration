import Sequelize from 'sequelize';
import * as path from 'path';
import {DbMigrate} from './db-migrate';

export class DbManager {

  private readonly dbName = 'test';
  private sequelize;
  private callModel;

  constructor(private storagePath) {
    const storage = path.join(storagePath, this.dbName + '.sqlite');
    this.sequelize = new Sequelize(this.dbName, null, null, {
      dialect: 'sqlite',
      storage: storage,
      operatorsAliases: false
    });

    // Define calls tablename
    this.callModel = this.sequelize.define('call', {
      number: { type: Sequelize.STRING, allowNull: false },
      call_type: { type: Sequelize.STRING },
      date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      duration: { type: Sequelize.INTEGER },
      new: { type: Sequelize.STRING },
      video: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      cached_name: { type: Sequelize.STRING },
      cached_photo_uri: { type: Sequelize.STRING },
      source_type: { type: Sequelize.STRING },
      source_unique_key: { type: Sequelize.STRING }
    });
  }

  public connect() {
    this.sequelize.authenticate()
      .then(() => {
        this.sequelize.sync()
          .then(() => {
            this.migrate();
          })
          .catch(error => {
            console.log('sync error');
          });
      })
      .catch(error => {
        console.log('unable to connect to the database');
      });
  }

  migrate() {
    const dbMigrate = new DbMigrate(this.sequelize, Sequelize);
    dbMigrate.getUmzug().up()
      .then(() => {
        console.log('migrate success');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
