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

const regionObj = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
};


let regionCode = null;
let regionName;


function getRegionByIP() {
    let req = new XMLHttpRequest;
    req.open("GET", "https://api.ipgeolocation.io/ipgeo?apiKey=cc749e5a00904e29a551bdb1bea6390b");
    req.send();
    req.onload = function () {
        let json = JSON.parse(req.responseText);
        regionName = json.state_prov
        regionCode = regionObj[regionName];
        console.log(regionCode, regionName)
        if (inUSA(regionName)) {
            textInput.value = regionName;
            console.log("true")
        } else {
            regionName = null
            regionCode = null;
        }
    }
}


function changeRegion(val) {
    let req = new XMLHttpRequest;
    req.open("GET", "https://covidtracking.com/api/states/info");
    req.send();
    req.onload = function () {
        let json = JSON.parse(req.responseText);
        for (let i = 0; i < json.length; i++) {
            if (val.toUpperCase() === json[i].name.toUpperCase()) {
                regionCode = json[i].state;
                regionName = json[i].name;
                textInput.value = regionName;
                return
            } else if (val.toUpperCase() === json[i].state) {
                regionCode = json[i].state;
                regionName = json[i].name;
                textInput.value = regionName;
                return
            } else {
                regionCode = null;
                regionName = null;
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
    if (regionObj[val]) {
    
            return true
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


getRegionByIP()


document.querySelector(".form").addEventListener("submit", function () {
    event.preventDefault();
    getData(regionCode);
    console.log(regionCode, regionName)
    if (regionCode === null) {
        throwError();
    } else {
        document.querySelector(".error").style.display = "none";
        results.style.display = "block";
    }

});

// make sure all formats of Washington DC are accepted 
