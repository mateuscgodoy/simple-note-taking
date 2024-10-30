import path from 'node:path';
import filenamify from 'filenamify';
import slugify from 'slugify';

import Note from '../models/Note.js';
import FileService from './FileService.js';

export type OperationResult = {
  succeed: boolean;
  message?: string;
};

/**
 * Encapsulates CRUD operations on Notes
 */
export default class NoteService {
  private fileService: FileService;
  private notesDirPath: string;
  private controlFilePath: string;

  constructor(fileService: FileService) {
    this.notesDirPath = path.resolve(process.cwd(), 'notes');
    this.controlFilePath = path.join(this.notesDirPath, '__control-notes.txt');
    this.fileService = fileService;
    this.fileService.setControlFiles(this.notesDirPath, this.controlFilePath);
  }

  async createNote(
    displayTitle: string,
    content: string
  ): Promise<OperationResult> {
    const filename = await this.logFileNames(displayTitle);
    const filePath = this.generateFilePath(filename);
    const noteText = `${displayTitle}\n\n${content}`;
    try {
      await this.fileService.writeToFile(filePath, noteText);
      return { succeed: true, message: 'New note created with success! ✅' };
    } catch (error) {
      const output = {
        succeed: false,
        message: 'An error occurred while trying to create the note',
      };
      if (error instanceof Error) {
        output.message = error.message;
      }
      return output;
    }
  }

  private async listAllNotes(): Promise<string[]> {
    const data = await this.fileService.readFile(this.controlFilePath);
    const displayTitles = data
      .split('\n')
      .filter((line) => line)
      .map((line) => line.split(',').map((pair) => pair.split('=')[1])[0]);

    return displayTitles;
  }

  private async readNote(displayTitle: string): Promise<string | undefined> {
    const filePath = this.generateFilePath(this.generateFilename(displayTitle));
    const data = await this.fileService.readFile(filePath);
    return data;
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
    return slugify.default(filenamify(displayName), { lower: true }) + '.txt';
  }

  private async logFileNames(displayName: string): Promise<string> {
    const filename = this.generateFilename(displayName);
    await this.fileService.appendToFile(
      this.controlFilePath,
      `display=${displayName},filename=${filename}\n`
    );
    return filename;
  }
}
