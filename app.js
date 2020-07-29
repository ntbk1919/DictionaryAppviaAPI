let input=document.querySelector('#input')
let searchBtn=document.querySelector('#search')
let apiKey='366128c6-3c8d-4c74-afed-cdc2028f2dba'
let notFound=document.querySelector('.not_found')
let loading=document.querySelector('.loading')
let defBox=document.querySelector('.def')
let audioBox=document.querySelector('.aud')
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    //Clear old Data
    audioBox.innerHTML=''
    notFound.innerText=''
    defBox.innerText=''
   //Get Input Data
    let word=input.value;
    
   //Call Api and get data
   if(word==''){
    alert('Word Required')
    return;
   }
   getData(word)
  

})
async function getData(word){
    loading.getElementsByClassName.display='block'
//fetch API
const response=await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
const data=await response.json();

//if empty result
if(!data.length){
    loading.getElementsByClassName.display='none'
    notFound.innerHTML='No result Found'
    return;
}
//If result is suggestions
if(typeof data[0]==='string'){
    loading.getElementsByClassName.display='none'
    let heading=document.createElement('h3')
    heading.innerText='Did you mean?'
    notFound.appendChild(heading)
    data.forEach(element=>{
        let suggestion=document.createElement('span')
        suggestion.classList.add('suggested')
        suggestion.innerText=element
        notFound.appendChild(suggestion)

    })
    return;
}
// Result Found
loading.getElementsByClassName.display='none'
let definition=data[0].shortdef[0]
defBox.innerText=definition;

//Sound 
const soundName=data[0].hwi.prs[0].sound.audio;
if(soundName){
    // 
    renderSound(soundName)
}
console.log(data)

}
function renderSound(soundName){
// https://media.merriam-webster.com/soundc11
let subfolder=soundName.charAt(0)
console.log(subfolder)
let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`
let aud=document.createElement('audio')
aud.src=soundSrc;
aud.controls=true
audioBox.appendChild(aud)
}