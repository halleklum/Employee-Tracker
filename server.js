const inquirer = require("inquirer");
const mysql = require("mysql");
const cfonts = require('cfonts');

cfonts.say('BARBIE Movie \nEmployee \nTracker', {
	font: 'block',              // define the font face
	align: 'left',              // define text alignment
	colors: ['magentaBright'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 1,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: true,            // define your two gradient colors
	independentGradient: true, // define if you want to recalculate the gradient for each new line
	transitionGradient: true,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment cfonts is being executed in
});

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "miumiu23!",
  database: "employeeTracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected");
  start();
});

function start() {
  inquirer
    .prompt({
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
    .then((answer) => {
      switch (answer.action) {
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
    });
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
          err ? console.error(err) : console.table(results);
          start();
    });
  }

  function viewAllRoles() {
    connection.query('SELECT * FROM roles', (err, results) => {
          err ? console.error(err) : console.table(results);
          start();
    })
  }

function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
        err ? console.error(err) : console.table(results);
        start();
  })
}


function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department you'd like to add?",
        },
      ])
      .then((answers) => {
        const departmentName = answers.name;
        connection.query(
          'INSERT INTO department (department_name) VALUES (?)',
          [departmentName],
          (err, results) => {
            if (err) {
              console.error(err);
            } else {
              connection.query('SELECT * FROM department', (err, results) => {
                if (err) {
                  console.error(err);
                } else {
                  console.table(results);
                }
                start();
              });
            }
          }
        );
      });
  };

  function addRole() {
    const departmentQuery = `SELECT * FROM department`;
    connection.query(departmentQuery, (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(rows)
      const departmentChoices = rows.map

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role you'd like to add?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
          },
          {
            type: "list",
            name: "department",
            message: "Which department is this role in?",
            choices: "",
          },
        ])
        .then((answers) => {
          const departmentName = answers.department;
  
          connection.query(
            "SELECT id FROM department WHERE name = ?",
            departmentName,
            (err, answer) => {
              if (err) {
                console.error(err);
                return;
              }
  
              let newId = answer.map((obj) => obj.id);
              newId = newId[0];
  
              connection.query(
                `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)`,
                [answers.title, answers.salary, newId],
                (err, result) => {
                  if (err) {
                    console.error(err);
                  } else {
                    start();
                  }
                }
              );
            }
          );
        });
    });
  }


function addEmployee() {
    connection.query("SELECT id, title FROM roles", (error, results) => {
      if (error) {
        console.error(error);
        return;
      }
  
      const roles = results.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
  
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter Employee's First Name",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter Employee's Last Name",
          },
          {
            type: "list",
            name: "roleID",
            message: "Select Employee's Role",
            choices: roles,
          },
        ])
        .then((answers) => {
          const { first_name, last_name, roleID } = answers;
          connection.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
            [first_name, last_name, roleID],
            (err, results) => {
              if (err) {
                console.error(err);
              } else {

                connection.query('SELECT * FROM employee', (err, results) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.table(results);
                  }
                  start();
                });
              }
            }
          );
        });
    });
  };



