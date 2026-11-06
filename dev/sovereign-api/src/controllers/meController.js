import Node from "../models/Node.js";

const RECENT_MASTERIES_LIMIT = 5;

export async function getMe(req, res) {
  const { user } = req;

  // Masteries are stored oldest first, so the last entries are the newest.
  const recent = user.masteries.slice(-RECENT_MASTERIES_LIMIT).reverse();
  const nodes = await Node.find({ key: { $in: recent.map((m) => m.nodeKey) } });
  const nameByKey = new Map(nodes.map((node) => [node.key, node.name]));

  res.json({
    userId: user.userId,
    displayName: user.displayName,
    level: user.level,
    xp: user.xp,
    xpToNextLevel: user.level * 100,
    masteredNodeKeys: user.masteredNodeKeys,
    recentMasteries: recent.map((m) => ({
      id: m.nodeKey,
      name: nameByKey.get(m.nodeKey),
      masteredAt: m.masteredAt,
    })),
  });
}
