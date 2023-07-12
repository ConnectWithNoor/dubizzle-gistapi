function trimSentence(sentence) {
  const newSentence = `${sentence.substring(0, 99)}...`;
  return newSentence;
}

function trimFileName(fileName) {
  const newFileName = `${fileName.substring(0, 40)}`;
  return newFileName;
}

export { trimSentence, trimFileName };
