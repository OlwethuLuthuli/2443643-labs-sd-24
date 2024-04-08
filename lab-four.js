
function fetchCountryInfo() {
    const countryInput = document.getElementById('countryInput').value.trim();
    const countryInfoDiv = document.getElementById('countryInfo');
    const neighbouringCountriesDiv = document.getElementById('neighbouringCountries');
    const errorMessageDiv = document.getElementById('errorMessage');

    // Clear previous data
    while (countryInfoDiv.firstChild) {
        countryInfoDiv.removeChild(countryInfoDiv.firstChild);
    }
    while (neighbouringCountriesDiv.firstChild) {
        neighbouringCountriesDiv.removeChild(neighbouringCountriesDiv.firstChild);
    }
    errorMessageDiv.textContent = '';

    // Fetch data from the REST Countries API
    const all = "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,borders";
    fetch(all)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found or API request failed');
            }
            return response.json();
        })
        .then(data => {
            const country = data.find(item => item.name.common.toLowerCase() === countryInput.toLowerCase());
            if (!country) {
                throw new Error('Country not found');
            }

            // Display country information
            const countryNameHeader = document.createElement('h2');
            countryNameHeader.textContent = country.name.common;
            countryInfoDiv.appendChild(countryNameHeader);

            const capitalParagraph = document.createElement('p');
            capitalParagraph.textContent = `Capital: ${country.capital}`;
            countryInfoDiv.appendChild(capitalParagraph);

            const populationParagraph = document.createElement('p');
            populationParagraph.textContent = `Population: ${country.population.toLocaleString()}`;
            countryInfoDiv.appendChild(populationParagraph);

            const regionParagraph = document.createElement('p');
            regionParagraph.textContent = `Region: ${country.region}`;
            countryInfoDiv.appendChild(regionParagraph);

            const flagImage = document.createElement('img');
            flagImage.src = country.flags.png;
            flagImage.alt = `${country.name.common} Flag`;
            flagImage.style.width = '100px';
            flagImage.style.height = 'auto';
            countryInfoDiv.appendChild(flagImage);

            // Fetch and display neighbouring countries
            if (country.borders && country.borders.length > 0) {
                country.borders.forEach(border => {
                    const borderCountry = data.find(item => item.cca3 === border);
                    if (borderCountry) {
                        const borderFlagImg = document.createElement('img');
                        borderFlagImg.src = borderCountry.flags.png;
                        borderFlagImg.alt = `${borderCountry.name.common} Flag`;
                        borderFlagImg.style.width = '30px';
                        borderFlagImg.style.height = 'auto';

                        const borderCountryNameSpan = document.createElement('span');
                        borderCountryNameSpan.textContent = borderCountry.name.common;

                        const borderCountryDiv = document.createElement('div');
                        borderCountryDiv.classList.add('neighbouring-country');
                        borderCountryDiv.appendChild(borderFlagImg);
                        borderCountryDiv.appendChild(borderCountryNameSpan);
                        neighbouringCountriesDiv.appendChild(borderCountryDiv);
                    }
                });
            }
        })
        .catch(error => {
            errorMessageDiv.textContent = error.message;
        });
}