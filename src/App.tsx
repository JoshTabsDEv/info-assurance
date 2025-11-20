import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Dashboard from './pages/dashboard'


export default function App() {
  const fullname = localStorage.getItem("fullname");

  return(
    <Routes>
      <Route
        path="/"
        element={fullname ? <Navigate to="/dashboard" />: <Login />}
      />
      <Route
        path="/dashboard"
        element={fullname ? <Dashboard /> : <Navigate to="/" />}
      />
      
    </Routes>
  );
}


// import React, { useState } from "react";
// import './App.css'
// type User = {
//   username: string;
//   password: string;
// };

// const users: User[] = [
//   { username: "admin", password: "1234" },
//   { username: "guest", password: "guest" },
// ];

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = () => {
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );
//     if (user) {
//       setMessage(`✅ Welcome, ${username}!`);
//     } else {
//       setMessage("Invalid Credentials");
//     }
//   };

//   return (   
//     <div className="login">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <br />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }












// import { useState } from "react";
// import './App.css';

// // Define the structure of each item
// interface Item {
//   id: number;
//   name: string;
//   getLabel: () => string;
// }

// // Factory function to create items
// const createItem = (id: number, name: string): Item => {
//   return {
//     id,
//     name,
//     getLabel: () => `${name}`, // Label text
//   };
// };

// // Initial item list
// const items: Item[] = [
//   createItem(1, "Apple", ),
//   createItem(2, "Banana"),
//   createItem(3, "Carrot"),
// ];

// function App() {
//   // Search query state
//   const [query, setQuery] = useState("");

//   // Stores the text input for each item (not yet updated)
//   const [descriptions, setDescriptions] = useState<Record<number, string>>({});

//   // Stores the confirmed updates per item
//   const [updates, setUpdates] = useState<Record<number, string>>({});

//   // Handle input change for an individual item
//   const handleDescriptionChange = (id: number, value: string) => {
//     setDescriptions((prev) => ({ ...prev, [id]: value }));
//   };

//   // Handle "Update" button for an item
//   const handleUpdate = (id: number) => {
//     setUpdates((prev) => ({ ...prev, [id]: descriptions[id] || "" }));
//   };

//   // 🔴 Global "Clear All" button — clears all inputs and updates
//   const handleClearAll = () => {
//     setDescriptions({}); // Clear all input fields
//     setUpdates({});      // Clear all updated values
//   };

//   // Filter items based on search query
//   const filtered = items.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Midterm Exam</h3>

//       {/* Search bar */}
//       <p>
        
//         Search:{" "}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </p>

//       {/* Clear all button for resetting everything */}
//       <button onClick={handleClearAll} style={{ marginBottom: "20px" }}>
//         Clear All
//       </button>

//       {/* Display each filtered item */}
//       {filtered.map((item) => (
//         <div key={item.id} style={{ marginBottom: "20px" }}>
//           <strong>{item.getLabel()}</strong>

//           {/* Input field and update button per item */}
//           <div style={{ marginTop: "5px" }}>
//             {/* Show updated value if available */}
//           {updates[item.id] && (
//             <p>
//               <strong>Description: </strong> {updates[item.id]}
//             </p>
//           )}
//             <input
//               type="text"
//               placeholder="Enter description"
//               value={descriptions[item.id] || ""}
//               onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
//             />
//             <button
//               onClick={() => handleUpdate(item.id)}
//               style={{ marginLeft: "5px" }}
//             >
//               Update
//             </button>
//           </div>

          
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
 




















// import { useState } from 'react'
// import './App.css';

// function App() {
//     type RoleType = "admin" | "guest" | "No Role"; //custom type
//   //Function types
//   interface MathOperation {
//     (x: number, y: number): number;
//   }

//   const add: MathOperation = (x, y) => x + y;
//   const sub: MathOperation = (x, y) => x - y;
//   const mul: MathOperation = (x, y) => x * y;
//   const div: MathOperation = (x, y) => x / y;

//   const [inputValue, setInputValue] = useState<number>(0);
//   const [inputValue2, setInputValue2] = useState<number>(0);
//   const [result, setResult] = useState<string>("");
//   const [role, setRole] = useState<RoleType>("No Role");
//   const [roleInput, setRoleInput] = useState<RoleType>("No Role");


//   const [username, setUsername] = useState<string>("");

//   const handleAdd = () => {
//     setResult(`Result: ${add(inputValue, inputValue2)}`);
//   };
//   const handleSub = () => {
//     setResult(`Result: ${sub(inputValue, inputValue2)}`);
//   };
//   const handleMul = () => {
//     setResult(`Result: ${mul(inputValue, inputValue2)}`);
//   };
//   const handleDiv = () => {
//     setResult(`Result: ${div(inputValue, inputValue2)}`);
//   };
  
//   const handleQuit = () => {
//     setInputValue(0);
//     setInputValue2(0);
//     setResult("");
//     setRole("No Role");
//   };

//   const handleLogin = () => {
//     if (username == "" ||role !== "No Role") {
//       alert("Please enter a username and select a role.")
//     } else {
//       setRole(roleInput);
//     }
//   };

//   // Type assertion example
//   let x: unknown = "admin";
//   console.log((x as string).length); // asserts x is a string

//   return (
//     <>
//       {role === "No Role" && ( //ternary operator
//         <>
//           <h1>Calculator Login</h1>
//           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          
//           <select value={roleInput} onChange={(e) => setRoleInput(e.target.value as RoleType)}>
//             <option value="No Role" disabled>
//               Select Role
//             </option>
//             <option value="admin">Admin</option>
//             <option value="guest">Guest</option>
//           </select>
//             <br/>
//           <button onClick={handleLogin}>Login</button>
//         </>
//       )}

//       {role === "guest" && ( //ternary operator
//         <>
//           <h1>welcome {username} you can't use the Calculator</h1>
//           <button onClick={handleQuit}>Logout</button>
//         </>
//       )}

//       {role === "admin" && (  //ternary operator
//         <>
//           <h1>Calculator</h1>
//           <h1>Welcome {username}</h1>
//           <input type="number" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
//           <br />
//           <input type="number" value={inputValue2} onChange={(e) => setInputValue2(Number(e.target.value))} />
//           <br />
//           <br />
//           <button onClick={handleAdd}>Add</button>
//           <button onClick={handleSub}>Subtract</button>
//           <button onClick={handleMul}>Multiply</button>
//           <button onClick={handleDiv}>Divide</button>
//           <br />
//           <br />
//           <button onClick={handleQuit}>Logout</button>
//           <h1>{result}</h1>
//         </>
//       )}
//     </>
//   );

// }

// export default App






// export default App;

  
//   // OPTIONAL PARAMETER
//   interface Book {
//     title: string,
//     author: string,
//     year?: number; 
//   }
  
//   const validBook: Book = {
//     title: "Typescript Learning",
//     author: "Kent O'shope"  
//   };

//   interface Person {
//     readonly age: Number,
//     readonly status: string
//   }

//   const PersonDetails: Person = {
//     age: 10,
//     status: "Taken"
//   }

//   // FUNCTION TYPES
//   interface MathOperation {
//     (x:number, y: number): number;
//   }

//   const add: MathOperation = (x,y) => x+y;
//   const subtract: MathOperation = (x,y) => x-y;

//   const resultAdd = add(5,5);
//   const resultSubtraction = subtract(5,5);

//   const[num1, setNum1] = useState<number>(0);
//   const[num2, setNum2] = useState<number>(0);
//   const[result, setResult] = useState<string>("");

//   const handleChangeAdd =()=> {
//     setResult(`Result: ${add(num1, num2)}`);
//   }
  

//   interface Animal {
//     name: string
//   }

//   interface Dog extends Animal{
//     breed: string
//   }

//   const details: Dog = {
//     name: "Doggy",
//     breed: "Aspin"
//   }

//   interface Box<T> {
//     value: T;
//   }

//   const stringBox: Box<string> = {
//     value: "Hello, Jander",
//   }

//   console.log(stringBox.value);

// // Type Assertion
//   let x: unknown = 'hello';
//   console.log((x as string).length);

// // const Assertion
// // let myArray = [1,2,3] as const;
// // myArray.push(4);

// // let myArray2 = myArray;
// // myArray2.push(7);

// // let aira = {
// //   bf: "Jander",
// //   gender: "bayot"
// // }as const

// // let ans = aira.bf = "Jose";

// // let ans2 : number | string;

// function divide({dividend, divisor} :{dividend: number, divisor: number}){
//   return dividend / divisor;
// }

// function far(value: number, exponent: number = 10) {
//   return value ** exponent
// }
// console.log("hehe: ", addition(2,2,2,))

// function addition(num1:number, num2: number, ...rest: number []){
//   return num1 + num2 + rest.reduce((x,y) => x+y, 2);
// }
// console.log(far(10))


//   return (
//     <>
//     <h1>Sample</h1>
//     <div>
//       <label htmlFor="num1">Enter Number 1:</label>
//       <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1(Number(e.target.value))}
//       />
//     </div>
//     <br/>
//     <div>
//       <label htmlFor="num2">Enter Number 2:</label>
//       <input
//           type="number"
//           value={num2}
//           onChange={(e) => setNum2(Number(e.target.value))}
//       />
//     </div>
//     </>
//   )





// import { useState } from 'react'
// import "./App.css";


// function App() {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [inputValue2, setInputValue2] = useState<string>("");
//   const [result1, setResult1] = useState<identifyBmi | null>(null);
                    


//   type BMI = "underweight"  | "normal weight" | "overweight" | "obese" | "Not Valid";
//   type Colors = "Red" | "Green" | "Orange" | "Yellow" | "No Color";
//   type tips = "Focus on nutrient-dense food" | "Maintained balance eating" | "Aim for gradual lifestyle changes" | "Work closely with healthcare provider" | "No tips";
//     type identifyBmi= {
//     tip: tips;
//     color: Colors;
//     result: number
//     category: BMI;
//   }
//   function identifyBmi(result: number): identifyBmi {
//     let category: BMI = 
//     result < 18.5? "underweight" : 
//     result < 25? "normal weight": 
//     result < 30? "overweight":
//     result > 30? "obese": "Not Valid";

    

//     let color:  Colors = 
//     result < 18.5 ? "Red": 
//     result < 25 ? "Green": 
//     result < 30 ? "Orange":
//     result > 30 ? "Yellow" : "No Color";

//     let tip: tips = 
//     result < 18.5 ? "Focus on nutrient-dense food":
//     result < 25 ? "Maintained balance eating": 
//     result < 30 ? "Aim for gradual lifestyle changes":
//     result > 30 ? "Work closely with healthcare provider" : "No tips";

//     return {result, category, color, tip};
//   }
//     const handleCheck = () => {
//       const weight = Number(inputValue);
//       const height = Number(inputValue2);
//       if (isNaN(weight) || weight < 0) {
//         alert("Please enter a valid result");
//         return;
//       }
//       const height2 = height * height;
//       const BMI = weight / height2;
//       setResult1(identifyBmi(BMI));
//     };

//     const Clear = () => {
//       setInputValue("");
//       setInputValue2("");
//       setResult1(null);
//     }
//     // const handleSub = () => {
//     //   const result = Number(inputValue);
//     //   const result2 = Number(inputValue2);
//     //   if (isNaN(result) || result < 0) {
//     //     alert("Please enter a valid result");
//     //     return;
//     //   }
//     //   setResult1(identifyBmi(result - result2));
//     // };

//     // const handleMulti = () => {
//     //   const result = Number(inputValue);
//     //   const result2 = Number(inputValue2);
//     //   if (isNaN(result) || result < 0) {
//     //     alert("Please enter a valid result");
//     //     return;
//     //   }
//     //   setResult1(identifyBmi(result * result2));
//     // };

//     // const handleDivide = () => {
//     //   const result = Number(inputValue);
//     //   const result2 = Number(inputValue2);
//     //   if (isNaN(result) || result < 0) {
//     //     alert("Please enter a valid result");
//     //     return;
//     //   }
//     //   setResult1(identifyBmi(result / result2));
//     // };

    
  
    
//   return (
//     <>
//       <h1>BMI Calculator</h1>
//       <input
//       type="number"
//       value={inputValue}
//       onChange={(e) => setInputValue(e.target.value)}
//       placeholder="Enter weight"
//       style={{ padding: "8px", marginRight: "10px"}}
      
//     />
//     <br/><br/>
//     <input
//       type="number"
//       value={inputValue2}
//       onChange={(e) => setInputValue2(e.target.value)}
//       placeholder="Enter height"
//       style={{ padding: "8px", marginRight: "10px"}}
//     />

    
//     <br/>
//     <button onClick={handleCheck} style={{ padding: "8px 12px"}}>
//       Calculate BMI
//     </button>

//     <br/>
//     <button onClick={Clear} style={{ padding: "8px 12px"}}>
//      Clear
//     </button>
   
   
   
//     {/* <button onClick={handleSub} style={{ padding: "8px 12px"}}>
//       -
//     </button>
//     <button onClick={handleMulti} style={{ padding: "8px 12px"}}>
//       *
//     </button>
//     <button onClick={handleDivide} style={{ padding: "8px 12px"}}>
//      /
//     </button> */}

//     {result1 && (
//       <div style={{ marginTop: "20px"}}>
//         <p>
//           <strong>Result:</strong> {result1.result}
//         </p>
//         <p style={{color: result1.color}} >
//           <strong style={{color: "black"}}>Category: </strong>
//           {result1.category}<br/>

//           <strong style={{color: "black"}}>Tip: </strong> {result1.tip}
//         </p>
         
//       </div>
//     )}


    
//     </>
//   )
// }


// export default App;
























// function App() {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [inputValue2, setInputValue2] = useState<string>("");
//   const [result1, setResult1] = useState<identifyOperator | null>(null);
//   const [inputNum1, setInputNum1] = useState<null>(null);
//   const [inputNum2, setInputNum2] = useState<null>(null);


//   type Operator = "Add" | "Sub" | "Multi" | "Divide" | "Not Valid";
//   // type Colors = "Red" | "Blue" | "Green" | "Yellow" | "No Color";
//     type identifyOperator= {
//     // color: Colors;
//     result: number;
//     category: Operator;
//   }
//   function identifyOperator(result: number): identifyOperator {
//     let category: Operator = 
//     result <=75? "Add": 
//     result <=85? "Sub": 
//     result <=95? "Multi":
//     result <=100? "Divide": "Not Valid";

    

//     // let color:  Colors = 
//     // grade <=75? "Red": 
//     // grade <=85? "Blue": 
//     // grade <=95? "Green":
//     // grade <=100? "Yellow" : "No Color";

//     return {result, category};
//   }
//     const handleCheck = () => {
//       const result = Number(inputValue);
//       const result2 = Number(inputValue2);
//       if (isNaN(result) || result < 0) {
//         alert("Please enter a valid result");
//         return;
//       }
//       setResult1(identifyOperator(result + result2));
//     };

//     const handleSub = () => {
//       const result = Number(inputValue);
//       const result2 = Number(inputValue2);
//       if (isNaN(result) || result < 0) {
//         alert("Please enter a valid result");
//         return;
//       }
//       setResult1(identifyOperator(result - result2));
//     };

//     const handleMulti = () => {
//       const result = Number(inputValue);
//       const result2 = Number(inputValue2);
//       if (isNaN(result) || result < 0) {
//         alert("Please enter a valid result");
//         return;
//       }
//       setResult1(identifyOperator(result * result2));
//     };

//     const handleDivide = () => {
//       const result = Number(inputValue);
//       const result2 = Number(inputValue2);
//       if (isNaN(result) || result < 0) {
//         alert("Please enter a valid result");
//         return;
//       }
//       setResult1(identifyOperator(result / result2));
//     };

    
  
    
//   return (
//     <>
//       <h1>Calculator</h1>
//       <input
//       type="number"
//       value={inputValue}
//       onChange={(e) => setInputValue(e.target.value)}
//       placeholder="Enter number1"
//       style={{ padding: "8px", marginRight: "10px"}}
      
//     />
//     <br/><br/>
//     <input
//       type="number"
//       value={inputValue2}
//       onChange={(e) => setInputValue2(e.target.value)}
//       placeholder="Enter number2"
//       style={{ padding: "8px", marginRight: "10px"}}
//     />

    
//     <br/>
//     <button onClick={handleCheck} style={{ padding: "8px 12px"}}>
//       +
//     </button>
//     <button onClick={handleSub} style={{ padding: "8px 12px"}}>
//       -
//     </button>
//     <button onClick={handleMulti} style={{ padding: "8px 12px"}}>
//       *
//     </button>
//     <button onClick={handleDivide} style={{ padding: "8px 12px"}}>
//      /
//     </button>

//     {result1 && (
//       <div style={{ marginTop: "20px"}}>
//         <p>
//           <strong>Result:</strong> {result1.result}
//         </p>
//         <p>
//           <strong>Category:</strong>{result1.category}
//         </p>
//         {/* <p style={{color: result1.color}}>
//           {result1.category}
//         </p> */}
//       </div>
//     )}


    
//     </>
//   )
// }


// export default App;








// import { useState } from 'react'
// import "./App.css";

// function App() {
  
//   let number: number = 90;

//   let joshua : { //object creation
//     name: String,
//     age: number
//   }= {name: "Jander", age: 68};

//   type jander = "Positive" | "Negative"; //custom type aliases
//   let isNegative: jander = "Negative";
//   let isPositive: jander = "Positive";
//   let result : string = "";
//   if(isPositive === "Positive")  {
//     result = "Its's Positive";
//   }else{
//     result = "It's Negative";
//   }
//   //intersection
//   type Person = {name: string, age: number};
//   type Employee = {id: number, department: string};
//   type employeeDetails = Person & Employee;
//   const display: employeeDetails = {
//     name : "Jander", age: 24, id: 2012, department: "",
//   }

//   //unknown 
//   let value : unknown = 90;
//   if (typeof value === "string"){
//     console.log("correct");
//   }else{
//     console.log("Incorrect");
//   }

//   //never
//   // function throwError(); never{
//   //   throw new Error("An error occured!")
//   // }

//   //walay type ni nga function bcoz of void type means walay types
//   function hello(message: string): void {
//     console.log(message);
//   }
//   console.log(hello("sds"));

//   const [inputValue, setInputValue] = useState<string>("");
//   const [result1, setResult1] = useState<AgeResult | null>(null);

//   type AgeCategory = "senior" | "adult";
//   type AgeResult = {
//     age: number;
//     category: AgeCategory;
//   };
//   function identifyAge(age: number): AgeResult {
//     let category: AgeCategory = age >= 60? "senior" : "adult";
//     return {age, category};
//   }
//     const handleCheck = () => {
//       const age = Number(inputValue);
//       if (isNaN(age) || age < 0) {
//         alert("Please enter a valid age");
//         return;
//       }
//       setResult1(identifyAge(age));
//     };
  
    
//   return (
//     <>
//       <h1>Age Verifier</h1>
//       <input
//       type="number"
//       value={inputValue}
//       onChange={(e) => setInputValue(e.target.value)}
//       placeholder="Enter age"
//       style={{ padding: "8px", marginRight: "10px"}}
//     />

//     <button onClick={handleCheck} style={{ padding: "8px 12px"}}>
//       Check
//     </button>

//     {result1 && (
//       <div style={{ marginTop: "20px"}}>
//         <p>
//           <strong>Age:</strong> {result1.age}
//         </p>
//         <p>
//           <strong>Category:</strong> {result1.category}
//         </p>
//       </div>
//     )}


//     {number} , {joshua.name}, {joshua.age}, {result}, {display.name}, {display.age}<br/>
//     </>
//   )
// }


// export default App;




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
