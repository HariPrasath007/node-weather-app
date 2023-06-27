console.log('new js file loaded successfully')

fetch('https://puzzle.mead.io/puzzle').then(data => {
    console.log(data)
})




const forms = document.querySelector('form');

const para1 = document.getElementById('message1');

console.log(para1);


forms.addEventListener('submit', async(e) => {
    e.preventDefault();
    document.getElementById('message1').innerText = 'Loading.... !';
    document.getElementById('message2').innerText = '';

    const form_value = document.getElementById('address_value').value;

            await fetch('/weather?address='+form_value).then(res => {
                res.json().then(data => {
                    if(data.error){
                        console.log('errval', data.error)
                        document.getElementById('message1').innerText = data.error;
                        document.getElementById('message2').innerText = '';

                    }else{
                        const pacevalue =  data.place;
                        console.log(data.place);
                        console.log(data.forecast);

                        document.getElementById('message1').innerText = data.place;
                        document.getElementById('message2').innerText = data.forecast;
                    }
                });
            }).catch(err => console.log('error', err))
    
})

     

// }