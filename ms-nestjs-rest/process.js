var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('cps.txt')
  });
  
  let listCps={};
  lineReader.on('line', function (line) {
      let cols=line.split("|")
      listCps[cols[0].toString()]=`${cols[4]}, ${cols[5]}}`
  });