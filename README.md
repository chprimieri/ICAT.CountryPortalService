# TraCAD - Country Portal Service

Backend service for ICAT Climate Action Assessment Tool for Transport Sector - TraCAD.

Supported by [Initiative for Climate Action Transparency - ICAT](https://climateactiontransparency.org/).

Built using [Node.js 18](https://nodejs.org/dist/latest-v18.x/docs/api/) and [Nest](https://github.com/nestjs/nest) framework.

## Database Configuration

This application uses a [MySQL Database](https://www.mysql.com/). The `ICAT-country.sql` configuration file containing the database schema and some dummy data is provided in the root folder. This database is also used by the CountryScheduler application.

## Manual Installation

1. Download and install the [Node.js 18 LTS version](https://nodejs.org/en/download) for your operational system.

2. Download or clone this repository.

3. In the terminal, go to this repository's main folder.

4. Install the NPM dependencies (including Nest) with the command:

```bash
$ npm install --force
```

5. Set up the Environment Variables

  - In the machine:
    - **Windows:** using the `set` command in the terminal
    - **Linux/MacOS:** using the `export` command in the terminal

  - Or creating a `.env` file using `.env.example` as base

6. Run the app:

```bash
$ npm run start
```

## Google Cloud Installation with Docker

> This is an example cloud installation using [Docker](https://www.docker.com/) and Google Cloud Plataform. The provided `Dockerfile` can be used for local or cloud installation with different services.

1. In GCP Console, go to [Artifact Registry](https://console.cloud.google.com/artifacts) and enable the Artifact Registry API

2. In the Artifact Registry, create a new repository:

   - **Format:** Docker
   - **Type:** Standard
   - **Location:** desired application location
   - **Encryption:** Google-managed key

3. Download and install [gcloud CLI](https://cloud.google.com/sdk/docs/install).

4. Download or clone this repository.

5. In the terminal, go to this repository's main folder.

6. Build your container in the Artifacts Register using the provided `Dockerfile`. The container path can be found on the Artifact Registry's repository page.

```bash
$ gcloud builds submit --tag [CONTAINER PATH]
```

7. Go to [Cloud Run](https://console.cloud.google.com/run) and create a New Service:
   - Choose the option `Deploy one revision from an existing container image` and select the container image updated in the previous step
   - Add a service name
   - Select the application region
   - Select `Allow unauthenticated invocations` in the Authentication option
   - In the **Container section**:
     - Select Container port 8080
     - Add the Environment Variables
     - Add the Cloud SQL connections

> Noticed that some [special permissions in GCP](https://cloud.google.com/run/docs/reference/iam/roles#additional-configuration) can be necessary to perform these tasks.

## Environment Variables

The environment variables should be declared as follow:

| Variable name         | Description                                    |
| --------------------- | ---------------------------------------------- |
| `PORT`                | Application Port                               |
| `DATABASE_HOST`       | Database Host(*)                                 |
| `SOCKET_PATH`         | Database Socket Path(*)                          |
| `DATABASE_PORT`       | Database Port                                  |
| `DATABASE_USER`       | Database Socket User                           |
| `DATABASE_PASSWORD`   | Database Password                              |
| `DATABASE_NAME`       | Database Name                                  |
| `BASE_URL`            | Current Application URL                        |
| `CLIENT_URL`          | Country Service Web URL                        |
| `PWD_RESET_URL`       | Country Service Web URL + `/reset-password`    |
| `CAL_ENGINE_BASE_URL` | Calculation Engine URL                         |
| `MAC_PNG_URL`         | Python Application URL                         |
| `API_KEY_1`           | API key. Should be the same as used by clients |
| `API_KEY_2`           | API key. Should be the same as used by clients |

> (*) Can be used the Database Host or the Database Socket Path depending of the database configuration

## API Documentation

After the application installation, the API Documentation is available in the application URL + `/api/` with [Swagger](https://swagger.io/solutions/api-documentation/).

## Default Users

Some default users are provided for the application test. The `Admin` user can create, edit or delete new users.

> We recommend deleting the default users before deploying the application to production.

| Role                 | Username      | Password    | Description                          |
| -------------------- | ------------- | ----------- | ------------------------------------ |
| Country Admin        | country_admin | country1234 | User with administrative permissions |
| Data Collection Team | country_dct   | country1234 | Normal user                          |

## Dependencies

This application provides API service to CountryPortalWeb application and consumes data from CalculationEngine application API.

The complete dependency diagram of TraCAD Country and PMU applications:

<p align="left">
  <img src="https://lucid.app/publicSegments/view/9a6fb822-be5a-47d7-ad67-0434a4025234/image.png" width="800" alt="TraCAD Diagram" /></a>
</p>

## Standalone TraCAD Country App Installation

Suggested simplified installation of the standalone TraCAD Country Application:

<p align="left">
  <img src="https://lucid.app/publicSegments/view/173624cf-952e-40dd-bd8a-ab031a40a1b8/image.png" width="800" alt="TraCAD Simplified Diagram" /></a>
</p>

> This version doesn’t include the PMU TraCAD application and the CountryScheduler application responsible for the data synchronization between Country and PMU applications.

## License

TraCAD - CountryPortalService is [Affero GPL licensed](https://www.gnu.org/licenses/agpl-3.0.en.html).
