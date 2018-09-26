import Vorpal = require('vorpal');

const vorpal = new Vorpal();

enum languages {
    Node = "Node.js",
    Php = "PHP",
    Python = "Python"
}

vorpal
    .command('travisbot generate', 'Generate a travisCI config for a certain language')
    .action(function (args, cb) {
        const self: any = this;
        this.prompt({
            type: 'list',
            name: 'lang',
            message: 'What language is your project?',
            choices: Object.keys(languages).map(k => languages[k as any])
        }, function(result) {
            self.log(`🌍 Using ${result.lang} for project`)

            if (result.lang === languages.Node) {
                nodeHandler();
            } else if (result.lang === languages.Php) {
                phpHandler();
            } else if (result.lang === languages.Python) {
                pythonHandler();
            }
        });
    })


const nodeHandler = () => {}
const phpHandler = () => {}
const pythonHandler = () => {}

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
