/**
 * A one-point entry module to manage the connection with the database.
 */

import { Pool, QueryResult, PoolClient } from 'pg'
import { connectionString } from './dbKey';

const pool = new Pool({
    connectionString: connectionString,
    ssl: true,
})

/**
 * For one time queries. Client is taken from the pool and realesed automatically.
 */
export const query = (text: string, params: any[],
    callback: (err: Error, result: QueryResult) => void) => {
    return pool.query(text, params, callback)
}

/**
 * For transactions that need to be done using only one client.
 * After a transaction is finished or after an error occured 
 * 'done()' should be called to release a client to the pool.
 * If the client is not released, the connection can run out
 * of clients and wait for the available one indefinitely.  
 */
export const connect = (callback: (err: Error, client: PoolClient,
    done: (release?: any) => void) => void) => {
    pool.connect((err: Error, client: PoolClient,
        done: (release?: any) => void) => {
        callback(err, client, done)
    })
}
