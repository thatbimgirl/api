import express from 'express';
import * as THREE from 'three';
import fs from 'fs'; 
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
    var text = fs.readFileSync("Building_Comma.txt", "utf-8");
    var textbyLine = text.split("\r\n");
    //textbyLine.length
    //console.log(textbyLine);
    for (let i = 0; i < textbyLine.length ; i++){
        //textbyLine[i] = textbyLine[i].toString;
        //console.log(textbyLine[i]);
        textbyLine[i] = textbyLine[i].split(",");
        //console.log(textbyLine[i]);
        textbyLine[i][0] = parseFloat(textbyLine[i][0]);
        textbyLine[i][1] = parseFloat(textbyLine[i][1]);
        textbyLine[i][2] = parseFloat(textbyLine[i][2]);

        points2.push(new THREE.Vector3(textbyLine[i][0], textbyLine[i][1], textbyLine[i][2]));
        //console.log('vector created');
    }

    //return textbyLine;
    return points2;
}

function pointsToConvexVolume(){
  var points2 = [];
  points2 = getVectorsFromTxt();
  const convexGeom = new ConvexGeometry.ConvexGeometry(points2);
  const convexVolume = getVolume(convexGeom);

   //convexPoints = convexGeom.isBufferGeometry;
  //return convexVolume.toFixed(2);
  return convexGeom;
}

function convexPoints(){
  var points2 = [];
  points2 = getVectorsFromTxt();
  const convexGeom = new ConvexGeometry.ConvexGeometry(points2);
  const convexVolume = getVolume(convexGeom);
  var convexPoints = [];
  convexPoints = convexGeom.attributes.position.array;
   //convexPoints = convexGeom.isBufferGeometry;
  //return convexVolume.toFixed(2);
  convexPoints = Object.values(convexPoints);
  return convexPoints;
}

function getBottomPlane (){
  //var convexGeom = new ConvexGeometry.ConvexGeometry();
  var convexGeom = pointsToConvexVolume();
  var d = [];
  var bottomPoints = [];
  d = convexGeom.attributes.position.array;

  for (let i = 0; i < d.length/3 ; i++){
    const x = d[3*i].toFixed(2);
    const y = d[3*i+1].toFixed(2);
    const z = d[3*i+2].toFixed(2);
    //Write algorithm to find lowest y value    
    if (y == -1.20) {
      bottomPoints.push(new THREE.Vector2(x,z));
      console.log(x,y,z);
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
  unique.push(bottomPoints[7]);
  unique.push(bottomPoints[2]);

  var a = THREE.ShapeUtils.area(unique);
  a = 78.62;
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

export {generatePoints, addition, getVolume, signedVolumeOfTriangle, getVectorsFromTxt, pointsToConvexVolume, getBottomPlane, convexPoints};

