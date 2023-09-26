import React, { useState, useEffect } from "react";
import QuizPage from "./component 3/quizpage";
import "./QuizApp.css";

export default function App() {
  const [quizQues, setQuizQues] = useState([]);
  const [allquizQues, setAllQuizQues] = useState([]);
  const [timeInterval, setTimeInterval] = useState(0); // Add the timeInterval state

  useEffect(() => {
    // Fetch quiz data from a JSON file when the component mounts
    fetch("./quizData.json")
      .then((res) => res.json())
      .then((data) => setAllQuizQues(data.results));
  }, []);

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm to randomize the order of elements in an array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const quizStart = (difficulty) => {
    let timeInterval = 0;
    if (difficulty === "easy") {
      timeInterval = 4;
    } else if (difficulty === "medium") {
      timeInterval = 3;
    } else if (difficulty === "hard") {
      timeInterval = 1;
    }
    setQuizQues(shuffleArray(allquizQues)); // Shuffle the quiz questions
    setTimeInterval(timeInterval); // Set the timeInterval state based on difficulty
  };

  return (
    <main>
      {quizQues.length > 0 ? (
        // If quiz questions are available, render the QuizPage component
        <QuizPage quiz={quizQues} timeInterval={timeInterval} /> // Pass the timeInterval as a prop
      ) : (
        // If quiz questions are not available, render the front page with start buttons
        <div className="frontPageDiv">
          <h1>QUIZ-GO (QUIZ APP)</h1>
          <p>Your best Education App!</p><br></br>
          <p className="frontPageP">Choose a difficulty below: </p>
          <div>
            <button className="startQuiz" onClick={() => quizStart("easy")}>
              Easy 
            </button><span>= 4 Mins</span> <br></br>
            <button className="startQuiz" onClick={() => quizStart("medium")}>
              Medium
            </button> <span>= 3  Mins</span> <br></br>
            <button className="startQuiz" onClick={() => quizStart("hard")}>
              Hard
            </button> <span>= 1 Mins</span> <br></br>
          </div>
        </div>
      )}
    </main>
  );
}




















//TENZEL GAME CODE:
/*

import {React, useState, useEffect} from "react";
import Die from "./components2/die.js";
import {nanoid} from "nanoid"; 
import Confetti from "react-confetti"
import './App.css';



//TENZEL GAME APP MODIFICATION ONE(2):
//NOTE: In the Modification, the 'rollDice()' function was modified, so that it only roll/refresh the App's Elements that have not been selected
//for new random numbers(1-6), WHILE the creation of the 'Object and properties' were done in the 'generateNewDie()' function, 
//so that it('generateNewDie()') can be dynamically used. The 'generateNewDie()' function was then pushed to the 'arrayDice' array in the 
//'allNewDice()' function. The 'generateNewDie()' function was also used to generate new 'die' random numbers(1-6) for the App's unselected
//elements in the 'rollDice()' function;  

export default function App() {
const [dieNo, setDieNo] = useState(allNewDice()) //setting 'state' to the 'allNewDice()' function below
const [tenzies, setTenzies] = useState(false)

//The below 'React hook' was used to make sure that, before we call it a 'game', every 'dieNo'/'element' value/number selected must be same:
useEffect(() =>{
//The 'every()' method returns true if the function returns true for all elements. The 'every()' method returns false if the function returns false for one element.
//Using the '.every()' method to check if every item in the 'dieNo' 'State' array returns a 'true' for a given 'condition'.
//Checking to know if 'element/die' 'isHeld'(meaning, if every 'die' 'isheld' and the boolean values are same(whether they are all set to 'true'/'false', 
//in as much as they all have same value), then '.every()' method returns 'true' else it returns 'false' if one 'element/die' value is the opposite);
  const allHeld = dieNo.every(die => die.isHeld)
//checking to know if they all have same value, by picking a value from any of the 'element/die' to start with
  const firstValue = dieNo[0].value
//Using '.every()' method to make sure that,it is 'true' that every 'die' value that is later picked is same as the 'first Value' picked above, 
  const allSameValue = dieNo.every(die => die.value === firstValue)
//Therefore, if it is 'true' that the 'element/die' is 'held'/picked and all the held/picked 'values' are same, then set 'tenzies' 
//array value to 'true'
        if (allHeld && allSameValue) {
          setTenzies(true) 
          console.log("You won!!!")
        } 
}, [dieNo] )

//function for generating new random 'die' nunbers(1 - 6) for the Ten(10) Elements:
  function generateNewDie() {
//Generating six(6) random numbers that falls between 1-6 using 'Math.ceil(Math.random() * 6)', AND 
//while also generating an 'isHeld' object's property with a 'boolean' value, and an 'id' object's property with a 'nanoid()' function as value. 
//NOTE: The 'nanoid()' function, is a dependency package, it is used to generate unique 'key' 'id' for each element.
//NOTE; '.ceil' is used to make sure that the randomly generated figures/numbers starts at '1' and not '0'.
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

//funtion for generating the Ten(10) 'die' elements:
 function allNewDice() {
  let arrayDice = []
//Generating ten(10) elements, using a for loop;
  for(let i=0;i<10; i++){
//Pushing the function 'generateNewDie()' with the six(6) generated random numbers for the 'ten(10) generated elements' above to the 'arrayDice' array;
    arrayDice.push(generateNewDie()) 
  }
  return arrayDice
 }

//This function is used to hold each 'die' id, so that when each 'die' element is clicked, it generates its own unique id:
 function holdDice(id) {
//Mapping through the 'dieNo' array;
 setDieNo(oldDice => oldDice.map(die =>{
//If the 'id' of the mapped 'die' element, is same as that of the 'main' 'die' element, then return all the object properties of the 'dieNo'
//array, but only change the 'isHeld' property value to the opposite of whatsoever value it is as a boolean, else return the 'dieNo' array as it is.
  return die.id === id ?
  {...die, isHeld: !die.isHeld} :
  die
 }))
 }

//Mapping through the 'state' array; for each of the generated 'ten(10) elements', we create a '<Die/>' component, and assign the above randomly 
//generated figures/numbers, and a unique key 'id' to them;  '<Die value= {no.value}' 'key={no.id}', />'
let num = dieNo.map((no) => 
<Die 
key={no.id} 
value= {no.value} 
style={no.isHeld}

//Assigning the generated 'id' to each element via the 'holdDice()' function to a 'holdDie' property(props) that is accessable in the 'die.js' file.
//NOTE: Why the 'holdDice()' function is used here to hold the generated 'id' for each element, is because, the 'holdDie' property is serving as
//an 'event handler' for the 'onclick event listener' in the 'die.js' file, and by default in JS/React an 'eventListener' listens to a function
//not a 'value' like the 'no.id' in this case. That is why it won't work if we pass the 'no.id' value directly to the 'holdDie' property(eventhandler). 
holdDie = {()=>holdDice(no.id)} 
/>)

//Function for rolling/refreshing the App's Elements for new random 'die' numbers(1-6):
function rollDice() {
  //If 'tenzies' array is not 'false', which is the value it was initialized as above in state, meaning if all the similar numbers have not been selected, 
  //then keep rolling/refreshing the 'Elements/dice' for new numbers, else, set 'tenzies' to false('setTenzies(false)'), 
  //meaning all the similar numbers have been selected, then generate new 'dice' number for all the 'Elements/dice' by setting the 'dieNo' state 
  //array to the 'allNewDice()' function above, that was used for generating ten(10) 'die' elements with random numbers in the App, 
  //by using the 'setDieNo' 'state' setter function below ('setDieNo(allNewDice())').
  if (!tenzies) {
  //Mapping through the 'dieNo' array through the 'setDieNo' 'State setter function';
  setDieNo(oldDice => oldDice.map(die =>{
  //If the 'isHeld' property is true meaning the 'die' element is been 'held'/'selected', then we keep/return(?) the 'held' die, else(:),
  //we generate new random numbers(1-6) for the 'die' element using the 'generateNewDie()' function. 
      return die.isHeld ? die :
      generateNewDie()
     }))
  } else {
    setTenzies(false)
    setDieNo(allNewDice())
  }

}

//Below is the 'button' element, if the 'dieNo'/'element' value/number selected are all same(this was achieved with the help of the 
//'useEfect React hook' above, that was used to make the two(2) 'state' arrays work in sync) , then display 'NEW GAME', 
//else still display 'ROLL' 
return (
  <main>
    {tenzies ? <Confetti/> : ""}
    <h1>Tenzies Game</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div  className="dieDiv">
      {num}
    </div> 
    <br></br>
    <button className="rollDice" onClick={rollDice}>{tenzies ? "NEW GAME" : "ROLL"}</button>
  </main>
)
}
*/















//TENZEL GAME APP MODIFICATION ONE(1):
//NOTE: In this Modification the 'rollDice()' function is used to roll/refresh the App's elements for the generation of new random numbers(1-6),
//for the 'App's' Elements, WHILE the creation of the 'Object and properties' that were pushed to the 'arrayDice' was done in the 'allNewDice()' function;
/*
export default function App() {
  const [dieNo, setDieNo] = useState(allNewDice()) //setting 'state' to the 'allNewDice()' function below
  
  function allNewDice() {
    let arrayDice = []
  
    //generating ten(10) elements, using a for loop;
    for(let i=0;i<10; i++){
    
    //Generating six(6) random numbers that falls between 1-6 using 'Math.ceil(Math.random() * 6)', AND 
    //pushing the six(6) generated random numbers for the 'ten(10) generated elements' above to the 'arrayDice' array, as the 'value' object's property value,
    //while also pushing an 'isHeld' object's property with a 'boolean' value, and an 'id' object's property with a 'nanoid()' function as value. NOTE: The
    //'nanoid()' function, is a dependency package, it is used to generate unique 'key' 'id' for each element.
    //NOTE; '.ceil' is used to make sure that the randomly generated figures/numbers starts at '1' and not '0'.
    
      arrayDice.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      }) 
    }
    return arrayDice
   }
  
   //This function is used to hold each 'die' id, so that when each 'die' element is clicked, it generates its own unique id:
   function holdDice(id) {
  //Mapping through the 'dieNo' array;
   setDieNo(oldDice => oldDice.map(die =>{
  //If the 'id' of the mapped 'die' element, is same as that of the 'main' 'die' element, then return all the object properties of the 'dieNo'
  //array, but only change the 'isHeld' property value to the opposite of whatsoever value it is as a boolean, else return the 'dieNo' array as it is.
    return die.id === id ?
    {...die, isHeld: !die.isHeld} :
    die
   }))
   }
  
  //Mapping through the 'state' array; for each of the generated 'ten(10) elements', we create a '<Die/>' component, and assign the above randomly 
  //generated figures/numbers, and a unique key 'id' to them;  '<Die value= {no.value}' 'key={no.id}', />'
  let num = dieNo.map((no) => 
  <Die 
  key={no.id} 
  value= {no.value} 
  style={no.isHeld}
  
  //Assigning the generated 'id' to each element via the 'holdDice()' function to a 'holdDie' property(props) that is accessable in the 'die.js' file.
  //NOTE: Why the 'holdDice()' function is used here to hold the generated 'id' for each element, is because, the 'holdDie' property is serving as
  //an 'event handler' for the 'onclick event listener' in the 'die.js' file, and by default in JS/React an 'eventListener' listens to a function
  //not a 'value' like the 'no.id' in this case. That is why it won't work if we pass the 'no.id' value directly to the 'holdDie' property(eventhandler). 
  holdDie = {()=>holdDice(no.id)} 
  />)
  

  //Function for rolling/refreshing the App's Elements for new random 'die' numbers(1-6):
  function rollDice() {
    //This is used to generate new random numbers(from 1-6) for the ten(10) elements.
    setDieNo(allNewDice())
  }
  
  return (
    <main>
      <div  className="dieDiv">
        {num}
      </div> 
      <br></br>
      <button className="rollDice" onClick={rollDice}>ROLL</button>
    </main>
  )
  }
  */

























//NOTE APP PROJECT
/*

import Sidebar from "./components/Sidebar.js";
import Editor from "./components/Editor.js";
//import {data} from "./data";
import Split from "react-split"; //importing the 'react-split' package from the React 'dependencies', so as to be used below
import {nanoid} from "nanoid"; //importing the 'nanoid"' package from the React 'dependencies', so as to be used below
import './App.css';



//MODIFICATION 3(Adding the Deleting function for deleting 'Notes' to our function below):

export default function App() {
  //Saving all 'notes' in state, and initializing to an empty array. 
  //Secondly, we 'lazily initialized' 'notes' 'state' so it doesn't reach out to localStorage on every single re-render of the App component.
  //NOTE, if we don't reach out to localStorage using the below syntax '() => JSON.parse(localStorage.getItem("notes")) || []', anytime we type in a
  //letter for a new 'note' or an updating 'note', 'React' automatically reaches out to localStorage thereby re-rendering every stored item from this 
  //code in the localStorage on the 'console', which at the long run gives the browser alot of loads to run.
  const [notes, setNotes] = React.useState(
  () => JSON.parse(localStorage.getItem("notes")) || []) 
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )//Making sure that a note exist('notes[0]'), that is a 'note' has been created and saved, before it can be accessed('notes[0].id'), 
  //to avoid 'error' on our code, or('||') display an empty field("").


  //Storing every created and updated 'notes' to the localStorage, using 'React.useEfect' method, since localStorage is an external body:
  React.useEffect(() =>{
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes] )



  function createNewNote() {
    //Assigning a special 'id' to each created 'note', using 'nanoid' 'dependency package'.
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    //Add newly created 'notes'('newNote') to the beginging of the list before the previous 'notes'('...prevNotes')
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)//Setting current 'note' 'id' based on 'newNote' 'id'.
  }
  
  //Modifying the below function, so that the most recent updated 'Note' will be at the top of other 'Notes', after each update or Modifications:
  function updateNote(text) {

    //looping over the original 'Notes' array in 'state' via 'setNotes' state setter function.
    setNotes(oldNotes =>  {

      //NOTE, Initializing the array('newArray ') outside this scope will result the App to malfunction and render all saved 'Notes' in 'state' 
      //to the 'newArray' at each button clicked, instead of only the 'Note' that is been worked on or updated.
      let newArray = [] 
      for(let i=0; i < oldNotes.length; i++ ) {
        let oldNote = oldNotes[i] //Did this so that we do have to be repeat this 'oldNotes[i]' all the time, for simplicity sake.

        //if the 'oldNote' id is same as that of the 'current note(currentNoteId)' we are working on/updating,
        if(oldNote.id === currentNoteId) {

        //then, put the current note we are working on/updating which is an 'oldNote' at the begining of the array/at the top of other notes.
        newArray.unshift({...oldNote, body: text})
        } else {

          //else just leave the 'oldNote' at the end of the 'newArray' or the bottom of other 'Notes'
          newArray.push(oldNote)
        }
      }
      //returning the 'newArray', instead of what we have in 'state'('notes' array), so that the modification done to this/in this array 
      //will render when this function('updateNote(text)') is called.
      return newArray
     })
   
  }


//function for activating the 'event handler'('handleClick') for deleting 'Notes':
function deleteNote(event, noteId) {

//The 'event.stopPropagation()' method prevents the 'delete' 'event' from propagating further to its 'parent element('noteElements')', because the 
//'delete button('delete' 'event')' is a 'child element' of the 'noteElements' in the 'Sidebar' component. 
//Meaning, since the 'parent element' also has its own 'onClick' 'event' for 'selecting' 'notes' in the 'Sidebar' component, we don't want both 
//'events'(parent and child 'onclick' 'event') to clash, thereby  resulting to an error in our code, that is why the below is used.
//NOTE: If u dn't use the below method('event.stopPropagation()'), if a 'note' is deleted, the App will still display its content on the 'text field' area as the current selected 'note', which we don't want.
  event.stopPropagation()

//Removing the 'note' from the 'state' array; if it is 'true'('note.id !== noteId') that a 'note' 'id' is not equal the 'note' 'id' we clicked 'delete' on, 
//then filter it back into the 'state' array, else(meaning; if it is 'false' and both 'notes' 'id' matches/are same), delete 'note': 
setNotes(updaNotes => updaNotes.filter((note) => note.id !== noteId));
}


//Making sure('notes.find') that a clicked/an opened 'note'('currentNoteId') is same as what is in 'state'('note.id') or('||') exist 'notes[0]'
function findCurrentNote(){
  return notes.find(note => {
    return note.id === currentNoteId
  }) || notes[0]
}


//Passing the various 'functions' above, to the respective components that they need to work in sync with, as property(props) of the components,
//so that they(the 'functions') can be accessed via 'props' in the components functions in their respective files
return (
  <main>
  {
      notes.length > 0 ?
    <Split
      sizes={[20, 80]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      pointerEvents= "auto"
      cursor="col-resize"
      className="split" 
      >
  
      <Sidebar
          notes={notes}
          currentNote={findCurrentNote()}
          setCurrentNoteId={setCurrentNoteId}
          newNote={createNewNote}
          handleClick={deleteNote}
      />

      {
          currentNoteId &&
          notes.length > 0 &&
          <Editor
            currentNote={findCurrentNote()}
            updateNote={updateNote}
          />
      }
    </Split>
    :
    <div className="no-notes">
      <h1>You have no notes</h1>
      <button
        className="first-note"
        onClick={createNewNote}>
          Create one now
      </button>
    </div>
  }
  </main>
)
}
*/


















//MODIFICATION 2(Making Sure that newly update notes comes ontop of other notes, after each update on the 'text field'):
/*
export default function App() {
  //Saving all 'notes' in state, and initializing to an empty array. 
  //Secondly, we 'lazily initialized' 'notes' 'state' so it doesn't reach out to localStorage on every single re-render of the App component.
  //NOTE, if we don't reach out to localStorage using the below syntax '() => JSON.parse(localStorage.getItem("notes")) || []', anytime we type in a
  //letter for a new 'note' or an updating 'note', 'React' automatically reaches out to localStorage thereby re-rendering every stored item from this 
  //code in the localStorage on the 'console', which at the long run gives the browser alot of loads to run.
  const [notes, setNotes] = React.useState(
  () => JSON.parse(localStorage.getItem("notes")) || []) 
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )//Making sure that a note exist('notes[0]'), that is a 'note' has been created and saved, before it can be accessed('notes[0].id'), 
  //to avoid 'error' on our code, or('||') display an empty field("").


  //Storing every created and updated 'notes' to the localStorage, using 'React.useEfect' method, since localStorage is an external body:
  React.useEffect(() =>{
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes] )


//   React.useEffect(()=> {
//     localStorage.setItem("notes", JSON.stringify(notes))
//     console.log(JSON.stringify(notes[0].body))
// }, [notes] )

  function createNewNote() {
    //Assigning a special 'id' to each created 'note', using 'nanoid' 'dependency package'.
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    //Add newly created 'notes'('newNote') to the beginging of the list before the previous 'notes'('...prevNotes')
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)//Setting current 'note' 'id' based on 'newNote' 'id'.
  }
  
  //Modifying the below function, so that the most recent updated 'Note' will be at the top of other 'Notes', after each update or Modifications:
  function updateNote(text) {

    //looping over the original 'Notes' array in 'state' via 'setNotes' state setter function.
    setNotes(oldNotes =>  {

      //NOTE, Initializing the array('newArray ') outside this scope will result the App to malfunction and render all saved 'Notes' in 'state' 
      //to the 'newArray' at each button clicked, instead of only the 'Note' that is been worked on or updated.
      let newArray = [] 
      for(let i=0; i < oldNotes.length; i++ ) {
        let oldNote = oldNotes[i] //Did this so that we do have to be repeat this 'oldNotes[i]' all the time, for simplicity sake.

        //if the 'oldNote' id is same as that of the 'current note(currentNoteId)' we are working on/updating,
        if(oldNote.id === currentNoteId) {

        //then, put the current note we are working on/updating which is an 'oldNote' at the begining of the array/at the top of other notes.
        newArray.unshift({...oldNote, body: text})
        } else {

          //else just leave the 'oldNote' at the end of the 'newArray' or the bottom of other 'Notes'
          newArray.push(oldNote)
        }
      }
      //returning the 'newArray', instead of what we have in 'state'('notes' array), so that the modification done to this/in this array 
      //will render when this function('updateNote(text)') is called.
      return newArray
     })
   
  }

//Making sure('notes.find') that a clicked/an opened 'note'('currentNoteId') is same as what is in 'state'('note.id') or('||') exist 'notes[0]'
function findCurrentNote(){
  return notes.find(note => {
    return note.id === currentNoteId
  }) || notes[0]
}


//Passing the various 'functions' above, to the respective components that they need to work in sync with, as property(props) of the components,
//so that they(the 'functions') can be accessed via 'props' in the components functions in their respective files
return (
  <main>
  {
      notes.length > 0 ?
    <Split
      sizes={[20, 80]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      pointerEvents= "auto"
      cursor="col-resize"
      className="split" 
      >
  
      <Sidebar
          notes={notes}
          currentNote={findCurrentNote()}
          setCurrentNoteId={setCurrentNoteId}
          newNote={createNewNote}
      />

      {
          currentNoteId &&
          notes.length > 0 &&
          <Editor
            currentNote={findCurrentNote()}
            updateNote={updateNote}
          />
      }
    </Split>
    :
    <div className="no-notes">
      <h1>You have no notes</h1>
      <button
        className="first-note"
        onClick={createNewNote}>
          Create one now
      </button>
    </div>
  }
  </main>
)
}
*/











































//MODIFIFCATION 1
/*
export default function App() {
  //Saving all 'notes' in state, and initializing to an empty array. 
  //Secondly, we 'lazily initialized' 'notes' 'state' so it doesn't reach out to localStorage on every single re-render of the App component.
  //NOTE, if we don't reach out to localStorage using the below syntax '() => JSON.parse(localStorage.getItem("notes")) || []', anytime we type in a
  //letter for a new 'note' or an updating 'note', 'React' automatically reaches out to localStorage thereby re-rendering every stored item from this 
  //code in the localStorage on the 'console', which at the long run gives the browser alot of loads to run.
  const [notes, setNotes] = React.useState(
  () => JSON.parse(localStorage.getItem("notes")) || []) 
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )//Making sure that a note exist('notes[0]'), that is a 'note' has been created and saved, before it can be accessed('notes[0].id'), 
  //to avoid 'error' on our code, or('||') display an empty field("").


  //Storing every created and updated 'notes' to the localStorage, using 'React.useEfect' method, since localStorage is an external body:
  React.useEffect(() =>{
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes] )


//   React.useEffect(()=> {
//     localStorage.setItem("notes", JSON.stringify(notes))
//     console.log(JSON.stringify(notes[0].body))
// }, [notes] )

  function createNewNote() {
    //Assigning a special 'id' to each created 'note', using 'nanoid' 'dependency package'.
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    //Add newly created 'notes'('newNote') to the beginging of the list before the previous 'notes'('...prevNotes')
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)//Setting current 'note' 'id' based on 'newNote' 'id'.
  }

  //Saving in 'state' any changes/update made to a 'note', using 'setNotes' 'state setter function':
  //'Mapping'('setNotes(oldNotes => oldNotes.map(oldNote => {') through an 'oldNote', if a click is made on a saved 'note' of the 'App', for a change to be implemented in the
  //'oldNote/already created and saved 'note' in 'state'. React confirms if the 'clicked' and 'mapped' 'oldNotes' 'id'('oldNote.id') is similary(===) to the 
  //'currentNote' 'id'('currentNoteId')/the newly opened 'note' in the 'text field' that is expecting a change, if same and true, then return (?) the change/update on the 'oldNote',
  //note that this update is targeted only on the 'body' where we have the 'text' field('{...oldNote, body: text}'), otherwise, just return (':') the 
  //'oldNote' if no changes was implemented after clicking and opening the 'oldNote' for changes:
  function updateNote(text) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentNoteId ? {...oldNote, body: text}
      : oldNote
    }))
   
  }

//Making sure('notes.find') that a clicked/an opened 'note'('currentNoteId') is same as what is in 'state'('note.id') or('||') exist 'notes[0]'
function findCurrentNote(){
  return notes.find(note => {
    return note.id === currentNoteId
  }) || notes[0]
}


//Passing the various 'functions' above, to the respective components that they need to work in sync with, as property(props) of the components,
//so that they(the 'functions') can be accessed via 'props' in the components functions in their respective files
return (
  <main>
  {
      notes.length > 0 ?
     <Split
      sizes={[20, 80]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      pointerEvents= "auto"
      cursor="col-resize"
      className="split" 
      >
  
      <Sidebar
          notes={notes}
          currentNote={findCurrentNote()}
          setCurrentNoteId={setCurrentNoteId}
          newNote={createNewNote}
      />

      {
          currentNoteId &&
          notes.length > 0 &&
          <Editor
            currentNote={findCurrentNote()}
            updateNote={updateNote}
          />
      }
    </Split>
    :
    <div className="no-notes">
      <h1>You have no notes</h1>
      <button
        className="first-note"
        onClick={createNewNote}>
          Create one now
      </button>
    </div>
  }
  </main>
)
}

*/










































