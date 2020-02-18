class Node {
    id: number;
    distances: number[];
    neighbours: number[];
    constructor(id: number, len: number) {
        this.id = id;
        this.distances = new Array(len);
        this.neighbours = new Array(len);
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
    unvisited: Node[];
    nodes: Node[];
    src: number;
    constructor(graph: number[][], src: number) {
        this.graph = graph;
        this.src = src;
        this.sptSet = [];
        this.nodes = [];

        this.visited = [];
        this.unvisited = [];

        // Filling the unvisited array with all the nodes from the graph.
        for (let i = 0; i < graph.length; i++) {
            this.nodes.push(new Node(i, graph.length));
            this.nodes[this.nodes.length - 1].populateNeighbours(graph[i]);
            this.unvisited.push(this.nodes[this.nodes.length - 1]);
        }

        let startVertex = this.nodes[src];
        let it1 = 0;
        for (let node of this.nodes) {
            if (it1 === startVertex.id) this.nodes[src].distances[src] = 0;
            else this.nodes[it1].distances[src] = Infinity;
            it1++;
        }
        
        this.applyDijkstra(this.unvisited, startVertex);


    }

    applyDijkstra(unvisitedVertexes: Node[], startVertex: Node) {
        let smallestKnownDistance = Infinity;
        let currentNeighboursToVisit = [];
        for (let vertex of unvisitedVertexes) {
            if (vertex.distances[startVertex.id] < smallestKnownDistance) smallestKnownDistance = vertex.distances[startVertex.id];
            for (let vertex2 in vertex.neighbours) {
                if (vertex.neighbours[vertex2] !== null && unvisitedVertexes[vertex2] !== null) currentNeighboursToVisit.push(unvisitedVertexes[vertex2]);
            }
        }
        
        console.log(smallestKnownDistance, currentNeighboursToVisit);
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