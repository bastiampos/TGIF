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

console.log(statistics)

let {glanceTables, attendanceTables, partyLoyaltyTables} = statistics

//Filtro por partido a cada miembro y lo agrego a su respectivo objeto en statistics

glanceTables[0].members = members.filter(member => member.party === 'D')
glanceTables[1].members = members.filter(member => member.party === 'R')
glanceTables[2].members = members.filter(member => member.party === 'ID')

console.log(glanceTables)
//Calculo el total de miembros
glanceTables.forEach( (party) => {
  party.totalMembers = party.members.length
})

//Calculo el total en la tabla Glance: Attendance y Party Loyalty
glanceTables[3].totalMembers = glanceTables[0].totalMembers + glanceTables[1].totalMembers + glanceTables[2].totalMembers

// Attendance 

//Calculo promedio porcentaje Missed Votes

// glanceTables.forEach( (party) => {
//   party.missedVotesAverage = party.members.map( ({missed_votes_pct}) => missed_votes_pct)

//   if (party.missedVotesAverage !=0) {
//     party.missedVotesAverage= party.missedVotesAverage.reduce( (a, b) => a+b) / party.members.length
//   } else {
//     party.missedVotesAverage= 0
//   }
// })

// //promedio de promedios
// glanceTables[3].missedVotesAverage = (glanceTables[0].missedVotesAverage + glanceTables[1].missedVotesAverage + glanceTables[2].missedVotesAverage)/3

// //Renderizo la tabla Glance

// glanceTables.forEach((party) => {
//   let rowsTableGlance = document.createElement('tr')
//   let namesParties = document.createElement('td')
//   let totalMembersParties = document.createElement('td')
//   let missedVotesAverageParties = document.createElement('td')

//   namesParties.innerText = party.nameParty
//   totalMembersParties.innerText = party.totalMembers
//   missedVotesAverageParties.innerText = `${party.missedVotesAverage.toFixed(2)} %`

//   console.log()

//   rowsTableGlance.appendChild(namesParties)
//   rowsTableGlance.appendChild(totalMembersParties)
//   rowsTableGlance.appendChild(missedVotesAverageParties)    
//   document.getElementById('glaceAttTables').appendChild(rowsTableGlance)
// })

// //filtro luego ordeno 

// attendanceTables.leastEngaged= [...members].filter(member => member.missed_votes_pct !== 0)
// attendanceTables.mostEngaged= [...members].filter(member => member.missed_votes_pct !== 0)

// attendanceTables.leastEngaged.sort( (a, b) => {
//   return a.missed_votes_pct - b.missed_votes_pct
// })

// attendanceTables.mostEngaged.sort( (a, b) => {
//   return b.missed_votes_pct - a.missed_votes_pct
// })

// //Tomo solo el 10% pedido
// let indexofAttendancePct = parseInt(attendanceTables.mostEngaged.length * 0.1)
// attendanceTables.mostEngaged = attendanceTables.mostEngaged.slice(0, `${indexofAttendancePct}`)
// attendanceTables.leastEngaged = attendanceTables.leastEngaged.slice(0, `${indexofAttendancePct}`)

// //renderizo mostEngaged Missed Votes
// attendanceTables.mostEngaged.forEach(member => {
//   let rowsAttendanceTables = document.createElement('tr')
//   let memberNameAttendance = document.createElement('td')
//   let missedVotes = document.createElement('td')
//   let missedVotesPct = document.createElement('td')
//   let memberNameUrlAttendance = document.createElement('a')

//   memberNameUrlAttendance.setAttribute('href', member.url)
//   memberNameUrlAttendance.setAttribute('target', '_blank')

//   memberNameUrlAttendance.innerText = `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
//   missedVotes.innerText = member.missed_votes
//   missedVotesPct.innerText = `${member.missed_votes_pct.toFixed(2)} %`

//   memberNameAttendance.appendChild(memberNameUrlAttendance)
//   rowsAttendanceTables.appendChild(memberNameAttendance)
//   rowsAttendanceTables.appendChild(missedVotes)
//   rowsAttendanceTables.appendChild(missedVotesPct)
//   document.getElementById('mostAttendance').appendChild(rowsAttendanceTables)
// })

// //renderizo leastEngaged Missed Votes
// attendanceTables.leastEngaged.forEach(member => {
//   let rowsAttendanceTables = document.createElement('tr')
//   let memberNameAttendance = document.createElement('td')
//   let missedVotes = document.createElement('td')
//   let missedVotesPct = document.createElement('td')
//   let memberNameUrlAttendance = document.createElement('a')

//   memberNameUrlAttendance.setAttribute('href', member.url)
//   memberNameUrlAttendance.setAttribute('target', '_blank')

//   memberNameUrlAttendance.innerText = `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
//   missedVotes.innerText = member.missed_votes
//   missedVotesPct.innerText = `${member.missed_votes_pct.toFixed(2)} %`
  
//   memberNameAttendance.appendChild(memberNameUrlAttendance)
//   rowsAttendanceTables.appendChild(memberNameAttendance)
//   rowsAttendanceTables.appendChild(missedVotes)
//   rowsAttendanceTables.appendChild(missedVotesPct)
//   document.getElementById('leastAttendance').appendChild(rowsAttendanceTables)
// })

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
  let namesParties = document.createElement('td')
  let totalMembersParties = document.createElement('td')
  let votesWithAPartyAverageParties = document.createElement('td')

  namesParties.innerText = party.nameParty
  totalMembersParties.innerText = party.totalMembers
  votesWithAPartyAverageParties.innerText = `${party.votesWithAPartyAverage.toFixed(2)} %`

  rowsTableGlance.appendChild(namesParties)
  rowsTableGlance.appendChild(totalMembersParties)
  rowsTableGlance.appendChild(votesWithAPartyAverageParties)
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

console.log(partyLoyaltyTables)



//renderizo leastLoyal
partyLoyaltyTables.leastLoyal.forEach(member => {
  let partyLoyaltyTables = document.createElement('tr')
  let memberNamePartyLoyalty = document.createElement('td')
  let memberNameUrlPartyLoyalty = document.createElement('a')
  let NoPartyVotesPL = document.createElement('td')
  let NoPartyVotesPLPct = document.createElement('td')

  memberNameUrlPartyLoyalty.innerText = `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
  NoPartyVotesPL.innerText = ((member.votes_with_party_pct * member.total_votes) /100).toFixed(0)
  NoPartyVotesPLPct.innerText = `${member.votes_with_party_pct.toFixed(2)} %`
      
  memberNameUrlPartyLoyalty.setAttribute('href', member.url)
  memberNameUrlPartyLoyalty.setAttribute('target', '_blank')

  memberNamePartyLoyalty.appendChild(memberNameUrlPartyLoyalty)
  partyLoyaltyTables.appendChild(memberNamePartyLoyalty)
  partyLoyaltyTables.appendChild(NoPartyVotesPL)
  partyLoyaltyTables.appendChild(NoPartyVotesPLPct)
  document.getElementById('leastPartyLoyalty').appendChild(partyLoyaltyTables)
})

//renderizo mostLoyal
partyLoyaltyTables.mostLoyal.forEach(member => {
  let partyLoyaltyTables = document.createElement('tr')
  let memberNamePartyLoyalty = document.createElement('td')
  let memberNameUrlPartyLoyalty = document.createElement('a')
  let NoPartyVotesPL = document.createElement('td')
  let NoPartyVotesPLPct = document.createElement('td')

  memberNameUrlPartyLoyalty.innerText = `${member.first_name} ${member.middle_name ? member.middle_name : ""} ${member.last_name}`
  NoPartyVotesPL.innerText = ((member.votes_with_party_pct * member.total_votes) /100).toFixed(0)
  NoPartyVotesPLPct.innerText = `${member.votes_with_party_pct.toFixed(2)} %`
      
  memberNameUrlPartyLoyalty.setAttribute('href', member.url)
  memberNameUrlPartyLoyalty.setAttribute('target', '_blank')

  memberNamePartyLoyalty.appendChild(memberNameUrlPartyLoyalty)
  partyLoyaltyTables.appendChild(memberNamePartyLoyalty)
  partyLoyaltyTables.appendChild(NoPartyVotesPL)
  partyLoyaltyTables.appendChild(NoPartyVotesPLPct)
  document.getElementById('mostPartyLoyalty').appendChild(partyLoyaltyTables)
})