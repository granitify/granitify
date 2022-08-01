function snippetSearcher (text){
  const codeblocks = [];
  const codebits = [];

  
  const string = text.split('```');
  console.log(string);
  const blockremainder = [];    
  for (let i = 0; i < string.length; i++){
    console.log(i + ' ' + string[i]);
    if (i % 2 === 1) codeblocks.push(string[i])
    if (i % 2 === 0) blockremainder.push(string[i])
  }
  console.log(blockremainder)
  const bitstring = blockremainder.join('').split('`')
  console.log(bitstring)
const bitremainder = [];
  for (let i = 0; i < bitstring.length; i++){
    console.log(i + ' ' + bitstring[i]);
    if (i % 2 === 1) codebits.push(bitstring[i])
    if (i % 2 === 0) bitremainder.push(bitstring[i])
  }
  console.log('not code: ', bitremainder)
  console.log('code blocks:', codeblocks)
   console.log('code bits:', codebits)
  return [codeblocks, codebits, bitremainder];
}

module.exports = snippetSearcher;