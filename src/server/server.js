import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import open from 'open';
import chalk from 'chalk';
import Html from './Html';
import App from '../common/App';

const app = express();
const port = process.env.WEB_PORT || 8080;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('*', function(req, res){
  const renderHtml = (htmlContent) => {
    const html = renderToStaticMarkup(<Html htmlContent={htmlContent} />);
    return `<!doctype html>${html}`;
  }

  const routerContext = {};
  const htmlContent = renderToString(
    <StaticRouter location={req.url} context={routerContext}>
      <App/>
    </StaticRouter>
  );

  // Checking is page is 404
  const status = routerContext.status === '404' ? 404 : 200;

  res.status(status).send(renderHtml(htmlContent));
})

app.listen(port, function(err){
  const url = `http://localhost:${port}`;
  if (err) console.error(`==> 😭  OMG!!! ${err}`);
  console.info(chalk.green(`==> 🌎  Listening at ${url}`));
  open(url);
})
