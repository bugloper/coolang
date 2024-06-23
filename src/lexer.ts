import process from "process";

export enum TokenType {
  Number,
  Identifier,
  Equals,

  OpenParen,
  CloseParen,
  BinaryOperator,

  Let,
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

export interface Token {
  value: string;
  type: TokenType;
}

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function isAlpha(src: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(src);
}

function isInt(src: any): boolean {
  return src >= "0" && src <= "9";
}

function isSkippable(str: string): boolean {
  return str == " " || str == "\n" || str == "\t";
}

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();

  const src = sourceCode.split("");

  while (src.length > 0) {
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else {
      if (isInt(src[0])) {
        let num = "";
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }

        tokens.push(token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift();
        }

        const reserved = KEYWORDS[ident];
        if (reserved == undefined) {
          tokens.push(token(ident, TokenType.Identifier));
        } else {
          tokens.push(token(ident, reserved));
        }
      } else if (isSkippable(src[0])) {
        src.shift();
      } else {
        console.log("Unrecognized character at:", src[0]);
        process.exit(1);
      }
    }
  }

  return tokens;
}
