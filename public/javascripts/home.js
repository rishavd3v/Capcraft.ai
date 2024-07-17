const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const submitButton = document.getElementById("submit");
let outputDiv = document.getElementById('output');

inputFile.addEventListener("change",()=>{
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.style.border = 0;
    imgView.textContent = "";
});

dropArea.addEventListener("dragover",(e)=>{
    e.preventDefault();
});
dropArea.addEventListener("drop",(e)=>{
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
});

submitButton.addEventListener ("click",async ()=>{
    outputDiv.classList.add('hidden');
    if (!inputFile.files[0]) {
        alert('Please upload an image.');
        return;
    }
    let output = await submitFile();
    displayOutput(output);
});


function displayOutput(data){

    outputDiv.classList.remove('hidden');
    outputDiv.innerHTML = '';
    let head = document.createElement('h5');
    outputDiv.appendChild(head);
    head.classList.add('text-center', 'mb-2','font-medium');
    head.textContent = 'Here are few captions generated for your image';
    
    data.forEach(item => {
        let outerDiv = document.createElement('div');
        outerDiv.classList.add('sub-output', 'h-max', 'w-full', 'bg-gray-200', 'rounded-xl');

        let innerDiv = document.createElement('div');
        innerDiv.classList.add('h-max', 'flex', 'justify-end','items');
        
        let p = document.createElement('p');
        p.textContent = item;
        p.classList.add('caption', 'mb-2', 'ml-2', 'text-center');
        let i = document.createElement('i');
        i.classList.add('bi', 'bi-copy', 'h-min', 'text-black', 'text-sm', 'cursor-pointer', 'bg-gray-300', 'hover:bg-gray-400', 'px-1.5', 'rounded-tr-md');
        i.id = 'copy';

        innerDiv.appendChild(p);
        innerDiv.appendChild(i);
        outerDiv.appendChild(innerDiv);
        outputDiv.appendChild(outerDiv);

        
        i.addEventListener('click',()=>{
            let p = i.parentElement.querySelector('p');
            let caption = p.innerText;
            navigator.clipboard.writeText(caption).then(()=>{
                console.log("Copied");
                alert("Copied")
            },(err)=>{
                console.error("Error in copying"+err);
            });
        });
    });
    outputDiv.scrollIntoView({ behavior: 'smooth' });
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
        alert("Unexpected Error");
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        
        let data = await response.text();
        return data.split("&");
    }
}