const db = require("oracledb");
db.outFormat = db.OBJECT;
// let result = null;

//create connection
function createConnection() {
  let connection;
  connection = db.getConnection({
    user: "keycloak_svc",
    password: "keycloak123",
    connectString: "35.240.199.189:1521/xe"
  });
  return connection;
}



//user insert query which updates the auth tasks as well
async function insertUser(
  username,
  email,
  creator,
  id,
  name,
  epfno,
  branch,
  department,
  mobile,
  start,
  end,
  status,
  password,
  role,
  task,
  state,
) {
  let connection;
  let result;
  try {
    connection = await createConnection();

    let insertResult = await connection.execute(
      `insert into users values('${username}', '${email}', '${creator}', ${id}, '${name}', '${epfno}', '${branch}', 
        '${department}', '${mobile}', TO_DATE('${start}', 'YYYY-MM-DD'), TO_DATE('${end}', 'YYYY-MM-DD'), '${status}', '${password}', '${role}', '${task}', ${state})`
    );

    result = insertResult;
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        // return result;
        await connection.close();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return result;
}




async function getAllUsers() {
  let connection;
  let result;
  try {
    connection = await createConnection();

    result = await connection.execute(`select * from users`);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return result;
      } catch (err) {
        console.log(err);
      }
    }
  }
  return result;
}




async function deleteUser(id) {
  let connection;
  try {
    connection = await createConnection();

    let result = await connection.execute(`delete from users where id=${id}`);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
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
