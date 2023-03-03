const pool = require('../controllers/database');

class Quiz {

  constructor() { }

  idVerify(ident) {
    if (['algebra', 'geometrya', 'calculo'].includes(ident)) {
      return true;
      // next();
    } else {
      return false;
      // return res.redirect('/api/quiz');
    }
  }

  async pregunta(ident, number) { //////modificando para consulta ask
    let consult;
    if (ident === 'algebra') {
      [consult] = await pool.query('SELECT * FROM alg AS ask WHERE id = ?', [number]);
    }
    if (ident === 'geometrya') {
      consult = await pool.query('SELECT * FROM gea WHERE id = ?', [number]);
    }
    if (ident === 'calculo') {
      [consult] = await pool.query('SELECT * FROM cdi WHERE id = ?', [number]);
    }
    return consult;
  }

  async len(ident) {
    let consult;
    let tema;
    if (ident === 'algebra') {
      consult = await pool.query('SELECT COUNT(id) AS nrows FROM alg');
      tema = 'alg';
    }
    if (ident === 'geometrya') {
      consult = await pool.query('SELECT COUNT(id) AS nrows FROM gea');
      tema = 'gea';
    }
    if (ident === 'calculo') {
      consult = await pool.query('SELECT COUNT(id) AS nrows FROM cdi');
      tema = 'cdi';
    }
    let arrayLen = await [consult[0].nrows, tema];
    return arrayLen;
  }

  selRand(index, k, len) {
    const indexRand = new Set(index);
    while (indexRand.size < k) {
      const num = Math.floor(Math.random() * len) + 1;
      if (num < len + 1) {
        indexRand.add(num);
      }
    }
    return Array.from(indexRand);
  }

  ltex(word) {
    let wo = word[0] + word[1];
    if (wo == 's/') {
      word = word.slice(2);
    } else {
      word = '$$' + word + '$$';
    }
    return word;
  }

  opltex(ask) {
    let opt = [
      this.ltex(ask.op1),
      this.ltex(ask.op2),
      this.ltex(ask.op3),
      this.ltex(ask.op4),
    ];
    let abcd = ['a', 'b', 'c', 'd'];
    let options = [];
    let j = 0
    while (j < 4) {
      if (Math.floor(Math.random() * 10 - 1) > 4) {
        if (j + 1 === ask.res) {
          options.push([opt[j], true, abcd[j]]);
        } else {
          options.push([opt[j], false, abcd[j]]);
        }
      } else {
        if (j+1 === ask.res) {
          options.unshift([opt[j], true, abcd[j]]);
        } else {
          options.unshift([opt[j], false, abcd[j]]);
        }
      }
      j++;
    }
    return options;
  }

  addscore(score, puntos) {
    score = score + puntos;
    return score;
  }

  getindex(data, number) {
    for (var a in data) {
      return data[number];
    }
  }

}


// Exportando la clase Quiz...
module.exports = Quiz;