import { input } from '@inquirer/prompts';

import NoteService, { OperationResult } from '../services/NoteService.js';
import validateStringLength from '../utils/validateStringInput.js';
import ICommand from './ICommand.js';
import { OPS } from '../models/OPS.js';

export default class CreateCommand implements ICommand {
  private _operation: OPS = OPS.CREATE;

  get operation() {
    return this._operation;
  }

  async execute(noteService: NoteService): Promise<OperationResult> {
    const displayTitle = await input({
      message: 'Enter the title of your note:',
      required: true,
      validate: (value) => validateStringLength(value),
    });
    const content = await input({
      message: 'Enter the content of your note (max. 500 characters):',
      required: true,
      validate: (value) => validateStringLength(value, 500),
    });
    return await noteService.createNote(displayTitle, content);
  }
}
