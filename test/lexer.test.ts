import { tokenize, TokenType } from "../src/lexer";
import assert from "assert";

async function runTests() {
  const sourceCode = "let x = 5";
  const tokens = tokenize(sourceCode);

  assert.strictEqual(tokens.length, 4, "Token count should be 4");
  assert.deepStrictEqual(tokens[0], { value: "let", type: TokenType.Let });
  assert.deepStrictEqual(tokens[1], { value: "x", type: TokenType.Identifier });
  assert.deepStrictEqual(tokens[2], { value: "=", type: TokenType.Equals });
  assert.deepStrictEqual(tokens[3], { value: "5", type: TokenType.Number });
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
