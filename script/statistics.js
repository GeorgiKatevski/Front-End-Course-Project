// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8RdguFfTPgERlQQxTt5ZcoDcrdd3_1sU",
    authDomain: "realproperty-94648.firebaseapp.com",
    databaseURL: "https://realproperty-94648.firebaseio.com",
    projectId: "realproperty-94648",
    storageBucket: "realproperty-94648.appspot.com",
    messagingSenderId: "439144328697",
    appId: "1:439144328697:web:7888406bd4f53d32bd2128",
    measurementId: "G-F5GBF9JG1J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference to the houses data in the database
var houseRef = firebase.database().ref('houses');

// Fetch and process data
houseRef.once('value', function(snapshot) {
    var data = snapshot.val();
    var locationData = {};

    // Process data: Group by location and calculate average prices
    for (var key in data) {
        var house = data[key];
        var location = house.location;
        var price = parseFloat(house.price);

        if (!locationData[location]) {
            locationData[location] = { total: 0, count: 0 };
        }

        locationData[location].total += price;
        locationData[location].count += 1;
    }

    // Prepare data for the chart
    var locations = [];
    var averagePrices = [];

    for (var loc in locationData) {
        locations.push(loc);
        averagePrices.push(locationData[loc].total / locationData[loc].count);
    }

    // Create the chart
    var ctx = document.getElementById('locationChart').getContext('2d');
    var locationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locations,
            datasets: [{
                label: 'Average Price',
                data: averagePrices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Price'
                    },
                    ticks: {
                    color: '#FFFFFF', // Color for X-axis labels (text)
                    font: {
                        size: 16 // Font size for X-axis labels
                    }
                    },
                    grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Gridline color for Y-axis
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Location',
                    },
                    ticks: {
                    color: '#FFFFFF', // Color for X-axis labels (text)
                    font: {
                        size: 16 // Font size for X-axis labels
                    }
                    },
                    grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Gridline color for Y-axis
                    }

                }
            }
        }
    });
});
