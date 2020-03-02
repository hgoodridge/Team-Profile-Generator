const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');
const employeeArr =[]


function teambuilder() {
    console.log("Please build your team")

    inquirer.prompt([{
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "teamMember",
        choices:[
            "manager",
            "intern",
            "engineer"
        ]
    }])
        .then(function(answers) {
            if (answers.teamMember === "manager") {
                manager()
            }else if (answers.teamMember === "intern"){
                intern()
            }else if(answers.teamMember === "engineer"){
                engineer()
            }
        })
}
    
function manager(){
        inquirer.prompt([
            {
                type: "input",
            message: "What is your manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "managerId",
        },
        {
            type: "input",
            message: "What is you manager's email",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is your manager's office number",
            name: "managerOffice",
        },
        {
            type: "list",
            message: "Would you like to add another member",
            name: "moreMembers",
            choices: ["yes",
            "no"]
        }
    ])
        .then(function(answers){
            const newMember = new Manager(answers.managerName,answers.managerId, answers.managerEmail, answers.managerOffice)
            employeeArr.push(newMember)
            if (answers.moreMembers === "yes") {
                teambuilder();
            }else{
                console.log("your team is being built")
                renderThis()
            }
        })
}

function intern(){
    inquirer.prompt([
        {
                    type:"input",
                    message:"What is your intern's name?",
                    name:"internName",
                },
                {
                    type:"input",
                    message:"What is your intern's id?",
                    name:"interId",
                },
                {
                    type:"input",
                    message:"what is you inter's email?",
                    name:"internEmail",
                },
                {
                    type:"input",
                    message:"What is you intern's school?",
                    name:"school",
                },
                {
                    type: "list",
                    message: "Would you like to add another member",
                    name: "moreMembers",
                    choices: ["yes",
                    "no"]
                }
    ])
    .then(function(answers){
        const newMember = new Intern(answers.internName,answers.interId, answers.internEmail, answers.school)
        employeeArr.push(newMember)
        if (answers.moreMembers === "yes") {
            teambuilder();
        }else{
            console.log("your team is being built")
            renderThis()
        }
    })
}

function engineer(){
    inquirer.prompt([
        {
                    type:"input",
                    message:"What is your engineer's name?",
                    name:"engineerName",
                },
                {
                    type:"input",
                    message:"What is your engineer's id?",
                    name:"engineerId",
                },
                {
                    type:"input",
                    message:"what is you engineer's email?",
                    name:"engineerEmail",
                },
                {
                    type:"input",
                    message:"What is you engineer's Github",
                    name:"github",
                },
                {
                    type: "list",
                    message: "Would you like to add another member",
                    name: "moreMembers",
                    choices: ["yes",
                    "no"]
                }
    ])
    .then(function(answers){
        const newMember = new Engineer(answers.engineerName,answers.engineerId, answers.engineerEmail, answers.github)
        employeeArr.push(newMember)
        if (answers.moreMembers === "yes") {
            teambuilder();
        }else{
            employeeArr.push(answers)
            console.log("your team is being built")
            renderThis()
        }
    })
}
const renderThis =()=>{
    console.log(employeeArr)
    fs.writeFile(outputPath, render(employeeArr), "utf8", err=> {
        if (err) throw err
        console.log('...writing file')
    })
}
teambuilder()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

// const init = () => {};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

// init();
