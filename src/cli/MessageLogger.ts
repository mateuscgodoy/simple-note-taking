import { input, select } from '@inquirer/prompts';

import Note from '../models/Note.js';
import { OperationResult } from '../services/NoteService.js';

/**
 * Responsible for displaying information on the console
 * and collecting user inputs
 */
export default class MessageLogger {
  renderNote(note: Note): void {
    console.log(`Title: ${note.title}`);
    console.log(`${note.content ? note.content : ''}`);
  }

  printWelcomeMessage() {
    console.clear();
    console.log('========== ⭐ WELCOME ⭐ ==========');
    console.log(
      '📌 This is a simple Note-taking App, that allows you to create files with your notes!'
    );
    console.log('👤 Created by: Mateus Colombo Godoy.');
    console.log('Lets get started!');
    console.log('===================================');
  }

  printGoodByeMessage() {
    console.clear();
    console.log('Thank you for using the app!');
    console.log('Have a wonderful day 👋😎');
  }

  renderOperationResult(opResult: OperationResult) {
    console.clear();
    if (!opResult.succeed) {
      console.error(
        opResult.message || 'Operation Aborted: Something when wrong'
      );
    } else {
      if (opResult.data) {
        console.log(opResult.data);
      } else if (opResult.message) {
        console.log(opResult.message);
      }
    }
    console.log('\n');
  }
}
