/* 

documentaion:
example

  const user = new Validation({
    name: `sam`,
    age: `25`
  });

  user.required(`name`, `age`, `email`); // expected output: "error: please add a/an email"


  const user2 = new Validation({
    name: `sam`,
    age: `25`,
    email: `email.gmail.com`
  });

  user2.validator.name.minLength(5); // expected output: "error: the minimum accepted length is ${num}"
  user2.validator.email.isEmail(); // expected output: "error: please enter valid email."

*/

/* 

for next time development:
  check function
  make schema
  ability to do this: user.validator.name.minLength(4).maxLength(6)

*/


// application requirement
const ErrorResponse = require(`../utils/errorResponse`);

// validation class
class Validation {

  constructor(validator) {

    // check if input is object and not equal to null
    if(typeof(validator) === `object` && typeof(validator) !== null) {
      
      this.validator = {...validator};
      
      // iterate over validator object to convert every value of it to object of value class
      for(let property in this.validator) {
        this.validator[property] = new Value(this.validator[property]);
      }

    } else {

      throw new Error(`function validation deals only with objects.`);

    }
  }

  // require function to check if input include specific values or not
  required(...arr) {

    // iterate over parameters to check if all of them required or not
    arr.forEach(element => {

      let isFound = false;

      // iterate over validator object to check if parameter is exist or not
      for(let property in this.validator) {
        
        if(property === element) {
          isFound = true;
          break;
        }
      }

      // if parameter is not found inside validator array then return an error
      if(!isFound) {
        throw new ErrorResponse(400, `please add a/an ${element}.`);
      }

    });

  }

}

// class value to check over values of validator object
class Value {

  constructor(value) {
    this.value = value;
  }
  
  // minLength function
  minLength(num = 0) {

    // check if the value is string
    if(typeof(this.value) !== `string`) {
      throw new ErrorResponse(400, `the value must be String.`);
    }
    
    // check if minimum length is match
    if(this.value.length < num) {
      throw new ErrorResponse(400, `the minimum accepted length is ${num}`);
    }

  }
  
  // maxLength funciton
  maxLength(num = 100) {

    // check if the value is string
    if(typeof(this.value) !== `string`) {
      throw new ErrorResponse(400, `the value must be String.`);
    }
    
    // check if maximum length is match
    if(this.value.length > num) {
      throw new ErrorResponse(400, `the maximum accepted length is ${num}`);
    }

  }

  // isEmail function
  isEmail() {

    // check if the value is string
    if(typeof(this.value) !== `string`) {
      throw new ErrorResponse(400, `the value must be String.`);
    }

    // regular expression to match emails
    const emailMatch = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    // check if the value is match with email regular expression
    if(!emailMatch.test(this.value)) {
      throw new ErrorResponse(400, `please enter valid email.`);
    }
  
  }

}

module.exports = Validation;