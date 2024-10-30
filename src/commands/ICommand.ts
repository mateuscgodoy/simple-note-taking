import { OPS } from '../models/OPS.js';
import NoteService, { OperationResult } from '../services/NoteService.js';

export default interface ICommand {
  operation: OPS;
  execute(noteService: NoteService): OperationResult | Promise<OperationResult>;
}
