const members = data.results[0].members
// console.log(members)

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

/////////////////////////////////////////////////////////////////////////////////////////////////

//promedio de promedios Att
glanceTables[3].missedVotesAverage = (glanceTables[0].missedVotesAverage + glanceTables[1].missedVotesAverage + glanceTables[2].missedVotesAverage)/3

//promedio de promedios Party
glanceTables[3].votesWithAPartyAverage = (glanceTables[0].votesWithAPartyAverage + glanceTables[1].votesWithAPartyAverage + glanceTables[2].votesWithAPartyAverage)/3


/////////////////////////////////////////////////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////////////////////////


//Tomo solo el 10% pedido Attendance
let indexofAttendancePct = attendanceTables.mostEngaged.length * 0.1
attendanceTables.mostEngaged = attendanceTables.mostEngaged.slice(0, `${indexofAttendancePct}`)
attendanceTables.leastEngaged = attendanceTables.leastEngaged.slice(0, `${indexofAttendancePct}`)

//Tomo solo el 10% pedido Party
let indexofPartyLoyaltyPct = partyLoyaltyTables.mostLoyal.length * 0.1
partyLoyaltyTables.mostLoyal = partyLoyaltyTables.mostLoyal.slice(0, `${indexofPartyLoyaltyPct}`)
partyLoyaltyTables.leastLoyal = partyLoyaltyTables.leastLoyal.slice(0, `${indexofPartyLoyaltyPct}`)


///////////////////////////////////////////////////////////////////////////////////////////////////

//RENDERIZADO DE TABLAS

//Renderizo tablas  "at a glance"
function pintarTablasGlance (table) {
  glanceTables.forEach((party) => {
    let row = document.createElement('tr')
    
    if(document.title.includes('TGIF - Attendance House') || document.title.includes('TGIF - Attendance Senate')){
      row.innerHTML= `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.missedVotesAverage.toFixed(2)} %</td>`
    }

    if(document.title.includes('TGIF - PartyLoyalty House') || document.title.includes('TGIF - PartyLoyalty Senate' )){
      row.innerHTML= `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.votesWithAPartyAverage.toFixed(2)} %</td>`
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

///////////////////////////////////////////////////////////////////////////////////////////////////

// LLAMO A LAS FUNCIONES

if ( document.title.includes('TGIF - Attendance House') || document.title.includes('TGIF - Attendance Senate') ) {

  pintarTablasGlance('glaceAttTables')
  pintarTablasAttendance(attendanceTables.leastEngaged, 'leastAttendance')
  pintarTablasAttendance(attendanceTables.mostEngaged, 'mostAttendance')
}

if ( document.title.includes('TGIF - PartyLoyalty House') || document.title.includes('TGIF - PartyLoyalty Senate' )) {

  pintarTablasGlance('glacePLTables')
  pintarTablasPartyLoyalty(partyLoyaltyTables.mostLoyal, 'mostPartyLoyalty')
  pintarTablasPartyLoyalty(partyLoyaltyTables.leastLoyal, 'leastPartyLoyalty')
}