PREREQUISITES:

Node Js - 18.0.0
MySQL - 8.0.3
Docker - 24.0.6

Node Packages Needed:

1. Express
2. dotenv
3. nodemon (development dependency)
4. mysql2
5. jsonwebtoken
6. express-validator
7. jest
8. supertest

Environment setup:

Normal Server:

step 1: git clone https://github.com/madhusudhan890/Backend_Interview.git

step 2: go into the project and run npm i (In case if nodemodules has not been there)

step 3: provide necessary data for MySQL like database name,port,host,password etc in .env file before running the server. Along with please provide server port ,JWT secretkey.
Here is the structure of enviroment variables:

            PORT = 3000
            CREATETABLE = true (flag to create tables only when needed. true for create and false for don't create)
            SECRET = Ironman
            MYSQL_HOST = localhost,
            MYSQL_USER = root,
            MYSQL_PASSWORD = password,
            MYSQL_DATABASE = test
        Provide environment variables based on your configuration.

step 4: Run npm run dev , To start the server.if environment varibales setup correctly ,server will run at PORT 3000.

step 5: Signup into the app to get JWT Token in order to access other services. IN order to get api endpoints go to routes/routes.js folder.

Here are few apis to follow through:

            1. http://localhost:3000/v1/api/signup      Method: POST , body: userName ,password, email
            2. http://localhost:3000/v1/api/login       Method: POST , body: password, email
            3. http://localhost:3000/v1/api/services    Method: POST , body: serviceName  , authentication: Bearar TOken
            4. http://localhost:3000/v1/api/orders      Method: POST , body: serviceId,totalfee, authentication: Bearar TOken
            5. http://localhost:3000/v1/api/orders      Method: GET ,  query: orderId, authentication: Bearar TOken

step 6: Place JWT Token acquired during sign up process and use it for accessing other routes.

Using Docker:

everything is being set up. Just follow the commands in terminal to run the server.

    1. docker-compose up (to build and deploy containers based on commands on yml files. run this command in project root directory)
    2. You will see server is running on PORT 3000. Test above APIs to obtain results.

    Other commands:

    1. ctrl+c : to stop the server
    2. docker-compose down: to remove stopped containers  and build newly.

DESCRIPTION:

Javascript is the programming language being used in these project.

1. Express framework has been used to set up the server in node js . And MySQL is being default Database.
2. Packages Jest and superTest are used for INTEGRATION TESTING.

How this works:

-> I understood based on project description is that users can place orders based on services provided by the company. Users can place any number of orders of different services at any time. If any user want to order service within less than 3 hours of previous order of same service ,Application will throw error to place same service order after 3 hours.

Assumptions I made:

1. In order to place orders,user shoud be signed up with credible credentials like email ,number etc.
2. Services are being created/updated by company itself. User cannot create services ,user can only use services provided by company.
3. User can place one order at a time.
4. User can see the orders placed by him/his only.

If these project for production,I would recommand following features to add:

1. I will take credible information from the user first like Phone Number and email before taking orders.
2. Make this app to take bulk orders at a time. (only of distinct service orders)
3. Make customer support chat to address users issues.
4. Confirm their order through sms/email for cross-check . And Add service tracking at user end.
5. Provide details of assigned people for service to the user and date of service will be provided.(like giving heads up about company people)
6. Cancellation policy of the service.
7. Review/feedback system for company services.

Time spent by me to build this project:

    TOTAL : 15 hrs.

        First 2 hours   : Understanding requirement and creating a roadmap.
        Next 2 hours    : Environment setup like server setup and database setup,authentication ,authorization.
        Next 1 hour     : User signup,login. from creating routes,controllers to service providing.
        Next 2 hour     : Creating services.
        Next 2 hour     : Creating orders.
        Next 2 hour     : Writing Test cases for Integration Testing.
        Next 1 hours    : Creating docker files,running containers.
        Next 3 hours    : Testing ,Testing and Testing.

Problems Faced:

1. I had problem of writing few testcases.
