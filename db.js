const db = require('oracledb');
db.outFormat = db.OBJECT;
let result = null;

async function insertUser(username, email, creator, id) {
    let connection;
    try {
        connection = await db.getConnection({
            user: 'keycloak_service',
            password: 'keycloak123',
            connectString: '35.240.185.133:1521/xe'
        });
    
        let result = await connection.execute(
            `insert into users values('${username}', '${email}', '${creator}', '${id}')`
        );
        console.log(result);
        
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                // return result;
                await connection.close();
                
            } catch (err) {
                console.log(err)
            }
        }
    }



}

async function getAllUsers() {
    let connection;
    try {
        connection = await db.getConnection({
            user: 'keycloak_service',
            password: 'keycloak123',
            connectString: '35.240.185.133:1521/xe'
        });

        let result = await connection.execute(
            `select * from users`
        );
        console.log(result);
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
                return result;
            } catch (err) {
                console.log(err)
            }
        }
    }
}

async function deleteUser(id){
    let connection;
    try{
        connection = await db.getConnection({
            user: 'keycloak_service',
            password: 'keycloak123',
            connectString: '35.240.185.133:1521/xe'
        });

        let result = await connection.execute(
            `delete from users where id=${id}`
        )
    } catch (err){
        console.log(err);
    } finally {
        if(connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = {
    insertUser,
    getAllUsers,
    deleteUser
};


