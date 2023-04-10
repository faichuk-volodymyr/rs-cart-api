import { CREATE_ORDER_QUERY } from "src/order/query";


/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require('pg');
require('dotenv').config();

const {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USER_NAME,
} = process.env;

const dbOptions = {
  user: DB_USER_NAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
};

export const runOrderTransaction = async ({
  userId,
  cartId,
  delivery,
  payment,
  status,
  comments,
}) => {
  const client = new Client(dbOptions);
  client.connect();

  try {
    await client.query('BEGIN');

    await client.query(CREATE_ORDER_QUERY, [
      userId,
      cartId,
      delivery,
      payment,
      comments,
      status,
    ]);

    await client.query('COMMIT');
    console.log('Data inserted successfully!');
  } catch(error) {
    await client.query('ROLLBACK');
    console.error('Failed to insert data:', error);
  } finally {
    client.end();
  }
};