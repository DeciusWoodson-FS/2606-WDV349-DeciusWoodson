export function getMe(req, res) {
  const { user } = req;
  res.json({
    userId: user.userId,
    displayName: user.displayName,
    level: user.level,
    xp: user.xp,
    xpToNextLevel: user.level * 100,
    masteredNodeKeys: user.masteredNodeKeys,
  });
}
