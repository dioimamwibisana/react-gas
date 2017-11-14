import app from '../server';
import chalk from 'chalk';

app.listen(process.env.PORT || 8080, () => console.log( // eslint-disable-line no-console
  chalk.bold.red('SERVER: listening on port 8080')
));
