#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './components/App';
import { HELP_TEXT } from './lib/help';

const cli = meow(HELP_TEXT);

render(<App cli={cli} />);
