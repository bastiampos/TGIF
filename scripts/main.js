//Readmore index
if (document.title.includes('TGIF - Home')) {
    const readMoreBtn = document.getElementById('readMore')
    const text = document.getElementById('pReadMore')

    readMoreBtn.addEventListener('click', () => {
        text.classList.toggle('read-more')
        if (readMoreBtn.innerText === 'Read more') {
            readMoreBtn.innerText = 'Read less'
        } else {
            readMoreBtn.innerText = 'Read more'
        }
    })
}

// Defino el array de objetos (Miembros)
let congressMembers = data.results[0].members

//Filtro los Estados para no mostrarlos repetidos en el Form>Select
let states = []

congressMembers.forEach((member) => {
    if (!states.includes(member.state)) {
        states.push(member.state)
    }
})
states.sort()

states.forEach((state) => {
    let stateOption = document.createElement('option')
    stateOption.setAttribute('value', state)
    stateOption.innerText = state
    if (document.title.includes('TGIF - Congress113')) {
       document.getElementById('statesSelect').appendChild(stateOption) 
    }
})

//Defino variables globales

var filtroStates = 'Todos'
var filtroParty = ['demo', 'repu', 'inde']
var miembrosFinales = []

function leerFiltros (){
    let miembrosFiltrados = []
    if (filtroStates == 'Todos') {
        miembrosFiltrados = congressMembers
    } else {
        miembrosFiltrados = congressMembers.filter( member => member.state === filtroStates)
    }

    miembrosFinales = []
    miembrosFiltrados.forEach( (member) => {
        // let parties = member.party
        if (member.party == 'D' && filtroParty.includes('demo')){
            miembrosFinales.push(member)
        }

        if (member.party == 'R' && filtroParty.includes('repu')){
            miembrosFinales.push(member)
        }

        if (member.party == 'ID' && filtroParty.includes('inde')){
            miembrosFinales.push(member)
        }
    })
}

leerFiltros()

//RENDERIZADO EN FUNCION
function filtrarTabla() {
    document.getElementById('table').innerText = ''
    leerFiltros()
    miembrosFinales.forEach((member) => {
        let row = document.createElement('tr')
        let nameMember = `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
        row.innerHTML= `<td><a href="${member.url}" target="_blank">${nameMember}</a></td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}</td>`
        document.getElementById('table').appendChild(row)
    })
}

filtrarTabla()

//Capturo los checkboxes como NodeList y la reescribo como Array
let checkboxes = document.getElementsByName('party')
checkboxes = Array.from(checkboxes) 

//CREO LOS EVENTOS

checkboxes.forEach( (input) => {
    input.addEventListener('change', (e) => {
        let cbValue = e.target.value
        let cbChecked = e.target.checked
        if (filtroParty.includes(cbValue) && !cbChecked){
            filtroParty = filtroParty.filter((valueEliminate)=>{
                return valueEliminate !== cbValue
            })
        } else if (!filtroParty.includes(cbValue) && cbChecked) {
            filtroParty.push(cbValue)
        }
        console.log(filtroParty)
        filtrarTabla()
    })
})

document.getElementById('statesSelect').addEventListener('change', (e) => {
    let stateSelected = e.target.value //Capturo el value de cada option
    filtroStates = stateSelected //Sobrescribo a filtroStates como el Value de cada Option
    filtrarTabla()
})