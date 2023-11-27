# belly-button-challenge
Building an interactive dashboard to explore a catalog of microbes that colonize human navels

by Jason Estrada

This project focuses on the use of D3.js and Plotly libraries to create an interactive dashboard with custom charts.  The dataset provided is from [Belly Button Biodiversity](https://robdunnlab.com/projects/belly-button-biodiversity/) and converted to a JSON file `samples.json` to visualize the data.

The dashboard implements a dropdown menu to select the data for each Subject ID:
- Panel to display the demographic info (metadata).
- Horizontal bar chart to display the top ten microbial species (OTUs) based on sample count.
- Bubble chart to display the sample count of each OTU. Marker size is based on OTU sample count (the greater the count, the bigger the marker).
- Radial gauge to display the washing frequency per week (0 to 9 times).

The [dashboard](https://jaeroc09.github.io/belly-button-challenge/) was also deployed through Github Pages.

h/t to our instructor [Drew Hoang](https://github.com/codentell), which my code is heavily sourced from to understand the power of Javascript!