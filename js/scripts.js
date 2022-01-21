const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText= document.getElementById("toggle-text");

const toggleColors = document.getElementById("toggle-colors");

const rootStyle = document.documentElement.style;

const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll(`[data-section]`);

const changeLanguage = async (language) =>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();


    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener("click",(e)=>{
    let language = e.target.parentElement.dataset.language;

    if(language) changeLanguage(language);

    if (language == "es"){
        toggleTheme.dataset.lenguage = "en";
        toggleText.textContent == "Dark Mode" ? toggleText.textContent = "Modo Noche": toggleText.textContent = "Modo Dia";
    }
    else {
        toggleTheme.dataset.lenguage = "en";
        toggleText.textContent == "Modo Noche" ? toggleText.textContent = "Dark Mode": toggleText.textContent = "Light Mode";
    }
})

toggleTheme.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(toggleIcon.src.includes("sun.svg")){
        toggleIcon.src = "assets/icons/moon.svg";
        toggleText.textContent == "Light Mode" ? toggleText.textContent = "Dark Mode" : toggleText.textContent ="Modo Noche";
    }
    else{
        toggleIcon.src = "assets/icons/sun.svg";
        toggleText.textContent == "Dark Mode" ? toggleText.textContent = "Light Mode" : toggleText.textContent ="Modo Dia";
    }
})

toggleColors.addEventListener("click",(e)=>{
    rootStyle.setProperty("--primary-color", e.target.dataset.color);
})