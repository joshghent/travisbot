#!/usr/bin/env node

import commander from "commander";
import * as inquirer from "inquirer";
import fs from "fs";
const tabsToSpaces = require("tabs-to-spaces");

enum languages {
    Node = "Node.js",
    Php = "PHP",
    Python = "Python"
}

enum codeCoverageTools {
    None = "None",
    CodeCovIo = "Codecov.io",
    CodeClimate = "Code Climate",
    Coveralls = "Coveralls"
}

commander
    .command('generate')
    .description('Generate a travisCI config for a certain language')
    .alias('g')
    .action(() => {
        let content = '';
        inquirer.prompt([{
            type: 'list',
            name: 'lang',
            message: 'What language is your project?',
            choices: Object.keys(languages).map(k => languages[k as any])
        }])
        .then((result: any) => {
            console.log(`🌍 Using ${result.lang} for project`);

            if (result.lang === languages.Node) {
                content = nodeHandler();
            } else if (result.lang === languages.Php) {
                content = phpHandler();
            } else if (result.lang === languages.Python) {
                content = pythonHandler();
            }

            inquirer.prompt([{
                type: 'list',
                name: 'codecov',
                message: 'Which code coverage tool do you use?',
                choices: Object.keys(codeCoverageTools).map(k => codeCoverageTools[k as any])
            }])
            .then((result: any) => {
                if (result.codecov !== codeCoverageTools.None) {
                    console.log("Please make sure the code coverage command is run as part of your test command!");
                }

                if (result.codecov === codeCoverageTools.CodeCovIo) {
                    content += "\n\n" + `after_success:
        - bash <(curl -s https://codecov.io/bash)`;
                }

                fs.writeFileSync('.travis.yml', tabsToSpaces(content, 2));
                console.log(`⭐ Finishing writing travis config`);
            })
        });
    });

commander
    .version(require("./../package.json").version)
    .parse(process.argv);

function nodeHandler(): string {
    const content = `language: node_js
    node_js:
      - "node"
      - "10"
      - "8"
      - "lts/*"`;

    return content;
}

function phpHandler(): string {
    return `language: php
    php:
        - 7
        - 5
        - hhvm`;
}
function pythonHandler(): string {
    return `language: python
    python:
        - 2
        - 3`;
}
