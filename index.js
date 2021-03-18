const fs = require('fs');
var g_count = 2;
var y_count = 4;
var h_count = 0;

var plants = [
  {'hyhgyh': {id: 0,parents: [],fifty_fifty: false}},
  {'gyygyg': {id: 1,parents: [],fifty_fifty: false}},
  // {'gwyhyw': {id: 2,parents: [],fifty_fifty: false}},
  {'ghxyyg': {id: 3,parents: [],fifty_fifty: false}},
  // {'wyhyhg': {id: 4,parents: [],fifty_fifty: false}},
  {'xgyghh': {id: 6,parents: [],fifty_fifty: false}},
  // {'wggyyh': {id: 7,parents: [],fifty_fifty: false}},
  // {'wghyhh': {id: 8,parents: [],fifty_fifty: false}},
]

function run() {
  //Insert Clone genetics. Try to add only 4+ green or max of 2 red genes. If you sort by best genes then it runs faster

  x,w = 1.2
  var temp_arr = []
  var result;
  var done = false;
  var plants_len;
  loop0:
  for (var x = 1; x <= 4; x++) {
    plants_len = plants.length;
    if (done) {
      var res_json = {}
      var pos_1 = plants_len-1;
      var key_1 = Object.keys(plants[pos_1])[0];
      // last result is solution
      if (((key_1.match(/g/g) || []).length == g_count) && ((key_1.match(/y/g) || []).length == y_count)) {
        res_json[key_1] = plants[pos_1][key_1];
        if (plants[pos_1][key_1].parents) {
          for (l in plants[pos_1][key_1].parents) {
            var pos_2 = plants[pos_1][key_1].parents[l];
            var key_2 = Object.keys(plants[pos_2])[0];
            res_json[key_2] = plants[pos_2][Object.keys(plants[pos_2])[0]]
            if (plants[pos_2][key_2].parents) {
              for (m in plants[pos_2][key_2].parents) {
                var pos_3 = plants[pos_2][key_2].parents[m];
                var key_3 = Object.keys(plants[pos_3])[0];
                res_json[key_3] = plants[pos_3][Object.keys(plants[pos_3])[0]]
              }
            }
          }
        }
      }
      // 2nd to last is solution
      else {
        var pos_1 = plants_len-2;
        var key_1 = Object.keys(plants[pos_1])[0];
        res_json[key_1] = plants[pos_1][key_1];
        if (plants[pos_1][key_1].parents) {
          for (l in plants[pos_1][key_1].parents) {
            var pos_2 = plants[pos_1][key_1].parents[l];
            var key_2 = Object.keys(plants[pos_2])[0];
            res_json[key_2] = plants[pos_2][Object.keys(plants[pos_2])[0]]
            if (plants[pos_2][key_2].parents) {
              for (m in plants[pos_2][key_2].parents) {
                var pos_3 = plants[pos_2][key_2].parents[m];
                var key_3 = Object.keys(plants[pos_3])[0];
                res_json[key_3] = plants[pos_3][Object.keys(plants[pos_3])[0]]
              }
            }
          }
        }
      }
      fs.writeFile("simplified.json", JSON.stringify(res_json), function(err) {
        if (err) {
            console.log(err);
        }
      });

      break;
    }
    console.log(x)
    loop1:
    for (var k1 = 0; k1 < plants_len; k1++) {
      if (done) {break;}
      loop2:
      for (var k2 = 0; k2 < plants_len; k2++) {
        if (done) {break;}
        if (k1 == k2) {
          // only use the same plant twice if its 6 green plant
          if (Object.keys(plants[k2])[0].indexOf('w') != -1 || Object.keys(plants[k2])[0].indexOf('x') != -1) {
            continue loop2;
          }
        }
        loop3:
        for (var k3 = 0; k3 < plants_len; k3++) {
          if (done) {break;}
          if (k1 == k3) {continue loop3;}
          if (k2 == k3) {continue loop3;}
          loop4:
          for (var k4 = 0; k4 < plants_len; k4++) {
            if (done) {break;}
            if (k1 == k4) {continue loop4;}
            if (k2 == k4) {continue loop4;}
            if (k3 == k4) {continue loop4;}
            temp_arr.push(plants[k1])
            temp_arr.push(plants[k2])
            temp_arr.push(plants[k3])
            temp_arr.push(plants[k4])
            result = geneCalc(temp_arr)
            temp_arr = [];
            var zz = {};

            if (result['fifty_fifty']) {
              if (result['res1']) {
                var keys = []
                for (l in plants) {
                  keys.push(Object.keys(plants[l])[0]);
                }
                if (keys.indexOf(result['res1']) == -1) {
                  zz = {};
                  zz[result['res1']] = {
                    parents: [plants[k1][Object.keys(plants[k1])[0]].id, plants[k2][Object.keys(plants[k2])[0]].id, plants[k3][Object.keys(plants[k3])[0]].id, plants[k4][Object.keys(plants[k4])[0]].id],
                    fifty_fifty: true,
                    id: plants.length
                  }
                  plants.push(zz)
                }
              }
              if (result['res2']) {
                var keys = []
                for (l in plants) {
                  keys.push(Object.keys(plants[l])[0]);
                }
                if (keys.indexOf(result['res2']) == -1) {
                  zz = {};
                  zz[result['res2']] = {
                    parents: [plants[k1][Object.keys(plants[k1])[0]].id, plants[k2][Object.keys(plants[k2])[0]].id, plants[k3][Object.keys(plants[k3])[0]].id, plants[k4][Object.keys(plants[k4])[0]].id],
                    fifty_fifty: true,
                    id: plants.length
                  }
                  plants.push(zz)
                }

              }
              if (result['done']) {
                done = true;
                fs.writeFile("result.json", JSON.stringify(plants), function(err) {
                  if (err) {
                      console.log(err);
                  }
                });
                break;
              }
            } else if (result['res1']) {
              var keys = []
              for (l in plants) {
                keys.push(Object.keys(plants[l])[0]);
              }
              if (keys.indexOf(result['res1']) == -1) {
                zz = {};
                zz[result['res1']] = {
                  parents: [plants[k1][Object.keys(plants[k1])[0]].id, plants[k2][Object.keys(plants[k2])[0]].id, plants[k3][Object.keys(plants[k3])[0]].id, plants[k4][Object.keys(plants[k4])[0]].id],
                  fifty_fifty: false,
                  id: plants.length
                }
                plants.push(zz)
              }
              if (result['done']) {
                done = true;
                fs.writeFile("result.json", JSON.stringify(plants), function(err) {
                  if (err) {
                      console.log(err);
                  }
                });
                break;
              }
            }
          }
        }
      }
    };
  }
}

function check(gene_temp) {
  var res1 = '';
  var res2 = '';
  var fifty_fifty = false;
  var rtrn = {};
  
  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0; var max = 0;
  for (k in gene_temp['1']) {
    if (gene_temp['1'][k] == 'g') { g += 0.6 }
    if (gene_temp['1'][k] == 'y') { y += 0.6 }
    if (gene_temp['1'][k] == 'h') { h += 0.6 }
    if (gene_temp['1'][k] == 'w') { w += 1 }
    if (gene_temp['1'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}

  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0;
  for (k in gene_temp['2']) {
    if (gene_temp['2'][k] == 'g') { g += 0.6 }
    if (gene_temp['2'][k] == 'y') { y += 0.6 }
    if (gene_temp['2'][k] == 'h') { h += 0.6 }
    if (gene_temp['2'][k] == 'w') { w += 1 }
    if (gene_temp['2'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}


  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0;
  for (k in gene_temp['3']) {
    if (gene_temp['3'][k] == 'g') { g += 0.6 }
    if (gene_temp['3'][k] == 'y') { y += 0.6 }
    if (gene_temp['3'][k] == 'h') { h += 0.6 }
    if (gene_temp['3'][k] == 'w') { w += 1 }
    if (gene_temp['3'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}


  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0;
  for (k in gene_temp['4']) {
    if (gene_temp['4'][k] == 'g') { g += 0.6 }
    if (gene_temp['4'][k] == 'y') { y += 0.6 }
    if (gene_temp['4'][k] == 'h') { h += 0.6 }
    if (gene_temp['4'][k] == 'w') { w += 1 }
    if (gene_temp['4'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}


  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0;
  for (k in gene_temp['5']) {
    if (gene_temp['5'][k] == 'g') { g += 0.6 }
    if (gene_temp['5'][k] == 'y') { y += 0.6 }
    if (gene_temp['5'][k] == 'h') { h += 0.6 }
    if (gene_temp['5'][k] == 'w') { w += 1 }
    if (gene_temp['5'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}


  var g = 0;var y = 0;var h = 0;var w = 0;var x = 0;
  for (k in gene_temp['6']) {
    if (gene_temp['6'][k] == 'g') { g += 0.6 }
    if (gene_temp['6'][k] == 'y') { y += 0.6 }
    if (gene_temp['6'][k] == 'h') { h += 0.6 }
    if (gene_temp['6'][k] == 'w') { w += 1 }
    if (gene_temp['6'][k] == 'x') { x += 1 }
  }
  max = Math.max(g,y,h,w,x);
  if (w == max) {res1 += 'w';res2 += 'w';}
  else if (x == max) {res1 += 'x';res2 += 'x';}
  else if (g == max && y == max) { res1 += 'g';res2 += 'y';fifty_fifty=true; }
  else if (g == max && h == max) { res1 += 'g';res2 += 'h';fifty_fifty=true; }
  else if (y == max && h == max) { res1 += 'y';res2 += 'h';fifty_fifty=true; }
  else if (g == max) {res1 += 'g';res2 += 'g';}
  else if (y == max) {res1 += 'y';res2 += 'y';}
  else if (h == max) {res1 += 'h';res2 += 'h';}

  if (fifty_fifty) {
    rtrn['fifty_fifty'] = true;
    if ((res1.match(/w/g) || []).length > 1) {rtrn['done']=false,rtrn['res1']=null}
    else if ((res1.match(/x/g) || []).length > 1) {rtrn['done']=false,rtrn['res1']=null}
    else if (((res1.match(/w/g) || []).length > 0) && ((res1.match(/x/g) || []).length > 0)) {rtrn['done']=false,rtrn['res1']=null}
    else if (((res1.match(/g/g) || []).length == g_count) && ((res1.match(/y/g) || []).length == y_count)) {
      console.log('FINISHED!!!!');
      rtrn['done']=true,rtrn['res1']=res1
    } else {
      rtrn['done']=false,rtrn['res1']=res1
    }

    if (rtrn['done'] == false) {
      if ((res2.match(/w/g) || []).length > 1) {rtrn['done']=false,rtrn['res2']=null}
      else if ((res2.match(/x/g) || []).length > 1) {rtrn['done']=false,rtrn['res2']=null}
      else if (((res2.match(/w/g) || []).length > 0) && ((res2.match(/x/g) || []).length > 0)) {rtrn['done']=false,rtrn['res2']=null}
      else if (((res2.match(/g/g) || []).length == g_count) && ((res2.match(/y/g) || []).length == y_count)) {
        console.log('FINISHED!!!!');
        rtrn['done']=true,rtrn['res2']=res2
      } else {
        rtrn['done']=false,rtrn['res2']=res2
      }
    }

    return rtrn
  } else {
    rtrn['fifty_fifty'] = false;
    if ((res1.match(/w/g) || []).length > 1) {rtrn['done']=false,rtrn['res1']=null}
    else if ((res1.match(/x/g) || []).length > 1) {rtrn['done']=false,rtrn['res1']=null}
    else if (((res1.match(/w/g) || []).length > 0) && ((res1.match(/x/g) || []).length > 0)) {rtrn['done']=false,rtrn['res1']=null}
    else if (((res1.match(/g/g) || []).length == g_count) && ((res1.match(/y/g) || []).length == y_count)) {
      console.log('FINISHED!!!!');
      rtrn['done']=true,rtrn['res1']=res1
    } else {
      rtrn['done']=false,rtrn['res1']=res1
    }
    
    return rtrn
  }
  
}

function geneCalc(obj) {
  //ghy=0,6  xw=1
  var gene_temp = {1:[],2:[],3:[],4:[],5:[],6:[]};
  
  obj.forEach(z => {
    var key = Object.keys(z)[0];
    gene_temp[1].push(key.substr(0,1))
    gene_temp[2].push(key.substr(1,1))
    gene_temp[3].push(key.substr(2,1))
    gene_temp[4].push(key.substr(3,1))
    gene_temp[5].push(key.substr(4,1))
    gene_temp[6].push(key.substr(5,1))
  });
  var new_gene;
  new_gene = check(gene_temp);
  return new_gene;
}

function checkIfPossible() {
  var ideal = {
    "g1":0,"g1":0,"g2":0,"g3":0,"g4":0,"g5":0,"g6":0,
    "y1":0,"y1":0,"y2":0,"y3":0,"y4":0,"y5":0,"y6":0,
    "h1":0,"h1":0,"h2":0,"h3":0,"h4":0,"h5":0,"h6":0,
  }
  for (plant of plants) {
    let gene_temp1 = Object.keys(plant)[0]
    if (gene_temp1.substr(0,1) == 'g') {
      ideal.g1++
      //if a seed has 6 greens, then we sometimes use 2 of these seeds in cloning.
      //thus increment once more just so that the percentage isn't 0
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g1++
      }
    }
    if (gene_temp1.substr(0,1) == 'y') {
      ideal.y1++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y1++
      }
    }
    if (gene_temp1.substr(0,1) == 'h') {
      ideal.h1++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h1++
      }
    }
    if (gene_temp1.substr(1,1) == 'g') {
      ideal.g2++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g2++
      }
    }
    if (gene_temp1.substr(1,1) == 'y') {
      ideal.y2++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y2++
      }
    }
    if (gene_temp1.substr(1,1) == 'h') {
      ideal.h2++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h2++
      }
    }
    if (gene_temp1.substr(2,1) == 'g') {
      ideal.g3++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g3++
      }
    }
    if (gene_temp1.substr(2,1) == 'y') {
      ideal.y3++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y3++
      }
    }
    if (gene_temp1.substr(2,1) == 'h') {
      ideal.h3++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h3++
      }
    }
    if (gene_temp1.substr(3,1) == 'g') {
      ideal.g4++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g4++
      }
    }
    if (gene_temp1.substr(3,1) == 'y') {
      ideal.y4++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y4++
      }
    }
    if (gene_temp1.substr(3,1) == 'h') {
      ideal.h4++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h4++
      }
    }
    if (gene_temp1.substr(4,1) == 'g') {
      ideal.g5++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g5++
      }
    }
    if (gene_temp1.substr(4,1) == 'y') {
      ideal.y5++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y5++
      }
    }
    if (gene_temp1.substr(4,1) == 'h') {
      ideal.h5++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h5++
      }
    }
    if (gene_temp1.substr(5,1) == 'g') {
      ideal.g6++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.g6++
      }
    }
    if (gene_temp1.substr(5,1) == 'y') {
      ideal.y6++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.y6++
      }
    }
    if (gene_temp1.substr(5,1) == 'h') {
      ideal.h6++
      if (gene_temp1.indexOf('x') == -1 && gene_temp1.indexOf('w') == -1) {
        ideal.h6++
      }
    }
  }
  var percentage = 99
  var ycount = 0
  var gcount = 0
  var hcount = 0
  for (let k = 0; k <= 6; k++) {
    if (ideal['g'+k] <= 1 && ideal['y'+k] <= 1 && ideal['h'+k] <= 1 && g_count > 0 && y_count > 0 && h_count > 0) {
      percentage = 0;
      break;
    }
    else if (ideal['g'+k] <= 1 && ideal['y'+k] <= 1 && g_count > 0 && y_count > 0) {
      percentage = 0;
      break;
    }
    else if (ideal['g'+k] <= 1 && g_count == 6) {
      percentage = 0;
      break;
    }
    else if (ideal['y'+k] <= 1 && y_count == 6) {
      percentage = 0;
      break;
    }
    else if (ideal['h'+k] <= 1 && h_count == 6) {
      percentage = 0;
      break;
    }
    else if (ideal['g'+k] <= 2 && ideal['y'+k] <= 2 && ideal['h'+k] <= 2 && g_count > 0 && y_count > 0 && h_count > 0) {
      percentage -= 10;
    }
    else if (ideal['g'+k] <= 2 && ideal['y'+k] <= 2 && g_count > 0 && y_count > 0 && h_count == 0) {
      percentage -= 10;
    }
    else if (ideal['g'+k] == 2 && y_count == 0 && h_count == 0) {
      percentage -= 10;
    }
    else if (ideal['y'+k] == 2 && g_count == 0 && h_count == 0) {
      percentage -= 10;
    }
    else if (ideal['h'+k] == 2 && g_count == 0 && y_count == 0) {
      percentage -= 10;
    }
    else if (ideal['g'+k] <= 3 && ideal['y'+k] <= 3 && ideal['h'+k] <= 3 && g_count > 0 && y_count > 0 && h_count > 0) {
      percentage -= 5;
    }
    else if (ideal['g'+k] <= 3 && ideal['y'+k] <= 3 && g_count > 0 && y_count > 0 && h_count > 0) {
      percentage -= 5;
    }
    else if (ideal['g'+k] == 3 && y_count == 0 && h_count == 0) {
      percentage -= 5;
    }
    else if (ideal['y'+k] == 3 && g_count == 0 && h_count == 0) {
      percentage -= 5;
    }
    else if (ideal['h'+k] == 3 && g_count == 0 && y_count == 0) {
      percentage -= 5;
    }
    
    if (ideal['g'+k] >= 2) {gcount += 1}
    if (ideal['y'+k] >= 2) {ycount += 1}
    if (ideal['h'+k] >= 2) {hcount += 1}
  }
  
  if (gcount < g_count && percentage>0) {percentage -= 50}
  if (ycount < y_count && percentage>0) {percentage -= 50}
  if (hcount < h_count && percentage>0) {percentage -= 50}
  return percentage
}

var percentage = checkIfPossible()
console.log(percentage + '% chance to solve');
if (percentage > 50) run()