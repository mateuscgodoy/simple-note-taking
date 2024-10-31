import { OPS } from '../models/OPS.js';
import CreateCommand from './CreateCommand.js';
import ExitCommand from './ExitCommand.js';
import ICommand from './ICommand.js';
import ReadCommand from './ReadCommand.js';

const commandMap = new Map<OPS, ICommand>();
commandMap.set(OPS.CREATE, new CreateCommand());
commandMap.set(OPS.READ, new ReadCommand());
commandMap.set(OPS.EXIT, new ExitCommand());

export default commandMap;
