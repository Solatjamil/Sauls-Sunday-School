/* =====================================================================
   Curriculum — tier M (Builders, ages 7-9). Units 21-30.
   Mature material may appear here, always with a "why this is in the Bible"
   note for the child and a talking point for the grown-up.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'psalms-creation', title: 'The Sky Is Preaching', tier: 'M', mode: 'lesson',
    track: 'prayer', testament: 'ot', era: 'kings', when: 38, path: 1, xp: 22,
    summary: 'Two books tell you about God: the Bible and the world. Psalm 19 calls the sky a sermon with no words.',
    scripture: [{ ref: 'Psalm 19:1', text: 'The heavens declare the glory of God. The expanse shows his handiwork.' },
                { ref: 'Psalm 139:14', text: 'I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful.' }],
    story: [
      'David was a shepherd before he was a king, and shepherds spend a lot of time looking up. He wrote it down: “The heavens declare God’s glory.”',
      'He says the sky is preaching every day. No microphone, no words, no voice — and yet everybody hears it. “Their line has gone out through all the earth.”',
      'Then David turns the same idea on himself. “I am fearfully and wonderfully made.” He counted his own thoughts and gave up: more than the sand.',
      'Here is the thing David knew: creation and Scripture never disagree. If a science book and a Bible verse seem to fight, we have misread one of them.',
      'So next time you are outside, look up on purpose. That is a sermon, and you are in the front row.'
    ],
    teach: ['General revelation: God shows Himself in what He made.', 'Special revelation: God speaks clearly in the Bible.', 'You are not an accident. “Fearfully” means with awe, not with scary.'],
    quiz: [
      { t: 'mc', q: 'According to Psalm 19, how do the heavens speak about God?', a: ['By existing and showing design, every day', 'By shouting loudly at night', 'Only to priests', 'They do not speak'], c: 0, hint: 'No words, still heard.' },
      { t: 'blank', q: 'Psalm 139 says David is fearfully and ______ made.', a: ['wonderfully'], accept: ['wonderfully made', 'wonderful'], hint: 'It begins with w.' },
      { t: 'match', q: 'Match the psalm to its big idea.', pairs: [['Psalm 19', 'The sky declares glory'], ['Psalm 139', 'Known and made on purpose'], ['Psalm 23', 'The Lord shepherds me'], ['Psalm 119', 'God’s word is a lamp']], hint: 'Four famous psalms.' },
      { t: 'mc', q: 'David says the sky preaches to whom?', a: ['Everybody, in every language', 'Only people in Israel', 'Only kings', 'Nobody'], c: 0 },
      { t: 'sort', q: 'Sort what each book tells you.', buckets: [{ id: 'bible', name: 'The Bible tells me' }, { id: 'world', name: 'The world tells me' }], items: [{ text: 'That God forgives sin', b: 'bible' }, { text: 'That God is powerful and wise', b: 'world' }, { text: 'That Jesus rose from the dead', b: 'bible' }, { text: 'That God made design and beauty', b: 'world' }], hint: 'Two ways of knowing.' }
    ],
    memory: { ref: 'Psalm 19:1', text: 'The heavens declare the glory of God.' },
    prayer: 'God, thank You for preaching to me through the sky. Help me look up and listen, and help me open Your Word too. Amen.',
    badge: { name: 'Sky Reader', art: 'sun', note: 'You can read two books about God.' },
    printable: {
      motif: 'sun', title: 'Design hunt worksheet',
      prompts: ['List twelve things you can see outside that show design.', 'For each one, write what it teaches about God.', 'Draw the one you think is most amazing and label its parts.'],
      craft: { title: 'Two-column journal', steps: ['Fold a page in half lengthways.', 'Left column: “What I saw”. Right column: “What it says about God”.', 'Add one line every day for a week.'], note: 'Compare the columns at the end of the week and talk about it.' }
    }
  });

  D.push({
    id: 'isaac-born', title: 'A Baby for a Laughing Couple', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'fathers', when: 12, path: 2, xp: 22,
    summary: 'God promised a son to a hundred-year-old man and a ninety-year-old woman. Sarah laughed, and God was glad about it.',
    scripture: [{ ref: 'Genesis 21:6', text: 'Sarah said, “God has made me laugh. Everyone who hears will laugh with me.”' },
                { ref: 'Genesis 18:14', text: 'Is anything too hard for Yahweh?' }],
    story: [
      'Abraham was a hundred years old and Sarah was ninety. They had waited twenty-five years for God to keep His promise about a son, and nothing had happened.',
      'Three travellers came, and one of them, who was the Lord, said, “I will certainly return next year, and Sarah will have a son.” Sarah was behind him, listening at the tent door, and she laughed to herself.',
      'God asked, “Why did Sarah laugh? Is anything too hard for Yahweh?” Sarah was frightened and denied it. God said, “No, you did laugh” — and He did not strike her down for it.',
      'A year later she held a baby boy. They named him Isaac, which means “he laughs”. Sarah said, “God has made me laugh; everyone who hears will laugh with me.”',
      'God does not need your body to be young or your plan to be sensible. He needs it to be His promise.',
      'Later God asked Abraham to give Isaac back on a mountain (Genesis 22). That is a hard story, and it has a gentler version in tier H. For now, hold this: God provides. Abraham named that place “Yahweh will see to it”.'
    ],
    teach: ['Laughter can be doubt and still be honest with God.', 'God’s timing is not God’s refusal.', 'Isaac is the child of the promise, and Paul calls Jesus the seed of Abraham (Galatians 3:16).'],
    hardNote: 'Genesis 22 (Abraham and Isaac on the mountain) is intentionally not told here. The child gets a one-line pointer and an adult heads-up instead of a shock.',
    quiz: [
      { t: 'mc', q: 'How old was Abraham when Isaac was born?', a: ['A hundred', 'Forty', 'Seventy-five', 'Ninety-nine'], c: 0, hint: 'Sarah was ninety.' },
      { t: 'blank', q: 'Isaac’s name means “______”.', a: ['laughter', 'he laughs'], hint: 'Sarah did it at the tent door.' },
      { t: 'mc', q: 'How did Sarah react when God said she would have a baby?', a: ['She laughed to herself', 'She fainted', 'She ran to tell the neighbours', 'She said no'], c: 0 },
      { t: 'order', q: 'Put the promise in order.', items: ['God promises a son', 'Twenty-five years pass', 'Sarah laughs at the tent door', 'Isaac is born', 'Abraham names the place “God will provide”'], hint: 'Long wait first.' },
      { t: 'match', q: 'Match the name to its meaning.', pairs: [['Isaac', 'He laughs'], ['Abraham', 'Father of many'], ['Bethel area / “Yahweh will provide”', 'God sees to it'], ['Sarah', 'Princess']], hint: 'Names carry news.' }
    ],
    memory: { ref: 'Genesis 18:14', text: 'Is anything too hard for Yahweh?' },
    prayer: 'God, waiting is hard. When Your promise looks impossible, remind me that nothing is too hard for You. Amen.',
    badge: { name: 'Promise Waiter', art: 'star', note: 'You waited on a promise.' },
    printable: {
      motif: 'star', title: 'Timeline: one promise, many years',
      prompts: ['Mark four points: promise given, Ishmael, Isaac born, the mountain.', 'Under each one write how old Abraham was.', 'In a box at the bottom, write a promise of God you are waiting on.'],
      craft: { title: 'Laugh line', steps: ['Fold paper into four squares like a comic.', 'Draw: God promises / they wait / they laugh / baby laughs.', 'Add one speech bubble per panel and colour it.'], note: 'Great for showing that God keeps promises across a long story.' }
    }
  });

  D.push({
    id: 'jacob-ladder', title: 'A Staircase in the Desert', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'fathers', when: 14, path: 3, xp: 22,
    summary: 'A man on the run, a stone for a pillow, and heaven opening for someone who did not deserve it.',
    scripture: [{ ref: 'Genesis 28:12', text: 'Behold, a stair set up on the earth, and its top reached to the sky. Behold, the angels of God were ascending and descending on it.' },
                { ref: 'Genesis 28:15', text: 'Behold, I am with you and will keep you wherever you go, and will bring you again into this land.' }],
    story: [
      'Jacob had just done a bad thing. He tricked his blind old father and stole the blessing meant for his brother Esau. Now Esau was furious, and Jacob was running for his life with a bag and a stick.',
      'That night in the desert he had no pillow, so he put a stone under his head and lay down on the bare ground.',
      'He dreamed: a staircase standing on the earth with its top in heaven, and God’s angels going up and down on it. Above it stood Yahweh.',
      'God said the same promise He gave Abraham, to Jacob — on purpose. Not because Jacob was good, but because God keeps His word.',
      'Jacob woke up terrified and amazed. “Yahweh is in this place, and I did not know it. This is nothing else but God’s house!” He set his pillow stone up as a pillar and poured oil on it.',
      'Jesus later called Himself that staircase (John 1:51). Heaven is open, and it is open through Him.'
    ],
    teach: ['God meets people in the mess they made.', 'A pillar stone is how you remember what God did.', 'Jacob means “heel-grabber/trickster”, and God renamed him Israel, “he struggles with God”.'],
    quiz: [
      { t: 'mc', q: 'What did Jacob use for a pillow?', a: ['A stone', 'A coat', 'A saddle', 'His brother'], c: 0 },
      { t: 'blank', q: 'Jesus said “you will see heaven open and the angels ascending and descending on the Son of Man.” Which picture is He claiming about Himself?', a: ['staircase', 'Jacob’s ladder', 'ladder'], hint: 'It is in Genesis 28.' },
      { t: 'order', q: 'Put the story in order.', items: ['Jacob tricks his father', 'Jacob runs away', 'Stone pillow and the dream', 'God repeats the promise', 'Jacob sets up a pillar'], hint: 'Consequence first.' },
      { t: 'match', q: 'Match the name to what it means.', pairs: [['Jacob', 'Striver / trickster'], ['Israel', 'He struggles with God'], ['Bethel', 'House of God'], ['Esau', 'Jacob’s twin brother']], hint: 'Names in Genesis 28–35.' },
      { t: 'mc', q: 'Why did God bless Jacob in the dream?', a: ['Because God keeps His promises', 'Because Jacob had been honest', 'Because Jacob prayed first', 'Because he was the eldest'], c: 0 }
    ],
    memory: { ref: 'Genesis 28:15', text: 'Behold, I am with you and will keep you wherever you go.' },
    prayer: 'God, You met Jacob in a desert with a stone under his head. You can meet me anywhere. Thank You that heaven is open. Amen.',
    badge: { name: 'Open Heaven', art: 'kite', note: 'You know God meets people on the run.' },
    printable: {
      motif: 'kite', title: 'Draw the staircase in the sky',
      prompts: ['Draw the desert, the stone, and Jacob asleep.', 'Draw a ladder reaching into the sky with angels on it.', 'Label three things God promised in the dream.'],
      craft: { title: 'Pillar stone', steps: ['Find a smooth stone about the size of your hand.', 'Write or paint “Bethel — God’s house” on one face.', 'Keep it where you sit to read or pray.'], note: 'A real memorial, just like Jacob made one.' }
    }
  });

  D.push({
    id: 'joseph-coat', title: 'The Coat, the Pit, the Palace', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'fathers', when: 16, path: 4, xp: 24,
    summary: 'What people meant for bad, God meant for good. The story of Joseph.',
    scripture: [{ ref: 'Genesis 50:20', text: 'You meant it against me for evil, but God meant it for good, to bring about this present result, to preserve life for a great many people.' }],
    story: [
      'Joseph was seventeen, the son Rachel never expected, and his father loved him more than his brothers. He gave him a long coat with sleeves — the kind a prince wears, not a farmhand.',
      'His eleven brothers hated him, especially after two dreams: sheaves bowing, and sun, moon and eleven stars bowing down.',
      'When Joseph came out to check on them, they threw him into a dry well and then sold him to slave traders for twenty pieces of silver. They dipped his coat in blood and lied to their father.',
      'In Egypt, Joseph was a servant, then a prisoner, because he said no to doing wrong. But God was with him. He could explain dreams — and one day the king of Egypt had a dream nobody could read.',
      'Joseph told him: seven fat years, seven hungry years. Store the grain. Pharaoh made the prisoner the second most powerful man in the world.',
      'The famine brought his own brothers to his door, bowing just as he dreamed. They were terrified. Joseph said the verse we remember: “You meant it for evil, but God meant it for good.” He wept out loud, and gave them food.',
      'This does not mean what they did was right. It means God is bigger than the worst thing anybody does to you.'
    ],
    teach: ['God can weave real evil into a good plan without being the author of the evil.', 'Joseph kept trusting God in a pit and in prison.', 'Forgiveness is a choice, not a feeling.'],
    hardNote: 'Slavery, betrayal and a death-threat are named plainly but not described in detail.',
    quiz: [
      { t: 'mc', q: 'How many pieces of silver was Joseph sold for?', a: ['Twenty', 'Ten', 'Thirty', 'Fifty'], c: 0, hint: 'Less than the price Judas later got.' },
      { t: 'order', q: 'Put the journey in order.', items: ['The special coat', 'Dreams', 'Thrown in the well and sold', 'Servant then prisoner in Egypt', 'Reads Pharaoh’s dream', 'Ruler of Egypt', 'Brothers bow and are forgiven'], hint: 'Seven stations.' },
      { t: 'blank', q: 'Finish Joseph’s sentence: “You meant it against me for evil, but God meant it for ______.”', a: ['good'], hint: 'Genesis 50:20.' },
      { t: 'match', q: 'Match the symbol to its meaning in Pharaoh’s dream.', pairs: [['Seven fat cows', 'Seven years of plenty'], ['Seven thin cows', 'Seven years of famine'], ['Grain stored', 'Joseph’s plan'], ['The cup in Benjamin’s sack', 'The test of his brothers']], hint: 'Egypt, dreams, famine.' },
      { t: 'sort', q: 'Sort true and false about this story.', buckets: [{ id: 't', name: 'True' }, { id: 'f', name: 'Not true' }], items: [{ text: 'Joseph forgave his brothers', b: 't' }, { text: 'God was with Joseph in prison', b: 't' }, { text: 'Joseph took revenge on his brothers', b: 'f' }, { text: 'Joseph became a shepherd in Canaan', b: 'f' }] }
    ],
    memory: { ref: 'Genesis 50:20', text: 'You meant it for evil, but God meant it for good.' },
    prayer: 'God, when people hurt me, help me do what Joseph did: trust You, and forgive. Amen.',
    badge: { name: 'Coat to Crown', art: 'coat', note: 'You know God turns pits into palaces.' },
    printable: {
      motif: 'coat', title: 'Seven sleeves: Joseph’s story board',
      prompts: ['Colour Joseph’s coat.', 'Around it draw seven boxes with one story moment in each.', 'Under the boxes copy Genesis 50:20.'],
      craft: { title: 'Grain store model', steps: ['Draw and cut a big barn from card.', 'Fill a cup with rice or lentils to show stored grain.', 'Label the barn “Joseph’s storehouse, Egypt”.'], note: 'Talk about how planning and trusting God go together.' }
    }
  });

  D.push({
    id: 'moses-basket', title: 'The Baby in the Basket', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'freedom', when: 20, path: 5, xp: 22, gentle: true,
    summary: 'A mother hid her baby in a basket on the river, and God used the enemy’s palace to raise him.',
    scripture: [{ ref: 'Exodus 2:9', text: 'Pharaoh’s daughter said to her, “Take this away, and nurse him for me, and I will give you your wages.”' }],
    story: [
      'Four hundred years after Joseph, the Egyptians were frightened of how many Israelites there were. So the king ordered baby boys to be thrown into the river. It was a terrifying time to have a baby.',
      'A woman named Jochebed had a son. She hid him for three months. Then she could not any more.',
      'So she did something astonishing: she made a small basket, sealed it with tar so it would float, put the baby in, and set it in the reeds of the Nile — the very river where the king had thrown boys.',
      'She left his sister Miriam watching from a distance to see what would happen.',
      'The king’s daughter came down to bathe. She found the basket, opened it, and heard a crying Hebrew baby. Miriam stepped out and asked, “Shall I get a Hebrew nurse for you?” She ran and fetched — the baby’s own mother.',
      'God is not in the habit of panicking. The plan of an empire was undone by a basket, a big sister, and a princess with a soft heart. The baby was named Moses: “drawn out”.'
    ],
    teach: ['Faith sometimes looks like a clever plan, not a fight.', 'Miriam and Pharaoh’s daughter are heroes too.', 'Moses was raised in the palace of the man who wanted him dead.'],
    quiz: [
      { t: 'mc', q: 'What did Moses’ mother put on the basket so it would float?', a: ['Tar and pitch', 'Glue', 'Wax candles', 'Mud'], c: 0 },
      { t: 'order', q: 'Put the rescue in order.', items: ['The king’s cruel order', 'Baby hidden three months', 'Basket in the reeds', 'Miriam watches', 'The princess finds him', 'His own mother is paid to nurse him'], hint: 'Hide, then float.' },
      { t: 'blank', q: 'The name Moses means “______ out” of the water.', a: ['drawn', 'draw out', 'drawed'], hint: 'The princess said it.' },
      { t: 'match', q: 'Match who did what.', pairs: [['Jochebed', 'Made the basket'], ['Miriam', 'Watched and spoke up'], ['Pharaoh’s daughter', 'Took the baby in'], ['Moses', 'Grew up in the palace']], hint: 'Four people, one rescue.' },
      { t: 'mc', q: 'Why is it surprising that Moses’ mother could nurse him?', a: ['She was hired and paid by the palace', 'She was a princess', 'The king allowed it', 'She was Miriam’s friend'], c: 0 }
    ],
    memory: { ref: 'Exodus 2:9', text: 'Take this away, and nurse him for me.' },
    prayer: 'God, You work quietly — through baskets and big sisters. Put courage in me for the small clever thing I should do. Amen.',
    badge: { name: 'River Faith', art: 'basket', note: 'You know God saves in quiet ways.' },
    printable: {
      motif: 'basket', title: 'Float it: a basket on the Nile',
      prompts: ['Colour the reeds green and the river blue.', 'Draw the basket with a baby inside, sealed with tar.', 'Label the six people in the story with their names.'],
      craft: { title: 'Will it float?', steps: ['Build a small boat from foil and one from card.', 'Put a pebble baby in each.', 'Test them in water — which one keeps the baby dry?'], note: 'Talk about why tar mattered — planning is part of faith.' }
    }
  });

  D.push({
    id: 'burning-bush', title: 'The Name in the Fire', tier: 'M', mode: 'lesson',
    track: 'god', testament: 'ot', era: 'freedom', when: 21, path: 6, xp: 22,
    summary: 'God spoke from a bush that burned and did not burn up, and told Moses His own name.',
    scripture: [{ ref: 'Exodus 3:14', text: 'God said to Moses, “I AM THAT I AM.” He said, “You shall tell the children of Israel this: ‘I AM has sent me to you.’”' },
                { ref: 'Exodus 3:5', text: 'Don’t come any closer. Take off your shoes, for the place where you stand is holy ground.' }],
    story: [
      'Moses had run away from Egypt forty years earlier after killing an Egyptian taskmaster. He was now eighty, keeping sheep for his father-in-law in the desert, with no palace and no plan.',
      'A bush on the hillside started burning. That happens — dry scrub catches. But Moses walked closer. The flames roared and the bush stayed green. It was not burning up.',
      'A voice called out: “Moses, Moses!” He answered, “Here I am.” God said, “Take off your shoes. This ground is holy.”',
      'Then God said, “I am the God of your father Abraham, the God of Isaac, and the God of Jacob.” Moses hid his face.',
      'Moses asked the obvious question: if they ask who sent me, what is His name? God answered, “I AM THAT I AM.” It means: I do not change, I do not begin, I simply am. All the promises in the Bible hang on that name.',
      'God then told Moses to go back to Egypt and demand, “Let my people go.” The man who had run away once was sent to face the same empire again.'
    ],
    teach: ['“I AM” is the reason God can be trusted with tomorrow.', 'Holy does not mean scary — it means completely other, and near.', 'God does not disqualified you by your past.'],
    quiz: [
      { t: 'mc', q: 'What was strange about the bush?', a: ['It burned but was not destroyed', 'It could talk', 'It was underwater', 'It was made of gold'], c: 0 },
      { t: 'blank', q: 'God’s answer about His name was “I ____ THAT I ____.”', a: ['am'], accept: ['am that am', 'i am'], hint: 'Two words, same one twice.' },
      { t: 'mc', q: 'Why did God tell Moses to remove his shoes?', a: ['The ground was holy', 'His shoes were dirty', 'It was an Egyptian custom', 'They were too tight'], c: 0 },
      { t: 'match', q: 'Match the detail to the story.', pairs: [['Moses’ age', 'Eighty'], ['His job', 'Shepherd'], ['“Here I am”', 'Moses’ answer'], ['Go back to', 'Egypt']], hint: 'Four facts from Exodus 3–4.' },
      { t: 'sort', q: 'Sort what the name “I AM” teaches.', buckets: [{ id: 'y', name: 'Yes, it teaches that' }, { id: 'n', name: 'No, not that' }], items: [{ text: 'God never changes', b: 'y' }, { text: 'God started when the world began', b: 'n' }, { text: 'God is able to keep every promise', b: 'y' }, { text: 'God only exists inside the bush', b: 'n' }] }
    ],
    memory: { ref: 'Exodus 3:14', text: 'I AM THAT I AM.' },
    prayer: 'I AM, You were before everything and You never change. That is why I can trust You with my tomorrow. Speak, and I will go. Amen.',
    badge: { name: 'Holy Ground', art: 'flame', note: 'You know the name of God.' },
    printable: {
      motif: 'flame', title: 'The bush that would not burn',
      prompts: ['Colour only the flames, leave the leaves green.', 'Draw shoes on the rock, taken off.', 'Write “I AM THAT I AM” in the sky above the bush.'],
      craft: { title: 'Names of God cards', steps: ['Cut eight strips of card.', 'On each, write a name of God you find this week (I AM, El Shaddai, Yahweh Jireh, Jehovah Rapha…).', 'Put one in your shoe by the door each morning.'], note: 'Eight names is a month of mornings.' }
    }
  });

  D.push({
    id: 'passover', title: 'The Night the Angel Passed Over', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'freedom', when: 22, path: 7, xp: 24, mature: true,
    summary: 'God judged Egypt and saved Israel with blood on a doorframe. It points straight at Jesus.',
    scripture: [{ ref: 'Exodus 12:13', text: 'The blood will be a sign for you on the houses where you are; and when I see the blood, I will pass over you, and no plague will be to destroy you.' },
                { ref: '1 Corinthians 5:7', text: 'Christ, our Passover lamb, has been sacrificed for us.' }],
    story: [
      'Nine times Pharaoh refused to let God’s people go. Nine times God answered, and Egypt learned who is really in charge. The last one was the hardest, and this is where we have to be honest: it hurt.',
      'God told Israel that at midnight every family in Egypt who had no blood on their door would lose their firstborn son. That is a serious and frightening verse. It is in the Bible, and the Bible does not hide it.',
      'So the Israelites killed a lamb without defect and painted some of its blood on the tops and sides of their doors. They ate dinner dressed for a journey — belt, sandals, staff, bread with no yeast — and they did not leave the house all night.',
      'Egypt cried that night. Israel did not. God said the same words three times: “When I see the blood, I will pass over you.”',
      'Then Pharaoh said go, and they went, in a hurry, with dough that had no time to rise. That is why Jews still eat flat matzo at Passover.',
      'God told them to tell this story to their children every year (Exodus 12:26). And much later, on the night of a Passover meal, Jesus took bread and said, “This is my body.” He called Himself the Lamb. That is where this story was heading all along.'
    ],
    teach: ['God judges evil; He also provides a way through it.', 'Salvation was always by blood on a door — never by good behaviour.', 'A lamb, a door, and a meal for children: Passover is a sermon a family can eat.'],
    hardNote: 'The death of the firstborn is stated plainly in one sentence with no scene or detail, and immediately answered with the protection of Israel. If a child asks more, an adult script is provided in the parent view.',
    quiz: [
      { t: 'mc', q: 'What was put on the doorposts so the family would be safe?', a: ['The blood of a lamb', 'Oil', 'Red paint', 'A knot of rope'], c: 0 },
      { t: 'order', q: 'Put the night in order.', items: ['A lamb is chosen without defect', 'Blood goes on the door', 'They eat dressed to travel', 'At midnight Egypt cries', 'Israel leaves in a hurry'], hint: 'Choose, paint, eat, go.' },
      { t: 'blank', q: 'Jesus is called our ______ lamb in 1 Corinthians 5:7.', a: ['passover'], hint: 'The meal they were eating that night.' },
      { t: 'match', q: 'Match the detail to its meaning.', pairs: [['Unleavened bread', 'No time to rise; hurry'], ['Hyssop branch', 'What they used to paint'], ['Bitter herbs', 'The bitterness of slavery'], ['Lamb without defect', 'Jesus, sinless']], hint: 'Four details, four meanings.' },
      { t: 'mc', q: 'Why did God’s people stay inside that night?', a: ['The blood on the door protected them', 'They were asleep', 'It was raining', 'Pharaoh locked them in'], c: 0 },
      { t: 'sort', q: 'Sort what the Passover teaches.', buckets: [{ id: 'g', name: 'God judged' }, { id: 's', name: 'God saved' }], items: [{ text: 'Egypt lost its firstborn', b: 'g' }, { text: '“When I see the blood, I pass over”', b: 's' }, { text: 'Nine earlier plagues on Egypt’s gods', b: 'g' }, { text: 'Israel walked out free', b: 's' }] }
    ],
    memory: { ref: 'Exodus 12:13', text: 'When I see the blood, I will pass over you.' },
    prayer: 'God, thank You that judgement and mercy met at a door. Thank You that Jesus is my Passover Lamb. Keep my family inside the blood. Amen.',
    badge: { name: 'Lamb’s Blood', art: 'cross', note: 'You know how Passover points to Jesus.' },
    printable: {
      motif: 'tablet', title: 'Passover night worksheet',
      prompts: ['Draw or colour a door with blood on the top and the sides.', 'Label the four things on the table: lamb, bitter herbs, bread, wine.', 'Write Exodus 12:13 at the bottom in your best handwriting.'],
      craft: { title: 'Family Passover plate', steps: ['Fold a paper plate in half to make a tent door.', 'Paint the top and side edges red.', 'Add a paper lamb and a bunch of hyssop leaves.'], note: 'Ask the child the Exodus 12:26 question and let them answer it.' }
    }
  });

  D.push({
    id: 'ten-commandments', title: 'Ten Words on a Mountain', tier: 'M', mode: 'lesson',
    track: 'values', testament: 'ot', era: 'freedom', when: 23, path: 8, xp: 22,
    summary: 'God did not give ten rules to make life small. He gave them to a family He had just rescued.',
    scripture: [{ ref: 'Exodus 20:2', text: 'I am Yahweh your God, who brought you out of Egypt, out of the land of slavery.' },
                { ref: 'Deuteronomy 6:6', text: 'These commandments that I am commanding you today must be on your heart.' }],
    story: [
      'Three months after the Passover night, Israel camped at the foot of Mount Sinai. The mountain smoked, the people stood far off, and God spoke ten sentences.',
      'The first thing to notice is verse two, before the rules: “I am Yahweh your God, who brought you out of slavery.” God rescued them first, then taught them how to live as free people.',
      'The first four words are about God: no other gods, no statues of Him, do not misuse His name, keep one day holy with rest and worship.',
      'The last six are about people: honour your parents, do not murder, do not commit adultery, do not steal, do not lie about your neighbour, do not even crave what is theirs.',
      'Jesus made them even simpler and even harder: love God with everything, love your neighbour as yourself — and He said the whole Bible hangs on those two.',
      'Read them as a guard rail, not a prison wall. God wrote them on stone so nobody could say He changed the rules. Then He promised to write them on our hearts (Jeremiah 31:33).'
    ],
    teach: ['Grace comes before law — verse 2 before verse 3.', 'Numbering the commandments differs between families of churches; the ten ideas do not.', 'Coveting is the one that starts inside, and Jesus said that is where it counts.'],
    quiz: [
      { t: 'mc', q: 'Which word comes before the rules in Exodus 20:2?', a: ['“I brought you out of slavery”', '“Obey me”', '“Be good”', '“Remember Sinai”'], c: 0 },
      { t: 'match', q: 'Match the commandment to what it protects.', pairs: [['No other gods', 'Who you love first'], ['Do not steal', 'What is yours'], ['Keep the Sabbath', 'Your rest and worship'], ['Honour your parents', 'Your home']], hint: 'Four of the ten.' },
      { t: 'blank', q: 'Jesus said the whole law hangs on two commands: love the Lord your God, and love your ______ as yourself.', a: ['neighbour'], accept: ['neighbor', 'your neighbour'], hint: 'Mark 12:31.' },
      { t: 'order', q: 'Put the mountain in order.', items: ['Israel camps at Sinai', 'The mountain smokes', 'God speaks ten words', 'The people stand far off', 'Moses stays on the mountain'], hint: 'Arrive, then hear.' },
      { t: 'sort', q: 'Sort the commands by who they are about.', buckets: [{ id: 'g', name: 'About God' }, { id: 'p', name: 'About people' }], items: [{ text: 'Do not misuse God’s name', b: 'g' }, { text: 'Do not lie about your neighbour', b: 'p' }, { text: 'No statues to worship', b: 'g' }, { text: 'Do not steal', b: 'p' }] }
    ],
    memory: { ref: 'Deuteronomy 6:6', text: 'These commandments must be on your heart.' },
    prayer: 'God, Your rules are good because You are good. Write them on my heart, not just on a board. Amen.',
    badge: { name: 'Two Tables', art: 'tablet', note: 'You know the ten words.' },
    printable: {
      motif: 'tablet', title: 'Two tablets to fill in',
      prompts: ['Draw two rounded-top stone tablets.', 'Write numbers 1–4 on the left, 5–10 on the right.', 'Under each one, write in your own words what it means.'],
      craft: { title: 'Heart copy', steps: ['Trace the ten words in tiny writing on card.', 'Fold the card into a heart shape.', 'Keep it in your Bible for a month.'], note: 'Deuteronomy 6:6-9 says to tie them on your hands — so a bracelet works too.' }
    }
  });

  D.push({
    id: 'jericho', title: 'March, Shout, Fall', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'homeland', when: 27, path: 9, xp: 22,
    summary: 'The strangest battle plan in the Bible: walk, blow trumpets, shout.',
    scripture: [{ ref: 'Joshua 6:20', text: 'The people shouted, and the priests blew the trumpets. When the people heard the sound of the trumpet, the people shouted with a great shout, and the wall fell down flat.' }],
    story: [
      'Moses had died, and Joshua had the job now. Israel stood at the Jordan with a fortified city on the other side: Jericho, the key to the land, with walls so wide two spies could hide inside them.',
      'God did not send a siege ramp or an army plan. He said: march around the city once a day for six days, with seven priests blowing trumpet horns in front of the ark. On the seventh day, go round seven times, then everybody shout.',
      'Do you see how silly that sounds to a soldier? For six weeks of marching, the people of Jericho watched from the wall and laughed.',
      'On the seventh morning they marched seven times, then Joshua said, “Shout, for Yahweh has given you the city.”',
      'The walls fell down flat. Not a crack in one corner — down. The people went straight in. Everything inside belonged to God and was destroyed, except Rahab and her family, because she had hidden the spies and tied the red cord.',
      'God had a reason for the strange method: so nobody could say “we did that”. He also made them stop and circumcise a whole nation at Gilgal first — trusting Him with a vulnerable moment before a battle. That is faith, not tactics.'
    ],
    teach: ['Obedience that looks foolish still beats cleverness without God.', 'Rahab the Canaanite ends up in Jesus’ family list (Matthew 1:5).', 'One red cord, one family saved — a picture of the blood of Jesus.'],
    hardNote: 'The destruction of Jericho (herem) is stated briefly with its reason given. An adult note explains holy war in the parent view.',
    quiz: [
      { t: 'mc', q: 'How many times did Israel march on the seventh day?', a: ['Seven', 'Once', 'Three', 'Forty'], c: 0 },
      { t: 'order', q: 'Put the battle in order.', items: ['Spies sent into Rahab’s house', 'Israel marches six days', 'Seven laps on day seven', 'The people shout', 'The walls fall flat', 'Rahab’s family is saved'], hint: 'Spies, then marching.' },
      { t: 'match', q: 'Match the number in Joshua 6.', pairs: [['7', 'Priests with trumpets'], ['1', 'Ark in the middle'], ['6', 'Days of marching'], ['3', 'Days after which walls fell? no—day seven'], ['14', 'Total laps around Jericho']], hint: 'Count the chapters.' },
      { t: 'blank', q: 'The girl who saved Rahab’s family because she tied a ______ cord in her window.', a: ['red', 'scarlet'], hint: 'It hung over the wall.' },
      { t: 'mc', q: 'Why did God choose marching instead of attacking?', a: ['So nobody could boast about their own strength', 'Because the army was tired', 'To make it take longer', 'Because Joshua was afraid'], c: 0 }
    ],
    memory: { ref: 'Joshua 1:9', text: 'Be strong and of good courage. Don’t be terrified, for Yahweh your God is with you wherever you go.' },
    prayer: 'God, sometimes Your way makes no sense. Give me Joshua’s answer: I will do it anyway. Amen.',
    badge: { name: 'Shout Day', art: 'wall', note: 'You obeyed without understanding.' },
    printable: {
      motif: 'wall', title: 'Draw the walls of Jericho falling',
      prompts: ['Draw the city on its mound with huge walls.', 'Draw seven priests with curved horns going around it.', 'Draw one window with a red cord still standing.'],
      craft: { title: 'Card towers', steps: ['Stack twelve cards into a wall around a cup.', 'Set it down and blow a paper trumpet at it.', 'Talk about what God can do that we cannot.'], note: 'Do it over a table to catch the cards.' }
    }
  });

  D.push({
    id: 'gideon', title: 'Gideon’s Three Hundred', tier: 'M', mode: 'story',
    track: 'god', testament: 'ot', era: 'homeland', when: 29, path: 10, xp: 22,
    summary: 'God cut an army from thirty-two thousand down to three hundred, with jars and torches.',
    scripture: [{ ref: 'Judges 6:14', text: 'Go in this your might, and deliver Israel from the hand of Midian. Haven’t I sent you?' },
                { ref: 'Judges 7:2', text: 'The people who are with you are too many for me to give the Midianites into their hand, lest Israel glory against me.' }],
    story: [
      'Midian had become a plague. Every autumn their camels and raiders swept the fields and took everything, so the Israelites hid in mountain caves. That is when the angel found Gideon hiding his wheat in a winepress.',
      '“Yahweh is with you, you mighty man of valour,” the angel said — to a frightened man hiding grain. Gideon answered honestly: “If Yahweh is with us, why has all this happened?” God did not sulk. He said, “Go.”',
      'Gideon blew the trumpet and thirty-two thousand came. God said, “Too many.” They sent twenty-two thousand home for fear. Then they drank water at the stream and three hundred were kept.',
      'Three hundred, against a valley full of tents, camels and men. And God did not even give them swords. He gave them torches inside clay jars, and trumpets.',
      'At midnight they smashed the jars, raised the torches, blew the horns and shouted, “The sword of Yahweh and of Gideon!” Panic ran through the camp, and God won the battle.',
      'Gideon asked for one sign, then two, with a fleece of wool — and God was patient with him both times. Faith that asks questions is not the same as unbelief. Just do not make God prove Himself forever: later he still stumbled, and the same three hundred stood firm for him.'
    ],
    teach: ['God sizes the army down so the glory stays His.', 'Fleece tests: God is patient with small faith, but He does not owe us signs.', 'Gideon means “hewer/cutter down” — a man who cut his idols down first (Judges 6:25-27), at night, because he was scared.'],
    quiz: [
      { t: 'mc', q: 'How many men did God finally keep?', a: ['300', '32,000', '10,000', '12'], c: 0 },
      { t: 'order', q: 'Put the army cut in order.', items: ['32,000 arrive', 'The fearful go home', '22,000 left', 'Men drink at the water', '300 remain'], hint: 'Two rounds of narrowing.' },
      { t: 'match', q: 'Match the weapon to the story.', pairs: [['Torch in a jar', 'Light at midnight'], ['Trumpet', 'The shout'], ['Fleece of wool', 'Gideon’s two signs'], ['Empty jug', 'What they smashed']], hint: 'Four props.' },
      { t: 'blank', q: 'God called frightened Gideon “you ______ man of valour”.', a: ['mighty'], hint: 'Judges 6:12.' },
      { t: 'sort', q: 'Sort true and false about Gideon.', buckets: [{ id: 't', name: 'True' }, { id: 'f', name: 'Not true' }], items: [{ text: 'He hid in a winepress when God called him', b: 't' }, { text: 'He asked God for a sign with wool', b: 't' }, { text: 'He led ten thousand swordsmen', b: 'f' }, { text: 'He was afraid', b: 'f' }] }
    ],
    memory: { ref: 'Judges 6:14', text: 'Haven’t I sent you?' },
    prayer: 'God, I feel small and frightened like Gideon. You still said “go”. Send me, and take the glory. Amen.',
    badge: { name: 'Torch Bearer', art: 'lantern', note: 'You are enough when God is.' },
    printable: {
      motif: 'lantern', title: 'Three hundred torches',
      prompts: ['Draw and count the jars with flames inside.', 'Write the 3 numbers of the shrinking army: 32000 → 10000 → 300.', 'Under it write “Not by might, but by my Spirit” (Zechariah 4:6).'],
      craft: { title: 'Jar torch', steps: ['Put a battery tea-light inside a small jar.', 'Tape a paper flame over the top.', 'Turn the lights off and smash-open the lid to show the light.'], note: 'Never use a real flame with children.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_3 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
