const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');
const { syllable } = require('syllable');

class Scratch3YourExtension {

    constructor (runtime) {
        import('syllable')
        .then((syllableModule) => {
            this.syllable = syllableModule.syllable;
        })
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo () {
        return {
            // unique ID for your extension
            id: 'yourScratchExtension',

            // name that will be displayed in the Scratch UI
            name: 'Test',



            // colours to use for your extension blocks
            color1: '#000099',
            color2: '#660066',

            //Images
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',
            menuIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DEUIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',


            // your Scratch blocks
            blocks: [
                {
                    // name of the function where your block code lives
                    opcode: 'syllableBlock',

                    // type of block - choose from:
                    //   BlockType.REPORTER - returns a value, like "direction"
                    //   BlockType.BOOLEAN - same as REPORTER but returns a true/false value
                    //   BlockType.COMMAND - a normal command block, like "move {} steps"
                    //   BlockType.HAT - starts a stack if its value changes from false to true ("edge triggered")
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'Syllables in [MY_TEXT]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    //   TargetType.SPRITE - for code in sprites
                    //   TargetType.STAGE  - for code on the stage / backdrop
                    // remove one of these if this block doesn't apply to both
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        MY_TEXT: {
                            defaultValue: 'I am a lie',

                            type: ArgumentType.STRING
                        },
                    }
                },
                {
                    // name of the function where your block code lives
                    opcode: 'myFirstBlock',

                    // type of block - choose from:
                    //   BlockType.REPORTER - returns a value, like "direction"
                    //   BlockType.BOOLEAN - same as REPORTER but returns a true/false value
                    //   BlockType.COMMAND - a normal command block, like "move {} steps"
                    //   BlockType.HAT - starts a stack if its value changes from false to true ("edge triggered")
                    blockType: BlockType.REPORTER,

                    // label to display on the block
                    text: 'Title for [BOOK_NUMBER] in ISBN Library',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    //   TargetType.SPRITE - for code in sprites
                    //   TargetType.STAGE  - for code on the stage / backdrop
                    // remove one of these if this block doesn't apply to both
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        BOOK_NUMBER: {
                            defaultValue: '9781465444820',

                            type: ArgumentType.NUMBER
                        },
                    }
                },
            ]
        };
    }


    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
    myFirstBlock ({BOOK_NUMBER}) {
        // example implementation to return a string
        return fetch('https://openlibrary.org/isbn/' + BOOK_NUMBER + '.json')
        .then((response) => {
            if (response.ok){
                return response.json();
            }
            else {
                return {title: 'unknown'};
            }
        })
        .then ((bookinfo) => {
            return bookinfo.title;
        })
    }

    syllableBlock ({MY_TEXT}) {
        return this.syllable(MY_TEXT);
    }
}

module.exports = Scratch3YourExtension;
