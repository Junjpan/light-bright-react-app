class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentcolor: '',
      color: '',
      colorArray: ["#32a852", "#32a883", "#a84e32", "#a87b32", "#7fa832", "#32a893", "#3285a8", "#3246a8", "#6432a8", "#a83242", "#a8329e", "#a8326d", "#a83242"] };

  }

  componentDidMount() {
    this.setState({ color: this.props.color,
      recentcolor: this.props.recentcolor });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.recentcolor != this.props.recentcolor) {
      this.setState({ recentcolor: this.props.recentcolor });
    }
    if (prevProps.resetall !== this.props.resetall && this.props.resetall == true) {
      this.props.setColor("black", this.props.index);
    }

  }

  style() {
    var num = parseInt(Math.random() * this.state.colorArray.length);
    //this.setState({color:this.state.colorArray[num]})
    this.props.setColor(this.state.colorArray[num], this.props.index);
  }

  cancelColor() {
    this.props.setColor("black", this.props.index);
  }

  move() {
    console.log('move');
    this.props.setColor(this.state.recentcolor, this.props.index);
  }

  render() {
    return React.createElement("div", { onMouseMove: this.move.bind(this), onClick: this.style.bind(this), onDoubleClick: this.cancelColor.bind(this), className: "circle", style: { background: `${this.props.color}` } });
  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      recentcolor: "black",
      recentindex: 0,
      moveColor: "",
      resetall: false,
      reset: false };

  }

  componentDidMount() {
    var width = 1200;
    var height = 750;
    var cwidth = 30;
    var cheight = 30;
    var circleArray = [];
    var totalcircle = width * height / (cwidth * cheight);
    for (var i = 0; i < totalcircle; i++) {
      circleArray.push("black");
    }
    this.setState({ array: circleArray });

  }

  setColor(color, index) {
    var newArray = this.state.array;
    newArray[index] = color;
    this.setState({ array: newArray,
      recentcolor: color,
      recentindex: index,
      resetall: false });
  }
  resetAll() {
    this.setState({ resetall: true });
  }

  reset() {
    var resetArray = this.state.array;
    resetArray[this.state.recentindex] = "black";
    this.setState({ array: resetArray });
  }


  render() {
    return React.createElement("div", null,
    React.createElement("div", { style: { padding: "15px", display: "flex", justifyContent: "center" } },
    React.createElement("h1", null, "Light-Bright"),
    React.createElement("div", { style: { marginLeft: "100px" } },
    React.createElement("button", { onClick: this.reset.bind(this) }, "Reset"),
    React.createElement("button", { onClick: this.resetAll.bind(this) }, "Reset All"))),


    React.createElement("div", { className: "instruction" },
    React.createElement("p", null, "You can click and drag the mouse cursor to color the circles."),
    React.createElement("p", null, "You can double-click on a colored circle to remove the color."),
    React.createElement("p", null, "You can click on a colored circle to change its color and you will get a differenct color each time."),
    React.createElement("p", null, "You can click on the \"reset\" button to remove the recent color."),
    React.createElement("p", null, "You can click on the \"reset all\" button to remove all the colors from the circles")),

    React.createElement("div", { className: "container" },
    this.state.array.map((color, index) =>
    React.createElement(Circle, { setColor: this.setColor.bind(this), color: color, recentcolor: this.state.recentcolor, index: index, key: index, resetall: this.state.resetall }))));



  }}





ReactDOM.render(React.createElement(App, null), document.getElementById('app'));