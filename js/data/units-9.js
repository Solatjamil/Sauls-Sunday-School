/* =====================================================================
   Curriculum batch 9 — bring every tier to 30 units (L+2, M+2, H+6).
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  /* ---------- L Seedlings (+2 → 30) ---------- */
  D.push({
    id: 'joseph-dreams-l', title: 'Joseph’s Colourful Dreams', tier: 'L', mode: 'story',
    track: 'promise', testament: 'ot', era: 'fathers', when: 43, path: 29, xp: 18,
    summary: 'Joseph had special dreams. God was with him even when things felt unfair.',
    scripture: [{ ref: 'Genesis 37:5', text: 'Joseph dreamed a dream, and he told it to his brothers, and they hated him all the more.' }],
    story: [
      'Joseph had a bright coat and some special dreams from God.',
      'His brothers felt jealous. They were not kind to him.',
      'Joseph was taken far away. It felt scary and unfair.',
      'But God stayed with Joseph. God can stay with you when life feels hard too.'
    ],
    teach: ['God is with us when life feels unfair.', 'Jealousy hurts families.', 'God’s plans are bigger than one hard day.'],
    quiz: [
      { t: 'mc', q: 'What did Joseph have?', a: ['Special dreams from God', 'A flying carpet', 'A crown already', 'A boat'], c: 0 },
      { t: 'tap', q: 'How did the brothers feel?', a: ['Jealous', 'Happy only', 'Sleepy only'], c: 0 },
      { t: 'order', q: 'Order the story.', items: ['Joseph dreams', 'Brothers feel jealous', 'Joseph goes far away', 'God stays with him'], hint: 'Dreams first.' },
      { t: 'mc', q: 'Who stayed with Joseph?', a: ['God', 'Nobody', 'Only a king', 'Only animals'], c: 0 }
    ],
    memory: { ref: 'Genesis 39:2', text: 'Yahweh was with Joseph.' },
    prayer: 'God, stay with me on hard days like You stayed with Joseph. Amen.',
    badge: { name: 'Dream Coat', art: 'coat', note: 'You met young Joseph.' },
    printable: {
      motif: 'coat', title: 'Colour Joseph’s coat',
      prompts: ['Colour many stripes.', 'Draw a moon and stars dream.', 'Write “God is with me”.'],
      craft: { title: 'Paper coat', steps: ['Cut a paper tunic shape.', 'Glue bright strips.', 'Hang on the fridge.'], note: 'Scissors with adult.' }
    }
  });

  D.push({
    id: 'wise-men-star', title: 'Wise Men Follow the Star', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'born', when: 44, path: 30, xp: 20,
    summary: 'Wise men saw a special star and travelled far to worship baby Jesus.',
    scripture: [{ ref: 'Matthew 2:11', text: 'They came into the house and saw the young child with Mary, his mother, and they fell down and worshipped him.' }],
    story: [
      'Far away, wise men watched the night sky. They saw a special star.',
      'The star meant a new King had been born — Jesus!',
      'They packed gifts and travelled a long way to find Him.',
      'When they found Jesus, they bowed and gave gold, frankincense and myrrh. We can worship Jesus too.'
    ],
    teach: ['Jesus is the true King.', 'Worship means giving our best to God.', 'God guides people who seek Him.'],
    quiz: [
      { t: 'mc', q: 'What did the wise men follow?', a: ['A special star', 'A map app', 'A loud drum', 'A rainbow only'], c: 0 },
      { t: 'tap', q: 'Who did they want to find?', a: ['Baby Jesus the King', 'A pirate', 'A giant'], c: 0 },
      { t: 'match', q: 'Match the gift idea.', pairs: [['Star', 'Guided them'], ['Gifts', 'Gold and spices'], ['Wise men', 'Travelled far'], ['Jesus', 'The true King']], hint: 'Who/what?' },
      { t: 'mc', q: 'What did they do when they found Jesus?', a: ['Worshipped Him', 'Ran away', 'Built a tower', 'Hid the star'], c: 0 }
    ],
    memory: { ref: 'Matthew 2:2', text: 'Where is he who is born King of the Jews? For we saw his star in the east.' },
    prayer: 'Jesus, You are King. Help me give You my love and my best. Amen.',
    badge: { name: 'Star Seekers', art: 'star', note: 'You followed the Christmas star.' },
    printable: {
      motif: 'star', title: 'Star road',
      prompts: ['Draw a big star path.', 'Draw three gift boxes.', 'Write “Jesus is King”.'],
      craft: { title: 'Foil star', steps: ['Cut a star from card.', 'Cover with foil or glitter.', 'Hang in a window.'], note: 'Supervise glitter.' }
    }
  });

  /* ---------- M Builders (+2 → 30) ---------- */
  D.push({
    id: 'naaman-wash', title: 'Naaman Washes Seven Times', tier: 'M', mode: 'story',
    track: 'promise', testament: 'ot', era: 'prophets', when: 45, path: 29, xp: 22,
    summary: 'Proud commander Naaman had to obey a simple word from God — wash in the Jordan — and was healed.',
    scripture: [{ ref: '2 Kings 5:14', text: 'Then went he down, and dipped himself seven times in the Jordan, according to the saying of the man of God; and his flesh was restored like the flesh of a little child, and he was clean.' }],
    story: [
      'Naaman was a strong army commander, but his skin was very sick.',
      'A little servant girl from Israel said, “There is a prophet of God who can help.”',
      'Elisha did not do a big show. He sent a message: wash seven times in the Jordan River.',
      'Naaman was angry at first — he wanted something fancy. His helpers said, “Just try the simple thing.”',
      'He washed seven times. God made him clean. Sometimes God’s way is simple obedience, not a parade.'
    ],
    teach: ['God can use small voices.', 'Pride can block a blessing.', 'Simple obedience matters.'],
    quiz: [
      { t: 'mc', q: 'What did Elisha tell Naaman to do?', a: ['Wash seven times in the Jordan', 'Pay a huge fee', 'Fight another war', 'Build a tower'], c: 0 },
      { t: 'tap', q: 'Who first pointed Naaman to help?', a: ['A servant girl', 'A king only', 'A horse'], c: 0 },
      { t: 'order', q: 'Order Naaman’s path.', items: ['Sick skin', 'Servant girl speaks', 'Angry at simple plan', 'Washes and is healed'], hint: 'Sick first.' },
      { t: 'mc', q: 'What blocked Naaman at first?', a: ['Pride — he wanted a fancy fix', 'He could not swim at all', 'He lost the map', 'He hated rivers forever'], c: 0 },
      { t: 'blank', q: 'He dipped ____ times.', a: ['seven', '7'], hint: 'Number in the story.' }
    ],
    memory: { ref: '2 Kings 5:14', text: 'His flesh was restored like the flesh of a little child, and he was clean.' },
    prayer: 'God, help me obey even when Your way feels simple, not flashy. Amen.',
    badge: { name: 'Jordan Seven', art: 'drop', note: 'You learned Naaman’s obedience.' },
    printable: {
      motif: 'drop', title: 'Seven dips',
      prompts: ['Draw the Jordan.', 'Number 1–7 steps.', 'Write one simple obedience for this week.'],
      craft: { title: 'Paper river strip', steps: ['Blue paper river.', 'Seven footprint stickers.', 'Label “obey”.'], note: 'Flat craft.' }
    }
  });

  D.push({
    id: 'peter-jail-sing', title: 'Peter Sings in Jail', tier: 'M', mode: 'story',
    track: 'spirit', testament: 'nt', era: 'church', when: 46, path: 30, xp: 22,
    summary: 'Peter was locked up for talking about Jesus. The church prayed, and God opened the door.',
    scripture: [{ ref: 'Acts 12:7', text: 'A light shone in the cell. He struck Peter on the side, and woke him up, saying, “Stand up quickly!” His chains fell off his hands.' }],
    story: [
      'Peter kept telling people about Jesus. Some leaders put him in jail.',
      'Guards watched. Chains held him. It looked impossible.',
      'Meanwhile the church gathered and prayed hard for Peter — not giving up.',
      'At night an angel woke Peter. Chains fell off. The gate opened. Peter thought it might be a dream!',
      'He went to the praying friends and surprised them. God answers prayer — sometimes in ways that shock us.'
    ],
    teach: ['Prayer is real work.', 'God can open locked doors.', 'Keep praying with friends.'],
    quiz: [
      { t: 'mc', q: 'What was the church doing while Peter was in jail?', a: ['Praying for him', 'Ignoring him', 'Building a boat', 'Sleeping only'], c: 0 },
      { t: 'tap', q: 'What fell off Peter?', a: ['His chains', 'His shoes only', 'His name'], c: 0 },
      { t: 'match', q: 'Match the part.', pairs: [['Jail', 'Locked Peter'], ['Church', 'Prayed'], ['Angel', 'Woke Peter'], ['Gate', 'Opened']], hint: 'Acts 12.' },
      { t: 'mc', q: 'What does this story teach about prayer?', a: ['Keep praying — God hears', 'Prayer is useless', 'Only pray once', 'Never pray in groups'], c: 0 },
      { t: 'order', q: 'Order the rescue.', items: ['Peter jailed', 'Church prays', 'Angel and open gate', 'Friends are surprised'], hint: 'Jail first.' }
    ],
    memory: { ref: 'Acts 12:5', text: 'Peter therefore was kept in the prison, but constant prayer was made by the assembly to God for him.' },
    prayer: 'God, teach me to pray for friends who need You — and to trust Your timing. Amen.',
    badge: { name: 'Open Gate', art: 'gate', note: 'You saw prayer unlock a jail.' },
    printable: {
      motif: 'gate', title: 'Prayer chain',
      prompts: ['Draw broken chains.', 'List 3 people to pray for.', 'Write Acts 12:5 in short.'],
      craft: { title: 'Paper chain prayers', steps: ['Make 5 paper links.', 'Write a name on each.', 'Pray one link a day.'], note: 'Family prayer tool.' }
    }
  });

  /* ---------- H Explorers (+6 → 30) ---------- */
  D.push({
    id: 'nehemiah-wall', title: 'Nehemiah Rebuilds the Wall', tier: 'H', mode: 'story',
    track: 'church', testament: 'ot', era: 'return', when: 47, path: 25, xp: 28,
    summary: 'Nehemiah wept over Jerusalem’s broken walls, prayed, planned, and led people to rebuild with courage.',
    scripture: [{ ref: 'Nehemiah 2:18', text: 'They said, “Let’s rise up and build.” So they strengthened their hands for the good work.' }],
    story: [
      'Nehemiah served a king far from home, but his heart was in Jerusalem — the city of God’s people.',
      'News came: the walls were broken and the people were in disgrace. Nehemiah wept, fasted and prayed.',
      'He asked the king for permission and supplies. Courage is not loud bravado; it is faith that takes a next step.',
      'In Jerusalem he inspected the ruins at night, then called the people: “Let us rise and build.”',
      'Enemies mocked and threatened. Builders worked with a tool in one hand and readiness in the other.',
      'The wall was finished. Revival often starts with seeing brokenness, praying, and working together under God.'
    ],
    teach: ['Pray before you plan — and then plan.', 'Shared mission beats solo heroics.', 'Opposition does not cancel God’s work.'],
    quiz: [
      { t: 'mc', q: 'What news broke Nehemiah’s heart?', a: ['Jerusalem’s walls were ruined', 'The king lost a race', 'There was too much gold', 'Nobody could cook'], c: 0 },
      { t: 'blank', q: 'The people said, “Let’s rise up and ____.”', a: ['build', 'Build'], hint: 'Nehemiah 2:18' },
      { t: 'match', q: 'Match response.', pairs: [['Weeping', 'Cared deeply'], ['Prayer', 'Sought God first'], ['Planning', 'Asked the king wisely'], ['Building', 'Worked together']], hint: 'Heart → hands.' },
      { t: 'sort', q: 'Sort rebuild wisdom vs folly.', buckets: [{ id: 'w', name: 'Wisdom' }, { id: 'f', name: 'Folly' }], items: [{ text: 'Pray and fast over the need', b: 'w' }, { text: 'Ignore brokenness and scroll past', b: 'f' }, { text: 'Invite the community to work', b: 'w' }, { text: 'Quit at the first mockery', b: 'f' }] },
      { t: 'mc', q: 'How did builders face threats?', a: ['Kept working with watchful courage', 'Abandoned the wall forever', 'Only argued online', 'Hid and never prayed'], c: 0 },
      { t: 'type', q: 'Name one “broken wall” (need) you could help rebuild with God’s people.', a: ['friendship', 'church', 'homework', 'trust', 'kindness', 'habit', 'family', 'prayer'], hint: 'one need' }
    ],
    memory: { ref: 'Nehemiah 6:3', text: 'I am doing a great work, so that I can’t come down.' },
    prayer: 'Lord, show me broken places You care about. Give me Nehemiah’s prayer, plan and grit. Amen.',
    badge: { name: 'Wall Builder', art: 'stones', note: 'You walked Nehemiah’s rebuild.' },
    printable: {
      motif: 'stones', title: 'Rebuild map',
      prompts: ['Sketch a wall with named stones (prayer, team, courage).', 'List mockeries you will ignore.', 'Write Nehemiah 2:18.'],
      craft: { title: 'Cardboard wall sections', steps: ['Boxes as wall blocks.', 'Label each with a team job.', 'Stack and pray over the “city”.'], note: 'Group activity.' }
    }
  });

  D.push({
    id: 'jonah-mercy-h', title: 'Jonah and the Wide Mercy of God', tier: 'H', mode: 'story',
    track: 'values', testament: 'ot', era: 'prophets', when: 48, path: 26, xp: 28,
    summary: 'Jonah ran from God’s call to Nineveh. God’s mercy chased the prophet — and the city.',
    scripture: [{ ref: 'Jonah 4:2', text: 'I knew that you are a gracious God, and merciful, slow to anger, and abundant in loving kindness, and you relent of doing harm.' }],
    story: [
      'God sent Jonah to Nineveh — a violent city Jonah did not want to bless.',
      'Jonah ran the other way by ship. Storms are sometimes mercy that stops our escape.',
      'In the great fish Jonah prayed. Grace can meet us in the dark belly of our own choices.',
      'He finally preached. Nineveh turned. Jonah sulked because mercy felt “unfair” to enemies.',
      'God asked about Jonah’s plant and about a city full of people who did not know their right hand from their left.',
      'The book ends with a question: will we share God’s heart for people we would rather write off?'
    ],
    teach: ['God’s mission includes people we dislike.', 'Running from God is never freedom.', 'Mercy is God’s character, not a loophole.'],
    quiz: [
      { t: 'mc', q: 'Why did Jonah run?', a: ['He did not want mercy for Nineveh', 'He forgot his sandals', 'He was afraid of fish only', 'God gave no message'], c: 0 },
      { t: 'blank', q: 'God is gracious, merciful, slow to ____.', a: ['anger', 'Anger'], hint: 'Jonah 4:2' },
      { t: 'match', q: 'Match scene to meaning.', pairs: [['Ship', 'Running'], ['Storm', 'God interrupts'], ['Fish', 'Space to pray'], ['Plant', 'Jonah’s selfish comfort']], hint: 'Book arc.' },
      { t: 'sort', q: 'Sort God’s heart vs Jonah’s sulk.', buckets: [{ id: 'g', name: "God's heart" }, { id: 'j', name: "Jonah's sulk" }], items: [{ text: 'Compassion for a huge city', b: 'g' }, { text: 'Anger that enemies repented', b: 'j' }, { text: 'Slow to anger, rich in love', b: 'g' }, { text: 'Caring more for a plant than people', b: 'j' }] },
      { t: 'mc', q: 'How does Jonah end?', a: ['With God’s question about mercy', 'With Jonah crowned king', 'With Nineveh destroyed anyway', 'With no lesson'], c: 0 },
      { t: 'type', q: 'Name a person/group you find hard to want good for — and ask God for His heart.', a: ['enemy', 'bully', 'rival', 'sibling', 'classmate', 'nation', 'boss', 'neighbour'], hint: 'honest' }
    ],
    memory: { ref: 'Jonah 2:9', text: 'Salvation belongs to Yahweh.' },
    prayer: 'Merciful God, stop my running. Give me Your heart for people I would skip. Amen.',
    badge: { name: 'Mercy Horizon', art: 'boat', note: 'You faced Jonah’s hard mercy.' },
    printable: {
      motif: 'boat', title: 'Mercy map',
      prompts: ['Draw ship → fish → city → plant.', 'Write Jonah 4:2.', 'Circle one “Nineveh” to pray for.'],
      craft: { title: 'Two-column card', steps: ['Left: my sulk.', 'Right: God’s mercy.', 'Pray the right column aloud.'], note: 'Journal craft.' }
    }
  });

  D.push({
    id: 'philemon-brother', title: 'Philemon: A Slave Becomes a Brother', tier: 'H', mode: 'story',
    track: 'values', testament: 'nt', era: 'church', when: 49, path: 27, xp: 26,
    summary: 'Paul writes Philemon to receive Onesimus not as property but as a beloved brother in Christ.',
    scripture: [{ ref: 'Philemon 1:16', text: 'No longer as a slave, but more than a slave, a beloved brother.' }],
    story: [
      'Onesimus had wronged Philemon and run. In Rome he met Paul and met Jesus.',
      'Paul sends him back with a letter — not to crush him, but to reframe the whole relationship.',
      'In Christ, status ladders tip over. A slave can be a brother; a master must become a sibling.',
      'Paul offers to pay any debt. The gospel creates costly reconciliation, not cheap slogans.',
      'Philemon is asked to refresh hearts out of love, not only duty. Freedom and belonging meet at the cross.',
      'The short letter still presses us: who do we still treat as less-than, and how does the gospel rename them?'
    ],
    teach: ['The gospel renames relationships.', 'Reconciliation may cost us.', 'Love goes beyond minimum duty.'],
    quiz: [
      { t: 'mc', q: 'How does Paul want Philemon to receive Onesimus?', a: ['As a beloved brother', 'As a punished enemy only', 'As a stranger forever', 'As unpaid labour only'], c: 0 },
      { t: 'blank', q: 'No longer as a slave, but a beloved ____.', a: ['brother', 'Brother'], hint: 'Philemon 1:16' },
      { t: 'match', q: 'Match person to role.', pairs: [['Paul', 'Advocate writer'], ['Onesimus', 'New believer returning'], ['Philemon', 'Asked to forgive and receive'], ['Christ', 'Makes brothers']], hint: 'Letter cast.' },
      { t: 'sort', q: 'Sort gospel move vs old order.', buckets: [{ id: 'g', name: 'Gospel move' }, { id: 'o', name: 'Old order' }], items: [{ text: 'Beloved brother', b: 'g' }, { text: 'Person as property', b: 'o' }, { text: 'Offer to pay the debt', b: 'g' }, { text: 'Crush the runaway forever', b: 'o' }] },
      { t: 'mc', q: 'What does Paul model?', a: ['Costly advocacy for a new brother', 'Ignoring injustice', 'Public shame only', 'Silence'], c: 0 },
      { t: 'type', q: 'Name one relationship where you need to “receive as family” more than score-keep.', a: ['sibling', 'friend', 'classmate', 'teammate', 'parent', 'cousin', 'neighbour'], hint: 'one name/role' }
    ],
    memory: { ref: 'Philemon 1:16', text: 'A beloved brother… both in the flesh and in the Lord.' },
    prayer: 'Jesus, rename my relationships. Make me brave for costly welcome. Amen.',
    badge: { name: 'Brother Letter', art: 'scroll', note: 'You read Philemon’s challenge.' },
    printable: {
      motif: 'scroll', title: 'Receive letter',
      prompts: ['Rewrite Philemon 1:16 in your words.', 'List statuses the gospel flattens.', 'Write an apology/welcome note practice.'],
      craft: { title: 'Sealed peace note', steps: ['Write a reconciling note.', 'Seal with sticker.', 'Pray before sending or give to God if you cannot send yet.'], note: 'Pastoral care with parent if needed.' }
    }
  });

  D.push({
    id: 'james-doers', title: 'James: Be Doers of the Word', tier: 'H', mode: 'story',
    track: 'values', testament: 'nt', era: 'church', when: 50, path: 28, xp: 26,
    summary: 'James calls believers to live the word they hear — pure religion that cares for the vulnerable and tames the tongue.',
    scripture: [{ ref: 'James 1:22', text: 'But be doers of the word, and not only hearers, deluding your own selves.' }],
    story: [
      'James writes like a big brother who loves the church enough to be blunt.',
      'Hearing sermons without doing them is self-deception — a mirror glanced at and forgotten.',
      'Real faith works: it visits orphans and widows, keeps from world-pollution, bridles the tongue.',
      'Favouritism in church seats is judged. Mercy triumphs over judgment.',
      'Wisdom from above is pure, peaceable, gentle — not bitter envy with a spiritual mask.',
      'If we believe the word is planted in us, our week should show fruit, not only notes.'
    ],
    teach: ['Faith acts.', 'The tongue needs a bridle.', 'Mercy is not optional decoration.'],
    quiz: [
      { t: 'mc', q: 'What does James 1:22 urge?', a: ['Be doers of the word, not only hearers', 'Collect more quotes only', 'Argue louder', 'Avoid widows'], c: 0 },
      { t: 'blank', q: 'Be ____ of the word.', a: ['doers', 'Doers'], hint: 'James 1:22' },
      { t: 'match', q: 'Match theme.', pairs: [['Mirror', 'Hearing then forgetting'], ['Tongue', 'Needs control'], ['Widows/orphans', 'Pure religion cares'], ['Favouritism', 'Judged as wrong']], hint: 'James map.' },
      { t: 'sort', q: 'Sort doer vs hearer-only.', buckets: [{ id: 'd', name: 'Doer' }, { id: 'h', name: 'Hearer-only' }], items: [{ text: 'Help a vulnerable person this week', b: 'd' }, { text: 'Nod at a sermon and change nothing', b: 'h' }, { text: 'Apologise after harsh words', b: 'd' }, { text: 'Save verses but never obey', b: 'h' }] },
      { t: 'mc', q: 'Wisdom from above looks like…', a: ['Purity, peace, gentleness', 'Bitter envy and rivalry', 'Only high scores', 'Silent cruelty'], c: 0 },
      { t: 'type', q: 'Write one “do” you will attach to a truth you already know.', a: ['help', 'apologise', 'share', 'pray', 'serve', 'listen', 'give', 'forgive'], hint: 'verb' }
    ],
    memory: { ref: 'James 1:22', text: 'Be doers of the word, and not only hearers.' },
    prayer: 'Lord, plant Your word deep and make my hands match my ears this week. Amen.',
    badge: { name: 'Word Doer', art: 'heart', note: 'You took James seriously.' },
    printable: {
      motif: 'heart', title: 'Doer checklist',
      prompts: ['Hear → Do columns.', 'Tongue bridle goals.', 'One mercy act planned.'],
      craft: { title: 'Mirror sticky note', steps: ['Note on mirror: James 1:22.', 'Each morning add one do.', 'Review Sunday.'], note: 'Habit loop.' }
    }
  });

  D.push({
    id: 'john-light-love', title: '1 John: Walk in Light and Love', tier: 'H', mode: 'story',
    track: 'god', testament: 'nt', era: 'church', when: 51, path: 29, xp: 28,
    summary: 'John teaches that God is light and love — real disciples walk in honesty, obedience and love for one another.',
    scripture: [{ ref: '1 John 1:7', text: 'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus Christ, his Son, cleanses us from all sin.' }],
    story: [
      'John writes so our joy may be full — fellowship with the Father and the Son is the centre.',
      'God is light. Claiming Him while walking in hidden darkness is a lie. Confession is the doorway back.',
      'Jesus is our advocate. Love is not a mood; it is evidence we know Him — keeping His commands.',
      'Do not love the world’s empty boast. Antichrist spirits deny Jesus; anointing teaches truth.',
      'God is love. We love because He first loved us. Hate of a brother and claim of love for God cannot shake hands.',
      'Perfect love casts out fear. Faith overcomes the world. Keep yourselves from idols — anything that replaces Him.'
    ],
    teach: ['Honesty before God is light-walking.', 'Love proves knowledge of God.', 'Jesus is advocate, not accessory.'],
    quiz: [
      { t: 'mc', q: 'If we walk in the light…', a: ['We have fellowship and cleansing in Jesus', 'We never need community', 'Sin does not matter', 'We hide everything'], c: 0 },
      { t: 'blank', q: 'God is ____ (1 John 4:8).', a: ['love', 'Love'], hint: 'four letters' },
      { t: 'match', q: 'Match claim to truth.', pairs: [['God is light', 'No hiding sin'], ['Advocate', 'Jesus defends'], ['God is love', 'We love others'], ['Idols', 'Must be refused']], hint: '1 John themes.' },
      { t: 'sort', q: 'Sort light walk vs dark claim.', buckets: [{ id: 'l', name: 'Light walk' }, { id: 'd', name: 'Dark claim' }], items: [{ text: 'Confess sin and come clean', b: 'l' }, { text: 'Say “I know God” while hating a brother', b: 'd' }, { text: 'Obey Jesus’ commands in love', b: 'l' }, { text: 'Love the world’s empty boast more than God', b: 'd' }] },
      { t: 'mc', q: 'Perfect love casts out…', a: ['Fear', 'All homework', 'Every emotion', 'Friendship'], c: 0 },
      { t: 'type', q: 'Name one “idol” (thing that tries to sit on God’s chair) you will refuse this week.', a: ['phone', 'pride', 'likes', 'money', 'game', 'image', 'anger', 'envy'], hint: 'one idol' }
    ],
    memory: { ref: '1 John 4:19', text: 'We love him, because he first loved us.' },
    prayer: 'Father of light and love, make my walk honest and my love practical. Amen.',
    badge: { name: 'Light Walker', art: 'lantern', note: 'You sat with 1 John.' },
    printable: {
      motif: 'lantern', title: 'Light & love chart',
      prompts: ['Confession → cleansing path.', 'Love actions list.', 'Idols to refuse.'],
      craft: { title: 'Two-candle card', steps: ['Label candles Light and Love.', 'Write 1 John 1:7 and 4:19.', 'Pray both aloud.'], note: 'Safe LED candles ok.' }
    }
  });

  D.push({
    id: 'revelation-throne', title: 'Revelation: The Throne and the Lamb', tier: 'H', mode: 'story',
    track: 'promise', testament: 'nt', era: 'forever', when: 52, path: 30, xp: 30,
    summary: 'Revelation opens heaven’s throne room — worship centres on God and the Lamb who was slain yet stands.',
    scripture: [{ ref: 'Revelation 5:12', text: 'Worthy is the Lamb who has been killed to receive the power, wealth, wisdom, strength, honour, glory, and blessing!' }],
    story: [
      'Revelation is not a puzzle toy first — it is a letter of hope to pressured churches: Jesus wins.',
      'John sees a door in heaven and a throne. Holy, holy, holy — creation’s true centre is worship, not panic.',
      'A sealed scroll needs a worthy opener. No one can — until the Lion of Judah appears as a Lamb who was slain.',
      'Heaven explodes in a new song: the Lamb purchased people for God from every tribe and language.',
      'History is not random. The Lamb holds the scroll. Suffering saints are seen; justice is not asleep.',
      'Our call is faithful witness and worship now — joining the song before the final city descends.'
    ],
    teach: ['Jesus the Lamb is worthy at the centre.', 'Worship steadies scared disciples.', 'Hope is a Person on the throne.'],
    quiz: [
      { t: 'mc', q: 'Who is worthy to open the scroll?', a: ['The Lamb who was slain', 'Any emperor', 'John alone', 'A random angel'], c: 0 },
      { t: 'blank', q: 'Worthy is the ____ who was killed.', a: ['Lamb', 'lamb'], hint: 'Revelation 5' },
      { t: 'match', q: 'Match vision piece.', pairs: [['Throne', 'God’s rule'], ['Scroll', 'God’s plan'], ['Lamb', 'Jesus crucified yet risen'], ['Song', 'Worship of the worthy']], hint: 'Rev 4–5.' },
      { t: 'sort', q: 'Sort throne-room truth vs fear story.', buckets: [{ id: 't', name: 'Throne truth' }, { id: 'f', name: 'Fear story' }], items: [{ text: 'Jesus holds history’s scroll', b: 't' }, { text: 'Chaos has the last word', b: 'f' }, { text: 'Worship steadies the church', b: 't' }, { text: 'Panic is the only faithful response', b: 'f' }] },
      { t: 'mc', q: 'People the Lamb purchased are from…', a: ['Every tribe and language', 'One nation only', 'Angels only', 'No one'], c: 0 },
      { t: 'type', q: 'Write one line of worship you can say when news feels scary.', a: ['worthy', 'holy', 'jesus wins', 'lamb', 'throne', 'hope', 'amen'], hint: 'short praise' }
    ],
    memory: { ref: 'Revelation 5:12', text: 'Worthy is the Lamb who has been killed…' },
    prayer: 'Worthy Lamb, fix my eyes on Your throne when the world shakes. Teach me the new song. Amen.',
    badge: { name: 'Throne Song', art: 'city', note: 'You entered Revelation’s throne room.' },
    printable: {
      motif: 'city', title: 'Worthy poster',
      prompts: ['Draw throne + Lamb.', 'List 7 worthiness words from Rev 5:12.', 'Write a 2-line new song.'],
      craft: { title: 'Scroll & seal craft', steps: ['Paper scroll with “Jesus wins”.', 'Seven paper seals (decorative).', 'Open one praise each day.'], note: 'Hope liturgy.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_9 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
