//var THREE = require('three');
//var fs = require('fs');
import express from 'express';
import * as THREE from 'three';
import fs from 'fs'; 
//var ConvexGeometry = import('../node_modules/three/examples/jsm/geometries/ConvexGeometry.js');
//import {ConvexGeometry} from 'three/examples/jsm/geometries/ConvexGeometry.js';
import * as ConvexGeometry from 'three/examples/jsm/geometries/ConvexGeometry.js';

var points = [];
function generatePoints(points) {
    // add 10 random spheres
    for (var i = 0; i < 4; i++) {
        var randomX = -15 + Math.round(Math.random() * 30);
        console.log(randomX);
        var randomY = -15 + Math.round(Math.random() * 30);
        console.log(randomY);
        var randomZ = -15 + Math.round(Math.random() * 30);
        console.log(randomZ);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
        console.log('points created');
    }
	return points;
}

function getVectorsFromTxt(){
    var points2 = [];
    var text = fs.readFileSync("Pointlist.txt", "utf-8");
    var textbyLine = text.split("\r\n");
    //textbyLine.length
    for (let i = 0; i < textbyLine.length ; i++){
        //textbyLine[i] = textbyLine[i].toString;
        textbyLine[i] = textbyLine[i].split(",");
        textbyLine[i][0] = parseFloat(textbyLine[i][0]);
        textbyLine[i][1] = parseFloat(textbyLine[i][1]);
        textbyLine[i][2] = parseFloat(textbyLine[i][2]);
        //console.log(textbyLine[i]);
        points2.push(new THREE.Vector3(textbyLine[i][0], textbyLine[i][1], textbyLine[i][2]));
        //console.log('vector created');
    }
    return points2;
}

function pointsToConvexVolume(){
  var points2 = [];
  points2 = getVectorsFromTxt();
  const convexGeom = new ConvexGeometry.ConvexGeometry(points2);
  const convexVolume = getVolume(convexGeom);
  var convexPoints = [];
  convexPoints = convexGeom.getAttribute("instanceMatrix"); 
   //convexPoints = convexGeom.isBufferGeometry;
  //return convexVolume.toFixed(2);
  return convexGeom;
}

function getBottomPlane (){
  //var convexGeom = new ConvexGeometry.ConvexGeometry();
  var convexGeom = pointsToConvexVolume();
  var d = [];
  var bottomPoints = [];
  d = convexGeom.attributes.position.array;

  for (let i = 0; i < d.length/3 ; i++){
    const x = d[3*i];
    const y = d[3*i+1];
    const z = d[3*i+2];
    //Write algorithm to find lowest y value    
    if (z == 0) {
      bottomPoints.push(new THREE.Vector2(x,y));
      //bottomPoints.push([x,y]);
    };
  }
  //const bottomCurve = new THREE.Curve(bottomPoints);
  //const bottomShape = new THREE.Shape(bottomCurve);
  //var a = THREE.ShapeUtils.area(bottomPoints);
  //const unique = [...new Set(bottomPoints.map(item => item))]
  
  //write algorithm to delete duplicates
  var unique = [];
  unique.push(bottomPoints[0]);
  unique.push(bottomPoints[1]);
  unique.push(bottomPoints[3]);
  unique.push(bottomPoints[9]);

  var a = THREE.ShapeUtils.area(unique);
  return a.toFixed(2);
};


function addition(a1,a2){
	return a1 + a2
};

function getVolume(geometry) {
    if (!geometry.isBufferGeometry) {
      console.log("'geometry' must be an indexed or non-indexed buffer geometry");
      return 0;
    }
    var isIndexed = geometry.index !== null;
    let position = geometry.attributes.position;
    let sum = 0;
    let p1 = new THREE.Vector3(),
      p2 = new THREE.Vector3(),
      p3 = new THREE.Vector3();
    if (!isIndexed) {
      let faces = position.count / 3;
      for (let i = 0; i < faces; i++) {
        p1.fromBufferAttribute(position, i * 3 + 0);
        p2.fromBufferAttribute(position, i * 3 + 1);
        p3.fromBufferAttribute(position, i * 3 + 2);
        sum += signedVolumeOfTriangle(p1, p2, p3);
      }
    }
    else {
      let index = geometry.index;
      let faces = index.count / 3;
      for (let i = 0; i < faces; i++){
        p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
        p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
        p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
        sum += signedVolumeOfTriangle(p1, p2, p3);
      }
    }
    return sum;
  }

  function signedVolumeOfTriangle(p1, p2, p3) {
    return p1.dot(p2.cross(p3)) / 6.0;
  }

export {generatePoints, addition, getVolume, signedVolumeOfTriangle, getVectorsFromTxt, pointsToConvexVolume, getBottomPlane};

/*exports.addition = addition;
exports.getPointsFromTxt = getPointsFromTxt;
exports.getVolume = getVolume;
exports.pointsToConvexVolume = pointsToConvexVolume;*/
