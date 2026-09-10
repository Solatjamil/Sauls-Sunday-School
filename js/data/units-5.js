/* =====================================================================
   Curriculum — tier H (Explorers, ages 10-12). Units 1-17.
   This tier carries the hard material honestly: the cross, judgment,
   suffering, and questions. Each unit has an adult talking-point.
   ===================================================================== */
(function (root) {
  'use strict';
  var D = [];

  D.push({
    id: 'how-we-got-bible', title: 'How the Bible Got Here', tier: 'H', mode: 'lesson',
    track: 'bible', testament: 'ot', era: 'waiting', when: 56, path: 1, xp: 26,
    summary: 'Forty writers, three languages, a thousand years of copying — and not one good argument that it evaporated on the way.',
    scripture: [{ ref: '2 Timothy 3:16', text: 'Every Scripture is given by inspiration of God, and is profitable for teaching, for reproof, for correction, and for instruction in righteousness.' },
                { ref: 'Isaiah 40:8', text: 'The grass withers, the flower fades, but the word of our God stands forever.' }],
    story: [
      'The Bible is not one book; it is a library of sixty-six, written by kings, fishermen, a doctor, a shepherd, a tax collector and a farmer, in Hebrew, Aramaic and Greek, over roughly a thousand years.',
      'The Old Testament was copied by scribes with frightening care: they counted letters, never wrote from memory, and buried any scroll that had a mistake rather than recycle it. When scholars found the Dead Sea Scrolls, a copy of Isaiah about a thousand years older than anything they had, the text matched almost word for word.',
      'Nobody voted a book into the Bible because it was convenient. The church recognised books that already had the marks: written by an apostle or an apostle’s close friend, used everywhere, consistent with the rest, and powerful.',
      'The four hundred years between Malachi and Jesus were not silent, they were waiting. Synagogues spread, the Scriptures were translated into Greek so anyone could read them, and roads were built — all of it making a way for news to travel fast.',
      'So "inspired" does not mean the writers were typewriters. God did not dictate thirty-nine books in a monotone; each writer wrote in their own voice and their own Hebrew or Greek — and it is still exactly what God wanted said.',
      'You can test this. Read it. Ask questions. Doubt out loud in church. The Bible never asks you to stop thinking; it asks you to think about the right evidence.'
    ],
    teach: ['Canon means "measuring stick" — the list of books recognised as God-breathed.', 'Apocrypha: good reading, not Scripture, in most Protestant Bibles — 73 vs 66 books.', 'The Greek translation of the Old Testament is called the Septuagint (LXX).'],
    quiz: [
      { t: 'mc', q: 'How many books in the Protestant Bible?', a: ['66', '39', '73', '27'], c: 0 },
      { t: 'order', q: 'Put the Bible’s journey in order.', items: ['Written by prophets and apostles', 'Copied by scribes', 'Recognised as canon', 'Translated into Greek, then Latin, then English', 'Printed with a press'], hint: 'Write, copy, recognise, translate, print.' },
      { t: 'blank', q: 'The Dead Sea Scrolls included a whole copy of the book of ______.', a: ['isaiah'], hint: 'The long prophet.' },
      { t: 'match', q: 'Match the term to its meaning.', pairs: [['Canon', 'The recognised list of books'], ['Inspired', 'God-breathed'], ['Septuagint', 'Greek Old Testament'], ['Scribe', 'Professional copier']], hint: 'Four words you should own.' },
      { t: 'sort', q: 'True or false about how the Bible came to us.', buckets: [{ id: 't', name: 'True' }, { id: 'f', name: 'False' }], items: [{ text: 'It was written in three languages', b: 't' }, { text: 'One king compiled it in one year', b: 'f' }, { text: 'Scribes counted letters to guard the text', b: 't' }, { text: 'Every single church copy disagreed wildly', b: 'f' }] }
    ],
    memory: { ref: 'Isaiah 40:8', text: 'The grass withers, the flower fades, but the word of our God stands forever.' },
    prayer: 'God, You did not leave Your words to chance. Give me the habit of reading, not just believing what I was told. Amen.',
    badge: { name: 'Text Guardian', art: 'scroll', note: 'You know why the Bible can be trusted.' },
    printable: {
      motif: 'scroll', title: 'Sixty-six books in three minutes',
      prompts: ['Label the Old Testament (39) and New Testament (27).', 'Circle the five books you have read and put a star next to the five you want to.', 'Write one question you would ask a scribe.'],
      craft: { title: 'Copy a verse like a scribe', steps: ['Copy a psalm in your neatest writing, letter by letter.', 'Count the letters and compare with a partner.', 'If one of you made a mistake, decide what a scribe would have done with it.'], note: 'Then talk about why they buried bad copies.' }
    }
  });

  D.push({
    id: 'trinity', title: 'One God, Three Who Are He', tier: 'H', mode: 'lesson',
    track: 'god', testament: 'nt', era: 'born', when: 60, path: 2, xp: 26,
    summary: 'Not three gods. Not one God in three costumes. The hardest, most beautiful word in Christianity.',
    scripture: [{ ref: 'Matthew 28:19', text: 'Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' },
                { ref: '2 Corinthians 13:14', text: 'The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit, be with you all.' }],
    story: [
      'Israel’s first confession is from Deuteronomy 6:4: “Hear, Israel: Yahweh our God, Yahweh is one.” Jews still say it twice a day. Christianity never replaced that verse. It explained it.',
      'Then the New Testament does something strange. The Father is God. Jesus is called God and receives worship and nobody corrects it. The Spirit speaks, decides, grieves — and lying to the Spirit is lying to God.',
      'So Christians say: one what, three who. Not three gods (that is polytheism, and the Bible forbids it). Not one God wearing three masks (that was an early heresy called modalism). The Father is not the Son; the Son is not the Spirit; each is fully God; there is one God.',
      'Look at the baptism of Jesus: the Son in the water, the Spirit as a dove, the Father’s voice. Three, at once, in one scene.',
      'Jesus says the Father is greater in role and equal in being. He never sinned, but He learned obedience as a human. That is the two-natures idea: fully God, fully man, one person.',
      'Here is an honest thing to teach rather than hide: analogies all break. Water as ice, liquid and steam is modalism; a family of three persons is three gods. The Bible does not give us a diagram; it gives us a fact to stand in. God is one, and He is three, and He has been loving Himself forever — and He invited us in.'
    ],
    teach: ['The word "Trinity" is not in the Bible; the teaching is. Same for "incarnation".', 'Baptism is done into the singular "name" of Father, Son and Holy Spirit — one name, three.', 'God is love (1 John 4:8) works only if love was always happening inside God.'],
    quiz: [
      { t: 'mc', q: 'Which heresy says God is one person in three costumes?', a: ['Modalism', 'Polytheism', 'Arianism', 'Adoptionism'], c: 0 },
      { t: 'blank', q: 'Deuteronomy 6:4 says Yahweh our God, Yahweh is ______.', a: ['one'], hint: 'The Shema.' },
      { t: 'match', q: 'Match the scene to what it shows.', pairs: [['Jesus’ baptism', 'Three at once'], ['Creation: “Let us make man”', 'Plural in the One'], ['The upper room', 'Spirit sent by Father and Son'], ['Thomas: “My Lord and my God!”', 'Jesus is worshiped']], hint: 'Four texts, one God.' },
      { t: 'sort', q: 'Sort true and false about the Trinity.', buckets: [{ id: 't', name: 'What we believe' }, { id: 'f', name: 'Not Christian belief' }], items: [{ text: 'One God in three persons', b: 't' }, { text: 'Three gods who agree', b: 'f' }, { text: 'The Son is not the Father', b: 't' }, { text: 'The Spirit is a power, not a person', b: 'f' }] },
      { t: 'mc', q: 'At Jesus’ baptism, which member was in the water?', a: ['The Son', 'The Father', 'The Spirit', 'All three physically'], c: 0 }
    ],
    memory: { ref: 'Matthew 28:19', text: 'Baptizing them in the name of the Father and of the Son and of the Holy Spirit.' },
    prayer: 'Father, Son and Spirit — You have never been alone, and You made room for me. Glory to the three who are He. Amen.',
    badge: { name: 'One and Three', art: 'stones', note: 'You can say the hardest doctrine simply.' },
    printable: {
      motif: 'stones', title: 'Three texts, one God',
      prompts: ['Find and write down one verse for each: Father is God, Jesus is God, Spirit is a person.', 'Under each, note what it proves.', 'Cross out your two favourite bad analogies and explain why they break.'],
      craft: { title: 'The broken diagram', steps: ['Fold paper into three panels.', 'Draw three attempts to explain the Trinity.', 'Under each one, write where it goes wrong.', 'Finish with the sentence: “The Bible gives us a fact to stand in.”'], note: 'Great for a class — everyone brings a different failed diagram.' }
    }
  });

  D.push({
    id: 'david-goliath', title: 'David and Goliath: the Whole Chapter', tier: 'H', mode: 'story',
    track: 'promise', testament: 'ot', era: 'kings', when: 37, path: 3, xp: 24, mature: true,
    summary: 'Read 1 Samuel 17 properly: it is not a story about a brave boy. It is about a man who knew who was standing behind the giant.',
    scripture: [{ ref: '1 Samuel 17:45', text: 'You come to me with sword, spear, and javelin, but I come to you in the name of Yahweh of Armies, the God of the armies of Israel, whom you have defied.' },
                { ref: '1 Samuel 17:47', text: 'for the battle is Yahweh’s, and he will give you into our hand.' }],
    story: [
      'Two armies sat on opposite ridges with a valley between them, and for forty days a nine-foot man from Gath came out twice a day and insulted the ranks of Israel. Forty days. Nobody moved.',
      'David was not a soldier. He was a delivery boy: his father sent him with roasted grain and ten loaves to his brothers, and cheese for their commander.',
      'He heard the insult and — this is the part kids’ versions skip — he asked about the reward, and his older brother Eliab got angry at him for showing up at all. Even David’s family thought he was out of place.',
      'He was brought to Saul, who was a head taller than everyone else and still terrified. David said: this lion and this bear I drove off from my father’s flock, Yahweh will deliver me from this Philistine too.',
      'Saul put his own armour on David. David could not walk in it. “I have not tested these,” he said, and took it off — an important verse for anyone copying somebody else’s Christian life.',
      'He chose five smooth stones from the brook, took his shepherd’s bag and staff, and walked into the valley. Goliath cursed him by his gods. David answered with verse 45 and 47: you come with a sword; I come in the name of Yahweh of Armies.',
      'One stone, one sling, one hit to the forehead. The giant fell face-down. David took the Philistine’s own sword and cut off his head — that is in the text, and it belongs in the real story, because it is how ancient war worked and because the chapter is about defilement ending, not about childhood.',
      'Then Israel chased the fleeing army and won. And David, who just killed the biggest man alive, went back to sheep. He did not chase fame. Later Saul made him a commander — and the women sang “Saul has struck his thousands, David his ten thousands”, which started a new and much worse giant in Saul’s heart.'
    ],
    teach: ['The battle is Yahweh’s — verse 47 is the point, not the sling.', 'David fought from what God had already tested him in (lions, bears).', 'The same chapter that shows courage shows a national insult to God, and how God answers it.'],
    hardNote: 'The beheading is stated plainly, not graphically, and framed by verse 47. Parents get a note: this is not a violence story, it is a "who defends God’s name" story.',
    quiz: [
      { t: 'mc', q: 'How long did Goliath taunt Israel before anyone fought?', a: ['Forty days', 'Seven days', 'One day', 'Three years'], c: 0 },
      { t: 'order', q: 'Put 1 Samuel 17 in order.', items: ['Two armies on the ridges', 'Goliath insults Israel twice a day', 'David arrives with food', 'Eliab snaps at him', 'David tells Saul about the lion and bear', 'Saul’s armour does not fit', 'Five stones from the brook', 'One stone, and the giant falls'], hint: 'Eight steps.' },
      { t: 'blank', q: '“You come to me with sword, spear and javelin, but I come to you in the ______ of Yahweh of Armies.”', a: ['name'], hint: 'Verse 45.' },
      { t: 'match', q: 'Match the detail to the lesson.', pairs: [['Could not walk in Saul’s armour', 'Do not copy someone else’s life'], ['Lion and bear first', 'Faith is trained in private'], ['Sang a song and went back to sheep', 'Do not chase fame'], ['Saul’s jealousy after the song', 'A worse giant in the heart']], hint: 'Four applications.' },
      { t: 'mc', q: 'Why did David take five stones if one was enough?', a: ['The text does not say; he may have expected more than one Philistine', 'It was required by law', 'He dropped four', 'To look like a soldier'], c: 0 }
    ],
    memory: { ref: '1 Samuel 17:47', text: 'The battle is Yahweh’s.' },
    prayer: 'God, the battle is Yours, not mine. Give David’s aim with the thing I actually have: my own small skills, one sling, no borrowed armour. Amen.',
    badge: { name: 'Five Stones', art: 'stones', note: 'You fought a real giant.' },
    printable: {
      motif: 'sling', title: 'Verse 45 comparison sheet',
      prompts: ['Two columns: what Goliath brought / what David brought.', 'Under each, write what it really means.', 'Draw the valley with the two ridges and label the numbers (40 days, 5 stones).'],
      craft: { title: 'The armour that did not fit', steps: ['Find an item of clothing much too big and try to walk in it.', 'Time it. Then walk normally.', 'Read 1 Samuel 17:38-39 and write one thing you are trying to copy that is not yours.'], note: 'Kinesthetic lesson — best done laughing.' }
    }
  });

  D.push({
    id: 'habakkuk', title: 'Habakkuk: When God Is Quiet', tier: 'H', mode: 'lesson',
    track: 'prayer', testament: 'ot', era: 'prophets', when: 44, path: 4, xp: 24, mature: true,
    hardNote: 'The book names violence and injustice out loud, chapter two is a list of five “woes”, and chapter three pictures God marching in judgement. Nobody is hurt on the page — the hard part is the question. Stay with verse two: the Bible lets a believer say “how long?” and calls it faith.',
    summary: 'A whole Bible book that is one long complaint — and how it ends with joy anyway.',
    scripture: [{ ref: 'Habakkuk 1:2', text: 'How long, Yahweh, will I cry for help, and you will not hear?' },
                { ref: 'Habakkuk 3:18', text: 'Yet I will rejoice in Yahweh. I will joy in the God of my salvation.' }],
    story: [
      'Most prophets say, “Thus says the Lord to the people.” Habakkuk is the other way round: a man who says, “Thus says Habakkuk to the Lord.” Two chapters of it are a complaint, and God let it stay in the Bible.',
      'He starts with verse two: how long? Violence, injustice, and the law relaxed while the wicked swallow the more righteous. God answers something worse than silence: “I am raising up the Babylonians.”',
      'So Habakkuk complains again — you are too pure to look at evil, and You are quiet while a nation swallows nations? That is the honest second question, and it is still in the book.',
      'God’s answer has five “woes” against Babylon and one line that ends the argument: the just one will live by his faith. The proud are not upright in themselves; the righteous live by trust.',
      'Then the prophet climbs onto a tower and waits. Chapter three is a psalm: God marching from Teman, glory covering the heavens, mountains melting. He remembers what God did at the Red Sea and says the verse that made a nation of readers hold on.',
      '“Though the fig tree does not blossom and there is no fruit on the vines, though the olive field fails and the fields produce no food, the flock is cut off from the fold — yet I will rejoice in Yahweh.” Faith is not a feeling when the farm is fine. It is a decision when the farm is gone.',
      'Habakkuk never gets an explanation for why Babylon. He gets God. That is, in the book’s own view, enough — and it is the deepest thing in the Old Testament about suffering.'
    ],
    teach: ['Lament is a biblical genre — a third of the psalms are sad ones.', '“The just shall live by his faith” is quoted three times in the New Testament (Rom 1:17, Gal 3:11, Heb 10:38).', 'God answers honest questions, even when the answer is not the answer expected.'],
    quiz: [
      { t: 'mc', q: 'How does the book of Habakkuk begin?', a: ['With a complaint to God', 'With a command to the king', 'With a song of praise', 'With a list of laws'], c: 0 },
      { t: 'order', q: 'Put the argument in order.', items: ['“How long, Yahweh?”', 'God says He is raising Babylon', '“Why do You look on the treacherous?”', 'Five woes against the proud', 'God marches in glory', '“Yet I will rejoice”'], hint: 'Complain, answer, complain, woe, vision, praise.' },
      { t: 'blank', q: 'The just one shall live by his ______.', a: ['faith', 'faithfulness'], hint: 'Habakkuk 2:4.' },
      { t: 'match', q: 'Match the New Testament book that quotes Habakkuk 2:4.', pairs: [['Romans', 'The just shall live by faith'], ['Galatians', 'No one is justified by the law'], ['Hebrews', 'My righteous one shall live by faith'], ['Revelation', 'Not the one that quotes it']], hint: 'Three quotes, one book missing.' },
      { t: 'sort', q: 'Sort lament from despair.', buckets: [{ id: 'l', name: 'Lament (in the Bible)' }, { id: 'd', name: 'Despair (not it)' }], items: [{ text: '“How long, Yahweh?”', b: 'l' }, { text: 'Talking to nobody about it', b: 'd' }, { text: '“Yet I will rejoice”', b: 'l' }, { text: 'Deciding God does not exist', b: 'd' }] }
    ],
    memory: { ref: 'Habakkuk 3:18', text: 'Yet I will rejoice in Yahweh. I will joy in the God of my salvation.' },
    prayer: 'God, You are quiet and it hurts. I will do what Habakkuk did: climb the tower and watch. You are still the one I rejoice in. Amen.',
    badge: { name: 'Tower Watcher', art: 'lantern', note: 'You brought your hard question to God.' },
    printable: {
      motif: 'lantern', title: 'Write your own Habakkuk 1',
      prompts: ['Write two questions you would ask God out loud.', 'Under each, find one promise you can stand on instead of an explanation.', 'Copy Habakkuk 3:17-18 and mark the "though" list.'],
      craft: { title: 'Yet — card', steps: ['Write the bad things on one side ("though the fig tree…").', 'Write "YET" huge on the other side with verse 18.', 'Tape it inside a cupboard door you open daily.'], note: 'The book turns on one word. Put that word somewhere you will see it.' }
    }
  });

  D.push({
    id: 'the-cross', title: 'Why Jesus Died', tier: 'H', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'cross', when: 79, path: 5, xp: 30, mature: true,
    summary: 'The centre of history, told straight: what happened, what it cost, and what it bought.',
    scripture: [{ ref: 'Romans 5:8', text: 'But God commends his own love toward us, in that while we were yet sinners, Christ died for us.' },
                { ref: 'John 19:30', text: 'When Jesus therefore had received the vinegar, he said, “It is finished!” He bowed his head, and gave up his spirit.' }],
    story: [
      'Thursday night: a borrowed room, bread, wine, and the words “This is my body, which is for you. Do this in memory of me.” After the song they walked out into a garden.',
      'Friday: Judas arrived with a crowd and a kiss. Jesus was arrested, questioned through the night by the Jewish council, then handed to Pilate. Pilate said three times he found no fault in Him, and gave in to the crowd anyway. That is in the text so nobody can pretend good leaders never do that.',
      'Roman crucifixion was the worst death Rome could invent, reserved for slaves and rebels. Nails through the wrists and feet, the cross dropped into a hole, the body hanging until the lungs have to be pushed on for each breath. He was stripped, and the soldiers gambled for his clothes.',
      'Two thieves beside him. One mocked; one asked to be remembered. Jesus promised him Paradise that day — not after a long queue. From the cross He put His mother in John’s care. That is a son still doing his duty while dying.',
      'Darkness from noon to three. Then He cried out Psalm 22:1, “My God, my God, why have you forsaken me?” — the verse a dying man chose to quote, and the psalm that ends with the whole world worshipping.',
      'Then “It is finished.” The Greek word is tetelestai, the word written across a paid-in-full bill. The temple curtain, the huge one, tore from the top to the bottom. Matthew says the ground shook and rocks split.',
      'Why? Because God is love and God is just, and those two could not both have their way at my expense — so they did at His. Romans 3:26: He is just, and the one who justifies the person who has faith in Jesus. Nobody was fooled, nobody was ignored: the penalty for my sin was paid, out loud, in history, by someone with scars.',
      'This is not the end of the chapter — Sunday is in your next unit. Do not close the Bible before verse three.'
    ],
    teach: ['Substitution is not a punishment God takes out on an innocent bystander; the Son went willingly (John 10:18).', '“Finished” means the debt is closed, not that the story ended.', 'Four gospel accounts differ in detail and agree on the event — that is what real eyewitness testimony looks like.'],
    hardNote: 'Crucifixion is described factually and briefly. If a child asks for more, an adult should answer at their level rather than the app inventing details.',
    quiz: [
      { t: 'mc', q: 'What did Jesus say right before He died?', a: ['“It is finished!”', '“Remember me”', '“Peace be still”', '“Why have you left?”'], c: 0 },
      { t: 'order', q: 'Put Good Friday in order.', items: ['Bread and wine in the upper room', 'The garden and the arrest', 'Night questioning, then Pilate', 'Nails and darkness', '“It is finished”', 'The curtain tears'], hint: 'Meal, arrest, trial, cross, words, curtain.' },
      { t: 'blank', q: 'The word Jesus said means the debt is ______ in full.', a: ['paid'], hint: 'tetelestai.' },
      { t: 'match', q: 'Match the detail to its meaning.', pairs: [['Two thieves', 'Grace to a dying man'], ['Gambling for his clothes', 'Psalm 22 fulfilled'], ['“Woman, behold your son”', 'A son’s duty'], ['Curtain torn top to bottom', 'God opened the way']], hint: 'Four details from John and Matthew.' },
      { t: 'sort', q: 'Sort what the cross is and is not.', buckets: [{ id: 'i', name: 'What it is' }, { id: 'n', name: 'Not it' }], items: [{ text: 'God proving His love while staying just', b: 'i' }, { text: 'God losing an argument with Satan', b: 'n' }, { text: 'A real death in history', b: 'i' }, { text: 'Only a symbol of a good life', b: 'n' }] },
      { t: 'mc', q: 'Which psalm did Jesus quote from the cross?', a: ['Psalm 22', 'Psalm 23', 'Psalm 119', 'Psalm 91'], c: 0 }
    ],
    memory: { ref: 'Romans 5:8', text: 'While we were yet sinners, Christ died for us.' },
    prayer: 'Jesus, You did not have to. You did it anyway, for me, in the open. I cannot pay You back, so I will take it as a gift. Amen.',
    badge: { name: 'Paid in Full', art: 'cross', note: 'You know what the cross did.' },
    printable: {
      motif: 'cross', title: 'Seven sayings, seven lines',
      prompts: ['List the seven things Jesus said from the cross with their references.', 'Under each, write one sentence about what it shows about Him.', 'Draw the torn curtain over the top of the page.'],
      craft: { title: 'The paid bill', steps: ['Write a list of your own wrongs on paper.', 'Stamp or write TETELESTAI across it in red.', 'Fold it and put it in the bin — God removed it as far as the east from the west.'], note: 'Do this slowly. It is a worship act, not a game.' }
    }
  });

  D.push({
    id: 'empty-tomb', title: 'Sunday: The Tomb Was Open', tier: 'H', mode: 'story',
    track: 'jesus', testament: 'nt', era: 'cross', when: 80, path: 6, xp: 28, mature: true,
    summary: 'Christianity stands or falls on a body that was not there, seen by people who had every reason not to believe.',
    scripture: [{ ref: '1 Corinthians 15:3-4', text: 'that Christ died for our sins according to the Scriptures; that he was buried, that he has been raised on the third day according to the Scriptures.' },
                { ref: 'John 20:28', text: 'Thomas answered him, “My Lord and my God!”' }],
    story: [
      'Joseph of Arimathea, a council member who had not agreed with the verdict, asked for the body and laid it in his own new tomb. Women rolled a stone, and a guard was posted at the entrance on Friday afternoon — Matthew says the chief priests asked for it themselves.',
      'Very early on Sunday, the women came with spices and were worried about the stone. It was already rolled back. The body was not there. A young man in white said the sentence that changes everything: “Why do you look for the living among the dead? He is risen.”',
      'Mary stayed at the tomb crying and mistook Jesus for the gardener until He said her name. Peter ran and saw the folded face-cloth by itself. Nobody steals a body and neatly undresses it first.',
      'That evening two disciples walked to Emmaus, and Jesus explained the whole Bible to them — “Ought not the Christ to have suffered these things, and to enter into his glory?” They only recognised Him at dinner. They said later, did not our hearts burn within us?',
      'Thomas was not there and refused the report: unless I see the nail-marks I will not believe. Jesus came back for him a week later and let him. Thomas made the boldest statement of faith in the Gospels.',
      'Paul then writes down what he received — an early creed, dated within a few years of the events: He appeared to Peter to the twelve to more than five hundred at once, then to James, then to all the apostles, then to me.',
      'Look at who all of them were: scared, doubting, and then willing to die for something they had checked. Nobody dies for a story they invented on purpose.',
      'And the tomb? It stayed empty. The priests could have produced the body and ended Christianity in a week. Nobody ever did. One more thing: 1 Corinthians 15:6 — of the five hundred witnesses, most were still alive when Paul wrote. That is a public challenge, not a rumour.'
    ],
    teach: ['Easter is a claim about a body in history, not a seasonal metaphor.', 'Doubt that looks at the evidence is praised; unbelief that refuses to look is not.', 'The resurrection is God’s receipt that the payment was accepted.'],
    hardNote: 'The guard, the empty tomb and the "stolen body" counter-claim are handled as evidence, which is what a 10-12 year old needs from a church that only tells the safe version.',
    quiz: [
      { t: 'mc', q: 'Who was the first to find the tomb empty?', a: ['The women with the spices', 'Peter alone', 'The guards', 'Joseph of Arimathea'], c: 0 },
      { t: 'order', q: 'Put the appearances in Paul’s list order (1 Cor 15).', items: ['Peter', 'The twelve', 'More than 500', 'James', 'All the apostles, then Paul'], hint: 'The creed, not the Gospels.' },
      { t: 'blank', q: 'The two Emmaus disciples knew Jesus at dinner when He ______ the bread.', a: ['broke', 'blessed and broke'], hint: 'Luke 24.' },
      { t: 'match', q: 'Match the witness to what they said or did.', pairs: [['Mary Magdalene', 'Thought He was the gardener',], ['Thomas', 'My Lord and my God'], ['Guards and priests', 'Said the body was stolen'], ['Two on the road', 'Hearts burned within us']], hint: 'Four encounters.' },
      { t: 'sort', q: 'Sort evidence from excuses.', buckets: [{ id: 'e', name: 'What the text gives' }, { id: 'x', name: 'Weak excuses' }], items: [{ text: '500 witnesses, most still alive when written', b: 'e' }, { text: 'The disciples invented it for fame', b: 'x' }, { text: 'Enemies produced no body', b: 'e' }, { text: 'They were all confident before seeing anything', b: 'x' }] }
    ],
    memory: { ref: '1 Corinthians 15:3', text: 'Christ died for our sins… he was buried… he has been raised on the third day.' },
    prayer: 'Risen Jesus, You are alive, so my faith is not a nice story. Be found in my week. Amen.',
    badge: { name: 'Sunday Proof', art: 'emptytomb', note: 'You know why the tomb is empty.' },
    printable: {
      motif: 'emptytomb', title: 'Case file: the empty tomb',
      prompts: ['Write the prosecution’s claim ("the body was stolen") and answer it with three facts.', 'List the appearances with their book and chapter.', 'End with one sentence: why I believe it.'],
      craft: { title: 'Folded cloth sketch', steps: ['Draw only what Peter saw: the linen, the face-cloth folded separately.', 'Write one paragraph as if you were reporting evidence to a court.', 'Read 1 Corinthians 15:12-19 aloud and find the sentence where Paul says faith would be "vain".'], note: 'Paul stakes everything on verse 14. So can you.' }
    }
  });

  D.push({
    id: 'annanias', title: 'Ananias and Sapphira: Why This Is in the Bible', tier: 'H', mode: 'lesson',
    track: 'church', testament: 'nt', era: 'church', when: 84, path: 7, xp: 26, mature: true,
    summary: 'The scariest chapter for kids, and one of the most important things a church ever learned.',
    scripture: [{ ref: 'Acts 5:4', text: 'While it remained, wasn’t it remaining to you? and when it was sold, wasn’t it in your own authority? What is it that you have thought about in your heart? You didn’t lie to men, but to God.' },
                { ref: 'Hebrews 12:6', text: 'For whom the Lord loves, he corrects.' }],
    story: [
      'The first church in Jerusalem had a wonderful reputation: they sold land and laid the money at the apostles’ feet and everybody shared. Barnabas was one of them.',
      'A couple, Ananias and Sapphira, sold land too. They agreed to keep some back and then hand over the rest — but they announced it as if it were the whole amount.',
      'Peter asked two questions. First: why did Satan fill your heart to lie to the Holy Spirit? Then: while it was yours, was it not yours to keep? Nobody was making them sell anything. The sin was not the amount. It was the performance.',
      'Peter’s last word to Ananias: “You have not lied to men but to God.” He fell down and died, and great fear came on all who heard. Three hours later Sapphira came in, was given a chance to tell the truth, lied anyway, and died too.',
      'This is a hard chapter. Do not skip it, and do not tell it as a threat. The point is not that God likes money; it is that the new community is God’s own house, and pretending to be holier than you are is what it cannot hold.',
      'Notice what the New Testament does next: “great fear came on the whole church”, and “more than ever believed”. Fear of God is not terror of a monster; it is taking seriously the One who sees the heart.',
      'Peter later writes: be humble under God’s mighty hand. Judgment begins at God’s own house — and a church that is afraid of nothing has usually stopped being holy and started being nice.'
    ],
    teach: ['The lie was about status, not money — hypocrisy is the sin named.', 'God is the same in Acts 5 as in John 3: one is justice, one is mercy, and they never disagree.', 'Every other New Testament writer knew this story and nobody said "make it less scary".'],
    hardNote: 'Death as judgment is stated plainly. Never use this chapter to make a child fear giving an offering. Adults get a note saying exactly that.',
    quiz: [
      { t: 'mc', q: 'What was actually wrong with what Ananias and Sapphira did?', a: ['They pretended their gift was the whole amount', 'They kept their land', 'They refused to sell anything', 'They stole from the church box'], c: 0 },
      { t: 'blank', q: 'Peter said they had lied not to men but to ______.', a: ['God', 'the Holy Spirit'], hint: 'Acts 5:4.' },
      { t: 'order', q: 'Put the sequence in order.', items: ['The church shares everything', 'The couple agree on a plan', 'Ananias brings part of the money', 'Peter asks why', 'He falls and dies', 'Sapphira is asked and lies'], hint: 'Two chances, one heart.' },
      { t: 'sort', q: 'Sort what this chapter teaches from what it does not.', buckets: [{ id: 'y', name: 'It teaches' }, { id: 'n', name: 'It does not' }], items: [{ text: 'God sees the heart, not the amount', b: 'y' }, { text: 'Give or you will be punished', b: 'n' }, { text: 'Pretending in church is serious', b: 'y' }, { text: 'Selling property is wrong', b: 'n' }] }
    ],
    memory: { ref: 'Acts 5:4', text: 'You didn’t lie to men, but to God.' },
    prayer: 'Search me, God. I would rather be honest and small than impressive and fake. Make my giving private and my worship real. Amen.',
    badge: { name: 'Open Book', art: 'ink', note: 'You want God to see the real me.' },
    printable: {
      motif: 'ink', title: 'Two questions from Peter',
      prompts: ['Write out Acts 5:3-4 in your own words.', 'Answer: what is the difference between generosity and showing off?', 'Name one place I could pretend at church, and one thing I will do honestly this month.'],
      craft: { title: 'Secret giving envelope', steps: ['Get an envelope and write "only God sees" on it.', 'Put something in it this week and give it where nobody will know.', 'Do not tell anyone you did it — that is the whole exercise.'], note: 'Matthew 6:3-4 is the positive version of this lesson.' }
    }
  });

  D.push({
    id: 'paul-damascus', title: 'Saul Becomes Paul', tier: 'H', mode: 'story',
    track: 'church', testament: 'nt', era: 'church', when: 85, path: 8, xp: 26, mature: true,
    summary: 'The brand’s own namesake: the church’s worst persecutor, blinded on a road, then sent to the nations.',
    scripture: [{ ref: 'Acts 9:5', text: '“I am Jesus, whom you are persecuting. It is hard for you to kick against the goads.”' },
                { ref: '1 Timothy 1:15', text: 'Christ Jesus came into the world to save sinners; of whom I am chief.' }],
    story: [
      'His Hebrew name was Saul, from the tribe of Benjamin — the same tribe as Israel’s first king. A brilliant, violent Pharisee, trained at the feet of Gamaliel, with letters of arrest from the high priest in his hand.',
      'He approved of Stephen being stoned to death and went from house to house putting believers in prison. That is not a footnote; it is how far he had come.',
      'On the road to Damascus near noon a light from heaven flashed around him. He fell face-down and heard a voice: “Saul, Saul, why are you persecuting me?” He asked who was speaking, and the answer was the sentence that changed history: “I am Jesus, whom you are persecuting.”',
      'Notice what Jesus did not say: "why are you persecuting my church?" Whoever hurts a believer, hurts Him. That is when Saul learned the doctrine of the body of Christ in his bones, on the dirt.',
      'He got up, opened his eyes, and could see nothing. His own enemies had to lead him by the hand into the city. For three days he neither ate nor drank.',
      'A normal disciple in Damascus named Ananias was told to go lay hands on him. Ananias argued, politely: I have heard about this man. God said, “Go, for he is a chosen vessel to me.” And Ananias went, called him “Brother Saul”, and scales fell off his eyes and he was baptised.',
      'Saul — Paul — became the greatest missionary the world has known: three huge journeys, church plants, a Roman prison, and about half the New Testament. He wrote "I am chief of sinners" about himself as an old man with a beard and scars. Every time he listed his own credentials in a letter he said the same thing another way: before, I breathed threats. Now, I breathe mercy.',
      'That is why the brand this app belongs to carries the name Saul — God’s pattern is not "find good people", it is "find a man who is trying hard to be right, and knock him down, and send him". A Podship is a ship for people being washed at high tide. The point of the ship is the shore it is sailing from.'
    ],
    teach: ['Zeal for the wrong thing is still zeal — God redirected it instead of deleting it.', 'Ananias is a hero of this chapter too, and nobody preaches him enough.', 'Paul’s letters are the earliest Christian documents, written within decades, not centuries.'],
    hardNote: 'Blinding, stoning, and prison are named without dramatisation.',
    quiz: [
      { t: 'mc', q: 'What did the voice on the road say Saul was doing?', a: ['Persecuting Jesus', 'Breaking the law of Moses', 'Blaspheming the temple', 'Stealing from the high priest'], c: 0 },
      { t: 'order', q: 'Put the conversion in order.', items: ['Letters of arrest in hand', 'Light at noon, falls down', '“Why are you persecuting me?”', 'Blind, led by the hand', 'Three days without food', 'Ananias says “Brother Saul”', 'Scales fall, baptised'], hint: 'Seven moves to Damascus.' },
      { t: 'blank', q: 'Paul called himself the ______ of sinners (1 Timothy 1:15).', a: ['chief', 'first'], hint: 'He means it literally.' },
      { t: 'match', q: 'Match the fact to Paul.', pairs: [['His teacher', 'Gamaliel'], ['His tribe', 'Benjamin'], ['His trade', 'Tentmaking'], ['Where he wrote from', 'Prison']], hint: 'Four details.' },
      { t: 'mc', q: 'Who was sent to restore Paul’s sight?', a: ['Ananias', 'Barnabas', 'Peter', 'Stephen'], c: 0 }
    ],
    memory: { ref: 'Acts 9:5', text: 'I am Jesus, whom you are persecuting.' },
    prayer: 'Jesus, if You stopped for Saul, You are not finished with me or with anybody I have given up on. Knock me down again if I am walking the wrong way. Amen.',
    badge: { name: 'Road to Damascus', art: 'anchor', note: 'You know God redirects zeal.' },
    printable: {
      motif: 'anchor', title: 'Before and after chart',
      prompts: ['Two columns: Paul before Damascus / Paul after.', 'Write the one sentence that changed him.', 'List three people you have written off. Pray for one this week.'],
      craft: { title: 'Scale paper cut-out', steps: ['Cut eight fish-scale shapes from card.', 'On each, write something you want God to change.', 'Tape them over a small mirror, then peel them off one by one and say "brother Saul".'], note: 'A private five-minute act of honesty at your own dressing table.' }
    }
  });

  D.push({
    id: 'seventy-times-seven', title: 'Forgiveness: the maths of God', tier: 'H', mode: 'lesson',
    track: 'values', testament: 'nt', era: 'taught', when: 87, path: 9, xp: 24,
    summary: 'Peter thought seventy was generous. Jesus said seventy times seven — then told a story about why.',
    scripture: [{ ref: 'Matthew 18:22', text: 'I say not to you, until seven times, but until seventy times seven.' },
                { ref: 'Ephesians 4:32', text: 'Be kind to one another, tender-hearted, forgiving each other, even as God in Christ also forgave you.' }],
    story: [
      'Peter came with a sensible question: how often must I forgive my brother if he wrongs me? As many as seven times? Rabbis at the time taught three, based on a verse in Amos about "for three transgressions, and for four". Seven would have sounded like heroism.',
      'Jesus answered with a number meant to break the counting, not raise it: seventy times seven. If you multiply it, four thousand nine hundred — which is just another way of saying "stop keeping a list".',
      'Then He told a story. A servant owed the king ten thousand talents — the largest number available, and not a payable amount. The king forgave the whole thing.',
      'That same servant found a fellow servant who owed him a hundred denarii — a few months’ wages instead of an unpayable national debt — and choked him: pay me what you owe.',
      'The king’s answer is the hard part: “Shouldn’t you also have had mercy on that fellow servant, even as I had mercy on you?” and the unforgiving man was handed to the tormentors.',
      'Do not misread this. God does not refuse to forgive you because you are struggling to forgive a bully. The point is direction of travel: a person who has been forgiven an ocean and still keeps score has not met the ocean yet. Jesus says at the end, “So my heavenly Father will also do to every one of you, if you don’t forgive your brother from your heart.”',
      'Forgiveness from the heart is not a feeling, not reconciliation with somebody still dangerous, and not saying what they did was fine. It is giving up the right to make them pay, because you were let off.'
    ],
    teach: ['A talent was about twenty years’ wages; ten thousand of them is a joke-size number, on purpose.', 'Forgiveness ≠ trust restored. Safety matters and is a separate question.', 'The unforgiving man is not lost because he felt angry; he is lost because he refused to be shaped by what he was given.'],
    quiz: [
      { t: 'mc', q: 'What number did Peter suggest, thinking it was generous?', a: ['Seven', 'Three', 'Forty', 'Twelve'], c: 0 },
      { t: 'match', q: 'Match the debt to the story.', pairs: [['Ten thousand talents', 'Forgiven completely'], ['A hundred denarii', 'Choked over'], ['Tormentors', 'The result of refusing'], ['Mercy received', 'The reason to give it']], hint: 'One unpayable, one payable.' },
      { t: 'blank', q: 'Jesus said: seventy times ______.', a: ['seven'], hint: 'Matthew 18:22.' },
      { t: 'sort', q: 'Sort forgiveness from things forgiveness is not.', buckets: [{ id: 'f', name: 'Forgiving is' }, { id: 'n', name: 'Not what it is' }], items: [{ text: 'Giving up the right to make them pay', b: 'f' }, { text: 'Pretending it never happened', b: 'n' }, { text: 'Trusting them again at once', b: 'n' }, { text: 'Wishing them God’s mercy you received', b: 'f' }] },
      { t: 'mc', q: 'Why "seventy times seven"?', a: ['To stop counting at all', 'Because 490 is God’s number', 'It was a rabbi’s rule', 'To make maths easy'], c: 0 }
    ],
    memory: { ref: 'Ephesians 4:32', text: 'Forgiving each other, even as God in Christ also forgave you.' },
    prayer: 'Lord, I have a short list. You had a long debt and wiped it. Help me hand over the name of one person I have been keeping score on. Amen.',
    badge: { name: 'No List', art: 'heart', note: 'You forgave, on purpose.' },
    printable: {
      motif: 'heart', title: 'The debt table',
      prompts: ['Work out both debts in real money terms and write them down.', 'Under each, write one sentence: what I would never earn back.', 'Draw the arrow from the big mercy to the small one.'],
      craft: { title: 'Score-keeping paper', steps: ['Write each person who hurt you on a slip, with what happened.', 'Fold each slip into the box and close the lid.', 'Every day, take one out, pray for that person by name, then burn or shred it.'], note: 'Matthew 18:35 — "from your heart". Keep going until the box is empty.' }
    }
  });

  D.push({
    id: 'fruit-works', title: 'Fruit vs Works: the Same Tree Test', tier: 'H', mode: 'game',
    track: 'spirit', testament: 'nt', era: 'church', when: 88, path: 10, xp: 24,
    summary: 'Paul lists two sets of behaviours in the same chapter, and the difference is not effort — it is root system.',
    scripture: [{ ref: 'Galatians 5:22-23', text: 'The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.' },
                { ref: 'Galatians 5:19', text: 'Now the works of the flesh are obvious: sexual immorality, impurity, lust, idolatry…' }],
    story: [
      'The Galatian Christians were being told: to be really spiritual you must add rules to grace. Paul said the opposite — live by the Spirit, and you will not carry out the desires of the flesh.',
      'He then lists the works of the flesh: sexual immorality, impurity, sensuality, idolatry, sorcery, hatred, strife, jealousy, fits of rage, selfish ambition, divisions, envy, drunkenness and the like. Notice how many of them look "religious" or respectable in a school.',
      'Then the fruit of the Spirit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Against such things there is no law.',
      'Fruit is not produced by trying. A fig tree does not strain about figs. Fruit is what a specific tree naturally makes when it is attached to the right root — which is why Jesus said "remain in me" in John 15.',
      'Also: the word is singular. Nine flavours, one fruit. You cannot have gentleness and no self-control and claim the same Spirit.',
      'Works you manufacture; fruit you grow. Which is why Paul also wrote: if the Spirit is your life, keep in step with the Spirit. Not "try harder", but "walk in line".'
    ],
    teach: ['"Flesh" means the human self running the show without God, not your body.', 'Joy is not happiness; it survives the bad week.', 'Self-control is listed last and it is still fruit — nobody should be stuck on it.'],
    quiz: [
      { t: 'sort', q: 'Sort fruit from works (Galatians 5).', buckets: [{ id: 'f', name: 'Fruit of the Spirit' }, { id: 'w', name: 'Works of the flesh' }], items: [{ text: 'Gentleness', b: 'f' }, { text: 'Fits of rage', b: 'w' }, { text: 'Patience', b: 'f' }, { text: 'Selfish ambition', b: 'w' }, { text: 'Peace', b: 'f' }, { text: 'Jealousy', b: 'w' }] },
      { t: 'mc', q: 'How does Paul describe the Spirit’s output — and why does it matter?', a: ['One fruit with nine parts, because it grows together', 'Nine separate fruits, pick three', 'A list of rules to keep', 'A prize you win'], c: 0 },
      { t: 'blank', q: 'A fig tree does not strain about figs; fruit comes from the ______.', a: ['root', 'root system', 'tree'], hint: 'John 15: remain in me.' },
      { t: 'match', q: 'Match the verse to the idea.', pairs: [['Galatians 5:22', 'Fruit appears'], ['Galatians 5:25', 'Keep in step'], ['John 15:5', 'Apart from me you can do nothing'], ['Matthew 7:16', 'You will know them by their fruit']], hint: 'Four fruit verses.' },
      { t: 'order', q: 'How does change actually happen, according to Paul?', items: ['Live by the Spirit', 'Crucify the flesh’s ways', 'Walk in step daily', 'Fruit shows up'], hint: 'Union first, then behaviour.' }
    ],
    memory: { ref: 'Galatians 5:22', text: 'The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.' },
    prayer: 'Spirit, I have been trying to produce fruit on a branch that had let go. Hold me in Him and grow what You want. Amen.',
    badge: { name: 'Fruit Inspector', art: 'olive', note: 'You check the root, not the effort.' },
    printable: {
      motif: 'olive', title: 'Two lists, one tree',
      prompts: ['Write out both lists in full from Galatians 5:19-23.', 'Highlight the one work of the flesh you find easiest to excuse.', 'Under the fruit column, mark where you have actually grown this year.'],
      craft: { title: 'Branch and jar test', steps: ['Put a cut branch in water and one in nothing.', 'Watch which holds its leaves for a week.', 'Write John 15:4-5 beside the two jars.'], note: 'Cut branches die even if they look great on day one.' }
    }
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = D;
  root.SS_UNITS_5 = D;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
