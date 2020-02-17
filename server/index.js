require('dotenv/config');
const express = require('express');
const bcrypt = require('bcrypt');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// sign up
app.post('/api/auth/signup', (req, res, next) => {
  const saltRounds = 11;
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.email) next(new ClientError('missing email', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const emailTest = /^[\w.=-]+@[\w.-]+\.[\w]{2,4}$/;
  if (!emailTest.exec(req.body.email)) next(new ClientError(`email ${req.body.email} is not valid`, 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.password)) next(new ClientError('password is not valid', 400));
  const checkUserNameSql = `
    select "userName"
      from "user"
     where "userName" = $1;
  `;
  const insertSql = `
    insert into "user" ("userName", "email", "password")
    values ($1, $2, $3)
    returning "userName", "email";
  `;
  const userNameValue = [req.body.userName];
  if (emailTest.exec(req.body.email) && pwdTest.exec(req.body.password)) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) next(err);
      const insertValue = [req.body.userName, req.body.email, hash];
      db.query(checkUserNameSql, userNameValue)
        .then(userNameResult => {
          if (userNameResult.rows[0]) next(new ClientError(`user name ${req.body.userName} already exists`, 400));
          else {
            db.query(insertSql, insertValue)
              .then(insertResult => res.status(201).json(insertResult.rows[0]))
              .catch(err => next(err));
          }
        })
        .catch(err => next(err));
    });
  }
});
// log in
app.post('/api/auth/login', (req, res, next) => {
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const sql = `
    select "userName", "password", "userId"
      from "user"
     where "userName" = $1;
  `;
  const value = [req.body.userName];
  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) next(new ClientError(`user name ${req.body.userName} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, result.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            res.status(200).json({
              userId: result.rows[0].userId,
              userName: result.rows[0].userName
            });
          } else next(new ClientError('password does not match', 401));
        });
      }
    })
    .catch(err => next(err));
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

module.exports = app;

// app.listen(process.env.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log('Listening on port', process.env.PORT);
// });
