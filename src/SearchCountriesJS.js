import axios from "axios";


//Schrijf een async functie die de data ophaalt en dynamische content plaatst.
async function fetchCountryDetails(name) {
    // Zorg ervoor dat er iedere keer als er een nieuwe zoekopdracht gedaan wordt, het (mogelijke) oude resultaat
    // en (mogelijke) oude error-message worden verwijderd
    countryInfoBox.innerHTML = ``;
    errorMessageBox.innerHTML = ``;

    //try/cath blok:
    try {
        // Haal data op in de countries API
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(country);

        // Plaats data in innerHTML,met aansluitende values.
        countryInfoBox.innerHTML = `
            <article class="search-result-box">
                <span class="flag-title-container">
                    <img src="${country.flag}" alt="vlag" class="flag">
                    <h2>${country.name}</h2>
                </span>
                <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people</p>
                <p>The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}</p>
                <p>They speak ${country.demonym}</p>
            </article>        
        `;

        // catch blok: console log de error.
    } catch (e) {
        console.error(e);

        // error-message geven als het land niet bestaat.
        errorMessageBox.innerHTML = `
            <p class="error-message">${name} bestaat niet. Probeer het nog een keer.</p>
        `;
    }
}


// sla de referentie naar het formulier op en plaats er een submit-event listener op
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchCountry);

// sla de referentie op naar het error-element en het zoek-resultaat-element
const countryInfoBox = document.getElementById('search-result');
const errorMessageBox = document.getElementById('error-message');

// zorg ervoor dat de pagina niet refresht.
function searchCountry(e) {

    e.preventDefault();
    // Referentie maken naar het invoerveld(DOM)
    const queryfield = document.getElementById('query-field');
    // roep de fetchCountryDetails functie aan en geef de zoekterm mee
    fetchCountryDetails(queryfield.value);
    // maak het invoerveld weer leeg.
    queryfield.value = '';
}

// Deze functie kan iedere keer opnieuw aangeroepen worden om een valuta-string te generen
function createCurrencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }
    return output + `${currencies[0].name}'s`;
}
