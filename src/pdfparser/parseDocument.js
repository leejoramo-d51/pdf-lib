import parseHeader from './parseHeader';
import parseIndirectObj from './parseIndirectObj';
import parseXRefTable from './parseXRefTable';
import parseTrailer from './parseTrailer';
import removeComments from './removeComments';

const parseDocument = (input, parseHandlers) => {
  console.log('parsing document')

  // TODO: Figure out way to clean comments without stream content messing it up
  // const cleaned = removeComments(input);

  const cleaned = input;
  const [header, r1] = parseHeader(cleaned, parseHandlers);

  let remainder = r1;
  while (true) {
    const result = parseIndirectObj(remainder, parseHandlers);
    if (!result) break;
    const [indirectObj, r2 ] = result;
    remainder = r2;
  }

  const [xref, r3] = parseXRefTable(remainder, parseHandlers);
  const [trailer, r4] = parseTrailer(r3, parseHandlers);
  console.log('done')
}

export default parseDocument;