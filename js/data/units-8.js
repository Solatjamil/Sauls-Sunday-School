/* =====================================================================
   Curriculum batch 8 — more stories & learning across L / M / H.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  /* ---------- L Seedlings ---------- */
  D.push({
    id: 'baby-moses', title: 'Baby Moses in the Basket', tier: 'L', mode: 'story',
    track: 'promise', testament: 'ot', era: 'freedom', when: 39, path: 25, xp: 20,
    summary: 'God kept baby Moses safe in a basket on the river — and his sister watched nearby.',
    scripture: [{ ref: 'Exodus 2:3', text: 'She took a papyrus basket for him, and coated it with tar and with pitch. She put the child in it, and laid it in the reeds by the river’s bank.' }],
    story: [
      'A baby boy was born when life was hard for God’s people. His mum loved him very much.',
      'She made a little basket, made it safe from water, and put baby Moses in it by the river.',
      'His sister Miriam watched. A princess found the basket. God was keeping the baby safe.',
      'Moses grew up and later helped God’s people. God watches over little children.'
    ],
    teach: ['God sees babies and families.', 'Brave love protects.', 'God’s plans can start very small.'],
    quiz: [
      { t: 'mc', q: 'Where was baby Moses placed?', a: ['In a basket by the river', 'In a cave', 'In a boat on the sea', 'In a tall tower'], c: 0 },
      { t: 'tap', q: 'Who watched nearby?', a: ['His sister', 'A lion', 'A king only'], c: 0 },
      { t: 'match', q: 'Match the helper.', pairs: [['Mum', 'Made the basket'], ['Miriam', 'Watched'], ['Princess', 'Found him'], ['God', 'Kept him safe']], hint: 'Who did what?' },
      { t: 'mc', q: 'What does this story show?', a: ['God protects little ones', 'Rivers are toys', 'Baskets can fly', 'Sisters should hide forever'], c: 0 }
    ],
    memory: { ref: 'Psalm 139:14', text: 'I will give thanks to you, for I am fearfully and wonderfully made.' },
    prayer: 'God, thank You for watching over me like You watched baby Moses. Amen.',
    badge: { name: 'River Basket', art: 'boat', note: 'You met baby Moses.' },
    printable: {
      motif: 'boat', title: 'Basket on the Nile',
      prompts: ['Colour the basket and reeds.', 'Draw Miriam watching.', 'Write “God keeps me safe”.'],
      craft: { title: 'Paper basket', steps: ['Fold a small paper basket.', 'Put a paper baby inside.', 'Float it briefly in a shallow dish with an adult.'], note: 'Supervise water play.' }
    }
  });

  D.push({
    id: 'david-harp', title: 'David’s Quiet Harp', tier: 'L', mode: 'story',
    track: 'prayer', testament: 'ot', era: 'kings', when: 40, path: 26, xp: 18,
    summary: 'Young David played the harp and sang to God — music can be prayer.',
    scripture: [{ ref: '1 Samuel 16:23', text: 'David took the harp, and played with his hand; so Saul was refreshed, and was well.' }],
    story: [
      'David was a shepherd boy. At night he looked at the stars and sang to God.',
      'He played a harp — soft music that helped worried hearts feel calm.',
      'Even the king felt better when David played. God can use music to help people.',
      'You can hum a thank-you song to God too. Prayer can sound like music.'
    ],
    teach: ['Music can be prayer.', 'God cares when we feel worried.', 'Gifts can help others.'],
    quiz: [
      { t: 'mc', q: 'What did David play?', a: ['A harp', 'A drum only', 'A trumpet only', 'Nothing'], c: 0 },
      { t: 'tap', q: 'How can music help?', a: ['Calm a worried heart', 'Make rain stop forever', 'Cook dinner'], c: 0 },
      { t: 'order', q: 'Order the story.', items: ['David the shepherd', 'He plays the harp', 'Worried hearts feel better', 'We can sing thank-you too'], hint: 'Shepherd first.' },
      { t: 'mc', q: 'Who can sing to God?', a: ['Children too', 'Only kings', 'Only angels', 'Only grown singers'], c: 0 }
    ],
    memory: { ref: 'Psalm 92:1', text: 'It is a good thing to give thanks to Yahweh.' },
    prayer: 'God, help my songs and hums be thank-you prayers. Amen.',
    badge: { name: 'Little Harp', art: 'harp', note: 'You learned David’s music prayer.' },
    printable: {
      motif: 'harp', title: 'Draw a harp',
      prompts: ['Draw strings on a harp.', 'Write one thank-you line.', 'Colour the night sky.'],
      craft: { title: 'Rubber-band harp', steps: ['Stretch rubber bands on a small box.', 'Pluck gently.', 'Sing a short thank-you.'], note: 'Adult helps with bands.' }
    }
  });

  D.push({
    id: 'jesus-blesses-kids', title: 'Jesus Blesses Children', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'taught', when: 41, path: 27, xp: 20,
    summary: 'People brought children to Jesus. He welcomed them and blessed them.',
    scripture: [{ ref: 'Mark 10:14', text: 'When Jesus saw it, he was moved with indignation, and said to them, “Allow the little children to come to me! Don’t forbid them, for God’s Kingdom belongs to such as these.”' }],
    story: [
      'Mums and dads brought little children to Jesus so He could bless them.',
      'Some grown-ups said, “Go away — Jesus is too busy.”',
      'Jesus was not happy about that. He said, “Let the children come to Me.”',
      'He held them and blessed them. Jesus has time for children — including you.'
    ],
    teach: ['Jesus welcomes children.', 'You matter to God.', 'Grown-ups should make space for kids.'],
    quiz: [
      { t: 'mc', q: 'What did Jesus say about children?', a: ['Let them come to Me', 'Send them away', 'Only quiet kids may come', 'Come back when older'], c: 0 },
      { t: 'tap', q: 'How did Jesus treat the children?', a: ['Welcomed and blessed them', 'Ignored them', 'Scolded them'], c: 0 },
      { t: 'match', q: 'Match the feeling.', pairs: [['Parents', 'Brought children'], ['Some grown-ups', 'Tried to stop them'], ['Jesus', 'Welcomed them'], ['Children', 'Are precious to God']], hint: 'Who did what?' },
      { t: 'mc', q: 'Who is welcome with Jesus?', a: ['Children too', 'Only teachers', 'Only tall people', 'Only rich people'], c: 0 }
    ],
    memory: { ref: 'Mark 10:14', text: 'Allow the little children to come to me.' },
    prayer: 'Jesus, thank You that I can come to You. Bless my family today. Amen.',
    badge: { name: 'Welcome Child', art: 'heart', note: 'Jesus welcomes you.' },
    printable: {
      motif: 'heart', title: 'Blessing hands',
      prompts: ['Draw Jesus with children.', 'Write your name near Him.', 'Colour happy faces.'],
      craft: { title: 'Blessing crown', steps: ['Paper crown.', 'Write “Jesus welcomes me”.', 'Wear it at prayer time.'], note: 'Celebrate belonging.' }
    }
  });

  D.push({
    id: 'lame-man-walks', title: 'A Lame Man Walks', tier: 'L', mode: 'story',
    track: 'church', testament: 'nt', era: 'church', when: 42, path: 28, xp: 20,
    summary: 'Peter and John met a man who could not walk. In Jesus’ name he stood up.',
    scripture: [{ ref: 'Acts 3:6', text: 'Peter said, “I have no silver or gold, but what I have, that I give you. In the name of Jesus Christ of Nazareth, walk.”' }],
    story: [
      'A man sat by the temple gate. He could not walk. He asked for help each day.',
      'Peter and John came. They did not have coins, but they had Jesus.',
      'Peter said, “In the name of Jesus, walk!” He helped the man up.',
      'The man walked and jumped and praised God. Friends of Jesus share the best gift — Jesus Himself.'
    ],
    teach: ['Jesus’ name is powerful.', 'We give what we have in love.', 'Praise is a happy response.'],
    quiz: [
      { t: 'mc', q: 'What could the man not do at first?', a: ['Walk', 'Smile', 'Talk', 'See'], c: 0 },
      { t: 'tap', q: 'In whose name did Peter speak?', a: ['Jesus', 'A soldier', 'A coin'], c: 0 },
      { t: 'order', q: 'Put the miracle in order.', items: ['Man at the gate', 'Peter speaks Jesus’ name', 'Man stands', 'He praises God'], hint: 'Gate first.' },
      { t: 'mc', q: 'What is the best gift friends of Jesus share?', a: ['Jesus Himself', 'Only money', 'Only toys', 'Only food forever'], c: 0 }
    ],
    memory: { ref: 'Acts 3:8', text: 'Leaping up, he stood, began to walk, and entered with them into the temple… praising God.' },
    prayer: 'Jesus, thank You for helping people. Help me share Your love. Amen.',
    badge: { name: 'Jumping Praise', art: 'hands', note: 'You saw the lame man walk.' },
    printable: {
      motif: 'hands', title: 'Gate and joy',
      prompts: ['Draw the temple gate.', 'Draw the man walking.', 'Write “Thank You, Jesus”.'],
      craft: { title: 'Praise flags', steps: ['Make two paper flags.', 'Write praise words.', 'Wave them while singing.'], note: 'Joyful movement.' }
    }
  });

  /* ---------- M Builders ---------- */
  D.push({
    id: 'gideon-few', title: 'Gideon’s Few', tier: 'M', mode: 'story',
    track: 'god', testament: 'ot', era: 'homeland', when: 124, path: 25, xp: 28,
    summary: 'God reduced Gideon’s army so Israel would know the victory was the Lord’s.',
    scripture: [{ ref: 'Judges 7:2', text: 'Yahweh said to Gideon, “The people who are with you are too many for me to give the Midianites into their hand, lest Israel brag against me, saying, ‘My own hand has saved me.’”' }],
    story: [
      'Israel was afraid of Midian. God called Gideon — who felt small — to lead.',
      'Gideon gathered many soldiers. God said, “Too many.” He reduced them again and again.',
      'Only a few hundred remained with torches and trumpets. God wanted the credit to be His.',
      'At night they broke jars, shone lights, and blew trumpets. The enemy fled in confusion.',
      'God saves in ways that teach trust, not boasting.'
    ],
    teach: ['God’s power is enough when we feel small.', 'Boasting steals glory from God.', 'Obedience matters more than numbers.'],
    quiz: [
      { t: 'mc', q: 'Why did God reduce the army?', a: ['So Israel would not boast', 'Because fighting is fun', 'To make Gideon rich', 'To hide the torches'], c: 0 },
      { t: 'blank', q: 'God said the people were too ____.', a: ['many'], hint: 'Judges 7:2' },
      { t: 'match', q: 'Match the tool.', pairs: [['Torch', 'Light in the dark'], ['Trumpet', 'Loud signal'], ['Jar', 'Hidden then broken'], ['Few soldiers', 'Trust God not numbers']], hint: 'Gideon’s night.' },
      { t: 'order', q: 'Order the events.', items: ['Big army gathers', 'God says too many', 'Only a few left', 'Night victory God’s way'], hint: 'Big first.' },
      { t: 'mc', q: 'What should we remember when we win?', a: ['Thank God — don’t boast', 'Boast loudly', 'Forget God', 'Trust only numbers'], c: 0 }
    ],
    memory: { ref: 'Judges 7:2', text: 'Lest Israel brag against me, saying, “My own hand has saved me.”' },
    prayer: 'Lord, when I feel small, teach me to trust Your strength and give You the glory. Amen.',
    badge: { name: 'Torch Trust', art: 'flame', note: 'You learned Gideon’s lesson.' },
    printable: {
      motif: 'flame', title: 'Torch and trumpet',
      prompts: ['Draw jar, torch, trumpet.', 'Write one boast you refuse.', 'Write one trust prayer.'],
      craft: { title: 'Paper torch', steps: ['Roll red/orange paper flame.', 'Tape to a stick.', 'Shout “For the Lord!” once — then pray quietly.'], note: 'Balance courage and humility.' }
    }
  });

  D.push({
    id: 'daniel-prays', title: 'Daniel’s Open Window', tier: 'M', mode: 'story',
    track: 'prayer', testament: 'ot', era: 'return', when: 125, path: 26, xp: 28,
    summary: 'Daniel kept praying toward Jerusalem even when a law tried to stop him.',
    scripture: [{ ref: 'Daniel 6:10', text: 'When Daniel knew that the writing was signed, he went into his house (now his windows were open in his room toward Jerusalem) and he kneeled on his knees three times a day, and prayed.' }],
    story: [
      'Daniel loved God and served well in a foreign land. Jealous men tricked the king into a bad law: pray only to the king for thirty days.',
      'Daniel heard the law. He went home, opened his windows toward Jerusalem, and prayed as before — three times a day.',
      'He was thrown into a lions’ den. God shut the lions’ mouths. Daniel was lifted out unharmed.',
      'The king learned that Daniel’s God is living. Courage is often ordinary faithfulness under pressure.',
      'Prayer habits formed in peace become strength in trouble.'
    ],
    teach: ['Habits of prayer matter.', 'Obey God even when costly.', 'God can shut lions’ mouths — and calm fear.'],
    quiz: [
      { t: 'mc', q: 'What did Daniel keep doing?', a: ['Praying to God', 'Hiding forever', 'Worshipping the king only', 'Running away at once'], c: 0 },
      { t: 'blank', q: 'Daniel prayed ____ times a day.', a: ['three', '3'], hint: 'Daniel 6:10' },
      { t: 'sort', q: 'Sort brave faith vs fear-only.', buckets: [{ id: 'b', name: 'Brave faith' }, { id: 'f', name: 'Fear-only' }], items: [{ text: 'Keep praying as before', b: 'b' }, { text: 'Stop prayer to stay safe at any cost', b: 'f' }, { text: 'Trust God in the den', b: 'b' }, { text: 'Never pray again', b: 'f' }] },
      { t: 'match', q: 'Match detail.', pairs: [['Open windows', 'Not secret shame'], ['Three times a day', 'Habit'], ['Lions’ den', 'Danger'], ['God', 'Shut lions’ mouths']], hint: 'Daniel 6.' },
      { t: 'mc', q: 'When is prayer habit most valuable?', a: ['In trouble — because it was built before', 'Only on holidays', 'Only when easy', 'Never in public'], c: 0 }
    ],
    memory: { ref: 'Daniel 6:23', text: 'So Daniel was taken up out of the den, and no kind of harm was found on him, because he had trusted in his God.' },
    prayer: 'God of Daniel, build my prayer habit now. When pressure comes, keep me faithful. Amen.',
    badge: { name: 'Open Window', art: 'lantern', note: 'You learned Daniel’s prayer courage.' },
    printable: {
      motif: 'lantern', title: 'Prayer window card',
      prompts: ['Draw open windows.', 'Write your three prayer times.', 'List one pressure kids face for faith.'],
      craft: { title: 'Kneeling reminder stone', steps: ['Paint a smooth stone.', 'Write “3× pray”.', 'Keep it by your bed.'], note: 'Parents help choose times.' }
    }
  });

  D.push({
    id: 'martha-mary', title: 'Martha and Mary', tier: 'M', mode: 'lesson',
    track: 'jesus', testament: 'nt', era: 'taught', when: 126, path: 27, xp: 26,
    summary: 'Jesus visits two sisters — service is good, but listening to Him comes first.',
    scripture: [{ ref: 'Luke 10:42', text: 'But one thing is needed. Mary has chosen the good part, which will not be taken away from her.' }],
    story: [
      'Jesus came to Martha and Mary’s home. Martha hurried to serve — cooking, hosting, fixing.',
      'Mary sat at Jesus’ feet and listened to His words.',
      'Martha felt alone and upset: “Tell her to help me!” Serving had become stressed and comparing.',
      'Jesus was gentle: Martha, you are worried about many things. One thing is needed. Mary chose the good part.',
      'Jesus is not against helping. He is against a heart so busy it misses Him. First presence — then service overflows.'
    ],
    teach: ['Listening to Jesus is not laziness.', 'Service needs love, not resentment.', 'Priorities: presence before performance.'],
    quiz: [
      { t: 'mc', q: 'What did Mary choose?', a: ['Listening to Jesus', 'Ignoring the guest', 'Arguing only', 'Leaving the house'], c: 0 },
      { t: 'blank', q: '“One thing is ____.”', a: ['needed', 'needful', 'necessary'], hint: 'Luke 10:42' },
      { t: 'sort', q: 'Sort wise priority vs stressed hurry.', buckets: [{ id: 'w', name: 'Wise' }, { id: 's', name: 'Stressed hurry' }], items: [{ text: 'Sit and hear Jesus', b: 'w' }, { text: 'Serve with resentment', b: 's' }, { text: 'Work from love after listening', b: 'w' }, { text: 'Compare and complain', b: 's' }] },
      { t: 'match', q: 'Match person to action.', pairs: [['Martha', 'Busy serving'], ['Mary', 'Listening'], ['Jesus', 'Names the better part'], ['Home', 'Place of welcome']], hint: 'Luke 10.' },
      { t: 'mc', q: 'What was wrong in Martha’s moment?', a: ['Worry and comparison while serving', 'That she cooked at all', 'That Mary existed', 'That Jesus visited'], c: 0 }
    ],
    memory: { ref: 'Luke 10:42', text: 'Mary has chosen the good part, which will not be taken away from her.' },
    prayer: 'Jesus, slow my hurry. Let me hear You first, then serve with joy. Amen.',
    badge: { name: 'Better Part', art: 'house', note: 'You sat with Martha and Mary.' },
    printable: {
      motif: 'house', title: 'One-thing list',
      prompts: ['List “many things” that worry you.', 'Circle the one thing: time with Jesus.', 'Plan 10 quiet minutes today.'],
      craft: { title: 'Two plates', steps: ['Label plates: Busy / Better part.', 'Put prayer notes on Better part.', 'Cook or help later with a calm heart.'], note: 'Family discussion friendly.' }
    }
  });

  D.push({
    id: 'timothy-young', title: 'Timothy the Young Leader', tier: 'M', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'church', when: 127, path: 28, xp: 28,
    summary: 'Paul encourages Timothy — youth is no excuse; set an example in love and truth.',
    scripture: [{ ref: '1 Timothy 4:12', text: 'Let no man despise your youth; but be an example to those who believe, in word, in way of life, in love, in spirit, in faith, and in purity.' }],
    story: [
      'Timothy was young, and some people might have looked down on that. Paul wrote to steady him.',
      '“Let no one despise your youth.” Age is not the measure — example is.',
      'Example in word, life, love, faith, and purity. Leadership starts as a pattern others can trust.',
      'Timothy had sincere faith from his family line, and a gift to fan into flame. God uses young disciples.',
      'You may be young, but you can already practice truth-telling, kindness, courage, and clean living.'
    ],
    teach: ['Youth can lead by example.', 'Character outruns titles.', 'Fan into flame what God has given.'],
    quiz: [
      { t: 'mc', q: 'What should Timothy be?', a: ['An example to believers', 'Silent forever because young', 'Famous only', 'Harsh to older people'], c: 0 },
      { t: 'blank', q: 'Let no one despise your ____.', a: ['youth'], hint: '1 Timothy 4:12' },
      { t: 'match', q: 'Match example area.', pairs: [['Word', 'How you speak'], ['Love', 'How you care'], ['Faith', 'How you trust'], ['Purity', 'How you stay clean-hearted']], hint: '1 Tim 4:12 list.' },
      { t: 'order', q: 'Order growth.', items: ['Receive faith and gift', 'Do not fear youth', 'Practice example daily', 'Encourage others'], hint: 'Receive first.' },
      { t: 'mc', q: 'What makes young leadership trustworthy?', a: ['Consistent example', 'Loud opinions only', 'Age alone', 'Ignoring purity'], c: 0 }
    ],
    memory: { ref: '1 Timothy 4:12', text: 'Let no man despise your youth; but be an example to those who believe.' },
    prayer: 'Lord, make my youth a good example — in words, love, faith, and purity. Amen.',
    badge: { name: 'Young Example', art: 'scroll', note: 'You learned Timothy’s charge.' },
    printable: {
      motif: 'scroll', title: 'Example checklist',
      prompts: ['Rate word/life/love/faith/purity this week.', 'Write one improve step.', 'Thank a mentor like Paul.'],
      craft: { title: 'Timothy card', steps: ['Card with 1 Timothy 4:12.', 'Decorate borders.', 'Keep in journal.'], note: 'Great for preteens.' }
    }
  });

  /* ---------- H Explorers ---------- */
  D.push({
    id: 'isaiah-call', title: 'Isaiah’s Holy Call', tier: 'H', mode: 'lesson',
    track: 'god', testament: 'ot', era: 'prophets', when: 203, path: 21, xp: 36, mature: true,
    summary: 'Isaiah 6 — holy vision, confession, cleansing, and “Here I am; send me.”',
    scripture: [{ ref: 'Isaiah 6:8', text: 'I heard the Lord’s voice, saying, “Whom shall I send, and who will go for us?” Then I said, “Here I am. Send me!”' }],
    story: [
      'In the year King Uzziah died, Isaiah saw the Lord high and lifted up. Holiness shook the doorposts.',
      'Seraphim cried “Holy, holy, holy.” Real worship starts with God’s otherness — not our preferences.',
      'Isaiah’s first response was not strategy. It was confession: “Woe is me… I am a man of unclean lips.”',
      'A coal from the altar touched his lips — guilt taken away. Commission follows cleansing.',
      'Then the call: Whom shall I send? Isaiah answers, “Here I am; send me.” Availability is worship.',
      'The message would be hard; the soil often dull. Still the holy seed would not be wasted forever.'
    ],
    teach: ['Holiness precedes mission.', 'Confession is honest worship.', 'God sends cleansed people, not self-made heroes.'],
    quiz: [
      { t: 'mc', q: 'What did Isaiah see first?', a: ['The Lord’s holiness', 'A easy crowd', 'A map of nations', 'His own greatness'], c: 0 },
      { t: 'blank', q: 'Isaiah said, “Here I am. ____ me!”', a: ['Send', 'send'], hint: 'Isaiah 6:8' },
      { t: 'match', q: 'Match movement.', pairs: [['Vision of holiness', 'God first'], ['Woe is me', 'Confession'], ['Coal on lips', 'Cleansing'], ['Send me', 'Mission']], hint: 'Isaiah 6 flow.' },
      { t: 'sort', q: 'Sort true call vs fake call.', buckets: [{ id: 't', name: 'True' }, { id: 'f', name: 'Fake' }], items: [{ text: 'Confess then go', b: 't' }, { text: 'Skip holiness, chase platform', b: 'f' }, { text: 'Available to God', b: 't' }, { text: 'Serve only for applause', b: 'f' }] },
      { t: 'mc', q: 'Why is confession before sending important?', a: ['Guilt is dealt with at God’s altar', 'So we sound sad', 'To avoid all hard work', 'To impress angels'], c: 0 },
      { t: 'type', q: 'Write your own “send me” sentence for this week.', a: ['send', 'here', 'help', 'serve', 'go'], hint: 'send / serve / help…' }
    ],
    memory: { ref: 'Isaiah 6:3', text: 'Holy, holy, holy, is Yahweh of Armies! The whole earth is full of his glory!' },
    prayer: 'Holy God, show me Your glory, cleanse my lips, and send me where You want. Amen.',
    badge: { name: 'Send Me', art: 'flame', note: 'You stood in Isaiah 6.' },
    printable: {
      motif: 'flame', title: 'Isaiah 6 map',
      prompts: ['Diagram: holiness → confession → cleansing → sending.', 'Journal unclean lips you confess.', 'Write one send-me act.'],
      craft: { title: 'Coal paper symbol', steps: ['Black/red paper “coal”.', 'Write “cleansed”.', 'On reverse “send me”.'], note: 'Handle awe carefully.' }
    }
  });

  D.push({
    id: 'beatitudes-path', title: 'The Beatitudes Path', tier: 'H', mode: 'lesson',
    track: 'jesus', testament: 'nt', era: 'taught', when: 204, path: 22, xp: 36,
    summary: 'Matthew 5:1–12 — kingdom happiness upside-down: poor in spirit, merciful, peacemakers.',
    scripture: [{ ref: 'Matthew 5:3', text: 'Blessed are the poor in spirit, for theirs is the Kingdom of Heaven.' },
                { ref: 'Matthew 5:9', text: 'Blessed are the peacemakers, for they shall be called children of God.' }],
    story: [
      'Jesus sits on the mountain and redefines “blessed.” Not the loud, the proud, or the vengeful first.',
      'Poor in spirit: empty hands before God. Mourning: honest grief that finds comfort.',
      'Meekness is strength under God’s control. Hunger for righteousness wants what God wants.',
      'Merciful people have received mercy. Pure in heart want one audience — God.',
      'Peacemakers do costly repair. The persecuted show the kingdom is real enough to suffer for.',
      'The Beatitudes are not a ladder to climb for pride. They are a portrait of life under the King.'
    ],
    teach: ['Kingdom values invert worldly status.', 'Character is blessing.', 'Peacemaking is active, not passive.'],
    quiz: [
      { t: 'mc', q: 'Who are called children of God in the Beatitudes?', a: ['Peacemakers', 'Only the famous', 'Only the angry', 'Only the rich'], c: 0 },
      { t: 'blank', q: 'Blessed are the poor in ____.', a: ['spirit'], hint: 'Matthew 5:3' },
      { t: 'match', q: 'Match beatitude to gift.', pairs: [['Poor in spirit', 'Kingdom'], ['Mourn', 'Comfort'], ['Merciful', 'Mercy'], ['Peacemakers', 'Called God’s children']], hint: 'Matt 5.' },
      { t: 'sort', q: 'Sort kingdom vs worldly “blessed”.', buckets: [{ id: 'k', name: 'Kingdom' }, { id: 'w', name: 'Worldly' }], items: [{ text: 'Mercy', b: 'k' }, { text: 'Crush rivals', b: 'w' }, { text: 'Pure heart', b: 'k' }, { text: 'Image over integrity', b: 'w' }] },
      { t: 'mc', q: 'What is meekness closest to?', a: ['Strength under God’s control', 'Weak silence always', 'Pride in disguise', 'Never caring'], c: 0 },
      { t: 'type', q: 'Name one peacemaking step you can take this week.', a: ['forgive', 'listen', 'apologize', 'pray', 'help', 'peace'], hint: 'forgive/listen/apologize…' }
    ],
    memory: { ref: 'Matthew 5:9', text: 'Blessed are the peacemakers, for they shall be called children of God.' },
    prayer: 'King Jesus, reshape what I call “blessed.” Make me poor in spirit, merciful, and a peacemaker. Amen.',
    badge: { name: 'Mountain Hearer', art: 'scroll', note: 'You walked the Beatitudes.' },
    printable: {
      motif: 'scroll', title: 'Beatitudes journal',
      prompts: ['Copy all eight.', 'Star the hardest for you.', 'Plan one merciful act and one peacemaking act.'],
      craft: { title: 'Blessed path stones', steps: ['Eight paper stones.', 'One beatitude each.', 'Lay a path and walk it praying.'], note: 'Great group activity.' }
    }
  });

  D.push({
    id: 'fruit-spirit', title: 'Fruit of the Spirit', tier: 'H', mode: 'lesson',
    track: 'spirit', testament: 'nt', era: 'church', when: 205, path: 23, xp: 34,
    summary: 'Galatians 5 — walk by the Spirit; love, joy, peace and the whole fruit grow in community.',
    scripture: [{ ref: 'Galatians 5:22-23', text: 'The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control.' }],
    story: [
      'Paul contrasts works of the flesh with fruit of the Spirit. One is a list of fractures; the other is a harvest.',
      'Fruit is singular — one life producing a cluster: love at the center, then joy, peace, patience…',
      'You cannot fake fruit overnight. Trees grow by roots — walking by the Spirit, not by performance theatre.',
      'Against such things there is no law. Spirit-shaped character fulfils what rules alone cannot.',
      'Those who belong to Christ crucify fleshly patterns and keep in step with the Spirit daily.',
      'Fruit shows in how we treat people when it costs us — family, church, rivals, the weak.'
    ],
    teach: ['Fruit grows from the Spirit, not from grit alone.', 'Character is public theology.', 'Keep in step — ongoing.'],
    quiz: [
      { t: 'mc', q: 'How many items are listed as fruit of the Spirit?', a: ['Nine in one fruit cluster', 'Nine separate religions', 'Only love', 'Only self-control'], c: 0 },
      { t: 'blank', q: 'The fruit of the Spirit is love, joy, ____…', a: ['peace'], hint: 'Galatians 5:22' },
      { t: 'match', q: 'Match fruit to moment.', pairs: [['Patience', 'Waiting without snap'], ['Kindness', 'Helpful warmth'], ['Self-control', 'Stopping a harsh word'], ['Peace', 'Steady trust']], hint: 'Everyday fruit.' },
      { t: 'sort', q: 'Sort flesh vs Spirit.', buckets: [{ id: 'f', name: 'Flesh pattern' }, { id: 's', name: 'Spirit fruit' }], items: [{ text: 'Rage post', b: 'f' }, { text: 'Gentle answer', b: 's' }, { text: 'Jealous flex', b: 'f' }, { text: 'Patient listening', b: 's' }] },
      { t: 'mc', q: 'How does fruit mainly grow?', a: ['Walking by the Spirit over time', 'One shout of willpower forever', 'Ignoring people', 'Only private feelings'], c: 0 },
      { t: 'type', q: 'Which fruit will you practice on purpose tomorrow?', a: ['love', 'joy', 'peace', 'patience', 'kindness', 'goodness', 'faith', 'faithfulness', 'gentleness', 'self-control', 'self control'], hint: 'name one fruit' }
    ],
    memory: { ref: 'Galatians 5:25', text: 'If we live by the Spirit, let’s also walk by the Spirit.' },
    prayer: 'Holy Spirit, grow Your fruit in me — especially where I am thin. Keep me in step with You. Amen.',
    badge: { name: 'Spirit Harvest', art: 'tree', note: 'You studied the Spirit’s fruit.' },
    printable: {
      motif: 'tree', title: 'Fruit tree map',
      prompts: ['Draw a tree with nine fruits labeled.', 'Circle two weak fruits.', 'Write a practice for each.'],
      craft: { title: 'Fruit jar', steps: ['Nine paper fruits in a jar.', 'Draw one per day to practice.', 'Journal results Sundays.'], note: 'Family chart works well.' }
    }
  });

  D.push({
    id: 'hebrews-faith', title: 'Hall of Faith', tier: 'H', mode: 'lesson',
    track: 'bible', testament: 'nt', era: 'church', when: 206, path: 24, xp: 36,
    summary: 'Hebrews 11 — faith is assurance of things hoped for; witnesses cheer us to run with endurance.',
    scripture: [{ ref: 'Hebrews 11:1', text: 'Now faith is assurance of things hoped for, proof of things not seen.' },
                { ref: 'Hebrews 12:1', text: 'Let’s run with perseverance the race that is set before us.' }],
    story: [
      'Hebrews 11 is not celebrity trivia. It is a cloud of witnesses who trusted God when sight was thin.',
      'Faith is assurance and conviction — not wishful fog. It takes God at His word.',
      'Abel, Noah, Abraham, Sarah, Moses… each obeyed into a future they could not fully hold yet.',
      'Some won battles; some suffered. Faith is not a vending machine. It is loyalty to God.',
      'Therefore we run with endurance, eyes on Jesus, the pioneer and perfecter of faith.',
      'Your race has a lane. Lay aside weights and sins that cling. The witnesses are not spectators of shame — they are encouragement to finish.'
    ],
    teach: ['Faith trusts God’s character and promise.', 'The hall includes suffering saints.', 'Jesus is the focus of the race.'],
    quiz: [
      { t: 'mc', q: 'What is faith according to Hebrews 11:1?', a: ['Assurance of things hoped for', 'Blind silly guessing', 'Only feelings', 'Only seeing results first'], c: 0 },
      { t: 'blank', q: 'Run with ____ the race set before us.', a: ['perseverance', 'endurance', 'patience'], hint: 'Hebrews 12:1' },
      { t: 'match', q: 'Match witness to trust act.', pairs: [['Noah', 'Built before rain'], ['Abraham', 'Went without full map'], ['Moses', 'Chose God’s people'], ['Jesus', 'Pioneer of faith']], hint: 'Hall of faith.' },
      { t: 'sort', q: 'Sort true faith vs counterfeit.', buckets: [{ id: 't', name: 'True faith' }, { id: 'c', name: 'Counterfeit' }], items: [{ text: 'Obey God’s word without full sight', b: 't' }, { text: 'Trust only when comfortable', b: 'c' }, { text: 'Look to Jesus while running', b: 't' }, { text: 'Faith as a luck charm', b: 'c' }] },
      { t: 'mc', q: 'Who is the pioneer and perfecter of faith?', a: ['Jesus', 'Abel only', 'We ourselves alone', 'The crowd'], c: 0 },
      { t: 'type', q: 'Name one “weight” you will lay aside this week to run better.', a: ['sin', 'fear', 'phone', 'anger', 'doubt', 'pride', 'lazy', 'laziness'], hint: 'honest weight' }
    ],
    memory: { ref: 'Hebrews 11:6', text: 'Without faith it is impossible to be well pleasing to him.' },
    prayer: 'God of the witnesses, fix my eyes on Jesus. Give me endurance for my lane this week. Amen.',
    badge: { name: 'Race Runner', art: 'anchor', note: 'You entered the hall of faith.' },
    printable: {
      motif: 'anchor', title: 'Cloud of witnesses poster',
      prompts: ['List 8 names from Heb 11 and one trait each.', 'Write your race lane.', 'Name weights to drop.'],
      craft: { title: 'Batton card', steps: ['Card: “Run with endurance”.', 'On back: Hebrews 12:1–2.', 'Keep in shoes or bag.'], note: 'Sports ministry friendly.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_8 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
