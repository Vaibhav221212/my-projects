const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const bt_one = document.querySelector("#sb-1");
const bt_two = document.querySelector("#sb-2");
let account = document.querySelector(".account");
let log_account = document.querySelector(".log-account");
const error = document.querySelector(".error")
const submit = document.querySelector("#submit");
const cancel = document.querySelector("#cancel");
const er = document.querySelector("#er");
const login_sc = document.querySelector("#login-sc");
const error_handle = document.querySelector(".handle");
const para_container = document.querySelector(".parameter-container");
const handle_two = document.getElementById("two");
let userName = "";
let mail = "";
let pass = "";


remove_feilds();

//initially vairables need????



let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        //hW
    }
}



function remove() {
    bt_one.classList.remove("scale");
    bt_two.classList.remove("scale");
    submit.classList.remove("scale");
    cancel.classList.remove("scale");
}


function sub_two() {

    bt_two.classList.add("scale");
    setTimeout(remove, 150);
    setTimeout(function () {
        account.style.display = "none";
        log_account.style.display = "block";
    }, 200);

}

let name = "";  // global variable for login or crearte account


function sub() {
    name = "create";
    bt_one.classList.add("scale");
    setTimeout(remove, 150);
    userName = document.querySelector(".username").value;
    mail = document.querySelector(".mail").value;
    pass = document.querySelector(".pass").value;

    if (userName == "") {
        error_handle.innerHTML = "username";
        error.style.display = "block";
        return;
    }
    else if (mail == "") {
        error_handle.innerHTML = "email";
        error.style.display = "block";
        return;
    }

    else if (pass == "") {
        error_handle.innerHTML = "password";
        error.style.display = "block";
        return;
    }


    else {
        let valid = check_valid_userName();
        let valid_email = check_valid_email();
        let check_pass = check_password();

        if (valid && valid_email  && check_pass) {
            error.innerHTML = "please enter";
            error.style.display = "none";
            var userdata =
            {
                'username': userName,
                'email': mail,
                'password': pass,
                'name': name
            }
            json_data = JSON.stringify(userdata);

            fetch('insert_data.php',
                {
                    method: 'POST',
                    body: json_data,
                    headers: {
                        'Content-type': 'application/json',
                    }
                })

            let sc = document.querySelector(".success");
            sc.style.display = "block";

            setTimeout(function () {
                account.style.display = "none";
                setTimeout(active_feilds(), 1000);

            }, 800);
        }
        else {

            if (valid == false) {
                error.innerHTML = "UserName should be include character";
                error.style.display = "block";
                return;
            }
            if (valid_email == false) {
                error.innerHTML = "please enter valid email";
                error.style.display = "block";
                return;
            }
             
            if(check_pass==false)
            {
                error.innerHTML = "Password should be greater";
                error.style.display = "block";
                return; 
            }
        }
    }

}

function check_valid_userName() {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let char = 0;
    for (let i = 0; i < str.length; i++) {
        if (userName.includes(str.charAt(i))) {
            char++;
        }
    }
    if (char <= 0) {
        return false;

    }
    else {
        return true;
    }
}

function check_valid_email() {
    let char = "@gmail.com";
    if (mail.includes(char)) {
        return true;
    }
    else {
        return false;
    }
}

function check_password() {
    if (pass.length>6)
    {
        return true;
    }
    else{
        return false;
    }
}

function Return() {
    cancel.classList.add("scale");
    setTimeout(remove, 150);
    setTimeout(function () {
        log_account.style.display = "none";
        account.style.display = "block";
    }, 200);

}

function login() {
    name = "login";
    submit.classList.add("scale");
    setTimeout(remove, 200);
    const userName = document.querySelector("#user-2").value;
    const pass = document.querySelector("#ps-2").value;

    if (userName === "") {
        handle_two.innerHTML = "username";
        er.style.display = "block";
        return;
    }
    else if (pass == "") {
        handle_two.innerHTML = "password";
        er.style.display = "block";
        return;
    }
    else {

        var userdata =
        {
            'username': userName,
            'email': "no",
            'password': pass,
            'name': name
        }
        json_data = JSON.stringify(userdata);

        fetch('insert_data.php',
            {
                method: 'POST',
                body: json_data,
                headers: {
                    'Content-type': 'application/json',
                }
            })


        er.style.display = "none";

    }
}


function remove_feilds() {
    userContainer.style.display = "none";
    userTab.style.display = "none";
    searchTab.style.display = "none";
}
function active_feilds() {
    userContainer.style.display = "block";
    userTab.style.display = "block";
    searchTab.style.display = "block";
}


