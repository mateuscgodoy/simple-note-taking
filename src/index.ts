#!/usr/bin/env node

import MessageLogger from './cli/MessageLogger.js';
import { OPS } from './models/OPS.js';
import FileService from './services/FileService.js';
import NoteService from './services/NoteService.js';
import commandMap from './commands/commandMap.js';
import PromptService from './services/PromptService.js';

main();

async function main() {
  const messages = new MessageLogger();
  const prompt = new PromptService();

  const noteService = new NoteService(new FileService());

  messages.printWelcomeMessage();

  let operation;
  do {
    operation = await prompt.getAppMenuChoice();
    const command = commandMap.get(operation);
    if (!command) {
      console.error('Invalid command. Please try again');
      continue;
    }
    const opResult = await command.execute(noteService, prompt);
    messages.renderOperationResult(opResult);
  } while (operation !== OPS.EXIT);

  messages.printGoodByeMessage();
}
