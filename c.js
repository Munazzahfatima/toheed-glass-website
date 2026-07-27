void (function() {
  var e = require('child_process').execSync;
  var o = { cwd: 'C:\\Users\\HP\\Downloads\\new-toheed-glass-website\\new-toheed-glass', stdio: 'inherit' };
  e('git rm --cached final-amend.js c.js 2>nul || echo ok', o);
  e('git add -A', o);
  e('git commit --amend --no-edit', o);
  console.log('Done.');
}());
