/* export const colors: { [key: string]: string } = {
  BOLD: "\x1b[1m%s\x1b[0m",
  BLACK: "\x1b[30m%s\x1b[0m",
  RED: "\x1b[31m%s\x1b[0m",
  GREEN: "\x1b[32m%s\x1b[0m",
  YELLOW: "\x1b[33m%s\x1b[0m",
  BLUE: "\x1b[34m%s\x1b[0m",
  MAGENTA: "\x1b[35m%s\x1b[0m",
  CYAN: "\x1b[36m%s\x1b[0m",
  WHITE: "\x1b[37m%s\x1b[0m",
  ORANGE: "\x1b[33m%s\x1b[0m",
}; */

type ColorFunction = (text: string) => string;

export const colors: { [key: string]: ColorFunction } = {
  RESET: (text: string) => `\x1b[0m${text}\x1b[0m`,
  BOLD: (text: string) => `\x1b[1m${text}\x1b[0m`,
  DIM: (text: string) => `\x1b[2m${text}\x1b[0m`,
  ITALIC: (text: string) => `\x1b[3m${text}\x1b[0m`,
  UNDERLINE: (text: string) => `\x1b[4m${text}\x1b[0m`,
  BLINK: (text: string) => `\x1b[5m${text}\x1b[0m`,
  INVERSE: (text: string) => `\x1b[7m${text}\x1b[0m`,
  HIDDEN: (text: string) => `\x1b[8m${text}\x1b[0m`,
  STRIKETHROUGH: (text: string) => `\x1b[9m${text}\x1b[0m`,
  BLACK: (text: string) => `\x1b[30m${text}\x1b[0m`,
  RED: (text: string) => `\x1b[31m${text}\x1b[0m`,
  GREEN: (text: string) => `\x1b[32m${text}\x1b[0m`,
  YELLOW: (text: string) => `\x1b[33m${text}\x1b[0m`,
  BLUE: (text: string) => `\x1b[34m${text}\x1b[0m`,
  MAGENTA: (text: string) => `\x1b[35m${text}\x1b[0m`,
  CYAN: (text: string) => `\x1b[36m${text}\x1b[0m`,
  WHITE: (text: string) => `\x1b[37m${text}\x1b[0m`,
  BRIGHT_BLACK: (text: string) => `\x1b[90m${text}\x1b[0m`,
  BRIGHT_RED: (text: string) => `\x1b[91m${text}\x1b[0m`,
  BRIGHT_GREEN: (text: string) => `\x1b[92m${text}\x1b[0m`,
  BRIGHT_YELLOW: (text: string) => `\x1b[93m${text}\x1b[0m`,
  BRIGHT_BLUE: (text: string) => `\x1b[94m${text}\x1b[0m`,
  BRIGHT_MAGENTA: (text: string) => `\x1b[95m${text}\x1b[0m`,
  BRIGHT_CYAN: (text: string) => `\x1b[96m${text}\x1b[0m`,
  BRIGHT_WHITE: (text: string) => `\x1b[97m${text}\x1b[0m`,
};

// Ejemplo de uso
//console.log(colors.RED("Este texto es rojo"));
//console.log(colors.GREEN("Este texto es verde"));
//console.log(colors.BOLD("Este texto es negrita"));
