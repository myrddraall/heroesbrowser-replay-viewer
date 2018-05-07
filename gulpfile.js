const gulp = require('gulp');
const cmd = require('node-cmd');
const fs = require('fs');

gulp.task('link', () => {
  const package = require('./package.json');
  const linkedDeps = package.linkedDependencies;
  if (linkedDeps && linkedDeps.length) {
    for (let i = 0; i < linkedDeps.length; i++) {
      const dep = linkedDeps[i];
      cmd.run('npm link ' + dep);
    }
  }
});

gulp.task('updateVersion', () => {
  const package = require('./package.json');
  const ver = package.version || '';
  const envDir = fs.readdirSync('src/environments');
  for (let i = 0; i < envDir.length; i++) {
    const envFilePath = envDir[i];
    console.log('Updating version in ' + envFilePath);
    let envFile = fs.readFileSync('src/environments/' + envFilePath).toString('utf-8');
    envFile = envFile.replace(/appVerion:\s*'.*?'/, `appVerion: '${ver}'`);
    fs.writeFileSync('src/environments/' + envFilePath, envFile, 'utf-8');
  }

});

gulp.task('prebuild', ['updateVersion']);