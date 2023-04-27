import cluster from 'cluster';
import { initServer } from './startServer';
import { initIpfs } from './services/ipfs/startIpfsClient';

if (cluster.isPrimary) {
  initIpfs();
  initServer();
  /* 
  1 -> Run backend server
  2 -> Run IPFS Client
  */
}
