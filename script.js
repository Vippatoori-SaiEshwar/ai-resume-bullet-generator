async function generateBullet(){

let text = document.getElementById("inputText").value;

if(text.trim() === ""){
alert("Please enter your project description");
return;
}

document.getElementById("output").innerText = "Generating...";

try{

const response = await fetch("https://ai-resume-bullet-generator.onrender.com/generate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
text: text
})
});

const data = await response.json();

document.getElementById("output").innerText = data.bullet;

}
catch(error){

console.error(error);

document.getElementById("output").innerText = "Error generating bullet.";

}

function copyText(){

const text = document.getElementById("output").innerText;

navigator.clipboard.writeText(text)
.then(() => {
alert("Copied to clipboard!");
})
.catch(err => {
console.error("Copy failed", err);
});

}

function downloadBullet(){

const text = document.getElementById("output").innerText;

const blob = new Blob([text], { type: "text/plain" });

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "resume-bullet.txt";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

}


}
