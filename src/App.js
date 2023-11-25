import './App.css';
import { Box } from '@mui/material';




function App() {
  return (
    <div className="App">
      <header className="background">
        <input 
          onChange={handleFileSelect}
          type="file" name="file" id="file"/>
        <pre id="fileContent"></pre>
        <div className="lineNumberStorage">
          <p className="lineNumber"></p>
        </div>
      </header>
    </div>
  );
}

const filestore = [];
console.log(document.getElementsByClassName("lineNumber"))


function handleFileSelect(evt) {
  const file = evt.target.files[0];
  const reader = new FileReader();
  document.getElementsByClassName("lineNumber")[0].textContent = ""
  reader.onload = function (event) {
    const fileContent = event.target.result;
    const fileName = file.name;

    const fileData = {
      name: fileName,
      content: fileContent
    }
    filestore.push(fileData)
    console.log(filestore)
    const fileSplit = fileContent.split('\r\n')
    const numLines = fileContent.split('\r\n').length
    for (let index = 0; index < numLines; index++) {
      document.getElementsByClassName("lineNumber")[0].textContent += index +"\t" +fileSplit[index] + "\r\n"
      console.log(index)
    }
    
    document.getElementById('fileContent').textContent = fileContent;
    console.log(fileData)
  };
  console.log(evt.target.files[0])
  reader.readAsText(evt.target.files[0])
}

export default App;
