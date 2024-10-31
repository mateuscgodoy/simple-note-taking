import { OPS } from '../models/OPS.js';
import CreateCommand from './CreateCommand.js';
import DeleteCommand from './DeleteCommand.js';
import ExitCommand from './ExitCommand.js';
import ICommand from './ICommand.js';
import ReadCommand from './ReadCommand.js';
import UpdateCommand from './UpdateCommand.js';

const commandMap = new Map<OPS, ICommand>();
commandMap.set(OPS.CREATE, new CreateCommand());
commandMap.set(OPS.READ, new ReadCommand());
commandMap.set(OPS.UPDATE, new UpdateCommand());
commandMap.set(OPS.DELETE, new DeleteCommand());
commandMap.set(OPS.EXIT, new ExitCommand());

export default commandMap;
