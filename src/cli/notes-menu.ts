import { select } from '@inquirer/prompts';

export enum OPS {
  CREATE,
  READ_ALL,
  READ_ONE,
  UPDATE,
  DELETE,
  EXIT,
}

export type Choice = {
  name: string;
  value: string;
  description?: string;
};

export default class NotesMenu {
  private message = 'Enter the number of the option desired from the menu:';
  private choices: Choice[] = [
    { name: 'Create a note', value: OPS[OPS.CREATE] },
    { name: 'Read all notes', value: OPS[OPS.READ_ALL] },
    { name: 'Read one note', value: OPS[OPS.READ_ONE] },
    { name: 'Update a note', value: OPS[OPS.UPDATE] },
    { name: 'Delete a note', value: OPS[OPS.DELETE] },
    { name: 'Exit', value: OPS[OPS.EXIT] },
  ];

  async render() {
    return await select({
      message: this.message,
      choices: this.choices,
    });
  }
}
