
$(document).ready( () => {
    console.log($('#textone').text())
    $('.btn').click(() =>{
       const location =$('.text').val()
    
        const url='http://localhost:3000/weather?address='+location

        $('#textone').text("loading..")
        $('#texttwo').text('')
fetch(url).then((response) => {
    
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            $('#textone').text(data.error)
            $('#texttwo').text('')

            
        }
        else {
            console.log(data)
            $('#textone').text(data.location)
            $('#texttwo').text(data.description + ". It is currently " +data.temperature + "° C out and   feels like " + data.feels_like +"° C")
        }
    })
})
      
    })





});