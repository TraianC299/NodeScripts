// funtion to copy text to clipboard in nodejs with es6
import { spawn } from 'child_process';

export const pbcopy = (data: any) => {
  const proc = spawn('pbcopy');
  proc.stdin.write(JSON.stringify(data));
  proc.stdin.end();
};
