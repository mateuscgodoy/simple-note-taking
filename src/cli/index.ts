import NotesMenu from './notes-menu.js';

export default async function notesCLI() {
  const menu = new NotesMenu();
  const answer = await menu.render();
  console.log(`You've picked ${answer}`);
}
