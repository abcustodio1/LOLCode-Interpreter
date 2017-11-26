const lolcodeFileUpload = (event) => {
    var input = event.target;
    if(input.files.length > 0) {
        var fileType = input.files[0].name.split(".")[1];
        var reader = new FileReader();
        reader.onload = function(){
            if(fileType == "lol") {
                document.getElementById("codeArea").value = reader.result;
                document.getElementById("filePrompt").innerHTML = "<font style='color:green;'>Lolcode File Detected</font>";
                document.getElementById("tokenTable").innerHTML = "<tr><th>Lexeme</th><th>Identifier</th></tr>";
                document.getElementById("consoleArea").innerHTML = "";
            }
            else {
                document.getElementById("codeArea").value = "";
                document.getElementById("filePrompt").innerHTML = "<font style='color:red;'>Invalid Lolcode File</font>";
                document.getElementById("tokenTable").innerHTML = "<tr><th>Lexeme</th><th>Identifier</th></tr>";
                document.getElementById("consoleArea").innerHTML = "";
            }
        };
        reader.readAsText(input.files[0]);
    }
    else {
        document.getElementById("codeArea").value = "";
        document.getElementById("filePrompt").innerText = "Please Select Lolcode File";
        document.getElementById("tokenTable").innerHTML = "<tr><th>Lexeme</th><th>Identifier</th></tr>";
        document.getElementById("consoleArea").innerHTML = "";
    }
}
