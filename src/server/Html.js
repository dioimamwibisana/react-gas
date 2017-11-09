import React from 'react';
import { outputFiles } from '../../webpack/output-files';

const Html = ({ children }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

      <title>React</title>

      <link rel='stylesheet' href={ `/${ outputFiles.css }` } />
    </head>
    <body>
      <div
        id='app'
        dangerouslySetInnerHTML={ { __html: children } } // eslint-disable-line
      />
      <script type='text/javascript' src={ `/${ outputFiles.vendor }` } />
      <script type='text/javascript' src={ `/${ outputFiles.client }` } />
    </body>
  </html>
);

export default Html;
