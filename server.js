import express from 'express';
import Television from './models/Television.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


app.post("/add", async function (req, res) {
  const tv = new Television();
  tv.marque = req.body.marque
  tv.taille = req.body.taille
  tv.prix = req.body.prix
  tv.achetee = req.body.achetee
  tv.usee = req.body.usee
  await tv.save();
  res.redirect('/');
});

app.get("/buy/:id", async function (req, res) {
  const tv = await Television.load({ id: req.params.id });
  tv.achetee = 1;
  await tv.save();
  res.redirect('/');
});

app.post("/broken/:id", async function (req, res) {
  const tv = await Television.load({ id: req.params.id });
  tv.usee = 1;
  tv.usure = req.body.usure;
  await tv.save();
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const televisions = await Television.loadMany();
  const tv_dispo = televisions.filter(tv => tv.achetee == false);
  const tv_achetee = televisions.filter(tv => tv.achetee == true);
  const prix_total = tv_achetee.reduce((acc, tv) => acc + tv.prix, 0);
  const tv_fonctionnelle = tv_achetee.filter(tv => tv.usee == false);
  const tv_usee = tv_achetee.filter(tv => tv.usee == true);
  res.render('listTV.ejs', { tv_dispo: tv_dispo, tv_achetee: tv_achetee, tv_fonctionnelle: tv_fonctionnelle, tv_usee: tv_usee, prix_total: prix_total });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

