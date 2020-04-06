# project-demo-twitter

This project contains two folder. One for React App and Another for Graphql Server

For Reach app in folder "twitter-demo" Run below commands Build Docker Image docker build -t twitter-demo:dev .

Run container docker run -it -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm twitter-demo:dev

For Server in folder "gserver". Run below commands dcker-compose up
