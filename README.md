<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# **Microservices Tip Management**

This project focuses on developing multiple microservices to manage technological tips, incorporating categories such as levels, languages, programming technologies, and sub-technologies. The main goal is to integrate all these categories into a single technological tip, allowing for filtered searches according to specific needs. The project adopts robust development practices to ensure reliability and scalability.


## Content Table

* Characteristics.
* Functionalities.
* Requirements.
* Local Configuration.
* Running the App.
* Queries in Postman.
* Gitflow Branching Strategy
* Participants.
* License.

## Characteristics

* Microservice Management
* Category Integration
* Search Filtering
* Robust Development Practices

## Functionalities

**Tip Management**
* Registration and management of technological tips.
* Organization of tips by levels, technologies, sub-technologies, and languages.
* Efficient search and filtering of tips.

**Technologies Used**
* **NestJS:** Framework for building scalable and maintainable microservices.
* **TypeScript:** Programming language that provides static typing and advanced development features.
* **MongoDB:** NoSQL database used to store tips and user records.
* **Swagger:** Tool for API documentation that facilitates the creation of interactive documentation.
* **Confluence:** Platform for team documentation and collaboration.

**Development Practices**
* **Traceability:** Logging all user requests for monitoring and auditing purposes.
* **Code Best Practices:** Use of design patterns, SOLID principles, and code reviews.
* **Testing:** Implementation of unit, integration, and end-to-end tests to ensure software quality.
* **Extensive Documentation:** Creation of documentation in Swagger and Confluence to facilitate the use and maintenance of the microservices.

## Local Configuration

To run the project locally, clone the repository and set up the necessary environment variables for the database.

1. Clone the repository:

    ``` bash
    git clone https://github.com/stivenloaiza/dev-tips-tips-backend.git
    cd dev-tips-tips-backend
    ```

2. Install the necessary dependencies:

    ``` bash
    npm install
    ```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:

    ``` bash
    cp .env.example .env    
    ```

Edit the .env file and configure the following values:

    // EXECUTION ENVIRONMENT (local | production)
    ENVIRONMENT =

    // PERSISTENCE LOCAL
    // Local connection example: mongodb://localhost:27017/{DB_NAME_LOCAL}
    DB_CONNECTION = mongodb://
    DB_HOST_LOCAL = localhost:27017/
    DB_NAME_LOCAL =

    // PERSISTENCE PRODUCTION
    // Production connection example: mongodb+srv://{DB_USERNAME}:       {DB_PASSWORD}{DB_HOST_PRODUCTION}/{DB_NAME_PRODUCTION}?retryWrites=true&w=majority
    DB_HOST_REMOTE =
    DB_NAME_REMOTE =
    DB_USERNAME =
    DB_PASSWORD =    

These steps will allow you to execute the project. Additionally, you must develop the environment variables according to your needs.

## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Queries in Postman

...


## Gitflow Branching Strategy

This project follows the Gitflow strategy, a robust model for software development. Here is how the branches are organized and their purpose:

* `main:` Main branch with stable code for production. 
* `dev:` Development branch with the latest features before production. 
* `feat/AT-20-NameTask:` Branch of tasks with functionalities, identified by a Jira ID in addition to the task name.

The work is integrated into the 'dev' branch for integration testing. Once 'dev' is stable and ready to be released, it is merged into 'main'.

If you want to contribute to the project, create a new branch from 'dev' using the appropriate prefix (feat/AT-20-NameTask). After finishing your work and testing, open a Pull Request towards 'dev'.

## Participants

The participants in the creation process during the "Microservices with Authentication and Tip Management" project were:

* Julian Roman.
* Camilo Manco.
* Angelica Hernandez.
* Hernan
* Camila Sepulveda

## License



Nest is [MIT licensed](LICENSE).
```

