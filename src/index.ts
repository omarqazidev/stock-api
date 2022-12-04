import app from './app';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`  App is running at http://localhost:${port}`);
  console.log('  Press CTRL-C to stop');
});
