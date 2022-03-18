const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText= document.getElementById("toggle-text");

const toggleColors = document.getElementById("toggle-colors");

const rootStyle = document.documentElement.style;

const flagsElement = document.getElementById("flags");
let textsToChange = document.querySelectorAll(`[data-section]`);

let containerProject = document.getElementById("container--projects");
const cardProject = document.getElementById("card--project");

let dataPages;
let nums = 0;
let pagesFilter;

const moreTen = document.getElementById("more-10");

const buttonGoUp = document.getElementById("button-go-up");
const buttonResect = document.getElementById("button-resect");

const loading = document.getElementById("loading");

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
    // error
    if(elements === "error"){
        const cardError = document.createElement("p");
        cardError.classList.add("cardError");

        if(language === "es") cardError.textContent = "El servidor no responde, por favor intentelo de nuevo mas tarde.";
        else cardError.textContent = "the server is not answering, please try again later.";

        cardError.setAttribute("data-section","card Error");
        cardError.setAttribute("data-value","menssage");
        
        containerProject.appendChild(cardError);
        containerProject.classList.add("one-col");

        textsToChange = document.querySelectorAll(`[data-section]`);
        return
    }
    // 0 pages
    if(elements === "there are no pages"){
        const cardError = document.createElement("p");
        cardError.classList.add("cardError");

        if(language === "es") cardError.textContent = "No hay Paginas.";
        else cardError.textContent = "there are no pages.";

        cardError.setAttribute("data-section","card no Pages");
        cardError.setAttribute("data-value","menssage");
        
        containerProject.appendChild(cardError);
        containerProject.classList.add("one-col");

        textsToChange = document.querySelectorAll(`[data-section]`);
        return
    }

    // show 10
    for(let i = num1 ; i < num2 ;i++){

        if(!elements[i]){
            moreTen.classList.add("finished");
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
            span.dataset.filter = ele;

            projectTags.appendChild(span);
        })

        img.src = elements[i].data.image;
        img.setAttribute("alt",(language === "en" ? "screenshot" : "captura de pantalla"));
        img.setAttribute("data-value","alt");
        img.setAttribute("data-section", "project"); 
        containerIMG.appendChild(img);
        card.appendChild(containerIMG);
        card.appendChild(projectTags);

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
        card.appendChild(containerIMG);

        containerProject.appendChild(card);
        
        if(containerProject.classList.contains("one-col")) containerProject.classList.add("one-col");
    }

    if(moreTen.classList.contains("finished")) moreTen.classList.remove("finished");
}

const showProjects = async () =>{
    try {  
        const url = "../assets/json/data.json";
        const data = await fetch(url);

        if(data.status === 200 || data.status === 201) { 
            const json = await data.json();
            dataPages = json.reverse();
        }
        else throw "error";

    } catch (error) {
        dataPages = error;
    }

    // crear mensaje de error 
    if(dataPages === "error"){
        createCard("error");
        return    
    }

    // crear mensaje si datos guardados 
    if(dataPages.length === 0){ 
        createCard("there are no pages");
        return
    }
    // crear card de project 
    if(dataPages.length > 0) createCard(dataPages, 0, 10);
}

const filter = async (text) =>{
    text = text.toLowerCase();
    pagesFilter = dataPages.filter(element => element.data.tags.join(" ").toLowerCase().includes(text));

    containerProject.parentNode.removeChild(containerProject);

    const newContainerProjects = document.createElement("div");
    newContainerProjects.id = "container--projects";
    newContainerProjects.classList.add("container--projects");
    cardProject.appendChild(newContainerProjects);

    containerProject = document.getElementById("container--projects");
  
    createCard(pagesFilter, 0, 10);

    // button Resect
    buttonResect.classList.add("open");
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
        if(!pagesFilter) createCard(dataPages,nums * 10, (nums * 10 + 10));
        if(pagesFilter) createCard(pagesFilter,nums * 10, (nums * 10 + 10));
       
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

    // open Images and Filter
    cardProject.addEventListener("click",(e)=>{
        // Images
        if(e.target.classList.contains("card__image-container")){
            e.target.classList.toggle("open");
        }
        if(e.target.parentNode.classList.contains("card__image-container")){
            e.target.parentNode.classList.toggle("open");
        }

        // Filter
        if(e.target.dataset.filter){
            filter(e.target.dataset.filter);
        }
    })

    buttonResect.addEventListener("click",()=>{
        containerProject.parentNode.removeChild(containerProject);

        const newContainerProjects = document.createElement("div");
        newContainerProjects.id = "container--projects";
        newContainerProjects.classList.add("container--projects");
        cardProject.appendChild(newContainerProjects);
    
        containerProject = document.getElementById("container--projects");
      
        createCard(dataPages, 0, 10);

        buttonResect.classList.remove("open");
        pagesFilter = null;
    })

    // close loading
    loading.classList.add("close")
})

// LocalStorage

const theme = localStorage.getItem("Portfolio-Theme");
if(!document.body.classList.contains(theme)) changeTheme(theme);

const color = localStorage.getItem("Portfolio-Color");
rootStyle.setProperty("--primary-color", color);

const language = localStorage.getItem("Portfolio-Language");
if(language !== "en") changeLanguage(language);