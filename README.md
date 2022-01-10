# My todo
## Tecnologies:
### Backend
- Java 11
- Maven 3.8.3
- Spingboot 2.6.0
- PostgreSQL latest

### Frontend
- React 17.0.2
- Axios 0.24.0
- Redux 1.7.1

### Build
- Docker engine 20.10.5
- Docker compose 1.29.0
- Tested with Node 14

## Running
Having docker-compose installed and the docker engine running, running the whole project is as simple as running `docker-compose up` on the root directory of the project.

This command will build and run the Docker images for the database, backend and frontend.

The first run will take longer as the build step on the backend and frontend have to download all the dependencies.

Frontend will be served at `localhost:3000` and backend API will be exposed at `localhost:8080`
## Structure
This is a monorepo containing the whole project.

Sources location:
- Backend `src/main/java`
- Frontend `src/webapp`
- Database set-up scripts `src/docker/database`
