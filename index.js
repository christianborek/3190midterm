function fetchData() {
    fetch('./data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            appendData(data);
        })
        .catch(function (err) {
            console.log('error:' + err);
        });
}

function appendData(data) {
    let mainContainer = document.getElementById("card-container");
    mainContainer.innerHTML = "";

    for (let city of data) {
        let div = document.createElement("div");
        div.classList.add("col-sm-6", "col-md-4", "col-lg-3");

        const query = `${city.city}, ${city.admin_name}`;
        const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        div.innerHTML = `
        <a href="${searchURL}" target="_blank" style="text-decoration: none; color: inherit;">
        <div class="card mb-4" style="width: 100%;">
            <img src="${city.image}" class="card-img-top" alt="${city.city}" width="100" />
            <div class="card-body">
                <h5 class="card-title">${city.city}, ${city.admin_name}</h5>
                <p class="card-text">
                    <strong>Country:</strong> ${city.country} <br>
                    <strong>Population:</strong> ${city.population.toLocaleString()} <br>
                    <strong>About:</strong> ${city.about}
                </p>
            </div>
        </div>
        `;

        mainContainer.appendChild(div);
    }
}

function searchCities() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    fetch('./data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const filteredData = data.filter(city => 
                city.about.toLowerCase().includes(searchInput)
            );

            appendData(filteredData);
        })
        .catch(function (err) {
            console.log('error:' + err);
        });
}

fetchData();
