## Description
This small project is an academy project. It was developed with native Web Development Languages. The main goal of the project is to manage students data. The project is subdivided in two parts such as: Front-end and Back-end. In Front-end, we have two views: register and students data pages. Theses pages are using basic HTML and CSS to draw controls and JavaScript to make some HTTP requests to back-end via Node.js. In students data page, each student data is a JavaScript functional component designed to draw a specific user data with animation effects attached to that. In Back-end, a simple Node.js API is developed to get and treat client requests. Express.js is used as a server to run this project. Note that each student data is stored into a local Database like SQLite. The communication between Front-end and Back-end uses AJAX and data transfer uses JSON language.

## Final result
This is the final result of the project:<br/><br/>
[![Watch the video](https://img.youtube.com/vi/6vv_dhTlSUA/maxresdefault.jpg)](https://youtu.be/6vv_dhTlSUA)

## Project installation

### <u>Install curl</u>:
```sh
sudo apt install curl
```

### <u>Install nodejs</u>:
```sh
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
```
```sh
sudo bash /tmp/nodesource_setup.sh
```
```sh
sudo apt install nodejs
```
```sh
node -v
```

### <u>Project cloning</u>:
```sh
git clone git@github.com:obrymec/Simple-Student-Saver.git simple-student-saver/
```

### <u>Install project dependencies</u>:
Go to the root folder of the project and run:
```sh
npm install
npm audit fix
```

### <u>Run project</u>:
Go to the root folder of the project and run:
```sh
npm start
```
Go to your favorite browser and tap on the search bar the following link:
```sh
http://localhost:5000/
```
If you want to navigate between views, you can tap the following links:
```sh
http://localhost:5000/students
http://localhost:5000/sign-up
```
Enjoy :)
