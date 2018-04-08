const gulp = require('gulp');
const cmd = require('node-cmd');

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
