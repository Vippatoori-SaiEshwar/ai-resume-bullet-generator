async function generateBullet(){

let text = document.getElementById("inputText").value;

if(text.trim() === ""){
alert("Please enter your project description");
return;
}

document.getElementById("output").innerHTML = "<span class='loading'>Generating...</span>";

const API_KEY = "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"; 

const prompt = `Convert this description into a professional resume bullet:

${text}`;

try{

const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":`Bearer ${API_KEY}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"openai/gpt-3.5-turbo",
messages:[
{
role:"user",
content:prompt
}
]
})
});

const data = await response.json();

const result = data.choices[0].message.content;

document.getElementById("output").innerText = result;

}
catch(error){

console.error(error);

document.getElementById("output").innerText = "Error generating bullet.";

}

}


// COPY FUNCTION
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


// DOWNLOAD FUNCTION
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