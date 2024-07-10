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

submitButton.addEventListener("click",()=>{
    let imgFile = inputFile.files[0];
    let formData = new FormData();
    formData.append('image', imgFile);
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})