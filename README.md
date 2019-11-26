This is a Fork of rollup-plugin-strip code that removes steal comments

i will point out in this example how to use strip-code as this don't needs any options other then includ exclude

## Getting Started
First, install `rollup-plugin-strip-code` as a development dependency:

```shell
npm i rollup-plugin-strip-code --save-dev
#or
yarn add rollup-plugin-strip-code --dev
```

## Example config
that removes //!steal-remove-start till //!steal-remove-end

Add to your `rollup.config.js`:

```js
import pkg from './package.json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

//here we are
import stripCode from "rollup-plugin-strip-code"

export default [
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: pluginName
  },
  {
    input: 'src/main.js',
    external: external,
    output: [
      {file: pkg.main, format: 'umd', name: pluginName}
    ],
    watch: {
      exclude: ['node_modules/**']
    },
    sourcemap: true,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      stripCode({
        //start_comment: 'START.TESTS_ONLY',
        //end_comment: 'END.TESTS_ONLY'
        pattern: /(\/\/\!?steal-remove-start)[\s\S]*?(\/\/\!?steal-remove-end)/g
      })
    ]
  }
];
```

WOAH-WOAH, what if I want to **remove the comments conditionnaly**?

You may use [rollup-plugin-conditional](https://github.com/AgronKabashi/rollup-plugin-conditional) plugin for that case, for instance:

```js
const isProduction = process.env.buildTarget === "production" //assuming you'd run it with something like "cross-env BABEL_ENV=production && rollup -c"
...
plugins: [
  conditional(isProduction, [
    stripCode({
      start_comment: 'START.TESTS_ONLY',
      end_comment: 'END.TESTS_ONLY'
    })
  ])
]
...
```

### Options

#### options.start_comment
Type: `String`
Default value: `start_comment`

The text inside the opening comment used to identify code to strip.

#### options.end_comment
Type: `String`
Default value: `end_comment`

The text inside the closing comment used to identify code to strip.

#### options.pattern
Type: `RegExp`
Default value: (a generated RegExp matching the start and end comments)

If the default start and end comment matching doesn't work for you needs, you can supply your own RegExp to match against. If the `pattern` option is specified, the `start_comment` and `end_comment` options are ignored.

## Tests

```shell
npm test
```

## Same plugins for another tools

 - WebPack [strip-code-loader](https://github.com/se-panfilov/strip-code-loader)
 - Grunt [grunt-strip-code](https://github.com/nuzzio/grunt-strip-code)
 - Gulp [gulp-strip-code](https://github.com/massick/gulp-strip-code)

## Contributing
Feel free and go ahead.

## License

MIT License

Copyright (c) 2017 Sergei Panfilov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
