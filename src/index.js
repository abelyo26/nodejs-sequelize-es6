import express, { json } from 'express';
import db from './database/models';

const app = express();

app.use(json());

app.get('/', async (req, res) => {
  res.json({ status: true, message: 'Our node.js app works' });
});

db.sequelize
  .sync()
  .then(() =>
    app.listen(5000, () => console.log('server listening on port 5000'))
  );
