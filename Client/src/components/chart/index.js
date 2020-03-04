import React from 'react';
import Chart from "chart.js";
import mySensor from "../../services/Sensor.js"



class LineChart extends React.Component {

  chartRef = React.createRef();

  componentDidUpdate(prevProps){
    if (prevProps.data.length >= 3) {
//      console.log(this.props.data)

      const myChartRef = this.chartRef.current.getContext("2d");

      this.canvasRef = React.createRef();
      const labels=this.props.data[0].map(d => d.created_at);
      const data=this.props.data[0].map(d => parseFloat(d.field1));
      console.log(labels)
      console.log(data)
      
      new Chart(myChartRef, {
        type: "line",
        data: {
            //Bring in data
            labels: labels,
            datasets: [
                {
                    label: "Sensor 1",
                    data: data,
                }
            ]
        },
        options: {
            //Customize chart options
        }
      });
      
    }
  }


  render() {
 return(
   <>
{this.props.data.length>=3?<canvas id="myChart" ref={this.chartRef}/>:null}

</>
 )
}
}



// myChart-------------------------------------------------------------------------------
export default class MyChart extends React.Component {
  state={
    data: []
  }

    getData = (dS,p) => {
      dS.forEach(async(val) => {
          let {data: { feeds }} = await mySensor.myDataSensor(val.sensorID,val.sensorAPI,p)
          this.setState({ data: [...this.state.data, feeds] })
        })
  }

  componentDidMount() {
   this.getData(this.props.dataSensors,this.props.parameter)
  }

  render() {
    return (
        <div className="main chart-wrapper" style={{height:'60%'}}>
         {this.state.data&& <LineChart
            data={this.state.data}
            title={"sensor 1"}
            color="#3f51b5"
          />}
        </div>
      
    );
  }
}





