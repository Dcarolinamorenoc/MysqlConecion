import { 
    getAllLastNameASC, 
    getAllLastNameDESC
} from "./js/module/customers.js";

import { getAll, 
    getAllLastName, 
    getAllFullNameJob, 
    getAllJobTitle 
} from "./js/module/employees.js";


console.log(await getAllLastNameDESC());