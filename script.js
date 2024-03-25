'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300,800],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// code project Part1
const displayMovements = function(movements){
  // Empty the movents container
  containerMovements.innerHTML=''
  movements.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
    <div class="movements__value">${mov}€</div>
  </div>
    `;
    // Insert above to Movements Element on the html
    containerMovements.insertAdjacentHTML("afterbegin",html)//This method accepts two strings,Position to attach
    //  html ie afterbegin,string conatainig html we want to insert
  });
};
// displayMovements(account1.movements)

// --create username=================
//  const user = 'Steven Thomas Williams'
//  const username = user.toLowerCase().split(' ').map(function(word){
//   return word[0]
//  }).join(' ')
// console.log(username)
//--Simplyfiy with arrow function
// const username = user.split(' ').map(name => name[0]).join(' ')
// console.log(username)

// Put simplified code in a function
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    // return username;
  })
}
createUsernames(accounts)
// console.log(accounts)

// =================Calculate Balance ==================
const calcAndDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce(function(acc,curr){
    return acc + curr;
    
  })
  labelBalance.textContent = `${acc.balance} EUR`
};
// calcAndDisplayBalance(account1.movements)
// =================Calculate Summary ==================
const calcAndDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov=> mov>0).reduce((acc,mov)=>acc+mov,0)
  labelSumIn.textContent = `${incomes} £`
  const outcomes = acc.movements.filter(move=> move<0).reduce((acc,mov,)=>acc + mov,0)
  labelSumOut.textContent = `${Math.abs(outcomes)} £`
  const interest = acc.movements.filter(mov=> mov>0).map(deposit=> deposit*acc.interestRate/ 100).filter(int => int >=1)
  .reduce((acc,deposit)=>acc + deposit,0)
  labelSumInterest.textContent = `${interest} £`
}
// calcAndDisplaySummary(account1.movements)

// Update UI Function
 const updateUi = function(acc){
      // Display Movements
      displayMovements(acc.movements)
      // Display Balance
      calcAndDisplayBalance(acc)
      // Display Summary
      calcAndDisplaySummary(acc) 
 }

// EVents Handler-----------------------------------------------
let current_account;
btnLogin.addEventListener('click', function(e){
  //Prevent form from submitting 
  e.preventDefault();
  current_account = accounts.find(
  acc => acc.username === inputLoginUsername.value
  );
  //current_account? -Checks if user account exist and if not following code stops exc
  console.log(current_account)
  if(current_account?.pin === Number(inputLoginPin.value)){
    // Display UI and Login Message
    labelWelcome.textContent = `Welcome back ${current_account.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;
    // Clear input after login
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();
    console.log('Logged IN')
    ///---update UI
    updateUi(current_account)
  }
})

// Tranfer
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferTo.value = inputTransferAmount.value = ''
  if(amount > 0 && receiverAccount &&current_account.balance>=amount && receiverAccount?.username !== current_account.username){
    // console.log('Transfer is legit')
    // Doing Tranfer
    current_account.movements.push(-amount)
    receiverAccount.movements.push(amount)
    ///---update UI
    updateUi(current_account)
  }else{
    console.log('Alarm This is illegal ')
  }
  console.log(receiverAccount)
  console.log(amount)
})
// Close Account
btnClose.addEventListener('click',function(e){
  e.preventDefault()
  const confirm_user = inputCloseUsername.value
  const confirm_pin = Number( inputClosePin.value)

  if(confirm_user === current_account.username && confirm_pin === current_account.pin){
    const index = accounts.findIndex(acc => acc.username === current_account.username)
    console.log(`This is the ${index}`)
    // Delete Account
    accounts.splice(index,1)
    // Logout User // Hide Ui
    containerApp.style.opacity = 0;
  }else{
    console.log('Wrong Credentials')
  }
// Set input to empty
  confirm_user = confirm_pin = ''
  // console.log(confirm_user,confirm_pin)
   
  
})

















// console.log(createUsernames('Mathias Suka Somba'))
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// console.log('/////-----------Slice Method ----------------')
// let arr = ['a','b','c','f','e','p','w']
// // Slice Method - take part of an array without changing original array
// console.log(arr.slice(2)) //Slice from 2 to end
// console.log(arr.slice(2,4))//Slice from 2 to 3 not including 4
// console.log(arr.slice(-2)) //Slice fthe last 2 of arr
// console.log(arr.slice(1,-1)) //Slice from 1 to the end except the last one
// console.log(arr.slice()) //create a shallow copy of an array
// console.log('/////-----------SPLICE Method ----------------')
// // Splice - Works same as slice but changes original array (Mutates)
// let arr2 = ['a','b','c','f','e','p','w']
// arr2.splice(-1)//removes last element
// arr2.splice(1,2)//idex 1 nad 2 are deleted
// console.log(arr2)

// // Reverse
// let arr3 = ['a','b','c','f','e','p','w']
// arr3.reverse() //This method reverses and mutates the original array
// console.log(arr3)

// // CONCAT //Used to concatenate 2 arrays
// let arr4 = [1,3,5,4,6,8,7]
// let newArr = arr3.concat(arr4)
// console.log(newArr)

// // JOIN
// console.log(newArr.join('-'))

// --------------------
// // --------------------New ES6 ‘AT’ Method-----------------//
// // ALso works on strings
// const arr = [23,55,88]
// console.log(arr.at(0))//Returns the value at index 0
// console.log(arr.at(-1))//Returns last value in an array
// const arr2 = 'Thomas'
// console.log(arr2.at(-1))

// // ------------Foreach Method-----------
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // looping using 'for of
// for(const movement of movements){
//   if(movement>0){
//     console.log(`you deposited ${movement}`)
//   }else{
//     console.log(`you withdrew ${movement}`)
//   }
// }

// // looping using 'forEach'
// // forEach is a higher order function
// console.log('Using forEach Method')
// // 1st param is cureent elemnt
// // 2nd param is the index 
// // 3rd is the whole Array
// movements.forEach(function(movement,index,array){
//   if(movement>0){
//     console.log(`movement ${index +1} you deposited ${movement} `)
//   }else{
//     console.log(`movement ${index +1} you withdrew ${movement} `)
//   }
// })

// // When to use for of and forEach => You cannot break out of a forEach loop


// // --------- forEach on maps and sets

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function(value,key,map){
//   console.log(value,key)
// })
// // Set
// const newSet = new Set(['USD','GBP','EUR','YEN'])
// newSet.forEach(function(value,key,set){
//   console.log(`${key} ${value}`)
// })
// Arrays Challenge#-----------------------------/

// let Julias_data = [3, 5, 2, 12, 7]
// let Kates_data = [4, 1, 15, 8, 3]
// let Julias__data =  [9, 16, 6, 8, 3]
// let Kates__data =  [10, 5, 6, 1, 4]

// // console.log(shallow_copy)


// const checkDogs = function(dogsJulia,dogsKate){
//   let shallow_copy = Julias_data.slice(1,-2)
//   let finalArr = shallow_copy.concat(Kates__data)
//   finalArr.forEach(function(dog,i){
//     if(dog >=3){
//       console.log(`Dog number ${i+1} is an adult and is ${dog} years old`)
//     }else{
//       console.log(`Puppy number ${i+1} is still a Puppy`)
//     }
//   })
  
// };
// checkDogs(Julias_data,Kates_data)
// Data Transformations with MAP,FILTER & REDUCE
// --Map - Similar to foReach but produces/returns new array based on previous array
// --Filter - Filters Elements in a perticular array which satifties a certern condition 
// and returns new array
// --reduce -boils/reduces elemets of an array to a single value (adding all elements together)

// // The MAP Method -- Returns a new array

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1
// // const  movementsUSD = movements.map(function(move,i){
// //   return move * euroToUsd
// // })
// // console.log(movements)
// // console.log(movementsUSD)
// //Use For of loop instead of MAP //Not Recommended
// const toUSDArray = []  //Not Recommended
// for(const mov of movements){//Not Recommended
//   toUSDArray.push(mov*euroToUsd)//Not Recommended
// }
// console.log(toUSDArray)//Not Recommended

// // Simplify Map using arrow function
// const movementsUSD = movements.map((move,i)=>{
//   return move * euroToUsd
// })
// console.log(movementsUSD)

// Just like foreach maps also has acces to the 3 params
// mov is value
// i is index
// arr is whole array
// const MovementDesc = movements.map(function(mov,i,arr){
//   if(mov>0){
//         return(`movement ${i +1} you deposited ${mov} `)
//       }else{
//         return(`movement ${i +1} you withdrew ${mov} `)
//       }
  
 
// })
// // sIMPLIFY USING ARROW FUNCTION
// const MovementDesc = movements.map((mov,i,arr)=>
//   `Movement ${ i + 1}: ${mov > 0 ? 'desposited': 'withdrew'} ${mov}`

// )
// console.log(MovementDesc)
// // Find Max Value Using reduce method
// const mov = [1,2,3,4,555,6,88,5,3,44]
// const max = mov.reduce((acc,curr)=>`${acc > curr ? acc : curr}`)
// console.log(max)


// // Challenge 2 -------------------------//


// const data1 = [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]
// const calcAvarageHumanAge = function(ages){
//   const humanAges = ages.map(function(age){
//     if(age <= 2){
//       return 2 * age
//     }else{
//       return 16 + age * 4
//     }
//   })
//   console.log(`All dogs human ages ${humanAges}`)
//   const lessThan18 = humanAges.filter(function(age){
//     return age > 18
//   })
//   console.log(`Adult Dogs ${lessThan18}`)
//   const humanAgesAve = humanAges.reduce(function(acc,curr){
//     return acc + curr /lessThan18.length
//   })
//   console.log(humanAgesAve)
// }

// // calcAvarageHumanAge(data1)
// console.log(calcAvarageHumanAge(data1))

// // // Chaining Methods -------------------------
// // const euroToKE = 1.2
// // // task covert to kesh then ,Filter Desposits then sum
// // const movements1 = [122,4555,7800,3400,-500,-800,9600,-5400,-9600]
// // const totalDesposits = movements1.filter(mov => mov>0).map(mov => mov * 
// // euroToKE).reduce((acc,mov)=> acc + mov,0)
// // console.log(totalDesposits)

// // Challenge 3


// // Find Method - ===============================////////////////////
// // used to retrieve one value in an array based on a condition
// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // const firstWithdrawal = movements.find(mov=>mov<0)
// // console.log(movements)
// // console.log(firstWithdrawal)

// const account = accounts.find(acc => acc.owner === 'Sarah Smith')
// console.log(account)

// FindeIndex Method - Reruns index of found element but not the element it self
