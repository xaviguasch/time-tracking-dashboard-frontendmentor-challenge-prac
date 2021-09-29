const btns = document.querySelectorAll('.btn--option')
const cardStatEls = document.querySelectorAll('.card--stat')

const timeframeEls = document.querySelectorAll('.timeframe')
const currHrsEls = document.querySelectorAll('.hrs')
const prevHrsEls = document.querySelectorAll('.prev-hrs')

const populateCard = (title, hours, type) => {
  // Solving class naming issue without modifying the json file
  if (title === 'Self Care') {
    title = 'selfcare'
  }
  const lowerTitle = title.toLowerCase()

  if (type === 'daily') type = 'Day'
  if (type === 'weekly') type = 'Week'
  if (type === 'monthly') type = 'Month'

  // Populate UI
  timeframeEls.forEach((tf) => {
    tf.textContent = type
  })

  currHrsEls.forEach((hrsEl) => {
    const shortId = hrsEl.id.slice(0, -4)

    if (lowerTitle === shortId) {
      hrsEl.textContent = hours.current
    }
  })

  prevHrsEls.forEach((prevHrsEl) => {
    const shortId = prevHrsEl.id.slice(0, -9)

    if (lowerTitle === shortId) {
      prevHrsEl.textContent = hours.previous
    }
  })
}

const fetchData = (type) => {
  console.log(type)

  let mode = ''

  if (type === 'daily-btn') mode = 'daily'
  if (type === 'weekly-btn') mode = 'weekly'
  if (type === 'monthly-btn') mode = 'monthly'

  fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dataEl) => {
        populateCard(dataEl.title, dataEl.timeframes[mode], mode)
      })
    })
    .catch((error) => console.log(error))
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    fetchData(e.target.id)
  })
)
