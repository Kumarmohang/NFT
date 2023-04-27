import cluster from 'cluster';

let worker = null;
export const initIpfs = () => {
  cluster.setupPrimary({
    exec: `${__dirname}/index.js`,
  });
  worker = cluster.fork({ type: 'ipfsService' });

  worker.on('message', console.log);
};
