import pg from 'pg';
const { Client } = pg;

// Things i have learnt
// postgres is not case sensative when it comes to table names, that is why this.table
// works when specifing a table name
export class Database{
    constructor(table){
        this.client = new Client({
            user: 'postgres',
            password: 'test',
            host: 'database',
            port: 5432,
            database: 'expense',
        });
        
        this.client.connect().catch((Error)=>{
            console.log("Error:", Error);
        });

        this.table = table;
    }

    async get(property){
        let response = await this.client.query(`SELECT * FROM ${this.table} WHERE ${property}`);

        if(response.rowCount >= 1){
            return response.rows;
        }else{
            return false;
        }
    }

    escape(text){
        return text.replace(/'/g, "''");
    }
    
    /**
     * 
     * @param {String} table1 name of the first table
     * @param {String} col1 name of the matching column in the first table
     * @param {String} table2 name of the second table
     * @param {String} col2 name of the matching column in the second table
     * @returns the result of the two tables after being joined
     */
    async join(field, table1, table2){
        let response = await this.client.query(`SELECT  FROM ${table1}, ${table2}
                                                WHERE ${table1 + "." + field} = ${table2 + "." + field}`);
        return response;    
    }
}