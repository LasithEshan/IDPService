const baseURI = 'http://localhost:8080/auth/admin/realms/dev';
const roleManagementID = '1212e4a8-b5a0-4e24-a4bb-8b8caed2513f';

//db credentials
const DB_USER = "keycloak_svc";
const DB_PASSWORD = "keycloak123";
const DB_CONN_STR = "35.240.199.189:1521/xe";

//permissions
const ROLE_INPUTTER = 'inputter';
const ROLE_AUTHORIZER = 'authorizer';
const ROLE_EDITOR = 'editor';
const ROLE_VIEWUSERS = 'viewUsers'

//Authorization tasks
const CREATE_USER = 'CREATE_USER';
const EDIT_USER = 'EDIT_USER';
const DELETE_USER = 'DELETE_USER';

//Authorized states
const AUTHORIZED = 0;
const NOT_AUTHORIZED = 1;


const USER_CREATED_RESPONSE = 'User Created';



module.exports = {
    baseURI,
    roleManagementID,
    ROLE_INPUTTER,
    ROLE_AUTHORIZER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    AUTHORIZED,
    NOT_AUTHORIZED,
    USER_CREATED_RESPONSE,
    ROLE_EDITOR,
    DB_CONN_STR,
    DB_PASSWORD,
    DB_USER,
    ROLE_VIEWUSERS
}