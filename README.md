nubo-cli
========

Nubo CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nubo-cli.svg)](https://npmjs.org/package/nubo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nubo-cli.svg)](https://npmjs.org/package/nubo-cli)
[![License](https://img.shields.io/npm/l/nubo-cli.svg)](https://github.com/nubodev/nubo-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nubo-cli
$ nubo COMMAND
running command...
$ nubo (-v|--version|version)
nubo-cli/0.0.1-test darwin-x64 node-v14.16.0
$ nubo --help [COMMAND]
USAGE
  $ nubo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nubo hello [FILE]`](#nubo-hello-file)
* [`nubo help [COMMAND]`](#nubo-help-command)

## `nubo hello [FILE]`

describe the command here

```
USAGE
  $ nubo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nubo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/nubodev/nubo-cli/blob/v0.0.1-test/src/commands/hello.ts)_

## `nubo help [COMMAND]`

display help for nubo

```
USAGE
  $ nubo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
