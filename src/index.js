import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from 'keycloak-js'

//keycloak init options

let initOptions = {
    url: 'http://localhost:8180/auth', realm: 'react-keycloack', clientId: 'login-app', onLoad: 'login-required', scope: 'openid',
}


/*
let initOptions = {
  "realm": "SpringBootKeycloak",
  "auth-server-url": "http://localhost:8180/auth/",
  "ssl-required": "external",
  "resource": "login-app",
  "clientId": 'login-app',
  "grant_type": 'password',
  "verify-token-audience": true,
  "credentials": {
    "secret": "cc79c220-955a-45fb-9b6d-fbfbce2401b3"
  },
  "use-resource-role-mappings": true,
  "confidential-port": 0
};
*/

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

	console.log("inside1");

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    console.log("keycloak: ", keycloak);
    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);
    console.log("keycloak1: ", keycloak.idTokenParsed);
    localStorage.setItem("preferred-username", keycloak.idTokenParsed.preferred_username);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

}).error(() => {
    console.error("Authenticated Failed");
});




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
