const date2 = new Date(Date.now())

const adjustedDate = date2.toLocaleString('en-US', { timeZone: 'Asia/Manila' })

const newDate = new Date(adjustedDate)
console.log(newDate.toString())
