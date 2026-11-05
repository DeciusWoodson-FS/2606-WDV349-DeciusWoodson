import Quest from "../models/Quest.js";

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Daily quests reset once the calendar day rolls over.
async function resetIfNewDay(user) {
  const now = new Date();
  if (!isSameDay(user.questsResetAt, now)) {
    user.completedQuestKeys = [];
    user.questsResetAt = now;
    await user.save();
  }
}

export async function getQuests(req, res) {
  await resetIfNewDay(req.user);
  const quests = await Quest.find().sort({ key: 1 });
  res.json(
    quests.map((quest) => ({
      id: quest.key,
      title: quest.title,
      xpReward: quest.xpReward,
      completed: req.user.completedQuestKeys.includes(quest.key),
    }))
  );
}

export async function completeQuest(req, res) {
  const key = Number(req.params.key);
  if (!Number.isInteger(key)) {
    return res.status(400).json({ error: "Quest key must be a number" });
  }

  const quest = await Quest.findOne({ key });
  if (!quest) {
    return res.status(404).json({ error: `No quest with key ${key}` });
  }

  const { user } = req;
  await resetIfNewDay(user);
  if (user.completedQuestKeys.includes(key)) {
    return res.status(400).json({ error: "Quest already completed today" });
  }

  user.completedQuestKeys.push(key);
  user.awardXP(quest.xpReward);
  await user.save();

  res.json({
    completedQuestKeys: user.completedQuestKeys,
    level: user.level,
    xp: user.xp,
  });
}
