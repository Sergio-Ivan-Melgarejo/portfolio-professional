const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText= document.getElementById("toggle-text");

const toggleColors = document.getElementById("toggle-colors");

const rootStyle = document.documentElement.style;

const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll(`[data-section]`);

const containerProject = document.getElementById("container--projects");

let dataPages;
let nums = 0;

const moreTen = document.getElementById("more-10");

const buttonGoUp = document.getElementById("button-go-up");

const changeTheme = (theme) =>{
    if(theme === "light"){
        toggleIcon.src = "assets/icons/moon.svg";
        toggleText.textContent == "Light Mode" ? toggleText.textContent = "Dark Mode" : toggleText.textContent ="Modo Noche";
        document.body.classList.remove("dark");
    }
    else{
        toggleIcon.src = "assets/icons/sun.svg";
        toggleText.textContent == "Dark Mode" ? toggleText.textContent = "Light Mode" : toggleText.textContent ="Modo Dia";
        document.body.classList.add("dark");
    }
    
    localStorage.setItem("Portfolio-Theme",theme);
}

const changeLanguage = async (language) =>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();


    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }

    localStorage.setItem("Portfolio-Language", language);
}

const createCard = (elements, num1, num2) =>{
    // show 10
    for(let i = num1 ; i < num2 ;i++){

        if(!elements[i]){
            moreTen.parentNode.removeChild(moreTen);
            return;
        };

        const card = document.createElement("article");
        const containerIMG = document.createElement("div");
        const img = document.createElement("img");
        const project = document.createElement("div");
        const projectTags = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const buttons = document.createElement("div");
        const button1 = document.createElement("a");
        const button2 = document.createElement("a");

        card.classList.add("card");
        card.classList.add("card--project");
        containerIMG.classList.add("card__image-container");
        project.classList.add("project");
        projectTags.classList.add("project__tags");
        h2.classList.add("card__title");
        buttons.classList.add("buttons");
        button1.classList.add("button");
        button1.classList.add("button--primary");
        button2.classList.add("button");
        button2.classList.add("button--ghost");

        elements[i].data.tags.forEach(ele=>{
            const span = document.createElement("span");
            span.classList.add("project__tag");
            
            span.textContent = `#${ele}`;

            projectTags.appendChild(span);
        })

        img.src = elements[i].data.image;
        containerIMG.appendChild(img);
        card.appendChild(containerIMG);
        containerIMG.appendChild(projectTags);

        h2.textContent = elements[i].data.title;
        project.appendChild(h2);

        button1.textContent="Demo";
        button2.textContent="Code";
        button1.target="__black";
        button2.target="__black";
        button1.href=elements[i].data.demo;
        button2.href=elements[i].data.code;

        buttons.appendChild(button1);
        buttons.appendChild(button2);
        project.appendChild(buttons);

        card.appendChild(project);

        containerProject.appendChild(card);
    }
}

const showProjects = async () =>{
    const data = await fetch("../assets/json/data.json");
    const json = await data.json();
    dataPages = json.reverse();

    // crea card de project
    createCard(dataPages, 0, 10);
}

addEventListener("DOMContentLoaded",()=>{
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
        if(document.body.classList.contains("dark")) changeTheme("light");
        else changeTheme("dark");
    })

    toggleColors.addEventListener("click",(e)=>{
        rootStyle.setProperty("--primary-color", e.target.dataset.color);
        localStorage.setItem("Portfolio-Color", e.target.dataset.color);
    })

    moreTen.addEventListener("click",()=>{
        nums += 1;
        createCard(dataPages,nums * 10, (nums * 10 + 10));
    })

    showProjects();

    addEventListener("scroll",(e)=>{
        if(window.scrollY >= 1000 && !buttonGoUp.classList.contains("open")){
            buttonGoUp.classList.add("open");
        }
        if(window.scrollY < 1000 && buttonGoUp.classList.contains("open")){
            buttonGoUp.classList.remove("open")
        }
    })

    buttonGoUp.addEventListener("click",()=>{
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        })
    })
})

// LocalStorage

const theme = localStorage.getItem("Portfolio-Theme");
if(!document.body.classList.contains(theme)) changeTheme(theme);

const color = localStorage.getItem("Portfolio-Color");
rootStyle.setProperty("--primary-color", color);

const language = localStorage.getItem("Portfolio-Language");
console.log(language)
if(language !== "en") changeLanguage(language);

