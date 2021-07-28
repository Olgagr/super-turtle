import {INTERPRETER_COMMANDS} from '../../interfaces/interpreter-commands.interface';

export function isValidInstruction(instruction: string): boolean {
  if (!instruction) return false;
  return Object.values(INTERPRETER_COMMANDS).includes(
    instruction.toLowerCase().trim() as INTERPRETER_COMMANDS
  );
}
