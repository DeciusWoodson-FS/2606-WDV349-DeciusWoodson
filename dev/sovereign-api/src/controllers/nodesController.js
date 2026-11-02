import Node from "../models/Node.js";

const XP_PER_NODE = 100;
const XP_PER_APEX_NODE = 300;

function prereqsMet(node, masteredNodeKeys) {
  return node.prerequisites.every((key) => masteredNodeKeys.includes(key));
}

// Status is computed per request from the user's progress, never stored on the
// Node itself, since the same node is locked for one user and mastered for another.
function statusFor(node, masteredNodeKeys) {
  if (masteredNodeKeys.includes(node.key)) return "mastered";
  return prereqsMet(node, masteredNodeKeys) ? "available" : "locked";
}

export async function getNodes(req, res) {
  const nodes = await Node.find().sort({ key: 1 });
  res.json(
    nodes.map((node) => ({
      id: node.key,
      name: node.name,
      muscleGroup: node.muscleGroup,
      description: node.description,
      x: node.x,
      y: node.y,
      isApex: node.isApex,
      prerequisites: node.prerequisites,
      status: statusFor(node, req.user.masteredNodeKeys),
    }))
  );
}

// The core unlock loop: check prerequisites, award XP (handling level-ups),
// and report which nodes became available because of this one.
export async function masterNode(req, res) {
  const key = Number(req.params.key);
  if (!Number.isInteger(key)) {
    return res.status(400).json({ error: "Node key must be a number" });
  }

  const node = await Node.findOne({ key });
  if (!node) {
    return res.status(404).json({ error: `No node with key ${key}` });
  }

  const { user } = req;
  if (user.masteredNodeKeys.includes(key)) {
    return res.status(400).json({ error: "Node already mastered" });
  }
  if (!prereqsMet(node, user.masteredNodeKeys)) {
    return res.status(400).json({ error: "Prerequisites not met" });
  }

  const masteredBefore = [...user.masteredNodeKeys];
  user.masteredNodeKeys.push(key);
  user.awardXP(node.isApex ? XP_PER_APEX_NODE : XP_PER_NODE);
  await user.save();

  const allNodes = await Node.find();
  const newlyUnlocked = allNodes
    .filter(
      (n) =>
        !user.masteredNodeKeys.includes(n.key) &&
        !prereqsMet(n, masteredBefore) &&
        prereqsMet(n, user.masteredNodeKeys)
    )
    .map((n) => n.key);

  res.json({
    masteredNodeKeys: user.masteredNodeKeys,
    level: user.level,
    xp: user.xp,
    newlyUnlocked,
  });
}
