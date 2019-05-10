import { Pool, QueryResult, PoolClient } from 'pg'
import { connectionString } from './dbKey';

const pool = new Pool({
    connectionString: connectionString
})

export const query = (text: string, params: any[],
    callback: (err: Error, result: QueryResult) => void) => {
    return pool.query(text, params, callback)
}

export const connect = (callback: (err: Error, client: PoolClient,
    done: (release?: any) => void) => void) => {
    pool.connect((err: Error, client: PoolClient,
        done: (release?: any) => void) => {
        callback(err, client, done)
    })
}