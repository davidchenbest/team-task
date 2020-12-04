function formatName(str) {
  str = str.trim().toLowerCase();
  str = str[0].toUpperCase() + str.substring(1, str.length);
  return str;
}

module.exports = formatName;
