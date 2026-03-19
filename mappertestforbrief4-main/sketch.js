let myMap;
let canvas;

let birdData = {};
let currentYear = "2024";

let years = ["2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];
let buttons = [];

const mappa = new Mappa('Leaflet');

const options = {
  lat: 51.54,
  lng: -0.14,
  zoom: 11,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
};




async function setup(){

  birdData["2014"] = await loadTable('/assets/robin_2014.csv', ',', 'header');
  birdData["2015"] = await loadTable('/assets/robin_2015.csv', ',', 'header');
  birdData["2016"] = await loadTable('/assets/robin_2016.csv', ',', 'header');
  birdData["2017"] = await loadTable('/assets/robin_2017.csv', ',', 'header');
  birdData["2018"] = await loadTable('/assets/robin_2018.csv', ',', 'header');
  birdData["2019"] = await loadTable('/assets/robin_2019.csv', ',', 'header');
  birdData["2020"] = await loadTable('/assets/robin_2020.csv', ',', 'header');
  birdData["2021"] = await loadTable('/assets/robin_2021.csv', ',', 'header');
  birdData["2022"] = await loadTable('/assets/robin_2022.csv', ',', 'header');
  birdData["2023"] = await loadTable('/assets/robin_2023.csv', ',', 'header');
  birdData["2024"] = await loadTable('/assets/robin_2024.csv', ',', 'header');
  
  canvas = createCanvas(windowWidth, windowHeight);

  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);

  fill(200, 100, 100);
  noStroke();

  

  for (let i = 0; i < years.length; i++) {
    let year = years[i];

    let btn = createButton(year);
    btn.position(10, 100 + i * 50);
    btn.style('z-index', '2000');
    btn.style('position', 'fixed');
    btn.style("background", "white");
    btn.style('border-radius', '50px');
    btn.size(40,40)

    btn.mousePressed(() => {
      currentYear = year;
      drawBirds(year);
    });

    buttons.push(btn);
  }

  myMap.onChange(() => {
    drawBirds(currentYear);
  });


  drawBirds(currentYear);
}

function draw(){}


function drawBirds(year){
  clear();

  let data = birdData[year];

  for (let i = 0; i < data.getRowCount(); i++) {

    const lat = Number(data.getString(i, 'lat'));
    const lng = Number(data.getString(i, 'lng'));
    const amount = Number(data.getString(i, 'howMany'));

    const pos = myMap.latLngToPixel(lat, lng);

    ellipse(pos.x, pos.y, amount * 5, amount * 5);
    
  }
}