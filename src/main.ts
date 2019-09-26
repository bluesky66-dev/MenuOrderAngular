import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {AppConfig} from './environments/environment';

// ( async () => {
//   const mongoClient = connectToDb();
//   try {
//     const checkConnect = await mongoClient.connect();
//     const db = mongoClient.db(process.env.DB_NAME);
//     await db.collection('Logs').insertOne({executeTime: new Date()});
//     console.log('mongoClient okay', checkConnect);
//     mongoClient.close();
//   } catch (e) {
//     console.log('mongoClient error', e);
//     mongoClient.close();
//     remote.getCurrentWindow().reload();
//   }
// })();


if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
