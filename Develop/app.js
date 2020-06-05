const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeRole = {
  type: 'list',
  name: 'role',
  message: 'What type of employee would you like to add?',
  choices: ['manager', 'engineer', 'intern', 'exit'],
};
const generalQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the employees name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the employees id?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the employees email address?',
  },
];

let employees = [];

function addEmployee() {
  inquirer.prompt(employeeRole).then(getEmployeeInfo);
}

function getEmployeeInfo(answers) {
  if (answers.role === 'manager') {
    inquirer
      .prompt([
        ...generalQuestions,
        {
          type: 'number',
          name: 'officeNumber',
          message: "Input manager's office number",
        },
      ])
      .then(function (managerAnswers) {
        let manager = new Manager(
          managerAnswers.name,
          managerAnswers.id,
          managerAnswers.email,
          managerAnswers.officeNumber
        );
        employees.push(manager);
        addEmployee();
        //console.log(manager);
      });
  } else if (answers.role === 'engineer') {
    inquirer
      .prompt([...generalQuestions, 
        {
          type: 'input',
          name: 'github',
          message: "Input the engineer's GitHub username",
        },
      ])
      .then(function (engineerAnswers) {
        let engineer = new Engineer(
          engineerAnswers.name,
          engineerAnswers.id,
          engineerAnswers.email,
          engineerAnswers.github
        );
        employees.push(engineer);
        addEmployee();
        //console.log(engineer);
      });
  } else if (answers.role === 'intern') {
    inquirer
      .prompt([...generalQuestions,
        {
          type: 'input',
          name: 'school',
          message: "Input intern's school",
        },
      ])
      .then(function (internAnswers) {
        let intern = new Intern(
          internAnswers.name,
          internAnswers.id,
          internAnswers.email,
          internAnswers.school
        );
        employees.push(intern);
        addEmployee();
        //console.log(intern);
      });
  }else {
    fs.writeFileSync(outputPath, render(employees), "utf-8");

  
  }
}
addEmployee();

//render(employees);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
