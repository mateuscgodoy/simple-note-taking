import { input, select } from '@inquirer/prompts';

import Note from '../models/Note.js';
import { OPS } from '../models/OPS.js';

/**
 * Responsible for displaying information on the console
 * and collecting user inputs
 */
export default class PromptHandler {
  async renderMenu(): Promise<OPS> {
    const choices = [
      {
        name: 'Create a new note',
        value: OPS.CREATE,
      },
      {
        name: 'List all notes',
        value: OPS.LIST_ALL,
      },
      {
        name: 'Read a note',
        value: OPS.READ_ONE,
      },
      {
        name: 'Edit a note',
        value: OPS.UPDATE,
      },
      {
        name: 'Delete a note',
        value: OPS.DELETE,
      },
      {
        name: 'Exit',
        value: OPS.EXIT,
      },
    ];
    return await select({ message: 'Please choose an option below:', choices });
  }

  async getInput<T>(prompt: string): Promise<T> {
    const answer = await input({ message: prompt });
    return answer as T;
  }

  renderNote(note: Note): void {
    console.log(`Title: ${note.title}`);
    console.log(`${note.content ? note.content : ''}`);
  }

  async renderNotesTitles(notes: Note[]): Promise<Note | undefined> {
    if (!notes.length) {
      console.log('There are no notes yet. Try adding some! ⭐');
      return;
    }

    console.clear();
    console.log('📝 NOTES TITLES 📝');
    const choices = notes.map((note) => ({ value: note, name: note.title }));
    const answer: Note = await select({
      message: 'Choose which note you would like to see',
      choices,
    });
    return answer;
  }
}
