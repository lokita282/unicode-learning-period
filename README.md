<h1 align="center">Unicode Learning Period - Art Store</h1>

A backend project created using Node JS 


## Purpose of the Application:
 
It is the backend for an art store website where the owner(admin) can add artworks with their images and users can browse through them to place an order. Authentication has been applied.\
Another feature implemented is the auto-emailing service.

## Installation and Running

Clone the repository in your local machine.

#### ENV Variables
Create a .env file in the root directory and then add the following

PORT=The port at which you want to run the backend server on

DATABASE_URL=the link of your MongoDB database

TOKEN_SECRET=your jwt secret

#### Installing dependencies
Install all the dependencies required for the backend to run, by the command:
```bash
npm install
```
#### Run
To run the server, use the command:
```bash
npm run dev
```

If you get a message like below in the terminal, it means that your backend server is up and running and you can continue with the rest of the project

[![image.png](https://i.postimg.cc/5NkK1qcr/image.png)](https://postimg.cc/qzyxxKvc)
