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
        <div className="lineNumberSpace">
          {/* <p  className="lineNumber">1</p>
          <p className="lineNumber">2</p> */}
        </div>
      </header>
    </div>
  );
}

const filestore = [];


function handleFileSelect(evt) {
  const file = evt.target.files[0];
  const reader = new FileReader();
  // document.getElementsByClassName("lineNumber")[0].textContent = ""
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
    const lineNumberSpaceDiv = document.getElementsByClassName("lineNumberSpace").item(0)
    console.log(lineNumberSpaceDiv)
    for (let index = 0; index < 1005; index++) {
      const line = document.createElement("P");
      line.className = "lineNumber line-" + index;
      // document.getElementsByClassName("lineNumber")[0].textContent += index +"\t" +fileSplit[index] + "\r\n"
      line.textContent = index
      lineNumberSpaceDiv.appendChild(line);
    }
    console.log(fileData)
  };
  console.log(evt.target.files[0])
  reader.readAsText(evt.target.files[0])
}

export default App;
