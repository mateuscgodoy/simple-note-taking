import { OPS } from '../models/OPS.js';
import NoteService, { OperationResult } from '../services/NoteService.js';
import PromptService from '../services/PromptService.js';
import ICommand from './ICommand.js';

export default class ReadCommand implements ICommand {
  private _operation: OPS = OPS.READ;
  get operation() {
    return this._operation;
  }
  async execute(
    noteService: NoteService,
    promptService: PromptService
  ): Promise<OperationResult> {
    const displayTitles = await noteService.listAllNotes();
    if (!displayTitles.length) {
      return {
        succeed: true,
        message: 'There are no notes yet. Try adding some! ⭐',
      };
    }
    const title = await promptService.getNoteTitleChoice(displayTitles);

    return await noteService.readNote(title);
  }
}
