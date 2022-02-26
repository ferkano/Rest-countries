const d = document,
ls= localStorage,
$countries = d.getElementById("countries"),
$container = d.querySelector(".container"),
$modal = d.querySelector(".modal"),
$selectFilter = d.getElementById("select-filter"),
$border = d.querySelector(".border-countries"),
$search = d.getElementById("search"),
$span = d.createElement("span"),
$themeBtn = d.getElementById("theme"),

$template = d.getElementById("template").content,
$fragment = d.createDocumentFragment(),
$templateModal = d.getElementById("template-modal").content,
$fragmentModal = d.createDocumentFragment(),
$templateBorder = d.getElementById("template-border").content,
$fragmentBorder= d.createDocumentFragment();

const counterApi = "https://restcountries.com/v3.1/all",
 urlApiCode =`https://restcountries.com/v3.1/alpha/`,
 urlApiName = `https://restcountries.com/v3.1/name/`;

 let $selectors = d.querySelectorAll("[data-dark]"),
 $selectorsElement = d.querySelectorAll(".element-light");

 let moon = "🌙 Dark Mode",
 sun = " 🔆Light Mode";

 const ligthMode = () =>{
    $selectors.forEach(el => el.classList.remove("dark-mode"));
    $selectorsElement.forEach(el => {
        el.classList.remove("element-dark");
        el.classList.add("element-light");
    })

    let $elementApi = d.querySelectorAll(".element-api");

    $elementApi.forEach(el => {
        el.classList.remove("element-dark");
        el.classList.add("element-light");
    })

    $themeBtn.textContent = moon;
    ls.setItem("theme","light");
}

const darkMode = () => {
    $selectors.forEach(el => el.classList.add("dark-mode"));
    $selectorsElement.forEach(el => {
        el.classList.add("element-dark");
        el.classList.remove("element-light");
    })

    let $elementApi = d.querySelectorAll(".element-api");

    $elementApi.forEach(el => {
        el.classList.add("element-dark");
        el.classList.remove("element-light");

    })

    $themeBtn.textContent = sun;
    ls.setItem("theme","dark");
}

const themeApi = () =>{
    if (ls.getItem("theme") === "light"){
        let $elementApi = d.querySelectorAll(".element-api");

        $elementApi.forEach(el => {
            el.classList.remove("element-dark");
            el.classList.add("element-light");
        })
    }

    if (ls.getItem("theme") === "dark"){
        let $elementApi = d.querySelectorAll(".element-api");

        $elementApi.forEach(el => {
            el.classList.add("element-dark");
            el.classList.remove("element-light");
        })
    }
}

const capital =(element) =>{
    if(element.hasOwnProperty("capital")) {
    if(element.capital[0]){
    return element.capital[0]  ;                        
    }else{
        return "Without description"
    }
    }else{
    return "Without description"
    };
};

async function loadfirst (url) {
    
    try {
        let res = await fetch(url),
        json = await res.json();

        if(!res.ok) throw {status: res.status, statusTex: res.statusText}
       
            json.forEach(element => {
                $template.querySelector("img").src= element.flags.png;
                $template.querySelector(".name").textContent = element.name.common ? element.name.common : "Without description";   
                $template.querySelector(".population").textContent= element.population ? Number(element.population).toLocaleString()  : "Without description";
                $template.querySelector(".region").textContent= element.continents[0]? element.continents[0] : "Without description";
                $template.querySelector(".capital").textContent= capital(element);
                $template.querySelector(".face-front").setAttribute("data-code",element.cca2);
                 
                let $clone = d.importNode($template,true); 
                 $fragment.appendChild($clone);
            });
    
            $countries.innerHTML="";
            $countries.appendChild($fragment);
        

    } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrio un error";
        $countries.innerHTML = `<p>error ${error.status}: ${message}</p>`; 
    }
    themeApi();
}

async function fetchModal(url){
    try {
        let res = await fetch(url),
         json= await res.json();
         
        if(!res.ok) throw {status : res.status, statusText : res.statusText} 
 
         $templateModal.querySelector(".name-modal").innerHTML = json[0].name.common ? json[0].name.common : "Without description";
         $templateModal.querySelector(".image-modal").src = json[0].flags.png ? json[0].flags.png : "Without description";
         $templateModal.querySelector(".native-name-modal").innerHTML= json[0].name.nativeName ? Object.values(json[0].name.nativeName)[0].official : "Without description";
         $templateModal.querySelector(".population-modal").innerHTML= json[0].population ?  Number(json[0].population).toLocaleString() : "Without description";
         $templateModal.querySelector(".region-modal").innerHTML= json[0].region ? json[0].region : "Without description";
         $templateModal.querySelector(".sub-region-modal").innerHTML= json[0].subregion ? json[0].subregion : "Without description";  
         $templateModal.querySelector(".capital-modal").innerHTML= capital(json[0]);
         $templateModal.querySelector(".top-level-modal").innerHTML= json[0].tld[0] ? json[0].tld[0] : "Without description";
         $templateModal.querySelector(".Currencies").innerHTML= json[0].currencies ? Object.values(json[0].currencies)[0].name : "Without description";

         $templateModal.querySelector(".languages").innerHTML= json[0].languages ? Object.values(json[0].languages) : "Without description"

         let $cloneModal = d.importNode($templateModal,true); 
          $fragmentModal.appendChild($cloneModal);
          
          $modal.innerHTML="";
          $modal.appendChild($fragmentModal);
          
          if(json[0].hasOwnProperty("borders")){
            let codeModalLeft= json[0].borders[0],  
            counterApiNameLeft = `${urlApiCode}${codeModalLeft}`,   
            codeModalRight = json[0].borders[json[0].borders.length - 1],
            counterApiNameRight = `${urlApiCode}${codeModalRight}`,
            codeModalCenter = json[0].borders[Math.floor(json[0].borders.length / 2)],
            counterApiNameCenter= `${urlApiCode}${codeModalCenter}`;

            async function fetchNameButton (urlleft,urlcenter,urlright) {
               
               try {
                   let resLeft = await fetch(urlleft),
                     jsonLeft = await resLeft.json(),
    
                     resCenter = await fetch(urlcenter),
                     jsonCenter = await resCenter.json(),
    
                     resRight = await fetch(urlright),
                     jsonRight = await resRight.json();
    
                   if(!res.ok) throw {status : res.status, statusText : res.statusText} 
    
                   $templateBorder.querySelector(".button-left").innerHTML = jsonLeft[0].name.common ? jsonLeft[0].name.common : "Without description";
                   $templateBorder.querySelector(".button-center").innerHTML = jsonCenter[0].name.common ? jsonCenter[0].name.common : "Without description";
                   $templateBorder.querySelector(".button-right").innerHTML = jsonRight[0].name.common ? jsonRight     [0].name.common : "Without description";
    
                   $templateBorder.querySelector(".button-left").setAttribute("data-code",codeModalLeft);
                   $templateBorder.querySelector(".button-center").setAttribute("data-code",codeModalCenter);
                   $templateBorder.querySelector(".button-right").setAttribute("data-code",codeModalRight);
    
                   let $cloneBorder = d.importNode($templateBorder,true); 
                   $fragmentBorder.appendChild($cloneBorder);
                   
                   $border.innerHTML= "";
                   $border.appendChild($fragmentBorder);
                   $modal.appendChild($border);
                   
               } catch (error) {
                   console.log(error);
                   let message = error.statusText || "Ocurrio un error";
                   $border.innerHTML = `<p>error ${error.status}: ${message}</p>`;
               }
            themeApi();         
            }
            fetchNameButton(counterApiNameLeft,counterApiNameCenter,counterApiNameRight);
        }else{

            const $message = d.createElement("h4"),
            $containerMessage = d.createElement("section");
            $containerMessage.classList.add("container-message");

            $message.textContent="without description of countries";
            $message.classList.add("message");
             

            $border.innerHTML="";
            $containerMessage.appendChild($message);
            $modal.appendChild($containerMessage);
        }
          
    } catch (error) {
        console.log(error);
        let message = error.statusText || "Ocurrio un error";
        $modal.innerHTML = `<p>error ${error.status}: ${message}</p>`;
    }

    themeApi();
}

d.addEventListener("DOMContentLoaded", e =>{
    loadfirst(counterApi);

    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
    if (ls.getItem("theme") === "light") ligthMode();
    if (ls.getItem("theme") === "dark") darkMode();
    });
    
d.addEventListener("click", e=>{

    if (e.target.matches(".face-front")){
        $container.classList.add("noactive");
        $modal.classList.add("modalisactive");

        let code= e.target.getAttribute("data-code");
      
        fetchModal(`${urlApiCode}${code}`); 
        
    
    }

    if(e.target.matches(".back")){
        $container.classList.remove("noactive");
        $modal.classList.remove("modalisactive")
    }

    if(e.target.matches(".button-border")){
        
        let codeButton = e.target.getAttribute("data-code")
        console.log(codeButton);

        fetchModal(`${urlApiCode}${codeButton}`); 
    }

    if(e.target.matches(".theme")){
        if(e.target.textContent === moon){
            darkMode();
        }else{
            ligthMode();
        }
    }
    
})

$selectFilter.addEventListener("change", e =>{

    const counterApiFilter = `https://restcountries.com/v3.1/region/${e.target.value}`

    //console.log(counterApiFilter)
        
    async function filter(url){
        try {
            let res = await fetch(url),
             json = await res.json();
    
             if(!res.ok) throw {status : res.status, statusText : res.statusText}
    
             json.forEach(element => {
                $template.querySelector("img").src= element.flags.png;
                $template.querySelector(".name").textContent = element.name.common ? element.name.common : "Without description";   
                $template.querySelector(".population").textContent= element.population ? Number(element.population).toLocaleString() : "Without description";
                $template.querySelector(".region").textContent= element.continents[0]? element.continents[0] : "Without description";
                $template.querySelector(".capital").innerHTML= capital(element);
                $template.querySelector(".face-front").setAttribute("data-code",element.cca2);
                 
                let $clone = d.importNode($template,true); 
                 $fragment.appendChild($clone);
             })
                $countries.innerHTML="";
                $countries.appendChild($fragment);
    
    
        } catch (error) {
            console.log(error);
            let message = error.statusText || "Ocurrio un error";
            $countries.innerHTML = `<p>error ${error.status}: ${message}</p>`;
        }
        themeApi();         
    } 
    if(e.target.value !== ""){
        filter(counterApiFilter);
    }

    if(e.target.value === ""){
        loadfirst(counterApi);
    }
})

d.addEventListener("keypress", async e =>{
    if(e.target.matches("#search")){
        //console.log(e.key)
        if(e.key==="Enter"){
            //console.log(e.target.value)
            if(e.target.value ==""){
                loadfirst(counterApi);
            }else{
                let query = e.target.value.toLowerCase(),                
                  apiName = `${urlApiName}${query}`;

                  loadfirst(apiName);
            }   
        }     
    }
})

$span.id = $search.name;
$span.textContent = $search.title;
$span.classList.add("search-error","none")
$search.insertAdjacentElement("afterend",$span);

d.addEventListener("keyup", e =>{
    
    if(e.target.matches(".search[required]")){
        let $input = e.target,
         pattern = $input.pattern;

         if(pattern){
            let regex = new RegExp(pattern);
            
            if(!regex.exec($input.value)){
                d.getElementById($input.name).classList.add("is-active")
            }else{
                d.getElementById($input.name).classList.remove("is-active")
            }

            if(!$search.value){    
                d.getElementById($input.name).classList.remove("is-active")
            }
         }
    }
});









