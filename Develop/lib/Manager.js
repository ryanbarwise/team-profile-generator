// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Emplooyee = require('./Employee');

class Manager extends Emplooyee{

    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.officeNumber
    }
    
    getRole(){
        return 'Manager'
    }
}

export default Manager;