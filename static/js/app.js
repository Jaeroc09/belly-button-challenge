// Declare global variable for Belly Button data endpoint
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function buildMetadata(sample){
    d3.json(url).then(response => {
        let md = response.metadata;
        let resultArray = md.filter(mdDict => mdDict.id == sample);
        let result = resultArray[0];
        
        let metadataInfo = d3.select('#sample-metadata');
        // Clear out metadata
        metadataInfo.html('');
        // Build demographic info
        for (key in result){
            metadataInfo.append('h6').text(`${key}: ${result[key]}`);
        };

        buildGauge(result.wfreq);

    });

};

function buildCharts(sample){
    d3.json(url).then(response => {
        let samples = response.samples;
        let resultArray = samples.filter(sampleDict => sampleDict.id == sample);
        let result = resultArray[0];

        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;
        
        // Bubble chart info
        let bubbleLayout = {
            title: `Bacteria Cultures Per Sample, Subject ID ${sample}`,
            margin: {t:0},
            hovermode: 'closest',
            xaxis: {title:'OTU ID'},
            margin: {t:30}
        };
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: 'markers',
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: 'Earth'
                }
            }
        ];
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Horizontal bar chart info
        // sample_values data already sorted in descending order; get first 10 points
        let bar_yticks = otuIDs.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        let bar_xticks = sampleValues.slice(0,10).reverse();
        let bar_text = otuLabels.slice(0,10).reverse();
        let barLayout = {
            title: `Top 10 Bacteria Cultures, Subject ID ${sample}`,
            margin: {t:30, l:150}
        };
                let barData = [
            {
                y: bar_yticks,
                x: bar_xticks,
                text: bar_text,
                type: 'bar',
                orientation: 'h'
            }
        ];
        Plotly.newPlot('bar', barData, barLayout);

    });

};

// Initializes page with dropdown menu and default plots
function init(){
    let selector = d3.select('#selDataset');

    // Fetch JSON data
    d3.json(url).then(response => {
        // console.log('Names: ',response.names);
        // Make dropdown menu based on 'names'
        let sampleNames = response.names;

        // Create selector options, values, and text for dropdown menu from sampleNames array
        for (let i = 0; i < sampleNames.length; i++){
            selector.append('option').text(sampleNames[i]).property('value',sampleNames[i]);
        };

        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);

    });

};

function optionChanged(value){
    buildCharts(value);
    buildMetadata(value);
};

init();