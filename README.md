# Project details

Application to generate a chat with Angular connecting to socket private channels of a backend development project in NodeJS.

|                |Version							|
|----------------|-------------------------------|
|Angular|`19.2.15`            |
|NPM          |`11.5.2`            |
|Node.js          |`22.14.0`|
|Docker          ||

## Important note 

The source code documentation and project structure were generated using the compodoc library, which generates a static web page that can be deployed on a server. In this case, it was deployed on GitHub. [Documentation](https://dev-shelvin-batista.github.io/angular-socket-chat/)

## Instructions

To run the frontend project, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/angular-socket-chat.git` or using a GitHub graphical tool.

- After cloning the repository, install the node dependencies using the command `npm install` inside the `angular-socket-chat` project folder. If an error occurs, add the --force option.

- Run the command `ng serve` to start the server. By default, the url `http://localhost:4200` is used.

## Docker Instructions

To run the frontend project in a Docker container, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/angular-socket-chat.git` or using a GitHub graphical tool.

- Access the folder in a command terminal using the cd command.

- The project already has a Dockerfile that generates the image to create the container. Just create the image with the `docker build -t angular-socket-chat .` command.

- Create the container from the image created by running the `docker run --rm -p 4200:4200 angular-socket-chat` command.

- After running the above command, the container will be active and you will be able to access the frontend project from the host with the URL `http://localhost:4200/`.

- You can change the port to be used on the host by modifying the port in the **docker run** command in the **-p** option.