# IronTrack

This project is a full-stack project to be completed in 20 weeks as part of the Develop Carolina Apprenticeship. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

# Installing Dependencies
In order to have this application running in your local environment, you must first clone the repo. Once the repository is cloned, install all dependencies by running `npm install`. 

```
$ npm install
```

# Setting up Enviornment Variables
There are some variables we want to keep secret, such as our api-ninjas API key! So in order to have this application running in development mode, you must set valid values for the predefined environment variables. This can be done by making a copy of `src/environments/environment.ts`

```
$ cp src/environments/environment.ts src/enviornments/environment.development.ts
```

Be sure to set `production=false`. Once you're environment variables are set up, you are ready to run the application.

# Running the Application

### Back-End Access
The server for this application lives in this [GitHub Repo](https://github.com/canasmh/IronTrackBE). The application can run without the server it but you will not be able to make an http requests, and thus lose the data persistence feature of Iron-Track.

To run the application, use the command
```
$ npm run dev
```

This will set up the proxy so that calls made to `/api/<endpoint>` redirect to `http:<serverurl>/<endpoint>`. It also replaces every instance of `environment.ts` with `environment.development.ts`.

Visit `localhost:4200` to see the application live!
