import { OPS } from '../models/OPS.js';
import NoteService, { OperationResult } from '../services/NoteService.js';
import PromptService from '../services/PromptService.js';
import ICommand from './ICommand.js';

export default class UpdateCommand implements ICommand {
  private _operation: OPS = OPS.UPDATE;
  get operation() {
    return this._operation;
  }

  async execute(
    noteService: NoteService,
    promptService: PromptService
  ): Promise<OperationResult> {
    const displayTitles = await noteService.listAllNotes();

    const chosenTitle = await promptService.getNoteTitleChoice(displayTitles);
    const { data } = await noteService.readNote(chosenTitle);
    const oldContent = data?.split('\n\n')[1];

    const title = await promptService.getTitle(chosenTitle);
    const content = await promptService.getContent(oldContent);

    return await noteService.updateNote(chosenTitle, { title, content });
  }
}
