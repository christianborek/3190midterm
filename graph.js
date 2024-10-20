const ctx = document.getElementById('cityChart').getContext('2d');
let cityChart;

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        updateGraph(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function fetchData2() {
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

function updateGraph(data) {
    const selectedOption = document.getElementById('dataSelect').value;

    const sortedData = data.sort((a, b) => a[selectedOption] - b[selectedOption]);
    const labels = data.map(city => city.city);
    const values = data.map(city => city[selectedOption]);

    if (cityChart) {
        cityChart.destroy();
    }

    cityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1),
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
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
            <img src="${city.mapImage}" class="card-img-top" alt="${city.city}" width="100" />
            <div class="card-body">
                <h5 class="card-title">${city.city}, ${city.admin_name}</h5>
                <p class="card-text">
                    <strong>Country:</strong> ${city.country} <br>
                    <strong>Population:</strong> ${city.population.toLocaleString()} <br>
                    <strong>Latitude:</strong> ${city.lat.toLocaleString()}° <br>
                    <strong>Longitude:</strong> ${city.lng.toLocaleString()}° <br>
                </p>
            </div>
        </div>
        `;

        mainContainer.appendChild(div);
    }
}

fetchData();
fetchData2();
