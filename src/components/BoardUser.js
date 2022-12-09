import React, { useState, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";


import PointService from "../services/point.service";
import EventBus from "../common/EventBus";
import '../styles/BoardUser.css';


const BoardUser = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  const initalPointState = {
    x: 1,
    y: 1,
    r: 1,
    hit: false
  };
  
  let graphs = {
    c: {
      width: 400,
      height: 400
    },
    radiusOnGraph: 185,
    ctx: null
  };

  const handleInputChange = event => {
  
    loadGraph(point.r);
    const { name, value } = event.target;
    setPoint({ ...point, [name]: value });
    
  };


  const [points, setPoints] = useState([]);

  const [point, setPoint] = useState(initalPointState);

  const [graph, setGraph] = useState(graphs);

  const getPoints = () => {
    PointService.getAll()
      .then(response => {
        setPoints(response.data)
      })
      .catch(e => {
        console.log(e)
      });
  };

  const savePoint = () => {
    var data = {
      x: point.x,
      y: point.y,
      r: point.r
    };
    PointService.savePoint(data)
      .then(response => {
        point.hit = response.data.hit;
        getPoints();
      })
  }

  const startGraph = () => {
    draw()
  }

  const draw = () => {
    loadGraph(point.r);
  }

  const drawArea = () => {
    let delta = 15;
    let r = graph.c.width / 2 - delta
    let center = graph.c.width / 2;

      graph.ctx.lineWidth = 0;

      graph.ctx.beginPath();
      graph.ctx.fillStyle = "#3399FF";
      graph.ctx.strokeStyle = "#3399FF";

      graph.ctx.moveTo(center, center);
      graph.ctx.fillRect(center, center, r, r);

      graph.ctx.moveTo(center, center);
      graph.ctx.lineTo(center, center + r / 2);
      graph.ctx.lineTo(center - r, center);
      graph.ctx.fill();

      graph.ctx.moveTo(center, center)
      graph.ctx.arc(center, center, r / 2, 3 * Math.PI / 2, 0);
      graph.ctx.fill();
      graph.ctx.closePath();
      graph.ctx.stroke();
  }

  const drawCoordinatePlane = (radius) => {
    graph.ctx.lineWidth = 2;
    graph.ctx.beginPath();
    graph.ctx.moveTo(0, graph.c.height / 2);
    graph.ctx.lineTo(graph.c.width, graph.c.height / 2);

    graph.ctx.moveTo(graph.c.width - 1, graph.c.height / 2);
    graph.ctx.lineTo(graph.c.width - 4, graph.c.height / 2 + 1.5);
    graph.ctx.lineTo(graph.c.width - 4, graph.c.height / 2 - 1.5);

    graph.ctx.strokeStyle = 'black';
    graph.ctx.closePath();
    graph.ctx.stroke();

    graph.ctx.beginPath();
    graph.ctx.moveTo(graph.c.width / 2, 0);
    graph.ctx.lineTo(graph.c.width / 2, graph.c.height);

    graph.ctx.moveTo(graph.c.width / 2, 1);
    graph.ctx.lineTo(graph.c.width / 2 + 1.5, 4);
    graph.ctx.lineTo(graph.c.width / 2 - 1.5, 4);

    graph.ctx.strokeStyle = 'black';
    graph.ctx.closePath();
    graph.ctx.stroke();

    graph.ctx.beginPath();
    graph.ctx.moveTo(15, graph.c.height / 2);
    graph.ctx.lineTo(15, graph.c.height / 2 + 2);
    graph.ctx.lineTo(15, graph.c.height / 2 - 2);

    graph.ctx.moveTo(graph.c.width / 4 + 15 / 2, graph.c.height / 2);
    graph.ctx.lineTo(graph.c.width / 4 + 15 / 2, graph.c.height / 2 + 2);
    graph.ctx.lineTo(graph.c.width / 4 + 15 / 2, graph.c.height / 2 - 2);

    graph.ctx.moveTo(graph.c.width / 4 + graph.c.width / 2 - 15 / 2, graph.c.height / 2);
    graph.ctx.lineTo(graph.c.width / 4 + graph.c.width / 2 - 15 / 2, graph.c.height / 2 + 2);
    graph.ctx.lineTo(graph.c.width / 4 + graph.c.width / 2 - 15 / 2, graph.c.height / 2 - 2);

    graph.ctx.moveTo(graph.c.width - 15, graph.c.height / 2);
    graph.ctx.lineTo(graph.c.width - 15, graph.c.height / 2 + 2);
    graph.ctx.lineTo(graph.c.width - 15, graph.c.height / 2 - 2);

    graph.ctx.strokeStyle = 'black';
    graph.ctx.closePath();
    graph.ctx.stroke();

    graph.ctx.beginPath();
    graph.ctx.moveTo(graph.c.width / 2, graph.c.height - 15);
    graph.ctx.lineTo(graph.c.width / 2 + 2, graph.c.height - 15);
    graph.ctx.lineTo(graph.c.width / 2 - 2, graph.c.height - 15);

    graph.ctx.moveTo(graph.c.width / 2, graph.c.height * 3 / 4 - 15 / 2);
    graph.ctx.lineTo(graph.c.width / 2 + 2, graph.c.height * 3 / 4 - 15 / 2);
    graph.ctx.lineTo(graph.c.width / 2 - 2, graph.c.height * 3 / 4 - 15 / 2);

    graph.ctx.moveTo(graph.c.width / 2, graph.c.height * 1 / 4 + 15 / 2);
    graph.ctx.lineTo(graph.c.width / 2 + 2, graph.c.height * 1 / 4 + 15 / 2);
    graph.ctx.lineTo(graph.c.width / 2 - 2, graph.c.height * 1 / 4 + 15 / 2);

    graph.ctx.moveTo(graph.c.width / 2, 15);
    graph.ctx.lineTo(graph.c.width / 2 + 2, 15);
    graph.ctx.lineTo(graph.c.width / 2 - 2, 15);

    graph.ctx.strokeStyle = 'black';
    graph.ctx.closePath();
    graph.ctx.stroke();

    graph.ctx.strokeStyle = "black";
    graph.ctx.fillStyle = "black";
    graph.ctx.font = "12pt monospace";
    graph.ctx.lineWidth = 1;
    graph.ctx.strokeText(radius, graph.c.width - 19, graph.c.height / 2 + 17);
    graph.ctx.strokeText(radius, graph.c.width / 2 + 7, 22);
    graph.ctx.strokeText((-1) * radius, 2, graph.c.height / 2 + 17);
    graph.ctx.strokeText((-1) * radius, graph.c.width / 2 + 4, graph.c.height - 10);

    graph.ctx.strokeText((-1) * (radius / 2), graph.c.width / 2 + 2, graph.c.height * 3 / 4 - 8 / 2);
    graph.ctx.strokeText((radius / 2), graph.c.width / 2 + 6, graph.c.height * 1 / 4 + 25 / 2);

    graph.ctx.strokeText((-1) * (radius / 2), graph.c.width / 4 - 13, graph.c.height / 2 + 17);
    graph.ctx.strokeText((radius / 2), graph.c.width / 4 + graph.c.width / 2 - 21, graph.c.height / 2 + 17);

    graph.ctx.fill();
    graph.ctx.stroke();
  }

  const clickOnGraph = (event) => {
    let rect = graph.c.getBoundingClientRect();
    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;
    var r = point.r;

    loadGraph(point.r);
    let data = {
      x: Math.round(((x - graph.c.width / 2) * r / graph.radiusOnGraph) * 100000) / 100000,
      y: Math.round(((-1) * (y - graph.c.height / 2) * r / graph.radiusOnGraph) * 100000) / 100000,
      r: r
    }
    point.x = data.x;
    point.y = data.y;
    PointService.savePoint(data)
      .then(response => {
        point.hit = response.data.hit
        let dataSecond = {
          x: point.x,
          y: point.y,
          r: point.r,
          hit: point.hit
        };
        drawItemFromTable(dataSecond);
        getPoints();
      })


  };

  const loadGraph = (radius) => {
    clearCanvas();
    drawArea();
    drawCoordinatePlane(radius);
    for (var point in points) {
      if (points[point].r == radius) {
        drawItemFromTable(points[point]);
      }
    }
  };

  const drawItemFromTable = (data) => {
    let x = parseFloat(data.x);
    let y = parseFloat(data.y);
    let r = parseFloat(data.r);
    let hit = data.hit;
    let color = "black";
    if (hit) {
      color = "red";
    }
    let xCoord = x * graph.radiusOnGraph / r + graph.c.width / 2
    let yCoord = graph.c.height / 2 - y * graph.radiusOnGraph / r

    if (xCoord < 2) {
      xCoord = 2;
      color = "white"
    }
    if (xCoord > graph.c.width - 2) {
      xCoord = graph.c.width - 2
      color = "white"
    }
    if (yCoord < 2) {
      yCoord = 2;
      color = "white"
    }
    if (yCoord > graph.c.height - 2) {
      yCoord = graph.c.height - 2
      color = "white"
    }

    drawItem(xCoord, yCoord, color);
  }

  const drawItem = (xCoord, yCoord, color) => {
    graph.ctx.beginPath();
    graph.ctx.arc(xCoord, yCoord, 3, 0, 2 * Math.PI);
    graph.ctx.fillStyle = color;
    graph.ctx.fill();
    graph.ctx.closePath();
    graph.ctx.stroke();
  }

  const clearCanvas = () => {
    graph.ctx.clearRect(0,0, graph.c.width, graph.c.height);
  }

  useEffect(() => {
    PointService.getAll().then(
      (response) => {
        setPoints(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    graph.c = document.getElementById("graph");

    if (graph.c) {
      graph.c.width = 400;
      graph.c.height = 400;
      graph.ctx = graph.c.getContext("2d");
      startGraph();
    }
  }, []);


  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="alert alert-info admin" role="alert" style={{ textAlign: "center" }}>
        User panel
      </div>

      <div className="list row">
        <div className="col-md-6">
          <div>
            <label htmlFor="xSlider">X = {point.x}</label><br></br>
            <input value={point.x} onChange={handleInputChange} type="range" id="xSlider" required min="-3" max="3" step="0.5" name="x" />
          </div>
          <br></br>
          <div>
            <label htmlFor="ySlider">Y = {point.y}</label><br></br>
            <input value={point.y} onChange={handleInputChange} type="range" id="ySlider" required min="-3" max="3" step="0.5" name="y" />
          </div>
          <br></br>
          <div>
            <label htmlFor="rSlider">R = {point.r}</label><br></br>
            <input value={point.r} onInput={handleInputChange} onMouseUp={handleInputChange} type="range" id="rSlider" required min="0.5" max="3" step="0.5" name="r" />
          </div>
          <button onClick={savePoint} className="btn btn-primary" style={{ marginTop: "10px" }}>Submit</button>
        </div>
        <div className="col-md-6">

          <div style={{textAlign:"center", width:"40%", display: "flex"}}>
            <canvas onMouseDown={clickOnGraph} id="graph" style={{"height" : "400px", "width" : "400px", background: "transparent"}}></canvas>
          </div>

        </div>
      </div>

      <div className="table-responsive">

      <table className="table-hover table-bordered">
       <thead>
        <tr style={{textAlign:"center"}}>
              <th>X</th>
              <th>Y</th>
              <th>R</th>
              <th>Hit</th>
        </tr>
       </thead>
        <tbody>
          {points.slice(0).reverse().map((point, key) => {
            return (
              <tr key={key} className="res-table-column">
                <td>{point.x}</td>
                <td>{point.y}</td>
                <td>{point.r}</td>
                <td>{point.hit.toString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default BoardUser;
