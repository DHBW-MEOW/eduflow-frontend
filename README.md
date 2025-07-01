# Eduflow-frontend
## Starting
The recommended way of starting everything at once is via the [eduflow-deploy](https://github.com/DHBW-MEOW/eduflow-deploy) repository.

### via npm (development)
- after cloning the repository execute ```npm install```
- to start execute ```npm run dev```
- to stop execute control+c

### via docker (deployment)
Build the container (for docker rename the Containerfile to Dockerfile):

`podman build -t eduflow-frontend .`

Start the container (make sure a data directory exists):

`podman run -p 8080:80 eduflow-frontend`

This will start a http webserver at port 8080.

## Design
The Design is shown in a Figma Project. It's accessible through the following Link:
https://www.figma.com/design/klul6yENeFLSB248jxyyHV/EduFlow?node-id=0-1&t=KGJc33sKniy9wvGU-1
