import React from "react";


//MODIFICATION 2(Adding of the delete button for deleting of 'Notes' below):

export default function Sidebar(props) {
//Mapping through the 'notes' 'state' in the 'App.js' file through 'props', this is done so as to make sure each created 'note' that is 
//been clicked for editing/updating, tally with what we have in 'state' to avoid errors.
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}

         
//With the below, you can edit previous notes or notes that has already been created before and stored in 'state', 
//if the clicked/selected note's 'id' is same as what is in 'state'. 

//The below '{note.body.split("\n")[0]}', means that, on a created 'Note' element, JS should 'split' the body of the 'text field' into
//different lines using the 'new line character'("\n"), thereby making the 'text field' body into an 'array', as a result of the '.split()' method  used on the body('note.body') of
//the 'text field', and return only the first 'index'/'word'/'line', as the name of the created 'Note'. 
                onClick={() => props.setCurrentNoteId(note.id)} 
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    
//Event Listener('onClick') for deleting 'notes' based on their respective 'ids(note.id)' and this specific 'event'.
//Meaning the 'event' is used here as a parameter, so that this 'event' doesn't 'Propagates' further to its 'parent' element('noteElements'),
//considering the fact that its 'parent' element has its own 'onclick' 'event' to handle:
                    onClick={(event) => props.handleClick(event, note.id)} 
                >
                    x
                </button>

            </div>
        </div>
    ))

//Below, new 'notes' are generated/created onclick of this '<button className="new-note" onClick={props.newNote}>+</button>', via the help of this
//component(newNote) and it function(createNewNote) in the 'App.js file'; 'newNote={createNewNote}',  through 'props(onClick={props.newNote})'
    return(
        <section className="pane--sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}





//MODIFICATION 2(Modifiying the 'Notes' name so that the name of each saved 'Note' will be the first word on the text field):
/*
export default function Sidebar(props) {
    //Mapping through the 'notes' 'state' in the 'App.js' file through 'props', this is done so as to make sure each created 'note' that is 
    //been clicked for editing/updating must tally with what we have in 'state' to avoid errors.
        const noteElements = props.notes.map((note, index) => (
            <div key={note.id}>
                <div
                    className={`title ${
                        note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
    
             
    //With the below, you can edit previous notes or notes that has already been created before and stored in 'state', 
    //if the clicked/selected note's 'id' is same as what is in 'state'. 
    
    //The below '{note.body.split("\n")[0]}', means that, on a created 'Note' element, JS should 'split' the body of the 'text field' into
    //different lines using the 'new line character'("\n"), thereby making the 'text field' body into an 'array', as a result of the '.split()' method  used on the body('note.body') of
    //the 'text field', and return only the first 'index'/'word'/'line', as the name of the created 'Note'. 
                    onClick={() => props.setCurrentNoteId(note.id)} 
                >
                    <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                </div>
            </div>
        ))
    
    //Below, new 'notes' are generated/created onclick of this '<button className="new-note" onClick={props.newNote}>+</button>', via the help of this
    //component(newNote) and it function(createNewNote) in the 'App.js file'; 'newNote={createNewNote}',  through 'props(onClick={props.newNote})'
        return(
            <section className="pane--sidebar">
                <div className="sidebar--header">
                    <h3>Notes</h3>
                    <button className="new-note" onClick={props.newNote}>+</button>
                </div>
                {noteElements}
            </section>
        )
    }
*/




























//MODIFICATION 1:
/*
export default function Sidebar(props) {
    //Mapping through the 'notes' 'state' in the 'App.js' file through 'props', this is done so as to make sure each created 'note' that is 
    //been clicked for editing/updating must tally with what we have in 'state' to avoid errors.
        const noteElements = props.notes.map((note, index) => (
            <div key={note.id}>
                <div
                    className={`title ${
                        note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
    
             
    //With the below, you can edit previous notes or notes that has already been created before and stored in 'state', 
    //if the clicked/selected note's 'id' is same as what is in 'state'. 
                    onClick={() => props.setCurrentNoteId(note.id)} 
                >
                    <h4 className="text-snippet">Note {index + 1}</h4>
                </div>
            </div>
        ))
    //Above; onclick of the '<button className="new-note" onClick={props.newNote}>+</button>' below, the note components 'number' increments via
    //the help of the above expression in 'h4' 'Note {index + 1}'
    
    //Below, new 'notes' are generated/created onclick of this '<button className="new-note" onClick={props.newNote}>+</button>', via the help of this
    //component(newNote) and it function(createNewNote) in the 'App.js file'; 'newNote={createNewNote}',  through 'props(onClick={props.newNote})'
        return(
            <section className="pane--sidebar">
                <div className="sidebar--header">
                    <h3>Notes</h3>
                    <button className="new-note" onClick={props.newNote}>+</button>
                </div>
                {noteElements}
            </section>
        )
    }
    */