To launch this program locally after download, you must:

PREREQUISITES
Have the following installed: MongoDB, VS code with live server plugin, node (npm install cors, express, mongoose packages)

DEPLOY
1. Start Mongo server if not already running (for Windows, search "services" in search bar, navigate to MongoDB server, right click "properties" then "start")
2. Create database in Mongo with these properties (I use MongoDB Compass):
    "host": "localhost",
    "port": 27017,
    "db": "charades-db"
3. Navigate to charades directory in CLI, cd into server and run "node app.js" (I use Git Bash)
4. Open charades parent directory in VS code and right click on index.html to launch in browser with live server extension
    - URL is http://localhost:5500/client/ if it doesn't open automatically

Server runs on localhost:3000
Client runs on localhost:5500