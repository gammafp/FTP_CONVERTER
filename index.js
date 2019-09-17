#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const fse = require('fs-extra');

const pjson = require('./package.json');

program
    .version(pjson.version);

program
    .command('convert [args...]')
    .action((type) => {
        if (type.length === 0) {
            console.log(chalk.red('Necesitas agreagar los dos argumentos: ') + 'freetp ' + chalk.yellow('file1.json'));
        } else {
            const [ json1 ] = type;

            fse.readJSON(json1, (err, json) => {
                if (err) console.error(err);

                const file_json_2 = {
                    "frames": []
                };
                json.textures[0].frames.map(files => {
                    file_json_2.frames.push({
                        "filename": files.filename.replace(/ /g, '_'),
                        "frame": files.frame,
                        "trimmed": files.trimmed,
                        "rotated": files.rotated
                    });
                });
               
                fse.writeFile(`./${json1}`, JSON.stringify(file_json_2, null, '   '), function (err) {
                    if (err) throw err;
                    console.log(chalk.blue('Saved!'));
                  });
            });
            
        }
    });

program.parse(process.argv)