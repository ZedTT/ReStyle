import { Pool, QueryResult } from 'pg'
import { connectionString } from '../dbKey';

const pool = new Pool({
    connectionString: connectionString
})

export const query = (text: string, params: any[], 
    callback: (err: Error, result: QueryResult) => void) => {
    return pool.query(text, params, callback)
}