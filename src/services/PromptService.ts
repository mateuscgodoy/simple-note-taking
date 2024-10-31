import { input, select } from '@inquirer/prompts';

import validateStringLength from '../utils/validateStringInput.js';
import { OPS } from '../models/OPS.js';

export default class PromptService {
  async getTitle(): Promise<string> {
    return await input({
      message: 'Enter the title of your note:',
      required: true,
      validate: (value) => validateStringLength(value),
    });
  }

  async getContent(): Promise<string> {
    return await input({
      message: 'Enter the content of your note (max. 500 characters):',
      required: true,
      validate: (value) => validateStringLength(value, 500),
    });
  }

  async getAppMenuChoice(): Promise<OPS> {
    const choices = [
      {
        name: 'Create a new note',
        value: OPS.CREATE,
      },
      {
        name: 'Read a note',
        value: OPS.READ,
      },
      {
        name: 'Update a note',
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

  async getNoteTitleChoice(displayTitles: string[]): Promise<string> {
    console.clear();
    console.log('📝 NOTES TITLES 📝');
    const choices = displayTitles.map((title) => ({
      value: title,
      name: title,
    }));

    const answer: string = await select({
      message: 'Choose which note you would like to see',
      choices,
    });
    return answer;
  }
}
