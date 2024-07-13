const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const submitButton = document.getElementById("submit");

inputFile.addEventListener("change",uploadImage);

function uploadImage(){

    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.style.border = 0;
    imgView.textContent = "";
}

dropArea.addEventListener("dragover",(e)=>{
    e.preventDefault();
});
dropArea.addEventListener("drop",(e)=>{
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
});

submitButton.addEventListener ("click",async ()=>{
    let output = await submitFile();
    displayOutput(output);
});


function displayOutput(data){
    let outputDiv = document.getElementById('output');
    // let html = '<h2>Here are 5 captions for your Image</h2><ul>';
    // output.forEach((item, index) => {
    //     html += `<li><strong>${index + 1}.</strong> ${item}</li>`;
    // });
    // html += '</ul>';
    outputDiv.innerHTML = data;
}
async function submitFile(){
    let imgFile = inputFile.files[0];
    let mimeType = imgFile.type;
    
    if (mimeType !== 'image/png' && mimeType !== 'image/jpeg'){
        return alert("File not supported!!!");
    }
    let formData = new FormData();
    formData.append('image', imgFile);
    let response = await fetch('/upload', {
        method: 'POST',
        body: formData
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        
        let data = await response.text();
        console.log(data.split("&\n"));
        return(data);
    }
}