import cluster from 'cluster';

let worker = null;
export const initServer = () => {
  cluster.setupPrimary({
    exec: `${__dirname}/server.js`,
  });
  worker = cluster.fork({ type: 'webserver' });

  worker.on('message', console.log);
};
