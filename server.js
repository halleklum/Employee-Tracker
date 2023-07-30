const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeTracker_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected");
    start();
});

function start() {
    inquirer
        .createPromptModule({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
            ],
        })
    .then((answer) =>{
        switch(answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
}

function viewAllEmployees() {
    // const query = `
    // SELECT e.id e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, '', m.last_name) AS manager_name FROM employee e
    // LEFT JOIN roles r ON e.role_id = r.id
    // LEFT JOIN departments d ON r.department_id = d.id
    // LEFT JOIN employee m ON e.manager_id = m.id;
    // `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllDepartments() {
    const query = "SELECt * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    // const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addEmployee() {
    // "SELECT id, title FROM roles"
    connection.query((error, results) => {
        if (error) {
            console.error(error); 
            return;
        }

        const roles = results.map (({id, title}) => ({
            name: title,
            value: id,
        }))

        connection.query(
            // 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                const manager = results.map(({id, name}) =>({
                    name,
                    value: id,
                }));

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "first_name",
                            message: "Enter Employees First Name",
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "Enter Employees Last Name", 
                        },
                        {
                            type: "input",
                            name: "roleID",
                            message: "Select Employee's Role",
                            choices: roles,
                        },
                    ])
                    .then((answers) => {
                        const sql = "INSERT INTO employee ("
                    })
            }
        )
    })
}