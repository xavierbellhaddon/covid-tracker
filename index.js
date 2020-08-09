const results = document.querySelector(".results");
const textInput = document.querySelector(".region");
const regionArr = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA',
    'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
    'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV',
    'WY'
];


let regionCode;


//function getRegionByIP() {
//    let req = new XMLHttpRequest;
//    req.open("GET", "http://ip-api.com/json/");
//    req.send();
//    req.onload = function () {
//        let json = JSON.parse(req.responseText);
//        regionCode = json.region;
//        if (inUSA(regionCode)) {
//            textInput.value = json.regionName;
//        } else {
//            regionCode = null;
//        }
//    }
//}


function changeRegion(val) {
    let req = new XMLHttpRequest;
    req.open("GET", "https://covidtracking.com/api/states/info");
    req.send();
    req.onload = function () {
        let json = JSON.parse(req.responseText);
        for (let i = 0; i < json.length; i++) {
            if (val.toUpperCase() === json[i].name.toUpperCase()) {
                regionCode = json[i].state;
                return
            } else if (val.toUpperCase() === json[i].state) {
                regionCode = json[i].state;
                textInput.value = json[i].name;
                return
            }
            else {
                regionCode = null;
            }
        }
        
    }
}


textInput.onchange = function () {
    changeRegion(textInput.value)
}


//function getDateChecked(val) {
//    console.log(val.date)
//}


function getData(val) {
    let req = new XMLHttpRequest;
    req.open("GET", "https://covidtracking.com/api/states/");
    req.send();
    req.onload = function () {
        let json = JSON.parse(req.responseText);
        for (let i = 0; i < json.length; i++) {
            if (json[i].state === val) {
                document.querySelector(".positive").innerHTML = formatNumber(json[i].positive) + " positive";
                document.querySelector(".negative").innerHTML = formatNumber(json[i].negative) + " negative";
                document.querySelector(".dead").innerHTML = formatNumber(json[i].death) + " dead";
            }
        }
    }
}

function inUSA(val) {
    for (let i = 0; i <= regionArr.length; i++) {
        if (val === regionArr[i]) {
            return true
        }
    }
}

function formatNumber(val) {
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function throwError() {
    textInput.value = "";
    document.querySelector(".error").innerText = "Please enter a valid U.S. state.";
    document.querySelector(".error").style.display = "block"
    results.style.display = "none";
}


//getRegionByIP()


document.querySelector(".form").addEventListener("submit", function () {
    event.preventDefault();
    getData(regionCode);
    if (regionCode === null) {
        throwError();
    } else {
        document.querySelector(".error").style.display = "none";
        results.style.display = "block";
    }
    
});

// make sure all formats of Washington DC are accepted 
