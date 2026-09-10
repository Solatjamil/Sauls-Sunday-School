/* =====================================================================
   Curriculum — tier L (Seedlings, ages 3-6). Units 1-10.
   Mature-content rule: this tier never carries death, violence or
   judgment content; stories are chosen and worded to match.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'creation', title: 'God Made Everything', tier: 'L', mode: 'story',
    track: 'god', testament: 'ot', era: 'beginnings', when: 1, path: 1, xp: 20,
    summary: 'God made the light, the sky, the land and the sea \u2014 and everything in it. Then He made you.',
    scripture: [{ ref: 'Genesis 1:1', text: 'In the beginning, God created the heavens and the earth.' },
                { ref: 'Genesis 1:31', text: 'God saw everything that he had made, and, behold, it was very good.' }],
    story: [
      'In the very beginning there was nothing but God. No sun. No sand. No puppies. Just God.',
      'Then God said, \u201cLet there be light!\u201d And light came \u2014 warm and bright. God separated the light from the dark. He called the light DAY and the dark NIGHT. That was day one.',
      'God made the big blue sky. He made the dry land and the seas. He said, \u201cLet the ground grow grass and trees and flowers!\u201d And it did \u2014 snap, snap, snap \u2014 green everywhere.',
      'God made the sun to shine in the day, and the moon and the stars for the night. Then He made the fish in the water, the birds in the air, and the animals on the ground.',
      'Last of all, God made people. He made them to be like Himself, and He loved them very much. God looked at everything \u2014 at you too \u2014 and said, \u201cThis is very good.\u201d',
      'Six days of making, and on the seventh day God rested. Not because He was tired. He rested because everything was good and He wanted to enjoy it.'
    ],
    teach: ['God made things just by speaking. His words are powerful.', 'God made people on purpose, and called them good.', 'You are part of God\u2019s good world.'],
    quiz: [
      { t: 'mc', q: 'What did God make on the very first day?', a: ['Light', 'Fish', 'Stars', 'Mountains'], c: 0, hint: 'God said, \u201cLet there be\u2026\u201d' },
      { t: 'mc', q: 'What did God make last of all?', a: ['People', 'Dogs', 'The moon', 'Trees'], c: 0, hint: 'He made them to be like Himself.' },
      { t: 'match', q: 'Match the maker to what was made. God made all of these!', pairs: [['Sun', 'Day light'], ['Moon and stars', 'Night light'], ['Fish', 'The water'], ['Birds', 'The sky']], hint: 'Where does each one live?' },
      { t: 'tap', q: 'When God looked at everything He made, what did He say?', a: ['\u201cIt is very good\u201d', '\u201cIt is messy\u201d', '\u201cI am tired\u201d'], c: 0 },
      { t: 'order', q: 'Put these in the order God made them.', items: ['Light', 'Sky and sea', 'Land and plants', 'Sun, moon, stars', 'Animals and people'], hint: 'Start with the first thing God said.' }
    ],
    memory: { ref: 'Genesis 1:1', text: 'In the beginning, God created the heavens and the earth.' },
    prayer: 'Dear God, You made the light and me. Thank You for Your good world. When I see a tree or a star, help me remember You made it. Amen.',
    badge: { name: 'First Light', art: 'sun', note: 'You finished your very first unit!' },
    printable: {
      motif: 'sun', title: 'Colour the six days',
      prompts: ['Draw your favourite thing God made.', 'Colour the sun yellow and the sea blue.', 'Draw yourself in God\u2019s garden.'],
      craft: { title: 'Creation hand-print book', steps: ['Trace six hands on paper and cut them out.', 'On each hand draw one thing God made that day.', 'Stack them in order and staple one edge.'], note: 'Day seven is an empty hand \u2014 rest with it.' }
    },
    ur: { title: 'خدا نے ہر چیز بنائی', story: [
      'ابتدا میں سب کچھ خالی تھا ، صرف خدا تھا۔',
      'پھر خدا نے فرمایا ، "روشنی ہو !" اور روشنی ہو گئی۔',
      'خدا نے آسمان ، سمندر ، زمین اور درخت بنائے ۔ پھر سورج ، چاند اور تارے بنائے ۔',
      'آخر میں خدا نے انسان کو بنایا ۔ خدا نے دیکھا کہ ہر چیز بہت اچھی ہے ۔'
    ] }
  });

  D.push({
    id: 'lights', title: 'Lights in the Sky', tier: 'L', mode: 'game',
    track: 'promise', testament: 'ot', era: 'beginnings', when: 2, path: 2, xp: 15,
    summary: 'God hung lights in the sky for a reason \u2014 to mark the days, and to point at His promises.',
    scripture: [{ ref: 'Genesis 1:14', text: 'Let there be lights in the expanse of the sky to separate between the day and the night, and let them be for signs.' }],
    story: [
      'Do you know why the sky has lights in it? God put them there on purpose.',
      'He made a big light to rule the day, and a small light to rule the night. And He sprinkled stars all over \u2014 so many that nobody can count them all.',
      'God said the lights would be for signs: to tell us when the seasons come, when the days pass, and when a special promise is about to happen.',
      'Tonight, go outside and look up. Every single star is a little note from God that says, \u201cI made this. I made it for you.\u201d'
    ],
    teach: ['The stars are called \u201csigns\u201d \u2014 they remind us of God.', 'God numbered the days for us.'],
    quiz: [
      { t: 'tap', q: 'Tap the light God made to rule the DAY.', a: ['Sun', 'Moon', 'Star'], c: 0 },
      { t: 'match', q: 'Match each light to when you see it.', pairs: [['Sun', 'Morning'], ['Moon', 'Night'], ['Stars', 'Dark sky'], ['Rainbow', 'After rain']], hint: 'When do you look up and see it?' },
      { t: 'mc', q: 'Why did God put lights in the sky?', a: ['To mark days, seasons and signs', 'To keep the birds warm', 'So we could fly to them', 'Just for fun, only'], c: 0, hint: 'They are for\u2026' },
      { t: 'mc', q: 'Which one did God make to rule the night?', a: ['The moon', 'The sun', 'The clouds', 'The wind'], c: 0 }
    ],
    memory: { ref: 'Psalm 147:4', text: 'He counts the number of the stars. He calls them all by their names.' },
    prayer: 'God, You name every star. Please know my name too. Thank You. Amen.',
    badge: { name: 'Star Counter', art: 'star', note: 'You learned why the sky shines.' },
    printable: {
      motif: 'star', title: 'Connect the stars',
      prompts: ['Draw lines between the dots to make a constellation.', 'Label it with your own name.', 'Colour the night sky dark blue and leave the stars white.'],
      craft: { title: 'Star jar', steps: ['Cut stars from paper.', 'Put them in a clean jar with a tea-light (an adult holds it).', 'Write \u201cGod knows my name\u201d on a strip and stick it on the jar.'], note: 'Use a battery light, not a flame.' }
    }
  });

  D.push({
    id: 'garden', title: 'The First Garden', tier: 'L', mode: 'story',
    track: 'god', testament: 'ot', era: 'beginnings', when: 3, path: 3, xp: 20, gentle: true,
    summary: 'God planted a beautiful garden for the first people, and walked with them there.',
    scripture: [{ ref: 'Genesis 2:8', text: 'Yahweh God planted a garden eastward in Eden; and there he put the man whom he had formed.' }],
    story: [
      'God planted a garden. Not a small one with a few flowers \u2014 a whole garden of every tree that is pleasant to look at and good to eat.',
      'In the middle of the garden stood four rivers with water so clear you could count the stones at the bottom. Gold lay on the ground. Birds came to sing.',
      'God gave the first man and woman one rule, just one: they could eat from any tree they liked, except one. He did that because love has to be a choice.',
      'In the cool of the day, God came walking in the garden, and they talked. That is what everyone had always wanted \u2014 to talk with God face to face.'
    ],
    teach: ['God gives good things freely.', 'God wants to walk with us, like a friend.', 'One rule was there to protect them, not to trick them.'],
    quiz: [
      { t: 'mc', q: 'Who planted the garden?', a: ['God', 'Adam', 'An angel', 'The birds'], c: 0 },
      { t: 'match', q: 'Match what was in the garden.', pairs: [['Trees', 'Good to eat'], ['Rivers', 'Clear water'], ['Gold', 'On the ground'], ['God', 'Walking and talking']], hint: 'What did God put where?' },
      { t: 'tap', q: 'How many rules did God give them in the garden?', a: ['One', 'Ten', 'Fifty', 'None at all'], c: 0 },
      { t: 'mc', q: 'In the garden, the first people could eat\u2026', a: ['From any tree they liked', 'Only one tree', 'Nothing at all', 'Only fruit that was red'], c: 0 }
    ],
    memory: { ref: 'Genesis 2:8', text: 'Yahweh God planted a garden eastward in Eden.' },
    prayer: 'God, I like talking to You. Help me walk with You today the way Adam did in the garden. Amen.',
    badge: { name: 'Garden Friend', art: 'tree', note: 'You found the first garden.' },
    printable: {
      motif: 'tree', title: 'Colour the garden of Eden',
      prompts: ['Colour four rivers blue.', 'Draw two animals you would like in the garden.', 'Draw the one tree you must not eat from, and label it.'],
      craft: { title: 'Garden in a shoebox', steps: ['Line a box with green paper.', 'Make trees from pipe cleaners and paper leaves.', 'Add a river from foil and small animals.'], note: 'Keep it on a windowsill as a reminder that God gives good things.' }
    }
  });

  D.push({
    id: 'noah', title: 'Noah\u2019s Big Boat', tier: 'L', mode: 'story',
    track: 'promise', testament: 'ot', era: 'beginnings', when: 4, path: 4, xp: 20, gentle: true,
    summary: 'God told Noah to build a huge boat. He and his family and the animals were all kept safe.',
    scripture: [{ ref: 'Genesis 6:22', text: 'Thus Noah did; according to all that God commanded him, so he did.' }],
    story: [
      'A long time ago, people forgot God and started being mean to each other. God was sad about that. But one man, Noah, still loved God.',
      'God said to Noah, \u201cBuild a big boat out of wood. It will be as long as twenty school buses! Make three floors inside and one door in the side.\u201d',
      'Everyone laughed at Noah. He kept building anyway. It took a very long time, and he told everybody, \u201cGod is kind. Come and be safe with us.\u201d',
      'Then the animals came \u2014 two and two, big ones and small ones, cows and cats and long-necked giraffes. God shut the door.',
      'It rained for forty days and forty nights. The boat floated high above the water. Inside, Noah\u2019s family were warm and safe, because God keeps His promises.',
      'At last the rain stopped. Noah sent out a bird, and it came back with a little green leaf. The water was going away. God had looked after everyone on that boat \u2014 every single animal too.'
    ],
    teach: ['Noah obeyed even when people laughed.', 'God shut the door \u2014 God keeps us safe.', 'God remembered the animals. He remembers you too.'],
    quiz: [
      { t: 'mc', q: 'What did God tell Noah to build?', a: ['A big boat', 'A tall tower', 'A temple', 'A bridge'], c: 0, hint: 'It floated on the water.' },
      { t: 'order', q: 'Put the story in the right order.', items: ['God tells Noah to build', 'The animals come two by two', 'God shuts the door', 'It rains for forty days', 'A bird brings a green leaf'], hint: 'Start at the beginning.' },
      { t: 'match', q: 'Match who did what.', pairs: [['Noah', 'Built the boat'], ['Animals', 'Came two and two'], ['God', 'Shut the door'], ['The bird', 'Brought a leaf']], hint: 'Who did each job?' },
      { t: 'tap', q: 'How long did it rain?', a: ['Forty days', 'Two days', 'Seven days', 'Ten minutes'], c: 0 },
      { t: 'mc', q: 'How many people did God keep safe on the boat?', a: ['Eight', 'Two', 'Forty', 'One hundred'], c: 0, hint: 'Noah, his wife, three sons, three wives.' }
    ],
    memory: { ref: 'Genesis 6:22', text: 'Thus Noah did; according to all that God commanded him, so he did.' },
    prayer: 'God, Noah listened and did what You said. Help me listen too, even when it looks silly. Keep me safe. Amen.',
    badge: { name: 'Ark Helper', art: 'ark', note: 'You obeyed like Noah.' },
    printable: {
      motif: 'ark', title: 'Noah\u2019s boat colouring page',
      prompts: ['Colour the boat. Draw three floors inside.', 'Draw two of each animal going up the ramp.', 'Draw the rain and then the sun coming out.'],
      craft: { title: 'Boat from a milk carton', steps: ['Ask an adult to cut the top off an empty carton.', 'Paint the sides brown like wood.', 'Put in toy animals \u2014 two and two.'], note: 'Float it in a basin to test God\u2019s good boat!' }
    }
  });

  D.push({
    id: 'rainbow', title: 'God\u2019s Rainbow Promise', tier: 'L', mode: 'lesson',
    track: 'promise', testament: 'ot', era: 'beginnings', when: 5, path: 5, xp: 18, gentle: true,
    summary: 'A promise is a thing God cannot forget. The rainbow was God\u2019s note to Himself, for us.',
    scripture: [{ ref: 'Genesis 9:13', text: 'I have set my rainbow in the cloud, and it will be a sign of the covenant between me and the earth.' }],
    story: [
      'When Noah and the animals came off the boat, the ground was wet and new. God did something wonderful: He made a promise.',
      'God said, \u201cI will never again use water to wash the whole earth away. Here is the sign of my promise: I put my bow in the cloud.\u201d',
      'That is why a rainbow still shows up after the rain. God calls it \u201cmy rainbow\u201d. He says, \u201cWhen you see it, I will remember \u2014 and I will keep being kind to you.\u201d',
      'When you make a promise you might forget. God never does. Every rainbow is God reminding Himself that you matter to Him.'
    ],
    teach: ['A covenant is a promise God binds Himself to.', 'God\u2019s promises are for everybody \u2014 every nation, every animal, every child.', 'The first of many promises in the Bible that lead to Jesus.'],
    quiz: [
      { t: 'mc', q: 'What did God put in the cloud as a sign?', a: ['A rainbow', 'A kite', 'A lantern', 'A boat'], c: 0 },
      { t: 'match', q: 'Match the promise words.', pairs: [['Rainbow', 'The sign'], ['God', 'The one who promises'], ['Noah', 'The one who heard it'], ['Water', 'What God promised about']], hint: 'Which word goes with which?' },
      { t: 'tap', q: 'Who can forget a promise?', a: ['People', 'God'], c: 0 },
      { t: 'mc', q: 'What does a rainbow remind God of?', a: ['His promise to be kind', 'That He was hungry', 'The boat was heavy', 'Nothing at all'], c: 0 }
    ],
    memory: { ref: 'Genesis 9:13', text: 'I have set my rainbow in the cloud, a sign of the covenant.' },
    prayer: 'Thank You, God, that You never break a promise. When I see a rainbow, remind my heart that You are kind to me. Amen.',
    badge: { name: 'Promise Keeper', art: 'rainbow', note: 'You know God never forgets.' },
    printable: {
      motif: 'rainbow', title: 'Make your own rainbow',
      prompts: ['Colour the seven bands of the rainbow from the top.', 'Under it, draw the boat and one animal.', 'Write: \u201cGod keeps His promises.\u201d'],
      craft: { title: 'Rainbow promise bracelet', steps: ['Thread seven colours of beads onto elastic.', 'Leave it on your wrist this week.', 'Each time you see it, say \u201cGod keeps promises.\u201d'], note: 'Free craft: use scrap pasta painted in seven colours instead of beads.' }
    }
  });

  D.push({
    id: 'abraham-stars', title: 'Abraham and the Star Count', tier: 'L', mode: 'story',
    track: 'promise', testament: 'ot', era: 'fathers', when: 11, path: 6, xp: 20,
    summary: 'God promised an old man with no children a family as big as the stars \u2014 and He did it.',
    scripture: [{ ref: 'Genesis 15:5', text: 'Look up now, and count the stars, if you are able to count them\u2026 So your offspring will be.' },
                 { ref: 'Genesis 15:6', text: 'He believed in Yahweh, and it was credited to him for righteousness.' }],
    story: [
      'There was a man called Abram. God called him and said, \u201cLeave your home and follow Me. I will make you into a big family.\u201d',
      'But Abram grew old. He and his wife Sarai had no children at all. Their house was quiet. God said, \u201cGo outside at night. Look up. Try to count the stars.\u201d',
      'Abram looked. One, two, ten, a hundred \u2026 and then far too many to count. God said, \u201cThat is how many people will be in your family.\u201d',
      'It sounded impossible. Abram was ninety-nine years old and Sarai was eighty-nine! But Abram believed God. And the Bible says that believing made him right with God.',
      'A year later Sarai had a baby boy. They named him Isaac, which means \u201claughter\u201d, because God had turned their worrying into laughing with joy. God also gave Abram a new name: Abraham, \u201cfather of many\u201d.'
    ],
    teach: ['God\u2019s promises often look impossible first.', 'Believing God is what makes us right with Him.', 'You and I can be part of Abraham\u2019s big family by trusting God.'],
    quiz: [
      { t: 'mc', q: 'What did God tell Abraham to count?', a: ['The stars', 'The sheep', 'The stones', 'The boats'], c: 0 },
      { t: 'tap', q: 'What was Abraham and Sarah\u2019s baby son called?', a: ['Isaac', 'Ishmael', 'Jacob', 'Noah'], c: 0, hint: 'It means \u201claughter\u201d.' },
      { t: 'match', q: 'Match the name to its meaning.', pairs: [['Isaac', 'Laughter'], ['Abraham', 'Father of many'], ['Sarai to Sarah', 'Princess'], ['Yahweh', 'God\u2019s name']], hint: 'What does each name say?' },
      { t: 'tap', q: 'Did Abraham believe God\u2019s promise?', a: ['Yes, he believed', 'No, he ran away'], c: 0 },
      { t: 'mc', q: 'What new name did God give Abram?', a: ['Abraham', 'Noah', 'Moses', 'David'], c: 0 }
    ],
    memory: { ref: 'Genesis 15:6', text: 'He believed in Yahweh, and it was credited to him for righteousness.' },
    prayer: 'God, Abraham trusted You for something he could not see. I cannot see You either, but I trust You. Make my family big in Your love. Amen.',
    badge: { name: 'Star Believer', art: 'star', note: 'You trusted God like Abraham.' },
    printable: {
      motif: 'star', title: 'Count the stars',
      prompts: ['Count the stars on the page and write the number.', 'Colour only the stars with seven points.', 'Ask a grown-up to help you count how many children are in your family tree.'],
      craft: { title: 'Promise stars', steps: ['Cut ten stars from yellow paper.', 'On each one write a person you want God to bless.', 'Tape them on your window and watch them shine.'], note: 'Add a new star every week of the month.' }
    }
  });

  D.push({
    id: 'samuel', title: 'Samuel Hears God\u2019s Voice', tier: 'L', mode: 'story',
    track: 'bible', testament: 'ot', era: 'homeland', when: 32, path: 7, xp: 18,
    summary: 'A small boy in the temple learned how to answer when God speaks.',
    scripture: [{ ref: '1 Samuel 3:9', text: 'Speak; for your servant hears.' }],
    story: [
      'When Samuel was a little boy, he lived in the house of God and helped the old priest Eli. Samuel got up early, lit the lamps, and opened the doors.',
      'One night Samuel was lying down to sleep when a voice said, \u201cSamuel! Samuel!\u201d He jumped up and ran to Eli. \u201cHere I am! You called me.\u201d',
      'Eli said, \u201cI didn\u2019t call you, son. Go back to sleep.\u201d It happened again. And again. Three times Samuel got up, and three times Eli said it was not him.',
      'Then Eli understood. It was God calling the boy! So he told Samuel what to say the next time.',
      'God called again: \u201cSamuel! Samuel!\u201d And Samuel answered the best short prayer a child can say: \u201cSpeak, Lord, for your servant is listening.\u201d',
      'God spoke to Samuel that night, and God spoke with him every day after. Samuel grew up and helped the whole nation listen to God.'
    ],
    teach: ['God really speaks \u2014 mostly through His Word.', 'A short answer is enough: \u201cSpeak, Lord, I am listening.\u201d', 'God uses small children.'],
    quiz: [
      { t: 'mc', q: 'What did Samuel say when God called?', a: ['\u201cSpeak, your servant is listening\u201d', '\u201cNot now\u201d', '\u201cWho is it?\u201d', '\u201cGo away\u201d'], c: 0 },
      { t: 'order', q: 'Put the night in order.', items: ['God calls \u201cSamuel!\u201d', 'Samuel runs to Eli', 'Eli says it was not him', 'Eli teaches Samuel what to say', 'Samuel answers God'], hint: 'What happened first that night?' },
      { t: 'match', q: 'Match the person to what they did.', pairs: [['Samuel', 'Lived in God\u2019s house'], ['Eli', 'Taught him to answer'], ['God', 'Called the boy']], hint: 'Who did what?' },
      { t: 'tap', q: 'How many times did God call before Samuel understood?', a: ['Three', 'One', 'Ten', 'None'], c: 0 }
    ],
    memory: { ref: '1 Samuel 3:9', text: 'Speak; for your servant hears.' },
    prayer: 'God, speak and I will listen. My ears are small but You can still use them. Amen.',
    badge: { name: 'Good Listener', art: 'ear', note: 'You learned to hear God.' },
    printable: {
      motif: 'lantern', title: 'The lamp in the temple',
      prompts: ['Colour the oil lamp and the glow around it.', 'Draw an ear next to a heart \u2014 listening with your whole self.', 'Write: \u201cSpeak, Lord.\u201d'],
      craft: { title: 'Listening jar', steps: ['Put dry beans in a small jar and close the lid.', 'Shake it, then hold it still and listen until the last sound goes.', 'Practice saying \u201cSpeak, Lord\u201d in the quiet.'], note: 'A five-minute quiet game for the whole family.' }
    }
  });

  D.push({
    id: 'david-shepherd', title: 'David the Shepherd Boy', tier: 'L', mode: 'story',
    track: 'values', testament: 'ot', era: 'kings', when: 36, path: 8, xp: 18, gentle: true,
    summary: 'Before David was a king he looked after sheep, and God was with him in the fields.',
    scripture: [{ ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' }],
    story: [
      'David was the youngest boy in his family. His job was not a glamorous one: he took the sheep out to the hills to find grass and water.',
      'Sheep get into trouble constantly. They wander to the edge of cliffs, they tangle in bushes, and at night lions and bears come near. So David stayed awake.',
      'When a lion came for a lamb, David chased it off. When a bear came, God made David brave and he drove it away too. He always got the sheep back.',
      'One night, with a fire going and the sheep asleep, David wrote a song. \u201cYahweh is my shepherd; I shall not want. He makes me lie down in green pastures.\u201d That song is Psalm 23, and people still sing it today.',
      'Later, God made this shepherd boy the king of Israel. But David never forgot that God had looked after sheep \u2014 so he let God look after a nation.'
    ],
    teach: ['Doing a small job well is how God trains a big one.', 'God was with David in the fields, and He is with you at school.', 'David wrote psalms \u2014 songs for God.'],
    quiz: [
      { t: 'mc', q: 'What was David\u2019s job as a boy?', a: ['Looking after sheep', 'Building ships', 'Being a priest', 'Cooking for the king'], c: 0 },
      { t: 'match', q: 'Match what a shepherd does.', pairs: [['Green grass', 'Where sheep lie down'], ['Still water', 'Where sheep drink'], ['Staff', 'To guide them back'], ['Song', 'Psalm 23']], hint: 'Sheep need all of these.' },
      { t: 'tap', q: 'In Psalm 23, David says Yahweh is my\u2026', a: ['Shepherd', 'Farmer', 'Soldier', 'King'], c: 0 },
      { t: 'mc', q: 'What happened when a lion came for a lamb?', a: ['David chased it off', 'David ran home', 'The sheep hid', 'Nothing happened'], c: 0, hint: 'God made David brave.' }
    ],
    memory: { ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
    prayer: 'God, You are my shepherd. When I am lost or scared, lead me home. Thank you for watching over me like David did his sheep. Amen.',
    badge: { name: 'Brave Helper', art: 'lamb', note: 'You did a small job well.' },
    printable: {
      motif: 'lamb', title: 'Sheep and shepherd colouring',
      prompts: ['Colour the sheep white and the grass green.', 'Draw the lion far away on the other hill.', 'Write the first line of Psalm 23 at the top.'],
      craft: { title: 'Cotton-wool sheep', steps: ['Cut a sheep shape from card.', 'Glue cotton wool on its body.', 'Draw a smile and stick on four matchstick legs.'], note: 'Make a flock of ten and count them like David did.' }
    }
  });

  D.push({
    id: 'jonah', title: 'Jonah and the Big Fish', tier: 'L', mode: 'story',
    track: 'prayer', testament: 'ot', era: 'prophets', when: 42, path: 9, xp: 20, gentle: true,
    summary: 'You cannot run away from God \u2014 but He is patient, and He forgives the second time too.',
    scripture: [{ ref: 'Jonah 2:9', text: 'When my soul was faint within me, I remembered Yahweh\u2026 with the voice of thanksgiving will I sacrifice to you.' }],
    story: [
      'God said to Jonah, \u201cGo to the great city of Nineveh and tell the people to stop being cruel.\u201d Jonah did not want to go at all, because the people there had been very nasty to his friends.',
      'So Jonah went the other way and paid for a ticket on a boat. But God is not stuck in one country. A great storm came up and the waves tossed the little boat like a toy.',
      'The sailors were frightened. Jonah said, \u201cI am the reason. Pick me up and put me in the water, and the sea will be calm.\u201d So they lifted him out \u2014 and right away the water lay flat as a plate.',
      'Then a great fish, ready and waiting by God\u2019s command, swallowed Jonah. Inside the fish it was dark and smelly and very quiet. Jonah had a lot of time to pray.',
      'He prayed, \u201cWhen my heart gave up, I remembered You, God.\u201d And God spoke to the fish, and the fish carried Jonah to dry sand and let him out.',
      'This time Jonah went to Nineveh. He told them God was kind and would forgive them if they stopped being cruel \u2014 and they did! Even the king sat down in the dust and said sorry. God was glad.'
    ],
    teach: ['Running away never works, but God still loves you.', 'God forgives second chances.', 'God cares about everybody \u2014 even people we find hard to love.'],
    quiz: [
      { t: 'mc', q: 'Where did God tell Jonah to go?', a: ['Nineveh', 'Rome', 'The boat yard', 'The temple'], c: 0 },
      { t: 'order', q: 'Put the story in order.', items: ['God tells Jonah to go', 'Jonah gets on a boat going the wrong way', 'A storm comes', 'Jonah is put in the water', 'A big fish swallows him', 'Jonah prays and is saved'], hint: 'God said go \u2014 Jonah said no.' },
      { t: 'match', q: 'Match the moment to what happened.', pairs: [['The storm', 'Stopped when Jonah went in'], ['The fish', 'Carried Jonah to land'], ['Nineveh', 'Said sorry and changed']], hint: 'Three turning points.' },
      { t: 'tap', q: 'How long was Jonah inside the fish?', a: ['Three days', 'One hour', 'Ten years', 'A week'], c: 0 },
      { t: 'mc', q: 'When the people of Nineveh heard Jonah, they\u2026', a: ['Said sorry and changed', 'Laughed and left', 'Locked their doors', 'Ran to the sea'], c: 0 }
    ],
    memory: { ref: 'Jonah 2:9', text: 'I remembered Yahweh\u2026 with the voice of thanksgiving.' },
    prayer: 'God, when I run the wrong way, help me remember You. And help me be kind even to people I don\u2019t like. Amen.',
    badge: { name: 'Second Chance', art: 'fish', note: 'You know God forgives again.' },
    printable: {
      motif: 'fish', title: 'Jonah colouring page',
      prompts: ['Colour the fish blue-green and Jonah inside it.', 'Draw the storm on one side and calm water on the other.', 'Draw Nineveh\u2019s big wall \u2014 the city was three days wide!'],
      craft: { title: 'Fish puppet that opens', steps: ['Trace a big fish on card and cut it out.', 'Cut a mouth flap that opens.', 'Tape Jonah on a toothpick inside so you can pop him out.'], note: 'Let the children tell the story back with the puppet.' }
    }
  });

  D.push({
    id: 'daniel-lions', title: 'Daniel and the Lions', tier: 'L', mode: 'story',
    track: 'god', testament: 'ot', era: 'kings', when: 52, path: 10, xp: 20, gentle: true,
    summary: 'Daniel kept praying, so he was put in a den of lions. God shut their mouths.',
    scripture: [{ ref: 'Daniel 6:22', text: 'God has sent his angel, and has shut the lions\u2019 mouths, and they have not hurt me.' }],
    story: [
      'Daniel was an old man who loved God very much. Three times every day he knelt down by his window and prayed, with his face turned towards Jerusalem.',
      'Some men did not like that Daniel was so good at his job. So they made the king sign a silly law: for thirty days, if anyone prayed to a god or a person except the king, they would be thrown to the lions.',
      'Daniel heard about the law. And he went home, opened his window, knelt down, and prayed \u2014 just like always.',
      'Those men ran and told the king. The king was very sad, because he liked Daniel, but he had signed the law and could not change it.',
      'They brought Daniel and lowered him into the dark den. The lions were hungry. But God sent an angel and shut the lions\u2019 mouths. Daniel sat down on the cool floor and not one lion even growled.',
      'First thing in the morning the king ran to the den and shouted, \u201cDaniel, is God able to save you?\u201d Daniel said, \u201cMy God sent his angel. Not one paw has touched me.\u201d So out he climbed, and the whole kingdom heard that Daniel\u2019s God really saves.'
    ],
    teach: ['Prayer is not optional, it is breathing.', 'God does not always stop the trouble \u2014 He is with us in it.', 'Daniel kept the same habit: three times a day.'],
    quiz: [
      { t: 'mc', q: 'How many times a day did Daniel pray?', a: ['Three', 'Once a week', 'Five', 'Never'], c: 0 },
      { t: 'match', q: 'Match who did what.', pairs: [['The king', 'Signed the law'], ['The bad men', 'Told on Daniel'], ['God\u2019s angel', 'Shut the mouths'], ['Daniel', 'Kept praying']], hint: 'Who did which part?' },
      { t: 'tap', q: 'Who shut the lions\u2019 mouths?', a: ['God sent an angel', 'Daniel shouted', 'The king', 'A rope'], c: 0 },
      { t: 'order', q: 'Put the story in order.', items: ['Daniel prays', 'A law says no praying', 'Daniel is put in the den', 'The lions are quiet', 'Daniel comes out safe'], hint: 'Pray \u2014 law \u2014 den \u2014 morning.' },
      { t: 'mc', q: 'What did Daniel do when he heard the law?', a: ['He kept on praying', 'He hid', 'He ran away', 'He stopped praying for a month'], c: 0 }
    ],
    memory: { ref: 'Daniel 6:22', text: 'God has sent his angel, and has shut the lions\u2019 mouths.' },
    prayer: 'God, be with me in the scary places. Shut the mouths of everything that wants to hurt me. Thank You that You sent an angel for Daniel and You send Your Spirit for me. Amen.',
    badge: { name: 'Lion Keeper', art: 'lion', note: 'You kept praying like Daniel.' },
    printable: {
      motif: 'lion', title: 'The quiet lions',
      prompts: ['Colour the lions but leave their mouths shut \u2014 draw a zip or a lock on them!', 'Draw Daniel sitting calmly in the middle.', 'Draw the angel with a bright lamp.'],
      craft: { title: 'Den diorama', steps: ['Line a shoebox with sand-coloured paper.', 'Cut lions from grey card and tape them standing, not pouncing.', 'Put a small Daniel figure in the middle with hands folded.'], note: 'Say a prayer together in front of it every night this week.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_1 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
