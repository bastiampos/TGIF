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

glanceTables[0].members = members.filter(member => member.party === 'D')
glanceTables[1].members = members.filter(member => member.party === 'R')
glanceTables[2].members = members.filter(member => member.party === 'ID')

glanceTables.forEach( (party) => {
  party.totalMembers = party.members.length
})

glanceTables[3].totalMembers = members.length

// Attendance 

//Calculo promedio porcentaje Missed Votes

glanceTables.forEach( (party) => {
  party.missedVotesAverage = party.members.map( ({missed_votes_pct}) => missed_votes_pct)

  if (party.missedVotesAverage !=0) {
    party.missedVotesAverage= party.missedVotesAverage.reduce( (a, b) => a+b) / party.members.length
  } else {
    party.missedVotesAverage= 0
  }
})

//promedio de promedios
glanceTables[3].missedVotesAverage = (glanceTables[0].missedVotesAverage + glanceTables[1].missedVotesAverage + glanceTables[2].missedVotesAverage)/3

//Renderizo la tabla Glance

function pintarTablaGlance () {
  glanceTables.forEach((party) => {
    let rowsTableGlance = document.createElement('tr')
    rowsTableGlance.innerHTML = `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.missedVotesAverage.toFixed(2)} %</td>`
    document.getElementById('glaceAttTables').appendChild(rowsTableGlance)
  })
}

pintarTablaGlance()
//filtro luego ordeno 

attendanceTables.leastEngaged= [...members].filter(member => member.missed_votes_pct !== 0)
attendanceTables.mostEngaged= [...members].filter(member => member.missed_votes_pct !== 0)

attendanceTables.leastEngaged.sort( (a, b) => {
  return a.missed_votes_pct - b.missed_votes_pct
})

attendanceTables.mostEngaged.sort( (a, b) => {
  return b.missed_votes_pct - a.missed_votes_pct
})

//Tomo solo el 10% pedido
let indexofAttendancePct = parseInt(attendanceTables.mostEngaged.length * 0.1)
attendanceTables.mostEngaged = attendanceTables.mostEngaged.slice(0, `${indexofAttendancePct}`)
attendanceTables.leastEngaged = attendanceTables.leastEngaged.slice(0, `${indexofAttendancePct}`)

//Renderizo las tablas inferiores de PartyLoyalty
function pintarTablasAttendance (propiedad, tabla) {
  propiedad.forEach(member => {
    let rowsAttendanceTables = document.createElement('tr')
    let nameMember= `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
    rowsAttendanceTables.innerHTML= `<td><a href="${member.url}" target="_blank">${nameMember}</a></td><td>${member.missed_votes}</td><td>${member.missed_votes_pct.toFixed(2)} %</td>`
    console.log(nameMember)
    document.getElementById(tabla).appendChild(rowsAttendanceTables)
  })
}

pintarTablasAttendance(attendanceTables.leastEngaged, 'leastAttendance')
pintarTablasAttendance(attendanceTables.mostEngaged, 'mostAttendance')

//PARTY LOYALTY

//Calculos el porcentaje promedio de cada partido
glanceTables.forEach( (party) => {
  party.votesWithAPartyAverage = party.members.map( ({votes_with_party_pct}) => votes_with_party_pct)

  if (party.votesWithAPartyAverage !=0) {
    party.votesWithAPartyAverage= party.votesWithAPartyAverage.reduce( (a, b) => a+b) / party.members.length
  } else {
    party.votesWithAPartyAverage= 0
  }
})

//promedio de promedios
glanceTables[3].votesWithAPartyAverage = (glanceTables[0].votesWithAPartyAverage + glanceTables[1].votesWithAPartyAverage + glanceTables[2].votesWithAPartyAverage)/3

glanceTables.forEach((party) => {
  let rowsTableGlance = document.createElement('tr')
  rowsTableGlance.innerHTML= `<td>${party.nameParty}</td><td>${party.totalMembers}</td><td>${party.votesWithAPartyAverage.toFixed(2)} %</td>`
  document.getElementById('glacePLTables').appendChild(rowsTableGlance)
})

//filtro luego ordeno 

partyLoyaltyTables.leastLoyal = [...members].filter(member => member.votes_with_party_pct !== 0)
partyLoyaltyTables.mostLoyal = [...members].filter(member => member.votes_with_party_pct !== 0)

partyLoyaltyTables.leastLoyal.sort( (a, b) => {
  return a.votes_with_party_pct - b.votes_with_party_pct 
})

partyLoyaltyTables.mostLoyal.sort( (a, b) => {
  return b.votes_with_party_pct - a.votes_with_party_pct
})


//Tomo solo el 10% pedido
let indexofPartyLoyaltyPct = parseInt(partyLoyaltyTables.mostLoyal.length * 0.1)
partyLoyaltyTables.mostLoyal = partyLoyaltyTables.mostLoyal.slice(0, `${indexofPartyLoyaltyPct}`)
partyLoyaltyTables.leastLoyal = partyLoyaltyTables.leastLoyal.slice(0, `${indexofPartyLoyaltyPct}`)

//Renderizo las tablas inferiores de PartyLoyalty
function pintarTablasPartyLoyalty (propiedad, tabla) {
  propiedad.forEach(member => {
    let rowPartyRoyalty = document.createElement('tr')
    let nameMember= `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
    rowPartyRoyalty.innerHTML= `<td><a href="${member.url}" target="_blank">${nameMember}</a></td><td>${((member.votes_with_party_pct * member.total_votes) /100).toFixed(0)}</td><td>${member.votes_with_party_pct.toFixed(2)} %</td>`
    document.getElementById(tabla).appendChild(rowPartyRoyalty)
  })
}

pintarTablasPartyLoyalty(partyLoyaltyTables.mostLoyal, 'mostPartyLoyalty')
pintarTablasPartyLoyalty(partyLoyaltyTables.leastLoyal, 'leastPartyLoyalty')