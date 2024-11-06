import { Pool } from 'pg/dist/native/pool';

const connectionString = 'postgresql://username:password@localhost:5432/database';

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        console.error('Error running query:', err);
      } else {
        console.log('Query result:', result.rows[0]);
      }
    });
  }
});