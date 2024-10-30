import path from 'node:path';
import filenamify from 'filenamify';

import Note from '../models/Note.js';
import FileService from './FileService.js';
import { OPS } from '../models/OPS.js';

/**
 * Encapsulates CRUD operations on Notes
 */
export default class NoteService {
  private fileService: FileService;
  private notesDirPath: string;
  private controlFilePath: string;
  private _operations: Map<OPS, any> = new Map();

  constructor(fileService: FileService) {
    this.notesDirPath = path.resolve(process.cwd(), 'notes');
    this.controlFilePath = path.join(this.notesDirPath, '__control-notes.txt');
    this.fileService = fileService;
    this.fileService.setControlFiles(this.notesDirPath, this.controlFilePath);
    this._operations.set(OPS.CREATE, this.createNote.bind(this));
    this._operations.set(OPS.LIST_ALL, this.listAllNotes.bind(this));
    this._operations.set(OPS.READ_ONE, this.readNote.bind(this));
    this._operations.set(OPS.UPDATE, this.updateNote.bind(this));
    this._operations.set(OPS.DELETE, this.deleteNote.bind(this));
  }

  get operations() {
    return this._operations;
  }

  private async logFileNames(displayName: string): Promise<string> {
    const filename = this.generateFilename(displayName);
    await this.fileService.appendToFile(
      this.controlFilePath,
      `display=${displayName},filename=${filename}\n`
    );
    return filename;
  }

  private async createNote(
    displayTitle: string,
    content: string
  ): Promise<void> {
    // Probably validation here
    const filename = await this.logFileNames(displayTitle);
    const filePath = this.generateFilePath(filename);
    const noteText = `${displayTitle}\n\n${content}`;
    await this.fileService.writeToFile(filePath, noteText);
  }

  private listAllNotes(): Note[] | undefined {
    // TODO read all
    return undefined;
    throw new Error('Not implemented');
  }

  private readNote(displayTitle: string): Note | undefined {
    // TODO read a note
    throw new Error('Not implemented');
  }

  private updateNote(displayTitle: string, updatedNote: Note): void {
    // TODO update note
    throw new Error('Not implemented');
  }

  private deleteNote(displayTitle: string) {
    // TODO delete note
    throw new Error('Not implemented');
  }

  private generateFilePath(filename: string): string {
    return path.join(this.notesDirPath, filename);
  }

  private generateFilename(displayName: string) {
    return filenamify(displayName) + '.txt';
  }
}
