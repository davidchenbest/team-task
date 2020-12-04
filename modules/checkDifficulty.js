function checkDifficulty(data) {
  const { difficulty, ratedDifficulty } = data;
  if (
    difficulty < 1 ||
    difficulty > 5 ||
    ratedDifficulty < 1 ||
    ratedDifficulty > 5
  ) {
    return false;
  }
  return true;
}

module.exports = checkDifficulty;
