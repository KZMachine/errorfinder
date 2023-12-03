import './App.css';
import { useState, useEffect } from 'react';

const filestore = [];
function App() {
  const [fileSelected, setFileSelected] = useState('');
  
  useEffect(()=>{
    const fileDisplayDiv = document.getElementsByClassName("fileDisplay").item(0);
    for(let x = 0; x < filestore.length; x++) {
      if (filestore[x].name === fileSelected) {
        fileDisplayDiv.innerHTML = filestore[x].html;
        return;
      }
    }
  }, [fileSelected])

  function handleFileSelect(evt) {
    const file = evt.target.files[0];
    if (!file) { // Prevents crash when no file is selected
      return;
    }
    setFileSelected(file.name);

    const fileDisplayDiv = document.getElementsByClassName("fileDisplay").item(0);
    const fileSelectorDiv = document.getElementsByClassName("fileSelector").item(0);
    

    for(let x = 0; x < filestore.length; x++) {
      if (filestore[x].name === file.name) {  // Prevents redundancy (To-do: potentially optimize further)
        return;
      }
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const fileName = file.name;
    
      const fileSplit = fileContent.split(/\r\n|\n|\r/)
      
      const numLines = fileSplit.length
      
      const fileButton = document.createElement("button");
      fileButton.className = "fileButton " + fileName;
      fileButton.textContent = fileName;
      
      fileButton.addEventListener("click", (evt)=>{
        const fileName = evt.target.textContent;
        setFileSelected(fileName);  // This in turn runs a React effect that displays the button's corresponding code
      })

      fileSelectorDiv.appendChild(fileButton);

      const lineNumberSpaceDiv = fileDisplayDiv.querySelector(".lineNumberSpace");
      const codeSpaceDiv = fileDisplayDiv.querySelector(".codeSpace");
      
      lineNumberSpaceDiv.innerHTML = ""
      codeSpaceDiv.innerHTML = ""
  
      for (let index = 0; index < numLines; index++) {  // Add code to DOM, line by line
        const lineNum = index + 1
        const numLine = document.createElement("div");
        const codeLine = document.createElement("div");
  
        numLine.className = "lineNumber line-" + lineNum;
        numLine.textContent = lineNum
        
  
        codeLine.className = "lineCode line-" + lineNum;
        if (fileSplit[index] === "") {
          codeLine.textContent = "\r\n";
        } else {
          codeLine.textContent = fileSplit[index];
        }
  
        lineNumberSpaceDiv.appendChild(numLine);
        codeSpaceDiv.appendChild(codeLine);
  
        const codeLineHeight = codeLine.clientHeight;
        numLine.style.height = codeLineHeight + "px";
        codeLine.style.height = codeLineHeight + "px";
      }

      const fileData = {
        name: fileName,
        content: fileContent,
        html: fileDisplayDiv.innerHTML
      }
  
      filestore.push(fileData)
    };
    reader.readAsText(evt.target.files[0])  // execution causes onload to run
  }

  return (
    <div>
        <input 
          onChange={handleFileSelect}
          type="file" name="file" id="file"/>
        <div className="fileSelector"></div>
        <div className="fileDisplay">
          <div className="lineNumberSpace"></div>
          <div className="codeSpace"></div>
        </div>
    </div>
  );
}

export default App;