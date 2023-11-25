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

    const fileSplit = fileContent.split('\r\n')
    const numLines = fileContent.split('\r\n').length
    console.log(fileContent)

    const lineNumberSpaceDiv = document.getElementsByClassName("lineNumberSpace").item(0);
    const codeSpaceDiv = document.getElementsByClassName("codeSpace").item(0);

    lineNumberSpaceDiv.innerHTML = ""
    codeSpaceDiv.innerHTML = ""

    for (let index = 0; index < numLines; index++) {
      const numLine = document.createElement("P");
      const codeLine = document.createElement("P");

      numLine.className = "lineNumber line-" + index;
      numLine.textContent = index
      lineNumberSpaceDiv.appendChild(numLine);

      codeLine.className = "lineCode line-" + index;
      if (index < numLines){
        codeLine.textContent = fileSplit[index];
      }
      codeSpaceDiv.appendChild(codeLine);
    }
    console.log(fileData)
  };
  console.log(evt.target.files[0])
  reader.readAsText(evt.target.files[0])
}

export default App;
