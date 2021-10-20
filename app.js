const filterBtn = document.querySelector("#filter")
const countriesList = document.querySelector("#mainbody")
const getAllBtn = document.getElementById("getall")
const sortRegion = document.getElementById("sort")
const search = document.getElementById("search")
const searchValue = document.getElementById("searchvalue")

let container = []

window.addEventListener("load",getAllCountries)
sortRegion.addEventListener("change", sortCountries)
search.addEventListener("click", searchCountries)
async function getAllCountries(){
    const countries = await fetch("https://restcountries.com/v3.1/all")
    const data = await countries.json()
    const displayCountries = () =>{
        data.forEach(country => {
            const {name, population , region , continents , flags , capital} = country
            const Info = {
            pop: `${population}`,
            reg: `${region}`,
            name: `${name.common}`,
            pic : `${flags.png}`,
            capital : `${capital}`,
            continent : `${continents}`,
            }
            addToArray(Info)
        })
    }
    displayCountries()
    updateCountryList()
}

function addToArray(arr){
    container.push(arr)
}


function updateCountryList(updateData = container){
    countriesList.innerHTML =""
    updateData.forEach(item => {
        const newDiv = document.createElement("div")
        newDiv.classList.add("flex-cols","m-2")

        const flag = document.createElement("img")
        flag.classList.add("rounded-lg")
        flag.src = item.pic

        const paragraph = document.createElement("p")
        paragraph.classList.add("w-full","text-center", "text-gray-darkest")
        paragraph.innerHTML = `<strong>${item.name}</strong> <br /> <strong>Population: </strong>${item.pop} <br /> <strong>Region: </strong>${item.reg} <br /><strong>Continent: </strong>${item.continent} <br /> <strong>Capital: </strong> ${item.capital} `

        newDiv.appendChild(flag)
        newDiv.appendChild(paragraph)

        countriesList.appendChild(newDiv)
    })
}

async function sortCountries() {
    container = []
    const res = await fetch(`https://restcountries.com/v3.1/region/${sortRegion.value}`)
    const data = await res.json() 
    const displayCountries = (anydata = data) =>{
        data.forEach(country => {
            const {name, population , region , continents , flags , capital} = country
            const Info = {
                pop: `${population}`,
                reg: `${region}`,
                name: `${name.common}`,
                pic : `${flags.png}`,
                capital : `${capital}`,
                continent : `${continents}`
            }
            addToArray(Info)
        })
    }
    displayCountries()
    updateCountryList()
}

async function searchCountries(){
    container=[]
    const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue.value}`)
    const data = await response.json()
    const displayCountries = (anydata = data) =>{
        data.forEach(country => {
            const {name, population , region , continents ,flags , capital} = country
            const Info = {
                pop: `${population}`,
                reg: `${region}`,
                name: `${name.common}`,
                pic : `${flags.png}`,
                capital : `${capital}`,
                continent : `${continents}`
            }
            addToArray(Info)
        })
    }
    displayCountries()
    updateCountryList()
}

