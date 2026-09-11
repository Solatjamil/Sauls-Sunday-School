/* =====================================================================
   Curriculum — extra stories & learning units (batch 7).
   L = gentle ages 3–6 · M = builders 7–9 · H = explorers 10–12
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  /* ---------- L : Seedlings ---------- */
  D.push({
    id: 'joseph-colours', title: 'Joseph’s Bright Coat', tier: 'L', mode: 'story',
    track: 'values', testament: 'ot', era: 'fathers', when: 35, path: 21, xp: 20,
    summary: 'Joseph got a special coat. His brothers were jealous — but God still had a good plan.',
    scripture: [{ ref: 'Genesis 37:3', text: 'Now Israel loved Joseph more than all his children, because he was the son of his old age, and he made him a coat of many colours.' }],
    story: [
      'Joseph had a dad named Jacob, and Jacob loved him a lot. One day Jacob gave Joseph a bright coat — many colours, soft and special.',
      'Joseph’s brothers saw the coat and felt jealous. Jealous means wanting what someone else has and feeling sad about it.',
      'Later Joseph’s brothers did something unkind. They sent him far away. Joseph was sad, but God was still with him.',
      'Years later Joseph became a helper for a whole country. He forgave his brothers. God can turn hard things into good things.'
    ],
    teach: ['Jealousy hurts families.', 'God stays with us even when life feels unfair.', 'Forgiving is brave and kind.'],
    quiz: [
      { t: 'mc', q: 'What special gift did Joseph get?', a: ['A bright coat', 'A boat', 'A crown', 'A drum'], c: 0 },
      { t: 'tap', q: 'How did the brothers feel about the coat?', a: ['Jealous', 'Happy', 'Sleepy'], c: 0 },
      { t: 'match', q: 'Match the person to what they did.', pairs: [['Jacob', 'Gave a coat'], ['Brothers', 'Felt jealous'], ['Joseph', 'Forgave'], ['God', 'Stayed with Joseph']], hint: 'Who did what?' },
      { t: 'mc', q: 'What did Joseph do to his brothers at the end?', a: ['Forgave them', 'Hid forever', 'Tore the coat', 'Ran away again'], c: 0 }
    ],
    memory: { ref: 'Genesis 50:20', text: 'You meant it for evil, but God meant it for good.' },
    prayer: 'God, when I feel jealous, help me be kind. Thank You for staying with me. Amen.',
    badge: { name: 'Coat of Kindness', art: 'coat', note: 'You learned about Joseph’s coat.' },
    printable: {
      motif: 'coat', title: 'Colour Joseph’s coat',
      prompts: ['Colour every stripe a different colour.', 'Draw Joseph smiling.', 'Write “God is with me” under the coat.'],
      craft: { title: 'Paper coat', steps: ['Fold paper into a coat shape.', 'Glue coloured strips on it.', 'Hang it where you pray.'], note: 'Talk about kindness while you glue.' }
    }
  });

  D.push({
    id: 'miriam-song', title: 'Miriam’s Happy Song', tier: 'L', mode: 'story',
    track: 'promise', testament: 'ot', era: 'freedom', when: 36, path: 22, xp: 18,
    summary: 'After God saved His people at the sea, Miriam led a song of thanks.',
    scripture: [{ ref: 'Exodus 15:20', text: 'Miriam the prophetess, the sister of Aaron, took a tambourine in her hand; and all the women went out after her with tambourines and with dances.' }],
    story: [
      'God’s people were scared. A big sea was in front of them. Mean soldiers were behind them.',
      'God made a path through the water! The people walked on dry ground. God kept them safe.',
      'Miriam was Moses’ sister. She picked up a tambourine and sang a happy thank-you song to God.',
      'When God helps us, we can sing too — even a simple “thank You, God!” is a real song.'
    ],
    teach: ['God saves His people.', 'Thank-you songs please God.', 'Girls and boys can lead worship.'],
    quiz: [
      { t: 'mc', q: 'What did God make through the sea?', a: ['A dry path', 'A bridge of gold', 'A boat', 'A tunnel of ice'], c: 0 },
      { t: 'tap', q: 'What did Miriam hold?', a: ['A tambourine', 'A sword', 'A crown'], c: 0 },
      { t: 'order', q: 'Put the story in order.', items: ['People are scared', 'God opens the sea', 'People walk through', 'Miriam sings'], hint: 'Scared first.' },
      { t: 'mc', q: 'Why did Miriam sing?', a: ['To thank God', 'To wake the fish', 'To scare the soldiers', 'To find bread'], c: 0 }
    ],
    memory: { ref: 'Exodus 15:2', text: 'Yahweh is my strength and song. He has become my salvation.' },
    prayer: 'God, thank You for keeping me safe. Help me sing thank-you songs. Amen.',
    badge: { name: 'Little Singer', art: 'harp', note: 'You learned Miriam’s song.' },
    printable: {
      motif: 'harp', title: 'Draw a tambourine',
      prompts: ['Draw circles and dots like a tambourine.', 'Write “Thank You, God”.', 'Colour the sea blue and the path dry.'],
      craft: { title: 'Paper tambourine', steps: ['Use two paper plates.', 'Put dry beans inside and staple.', 'Decorate and shake while you sing.'], note: 'Adult helps with staples.' }
    }
  });

  D.push({
    id: 'ruth-kind', title: 'Ruth Was Kind', tier: 'L', mode: 'story',
    track: 'values', testament: 'ot', era: 'homeland', when: 37, path: 23, xp: 20,
    summary: 'Ruth stayed with Naomi and worked hard in the fields. Kindness became a family blessing.',
    scripture: [{ ref: 'Ruth 1:16', text: 'Don’t urge me to leave you, and to return from following after you, for where you go, I will go.' }],
    story: [
      'Naomi was sad. She had lost people she loved. She wanted to go home alone.',
      'Ruth said, “I will go with you. Your God will be my God.” Ruth chose kindness.',
      'In the new town Ruth worked in the fields, picking leftover grain so they could eat.',
      'Boaz was kind to Ruth. God made a happy new family. Kindness grows like seeds.'
    ],
    teach: ['Staying with someone who is sad is love.', 'Hard work can be worship.', 'God notices kindness.'],
    quiz: [
      { t: 'mc', q: 'Who stayed with Naomi?', a: ['Ruth', 'A king', 'A soldier', 'A giant'], c: 0 },
      { t: 'match', q: 'Match the friend to the action.', pairs: [['Ruth', 'Stayed and worked'], ['Naomi', 'Needed comfort'], ['Boaz', 'Was kind in the field'], ['God', 'Blessed the family']], hint: 'Who did what?' },
      { t: 'tap', q: 'Where did Ruth gather food?', a: ['In the fields', 'In a castle', 'On a boat'], c: 0 },
      { t: 'mc', q: 'What grew from Ruth’s kindness?', a: ['A happy family blessing', 'A storm', 'A tall wall', 'A lost shoe'], c: 0 }
    ],
    memory: { ref: 'Ruth 1:16', text: 'Where you go, I will go.' },
    prayer: 'God, help me stay kind when someone is sad. Amen.',
    badge: { name: 'Kind Friend', art: 'heart', note: 'You met Ruth.' },
    printable: {
      motif: 'heart', title: 'Grain in the field',
      prompts: ['Draw stalks of grain.', 'Colour Ruth’s basket.', 'Write one kind thing you can do today.'],
      craft: { title: 'Kindness cards', steps: ['Cut three paper hearts.', 'Write a kind act on each.', 'Do one act this week.'], note: 'Parents can help write.' }
    }
  });

  D.push({
    id: 'jesus-friends', title: 'Jesus Calls Friends', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'taught', when: 38, path: 24, xp: 20,
    summary: 'Jesus called ordinary people to follow Him — fishermen became friends and helpers.',
    scripture: [{ ref: 'Matthew 4:19', text: 'He said to them, “Come after me, and I will make you fishers for men.”' }],
    story: [
      'By the lake, men were washing nets. Their names were Peter and Andrew. They were fishermen.',
      'Jesus walked by and said, “Come, follow Me.” He wanted friends who would learn from Him.',
      'They left their nets and walked with Jesus. Later James and John came too.',
      'Jesus still calls friends today — not only grown-ups. You can follow Him by listening and loving.'
    ],
    teach: ['Jesus invites ordinary people.', 'Following Jesus means walking with Him.', 'Friends of Jesus help others.'],
    quiz: [
      { t: 'mc', q: 'What work did Peter do?', a: ['Fisherman', 'King', 'Baker', 'Soldier'], c: 0 },
      { t: 'tap', q: 'What did Jesus say?', a: ['Come, follow Me', 'Go away', 'Hide the nets'], c: 0 },
      { t: 'order', q: 'Put the calling in order.', items: ['Fishermen at the lake', 'Jesus calls them', 'They leave the nets', 'They walk with Jesus'], hint: 'Lake first.' },
      { t: 'mc', q: 'Who can be a friend of Jesus?', a: ['Ordinary people — even kids', 'Only kings', 'Only angels', 'Only fishermen forever'], c: 0 }
    ],
    memory: { ref: 'Matthew 4:19', text: 'Come after me, and I will make you fishers for men.' },
    prayer: 'Jesus, I want to be Your friend. Help me follow You today. Amen.',
    badge: { name: 'Lake Friend', art: 'fish', note: 'You heard Jesus call friends.' },
    printable: {
      motif: 'fish', title: 'Nets and fish',
      prompts: ['Draw two fish and a net.', 'Write “Follow Me”.', 'Colour the lake.'],
      craft: { title: 'Paper boat friends', steps: ['Fold a paper boat.', 'Write your name and “Jesus’ friend”.', 'Float it in a sink with an adult.'], note: 'Talk about following Jesus.' }
    }
  });

  /* ---------- M : Builders ---------- */
  D.push({
    id: 'elijah-carmel', title: 'Elijah and the Fire', tier: 'M', mode: 'story',
    track: 'god', testament: 'ot', era: 'prophets', when: 120, path: 21, xp: 28, mature: true,
    summary: 'On Mount Carmel, God answered Elijah with fire — showing He alone is God.',
    scripture: [{ ref: '1 Kings 18:39', text: 'When all the people saw it, they fell on their faces. They said, “Yahweh, he is God! Yahweh, he is God!”' }],
    story: [
      'Israel was confused. Many people prayed to a false god called Baal. Elijah the prophet said, “If Yahweh is God, follow Him.”',
      'On Mount Carmel they set two altars. The prophets of Baal shouted all day. Nothing happened.',
      'Elijah rebuilt Yahweh’s altar, soaked it with water, and prayed a short prayer.',
      'Fire fell from heaven. The people cried, “Yahweh, He is God!” God showed He is real and listens.',
      'Elijah was brave, but the power was God’s. We do not need to shout forever — we need the true God.'
    ],
    teach: ['There is one true God.', 'Prayer is about who you trust, not how loud you are.', 'Courage means standing for truth kindly.'],
    quiz: [
      { t: 'mc', q: 'Who answered with fire?', a: ['Yahweh the true God', 'Baal', 'The king alone', 'The crowd'], c: 0 },
      { t: 'blank', q: 'The people said, “Yahweh, he is ____!”', a: ['God', 'god'], hint: '1 Kings 18:39' },
      { t: 'match', q: 'Match the moment.', pairs: [['Baal’s prophets', 'Shouted with no answer'], ['Elijah', 'Prayed a short prayer'], ['Water on the altar', 'Made it harder'], ['Fire from heaven', 'Proved God is real']], hint: 'Story beats.' },
      { t: 'sort', q: 'Sort true and false.', buckets: [{ id: 't', name: 'True' }, { id: 'f', name: 'False' }], items: [{ text: 'God answered Elijah', b: 't' }, { text: 'Baal sent fire first', b: 'f' }, { text: 'The people admitted Yahweh is God', b: 't' }, { text: 'Elijah worshipped Baal', b: 'f' }] },
      { t: 'mc', q: 'What made Elijah’s prayer powerful?', a: ['He prayed to the real God', 'He yelled the loudest', 'He used magic words', 'He had more people'], c: 0 }
    ],
    memory: { ref: '1 Kings 18:37', text: 'Hear me, Yahweh, hear me, that this people may know that you, Yahweh, are God.' },
    prayer: 'Lord, when I am unsure, show me You are God. Give me Elijah’s courage and a quiet trust. Amen.',
    badge: { name: 'Carmel Witness', art: 'flame', note: 'You saw who answered by fire.' },
    printable: {
      motif: 'flame', title: 'Two altars worksheet',
      prompts: ['Draw both altars.', 'Write Elijah’s short prayer in your words.', 'List one false “trust” kids face today (likes, luck, fear).'],
      craft: { title: 'Paper mountain', steps: ['Make a cone mountain from card.', 'Add a small altar on top.', 'Write “Yahweh is God” on a flag.'], note: 'Discuss exclusive worship gently.' }
    }
  });

  D.push({
    id: 'esther-brave', title: 'Esther Speaks Up', tier: 'M', mode: 'story',
    track: 'values', testament: 'ot', era: 'return', when: 121, path: 22, xp: 28,
    summary: 'Queen Esther risked her safety to speak for her people — “for such a time as this.”',
    scripture: [{ ref: 'Esther 4:14', text: 'Who knows if you haven’t come to the kingdom for such a time as this?' }],
    story: [
      'Esther was a Jewish girl who became queen in a huge empire. She kept her people quiet at first.',
      'A powerful man planned to destroy the Jews. Esther’s cousin Mordecai said she must speak.',
      'Going to the king uninvited was dangerous. Esther asked her people to fast and pray. Then she went.',
      'She spoke with wisdom and courage. God protected her people. Bravery is often quiet, planned, and prayerful.',
      '“For such a time as this” means God places people where their courage can help others.'
    ],
    teach: ['Courage can look like speaking up.', 'Prayer prepares brave actions.', 'God positions people on purpose.'],
    quiz: [
      { t: 'mc', q: 'What risk did Esther take?', a: ['Speaking to the king for her people', 'Running a race', 'Building a wall', 'Sailing a ship'], c: 0 },
      { t: 'blank', q: '“For such a ____ as this.”', a: ['time'], hint: 'Esther 4:14' },
      { t: 'order', q: 'Order Esther’s steps.', items: ['Dangerous plan against her people', 'Mordecai urges her', 'Fasting and prayer', 'She speaks to the king'], hint: 'Danger first.' },
      { t: 'match', q: 'Match person to role.', pairs: [['Esther', 'Brave queen'], ['Mordecai', 'Wise cousin'], ['The king', 'Had to be approached carefully'], ['God', 'Protected His people']], hint: 'Who is who?' },
      { t: 'mc', q: 'What came before Esther’s brave speech?', a: ['Prayer and fasting', 'A party only', 'Hiding forever', 'A war she started'], c: 0 }
    ],
    memory: { ref: 'Esther 4:14', text: 'Who knows if you haven’t come to the kingdom for such a time as this?' },
    prayer: 'God, if You put me somewhere hard, help me be brave like Esther — with prayer first. Amen.',
    badge: { name: 'Such a Time', art: 'crown', note: 'You learned Esther’s courage.' },
    printable: {
      motif: 'crown', title: 'Courage plan sheet',
      prompts: ['Write one place you can speak kindly for someone.', 'List three people to pray with first.', 'Draw Esther approaching the throne.'],
      craft: { title: 'Scroll invitation', steps: ['Roll a paper scroll.', 'Write “for such a time as this”.', 'Tie with string and keep in your Bible.'], note: 'Talk about advocacy without fearmongering.' }
    }
  });

  D.push({
    id: 'neighbour-mercy', title: 'The Good Samaritan', tier: 'M', mode: 'lesson',
    track: 'values', testament: 'nt', era: 'taught', when: 122, path: 23, xp: 26,
    summary: 'Jesus’ story of a wounded man and a surprising helper — neighbour love crosses lines.',
    scripture: [{ ref: 'Luke 10:37', text: '“Go and do likewise.”' }],
    story: [
      'A man asked Jesus, “Who is my neighbour?” Jesus answered with a story.',
      'A traveller was attacked and left hurt on the road. Two religious people passed by.',
      'A Samaritan — someone the listeners did not expect to be the hero — stopped, bandaged him, and paid for his care.',
      'Jesus asked who was the neighbour. The answer: the one who showed mercy. Then He said, “Go and do likewise.”',
      'Neighbour is not only the person like you. Neighbour is the person who needs mercy that you can give.'
    ],
    teach: ['Mercy is love with action.', 'Prejudice has no place in Jesus’ kingdom.', '“Go and do likewise” is a command, not a suggestion.'],
    quiz: [
      { t: 'mc', q: 'Who helped the hurt man?', a: ['The Samaritan', 'Only the priest', 'The robbers', 'No one'], c: 0 },
      { t: 'blank', q: 'Jesus said, “Go and do ______.”', a: ['likewise', 'the same'], hint: 'Luke 10:37' },
      { t: 'sort', q: 'Sort neighbour love vs ignoring.', buckets: [{ id: 'n', name: 'Neighbour love' }, { id: 'i', name: 'Ignoring' }], items: [{ text: 'Stopping to help', b: 'n' }, { text: 'Crossing the road away', b: 'i' }, { text: 'Paying for care', b: 'n' }, { text: 'Saying “not my problem”', b: 'i' }] },
      { t: 'match', q: 'Match the meaning.', pairs: [['Priest and Levite', 'Passed by'], ['Samaritan', 'Showed mercy'], ['Hurt man', 'Needed help'], ['Jesus’ command', 'Go and do likewise']], hint: 'Story roles.' },
      { t: 'mc', q: 'What question was Jesus answering?', a: ['Who is my neighbour?', 'How do I get rich?', 'When is the feast?', 'Where is the temple gold?'], c: 0 }
    ],
    memory: { ref: 'Luke 10:27', text: 'You shall love the Lord your God… and your neighbour as yourself.' },
    prayer: 'Jesus, make my eyes see people who need mercy. Help me go and do likewise. Amen.',
    badge: { name: 'Mercy Walker', art: 'hands', note: 'You learned the Good Samaritan.' },
    printable: {
      motif: 'hands', title: 'Road to Jericho map',
      prompts: ['Draw the road and the hurt man.', 'Write three mercies you can do this week.', 'Circle the word “likewise”.'],
      craft: { title: 'Mercy kit', steps: ['Decorate a small box.', 'Put plasters / a kind note / a snack idea list.', 'Keep it ready for real needs.'], note: 'Age-safe; adults supervise first aid items.' }
    }
  });

  D.push({
    id: 'paul-shipwreck', title: 'Paul’s Stormy Sea', tier: 'M', mode: 'story',
    track: 'church', testament: 'nt', era: 'church', when: 123, path: 24, xp: 28,
    summary: 'Paul trusted God in a shipwreck — courage and care for everyone on board.',
    scripture: [{ ref: 'Acts 27:23', text: 'For there stood by me this night an angel, belonging to the God whose I am and whom I serve.' }],
    story: [
      'Paul was a prisoner on a ship sailing toward Rome. A violent storm hit. The sailors were terrified.',
      'Paul spoke up: an angel of God had promised that every life would be saved, though the ship would be lost.',
      'Paul urged them to eat and take courage. He thanked God in front of everyone.',
      'The ship wrecked on an island, but all escaped to land. God keeps His word even in chaos.',
      'Faith is not pretending the storm is small. Faith is trusting God in the middle of it.'
    ],
    teach: ['God’s presence steadies us in storms.', 'Leaders care for others’ courage and needs.', 'Thankfulness can be public witness.'],
    quiz: [
      { t: 'mc', q: 'What did God promise through the angel?', a: ['All lives would be saved', 'No waves at all', 'A new ship of gold', 'Instant calm forever'], c: 0 },
      { t: 'match', q: 'Match storm facts.', pairs: [['Paul', 'Encouraged the crew'], ['Storm', 'Threatened the ship'], ['Angel message', 'Lives would be spared'], ['Island', 'Everyone reached land']], hint: 'Acts 27.' },
      { t: 'blank', q: 'Paul said he belonged to God and ______ Him.', a: ['serve', 'served', 'serves'], hint: 'Acts 27:23' },
      { t: 'order', q: 'Order the events.', items: ['Storm hits', 'Paul shares God’s promise', 'They eat and take courage', 'Shipwreck — all safe'], hint: 'Storm first.' },
      { t: 'mc', q: 'What is real faith like in a storm?', a: ['Trusting God while the storm is real', 'Pretending nothing is wrong', 'Blaming everyone', 'Giving up prayer'], c: 0 }
    ],
    memory: { ref: 'Acts 27:25', text: 'Therefore, sirs, cheer up! For I believe God, that it will be just as it has been spoken to me.' },
    prayer: 'God of the storm and the shore, help me trust You and encourage others when life feels rough. Amen.',
    badge: { name: 'Storm Steady', art: 'boat', note: 'You sailed with Paul through Acts 27.' },
    printable: {
      motif: 'boat', title: 'Ship journal page',
      prompts: ['Draw the storm and the island.', 'Write one fear and one promise of God beside it.', 'List people you can encourage this week.'],
      craft: { title: 'Paper life-ring', steps: ['Cut a ring from card.', 'Write “I believe God”.', 'Hang it near your door.'], note: 'Discuss anxiety gently with parents.' }
    }
  });

  /* ---------- H : Explorers ---------- */
  D.push({
    id: 'psalm-23-deep', title: 'Shepherd Psalm Deep Dive', tier: 'H', mode: 'lesson',
    track: 'prayer', testament: 'ot', era: 'kings', when: 200, path: 18, xp: 34,
    summary: 'Psalm 23 line by line — presence, provision, and courage in the darkest valley.',
    scripture: [{ ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
                { ref: 'Psalm 23:4', text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.' }],
    story: [
      'David knew sheep and shepherds. When he wrote “Yahweh is my shepherd,” he was not being cute — he was confessing total dependence.',
      '“I shall lack nothing” is not a promise of luxury. It is a promise that the Shepherd’s care is enough for the path He leads.',
      'Green pastures and still waters are gifts, but the psalm does not stay there. It walks into the valley of deep shadow.',
      'Fear loses its throne not because the valley is fake, but because “You are with me.” Presence is the point.',
      'Rod and staff comfort: protection and guidance. Then a table in front of enemies — honour in hostility.',
      'Goodness and mercy follow — pursue — all the days of life. The shepherding ends in the house of the Lord forever.'
    ],
    teach: ['Shepherd language is covenant care, not sentiment.', 'The valley is real; so is God’s nearness.', 'Worship forms courage before crisis arrives.'],
    quiz: [
      { t: 'mc', q: 'What does “I shall lack nothing” mainly mean?', a: ['The Shepherd’s care is enough', 'I will always be rich', 'I will never be sad', 'I will never work'], c: 0 },
      { t: 'blank', q: '“I will fear no evil, for you are ____ me.”', a: ['with'], hint: 'Psalm 23:4' },
      { t: 'match', q: 'Match image to meaning.', pairs: [['Green pastures', 'Rest God gives'], ['Valley of shadow', 'Dark danger'], ['Rod and staff', 'Protect and guide'], ['House of the Lord', 'Forever belonging']], hint: 'Psalm pictures.' },
      { t: 'sort', q: 'Sort fear-responses.', buckets: [{ id: 'f', name: 'Faith' }, { id: 'n', name: 'Not faith' }], items: [{ text: 'Remembering God is with me', b: 'f' }, { text: 'Pretending danger is imaginary', b: 'n' }, { text: 'Asking the Shepherd for help', b: 'f' }, { text: 'Trusting only my own toughness', b: 'n' }] },
      { t: 'type', q: 'In one sentence, what comforts you most in Psalm 23?', a: ['with me', 'shepherd', 'presence', 'god'], hint: 'Presence / shepherd / with me' },
      { t: 'mc', q: 'Where does the psalm end?', a: ['Dwelling in the Lord’s house forever', 'Only green grass forever', 'A military victory parade', 'Silence'], c: 0 }
    ],
    memory: { ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
    prayer: 'Shepherd of my soul, walk with me in bright fields and dark valleys. Teach me not to fear because You are near. Amen.',
    badge: { name: 'Valley Walker', art: 'shepherd', note: 'You studied Psalm 23 deeply.' },
    printable: {
      motif: 'shepherd', title: 'Psalm 23 annotation',
      prompts: ['Copy the psalm and underline every “You/Your”.', 'Write a modern paraphrase of verse 4.', 'Journal one valley you face and one way God’s presence meets it.'],
      craft: { title: 'Pocket shepherd card', steps: ['Card-size paper.', 'Write Psalm 23:1 and 23:4.', 'Keep it in a wallet or Bible cover.'], note: 'Good for anxious weeks.' }
    }
  });

  D.push({
    id: 'romans-12-living', title: 'Living Sacrifice', tier: 'H', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'church', when: 201, path: 19, xp: 36, mature: true,
    summary: 'Romans 12 — worship as a living sacrifice, renewed mind, and sincere love in the body.',
    scripture: [{ ref: 'Romans 12:1', text: 'Present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service.' },
                { ref: 'Romans 12:2', text: 'Don’t be conformed to this world, but be transformed by the renewing of your mind.' }],
    story: [
      'After eleven chapters of mercy, Paul says “therefore.” Grace is not a cushion for selfishness; it is fuel for offering.',
      'A living sacrifice stays on the altar — daily obedience, not a one-time dramatic moment only.',
      'The world presses us into its mould. God transforms us by renewing the mind — new instincts, new loves, new wisdom.',
      'Then comes the body of Christ: many gifts, one body. Humility protects unity. Love must be without hypocrisy.',
      'Bless persecutors. Weep with weepers. Refuse revenge. Overcome evil with good. This is what mercy looks like in public.',
      'Romans 12 is not “be nice.” It is worship that costs something and heals something.'
    ],
    teach: ['Worship includes the body and the week, not only the song.', 'Mind renewal resists cultural moulds.', 'The church’s love is a public apologetic.'],
    quiz: [
      { t: 'mc', q: 'What is a “living sacrifice”?', a: ['Ongoing offered life to God', 'An animal offering only', 'A statue in a temple', 'A holiday meal'], c: 0 },
      { t: 'blank', q: 'Be transformed by the renewing of your ____.', a: ['mind'], hint: 'Romans 12:2' },
      { t: 'match', q: 'Match command to idea.', pairs: [['Not conformed', 'Resist the world’s mould'], ['Renewed mind', 'Transformed thinking'], ['Many gifts', 'One body'], ['Overcome evil', 'With good']], hint: 'Romans 12 themes.' },
      { t: 'sort', q: 'Sort living-sacrifice vs empty religion.', buckets: [{ id: 'l', name: 'Living sacrifice' }, { id: 'e', name: 'Empty religion' }], items: [{ text: 'Daily obedience from mercy', b: 'l' }, { text: 'Looking holy on Sunday only', b: 'e' }, { text: 'Sincere love in the body', b: 'l' }, { text: 'Revenge dressed as justice', b: 'e' }] },
      { t: 'mc', q: 'How should love act, according to Romans 12?', a: ['Without hypocrisy', 'Only toward friends', 'Only when easy', 'Only in private'], c: 0 },
      { t: 'type', q: 'Name one gift you can offer the body of Christ this month.', a: ['help', 'serve', 'pray', 'encourage', 'give', 'listen'], hint: 'serve / pray / encourage…' }
    ],
    memory: { ref: 'Romans 12:2', text: 'Don’t be conformed to this world, but be transformed by the renewing of your mind.' },
    prayer: 'Merciful God, take my ordinary life as worship. Renew my mind. Make my love sincere. Amen.',
    badge: { name: 'Altar Walker', art: 'flame', note: 'You took Romans 12 seriously.' },
    printable: {
      motif: 'flame', title: 'Romans 12 practice chart',
      prompts: ['List five “body” acts of worship this week.', 'Write one worldly mould you refuse.', 'Plan one way to bless someone who is hard to love.'],
      craft: { title: 'Renewal bookmark', steps: ['Bookmark with Romans 12:1–2.', 'On the back write a daily check: mind / body / love.', 'Use it for a month.'], note: 'Pair with journaling.' }
    }
  });

  D.push({
    id: 'revelation-hope', title: 'The Hope at the End', tier: 'H', mode: 'lesson',
    track: 'promise', testament: 'nt', era: 'forever', when: 202, path: 20, xp: 36, mature: true,
    summary: 'Revelation’s end: God with us, tears wiped, all things new — hope that steadies courage now.',
    scripture: [{ ref: 'Revelation 21:3', text: 'Behold, God’s dwelling is with people, and he will dwell with them, and they will be his people.' },
                { ref: 'Revelation 21:5', text: 'He who sits on the throne said, “Behold, I am making all things new.”' }],
    story: [
      'Revelation is not a puzzle for pride. It is a letter of hope for pressured people.',
      'The centre is not beasts and charts — it is the Lamb, and then the throne, and then God-with-us.',
      'A loud voice: God’s dwelling is with people. The long story from Eden’s lost nearness ends in presence restored.',
      'He will wipe every tear. Death, mourning, crying, pain — former things pass away. That is not denial of grief; it is the end of grief’s reign.',
      '“I am making all things new” is the Maker speaking again. History is not a loop of despair.',
      'Hope makes courage possible now. If the end is God-with-us, faithfulness today is not wasted.'
    ],
    teach: ['Christian hope is personal presence, not vague optimism.', 'Tears are acknowledged and healed.', 'Future hope fuels present holiness and endurance.'],
    quiz: [
      { t: 'mc', q: 'What is the loud promise of Revelation 21:3?', a: ['God’s dwelling is with people', 'Earth stays broken forever', 'Only angels matter', 'History has no ending'], c: 0 },
      { t: 'blank', q: '“Behold, I am making all things ____.”', a: ['new'], hint: 'Revelation 21:5' },
      { t: 'match', q: 'Match hope-words.', pairs: [['Wipe tears', 'Personal comfort'], ['Dwelling with people', 'Restored presence'], ['All things new', 'Creation healed'], ['Former things pass', 'Pain’s reign ends']], hint: 'Rev 21.' },
      { t: 'sort', q: 'Sort true Christian hope vs counterfeit.', buckets: [{ id: 't', name: 'True hope' }, { id: 'c', name: 'Counterfeit' }], items: [{ text: 'God will live with His people', b: 't' }, { text: 'Just ignore suffering', b: 'c' }, { text: 'Jesus makes all things new', b: 't' }, { text: 'Power and money fix everything', b: 'c' }] },
      { t: 'mc', q: 'Why does future hope matter now?', a: ['It steadies courage and faithfulness today', 'It means we do nothing', 'It cancels love of neighbour', 'It only matters for angels'], c: 0 },
      { t: 'type', q: 'Write one tear you want God to wipe — and one act of courage hope gives you.', a: ['hope', 'courage', 'pray', 'trust', 'help'], hint: 'any honest answer with hope/courage/trust' }
    ],
    memory: { ref: 'Revelation 21:4', text: 'He will wipe away every tear from their eyes. Death will be no more.' },
    prayer: 'Lord of the end and the beginning, anchor my hope in Your presence. Wipe tears, make new, and keep me faithful today. Amen.',
    badge: { name: 'New-World Hope', art: 'city', note: 'You held Revelation’s hope carefully.' },
    printable: {
      motif: 'city', title: 'Hope letter',
      prompts: ['Write a letter to your future self from Revelation 21.', 'List tears God sees.', 'List one faithful act hope empowers this week.'],
      craft: { title: 'All-things-new poster', steps: ['Poster with Revelation 21:5.', 'Collage “old” words crossed out: death, pain, fear.', 'Add “new” words: presence, joy, life.'], note: 'Handle grief topics with parent/teacher care.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_7 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
