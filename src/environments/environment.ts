// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
	firebase  : {
		apiKey           : 'AIzaSyC8P8bRIZQ7vlGW810_1OW-SF_N-dbgYSI',
		authDomain       : 'angular-test-f89fd.firebaseapp.com',
		databaseURL      : 'https://angular-test-f89fd.firebaseio.com',
		projectId        : 'angular-test-f89fd',
		storageBucket    : 'angular-test-f89fd.appspot.com',
		messagingSenderId: '69097822595'
	}
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
