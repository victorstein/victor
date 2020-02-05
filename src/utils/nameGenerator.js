export const nameGenerator = (text) => {
  const newText = text
    .replace(/o|O/g, '0')
    .replace(/a|A/g, '@')
    .replace(/i|I/g, '¡')
    .replace(/e|E/g, '3')
    .replace(/s|S/g, '$')
    .replace(/u|U/g, '#')
    .substr(0, 12)
  return (newText.concat('_Usr'))
}
