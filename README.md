 Hello,  this is my Backend-Pet-Project on Node js for one e-commerce maket 
 https://www.figma.com/design/PuRSgfMB58AMNqr93biZGZ/Full-E-Commerce-Website-UI-UX-Design-(Community)?node-id=1-10&node-type=CANVAS&t=UaSjuJPtc9P0ouIE-0

 Description: REST Api-server based on OOP-programing style  
             with  authorization, registration, tokens, static-files-save,
             database comunicate, 10+ routes, middlewares,
             crypted-user-data

Api Server: express
Database: MySQL

Dependencies:
npm 
express
mysql2
sequelize
jsonwebtoken
bcrypt
dotenv
uuid
... comming soon more

Steps to run this express server
1. npm install       -- intall dependencies
2. npm install mysql2   --install database-work packages
3.  create new database 
4. check .env_example file  and create new dotenv file .env with
 same constants, but change db constants values with yours values
5. npm run dev  -- to run server
