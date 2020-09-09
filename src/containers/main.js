import React from "react";
import Tile from "../components/tile";
class Point {
    constructor(x,y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }
}

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            action : "setStart",
            rows : 25,
            columns: 25,
            matrix : Array(25).fill(Array(25).fill(0))
        }

        this.changeTile = this.changeTile.bind(this);
    }



    changeTile = (i,j, currAction) => {

        console.log(this.state.action);
        if(currAction==="setStart") {
            let newMatrix =  this.state.matrix;
            let newRow = [...this.state.matrix[i]]
            newRow[j] =10;
            newMatrix[i] = newRow;
            console.log(newMatrix);
            this.setState({
                matrix : newMatrix,
                action : "setEnd"
                          })
        }

        if(currAction==="setEnd") {
            let newMatrix =  this.state.matrix;
            let newRow = [...this.state.matrix[i]]
            newRow[j] =99;
            newMatrix[i] = newRow;

            this.setState({
                              matrix :  newMatrix,
                              action : "setBarrier"
                          })

        }

        if(currAction==="setBarrier") {
            let newMatrix =  this.state.matrix;
            let newRow = [...this.state.matrix[i]];
            newRow[j] =-1;
            newMatrix[i] = newRow;
            this.setState({
                              matrix :  newMatrix
                          })

        }
    }

    isSafe = (x, y, len) => {
        if(x<0 || y<0)
        {
            return false;
        }
        else if(x>=len || y>=len)
        {
            return false;
        }
        else
        {
            if(this.state.matrix[x][y]!=-1 && this.state.matrix[x][y]!=-3)
            {
                if(this.state.matrix[x][y] != 99)
                {
                    this.state.matrix[x][y] = -3;
                }
                return true;
            }else
            {
                return false;
            }
        }
    }

    printBFS =async (start_i, start_j, parentList,len) => {

        var queue = [];
        queue.push(new Point(start_i,start_j,null));

        // this.state.matrix[start_i][start_j] = -1;

        while(queue.length !== 0)
        {
            var currUpdate = [];
            var vertex = queue.shift();
            if(this.state.matrix[vertex.x][vertex.y]==100)
            {
                return true;
            }


            //south
            if(this.isSafe(vertex.x+1,vertex.y, len))
            {
                // console.log("south : curr vertex: " + vertex.x + " " + vertex.y);
                queue.push(new Point(vertex.x+1,vertex.y,vertex));
                parentList.push(new Point(vertex.x+1,vertex.y,vertex));
                currUpdate.push(new Point(vertex.x+1,vertex.y,vertex));
                if(this.state.matrix[vertex.x+1][vertex.y]==99)
                {
                    return true;
                }
            }

            //west
            if(this.isSafe(vertex.x,vertex.y-1, len))
            {
                queue.push(new Point(vertex.x,vertex.y-1,vertex));
                parentList.push(new Point(vertex.x,vertex.y-1,vertex));
                currUpdate.push(new Point(vertex.x,vertex.y-1,vertex));
                if(this.state.matrix[vertex.x][vertex.y-1]==99)
                {
                    return true;
                }
            }

            //north
            if(this.isSafe(vertex.x-1,vertex.y, len))
            {
                queue.push(new Point(vertex.x-1,vertex.y,vertex));
                parentList.push(new Point(vertex.x-1,vertex.y,vertex));
                currUpdate.push(new Point(vertex.x-1,vertex.y,vertex));

                if(this.state.matrix[vertex.x-1][vertex.y]==99)
                {
                    return true;
                }
            }

            //east
            if(this.isSafe(vertex.x,vertex.y+1, len))
            {
                console.log("curr vertex: " + vertex.x + " " + vertex.y);
                queue.push(new Point(vertex.x,vertex.y+1,vertex));
                parentList.push(new Point(vertex.x,vertex.y+1,vertex));
                currUpdate.push(new Point(vertex.x,vertex.y+1,vertex));
                if(this.state.matrix[vertex.x][vertex.y+1]==99)
                {
                    return true;
                }
            }

            let newMatrix =  this.state.matrix;
            for(let i=0;i<parentList.length;i++) {
                let tempVertex = parentList[i];
                let newRow = [...this.state.matrix[tempVertex.x]]
                newRow[tempVertex.y] =-3;
                newMatrix[tempVertex.x] = newRow;
                // this.state.matrix = newMatrix;

            }
            this.setState({
                matrix : newMatrix
                          })

            // this.forceUpdate();

            // var now = new Date().getTime();
            // var millisecondsToWait = 50; /* i.e. 1 second */
            //
            // while ( new Date().getTime() < now + millisecondsToWait )
            // {}
        }
        return false;
    }

    render() {

        return (
            <div>
                {   this.state.action === "setStart" &&
                    <h1>Select the start point</h1>
                }
                {
                    this.state.action === "setEnd" &&
                    <h1>Select the end point</h1>
                }

                {
                    this.state.action === "setBarrier" &&
                    <h1>Set the barriers</h1>
                }

                {
                    this.state.action === "findingPath" &&
                    <h1>The path is :</h1>
                }



                <table style={{width:"100%"}}>
                    <tbody style={{width:"100%"}}>
                    {
                        this.state.matrix.map((row,index_i) => {
                           return (
                               <tr key={index_i*1000 + 1 }>
                                   {
                                       row.map((tile,index_j)=> {
                                           return <Tile changeTileHandler = {this.changeTile}
                                                        index_i = {index_i}
                                                        index_j = {index_j}
                                                        currAction =  {this.state.action}
                                                        matrix = {this.state.matrix}
                                                        key = {(index_j * index_i) + index_j}
                                           />
                                       })
                                   }
                               </tr>
                           )
                        })
                    }
                    </tbody>
                </table>

                <button onClick={async ()=>{
                    //finding start indices
                    var start_i=0;
                    var start_j=0;

                    for(let i=0;i<25;i++) {
                        for(let j=0;j<25;j++)
                        {
                            if(this.state.matrix[i][j] === 10) {
                                start_i = i;
                                start_j = j;
                            }
                        }
                    }
                    console.log("adsdad");
                    console.log(start_i);
                    console.log(start_j);
                    var parentList = [];
                    this.printBFS(start_i,start_j,parentList, 25);

                    var vertex = parentList.pop();
                    while(vertex != null) {
                        console.log(vertex.x + " "+ vertex.y);
                        // if(this.state.matrix[vertex.x][vertex.y]===10 || this.state.matrix[vertex.x][vertex.y]===99) {
                        //     continue;
                        // }
                        let newMatrix =  this.state.matrix;
                        let newRow = [...this.state.matrix[vertex.x]]
                        newRow[vertex.y] =-2;
                        newMatrix[vertex.x] = newRow;
                        this.setState({
                            matrix:newMatrix
                                      })
                        vertex = vertex.parent;
                    }

                }}>Find path</button>
            </div>
        )
    }

}

export default MainContainer;