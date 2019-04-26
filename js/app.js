window.addEventListener('load', ()=> {

    let long;
    let lat;

    let description = document.querySelector('.temp__description');
    let degrees = document.querySelector('.temp__value');
    let timezone = document.querySelector('.location__timezone');
    let body = document.querySelector('body');

if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {

        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/367e398a0617503747970ad8a3676a2f/${lat},${long}`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                const { temperature, summary, icon } = data.currently;

                //set DOM element values with values from the API

                description.textContent = summary;
                degrees.textContent = temperature;
                timezone.textContent = data.timezone;

                body.classList.add(icon);

                setIcons(icon, document.querySelector('.icon'));


            });

    });

}

function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
};

});