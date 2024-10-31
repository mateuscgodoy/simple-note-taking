import NoteService, { OperationResult } from '../services/NoteService.js';
import ICommand from './ICommand.js';
import { OPS } from '../models/OPS.js';
import PromptService from '../services/PromptService.js';

export default class CreateCommand implements ICommand {
  private _operation: OPS = OPS.CREATE;

  get operation() {
    return this._operation;
  }

  async execute(
    noteService: NoteService,
    promptService: PromptService
  ): Promise<OperationResult> {
    const displayTitle = await promptService.getTitle();
    const content = await promptService.getContent();
    return await noteService.createNote(displayTitle, content);
  }
}
