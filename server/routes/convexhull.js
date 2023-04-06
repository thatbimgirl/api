import express from 'express';
//var express = require('express');
var router = express.Router();
//var calcs = require('../functions/calculation.js');
import * as calcs from '../../functions/calculation.js';
//import * as THREE from 'three';
//import { BoxGeometry } from 'three';
//var THREE = require('three');
//var convexGeometry = require('three/examples/jsm/geometries/ConvexGeometry.js');


function multiply(p1,p2){
    return p1*p2;
};

function hello(){
    console.log('hi jacqui');

};


router.get('/', function(req, res, next) {
    //res.send('API is working properly');
    const a = multiply(4,5);
    //const b = calcs.addition(5,4);
    //var points = [];
    //calcs.getVectorsFromTxt();

    //const volume = calcs.pointsToConvexVolume(points);

    //d = calcs.generatePoints(points);
    //d = calcs.getVectorsFromTxt();

    //var c = volume.getAttribute("metadata");
    //var d = calcs.getArrayFromTxt();
    //console.log(volume.attributes.position.array);
    var convexPoints = [];
    //footprint = calcs.getBottomPlane();
    //footprint = calcs.getVectorsFromTxt();
    convexPoints = calcs.convexPoints();
    //footprint = calcs.addition(5,10);
    res.json(convexPoints);
    hello();
});

//module.exports = router;
export default router;
