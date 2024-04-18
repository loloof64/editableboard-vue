export function cellAlgebraic(file: number, rank: number) {
  return `${String.fromCharCode("a".charCodeAt(0) + file)}${String.fromCharCode(
    "1".charCodeAt(0) + rank
  )}`;
}

export function getPieces(positionFen: string) {
  const piecesPart = positionFen.split(" ")[0];
  const lines = piecesPart.split("/");
  return lines.map(piecesLineToArray).toReversed();
}

export function getBoardPosition(piecesArray: Array<Array<string>>, whiteTurn: boolean) {
  return piecesArray.map(arrayToPiecesLine).toReversed().join("/") + (whiteTurn ? " w" : " b") + " - - 0 1";
}

export function getPieceAt(
  positionFen: string,
  file: number,
  rank: number
): string {
  const values = getPieces(positionFen);
  const pieceValue = values[rank][file];
  return pieceValue;
}

function isDigit(elem: string) {
  const asciiCode = elem.charCodeAt(0);
  const _0Code = "0".charCodeAt(0);
  const _9Code = "9".charCodeAt(0);
  return asciiCode >= _0Code && asciiCode <= _9Code;
}

function holesArray(countString: string): string[] {
  const count = parseInt(countString);
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push("");
  }
  return result;
}

function piecesLineToArray(piecesLine: string): string[] {
  return piecesLine.split("").flatMap((elem) => {
    return isDigit(elem) ? holesArray(elem) : elem;
  });
}

function arrayToPiecesLine(array: Array<string>): string {
  return array.reduce((acc: string, current: string) => {
    if (current === "") {
      const lastAccElt = acc.charAt(acc.length - 1);
      if (isDigit(lastAccElt)) {
        const newDigit = parseInt(lastAccElt) + 1;
        return acc.substring(0, acc.length - 1) + newDigit;
      }
      else {
        return acc + "1";
      }
    }
    else {
      return acc + current;
    }
  }, "");
}

export function isWhitePawnAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "P";
}

export function isWhiteKnightAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "N";
}

export function isWhiteBishopAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "B";
}

export function isWhiteRookAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "R";
}

export function isWhiteQueenAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "Q";
}

export function isWhiteKingAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "K";
}

export function isBlackPawnAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "p";
}

export function isBlackKnightAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "n";
}

export function isBlackBishopAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "b";
}

export function isBlackRookAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "r";
}

export function isBlackQueenAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "q";
}

export function isBlackKingAtCell(
  positionFen: string,
  file: number,
  rank: number
) {
  const piece = getPieceAt(positionFen, file, rank);
  if (piece === undefined) return false;
  return piece === "k";
}
