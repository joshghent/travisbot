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

commander
    .command('generate')
    .description('Generate a travisCI config for a certain language')
    .alias('g')
    .action(() => {
        inquirer.prompt([{
            type: 'list',
            name: 'lang',
            message: 'What language is your project?',
            choices: Object.keys(languages).map(k => languages[k as any])
        }])
        .then((result: any) => {
            console.log(`🌍 Using ${result.lang} for project`)

            if (result.lang === languages.Node) {
                nodeHandler();
            } else if (result.lang === languages.Php) {
                phpHandler();
            } else if (result.lang === languages.Python) {
                pythonHandler();
            }
        });
    });

commander
    .version(require("./../package.json").version)
    .parse(process.argv);

function nodeHandler(): void {
    const content = `language: node_js
    node_js:
      - "node"
      - "10"
      - "8"
      - "lts/*"`;
    fs.writeFileSync('.travis.yml', tabsToSpaces(content, 4));
    console.log(`⭐ Finishing writing travis config`);
}

const phpHandler = () => {
    return true;
}
const pythonHandler = () => {
    return true;
}

// Ask what language they are using

// If Node
    // Do you use yarn or npm?
// If PHP
    // Do you use composer?
// If Python
    // Which versions? (option 2 or 3)
    // Test command?

// No matter what language
    // Specify source for environment variables
