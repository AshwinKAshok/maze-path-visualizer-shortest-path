import React from "react";

// const Tile = (props) => {
//     let style={background : "white", border: "2px solid black", width:"2em", height:"2px"};
//     if(props.matrix[props.index_i][props.index_j] === 10) {
//         style = {background : "blue", border: "2px solid black", width:"2em", height:"2px"}
//     }
//     else if(props.action[props.index_i][props.index_j] === 99) {
//         style = {background : "end", border: "2px solid black", width:"2em", height:"2px"}
//
//
//     }
//     else if(props.action[props.index_i][props.index_j] === -1) {
//         style = {background : "black", border: "2px solid black", width:"2em", height:"10px"}
//     }
//
//     return (    <td onClick={() => {
//         props.changeTileHandler(props.index_i, props.index_j, props.currAction);
//     }} style={{background : "white", border: "2px solid black", width:"2em", height:"2px"}}>.</td>
//     )
// }

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.props.matrix[this.props.index_i][this.props.index_j]!==nextProps.matrix[nextProps.index_i][nextProps.index_j]) {
    //         return false;
    //     }
    //     return true;
    // }
    // }

    render() {

        var boxStyle={background : "white", border: "2px solid black", width:"2em", height:"2px"};
        if(this.props.matrix[this.props.index_i][this.props.index_j] === 10) {
            boxStyle = {background : "blue", border: "2px solid black", width:"2em", height:"2px"};
        }
        else if(this.props.matrix[this.props.index_i][this.props.index_j] === 99) {
            boxStyle = {background : "red", border: "2px solid black", width:"2em", height:"2px"};
        }
        else if(this.props.matrix[this.props.index_i][this.props.index_j] === -1) {
            boxStyle = {background : "black", border: "2px solid black", width:"2em", height:"10px"};
        }
        //-2 for final path
        else if(this.props.matrix[this.props.index_i][this.props.index_j] === -2) {
            boxStyle = {background : "pink", border: "2px solid black", width:"2em", height:"10px"};
        }
        //-3 for tiles/boxes traversed during the process
        else if(this.props.matrix[this.props.index_i][this.props.index_j] === -3) {
            boxStyle = {background : "green", border: "2px solid black", width:"2em", height:"10px"};
        }

        return (
            <td onClick={()=> {
                this.props.changeTileHandler(this.props.index_i,this.props.index_j,this.props.currAction);
            }} style = {boxStyle} >{this.props.matrix[this.props.index_i][this.props.index_j]}</td>
        )
    }
}


export default Tile;