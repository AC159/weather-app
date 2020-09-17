const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`)

        .then( (response) => {
            return response.json()
        })

        .then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = 'It is currently ' + data.forecastData.temperature + ' degrees.' +
                    ' \nIt feels like ' + data.forecastData.feels_like + ' degrees. \n Humidity: ' + data.forecastData.humidity + '%.'
            }
        })
})