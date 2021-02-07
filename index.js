const fs = require('fs');
var g_count = 2;
var y_count = 4;

function run() {
  //Insert Clone genetics. Try to add only 4+ green or max of 2 red genes. If you sort by best genes then it runs faster
  var plants = [
    {'hyhgyh': {id: 0,parents: [],fifty_fifty: false}},
    {'gyygyg': {id: 1,parents: [],fifty_fifty: false}},
    {'gwyhyw': {id: 2,parents: [],fifty_fifty: false}},
    {'ghxyyg': {id: 3,parents: [],fifty_fifty: false}},
    {'wyhyhg': {id: 4,parents: [],fifty_fifty: false}},
    {'wyhyhg': {id: 5,parents: [],fifty_fifty: false}},
    {'xgyghh': {id: 6,parents: [],fifty_fifty: false}},
    {'wggyyh': {id: 7,parents: [],fifty_fifty: false}},
    {'wghyhh': {id: 8,parents: [],fifty_fifty: false}},
    {'wyhyhg': {id: 9,parents: [],fifty_fifty: false}},
  ]
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

run()