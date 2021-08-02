//////////////////// ATTENDANCE Y PARTY LOYALTY //////////////////

let init = {
    headers: {"X-API-Key": "gkM6UdzTiY86JCaB23mRfMxwDgV4SqeijDQT54yt"}
}

let chamber

if (document.title.includes('House')) {
    chamber = 'house'
}

if (document.title.includes('Senate')) {
    chamber = 'senate'
}

fetch(`https://api.propublica.org/congress/v1/113/${chamber}/members.json`, init)
    .then(response => response.json())
    .then( json => {
       let members = json.results[0].members 
       test(members) 
    })
    .catch(error => console.log(error))

function test (members) {
        //Readmore index
    if (document.title.includes('Home')) {
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

    if (document.title.includes('Congress')) {

        //Filtro los Estados para no mostrarlos repetidos en el Form>Select
        let states = []

        members.forEach((member) => {
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
                miembrosFiltrados = members
            } else {
                miembrosFiltrados = members.filter( member => member.state === filtroStates)
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
    }

    //ATTENDANCE Y PARTY LOYALTY
        let statistics = {
            glanceTables: [
            {
                nameParty: 'Democrat',
                members: [],
                totalMembers: null,
                votesWithAPartyAverage: null,
                missedVotesAverage: null,
            },
            {
                nameParty: 'Republican',
                members: [],
                totalMembers: null,
                votesWithAPartyAverage: null,
                missedVotesAverage: null,
            },
            {
                nameParty: 'Independent',
                members: [],
                totalMembers: null,
                votesWithAPartyAverage: null,
                missedVotesAverage: null,
            },
            {
                nameParty: 'Total',
                members: [],
                totalMembers: null,
                votesWithAPartyAverage: null,
                missedVotesAverage: null,
            }
            ],
            attendanceTables: {
            mostEngaged: [],
            leastEngaged: []
            },
            partyLoyaltyTables: {
            mostLoyal: [],
            leastLoyal: []
            }
        }
        
        let {glanceTables, attendanceTables, partyLoyaltyTables} = statistics
        
        //Empiezo llenando de datos los objetos
        
        glanceTables[0].members = members.filter(member => member.party === 'D')
        glanceTables[1].members = members.filter(member => member.party === 'R')
        glanceTables[2].members = members.filter(member => member.party === 'ID')
        
        glanceTables.forEach( (party) => {
            party.totalMembers = party.members.length
        })
        
        glanceTables[3].totalMembers = members.length

        //Calculo promedio de porcentajes Attendance
        glanceTables.forEach( (party) => {
            party.missedVotesAverage = party.members.map( ({missed_votes_pct}) => missed_votes_pct)
        
            if (party.missedVotesAverage !=0) {
            party.missedVotesAverage= party.missedVotesAverage.reduce( (a, b) => a+b) / party.members.length
            } else {
            party.missedVotesAverage= 0
            }
        })
    
        //Calculo promedio de porcentajes PartyLoyalty
        glanceTables.forEach( (party) => {
            party.votesWithAPartyAverage = party.members.map( ({votes_with_party_pct}) => votes_with_party_pct)
        
            if (party.votesWithAPartyAverage !=0) {
            party.votesWithAPartyAverage= party.votesWithAPartyAverage.reduce( (a, b) => a+b) / party.members.length
            } else {
            party.votesWithAPartyAverage= 0
            }
        })  
        
        //filtro luego ordeno ATTENDANCE
        
        attendanceTables.leastEngaged= [...members].filter(member => member.missed_votes_pct !== 0)
        attendanceTables.mostEngaged= [...members].filter(member => member.missed_votes_pct !== 0)
        
        attendanceTables.leastEngaged.sort( (a, b) => {
            return a.missed_votes_pct - b.missed_votes_pct
        })
        
        attendanceTables.mostEngaged.sort( (a, b) => {
            return b.missed_votes_pct - a.missed_votes_pct
        })
        
        
        //filtro luego ordeno PARTY
        
        partyLoyaltyTables.leastLoyal = [...members].filter(member => member.votes_with_party_pct !== 0)
        partyLoyaltyTables.mostLoyal = [...members].filter(member => member.votes_with_party_pct !== 0)
        
        partyLoyaltyTables.leastLoyal.sort( (a, b) => {
            return a.votes_with_party_pct - b.votes_with_party_pct 
        })
        
        partyLoyaltyTables.mostLoyal.sort( (a, b) => {
            return b.votes_with_party_pct - a.votes_with_party_pct
        })
        
        
        //Tomo solo el 10% pedido Attendance
        let indexofAttendancePct = attendanceTables.mostEngaged.length * 0.1
        attendanceTables.mostEngaged = attendanceTables.mostEngaged.slice(0, `${indexofAttendancePct}`)
        attendanceTables.leastEngaged = attendanceTables.leastEngaged.slice(0, `${indexofAttendancePct}`)
        
        //Tomo solo el 10% pedido Party
        let indexofPartyLoyaltyPct = partyLoyaltyTables.mostLoyal.length * 0.1
        partyLoyaltyTables.mostLoyal = partyLoyaltyTables.mostLoyal.slice(0, `${indexofPartyLoyaltyPct}`)
        partyLoyaltyTables.leastLoyal = partyLoyaltyTables.leastLoyal.slice(0, `${indexofPartyLoyaltyPct}`)
        
        
        //RENDERIZADO DE TABLAS
        
        //Renderizo tablas  "at a glance"
        function pintarTablasGlance (table) {
            glanceTables.forEach((party) => {
            let row = document.createElement('tr')
            
            if(document.title.includes('Attendance')){
                row.innerHTML= `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.missedVotesAverage.toFixed(2) != 0 ? party.missedVotesAverage.toFixed(2) : 'Not apply'}</td>`
            }
        
            if(document.title.includes('PartyLoyalty')){
                row.innerHTML= `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.votesWithAPartyAverage.toFixed(2) !=0 ? party.votesWithAPartyAverage.toFixed(2) : 'Not apply'}</td>`
            }
            document.getElementById(table).appendChild(row)
            }) 
        }
        
        //Renderizo las tablas inferiores de Attendance
        function pintarTablasAttendance (propiedad, tabla) {
            propiedad.forEach(member => {
            let row = document.createElement('tr')
            let nameMember= `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
            row.innerHTML= `<td><a href="${member.url}" target="_blank">${nameMember}</a></td><td>${member.missed_votes}</td><td>${member.missed_votes_pct.toFixed(2)} %</td>`
            document.getElementById(tabla).appendChild(row)
            })
        }
        
        //Renderizo las tablas inferiores de PartyLoyalty
        function pintarTablasPartyLoyalty (propiedad, tabla) {
            propiedad.forEach(member => {
            let row = document.createElement('tr')
            let nameMember= `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
            row.innerHTML= `<td><a href="${member.url}" target="_blank">${nameMember}</a></td><td>${((member.votes_with_party_pct * member.total_votes) /100).toFixed(0)}</td><td>${member.votes_with_party_pct.toFixed(2)} %</td>`
            document.getElementById(tabla).appendChild(row)
            })
        }
        
        // LLAMO A LAS FUNCIONES
        
        if ( document.title.includes('Attendance') ) {
        
            pintarTablasGlance('glaceAttTables')
            pintarTablasAttendance(attendanceTables.leastEngaged, 'mostAttendance')
            pintarTablasAttendance(attendanceTables.mostEngaged, 'leastAttendance')
        }
        
        if ( document.title.includes('PartyLoyalty')) {
        
            pintarTablasGlance('glacePLTables')
            pintarTablasPartyLoyalty(partyLoyaltyTables.mostLoyal, 'mostPartyLoyalty')
            pintarTablasPartyLoyalty(partyLoyaltyTables.leastLoyal, 'leastPartyLoyalty')
        }
}