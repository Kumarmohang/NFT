/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import http from 'http';
// import cluster from 'cluster';
import app from './app'; // the actual Express app

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
