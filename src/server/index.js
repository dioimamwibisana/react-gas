import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../common/App';
import Html from './Html';

import 'babel-polyfill';

const app = express();
const port = 8080;

app.get('*', function (req, res) {
  const context = {};
  const htmlContent = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const renderHtml = (htmlContent) => {
    const html = renderToStaticMarkup(<Html children={htmlContent} />);
    return `<!doctype html>${html}`;
  };

  // Checking is page is 404
  const status = context.status === '404' ? 404 : 200;

  res.status(status).send(renderHtml(htmlContent));
});


// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on port ${ port }`);
  }
});
