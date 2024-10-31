import { OPS } from '../models/OPS.js';
import NoteService, { OperationResult } from '../services/NoteService.js';
import PromptService from '../services/PromptService.js';

export default interface ICommand {
  operation: OPS;
  execute(
    noteService: NoteService,
    promptService: PromptService
  ): OperationResult | Promise<OperationResult>;
}
