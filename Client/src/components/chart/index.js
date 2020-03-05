import React from 'react';
import Chart from "chart.js";
import mySensor from "../../services/Sensor.js"

class LineChart extends React.Component {
  state={
    dataToPlot:[]
  }
  chartRef = React.createRef();

  componentDidUpdate(prevProps){
    if (prevProps.data.length!==0&&this.props.data.length===prevProps.data.length) {
      const myChartRef = this.chartRef.current.getContext("2d");
      this.canvasRef = React.createRef();
      const labels=this.props.data[0].map(d => new Date(d.created_at).toLocaleString().split(',')[1]);   
      var myChart= new Chart(myChartRef, {
        type: "line",
        data: {
          labels: labels,
          datasets: [ ],
            },
        options: { 
          animation: false
        }
      });
      this.props.data.forEach((value,index)=>{
        myChart.data.datasets.push({
          label: `Sensor ${index+1}`,
          data: value.map(d=>parseFloat(Object.values(d)[2])),
          borderColor:`hsl(${index*100}, 100%, 50%)`,
          borderWidth: 1,
          fill: 'none'
        });
        myChart.update();  
  
       })
    }
  }


render() {
 return(
<canvas id="myChart" ref={this.chartRef}/>
 )
}
}



// myChart-------------------------------------------------------------------------------
export default class MyChart extends React.Component {
  state={
    data: []
  }
    //Here we get the data from DB of sensor's API
    getData = (dS,p) => {
      dS.forEach(async(val) => {
          let {data: { feeds }} = await mySensor.myDataSensor(val.sensorID,val.sensorAPI,p)
          this.setState({ data: [...this.state.data, feeds] })
        })
  }

refreshData=()=>{
this.setState({data:[]})
this.getData(this.props.dataSensors,this.props.parameter)
}

   componentDidMount() {
   this.getData(this.props.dataSensors,this.props.parameter)
  }

  render() {
    return (
        <div className="main chart-wrapper" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         {this.state.data&& <LineChart
            data={this.state.data}
          />}
        </div>
      
    );
  }
}