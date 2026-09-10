/* =====================================================================
   Curriculum — tier L (Seedlings, ages 3-6). Units 11-20.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'jesus-born', title: 'The Baby Jesus Is Born', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'born', when: 61, path: 11, xp: 20, gentle: true,
    summary: 'God sent His Son as a tiny baby, into a stable, for everybody — including you.',
    scripture: [{ ref: 'Luke 2:11', text: 'For today, in David’s town, a Savior, who is Christ the Lord, was born for you.' },
                { ref: 'Matthew 1:23', text: 'They shall call his name Immanuel, which being interpreted is, “God with us.”' }],
    story: [
      'A young woman named Mary lived in a small town called Nazareth. An angel came to her with the biggest news ever: “You will have a baby son. He will be called Jesus. He will be God with us.”',
      'Mary and Joseph had to travel a long way to a town called Bethlehem to be counted in a list of everybody’s names. Every bed in the town was taken.',
      'So Jesus was born in a place for animals. They laid the baby in a manger — the wooden box where sheep and donkeys eat their dinner.',
      'Out in the fields nearby, shepherds were watching their sheep at night. Suddenly the sky was full of shining angels, and they sang: “Glory to God! Peace on earth to the people He loves!”',
      'The shepherds ran to Bethlehem and found the baby just as the angels said. They told everybody the good news, and Mary kept all these things in her heart.',
      'Later, some wise men from far away followed a new star and brought presents: gold, frankincense and myrrh. God had sent His Son — for shepherds, for kings, and for you.'
    ],
    teach: ['Jesus is God with us — that is what Immanuel means.', 'God chose poor shepherds to hear first.', 'Nobody was too small for the news.'],
    quiz: [
      { t: 'mc', q: 'In what was the baby Jesus laid?', a: ['A manger, an animal feeding box', 'A golden bed', 'A boat', 'A tent'], c: 0, hint: 'It is where sheep eat.' },
      { t: 'order', q: 'Put the birth story in order.', items: ['The angel visits Mary', 'Mary and Joseph travel', 'Jesus is born', 'The angels sing to shepherds', 'The wise men bring gifts'], hint: 'Who heard first?' },
      { t: 'match', q: 'Match the person to their part.', pairs: [['Mary', 'Jesus’ mother'], ['Joseph', 'Took care of them'], ['Shepherds', 'Heard the angels'], ['Wise men', 'Followed a star']], hint: 'Who did what?' },
      { t: 'tap', q: 'What does Immanuel mean?', a: ['God with us', 'King of kings', 'Very holy', 'Star of light'], c: 0 },
      { t: 'mc', q: 'Which town was Jesus born in?', a: ['Bethlehem', 'Nazareth', 'Jericho', 'Rome'], c: 0 }
    ],
    memory: { ref: 'Luke 2:11', text: 'A Savior, who is Christ the Lord, was born for you.' },
    prayer: 'Thank You, God, for sending Jesus. You came down low so nobody would be scared of You. Live in my heart. Amen.',
    badge: { name: 'Manger Visitor', art: 'star', note: 'You know why the angels sang.' },
    printable: {
      motif: 'manger', title: 'The stable at Bethlehem',
      prompts: ['Colour the baby’s blankets white and the manger brown.', 'Draw one animal looking on.', 'Draw a star over the roof and shepherds on the hill.'],
      craft: { title: 'Paper manger', steps: ['Fold a paper cup in half lengthways.', 'Line it with a square of cotton wool.', 'Add a small doll baby and keep it by your bed.'], note: 'Perfect for the nativity at home at Christmas.' }
    }
  });

  D.push({
    id: 'jesus-prays', title: 'Jesus Prays — and Teaches Us To', tier: 'L', mode: 'lesson',
    track: 'prayer', testament: 'nt', era: 'taught', when: 66, path: 12, xp: 18,
    summary: 'Even Jesus prayed. So prayer is a good thing — and this is how to do it.',
    scripture: [{ ref: 'Matthew 6:9', text: 'Pray then like this: Our Father in heaven, and your name be respected.' }],
    story: [
      'One day Jesus was praying somewhere quiet, and when He finished one of his friends said, “Lord, teach us to pray, the way you do.”',
      'Jesus did not give them a long, complicated prayer. He gave six short lines, and every one of them is a door.',
      '“Our Father in heaven” — God is your Dad, and He is big enough to help. “Your name be respected” — God, You are holy; we think You are wonderful.',
      '“Your kingdom come, your will be done on earth as it is in heaven” — God, make my day go Your way. “Give us this day our daily bread” — thank You for breakfast, and tomorrow’s too.',
      '“Forgive us as we forgive” — when I say sorry to You, I will say sorry to my sister. “Deliver us from evil” — keep me from the thing that pulls me away.',
      'That is the whole prayer, and it takes about fifteen seconds. Jesus also said: do not hurry it, do not show off, and if you get stuck just say “Father” and let Him come.'
    ],
    teach: ['If Jesus needed to pray, prayer is good, not boring.', 'Prayer has four easy parts: love, sorry, please, thank You.', 'Jesus taught God’s family, not one person: OUR Father.'],
    quiz: [
      { t: 'match', q: 'Match the prayer line to what it says.', pairs: [['Our Father', 'God is my family'], ['Your kingdom come', 'God, lead my day'], ['Daily bread', 'Thank You for food'], ['Forgive us', 'Say sorry, then say sorry']], hint: 'Each line has a job.' },
      { t: 'mc', q: 'Why did Jesus teach this prayer?', a: ['His friends asked Him to', 'It was a competition', 'He was writing a book', 'A king asked'], c: 0 },
      { t: 'tap', q: 'How long did Jesus’ prayer take to say?', a: ['Very short', 'An hour', 'All night'], c: 0 },
      { t: 'order', q: 'Put the four easy parts in order.', items: ['Love God — You are great', 'Say sorry', 'Ask for help', 'Say thank You'], hint: 'Start at the top.' }
    ],
    memory: { ref: 'Matthew 6:9', text: 'Our Father in heaven, and your name be respected.' },
    prayer: 'Our Father in heaven, may Your name be respected. Give me today my daily bread, forgive me, keep me safe. Thank You that Jesus taught me how. Amen.',
    badge: { name: 'Prayer Starter', art: 'hands', note: 'You can pray now, any time.' },
    printable: {
      motif: 'hands', title: 'The four-part hand',
      prompts: ['Trace your hand. On the thumb write LOVE, index SAY SORRY, middle ASK, ring THANK, pinky PRAISE.', 'Colour each finger a different colour.', 'Put the hand on your wall and pray along it each night.'],
      craft: { title: 'Prayer stones', steps: ['Find four smooth stones.', 'Paint one for each part: love, sorry, please, thank You.', 'Keep them in your pocket and say one prayer for each.'], note: 'Six stones if you want a memory verse too.' }
    }
  });

  D.push({
    id: 'feeds-5000', title: 'A Lunchbox Feeds Everyone', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'taught', when: 68, path: 13, xp: 20,
    summary: 'Jesus took five small breads and two fish and fed a whole crowd — starting from one boy’s lunch.',
    scripture: [{ ref: 'John 6:11', text: 'Jesus took the loaves, and when he had given thanks, he distributed to the disciples, and the disciples to those who were seated.' }],
    story: [
      'A huge crowd followed Jesus up a hillside — five thousand men, plus women and children — and by the afternoon everybody was hungry.',
      'Jesus asked Philip, “Where can we buy bread for all these people?” Philip did the maths and nearly laughed: it would take eight month’s wages! Jesus was teaching him that He could do what nobody else could.',
      'Then a small boy came forward. He had five barley loaves and two little fish. That was all. It was his own lunch.',
      'Jesus took the food. He gave thanks to God for it — no complaints about how little it was. Then He broke the loaves and passed them to the disciples, and the disciples passed them out.',
      'The food did not run out. It kept coming and coming until every single person on that hill had eaten as much as they wanted.',
      'Then Jesus said, “Gather up the leftover pieces, so nothing is wasted.” They filled twelve baskets of scraps — more than they started with!'
    ],
    teach: ['Jesus gave thanks for a small thing and God made it enormous.', 'Give what you have; do not wait until you have lots.', 'Nothing of God’s is wasted — even the leftovers.'],
    quiz: [
      { t: 'mc', q: 'How much food did the boy have?', a: ['Five loaves and two fish', 'A whole market', 'One apple', 'Twelve chickens'], c: 0 },
      { t: 'order', q: 'Put the lunch miracle in order.', items: ['Crowd is hungry', 'A boy brings his lunch', 'Jesus gives thanks', 'Everyone eats their fill', 'Twelve baskets left over'], hint: 'Thanks came before eating.' },
      { t: 'tap', q: 'What did Jesus do before the food was shared?', a: ['He gave thanks', 'He shouted', 'He counted the bread', 'He sat down'], c: 0 },
      { t: 'match', q: 'Match the number to the story part.', pairs: [['5000', 'Men who were fed'], ['5', 'Loaves of bread'], ['2', 'Small fish'], ['12', 'Baskets left over']], hint: 'Count the story.' },
      { t: 'mc', q: 'Why did Jesus tell them to gather the leftovers?', a: ['So nothing is wasted', 'To hide the proof', 'For the birds', 'To count it again'], c: 0 }
    ],
    memory: { ref: 'John 6:11', text: 'He gave thanks, and distributed to those who were seated.' },
    prayer: 'Jesus, my lunch is small but You can use it. Teach me to give You what I have and then say thank You. Amen.',
    badge: { name: 'Lunchbox Giver', art: 'basket', note: 'You gave what you had.' },
    printable: {
      motif: 'basket', title: 'Count and colour the loaves',
      prompts: ['Count and colour five loaves and two fish.', 'Draw twelve empty baskets under them.', 'Draw the boy holding his lunch out to Jesus.'],
      craft: { title: 'Five-loaves clay', steps: ['Roll five balls of clay or dough into bread shapes.', 'Add two fish shapes.', 'Press a fork pattern into them like real loaves, then dry in the sun.'], note: 'Then share real bread at tea time and say thank you out loud.' }
    }
  });

  D.push({
    id: 'calms-storm', title: 'Jesus Calms the Storm', tier: 'L', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'taught', when: 69, path: 14, xp: 18,
    summary: 'A big storm, a sleeping Jesus, and four words that stopped the wind.',
    scripture: [{ ref: 'Mark 4:39', text: 'He rose up, and rebuked the wind, and said to the sea, “Peace! Be still!” The wind ceased, and there was a great calm.' }],
    story: [
      'Jesus and his friends got into a boat to cross the lake. It had been a long day, so Jesus lay down at the back of the boat and fell asleep on a cushion.',
      'A terrible storm blew up. Waves crashed over the sides and the boat filled with water. The fishermen were scared stiff — they had done this all their lives and they knew this storm was too big.',
      'They woke Jesus up, shouting, “Teacher, don’t you care that we are going down?”',
      'Jesus stood up. He spoke to the wind the way you speak to a naughty dog: “Peace! Be still!” And the wind stopped right there. The water went flat and quiet.',
      'Then Jesus said, “Why are you so afraid? Do you still not trust me?” They sat in the calm and whispered, “Who IS this? Even the wind and the water obey Him!”',
      'The same Jesus is in your boat when things feel scary. He is never too tired to help, and He never stops caring.'
    ],
    teach: ['Jesus is God, and creation listens to Him.', 'Being afraid does not mean you are failing — His friends were afraid too.', 'Wake Jesus first, not last.'],
    quiz: [
      { t: 'mc', q: 'What did Jesus say to the storm?', a: ['“Peace! Be still!”', '“Go away forever!”', '“I am sleeping”', '“Swim faster!”'], c: 0 },
      { t: 'tap', q: 'What was Jesus doing when the storm started?', a: ['Asleep', 'Fishing', 'Shouting', 'Swimming'], c: 0 },
      { t: 'order', q: 'Put the storm in order.', items: ['Boat crosses the lake', 'Jesus sleeps', 'Storm comes up', 'Friends wake Jesus', 'The sea goes flat'], hint: 'Sleep — storm — shout — quiet.' },
      { t: 'mc', q: 'What did the disciples wonder afterwards?', a: ['“Who is this, that even the wind obeys?”', 'What was for dinner', 'Where the nets were', 'Why Jesus was tired'], c: 0 }
    ],
    memory: { ref: 'Mark 4:39', text: 'Peace! Be still! The wind ceased, and there was a great calm.' },
    prayer: 'Jesus, when my worries crash over me, wake You up. Say “be still” to the noise in my head. I trust You. Amen.',
    badge: { name: 'Storm Friend', art: 'boat', note: 'You know who calms the noise.' },
    printable: {
      motif: 'boat', title: 'The boat in the storm',
      prompts: ['Colour the waves dark and the boat brown.', 'Draw Jesus sleeping at the back with a pillow.', 'On the other half of the page draw the same boat with flat, sunny water.'],
      craft: { title: 'Calm-and-storm bottle', steps: ['Fill a bottle two-thirds with water and add glitter.', 'Add a drop of blue dye and glue the lid shut (an adult does this).', 'Shake it — watch the storm — then set it down and watch it go still.'], note: 'Say “Peace, be still” while the glitter settles.' }
    }
  });

  D.push({
    id: 'lost-sheep', title: 'The One That Came Home', tier: 'L', mode: 'lesson',
    track: 'god', testament: 'nt', era: 'taught', when: 70, path: 15, xp: 18, gentle: true,
    summary: 'God is the shepherd who leaves ninety-nine to find the one that wandered off.',
    scripture: [{ ref: 'Luke 15:5', text: 'He lays it on his shoulders, rejoicing.' }],
    story: [
      'Jesus told a story to some people who thought they were better than everybody else.',
      '“A man had one hundred sheep. One of them wandered off — they always do. When evening came and he counted them, one was gone.',
      'What would you do? Leave the ninety-nine safe ones and go into the dark hills to look for the silly lost one? That is exactly what he did. He searched until he found it. He did not shout at it. He picked it up and carried it home on his shoulders, so happy.',
      'Then he called all his friends and said, “Party with me! I found my lost sheep!”',
      'Jesus said that Heaven is happier over one person who comes back to God than over ninety-nine who think they never need to.',
      'You are not a number to God. You are the one He walks into the dark for.'
    ],
    teach: ['God comes looking; you do not have to find your way back alone.', 'God is not angry at you for wandering — He is glad to find you.', 'Heaven throws a party when somebody turns to God.'],
    quiz: [
      { t: 'mc', q: 'How many sheep did the man leave to find the one?', a: ['Ninety-nine', 'Fifty', 'Five', 'None'], c: 0 },
      { t: 'tap', q: 'What did the shepherd do when he found the sheep?', a: ['Carried it home happy', 'Left it there', 'Shouted at it', 'Sold it'], c: 0 },
      { t: 'match', q: 'Match the numbers to the story.', pairs: [['100', 'Sheep the man had'], ['1', 'Sheep that wandered off'], ['99', 'Sheep left safe'], ['Everyone', 'Who came to the party']], hint: 'Count them up.' },
      { t: 'mc', q: 'Who throws the party in Heaven?', a: ['God, over one who comes back', 'Nobody', 'Only the ninety-nine', 'The neighbours only'], c: 0 }
    ],
    memory: { ref: 'Luke 15:5', text: 'He lays it on his shoulders, rejoicing.' },
    prayer: 'God, thank You for coming to get me. When other people wander, keep looking for them — and let me be happy when they come home. Amen.',
    badge: { name: 'Found Sheep', art: 'lamb', note: 'You know God comes for you.' },
    printable: {
      motif: 'lamb', title: 'Ninety-nine and one',
      prompts: ['Count the sheep on the page — one is hiding!', 'Draw a path from the hill back to the pen.', 'Colour the shepherd’s coat red because he is so happy.'],
      craft: { title: 'Pompom lost sheep', steps: ['Glue ten pompoms in a line on card.', 'Cut one off and hide it under a paper hill.', 'Lift the hill and put the sheep back on the shepherd’s shoulders.'], note: 'Play the game again so the child sees the finding.' }
    }
  });

  D.push({
    id: 'zacchaeus', title: 'Zacchaeus in the Tree', tier: 'L', mode: 'story',
    track: 'values', testament: 'nt', era: 'taught', when: 71, path: 16, xp: 20,
    summary: 'A short man who took money from people met Jesus in a tree — and everything changed.',
    scripture: [{ ref: 'Luke 19:10', text: 'The Son of Man came to seek and to save that which was lost.' }],
    story: [
      'In the town of Jericho lived a man called Zacchaeus. He collected taxes, which meant he took money from his own people. Everybody hated him. He was rich, and very lonely.',
      'One day Zacchaeus heard Jesus was coming through town. The crowd was too thick and he was too short to see anything — so this important grown-up man climbed a sycamore tree like a boy.',
      'Jesus reached the tree, looked up, and said the strangest thing: “Zacchaeus, hurry down! I am staying at your house today.”',
      'The crowd muttered: he is a sinner and Jesus is eating with him! But Zacchaeus jumped down grinning, and something in his heart had turned right round.',
      'Standing in front of everybody he said, “I will give half my money to the poor, and if I cheated anybody I will pay them back four times as much!”',
      'Jesus said, “Today, salvation has come to this house.” He had come looking for him — that is what the Son of Man does.'
    ],
    teach: ['Changing your life means putting things right, not just saying sorry.', 'Jesus looks for people, even in trees.', 'Nobody is too bad for Jesus to want to stay at their house.'],
    quiz: [
      { t: 'mc', q: 'Why did Zacchaeus climb a tree?', a: ['He was too short to see Jesus', 'He liked climbing', 'He was hiding from Jesus', 'To pick fruit for Jesus'], c: 0 },
      { t: 'order', q: 'Put the story in order.', items: ['Zacchaeus climbs a tree', 'Jesus looks up and calls him', 'The crowd grumbles', 'Zacchaeus puts things right', 'Jesus says salvation came'], hint: 'Tree first, then what?' },
      { t: 'match', q: 'Match what Zacchaeus promised.', pairs: [['Half his money', 'To the poor'], ['Four times', 'Back to people he cheated'], ['Hurry down', 'What Jesus said'], ['Salvation', 'What came to his house']], hint: 'Promise to promise.' },
      { t: 'tap', q: 'How many times did Zacchaeus pay back people he cheated?', a: ['Four times', 'Two times', 'Half', 'He did not'], c: 0 }
    ],
    memory: { ref: 'Luke 19:10', text: 'The Son of Man came to seek and to save that which was lost.' },
    prayer: 'Jesus, You looked up at a tree for a man nobody else liked. Look for people I find hard. And when I do wrong, help me put it right, fast. Amen.',
    badge: { name: 'Tree Climb', art: 'tree', note: 'You made things right.' },
    printable: {
      motif: 'tree', title: 'The sycamore tree',
      prompts: ['Colour a big leafy tree and draw Zacchaeus up in it.', 'Draw Jesus pointing up at him.', 'Draw coins falling into a poor box under the tree.'],
      craft: { title: 'Making it right jar', steps: ['Get a clean jar and some buttons or pebbles.', 'Each time you take what is not yours or are unkind, put a pebble in.', 'When you make it right, take a pebble out and put it back.'], note: 'Aim for an empty jar by the end of the week.' }
    }
  });

  D.push({
    id: 'children-come', title: 'Let the Children Come', tier: 'L', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'taught', when: 72, path: 17, xp: 18,
    summary: 'Grown-ups tried to stop children coming to Jesus. Jesus told the grown-ups to move.',
    scripture: [{ ref: 'Mark 10:14', text: 'Allow the little children to come to me! Don’t forbid them, for the Kingdom of God belongs to such as these.' }],
    story: [
      'People brought their babies and little children to Jesus so that He would touch them and pray for them.',
      'The disciples thought Jesus was too important for that. They had a busy day and big questions from clever men, so they told the children to go away.',
      'Jesus was not pleased. Not a little bit. He said, “Let the little children come to me. Don’t stop them — the Kingdom of God belongs to people like them.”',
      'Then He took the children in His arms and blessed them, one by one.',
      'Jesus said that unless you turn back and become like little children you cannot get into God’s Kingdom at all. Not childish — child-like: trusting, honest, quick to forgive, glad to be helped.',
      'So if you are a child reading this: Jesus is not tolerating you. He is insisting on you.'
    ],
    teach: ['Children are not only the future of the church — they are part of it now.', 'Trust like a child, not cleverness, opens God’s Kingdom.', 'Jesus gets cross when people block others from Him.'],
    quiz: [
      { t: 'mc', q: 'What did the disciples do to the children?', a: ['Told them to go away', 'Gave them bread', 'Carried them', 'Ignored Jesus'], c: 0 },
      { t: 'tap', q: 'How did Jesus feel about that?', a: ['Not pleased at all', 'Happy about it', 'He did not notice', 'Tired'], c: 0 },
      { t: 'match', q: 'Match the child-like things Jesus liked.', pairs: [['Trusting', 'Believing what Daddy says'], ['Honest', 'Saying what really happened'], ['Forgiving', 'Not staying cross for long'], ['Needing help', 'Asking, not pretending']], hint: 'Kids do all of these.' },
      { t: 'mc', q: 'Jesus says the Kingdom belongs to…', a: ['People like children', 'Only grown-ups who study', 'The richest people', 'Nobody'], c: 0 }
    ],
    memory: { ref: 'Mark 10:14', text: 'Allow the little children to come to me! Don’t forbid them.' },
    prayer: 'Jesus, thank You for wanting me exactly as I am. I trust You like a child trusts a parent. Hold me. Amen.',
    badge: { name: 'Come Close', art: 'heart', note: 'You came to Jesus on purpose.' },
    printable: {
      motif: 'heart', title: 'Jesus and the children',
      prompts: ['Draw Jesus in the middle with three children around Him.', 'Colour a circle of light around them.', 'Write “Let them come” at the top.'],
      craft: { title: 'Welcome cards', steps: ['Fold paper in half.', 'Inside, draw and write why you are glad God wants children.', 'Give three of them to children you do not usually play with.'], note: 'Great for the class: exchange them and read them out.' }
    }
  });

  D.push({
    id: 'holy-spirit-wind', title: 'The Wind You Can Feel', tier: 'L', mode: 'story',
    track: 'spirit', testament: 'nt', era: 'church', when: 81, path: 18, xp: 20, gentle: true,
    summary: 'Jesus went to heaven and sent the Holy Spirit to live inside His friends.',
    scripture: [{ ref: 'Acts 2:2', text: 'Suddenly there came a sound from the sky, like a violent wind blowing, and it filled the whole house where they were sitting.' },
                { ref: 'John 14:16', text: 'I will pray to the Father, and he will give you another Counselor, that he may be with you forever.' }],
    story: [
      'Before Jesus went up to heaven, He told His friends something that made them feel better: “It is good for you that I go away, because then I can send Someone to be with you forever.”',
      'The friends did not know what that meant. They waited in a room upstairs, about a hundred and twenty of them, praying.',
      'Then a noise came from the sky like a mighty wind rushing through the house. It filled every corner. It blew their hair and shook the shutters — and it was not weather. It was God.',
      'They saw what looked like flames of light settle, one on each head. Not fire that burns — fire that lights up. The Holy Spirit came into them.',
      'Suddenly they were brave. They went outside and told everyone about Jesus in languages they had never learned, and three thousand people decided to follow God that day.',
      'Wind is invisible but you feel it on your face. The Holy Spirit is like that: you cannot see Him, but He makes you braver, kinder and truer every day. He is the part of God that lives in you.'
    ],
    teach: ['The Holy Spirit is God in you, not just around you.', 'He is the same God who came at Jesus’ baptism as a dove.', 'If you trust Jesus, you can have the Spirit too — a gift, not a reward.'],
    quiz: [
      { t: 'mc', q: 'What sound came from the sky?', a: ['A mighty wind', 'A drum', 'Thunder only', 'A song'], c: 0 },
      { t: 'match', q: 'Match the picture of the Spirit to its meaning.', pairs: [['Wind', 'You cannot see it but it moves you'], ['Fire', 'It lights you and warms others'], ['Dove', 'Gentle, no pushing']], hint: 'Three pictures, one Spirit.' },
      { t: 'tap', q: 'Who did Jesus send to be with us forever?', a: ['The Holy Spirit', 'An army', 'A new boat', 'A king'], c: 0 },
      { t: 'order', q: 'Put Pentecost in order.', items: ['Friends wait and pray', 'Wind comes', 'Flame-light rests', 'They tell everyone about Jesus', 'Many become God’s friends'], hint: 'Wait first.' },
      { t: 'mc', q: 'What changed in the friends when the Spirit came?', a: ['They became brave', 'They went to sleep', 'They left town', 'They got angry'], c: 0 }
    ],
    memory: { ref: 'John 14:16', text: 'He will give you another Counselor, that he may be with you forever.' },
    prayer: 'Holy Spirit, like wind, blow through me. Make me brave to tell people about Jesus and kind to everybody. Amen.',
    badge: { name: 'Wind-Filled', art: 'dove', note: 'The Holy Spirit lives in you.' },
    printable: {
      motif: 'dove', title: 'Wind, fire and a dove',
      prompts: ['Colour the dove white and the flames yellow-orange.', 'Draw swirling wind lines all over the room.', 'Draw one face for each friend, all smiling.'],
      craft: { title: 'Pinwheel of the Spirit', steps: ['Cut a square of paper into four triangles from each corner to near the middle.', 'Fold every other point to the centre and pin it onto a straw.', 'Blow on it — invisible air makes it spin, just like the Spirit.'], note: 'Take it outside and run. Wind you cannot see, moving you can see.' }
    }
  });

  D.push({
    id: 'god-my-father', title: 'God Is My Father', tier: 'L', mode: 'lesson',
    track: 'god', testament: 'nt', era: 'church', when: 83, path: 19, xp: 18,
    summary: 'The biggest truth a child can know: the God who made the stars calls you His child.',
    scripture: [{ ref: '1 John 3:1', text: 'Behold what ways of love the Father has given to us, that we should be called children of God!' },
                { ref: 'Romans 8:15', text: 'You received a spirit of adoption as sons, by whom we cry, “Abba, Father!”' }],
    story: [
      'When the first people turned away from God, something broke between people and God. Everybody feels it — like being lost in a crowd, knowing your family is there but not able to reach them.',
      'God’s plan to fix it was Jesus. Jesus came all the way down, lived the life we could not live, and made a way back to God, so anybody who trusts Him can become God’s child. Not a servant — a child.',
      'The Bible uses a family word for God: Abba. It is what a little child says: Daddy. The God who hung the stars wants to be called that by you.',
      'Being God’s child means He owns you, He feeds you, He corrects you because He is not going to give up on you, and nobody can take you out of His house.',
      'You do not become God’s child by being good. You become good because you are already His child, and His Spirit is helping you.'
    ],
    teach: ['Adoption is God’s word for you: chosen on purpose.', 'God corrects children He loves — it is proof you belong.', 'You can pray “Abba” any time, anywhere.'],
    quiz: [
      { t: 'mc', q: 'What does “Abba” mean?', a: ['Daddy', 'Teacher', 'King', 'Sheep'], c: 0 },
      { t: 'match', q: 'Match what being God’s child means.', pairs: [['He owns me', 'Nobody can take me'], ['He feeds me', 'Daily bread'], ['He corrects me', 'Because He loves me'], ['He sent the Spirit', 'To help me be good']], hint: 'Four family gifts.' },
      { t: 'tap', q: 'How do you become God’s child?', a: ['By trusting Jesus', 'By being perfect first', 'By being grown up', 'By working hard'], c: 0 },
      { t: 'mc', q: 'Why does God correct His children?', a: ['Because He loves them and will not give up', 'Because He is grumpy', 'Because He forgot them', 'To be unfair'], c: 0 }
    ],
    memory: { ref: '1 John 3:1', text: 'We should be called children of God!' },
    prayer: 'Abba, thank You for calling me Your child. I am Yours. Teach me to listen to You like a child listens to a dad. Amen.',
    badge: { name: 'Child of God', art: 'house', note: 'You know where you belong.' },
    printable: {
      motif: 'house', title: 'My family in God’s house',
      prompts: ['Draw a big house with light in the middle and you inside.', 'Draw your family in the windows.', 'Write your name under “child of God”.'],
      craft: { title: 'Family name plate', steps: ['Cut your name from card in big letters.', 'Paint it and add “child of God” underneath.', 'Hang it on your door.'], note: 'Every time you go past it, say “Abba”.' }
    }
  });

  D.push({
    id: 'forever-home', title: 'A Forever Home With No Ouchies', tier: 'L', mode: 'story',
    track: 'promise', testament: 'nt', era: 'forever', when: 95, path: 20, xp: 20, gentle: true,
    summary: 'God is making a new world where nothing hurts. The happy ending of the whole Bible.',
    scripture: [{ ref: 'Revelation 21:3', text: 'Behold, the tabernacle of God is with men, and he will dwell with them.' },
                { ref: 'Revelation 21:4', text: 'God will wipe away every tear from their eyes, and there will be more death no more.' }],
    story: [
      'The Bible starts with a garden and it ends with a city. Both of them have God walking in the middle of them.',
      'Jesus said, “In my Father’s house are many rooms. I am going to prepare a place for you.” He is building you a room. It will not have dust in it, or a leaky roof.',
      'John saw a vision of that new world. God lives right there with people. No more sickness, no more ouchies, no more being scared of the dark.',
      'It says God “wipes away every tear”. That means He knows every time you have cried, and He is the one who dries your eyes with His own hand.',
      'There is a tree by the river there, and its leaves are for healing. The gates never shut. Nobody locks you out, and nothing gets in that you should be afraid of.',
      'This is not a fairy tale. It is the next chapter of the Bible. God who made the stars is going to make all things new — and He will make them new for children.'
    ],
    teach: ['Heaven is being with God, everywhere, with a new world around it.', 'No crying there — not because God ignored it, but because He answered it.', 'Nothing bad has the last word.'],
    quiz: [
      { t: 'mc', q: 'What will God do with every tear?', a: ['Wipe them away', 'Count them', 'Keep them in a jar', 'Make more'], c: 0 },
      { t: 'match', q: 'Match what will NOT be in the new world.', pairs: [['Death', 'No more'], ['Tears', 'Wiped away'], ['Pain', 'Gone'], ['Night', 'No more dark']], hint: 'Four things that stop.' },
      { t: 'tap', q: 'The Bible starts with a garden and ends with…', a: ['A city', 'A boat', 'A desert', 'A tent'], c: 0 },
      { t: 'order', q: 'Put God’s big story in order.', items: ['God makes a garden', 'People turn from God', 'Jesus comes and saves', 'God makes all things new'], hint: 'Beginning, middle, end.' },
      { t: 'mc', q: 'Who is building a place for you?', a: ['Jesus', 'Nobody', 'An angel only', 'A king'], c: 0 }
    ],
    memory: { ref: 'Revelation 21:4', text: 'God will wipe away every tear from their eyes.' },
    prayer: 'God, thank You that one day nothing will hurt again. Till then, wipe my tears tonight. I want to come home with You. Amen.',
    badge: { name: 'No More Tears', art: 'city', note: 'You know how the story ends.' },
    printable: {
      motif: 'city', title: 'Draw the forever city',
      prompts: ['Draw a city with open gates and no locks.', 'Draw a river down the middle with a tree on each side.', 'Colour everything bright because there is no night there.'],
      craft: { title: 'No-ouchies card', steps: ['Draw a picture of something you are glad will be gone one day.', 'Write underneath: “God will make it new.”', 'Give it to someone in your family who is not well.'], note: 'An act of kindness that carries the promise.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_2 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
