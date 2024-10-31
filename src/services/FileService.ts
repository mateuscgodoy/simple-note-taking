import * as fs from 'node:fs/promises';
import { existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

import FileServiceError from '../models/FileServiceError.js';

/**
 * Responsible for File System access and operations
 */
export default class FileService {
  /**
   * Create Notes directory and control file for NoteService internal operations
   * @param notesDirPath {string} Path to the directory that stores Notes
   * @param controlFilePath {string} Path to the control file for Notes
   */
  setControlFiles(notesDirPath: string, controlFilePath: string) {
    this.validateFilePath(notesDirPath);
    this.validateFilePath(controlFilePath);

    if (!existsSync(notesDirPath)) {
      mkdirSync(notesDirPath);
    }
    if (!this.fileExists(controlFilePath)) {
      writeFileSync(controlFilePath, '');
    }
  }

  /**
   * Creates a new file and add some content to it
   * @param filePath {string}
   * @param data {string} The new files content
   */
  async createFile(filePath: string, data: string = '') {
    try {
      this.validateFilePath(filePath);
      await fs.writeFile(filePath, data, { flag: 'wx' });
    } catch (error) {
      if (!(error instanceof FileServiceError)) {
        throw new FileServiceError(
          'Error: file creation failed',
          'CREATE_FILE',
          filePath
        );
      }
    }
  }

  /**
   * Read a file asynchronously and returns its content
   * @param filePath {string} A valid file path
   * @returns {string} The contents from the file
   */
  async readFile(filePath: string): Promise<string> {
    this.validateFilePath(filePath);

    if (!this.fileExists(filePath)) {
      throw new FileServiceError(
        'Error: the file asked does not exist',
        'READ_FILE',
        filePath
      );
    }
    const data = await fs.readFile(filePath);
    return data.toString();
  }

  /**
   * Asynchronously write to a specified file path overwriting any contents
   * @param filePath {string} A valid file path
   * @param data The content to write on the file
   */
  async writeToFile(filePath: string, data: string) {
    try {
      this.validateFilePath(filePath);
      await fs.writeFile(filePath, data);
    } catch (error) {
      if (!(error instanceof FileServiceError)) {
        throw new FileServiceError(
          'Error: failed to write the file',
          'WRITE_FILE',
          filePath
        );
      }
      throw error;
    }
  }

  /**
   * Asynchronously append content to a file, creating it if it does not exist
   * @param filePath A valid file path
   * @param data The content to append to a file
   */
  async appendToFile(filePath: string, data: string) {
    try {
      this.validateFilePath(filePath);
      await fs.appendFile(filePath, data);
    } catch (error) {
      if (!(error instanceof FileServiceError)) {
        throw new FileServiceError(
          'Error: failed while appending to file',
          'APPEND_FILE',
          filePath
        );
      }
    }
  }

  /**
   * Calls unlink function File System module on a given file
   * @param filePath A valid file path
   */
  async deleteFile(filePath: string) {
    try {
      this.validateFilePath(filePath);
      await fs.unlink(filePath);
    } catch (error) {
      if (!(error instanceof FileServiceError)) {
        throw new FileServiceError(
          'Error: failed to delete the file',
          'DELETE_FILE',
          filePath
        );
      }
    }
  }

  /**
   * Utility function that verify if a file exists or not
   * @param filePath {string} A valid file path
   * @returns {boolean} Whether or not the file exists
   */
  fileExists(filePath: string): boolean {
    try {
      statSync(filePath);
      return true;
    } catch (error: any) {
      const { code } = error;
      if (code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Checks if a file path is valid throwing an error if it is not
   * @param filePath A valid file path
   * @returns {boolean} True when the file path is valid
   * @throws {FileServiceError} When the path is invalid
   */
  private validateFilePath(filePath: string): boolean {
    if (!path.isAbsolute(filePath)) {
      throw new FileServiceError(
        'Error: file path provided is invalid',
        'INVALID_PATH',
        filePath
      );
    }
    return true;
  }
}
