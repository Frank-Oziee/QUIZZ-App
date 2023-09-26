import React from "react";
import ReactMde from "react-mde"; //importing the 'react-mde' package from the React 'dependencies', so as to be used below
import Showdown from "showdown"; //importing the 'showdown' package from the React 'dependencies', so as to be used below
import "react-mde/lib/styles/css/react-mde-all.css"; //importing the 'react-mde' package 'css style' from its library, so as to be used below


export default function Editor({currentNote, updateNote}) {
   const [selectedTab, setSelectedTab] = React.useState("write");

   const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

//Below the 'destructured' 'props' components '{currentNote, updateNote}' from the 'Mother File(App.js)' is passed to the 'text field' 'value'
//attribute and the 'onChange' event listener respectively, so as to checkmate notes and any changes on 'notes', in case of any update. This makes
//the whole 'files' and 'components' work in sync.
    return (
      <section className="container" >
        <ReactMde
          value={currentNote.body}
          onChange={updateNote}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          //The below is used to set the Editor's 'text area' 'height'
          minEditorHeight={50}
          heightUnits="vh"
        />
      </section>
    );
  }