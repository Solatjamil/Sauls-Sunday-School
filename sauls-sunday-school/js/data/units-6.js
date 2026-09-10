/* =====================================================================
   Curriculum — tier H (Explorers, ages 10-12). Units 11-17.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'one-body', title: 'Different Parts, One Body', tier: 'H', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'church', when: 89, path: 11, xp: 24,
    summary: 'Why Paul compares a church to a stomach, an eye and a foot — and what he is arguing against.',
    scripture: [{ ref: '1 Corinthians 12:27', text: 'You are Christ’s body, and individually members of it.' },
                { ref: 'Romans 12:6', text: 'Having gifts that differ according to the grace that was given to us, let us use them.' }],
    story: [
      'The church in Corinth was gifted and messy at the same time: people speaking in tongues in the wrong order, showing off, and looking down on anyone whose gift was quieter.',
      'Paul does something surprising: he tells them the Spirit distributes gifts “as he wills” — and then stops the comparison. Nobody chose theirs, so nobody has a reason to brag or to sulk.',
      'His picture is a body. The eye cannot say to the hand, “I do not need you.” The foot is not less a part of the body because it is not the head.',
      'Then he lists roles: apostles, prophets, teachers, then miracles, healings, helps, governments, tongues — and asks five rhetorical questions in a row that all expect the same answer: no, not all of us are apostles, are we?',
      'Chapter 13 is not a wedding poem; it is the answer to a fight about spiritual status. Gifts without love are a noisy gong. Then 14:1: “Follow love, and desire spiritual gifts.”',
      'Practically: “helps” and “governments” are listed as Spirit gifts. The one who sets up chairs and the one who organises the rota are not the backup team — they are the gifted ones.',
      'One more thing to notice: gifts are for the profit of all (12:7), not for your résumé. If a gift is making you impressive instead of making others strong, Paul would call that a malfunction.'
    ],
    teach: ['A gift (charisma) is grace-given and service-shaped, not status-shaped.', '“All do not speak with tongues, do they?” is in the Bible and answers a real argument.', 'The body figure is also used in Ephesians 4 for growth: the whole body builds itself up in love.'],
    quiz: [
      { t: 'mc', q: 'What picture does Paul use for the church?', a: ['A body with many parts', 'A building only', 'A ship', 'A family tree'], c: 0 },
      { t: 'match', q: 'Match each phrase to what Paul says about it.', pairs: [['Teachers', 'A gift, listed in 12:28'], ['Helps', 'Also a gift, same verse'], ['Noisy gong', 'A gift with no love'], ['The whole body', 'Builds itself up in love']], hint: 'Four lines from 1 Corinthians.' },
      { t: 'blank', q: 'Gifts are given “as he ____” — so nobody can brag.', a: ['wills'], hint: '1 Corinthians 12:11.' },
      { t: 'sort', q: 'Sort what gifts are for.', buckets: [{ id: 'p', name: 'For the profit of all' }, { id: 'm', name: 'For me' }], items: [{ text: 'Setting up before everyone arrives', b: 'p' }, { text: 'Only gifts people notice', b: 'm' }, { text: 'Teaching the younger group', b: 'p' }, { text: 'Comparing my gift with yours', b: 'm' }] },
      { t: 'mc', q: 'Where does 1 Corinthians 13 belong in the argument?', a: ['It answers their competition about gifts', 'It is a poem for weddings only', 'It is a list of laws', 'It is about baptism'], c: 0 }
    ],
    memory: { ref: '1 Corinthians 12:27', text: 'You are Christ’s body, and individually members of it.' },
    prayer: 'Jesus, I have parts of the body I look down on, sometimes including myself. Put me where You want and make me useful, not impressive. Amen.',
    badge: { name: 'Useful Part', art: 'hands', note: 'You served where you were placed.' },
    printable: {
      motif: 'hands', title: 'Body map',
      prompts: ['Draw a body and label five parts with a real job in your church or class.', 'Write 1 Corinthians 12:7 at the top from memory.', 'Circle the part you would rather not be and write one sentence about why.'],
      craft: { title: 'One-hand challenge', steps: ['Try to tie a shoe, open a crisp packet and write your name with one hand behind your back.', 'Then read 1 Corinthians 12:21.', 'Discuss: which of us is acting like the eye?'], note: 'Five minutes of frustration is the best sermon on this passage.' }
    }
  });

  D.push({
    id: 'job-questions', title: 'Job: When Good People Hurt', tier: 'H', mode: 'lesson',
    track: 'god', testament: 'ot', era: 'kings', when: 47, path: 12, xp: 26, mature: true,
    summary: 'The oldest book in the Bible is about a man who lost his children, and what God said to his friends.',
    scripture: [{ ref: 'Job 1:21', text: 'Yahweh gave, and Yahweh has taken away. Blessed be the name of Yahweh.' },
                { ref: 'Job 42:5', text: 'I have heard of you by the hearing of the ear, but now my eye sees you.' }],
    story: [
      'Job was rich, blameless, and careful to do right — and the Bible says he feared God. Then in one day his oxen and sheep were stolen and his servants killed; then a fire fell from the sky and burnt his flocks; then his own children were killed when the house they were in collapsed.',
      'Fourteen chapters of that happen in two verses. Notice what Job does first: he gets up, tears his robe, shaves his head, worships, and says, “Naked I came out of my mother’s womb. Blessed be the name of Yahweh.” The text says he did not charge God with wrong.',
      'Then his friends come and sit with him for seven days of silence, because his pain was obvious. That was good. Then they start talking — and say three things that are all false: you are being punished for secret sin; God always punishes the wicked and rewards the good right now; if you repent it will be fixed.',
      'Job refuses all three. He is not polite. He demands a hearing with God, and says the famous line, “Though he slay me, yet will I trust him.”',
      'God finally answers out of a storm — and never mentions Satan, or the wager, or Job’s sin. Instead: where were you when I laid the earth’s foundation? Have you commanded the morning? Do you know the laws of the heavens?',
      'Two chapters of questions, and not one of them is “here is your reason”. God answers with Himself, and with what Job cannot see. Job replies, “I have spoken of things I did not understand. My eye sees you.” That is the whole book turning on one verb: seeing.',
      'Then God says the hard sentence about the friends: “You have not spoken of me what is right, as my servant Job has.” Comfort that blames the sufferer is what God calls wrong — and Job prayed for those friends and God accepted him.',
      'This book is here so nobody has to hear “God did this to you because”. Some of what you cannot explain, you are allowed to bring to God in an honest, unpolished way. He was not offended by Job, only by the tidy answers of his friends.'
    ],
    teach: ['Retribution theology — “you must have deserved it” — is the thing God rebukes in this book.', 'The prologue lets us see the heavenly scene that Job never sees: faith can be real proof.', 'God does not owe explanations. He gives presence instead, which is more.'],
    hardNote: 'The death of Job’s children is stated in one sentence, and the book is built around grief rather than around the injury. Say it plainly, and let them be angry about it.',
    quiz: [
      { t: 'mc', q: 'What did Job’s friends get wrong?', a: ['They said his suffering proved hidden sin', 'They sat with him silently', 'They came to see him', 'They read the Bible with him'], c: 0 },
      { t: 'order', q: 'Put the book in order.', items: ['Job loses everything', 'Seven days of silence', 'Three friends argue at him', 'Job demands a hearing', 'God answers in the storm', 'Job says “my eye sees you”', 'Job prays for his friends'], hint: 'Seven movements.' },
      { t: 'blank', q: '“The Lord gave, and the Lord has ______ away.”', a: ['taken'], hint: 'Job 1:21.' },
      { t: 'sort', q: 'Sort a good answer from a bad one in someone else’s pain.', buckets: [{ id: 'g', name: 'Helps' }, { id: 'b', name: 'Hurts' }], items: [{ text: 'Sitting with them for a week', b: 'g' }, { text: '“What did you do?”', b: 'b' }, { text: 'Praying with them, out loud', b: 'g' }, { text: 'Fixing their theology first', b: 'b' }] },
      { t: 'mc', q: 'What does God NOT do in His answer?', a: ['Explain why it happened', 'Ask where Job was at creation', 'Talk about the ostrich and the hippo', 'Describe the heavens'], c: 0 },
      { t: 'match', q: 'Match the verse to the truth.', pairs: [['Job 1:21', 'Worship in loss'], ['Job 13:15', 'Trust when He slays'], ['Job 42:5', 'Seeing beats hearing'], ['Job 42:10', 'Praying for friends']], hint: 'Four turning points.' }
    ],
    memory: { ref: 'Job 42:5', text: 'I have heard of you by the hearing of the ear, but now my eye sees you.' },
    prayer: 'God, I have questions and no answers. I will not pretend I understand. Show me Yourself, and teach me not to be one of the friends.',
    badge: { name: 'Honest Questioner', art: 'kite', note: 'You brought real questions to God.' },
    printable: {
      motif: 'kite', title: 'The friends’ three claims',
      prompts: ['Write the three wrong things the friends said and the verse that corrects each one.', 'Under the line, write what you would say to someone hurting.', 'Draw the storm and the questions God asked.'],
      craft: { title: 'Silence practice', steps: ['Set a timer for five minutes.', 'Sit with somebody and say nothing, then thank them for sitting with you.', 'Read Job 2:13 and talk about why stopping helped.'], note: 'The only comfort that worked in the whole book happened before anyone spoke.' }
    }
  });

  D.push({
    id: 'romans-way', title: 'Just and the Justifier', tier: 'H', mode: 'lesson',
    track: 'jesus', testament: 'nt', era: 'church', when: 90, path: 13, xp: 26,
    summary: 'The most important four verses in the Bible, unpacked one clause at a time.',
    scripture: [{ ref: 'Romans 3:23', text: 'for all have sinned, and fall short of the glory of God;' },
                { ref: 'Romans 3:24', text: 'being justified freely by his grace through the redemption that is in Christ Jesus;' },
                { ref: 'Romans 3:26', text: 'that he might be just and the one who justifies the person who has faith in Jesus.' }],
    story: [
      'Paul builds a case for three chapters and then closes it: Jews and non-Jews are all under sin. “There is none righteous, no, not one.” Not a polite verse. It is meant to end the argument about who is better.',
      'Then verse 23: all have sinned and fall short of the glory of God. “Fall short” is the word for missing a target. The target is not “be decent”; the target is God’s own glory.',
      'Verse 24 turns the whole letter around in six words: being justified freely by his grace. “Justified” is a court word. It does not mean “made guilty but treated kindly”; it means the judge has declared the case closed.',
      'Verse 25 explains how: God displayed Jesus publicly as a propitiation — the covering — by his blood, received through faith. God did not sweep sin under a rug; He dealt with it at the cross, in front of everybody.',
      'And then verse 26, the hinge of history: God is just, and the one who justifies the person who has faith in Jesus. He did not choose one of His attributes and switch the other off. Both won, at His own expense.',
      'So the order matters and it is the opposite of every religion: sinners are not forgiven because they change; they change because they are forgiven. Chapter 8 is the reason: no condemnation now to those in Christ Jesus.',
      'If you ever hear “God had to forgive me because He is love” — that is not the Gospel either. He is love and He is just, and the cross is where both are fully honoured.'
    ],
    teach: ['Justification is a legal verdict, not a feeling.', 'Propitiation and atonement both appear in older translations for the same idea: the covering that turns wrath away.', 'Grace is free to us and cost Him everything.'],
    quiz: [
      { t: 'mc', q: 'What kind of word is “justify”?', a: ['A court word: declared right', 'A feeling word', 'A church-service word', 'A maths word'], c: 0 },
      { t: 'blank', q: 'All have sinned and fall ______ of the glory of God.', a: ['short'], hint: 'Romans 3:23.' },
      { t: 'order', q: 'Put Paul’s argument in order.', items: ['Everyone is under sin', 'All fall short', 'Justified freely by grace', 'Jesus shown as the covering', 'God is just and the justifier', 'No condemnation in Christ'], hint: 'Bad news, then the best news.' },
      { t: 'sort', q: 'Sort the two orders.', buckets: [{ id: 'g', name: 'Biblical order' }, { id: 'w', name: 'Wrong order' }], items: [{ text: 'Forgiven, therefore I change', b: 'g' }, { text: 'I change, therefore I am forgiven', b: 'w' }, { text: 'Faith first, then fruit', b: 'g' }, { text: 'Fruit earns faith', b: 'w' }] },
      { t: 'match', q: 'Match the verse to the point.', pairs: [['3:23', 'The problem'], ['3:24', 'Free'], ['3:25', 'His blood, public'], ['3:26', 'Just and justifier']], hint: 'Four verses, four jobs.' }
    ],
    memory: { ref: 'Romans 3:23-24', text: 'All have sinned… being justified freely by his grace.' },
    prayer: 'God, I cannot earn a verdict and I do not want one. Thank You that the case is closed and You still call me right. Make me change, the way You said. Amen.',
    badge: { name: 'Case Closed', art: 'scroll', note: 'You know the order of grace.' },
    printable: {
      motif: 'scroll', title: 'Romans 3:21-26 in your own words',
      prompts: ['Rewrite the six verses as a paragraph a nine-year-old could follow.', 'Underline every word that is about a courtroom.', 'Circle every word that is about a price being paid.'],
      craft: { title: 'The debt card', steps: ['Write Romans 3:23 on one side of a card and "unpayable" underneath.', 'Write 3:24 on the other side and "free" underneath.', 'Keep it in your Bible all month.'], note: 'Both halves or neither half.' }
    }
  });

  D.push({
    id: 'ends-of-earth', title: 'To the Ends of the Earth', tier: 'H', mode: 'story',
    track: 'church', testament: 'nt', era: 'church', when: 91, path: 14, xp: 24,
    summary: 'One verse is the table of contents for the whole book of Acts — and for your own map.',
    scripture: [{ ref: 'Acts 1:8', text: 'But you will receive power when the Holy Spirit has come on you, and you will be my witnesses in Jerusalem, in all Judea, in Samaria, and to the end of the earth.' }],
    story: [
      'The disciples asked Jesus a final, very Israeli question: is this the time you restore the kingdom to Israel? He answered by changing the map, not the calendar.',
      '“It is not for you to know times or seasons the Father has set by his own authority. But you will receive power.” The verse is a rebuke and a gift welded together.',
      'Four circles, starting at home: Jerusalem, then all Judea, then Samaria, then the end of the earth. The middle one is the awkward one — Samaritans were people the disciples had been taught to avoid.',
      'Acts follows that outline exactly: the church in Jerusalem, then scattered by persecution, then Philip in Samaria, then Peter, then Paul travelling to Rome carrying the gospel into the empire.',
      'Paul wrote that he tried to go further and further west, and that he was a servant to everybody: “I have become all things to all people, that by all means I might save some.” Not changing the message — changing the method.',
      'Three missionary journeys, about 3,400 kilometres on foot and by sea, several shipwrecks (one, in Malta, in Acts 27-28), a snake bite he shrugged off, a jail cell where he sang at midnight, and letters written from chains.',
      'So the circle that reaches you is not a coincidence. Someone heard it in Jerusalem, then Judea, then Samaria, then a ship, then a road, then your country, then your street. And the book stops with Paul in Rome under guard “boldly, and hindrance-free” — because the last circle is still open. It ends with you.'
    ],
    teach: ['Acts 1:8 is the outline of Acts and the plan for missions.', 'Culture-crossing is not optional in the New Testament; it is the method Paul used deliberately.', 'Persecution in Acts spreads the gospel rather than stopping it (Acts 8:1-4).'],
    quiz: [
      { t: 'order', q: 'Put the four circles of Acts 1:8 in order.', items: ['Jerusalem', 'Judea', 'Samaria', 'The end of the earth'], hint: 'Home, nearby, awkward, far.' },
      { t: 'match', q: 'Match the Acts event to the chapter.', pairs: [['The Ethiopian servant', 'Acts 8'], ['Cornelius', 'Acts 10'], ['Paul in Athens', 'Acts 17'], ['Shipwreck at Malta', 'Acts 27']], hint: 'Four journeys.' },
      { t: 'blank', q: 'Paul wrote: I have become ______ things to all people (1 Cor 9:22).', a: ['all'], hint: 'Method, not message.' },
      { t: 'mc', q: 'What did Jesus do with their question about times and seasons?', a: ['Said it was not theirs to know', 'Gave them a date', 'Ignored the question', 'Told them to wait ten years'], c: 0 },
      { t: 'sort', q: 'Sort what Paul changed and what he kept.', buckets: [{ id: 'c', name: 'Changed' }, { id: 'k', name: 'Kept' }], items: [{ text: 'How he spoke to each audience', b: 'c' }, { text: 'The message: Jesus is Lord', b: 'k' }, { text: 'Where he travelled next', b: 'c' }, { text: 'That grace is free', b: 'k' }] }
    ],
    memory: { ref: 'Acts 1:8', text: 'You will be my witnesses… to the end of the earth.' },
    prayer: 'Lord, the map starts at home. Give me one circle I have been avoiding, and the power to speak in it. Amen.',
    badge: { name: 'Fourth Circle', art: 'boat', note: 'You prayed past your own street.' },
    printable: {
      motif: 'boat', title: 'Draw the four circles',
      prompts: ['Draw four rings out from your own town. Label the awkward one.', 'Find one country per ring and write its name and a prayer.', 'Colour the whole map the direction the gospel travelled.'],
      craft: { title: 'Paul’s journey map', steps: ['Print or draw a Mediterranean map.', 'Trace one of Paul’s journeys with wool and glue.', 'Label three cities and one danger.'], note: 'Put it on your wall and read Acts alongside it for a week.' }
    }
  });

  D.push({
    id: 'armor-of-god', title: 'The Full Suit', tier: 'H', mode: 'lesson',
    track: 'bible', testament: 'nt', era: 'church', when: 92, path: 15, xp: 24,
    summary: 'Roman soldiers, Old Testament verses, and a fight you are not the recruiter for.',
    scripture: [{ ref: 'Ephesians 6:11', text: 'Put on the full armour of God, that you are able to stand against the wiles of the Devil.' },
                { ref: 'Ephesians 6:18', text: 'Praying at all times in the Spirit, with all prayer and supplication.' }],
    story: [
      'Paul wrote this from house arrest, with a Roman soldier chained to him — probably a real source of the picture. He had also been beaten and shipwrecked, so this is not theory for him.',
      'He says the fight is not against people. “We do not wrestle against flesh and blood.” That is a hard sentence to obey and a very important one. Nobody in your school is the enemy.',
      'Six pieces and one weapon, and most of them are quotations from Isaiah: the belt of truth, the breastplate of righteousness, shoes of the gospel of peace, the shield of faith, the helmet of salvation, the sword of the Spirit which is God’s word.',
      'Notice they are mostly defensive: armour is for standing, not for chasing. Twice Paul says “stand”, once “hold your ground”. The Christian life is often about not being moved.',
      'Then the part everybody forgets: “praying at all times in the Spirit, with all prayer and supplication, and watching with all perseverance.” Without that line, the suit is an armour display in a museum.',
      'One more: verse 20 — “that I may make it plain”. He asks for prayer so he can speak boldly. If Paul needed that, so do you.',
      'This is why Isaiah 59:17 has God Himself wearing righteousness as a breastplate and zeal as a helmet. Paul is saying: put on what God is wearing. You cannot survive it on your own wardrobe.'
    ],
    teach: ['“Wiles” means schemes, not a horned monster: the attack is usually a slow reasoning, not a dramatic one.', 'The only offensive piece is the word of God, and Jesus used it in the desert.', 'Isaiah supplies most of the images, so this is an Old Testament chapter wearing Roman gear.'],
    quiz: [
      { t: 'match', q: 'Match the piece to what it guards.', pairs: [['Belt of truth', 'What holds it together'], ['Breastplate', 'Heart'], ['Helmet', 'Head and thinking'], ['Shield of faith', 'Flaming arrows']], hint: 'Four pieces, four jobs.' },
      { t: 'blank', q: 'We do not wrestle against flesh and ______.', a: ['blood'], hint: 'Ephesians 6:12.' },
      { t: 'order', q: 'Put the suit on in Paul’s order.', items: ['Belt of truth', 'Breastplate of righteousness', 'Shoes of peace', 'Shield of faith', 'Helmet of salvation', 'Sword of the Spirit'], hint: 'Waist to head, then the sword.' },
      { t: 'mc', q: 'What is the sword of the Spirit?', a: ['The word of God', 'Prayer', 'The church', 'Faith'], c: 0 },
      { t: 'sort', q: 'Sort what this passage says about the fight.', buckets: [{ id: 'y', name: 'It says' }, { id: 'n', name: 'It does not say' }], items: [{ text: 'Stand, do not be moved', b: 'y' }, { text: 'Go hunting for enemies', b: 'n' }, { text: 'People are not the enemy', b: 'y' }, { text: 'Pray less and argue more', b: 'n' }] }
    ],
    memory: { ref: 'Ephesians 6:11', text: 'Put on the full armour of God.' },
    prayer: 'God, dress me. Belt my honesty, guard my heart, steady my thinking, and put Your word in my mouth. Let me stand today, that is enough. Amen.',
    badge: { name: 'Standing Firm', art: 'shield', note: 'You put the suit on on purpose.' },
    printable: {
      motif: 'shield', title: 'Six pieces, six verses',
      prompts: ['Draw a soldier and label the six pieces from Ephesians 6.', 'Under each label, write the Isaiah or desert-Jesus link.', 'Colour only the pieces that are quotations from Isaiah.'],
      craft: { title: 'Shield card', steps: ['Cut a shield shape from card.', 'Write Ephesians 6:11 on the front and one memory verse on the back.', 'Tape it inside a locker or a bag where you will touch it daily.'], note: 'A thing to hold while you pray is not magic — it is a reminder, which is what the whole passage is.' }
    }
  });

  D.push({
    id: 'new-creation', title: 'Judgment and a New World', tier: 'H', mode: 'story',
    track: 'promise', testament: 'nt', era: 'forever', when: 96, path: 16, xp: 26, mature: true,
    summary: 'Revelation is not a code to crack. It is news: evil gets judged, and God moves in next door.',
    scripture: [{ ref: 'Revelation 21:5', text: 'He who sits on the throne said, “Behold, I am making all things new.”' },
                { ref: 'Revelation 22:17', text: 'The Spirit and the bride say, “Come!” He who hears, let him say, “Come!”' }],
    story: [
      'Revelation was written to real churches being pressured to bow to Rome, in a language of images that they could read and the censor could not. It is not a newspaper for the year 2000.',
      'Its argument: God is on the throne (chapters 4-5), the Lamb has already won by being slain, and history is moving somewhere. The seals, trumpets and bowls are not a schedule; they are the same judgment seen from three angles, getting closer.',
      'Yes, there is real judgment in this book. Babylon the great — the world system that gets rich by trading people (Rev 18:13 names slave trading) — falls. Those who keep saying “no” to God get exactly what they asked for, permanently. That is what hell is in Revelation’s own terms: the city without God, and nobody is forced into it.',
      'Then the strangest, best verse: a new heaven and a new earth. Not people floating away; the holy city coming down (21:2). God moves in, and the temple disappears because nothing is between us any more.',
      'Verse 4 is the answer to the whole Bible’s grief: no death, no sorrow, no crying, no pain. The first things are past.',
      'There is a river of life and a tree of leaves “for the healing of the nations”. Revelation ends the way Genesis began, with a tree and a river and God walking with people — only this time the gates are never shut, and nobody is locked out.',
      'Then the last three invitations in the Bible: “Come.” The Spirit says come, the bride says come, and whoever is thirsty may take the water of life for free. The book that some people use to scare children ends as an open door with a free drink on the other side.'
    ],
    teach: ['Genre matters: apocalypse uses symbols to tell the truth, not to hide it.', 'Judgment in Revelation is God answering prayer, not losing temper (compare 6:10 with 16:5-7).', 'The New Testament ends with an invitation, not a threat.'],
    hardNote: 'Judgment and hell are stated, framed by Revelation’s own logic (the second death is what rejection of God becomes), and always next to 21:4. Never assign it to a named person.',
    quiz: [
      { t: 'mc', q: 'Who is Revelation written to first?', a: ['Seven real churches under pressure', 'People in the year 2000', 'Only Jews', 'One man, privately'], c: 0 },
      { t: 'blank', q: '“Behold, I am making all things ______.”', a: ['new'], hint: 'Revelation 21:5.' },
      { t: 'order', q: 'Put the last chapters in order.', items: ['Babylon falls', 'A new heaven and earth', 'The city comes down', 'No more tears', 'The river and the tree', '“Come!”'], hint: 'Fall, then come down, then come.' },
      { t: 'sort', q: 'Sort what Revelation does and does not do.', buckets: [{ id: 'y', name: 'It does' }, { id: 'n', name: 'Not it' }], items: [{ text: 'Promise that evil is judged', b: 'y' }, { text: 'Give a date for the end', b: 'n' }, { text: 'Comfort people who are suffering', b: 'y' }, { text: 'List famous people to be afraid of', b: 'n' }] },
      { t: 'mc', q: 'In Revelation, what is the last word?', a: ['An invitation to come and drink', 'A warning', 'A number', 'A silence'], c: 0 },
      { t: 'match', q: 'Match the picture to its meaning.', pairs: [['Babylon', 'The world system that trades people'], ['New Jerusalem', 'God living with people'], ['Lamb', 'Jesus who was slain and is on the throne'], ['Six hundred sixty six', 'The number of a name that mimics God']], hint: 'Four symbols.' }
    ],
    memory: { ref: 'Revelation 21:5', text: 'Behold, I am making all things new.' },
    prayer: 'Come, Lord Jesus. Make all things new — starting with me. I want the city with the open gates, and I want to say “come” to somebody else this week. Amen.',
    badge: { name: 'Open Gates', art: 'city', note: 'You read the last book rightly.' },
    printable: {
      motif: 'city', title: 'Genesis and Revelation, side by side',
      prompts: ['Two columns: what is in the garden at the start / what is in the city at the end.', 'Draw the tree and the river twice.', 'Write the sentence that says which one is bigger.'],
      craft: { title: 'Invitation card', steps: ['Copy Revelation 22:17 neatly on card.', 'Add one sentence about why you drink when you are thirsty.', 'Give it to someone at school who does not come to church.'], note: 'The book ends with “come”, so your card should too.' }
    }
  });

  D.push({
    id: 'spirit-and-truth', title: 'Worship in Spirit and Truth', tier: 'H', mode: 'lesson',
    track: 'prayer', testament: 'nt', era: 'taught', when: 73, path: 17, xp: 24,
    summary: 'The conversation that gave this app’s parent site its name — Jesus, a well, and what God is looking for.',
    scripture: [{ ref: 'John 4:23', text: 'The true worshipers will worship the Father in spirit and truth, for the Father seeks such people to be his worshipers.' },
                { ref: 'John 4:24', text: 'God is a Spirit, and those who worship him must worship in spirit and truth.' }],
    story: [
      'Jesus sat tired at Jacob’s well at noon, and asked a Samaritan woman for a drink. It was a shocking request twice over: Jews and Samaritans did not share vessels, and a rabbi did not talk to that kind of woman in public.',
      'She tried to change the subject to the big argument of the day: where is the right place to worship — this mountain or Jerusalem? (They had been arguing about it for eight hundred years.)',
      'Jesus answered that the argument was over. “You worship what you do not know. We know what we worship, for salvation is of the Jews.” And then the sentence that matters: a hour is coming, and now is, when the true worshipers will worship the Father in spirit and truth.',
      'Not “at the right mountain”. Not “with the right song list”. In spirit — from the inside, real, not performed; and in truth — matching who God actually is, not who we would like Him to be.',
      'Because “God is a Spirit”, the place does not make it. A building can hold a crowd; only truth and a heart can hold God. That is why He says the Father seeks such worshipers. The Almighty is in the market for something.',
      'Two halves, and both are needed. Spirit without truth becomes emotion that drifts. Truth without spirit becomes correct doctrine that nobody wants to sit near.',
      'The woman left her water jar — a real detail, in the text — and ran into the town to tell everybody. That is what worship that is true does: it cannot keep quiet about it. And a whole Samaritan town believed, not because of her story, but because they had met Him themselves.'
    ],
    teach: ['Worship is a posture, not a genre; music is its servant, not its definition.', '“Seeking worshipers” is one of the most astonishing things Jesus ever said about God.', 'John 4 shows Jesus deliberately crossing race, gender and reputation lines — that is part of the point.'],
    quiz: [
      { t: 'mc', q: 'What two words does Jesus give for true worship?', a: ['Spirit and truth', 'Voice and song', 'Hands and knees', 'Mountain and temple'], c: 0 },
      { t: 'blank', q: 'Jesus said God is seeking such ______.', a: ['worshipers', 'worshippers', 'worshipper'], hint: 'John 4:23.' },
      { t: 'match', q: 'Match the detail to what it shows.', pairs: [['At noon, alone', 'She was avoiding the town'], ['“Give me a drink”', 'Jesus crossed a race line'], ['Left her water jar', 'Nothing else mattered'], ['The town believed', 'They met Him themselves']], hint: 'Four details from John 4.' },
      { t: 'sort', q: 'Sort worship from performance.', buckets: [{ id: 'w', name: 'Worship' }, { id: 'p', name: 'Performance' }], items: [{ text: 'Singing when nobody is watching', b: 'w' }, { text: 'Doing the right words for the wrong audience', b: 'p' }, { text: 'Telling God the truth about how you feel', b: 'w' }, { text: 'Only worshipping when you feel like it', b: 'p' }] },
      { t: 'mc', q: 'What does worship “in truth” protect us from?', a: ['Drifting into liking a god we invented', 'Singing too quietly', 'Asking questions', 'Praying too long'], c: 0 }
    ],
    memory: { ref: 'John 4:24', text: 'God is a Spirit, and those who worship him must worship in spirit and truth.' },
    prayer: 'Father, search my worship. Take the performance and leave the truth. I want to be one of the ones You are looking for. Amen.',
    badge: { name: 'Seeker Found', art: 'well', note: 'You worshipped on purpose.' },
    printable: {
      motif: 'well', title: 'The woman at the well worksheet',
      prompts: ['Write the six things Jesus said in John 4 that surprised her.', 'Under the last one, answer: what makes worship true?', 'Draw the water jar left on the rock.'],
      craft: { title: 'Two-column worship note', steps: ['Fold a page: left “spirit”, right “truth”.', 'Under spirit write where your worship is real on the inside.', 'Under truth write one thing about God you need to correct.', 'Pray both columns out loud tonight.'], note: 'This is the practice that keeps worship from drifting either way.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_6 = D;
})(typeof window !== 'undefined' ? window : globalThis);
