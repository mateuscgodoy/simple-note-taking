import * as fs from 'node:fs/promises';
import { existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import filenamify from 'filenamify';

import FileServiceError from '../models/FileServiceError.js';

/**
 * Responsible for File System access and operations
 */
export default class FileService {
  private notesDirPath: string;
  private controlFilePath: string;

  constructor() {
    this.notesDirPath = path.resolve(process.cwd(), 'notes');
    this.controlFilePath = path.join(this.notesDirPath, '__control-notes.txt');
    this.init();
  }

  private init() {
    if (!existsSync(this.notesDirPath)) {
      mkdirSync(this.notesDirPath);
    }
    if (!FileService.fileExists(this.controlFilePath)) {
      writeFileSync(this.controlFilePath, '');
    }
  }

  async createFile(filename: string, data: string) {
    const safeName = this.generateFilePath(filename);
    try {
      await fs.writeFile(safeName, data, { flag: 'wx' });
    } catch (error) {
      throw new FileServiceError('Error: file creation failed', 'CREATE_FILE');
    }
  }

  async readFile(filename: string): Promise<string> {
    const filePath = this.generateFilePath(filename);

    const fileExists = FileService.fileExists(filePath);
    if (!fileExists) {
      throw new FileServiceError(
        'Error: the file asked does not exist',
        'READ_FILE'
      );
    }
    const data = await fs.readFile(filePath);
    return data.toString();
  }

  async writeToFile(filename: string, data: string) {
    const filePath = this.generateFilePath(filename);
    try {
      await fs.writeFile(filePath, data);
    } catch (error) {
      throw new FileServiceError(
        'Error: failed to write the file',
        'WRITE_FILE'
      );
    }
  }

  static generateFilename(displayName: string) {
    return filenamify(displayName);
  }

  static fileExists(filename: URL | string): boolean {
    try {
      statSync(filename);
      return true;
    } catch (error: any) {
      const { code } = error;
      if (code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  private generateFilePath(filename: string): string {
    return path.isAbsolute(filename)
      ? filename
      : path.join(this.notesDirPath, FileService.generateFilename(filename));
  }
}
