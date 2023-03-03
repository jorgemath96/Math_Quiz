// Iniciando Router...
const { Router, json } = require('express');
const router = Router();
const document = require('jsdom')
const pool = require('../controllers/database');
const Quiz = require('../controllers/quiz-gen.js');
const quiz = new Quiz();
let indexSet = new Set();
let index = [];
let score = 0;
let quizLen = 5;
let len;
let tema;
let ask;
let puntos;

// Definiendo rutas...
router.get('/', (req, res) => {
  let name = req.user.fullname;
  res.render('quiz/seleccion', { Titulo: `Bienvenido: ${name}` });
});

router.post('/', (req, res) => {
  const id = req.body.sele;
  res.redirect(`/api/quiz/${id}`);
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  if (quiz.idVerify(id)) {
    let title = id.toUpperCase();
    return res.render('quiz/inicio', { Titulo: title, Id: id });
  }
  return res.redirect('/api/quiz/');
});

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  if (quiz.idVerify(id)) {
    var quizStatus = req.body.quizStatus;
    if (quizStatus === 'cont') {
      [len, tema] = await quiz.len(id);
      return res.redirect(`/api/quiz/${id}/1`);
    }
  }
  return res.redirect('/api/quiz');
});

router.get('/:id/:n', async (req, res) => {
  const id = req.params.id;
  let title = id.toUpperCase();
  let n = req.params.n;
  let m = parseInt(n);
  if (m != 1) {
    if (!(m<0 || m>0)) {
      console.log('no esta definido m');
      return res.redirect('/api/quiz/');
    } else {
      if (m > index.length + 1) {
        console.log('algo va mal en la logica');
        let k = index[-1];
        return res.redirect(`/api/quiz/${id}/${k}`);
      }
    }
  }
  index = await quiz.selRand(index, m, len);
  let i = index[m - 1];
  ask = await quiz.pregunta(id, i);
  puntos = ask.scr;
  let p = await [ask.tipo, quiz.ltex(ask.forma)];
  const r = await quiz.opltex(ask);
  res.render('quiz/quiz', { Titulo: title, Id: id, pregunta: p, respuesta: r, num: m, lenQuiz: quizLen, Puntos: puntos });
});

router.post('/:id/:n', async (req, res) => {
  const id = req.params.id;
  let n = parseInt(req.params.n);
  var opcion = req.body.opcion;
  if (opcion == 'true') {
    score = quiz.addscore(score, puntos);
  }
  if (n < quizLen) {
    let k = n + 1;
    return res.redirect(`/api/quiz/${id}/${k}`);
  } else if (n == quizLen) {
    return res.redirect(`/api/quiz/${id}/quiz/final`);
  } else {
    let k = index.len;
    return res.redirect(`/api/quiz/${id}/${k}`);
  }
});

router.get('/:id/quiz/final', (req, res) => {
  res.render('quiz/final', { Titulo: 'Quiz Finalizado', puntaje: score });
});

router.post('/:id/quiz/final', (req, res) => {
  res.redirect('/api/quiz');
});

// Exportando el router..
module.exports = router;