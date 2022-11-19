// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  openlibUrl: 'https://openlibrary.org/trending/daily.json',
  //registrationUrl: 'http://localhost:9093',
  registrationUrl: 'http://localhost:8765/registration-service',
  //authUrl: 'http://localhost:9092/login',
  authUrl: 'http://localhost:8765/authentication-service/login',
  //favUrl:'http://localhost:9091/favorite',
  favUrl: 'http://localhost:8765/favorite-book/favorite',


  testUrl: 'http://localhost:8080/bookapp/v1/users'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
