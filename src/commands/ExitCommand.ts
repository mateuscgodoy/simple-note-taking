import { OPS } from '../models/OPS.js';
import NoteService, { OperationResult } from '../services/NoteService.js';
import ICommand from './ICommand.js';

export default class ExitCommand implements ICommand {
  private _operation: OPS = OPS.EXIT;

  get operation(): OPS {
    return this._operation;
  }

  execute(
    noteService: NoteService
  ): OperationResult | Promise<OperationResult> {
    return { succeed: true };
  }
}
