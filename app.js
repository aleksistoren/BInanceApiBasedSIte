function getPrice() {
    const pair = document.getElementById("pair").value.toUpperCase();
    const url = `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1d&limit=30`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const prices = data.map((d) => parseFloat(d[4]));
        const labels = data.map((d) => new Date(d[0]).toLocaleDateString());
        const price = prices[prices.length - 1].toFixed(2);
        document.getElementById("price").innerHTML = `Current price for ${pair}: ${price}`;
        const ctx = document.getElementById("chart").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Price",
                data: prices,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                  },
                },
              ],
            },
          },
        });
      })
      .catch((error) => {
        document.getElementById("price").innerHTML = `Error: ${error.message}`;
      });
  }
  