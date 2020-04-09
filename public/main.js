const form = document.getElementById('vote-form');
var osSelection = {os: "No Selection"};

// form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};
    osSelection.os = data.os;

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        header: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log('EVENT LISTENER: ',data))
    .catch(err=> console.log(err));

    e.preventDefault();
});


// canvas.js for charting
let dataPoints = [
    {label: 'Windows', y: 0},
    {label: 'MacOS', y: 0},
    {label: 'Linux', y: 0},
    {label: 'Ubunto', y: 0},
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){

    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Big OS Results'
        },
        data: [
            {
            type: 'column',
            dataPoints: dataPoints
            }
        ]
    });
    chart.render();

// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

var pusher = new Pusher('d8f1ab915ef59863b905', {
  cluster: 'us2',
  forceTLS: true
});


var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', function(data) {
    //console.log('THE POINTS DATA: ', data);
  dataPoints = dataPoints.map(x=>{
      //console.log(x.label,wildStuff.os);

      if(x.label == osSelection.os){
          x.y += data.points;
          return x;
      } else {

          return x;
      }
  });
 
  chart.render();
});
}