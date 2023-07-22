# Simple Student Saver
![](https://img.shields.io/badge/Express.js-%5E4.17.1-lightgrey)
![](https://img.shields.io/badge/nodemon-%5E2.0.20-yellowgreen)
![](https://img.shields.io/badge/Sqlite-%5E7.4.3-yellow)
![](https://img.shields.io/badge/json-%201.0-lightgrey)
![](https://img.shields.io/badge/Node.js-16.13.1-blue)
![](https://img.shields.io/badge/JavaScript-ES5-red)
![](https://img.shields.io/badge/HTML-5-brightgreen)
![](https://img.shields.io/badge/jquery-%201.5-blue)
![](https://img.shields.io/badge/sql-%2013.0-orange)
![](https://img.shields.io/badge/CSS-3-green)

This small project is an academy project. It was developed with Native Web Development Languages. The main goal of the project is to save a student data inside a Database. The project is subdivided in two parts such as: Front-end and Back-end. In Front-end, we have two views: register and saved students pages. Theses pages are using basic HTML and CSS to draw layouts, controls and JavaScript to make some HTTP requests to Back-end via Node.js. In students data page, a JavaScript functional component is built to draw each specific student data with animation effects attached to that. In Back-end, a simple Node.js API is developed to get and treat client requests. Express.js is used as a server to run this project. Note that each student data is stored into a local Database called SQLite. The communication between Front-end and Back-end uses AJAX and data transfer uses JSON language.

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
cd ~;\
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh;\
sudo bash /tmp/nodesource_setup.sh;\
sudo apt install nodejs;\
node -v
```

### <u>Project cloning</u>:
```sh
git clone git@github.com:obrymec/simple_student_saver.git simple_student_saver/
```

### <u>Install project dependencies</u>:
Go to the root folder of the project and run:
```sh
npm install;\
npm audit fix
```

### <u>Run project</u>:
Go to the root folder of the project and run:
```sh
npm start
```
Go to your favorite browser and tap on the search bar, the following link:
```sh
http://localhost:5000/
```
If you want to navigate between views, you can tap the following links:
```sh
http://localhost:5000/students
http://localhost:5000/sign-up
```
Enjoy :)
