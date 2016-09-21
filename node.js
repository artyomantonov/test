Skip to content
This repository
Search
Pull requests
Issues
Gist
@artyomantonov
Watch 34
Star 569
Fork 130 rickyrauch/nodejs-starter
Code  Issues 6  Pull requests 2  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathnodejs-starter/bin/njs-install
6564d13  on Jun 15, 2014
@slifszyc slifszyc Create directory to hold all config code and parameters
2 contributors @cristiandouce @slifszyc
RawBlameHistory
Executable File  55 lines (46 sloc)  1.39 KB
#!/usr/bin/env node

/**
 * Module dependencies.
 */
var fs = require('fs');
var exists = fs.existsSync;
var read = fs.readFileSync;
var write = fs.writeFileSync;
var parse = JSON.parse;
var stringify = JSON.stringify;
var path = require('path');
var resolve = path.resolve;
var merge = require('merge-util');
var exec = require('child_process').exec;
var program = require('commander');
var installc = resolve('./node_modules/.bin/component-install');
var env = process.env.NODE_ENV || 'development';

program
    .option('-c, --config', 'copy and/or merge configuration file')
    .option('-C, --no-components', 'ignore components install')
    .parse(process.argv);


/**
 * Make sure there is a config file
 */

if (program.config) {
    var dest = resolve('./lib/config/' + env + '.json');
    var orig = resolve('./lib/config/sample.json');
    if (!exists(dest)) {
        // non-simple copying
        write(dest, read(orig));
    } else {
        var conf = parse(read(dest));
        var sample = parse(read(orig));

        // Merge current config into original sample
        merge(sample, conf);

        // save config file
        write(dest, stringify(sample, null, 2));
    }
};

if (program.components && exists(installc)) {
    exec(installc, function(err, stdout, stderr) {
        if (stdout.length) console.log(stdout);
        if (stderr.length) return console.log(stderr), process.exit(1);
        if (err != null) return console.log(err), process.exit(1);
    });
};
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help