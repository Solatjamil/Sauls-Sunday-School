/* =====================================================================
   Curriculum — tier M (Builders, ages 7-9). Units 11-20.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'david-saul-cave', title: 'David Could Have, David Did Not', tier: 'M', mode: 'story',
    track: 'values', testament: 'ot', era: 'kings', when: 39, path: 11, xp: 24,
    summary: 'David had his enemy asleep in a cave with a spear in his hand. He cut off a corner of the robe instead.',
    scripture: [{ ref: '1 Samuel 24:17', text: 'You have dealt kindly with me, but I have been your enemy. Why have you not killed me?' },
                { ref: 'Proverbs 24:17', text: 'Don’t rejoice when your enemy falls.' }],
    story: [
      'King Saul was jealous of David. He had thrown spears at him, sent soldiers after him, and made David run for years with six hundred tired men in the hills.',
      'One night Saul went into a cave to rest — not knowing that David and his men were hiding at the back of it. David’s men whispered, “This is the day God promised! He has given your enemy to you.”',
      'David crept forward with a knife. He could have ended everything in one blow. Instead he cut off a corner of Saul’s robe and his conscience hit him harder than any spear.',
      'When Saul walked out, David called after him and showed him the cut cloth from a safe distance. “Look,” he said. “I could have killed you. God handed you to me and I refused. Let God be the judge between us, not my knife.”',
      'Saul wept. He said, “You are more righteous than I am.” Then he went home. Nothing else changed that day — Saul kept hunting David for years. But David had proved something that stayed with the whole nation: an enemy is not a right.',
      'Years later, when Saul died in battle, David wrote a song of grief instead of a victory party. “How the mighty have fallen.” That is what he always did.'
    ],
    teach: ['Mercy is a choice you make when nobody could stop you.', 'Doing the right thing does not always fix the relationship.', 'David refused to touch “the Lord’s anointed” because God was still at work in Saul.'],
    quiz: [
      { t: 'mc', q: 'What did David cut off in the cave?', a: ['A corner of Saul’s robe', 'Saul’s crown', 'A spear tip', 'His own sleeve'], c: 0 },
      { t: 'mc', q: 'Why did David feel guilty even about that?', a: ['He had decided not to harm Saul at all', 'He had lost his knife', 'His men saw him', 'It was a royal robe'], c: 0, hint: 'His conscience woke up.' },
      { t: 'order', q: 'Put the cave story in order.', items: ['Saul enters the cave', 'David’s men say “God gave him to you”', 'David cuts the robe', 'David shows the cloth from a distance', 'Saul weeps and admits it'], hint: 'Cave, knife, cloth, voice.' },
      { t: 'match', q: 'Match the moment to what David did.', pairs: [['In the cave', 'Refused to kill'], ['When Saul died', 'Wrote a grief song'], ['When hunted', 'Spared the king twice']], hint: 'Same man, same habit.' },
      { t: 'sort', q: 'Sort mercy and revenge.', buckets: [{ id: 'm', name: 'Mercy' }, { id: 'r', name: 'Revenge' }], items: [{ text: 'Put down the knife', b: 'm' }, { text: 'Tell everyone when they fall', b: 'r' }, { text: 'Let God be the judge', b: 'm' }, { text: 'Finish what they started', b: 'r' }] }
    ],
    memory: { ref: 'Romans 12:21', text: 'Don’t be overcome by evil, but overcome evil with good.' },
    prayer: 'God, when I have someone at my mercy, be my mercy. Help me want their change, not their fall. Amen.',
    badge: { name: 'Cut Robe', art: 'cloak', note: 'You chose mercy over revenge.' },
    printable: {
      motif: 'coat', title: 'The corner of the robe',
      prompts: ['Draw the cave mouth with Saul asleep inside and David crouching.', 'Draw a small torn square of cloth in David’s hand.', 'Write Romans 12:21 under the picture.'],
      craft: { title: 'Mercy jar', steps: ['Cut paper into small “cloth” squares.', 'Every time you could be mean and are not, put one in.', 'At the end of the week read the squares out loud.'], note: 'Name the jar “En Gedi”, the cave’s name.' }
    }
  });

  D.push({
    id: 'elijah-fire', title: 'Elijah and the Fire That Answered', tier: 'M', mode: 'lesson',
    track: 'god', testament: 'ot', era: 'prophets', when: 41, path: 12, xp: 22, mature: true,
    summary: 'One prophet, four hundred and fifty fake ones, and a test with wet wood. “If Yahweh is God, follow him.”',
    scripture: [{ ref: '1 Kings 18:21', text: 'How long will you limp between two opinions? If Yahweh is God, follow him; but if Baal, then follow him.' },
                { ref: '1 Kings 18:39', text: 'When all the people saw it, they fell on their faces, and said, “Yahweh, he is the God!”' }],
    story: [
      'King Ahab and his wife Jezebel had pushed Israel into worshipping Baal, the god people thought sent rain. So God sent three and a half years of no rain. The land died. Then He sent one prophet to the king: Elijah.',
      'On Mount Carmel Elijah gathered everybody and said the verse that still stings: “How long will you limp between two opinions?” Two hundred options look like faith. God asked for one.',
      'The test: two bulls on two altars. The god who answers with fire is God. Four hundred and fifty prophets of Baal shouted, danced and cut themselves from morning until evening. Nothing. No voice, no answer.',
      'Then Elijah repaired God’s fallen altar, put the wood and the sacrifice on it, and — to make it impossible — poured water over it three times until the trench was full.',
      'He prayed one short paragraph. Fire fell from heaven, and it ate the sacrifice, the wood, the stones, the dust, and licked up all the water in the trench. The people fell flat and shouted, “Yahweh — He is the God!”',
      'After that, Elijah prayed for rain and the sky opened. God had proven He is the one who sends the weather, the fire and every gift. Note: the false prophets were judged later (1 Kings 18:40) — the hard part of the chapter, and not a story about how God wants arguments won by force.'
    ],
    teach: ['Limping between two opinions is the very thing God hates, because it is a slow choice for nothing.', 'God answers the humble, not the loudest.', 'Elijah was still a frightened man the next chapter — miracles do not make faith automatic.'],
    hardNote: 'The killing of Baal’s prophets is mentioned in one neutral sentence with an explicit “this is not the point of the story” framing.',
    quiz: [
      { t: 'mc', q: 'What was the test on Mount Carmel?', a: ['Which god answers with fire', 'Who prayed longest', 'Who built the biggest altar', 'Who ran fastest up the hill'], c: 0 },
      { t: 'order', q: 'Put the day in order.', items: ['Elijah gathers Israel', 'Baal’s prophets shout all morning', 'Elijah repairs the altar', 'Water is poured three times', 'Fire falls', 'Rain comes at last'], hint: 'Silence first, fire last.' },
      { t: 'blank', q: '“How long will you ______ between two opinions?”', a: ['limp'], hint: 'It means to wobble between two.' },
      { t: 'match', q: 'Match the number in 1 Kings 18.', pairs: [['450', 'Prophets of Baal'], ['400', 'Prophets of Asherah who did not come'], ['3', 'Times the water was poured'], ['1', 'Prophet of Yahweh left standing']], hint: 'The odds were bad.' },
      { t: 'mc', q: 'What did Elijah do right before he prayed?', a: ['Poured water on the sacrifice', 'Shouted at the crowd', 'Built a wall', 'Ran away'], c: 0 }
    ],
    memory: { ref: '1 Kings 18:21', text: 'How long will you limp between two opinions?' },
    prayer: 'Yahweh, You are the God. Take my wobbling. I want one direction today: towards You. Amen.',
    badge: { name: 'One Direction', art: 'flame', note: 'You stopped limping.' },
    printable: {
      motif: 'flame', title: 'Two altars',
      prompts: ['Draw the left altar with nothing happening and the right one on fire.', 'Label three things the fire ate.', 'Write the Carmel question and answer it in one sentence.'],
      craft: { title: 'Wet-sponge faith test', steps: ['Soak a sponge and squeeze it into a tray.', 'Try to light a candle behind it — nothing catches.', 'Talk about how much water Elijah added, and how sure God was.'], note: 'Use a battery candle near water. Never leave fire with children.' }
    }
  });

  D.push({
    id: 'psalm-23', title: 'One Shepherd, Five Tables', tier: 'M', mode: 'lesson',
    track: 'prayer', testament: 'ot', era: 'kings', when: 40, path: 13, xp: 20,
    summary: 'The best-known poem in the Bible is six verses long. Learn to read it like a map.',
    scripture: [{ ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
                { ref: 'Psalm 23:6', text: 'Surely goodness and mercy will follow me all the days of my life. I will dwell in the house of Yahweh forever.' }],
    story: [
      'David knew sheep. He had spent nights out on the hillsides with them, and everything he wrote in Psalm 23 is a true fact about sheep and about God at the same time.',
      'Verses one to three are the green pasture: He makes me lie down (sheep will not lie down unless they are full, safe and at peace), He leads me beside still water, and He guides me in right paths “for his name’s sake” — His reputation is tied up in mine.',
      'Verse four walks into the darkest valley, and something changes in the poem. David stops talking ABOUT God and starts talking TO Him: “You are with me. Your rod and your staff — they comfort me.”',
      'Verse five jumps to a table in the middle of enemies. God does not remove the enemies first. He feeds me in front of them, and pours oil on my head until the cup runs over.',
      'Verse six sends us home: goodness and mercy will follow me. The Hebrew word for “follow” is the one for “hunt down”. All my life, God has been tracking me, and He is not bad at it.',
      'Then the last line, the best one: I will dwell in the house of Yahweh forever. The Shepherd becomes the Host.'
    ],
    teach: ['Why sheep must lie down: full, safe, no flies, at peace.', 'The "valley of the shadow of death" is one Hebrew word for deep, dark dry land.', 'Psalm 23 is the memory verse you can always finish, even at your worst.'],
    quiz: [
      { t: 'mc', q: 'What does David say makes him lie down?', a: ['The Shepherd makes him', 'He is sleepy', 'The weather', 'The other sheep'], c: 0 },
      { t: 'match', q: 'Match the gift to its verse in Psalm 23.', pairs: [['Green pastures', 'Rest'], ['Still waters', 'Peace'], ['Right paths', 'Guidance'], ['Overflowing cup', 'Generosity']], hint: 'Four gifts, four needs.' },
      { t: 'blank', q: 'In verse four David stops talking about God and starts talking ______ Him.', a: ['to'], hint: '“You are with me.”' },
      { t: 'order', q: 'Walk the psalm in order.', items: ['Lie down in green pastures', 'Be led beside still water', 'Go through the dark valley', 'Eat at a table before enemies', 'Dwell in God’s house forever'], hint: 'Rest, drink, walk, eat, stay.' },
      { t: 'mc', q: 'The psalm says goodness and mercy will ______ me all my days.', a: ['follow', 'hunt down', 'visit'], c: 0, hint: 'The Hebrew word means to pursue.' }
    ],
    memory: { ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
    prayer: 'Yahweh my Shepherd, make me lie down tonight. Lead me where the water is quiet, and walk with me through whatever is dark. Amen.',
    badge: { name: 'Valley Walker', art: 'lamb', note: 'You know Psalm 23 by heart.' },
    printable: {
      motif: 'lamb', title: 'Psalm 23 in five boxes',
      prompts: ['Draw the five scenes in five boxes, one per verse group.', 'Under box three, write the “You are with me” line.', 'Colour only the cup in gold.'],
      craft: { title: 'Fold-out shepherd psalm', steps: ['Fold paper into six equal panels.', 'Write one phrase per panel and add a small picture.', 'Fold it into a pocket card and keep it in your Bible.'], note: 'Read one panel at bedtime every night this week.' }
    }
  });

  D.push({
    id: 'esther', title: 'Esther: If I Perish, I Perish', tier: 'M', mode: 'story',
    track: 'church', testament: 'ot', era: 'return', when: 46, path: 14, xp: 24, mature: true,
    summary: 'A Jewish girl became queen of Persia and risked her life to save a whole people.',
    scripture: [{ ref: 'Esther 4:14', text: 'Who knows whether you have come to the kingdom for such a time as this?' },
                { ref: 'Esther 4:16', text: 'Go, gather together all the Jews who are present in Shushan, and fast for me. I and my young women will likewise fast. So I will go in to the king, which is not according to the law. When I perish, I perish.' }],
    story: [
      'A thousand Jews were still living in Persia under King Xerxes. A man named Mordecai raised his cousin Hadassah, called Esther, and God put her in the palace as the next queen — without her telling anyone she was Jewish.',
      'The king’s top official Haman hated Mordecai because he would not bow down to him. Haman did not settle for one enemy. He convinced the king to sign a law wiping out all the Jews in the empire on one chosen day.',
      'Esther heard about it. Nobody could approach the king without being invited — the penalty was death. She had the best bed in the palace and she was willing to lose it.',
      'Mordecai sent her the message: “Do not think you will escape in the palace any more than everybody else. If you keep quiet now, help and deliverance will rise for the Jews from another place — but you and your father’s house will be lost. Who knows whether you have come to the kingdom for such a time as this?”',
      'She asked the whole nation to fast for three days. Then she put on her royal clothes, stood in the inner court, and held out the gold sceptre when he came near. She invited the king and Haman to a banquet — twice. At the second one she cried out: “My people and I have been sold. The enemy who wanted this is this wicked Haman.”',
      'The plan turned upside down. Haman was hanged on the very pole he had built for Mordecai, and because a royal law could not be cancelled, the Jews were given the right to defend themselves. That rescue is still celebrated by Jewish people every year at Purim. Four times in this book God is never named, and He is in every page.'
    ],
    teach: ['Providence is when God is not mentioned and nothing happens by accident.', 'Courage is often a risk with no guarantee — Esther said “if I perish, I perish.”', 'Fasting and bravery belong together.'],
    hardNote: 'Genocide and execution are part of the chapter; both are stated, neither is dramatised, and the reversal is the emphasis.',
    quiz: [
      { t: 'mc', q: 'What was the risk in walking into the king’s court uninvited?', a: ['Death', 'A fine', 'Being sent home', 'Nothing'], c: 0 },
      { t: 'blank', q: 'Mordecai asked who knows if you have come to the kingdom for such a ______ as this.', a: ['time'], hint: 'Esther 4:14.' },
      { t: 'order', q: 'Put Esther’s plan in order.', items: ['Haman makes the law', 'Mordecai sends word', 'Three days of fasting', 'Esther stands in the court', 'Two banquets', 'Haman’s own pole'], hint: 'Fast, then walk in.' },
      { t: 'match', q: 'Match the name to who they were.', pairs: [['Esther', 'The queen, Jewish'], ['Mordecai', 'Her cousin, gatekeeper'], ['Haman', 'The man who plotted'], ['Xerxes', 'King of Persia']], hint: 'Four people, four parts.' },
      { t: 'mc', q: 'Which festival remembers this rescue?', a: ['Purim', 'Passover', 'Tabernacles', 'Trumpets'], c: 0 }
    ],
    memory: { ref: 'Esther 4:14', text: 'Who knows whether you have come to the kingdom for such a time as this?' },
    prayer: 'God, You are in the room even when nobody says Your name. Give me Esther’s fast and Esther’s nerve. Use me for such a time as this. Amen.',
    badge: { name: 'Sceptre Moment', art: 'crown', note: 'You were brave for others.' },
    printable: {
      motif: 'crown', title: 'The three-day plan',
      prompts: ['Draw the palace, the gate and the pole in three boxes.', 'Write the verse Esther spoke before she went in.', 'Design a crown for her with the words “for such a time” on it.'],
      craft: { title: 'Purim noisemakers', steps: ['Tape two paper plates with beans inside.', 'Close the edges with sticky tape and paint them.', 'Use them when the name Haman is read out.'], note: 'That is a real Purim tradition called a gragger.' }
    }
  });

  D.push({
    id: 'jesus-baptism', title: 'The Sky Opened', tier: 'M', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'taught', when: 64, path: 15, xp: 22,
    summary: 'Jesus’ public life started with a dip in the Jordan, a dove, a voice — and then a desert.',
    scripture: [{ ref: 'Matthew 3:17', text: 'Behold, a voice out of the sky said, “This is my beloved Son, with whom I am well pleased.”' },
                { ref: 'Deuteronomy 8:3', text: 'Man doesn’t live by bread alone, but by every word that proceeds out of the mouth of Yahweh.' }],
    story: [
      'John the baptiser was shouting at people in the mud of the Jordan: “Turn around! The Kingdom of Heaven is close!” Crowds came to be baptised, saying sorry. Then Jesus walked into the line.',
      'John refused. “I need to be baptised by you!” Jesus said, “Let it be so now, to fulfil all righteousness.” He did not need to say sorry. He was standing with us, in our place.',
      'The moment He came out of the water the sky tore open. He saw the Spirit of God descending like a dove and lighting on Him. And a voice from heaven said, “This is my beloved Son, with whom I am well pleased.” Father, Son and Spirit, all there — that is the Trinity in one scene.',
      'Then the Spirit led Him straight into the desert for forty days without food. Three times the Devil offered Him a shortcut: bread without hunger, kingdoms without a cross, worship without obedience.',
      'Three times Jesus answered with one book: “It is written.” He won where Adam lost, in a desert, hungry, with nothing but Scripture and trust.',
      'When He was finished, angels came and took care of Him. God does not send you into a hard place and then leave you there.'
    ],
    teach: ['“It is written” is the only answer the Devil ever has to hear.', 'Baptism is not becoming God’s child — it is saying out loud that you already trust Him.', 'Jesus’ whole public ministry began with being affirmed, not striving.'],
    quiz: [
      { t: 'mc', q: 'Who baptised Jesus in the Jordan?', a: ['John', 'Peter', 'His cousin James', 'A priest'], c: 0 },
      { t: 'order', q: 'Put the two temptations-in-order scene correctly.', items: ['Turn stones to bread', 'Jump from the temple', 'Bow and take the kingdoms', '“It is written” each time', 'Angels come to Him'], hint: 'Matthew 4 order.' },
      { t: 'match', q: 'Match the sign to its meaning at the baptism.', pairs: [['Sky opened', 'Heaven touched earth'], ['Dove', 'The Spirit rested'], ['Voice', 'The Father’s approval'], ['Water', 'Standing with sinners']], hint: 'Four signs, one Son.' },
      { t: 'blank', q: 'Jesus answered every temptation with “It is ______.”', a: ['written'], hint: 'Quoting Deuteronomy.' },
      { t: 'sort', q: 'Sort what baptism does and does not do.', buckets: [{ id: 'y', name: 'What it means' }, { id: 'n', name: 'What it is not' }], items: [{ text: 'A public “I trust Jesus”', b: 'y' }, { text: 'The way you become saved', b: 'n' }, { text: 'Identifying with His people', b: 'y' }, { text: 'A magic wash', b: 'n' }] }
    ],
    memory: { ref: 'Matthew 4:4', text: 'Man doesn’t live by bread alone, but by every word that proceeds out of the mouth of God.' },
    prayer: 'Jesus, when I am hungry for something wrong, give Your words back to me. Remind me whose I am. Amen.',
    badge: { name: 'Desert Winner', art: 'dove', note: 'You used Scripture, not muscle.' },
    printable: {
      motif: 'dove', title: 'Open sky, three answers',
      prompts: ['Draw the dove, the light and the voice in the sky.', 'Under the water, write the three temptations in three boxes.', 'Beside each one, write “It is written”.'],
      craft: { title: 'Scripture cards for the desert', steps: ['Cut three cards.', 'Copy Deuteronomy 8:3, 6:16 and 6:13 on them.', 'Keep them in your pocket this week and read one when you want to complain.'], note: 'Same tool Jesus used. Try it honestly for seven days.' }
    }
  });

  D.push({
    id: 'good-samaritan', title: 'Who Was My Neighbour?', tier: 'M', mode: 'game',
    track: 'values', testament: 'nt', era: 'taught', when: 74, path: 16, xp: 20,
    summary: 'Jesus told a story where the hero is the man the hearers hated most.',
    scripture: [{ ref: 'Luke 10:37', text: 'Which of these three, do you think, was neighbour to him who fell among the robbers? He said, “He who showed mercy on him.” Go and do likewise.' }],
    story: [
      'A expert in the law stood up to trap Jesus: “Teacher, what must I do to inherit eternal life?” Jesus sent him back to his own book: love God, love your neighbour. “And who is my neighbour?” the man asked, hoping to narrow the circle.',
      'So Jesus told a story about a Jewish man travelling the dangerous road down from Jerusalem to Jericho, where robbers stripped him, beat him and left him half dead.',
      'A priest came that way. He saw him, crossed the road, and kept walking — he needed to be clean to serve in the temple, and a body made you unclean. A Levite did the same thing.',
      'Then a Samaritan came. Jewish and Samaritan people had hated each other for eight hundred years over a mountain and a grudge. He saw him and was moved with pity: oil, wine, bandages, his own animal, an inn, two days’ wages, and a promise to pay the bill.',
      'Then Jesus gave the trap back: which one was a neighbour? The man could not even say the word “Samaritan”. He said, “The one who showed mercy.” Jesus said, “Go and do the same.”',
      'The answer is not “be nice to whoever is near.” It is: your neighbour is anyone in front of you who is hurting, including the person you were taught to dislike.'
    ],
    teach: ['Mercy is not clean-first, ask-later. It is hands and money.', 'The story shames religious duty used as an excuse.', 'Love of neighbour costs the Samaritan two days’ wages — 100% of his week.'],
    quiz: [
      { t: 'sort', q: 'Who actually stopped? Sort their actions.', buckets: [{ id: 's', name: 'Stopped and helped' }, { id: 'w', name: 'Walked on by' }], items: [{ text: 'Oil, wine and bandages', b: 's' }, { text: 'Crossed the road', b: 'w' }, { text: 'Two days’ wages for the inn', b: 's' }, { text: 'Kept walking, needed to be clean', b: 'w' }] },
      { t: 'mc', q: 'Why was it shocking that the hero was a Samaritan?', a: ['Jews and Samaritans hated each other', 'Samaritans were rich', 'He was a priest', 'He was the traveller’s brother'], c: 0 },
      { t: 'match', q: 'Match the road detail to its meaning.', pairs: [['Jericho road', 'Steep, a place robbers hid'], ['Half dead', 'Nobody could blame him for leaving'], ['Priest', 'Religion, no mercy'], ['Inn', 'Someone paid to keep helping']], hint: 'Four facts.' },
      { t: 'blank', q: 'Jesus ended with: “Go and ______ likewise.”', a: ['do'], hint: 'Luke 10:37.' },
      { t: 'mc', q: 'What did the Samaritan promise the innkeeper?', a: ['To pay whatever extra it cost', 'To come back next year', 'To repay with crops', 'Nothing'], c: 0 }
    ],
    memory: { ref: 'Luke 10:37', text: 'Which of these three was neighbour to him who fell among the robbers?' },
    prayer: 'Jesus, put eyes in me that see the hurt person, and hands that stop. Start with the ones I would rather walk past. Amen.',
    badge: { name: 'Oil and Wine', art: 'jar', note: 'You stopped for somebody.' },
    printable: {
      motif: 'jar', title: 'The mercy maths sheet',
      prompts: ['Add it up: what did the Samaritan spend (time, oil, wine, money, a night)?', 'List three people you are taught not to like.', 'Plan one small stopping act for this week and write the day.'],
      craft: { title: 'Road map game', steps: ['Draw the Jerusalem-Jericho road on paper, 24 cm long.', 'Place three counters: priest, Levite, Samaritan.', 'Play it three ways and see which one reaches the hurt man first.'], note: 'Class game: one child plays the robbed man and cannot talk.' }
    }
  });

  D.push({
    id: 'prodigal', title: 'The Runaway and the Running Father', tier: 'M', mode: 'story',
    track: 'god', testament: 'nt', era: 'taught', when: 75, path: 17, xp: 24,
    summary: 'The worst ending in the story is not the pig farm. It is the brother standing outside.',
    scripture: [{ ref: 'Luke 15:20', text: 'While he was still a long way off, his father saw him, and was moved with compassion, and ran, and fell on his neck, and kissed him.' }],
    story: [
      'A younger son asked his father for his share of the estate early — which in that culture was like saying “I wish you were dead.” The father gave it to him. That is the scandal at the start.',
      'He travelled to a distant country, wasted everything on wild living, and when a famine came he took the only job left: feeding pigs. He wanted even the pods the pigs were eating.',
      'Then the Bible says something about him that is the hinge of the whole story: “He came to himself.” He practised a speech. He got up and walked home.',
      'The father was watching the road. He saw him while he was still a long way off, and an old man in that culture did not run. He ran, threw his arms around a boy who smelled like a pigsty, and kissed him.',
      'The son started his speech. The father interrupted with commands: the best robe, a ring, sandals, the fattened calf. “This my son was dead and is alive again; he was lost and is found.”',
      'The elder son came in from the field and heard dancing. He refused to go in. “All these years I slaved for you and you never gave me a goat.” The father went out — again, begging in public — and said, “Child, you are always with me, and everything I have is yours.”',
      'Jesus never says whether the elder brother went in. That is on purpose. He was telling this to religious people, and the ending is a question they had to answer themselves.'
    ],
    teach: ['Sin is not just doing bad things; it is wanting the gifts without the giver.', 'God’s shame-absorbing love is the point of the father running.', 'Self-righteousness is the quieter, harder-to-cure version of the same disease.'],
    quiz: [
      { t: 'mc', q: 'What did the son end up feeding?', a: ['Pigs', 'Sheep', 'Geese', 'Camels'], c: 0 },
      { t: 'order', q: 'Put the story in order.', items: ['Asks for his share', 'Wastes everything', 'Feeds pigs', 'Comes to himself', 'Walks home', 'Father runs', 'Elder brother sulks outside'], hint: 'Seven beats.' },
      { t: 'match', q: 'Match the gift to what it meant.', pairs: [['Best robe', 'Honour restored'], ['Ring', 'Authority given back'], ['Sandals', 'Son, not servant'], ['Fattened calf', 'A public party']], hint: 'Four restorations.' },
      { t: 'blank', q: 'The father saw him while he was still a long way ______.', a: ['off'], hint: 'He was watching the road.' },
      { t: 'sort', q: 'Sort what each brother wanted.', buckets: [{ id: 'y', name: 'The gifts' }, { id: 'f', name: 'The father' }], items: [{ text: 'The younger at the start', b: 'y' }, { text: 'The younger coming home', b: 'f' }, { text: 'The elder, angry about the party', b: 'y' }, { text: 'The elder, invited out by his father', b: 'f' }] }
    ],
    memory: { ref: 'Luke 15:20', text: 'His father saw him, and was moved with compassion, and ran.' },
    prayer: 'Father, I have wanted Your gifts more than You. I am coming home. Run. And if I am the elder brother, do not let me sulk outside a party You threw for somebody else. Amen.',
    badge: { name: 'Come Home', art: 'house', note: 'You turned around.' },
    printable: {
      motif: 'house', title: 'Two brothers, one father',
      prompts: ['Draw three scenes: the far country, the road home, the field outside.', 'Write the father’s words to each brother in two speech bubbles.', 'Colour the robe white.'],
      craft: { title: 'The interrupted speech', steps: ['Write the son’s speech on a card, small.', 'Then write the father’s four commands on the back in big letters.', 'Read both sides aloud and notice which one is longer.'], note: 'A good talk for families with more than one child.' }
    }
  });

  D.push({
    id: 'peter-waters', title: 'Out of the Boat', tier: 'M', mode: 'story',
    track: 'prayer', testament: 'nt', era: 'taught', when: 76, path: 18, xp: 20,
    summary: 'Peter did the impossible for about ten seconds. Then he looked at the wind.',
    scripture: [{ ref: 'Matthew 14:30', text: 'But when he saw the wind, he was afraid; and beginning to sink, he cried, saying, “Lord, save me!”' },
                { ref: 'Matthew 14:31', text: 'Immediately Jesus stretched out his hand, took hold of him, and said to him, “You of little faith, why did you doubt?”' }],
    story: [
      'The disciples had been rowing all night against the waves on the Sea of Galilee. Somewhere between three and six in the morning Jesus walked out to them across the water. They screamed, thinking it was a ghost.',
      '“Cheer up,” He said. “It is me. Don’t be afraid.” Peter answered with the boldest, craziest request in the Gospels: “Lord, if it is you, tell me to come to you on the water.”',
      '“Come.” So Peter climbed over the side. For a stretch of seconds he walked on the sea — the only person besides Jesus ever to do it.',
      'Then he noticed how hard the wind was blowing, and he sank. He did not sink because he was wet. He sank because he moved his eyes from Jesus to the storm.',
      'Jesus grabbed him at once. “You of little faith, why did you doubt?” And when they both got into the boat the wind stopped.',
      'Notice the two halves: Peter is the only disciple who got out of the boat, and Jesus’ hand was there before he even finished asking. Trying and failing with Jesus is not the same as not trying.'
    ],
    teach: ['Where your eyes are decides what you can do.', 'The rebuke is gentle — He still caught him.', 'Peter is the one who tried. That is not a bad place to be.'],
    quiz: [
      { t: 'mc', q: 'How did Jesus get to the boat?', a: ['Walking on the water', 'In another boat', 'Swimming', 'On the shore, shouting'], c: 0 },
      { t: 'order', q: 'Put it in order.', items: ['Rowing all night', 'Jesus walks on the sea', '“It is me, don’t be afraid”', 'Peter climbs out', 'Peter walks, then looks at the wind', 'Jesus catches him', 'The wind stops'], hint: 'Seven moves.' },
      { t: 'blank', q: 'Peter cried out, “Lord, ______ me!”', a: ['save'], hint: 'Matthew 14:30.' },
      { t: 'match', q: 'Match what made the difference.', pairs: [['Looking at Jesus', 'Walked'], ['Looking at the wind', 'Sank'], ['Crying out', 'Caught'], ['Getting in the boat', 'Wind stopped']], hint: 'Four cause-and-effects.' }
    ],
    memory: { ref: 'Matthew 14:30', text: 'Lord, save me!', 'short': true },
    prayer: 'Jesus, when the boat is rocking, keep my eyes on You. If I start to sink, catch me fast. Amen.',
    badge: { name: 'Boat Leaper', art: 'boat', note: 'You tried the hard thing.' },
    printable: {
      motif: 'boat', title: 'Eyes on the storm or the Saviour',
      prompts: ['Draw two panels: one with Jesus and Peter walking, one with a big wave and a sinking hand.', 'Write what Peter said in each panel.', 'Circle the eye in the first panel and cross out the eye in the second.'],
      craft: { title: 'Float or sink tester', steps: ['Fill a bowl with water.', 'Put an empty sealed bottle in — it floats.', 'Fill the same bottle with water and watch it sink.', 'Talk about what “fills” a person besides trust.'], note: 'The weight is the wind in your eyes.' }
    }
  });

  D.push({
    id: 'feet-washing', title: 'The King on His Knees', tier: 'M', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'taught', when: 78, path: 19, xp: 22,
    summary: 'The night before He died, Jesus got a towel. Then He told them why.',
    scripture: [{ ref: 'John 13:14', text: 'If I then, the Lord and the Teacher, washed your feet, you also ought to wash one another’s feet.' },
                { ref: 'Philippians 2:7', text: 'but emptied himself, and took the form of a servant, being made in the likeness of men.' }],
    story: [
      'It was the evening of the Passover meal. The disciples had been arguing on the road about who was the greatest, and nobody in the room was willing to do the slave’s job at the door: washing the dust and dung off everybody’s feet.',
      'Jesus stood up, took off his outer robe, and tied a towel around himself. Then he poured water and began washing their feet, one by one.',
      'Peter was horrified. “You, wash my feet?” Jesus answered, “Unless I wash you, you have no part with me.” Peter immediately asked for the whole head and hands too.',
      'Afterwards He put his robe back on, sat down, and explained: “Do you understand what I have done? You call me Teacher and Lord, and you are right. So if I, the Lord and Teacher, washed your feet, you should wash one another’s feet.”',
      'The God who feeds the sea does not mind a basin. Philippians 2 says Jesus “emptied himself, taking the form of a servant”. John 13 is that sentence turned into a scene.',
      'He then gave them a new command: love one another the way I have loved you. Not “the way you love yourselves”. By then, the towel was the last lesson before the cross.'
    ],
    teach: ['Greatness in God’s family is measured by what you will kneel for.', 'Wash one another’s feet: the ordinary, smelly, unnoticed kind of service.', 'Jesus knew who would betray him and washed his feet anyway (John 13:10-11).'],
    quiz: [
      { t: 'mc', q: 'What had the disciples been arguing about at that meal?', a: ['Who was the greatest', 'Who had the most fish', 'Which of them was Judas', 'Where to sleep'], c: 0 },
      { t: 'order', q: 'Put the evening in order.', items: ['Argument about who is greatest', 'Jesus stands with a towel', 'Feet are washed one by one', 'Peter objects', 'Jesus explains and gives the new command'], hint: 'Towel, then talk.' },
      { t: 'blank', q: '“A new commandment I give you: love one another as I have ______ you.”', a: ['loved'], hint: 'John 13:34.' },
      { t: 'match', q: 'Match the object to what it shows.', pairs: [['Basin', 'Service'], ['Towel', 'Slave’s job'], ['Trenchant robe put back on', 'Authority used kindly'], ['Unwashed feet', 'Nobody wanted to do it']], hint: 'Four props.' },
      { t: 'sort', q: 'Sort real foot-washing from fake.', buckets: [{ id: 'r', name: 'Real' }, { id: 'f', name: 'Fake' }], items: [{ text: 'Doing the chore nobody claims', b: 'r' }, { text: 'Serving so people notice you', b: 'f' }, { text: 'Helping someone who smells', b: 'r' }, { text: 'Only serving your friends', b: 'f' }] }
    ],
    memory: { ref: 'John 13:14', text: 'You also ought to wash one another’s feet.' },
    prayer: 'Jesus, I want to be great. Show me one towel this week and give me the knees for it. Amen.',
    badge: { name: 'Towel Bearer', art: 'hands', note: 'You served without being asked.' },
    printable: {
      motif: 'hands', title: 'The towel list',
      prompts: ['List five chores at home or in class that nobody claims.', 'Choose one and write the day you will do it secretly.', 'Draw the basin, the towel and the water.'],
      craft: { title: 'Foot-washing night', steps: ['Fill basins with warm water and a towel each.', 'Take turns washing someone else’s feet — grown-ups too.', 'Read John 13:12-17 while the water runs.'], note: 'The best family devotional you will ever run. Keep it short and real.' }
    }
  });

  D.push({
    id: 'pentecost-power', title: 'Power, Then Boldness', tier: 'M', mode: 'story',
    track: 'spirit', testament: 'nt', era: 'church', when: 82, path: 20, xp: 24,
    summary: 'A scared room of men became the fastest-moving mission in history. One wind, one sermon, three thousand.',
    scripture: [{ ref: 'Acts 1:8', text: 'But you will receive power when the Holy Spirit has come on you, and you will be my witnesses in Jerusalem, in all Judea, in Samaria, and to the end of the earth.' },
                { ref: 'Acts 2:41', text: 'Then those who gladly received his baptism were baptised, and there were added to them that day about three thousand souls.' }],
    story: [
      'After Jesus rose, He spent forty days with His disciples and then was taken up to heaven. Before He went He said, “Do not leave Jerusalem. Wait for what the Father promised: you will be baptised with the Holy Spirit and you will receive power.”',
      'So they waited. About a hundred and twenty of them, in one room, praying together — men, women, Jesus’ own family. Ten days of waiting, which is a long time to do nothing when you want to do everything.',
      'It was the Jewish festival of Pentecost — the harvest thanksgiving, fifty days after Passover, when Jerusalem was full of Jews from every nation under the sun.',
      'A sound like a violent wind filled the house. Divided flames, like fire but not burning, settled on each one, and all were filled with the Holy Spirit and began speaking in other languages.',
      'The crowd outside was confused, some sneered “they are drunk with wine”. Peter — the man who had denied Jesus three times by a fire — stood up with the eleven and preached.',
      'He quoted the prophet Joel: “I will pour out my Spirit on all flesh; your sons and your daughters will prophesy; your old men will dream dreams; your young men will see visions.” God did not say some of you. Then he said plainly: this Jesus you crucified, God has made Lord and Christ.',
      'They were cut to the heart and asked, “What do we do?” Peter said, “Repent and be baptised, and you will receive the gift of the Holy Spirit.” Three thousand joined them that day, and the church did not stop growing since.'
    ],
    teach: ['Wait before you witness: the same disciples who fled had power ten days later.', 'Joel’s “all flesh” is the end of the old “prophets only for a few” idea.', 'The Spirit is given to those who repent and trust, not earned by a spiritual exam.'],
    quiz: [
      { t: 'mc', q: 'What did Jesus tell them to do before starting?', a: ['Wait in Jerusalem for the Spirit', 'Go home to work', 'Travel to Rome', 'Build a temple'], c: 0 },
      { t: 'order', q: 'Put the birth of the church in order.', items: ['Resurrection and forty days', 'Promise and waiting', 'Wind and flame', 'Peter preaches', 'Three thousand are baptised', 'They keep meeting and sharing'], hint: 'Wait, wind, word, water.' },
      { t: 'match', q: 'Match the sign to its meaning.', pairs: [['Wind', 'God’s breath, unseen power'], ['Fire', 'God’s presence that purifies'], ['Languages', 'Every nation included'], ['Fifty days after Passover', 'Pentecost, the harvest festival']], hint: 'Four facts.' },
      { t: 'blank', q: 'Peter quoted Joel: God would pour out His Spirit on all ______.', a: ['flesh'], hint: 'Sons and daughters will prophesy.' },
      { t: 'sort', q: 'Sort before Pentecost / after Pentecost.', buckets: [{ id: 'b', name: 'Before' }, { id: 'a', name: 'After' }], items: [{ text: 'Locked in a room in fear', b: 'b' }, { text: 'Preaching in public', b: 'a' }, { text: 'Peter denied Jesus', b: 'b' }, { text: 'Sharing everything in common', b: 'a' }] }
    ],
    memory: { ref: 'Acts 1:8', text: 'You will receive power when the Holy Spirit has come on you.' },
    prayer: 'Holy Spirit, we would rather wait with You than rush without You. Fill me, then send me. Amen.',
    badge: { name: 'Spirit Filled', art: 'flame', note: 'You waited and then went.' },
    printable: {
      motif: 'flame', title: 'Acts 2 fact file',
      prompts: ['Fill in: how many waited, what festival it was, who preached, how many joined.', 'Draw the wind lines and one flame per head.', 'Write Acts 1:8 around the edge, following the four places in order.'],
      craft: { title: 'Witness map', steps: ['Trace four boxes: Jerusalem, Judea, Samaria, ends of the earth.', 'Put one prayer request for each in writing.', 'Fold it into a card for your pocket.'], note: 'This is the outline of the whole book of Acts — and of your own street.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_4 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
