class Node {
    id: number;
    distances: number[];
    neighbours: number[];
    constructor(id: number, len: number) {
        this.id = id;
        this.distances = new Array(len);
        this.neighbours = [];
    }

    populateNeighbours(graph: number[]) {
        let counter = 0;
        for (let vertex of graph) {
            if (counter !== this.id && vertex !== 0) {
                this.neighbours[counter] = vertex;
            }
            counter++;
        }
    }
}

export default class Dijkstra {
    graph: number[][];
    sptSet: number[];
    visited: number[];
    unvisited: number[];
    src: number;
    nodes: Node[];
    constructor(graph: number[][], src: number) {
        this.graph = graph;
        this.src = src;
        this.sptSet = [];
        this.nodes = [];

        this.visited = [];
        this.unvisited = [];

        // Filling the unvisited array with all the nodes from the graph.
        for (let i = 0; i < graph.length; i++) {
            this.unvisited[i] = i;
            this.nodes.push(new Node(i, graph.length));
            this.nodes[this.nodes.length - 1].populateNeighbours(graph[i]);
        }
        console.log(this.nodes);
        // let startVertex = this.nodes[src];
        // startVertex.distances[src] = 0;



    }
}
// src -> 0
//[ 0 -> [0, 4, 0, 0, 0, 0, 0, 8, 0], 
//  1 -> [4, 0, 8, 0, 0, 0, 0, 11, 0], 
//  2 -> [0, 8, 0, 7, 0, 4, 0, 0, 2], 
//  3 -> [0, 0, 7, 0, 9, 14, 0, 0, 0], 
//  4 -> [0, 0, 0, 9, 0, 10, 0, 0, 0], 
//  5 -> [0, 0, 4, 14, 10, 0, 2, 0, 0], 
//  6 -> [0, 0, 0, 0, 0, 2, 0, 1, 6], 
//  7 -> [8, 11, 0, 0, 0, 0, 1, 0, 7], 
//  8 -> [0, 0, 2, 0, 0, 0, 6, 7, 0]]; 

let graph = 
[[0, 4, 0, 0, 0, 0, 0, 8, 0], 
[4, 0, 8, 0, 0, 0, 0, 11, 0], 
[0, 8, 0, 7, 0, 4, 0, 0, 2], 
[0, 0, 7, 0, 9, 14, 0, 0, 0], 
[0, 0, 0, 9, 0, 10, 0, 0, 0], 
[0, 0, 4, 14, 10, 0, 2, 0, 0], 
[0, 0, 0, 0, 0, 2, 0, 1, 6], 
[8, 11, 0, 0, 0, 0, 1, 0, 7], 
[0, 0, 2, 0, 0, 0, 6, 7, 0]]; 

let algo = new Dijkstra(graph, 0);