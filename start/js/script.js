const body = document.querySelector("body");
const search = document.querySelector("input");
const links = document.querySelectorAll("a");
const time = document.querySelector("#time");
const toggle = document.querySelectorAll("span button");
const darkbtn= document.querySelector("#darkMode");
const lightbtn = document.querySelector("#lightMode");
const colorSchemeToggle = document.querySelector(".colorSchemeToggle");
const textColorPicker = document.getElementById("txtC");
const bgTopColorPicker = document.getElementById("bgTopC");
const bgMidColorPicker = document.getElementById("bgMidC");
const bgBtmColorPicker = document.getElementById("bgBtmC");
const settingsButton = document.getElementById("settingsBtn");
const resetButton = document.getElementById("restartBtn");
let themeToggle = true;
let textEditorValue = "--text-day";
let bgEditorValue = "day";
let settingsOpen = false;
let defaultsColors = ['#ffc1e3','#f48fb1','#bf5f82','#323232','#7c437c','#4a148c','#12005e','#DEDEDE'];

search.value = "";
search.addEventListener("keyup", (e) => {
    result = search.value;
    if(e.code === "Enter"){
        window.location.href = `https://www.google.com/search?q=${result}`;
    }
});



toggle.forEach(btn => {
    btn.addEventListener("click", (e) => {
        changeTheme();
    });
});

let date = new Date(Date.now());
function updateClock() {
    date = new Date(Date.now());  
    time.textContent = `${date.toLocaleTimeString()}`;
    setTimeout(updateClock,1000);
}
updateClock();

if(date.getHours() >= 20 || date.getHours() <= 10) {
    themeToggle=true;
    changeTheme(false);
}


function changeTheme(i) {
    if(themeToggle) {
        themeToggle=false;
        body.classList.add('night');
        body.classList.remove('day');
        textEditorValue = "--text-night";
        bgEditorValue = "night";
    }
    else if(!themeToggle){
        themeToggle=true;
        body.classList.add('day');
        body.classList.remove('night');
        textEditorValue = "--text-day";
        bgEditorValue = "day";
    }
    updateSettings();
}


  

function updateSettings() {
    textColorPicker.value = getComputedStyle(document.documentElement).getPropertyValue(textEditorValue);
    bgTopColorPicker.value = getComputedStyle(document.documentElement).getPropertyValue(`--bg-${bgEditorValue}-top`);
    bgMidColorPicker.value = getComputedStyle(document.documentElement).getPropertyValue(`--bg-${bgEditorValue}-mid`);
    bgBtmColorPicker.value = getComputedStyle(document.documentElement).getPropertyValue(`--bg-${bgEditorValue}-btm`);
}

settingsButton.addEventListener('click', (e) => {
    if(!settingsOpen){
        document.querySelector(".settings").style.visibility= "visible";
        settingsButton.classList.add("settingsOpen");
        settingsOpen=true;
    } 
    else {
        document.querySelector(".settings").style.visibility= "hidden";
        settingsButton.classList.remove("settingsOpen");
        settingsOpen=false;
    }
});

resetButton.addEventListener('click', (e) => {
    let d = document.documentElement.style;
    d.setProperty('--bg-day-top',defaultsColors[0]);
    d.setProperty('--bg-day-mid',defaultsColors[1]);
    d.setProperty('--bg-day-btm',defaultsColors[2]);
    d.setProperty('--text-day',defaultsColors[3]);
    d.setProperty('--bg-night-top',defaultsColors[4]);
    d.setProperty('--bg-night-mid',defaultsColors[5]);
    d.setProperty('--bg-night-btm',defaultsColors[6]);
    d.setProperty('--text-night',defaultsColors[7]);
});

textColorPicker.addEventListener('change', (e) => {
    document.documentElement.style.setProperty(textEditorValue,textColorPicker.value);
});
bgTopColorPicker.addEventListener('change', (e) =>{
    document.documentElement.style.setProperty(`--bg-${bgEditorValue}-top`,bgTopColorPicker.value);
});
bgMidColorPicker.addEventListener('change', (e) =>{
    document.documentElement.style.setProperty(`--bg-${bgEditorValue}-mid`,bgMidColorPicker.value);
});
bgBtmColorPicker.addEventListener('change', (e) =>{
    document.documentElement.style.setProperty(`--bg-${bgEditorValue}-btm`,bgBtmColorPicker.value);
});