import './App.css';

function App() {
  return (
    <div className="App">
      <header className="background">
        <input 
          onChange={handleFileSelect}
          type="file" name="file" id="file"/>
        <pre id="fileContent"></pre>
        <div className="lineNumberSpace"></div>
        <div className="codeSpace"></div>
      </header>
    </div>
  );
}

const filestore = [];


function handleFileSelect(evt) {
  const file = evt.target.files[0];
  if (!file) { // Prevents crash when no file is selected
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    const fileContent = event.target.result;
    const fileName = file.name;

    const fileData = {
      name: fileName,
      content: fileContent
    }

    filestore.push(fileData)

    const fileSplit = fileContent.split(/\r\n|\n|\r/)
    
    const numLines = fileSplit.length

    const lineNumberSpaceDiv = document.getElementsByClassName("lineNumberSpace").item(0);
    const codeSpaceDiv = document.getElementsByClassName("codeSpace").item(0);

    lineNumberSpaceDiv.innerHTML = ""
    codeSpaceDiv.innerHTML = ""

    for (let index = 0; index < numLines; index++) {
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
  };
  reader.readAsText(evt.target.files[0])
}

export default App;