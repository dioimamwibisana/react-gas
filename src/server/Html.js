import React from 'react';

const Html = (props) => {
  return(
    <html>
      <head>
        <title>${props.title}</title>
      </head>

      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.htmlContent }} />
      </body>

      <script src="/js/main.js"></script>
    </html>
  )
}

export default Html;
