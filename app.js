const axios = require('axios');

const argv = require('./config/yargs').argv;

console.log(argv.direccion);

let encodeUrl = encodeURI(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM`)
    .then(resp => {
        /* console.log(resp.data);
        console.log(resp.status); */
        //  console.log(JSON.stringify(resp.data, undefined, 2));

        let location = resp.data.results[0];
        console.log(`La dirección es: ${location.formatted_address}`);
        console.log(`La latitud es: ${location.geometry.location.lat}`);
        console.log(`La longitud es: ${location.geometry.location.lng}`);

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.geometry.location.lat}&lon=${location.geometry.location.lng}&units=metric&appid=a384d558e69339183a410df40b106f8b`)
            .then(resp => {
                console.log(`La temperatura es: ${resp.data.main.temp}`);
            })
            .catch(e => console.log("ERROR !!!", e));

    })
    .catch(e => console.log("ERROR !!!", e));



/*  */