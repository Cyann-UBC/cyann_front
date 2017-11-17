# Cyann:

## Intro
This is this repository for Cyann's mobile app power by [Cyann's backend](https://github.com/Cyann-UBC/Cyann)

Please follow the step in the backend to build and run the server on your localhost:8080

## How to build?

### INSTALL NPM DEPENDENCIES
clone the reposiroty

```
git clone https://github.com/Cyann-UBC/cyann_front
```

navigate to the folder

```
cd cyann_front
```

install dependencies

```
npm install
```

then start

```
npm start
```

and now type the following url in your browser's address bar:

```
localhost:3000
```
You may run into some issues, when you try to test the web ui on your local host.
Your local database may not have any course or posts created.
It is because we limit the functionality of creating a course to instructor type of users.
And we need email verification to change someone's user_type to instructor.
One thing you can do is to use Robomongo, a database managing app, to change the content manually.
