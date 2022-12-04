import {readFileSync, createReadStream, writeFileSync} from 'fs';
import {createInterface} from 'readline';
import lineByLine from 'n-readlines';

function writeJsonDataToFile<T>(filePath: string, data: T): void {
  const file = writeFileSync(filePath, JSON.stringify(data));
}

function readFileAndParseJson<T>(filePath: string): T[] | undefined {
  const file = readFileSync(filePath);
  const json: T[] = JSON.parse(file.toString());
  return json;
}

function readFileAndReturnObjectSync<T>(stringToFind: string, filePath: string): T | undefined {
  const liner = new lineByLine(filePath);
  let line;
  while ((line = liner.next())) {
    const lineString = line.toString('utf8');
    if (lineString.includes(stringToFind)) {
      const jsonObject: T = JSON.parse(lineString.trim().slice(0, -1));
      return jsonObject;
    }
  }
}

async function readFileAndReturnObject<T>(stringToFind: string, filePath: string): Promise<T | undefined> {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.includes(stringToFind)) {
      const jsonObject: T = JSON.parse(line.trim().slice(0, -1));
      return jsonObject;
    }
  }
}

export {readFileAndParseJson, readFileAndReturnObjectSync, readFileAndReturnObject};
