/* =====================================================================
   Saul's Sunday School — curriculum metadata, brand layer, seed data
   ===================================================================== */
(function (root) {
  'use strict';

  /* ---- Thematic tracks (each internally chronological) ---- */
  var TRACKS = {
    god:     { id: 'god',     name: 'Who God Is',       nameUr: '\u0627\u0644\u0644\u06c1 \u06a9\u06cc\u0627 \u06c1\u06d2', color: '#f2a13b', art: 'sun',    blurb: 'The Father, the Son and the Holy Spirit \u2014 one God.', blurbUr: '\u0628\u0627\u067e \u060c \u0628\u06cc\u0679\u0627 \u0627\u0648\u0631 \u0631\u0648\u062d \u0627\u0644\u0642\u062f\u0633 \u2014 \u0627\u06cc\u06a9 \u0627\u0644\u0644\u06c1\u06d4', volume: 3 },
    jesus:   { id: 'jesus',   name: 'Jesus Is Here',    nameUr: '\u06cc\u0633\u0648\u0639 \u0622 \u06af\u06cc\u0627', color: '#e46a6a', art: 'cross',  blurb: 'Everything the Bible points to, walking on our earth.', blurbUr: '\u062c\u0648 \u06a9\u0686\u06be \u06a9\u062a\u0627\u0628 \u0645\u06cc\u06ba \u062a\u06be\u0627 \u060c \u0648\u06c1 \u06c1\u0645\u0627\u0631\u06cc \u0632\u0645\u06cc\u0646 \u067e\u0631 \u0622\u06d2\u06d4', volume: 12 },
    spirit:  { id: 'spirit',  name: 'The Holy Spirit',  nameUr: '\u0631\u0648\u062d \u0627\u0644\u0642\u062f\u0633', color: '#5fb2d4', art: 'dove',   blurb: 'God living in us, helping us, guiding us.', blurbUr: '\u0627\u0644\u0644\u06c1 \u06c1\u0645\u0627\u0631\u06d2 \u0627\u0646\u062f\u0631 \u0631\u06c1\u062a\u0627 \u06c1\u06d2 \u0627\u0648\u0631 \u06c1\u0645\u06cc\u06ba \u0631\u0627\u06c1\u0646\u0627\u06cc\u06cc \u062f\u06cc\u062a\u0627 \u06c1\u06d2\u06d4', volume: 21 },
    bible:   { id: 'bible',   name: 'God\u2019s Word',  nameUr: '\u0627\u0644\u0644\u06c1 \u06a9\u0627 \u06a9\u0644\u0645\u06c1', color: '#8f7bd6', art: 'book',   blurb: 'How we came to have the Bible, and how to read it.', blurbUr: '\u06a9\u062a\u0627\u0628 \u06c1\u0645 \u062a\u06a9 \u06a9\u0633 \u0637\u0631\u062d \u0622\u0626\u06cc \u0627\u0648\u0631 \u067e\u0691\u06be\u06cc \u06a9\u0633\u06cc\u062a\u06be\u06d2 \u06d4', volume: 7 },
    church:  { id: 'church',  name: 'God\u2019s Family', nameUr: '\u0627\u0644\u0644\u06c1 \u06a9\u0627 \u062e\u0627\u0646\u062f\u0627\u0646', color: '#3fbf9a', art: 'house', blurb: 'The church: not a building, a people.', blurbUr: '\u06a9\u0644\u0633\u06cc\u0627 \u0639\u0645\u0627\u0631\u062a \u0646\u06c1\u06cc\u06ba \u060c \u0644\u0648\u06af \u06c1\u06cc\u06ba\u06d4', volume: 30 },
    prayer:  { id: 'prayer',  name: 'Talking With God', nameUr: '\u0627\u0644\u0644\u06c1 \u0633\u06d2 \u0628\u0627\u062a\u06cc\u06ba', color: '#e6a0c8', art: 'hands', blurb: 'Prayer, psalms, and what to say when you have no words.', blurbUr: '\u062f\u0639\u0627 \u060c \u0632\u0628\u0648\u0631 \u06a9\u06cc \u0632\u0628\u0627\u0646 \u060c \u0627\u0648\u0631 \u062c\u0628 \u0644\u0641\u0638 \u0646\u06c1 \u06c1\u0648\u06ba\u06d4', volume: 16 },
    values:  { id: 'values',  name: 'Living Kind',      nameUr: '\u0627\u0686\u06be\u06cc \u0631\u06c1\u0646 \u06a9\u0627 \u0637\u0631\u06cc\u0642\u06c1', color: '#7bbf5a', art: 'heart', blurb: 'Kindness, honesty, forgiveness \u2014 God\u2019s shape for a life.', blurbUr: '\u0645\u06c1\u0631\u0628\u0627\u0646\u06cc \u060c \u0633\u0686\u0627\u0626\u06cc \u060c \u0645\u0639\u0627\u0641\u06cc \u06d4', volume: 24 },
    promise: { id: 'promise', name: 'God Promises',     nameUr: '\u0627\u0644\u0644\u06c1 \u06a9\u06d2 \u0648\u0639\u062f\u06d2', color: '#f5c542', art: 'rainbow', blurb: 'The promises that run from Genesis to Revelation.', blurbUr: '\u0648\u0639\u062f\u06d2 \u062c\u0648 \u0622\u063a\u0627\u0632 \u0633\u06d2 \u0622\u062e\u0631 \u062a\u06a9 \u0686\u0644\u06d2 \u062c\u0627\u062a\u06d2 \u06c1\u06cc\u06ba\u06d4', volume: 44 }
  };

  /* ---- Chronological eras (Creation -> Revelation) ---- */
  var ERAS = [
    { id: 'beginnings',  name: 'Beginnings',        span: 'Genesis \u2013 Flood',            art: 'creation' },
    { id: 'fathers',     name: 'The Great Family',  span: 'Abraham \u2013 Joseph',            art: 'tent' },
    { id: 'freedom',     name: 'Out of Egypt',      span: 'Exodus, Law, Journey',           art: 'tablet' },
    { id: 'homeland',    name: 'A Land of Their Own', span: 'Joshua \u2013 Judges',          art: 'wall' },
    { id: 'kings',       name: 'Kings & Singers',   span: 'Samuel \u2013 Chronicles',         art: 'crown' },
    { id: 'prophets',    name: 'The Prophets',      span: 'Elijah \u2013 Malachi',            art: 'flame' },
    { id: 'return',      name: 'Coming Home',       span: 'Exile \u2013 Ezra, Nehemiah',      art: 'gate' },
    { id: 'waiting',     name: 'The Long Wait',     span: 'Between the Testaments',         art: 'lantern' },
    { id: 'born',        name: 'Jesus Is Born',     span: 'Gospels, childhood',             art: 'star' },
    { id: 'taught',      name: 'Jesus Teaches',     span: 'Ministry & miracles',            art: 'loaves' },
    { id: 'cross',       name: 'The Cross & Empty Tomb', span: 'Good Friday \u2013 Easter',   art: 'tomb', mature: true },
    { id: 'church',      name: 'The Church Begins', span: 'Acts \u2013 letters',              art: 'dove' },
    { id: 'forever',     name: 'Forever Days',      span: 'Revelation',                     art: 'city' }
  ];

  /* ---- Home base decorables, unlocked by unit badges ---- */
  var HOME_ITEMS = {
    scroll:   { name: 'Story Scroll',     art: 'scroll' },
    tree:     { name: 'Fig Tree',         art: 'tree' },
    tent:     { name: 'Shepherd Tent',    art: 'tent' },
    lamb:     { name: 'Little Lamb',      art: 'lamb' },
    well:     { name: 'Stone Well',       art: 'well' },
    lamp:     { name: 'Clay Lamp',        art: 'lantern' },
    river:    { name: 'Quiet Stream',     art: 'stream' },
    altar:    { name: 'Memorial Stones',  art: 'stones' },
    harp:     { name: 'Harp',             art: 'harp' },
    boat:     { name: 'Little Boat',      art: 'boat' },
    beehive:  { name: 'Beehive',          art: 'hive' },
    manger:   { name: 'Manger',           art: 'manger' },
    vine:     { name: 'Grape Vine',       art: 'vine' },
    cage:     { name: 'Empty Birdcage',   art: 'cage' },
    pot:      { name: 'Flour Jar',        art: 'jar' },
    crown:    { name: 'Small Crown',      art: 'crown' },
    fire:     { name: 'Campfire',         art: 'fire' },
    olive:    { name: 'Olive Sapling',    art: 'olive' },
    cloak:    { name: 'Bright Coat',      art: 'coat' },
    dove:     { name: 'Dove House',       art: 'dothouse' },
    stone:    { name: 'Five Smooth Stones', art: 'stones' },
    bread:    { name: 'Bread Basket',     art: 'basket' },
    tablet:   { name: 'Commandment Tablets', art: 'tablet' },
    rainbow:  { name: 'Rainbow Arch',     art: 'rainbow' },
    city:     { name: 'Golden City Model', art: 'city' },
    fish:     { name: 'Two Fish',         art: 'fish' },
    ink:      { name: 'Ink & Reeds',      art: 'ink' },
    jar:      { name: 'Oil Jar',          art: 'jar' },
    shield:   { name: 'Faith Shield',     art: 'shield' },
    anchor:   { name: 'Ship\u2019s Anchor', art: 'anchor' }
  };

  /* ---- Simulated global leaderboard peers (offline stand-in) ---- */
  // In production this comes from the API. Offline, we ship a friendly roster
  // so the leaderboard still teaches how one works.
  var ROSTER = [
    { name: 'Ayaan', base: 620, avatar: 'lion' }, { name: 'Mariam', base: 540, avatar: 'dove' },
    { name: 'Noah', base: 480, avatar: 'lamb' }, { name: 'Esi', base: 430, avatar: 'hen' },
    { name: 'Tomas', base: 390, avatar: 'donkey' }, { name: 'Grace', base: 355, avatar: 'ewe' },
    { name: 'Yusuf', base: 320, avatar: 'camel' }, { name: 'Iyanu', base: 300, avatar: 'shepherd' },
    { name: 'Sofia', base: 275, avatar: 'dove' }, { name: 'Ethan', base: 250, avatar: 'lamb' },
    { name: 'Hana', base: 232, avatar: 'hen' }, { name: 'Bilal', base: 210, avatar: 'lion' },
    { name: 'Ruthie', base: 195, avatar: 'ewe' }, { name: 'Kofi', base: 180, avatar: 'donkey' },
    { name: 'Mei', base: 168, avatar: 'dove' }, { name: 'Sami', base: 150, avatar: 'camel' },
    { name: 'Leah', base: 140, avatar: 'lamb' }, { name: 'Daudi', base: 128, avatar: 'shepherd' },
    { name: 'Anaya', base: 115, avatar: 'hen' }, { name: 'Peter', base: 104, avatar: 'ewe' },
    { name: 'Zara', base: 92, avatar: 'dove', hard: true }, { name: 'Isaac', base: 80, avatar: 'lamb', hard: true },
    { name: 'Nali', base: 66, avatar: 'donkey' }, { name: 'Ade', base: 54, avatar: 'lion' },
    { name: 'Miriam', base: 42, avatar: 'hen' }, { name: 'Tito', base: 30, avatar: 'camel' }
  ];

  /* ---- Saul's Podship brand layer (swap freely) ---- */
  var BRAND = {
    name: 'Saul\u2019s Sunday School',
    parent: 'Saul\u2019s Podship',
    parentUrl: 'https://www.saulspodship.com/',
    appUrl: 'https://sundayschool.saulspodship.com/',
    tagline: 'A free ministry from Saul\u2019s Podship \u2014 worship in Spirit and Truth.',
    taglineShort: 'Free forever. No ads. Just the story.',
    // Older tiers can hop across to the encyclopedia for the same topic.
    volumeHint: 'Grown-ups can go deeper on this in Saul\u2019s Podship volume {n}.',
    characters: {
      captain: { name: 'Captain Saul', role: 'guide for the older tiers', art: 'shepherd' },
      mascot:  { name: 'Pip', role: 'the little lamb who asks questions', art: 'lamb' }
    },
    links: [
      { label: 'Watch & listen on Saul\u2019s Podship', url: 'https://www.saulspodship.com/', art: 'pod' },
      { label: 'The 50-volume encyclopedia', url: 'https://www.saulspodship.com/volumes', art: 'book' },
      { label: 'Gospel music archive', url: 'https://www.saulspodship.com/music', art: 'harp' }
    ]
  };

  /* ---- Sticker/badge art vocabulary used by art.js ---- */
  var BADGE_ART = ['ear','hands','drop','manger','cloak','sun', 'rainbow', 'ark', 'star', 'lamb', 'fish', 'loaves', 'tablet', 'flame', 'crown', 'dove', 'cross', 'emptytomb', 'shield', 'scroll', 'tree', 'well', 'lantern', 'harp', 'basket', 'coat', 'shell', 'boat', 'gate', 'jar', 'heart', 'olive', 'city', 'stones', 'kite', 'lion', 'hen', 'house', 'ink', 'anchor'];

  /* ---- Daily verse rotation for notifications ---- */
  var DAILY_VERSES = [
    { ref: 'Psalm 119:105', text: 'Your word is a lamp to my feet and a light to my path.' },
    { ref: 'John 13:34', text: 'A new commandment I give to you: that you love one another.' },
    { ref: 'Philippians 4:4', text: 'Rejoice in the Lord always. Again I will say, rejoice!' },
    { ref: 'Psalm 23:1', text: 'Yahweh is my shepherd; I shall lack nothing.' },
    { ref: 'Proverbs 3:5', text: 'Trust in Yahweh with all your heart, and don\u2019t lean on your own understanding.' },
    { ref: '1 John 4:8', text: 'God is love.' },
    { ref: 'Isaiah 41:10', text: 'Don\u2019t be afraid, for I am with you. Don\u2019t be dismayed, for I am your God.' },
    { ref: 'Matthew 19:14', text: 'Let the little children come to me, and don\u2019t hinder them, for the Kingdom of Heaven belongs to such as these.' },
    { ref: 'Joshua 1:9', text: 'Be strong and of good courage. Don\u2019t be terrified, for Yahweh your God is with you wherever you go.' },
    { ref: 'Numbers 6:24', text: 'May Yahweh bless you and keep you. May Yahweh make his face shine on you, and be gracious to you.' },
    { ref: 'Psalm 34:8', text: 'Oh, taste and see that Yahweh is good.' },
    { ref: 'Romans 8:28', text: 'We know that all things work together for good for those who love God.' },
    { ref: 'Matthew 11:28', text: 'Come to me, all you who labour and are burdened, and I will give you rest.' },
    { ref: 'Hebrews 13:8', text: 'Jesus Christ is the same yesterday, today, and forever.' },
    { ref: 'Revelation 21:4', text: 'God will wipe away every tear from their eyes.' }
  ];

  function dailyVerseIndex(dayKey) {
    var h = 0;
    for (var i = 0; i < dayKey.length; i++) h = (h * 31 + dayKey.charCodeAt(i)) >>> 0;
    return h % DAILY_VERSES.length;
  }

  /* ---- Prayer prompt banks (used at the end of every lesson) ---- */
  var PRAYER_MODES = [
    { id: 'thanks',   name: 'Thank You',      art: 'heart',  ask: 'Name two things from today\u2019s story that you can thank God for.' },
    { id: 'sorry',    name: 'Forgive Me',     art: 'drop',   ask: 'Is there something you want to say sorry about? God already knows \u2014 but He still wants to hear you.' },
    { id: 'people',   name: 'Other People',   art: 'hands',  ask: 'Name someone who needs God\u2019s help today. Ask Him to be close to them.' },
    { id: 'brave',    name: 'Help Me',        art: 'shield', ask: 'What is hard this week? Ask God for help with exactly that.' },
    { id: 'listen',   name: 'Quiet Time',     art: 'lantern', ask: 'Say nothing for thirty seconds. Just rest with God.' }
  ];

  var META = {
    TRACKS: TRACKS, ERAS: ERAS, HOME_ITEMS: HOME_ITEMS, ROSTER: ROSTER, BRAND: BRAND,
    BADGE_ART: BADGE_ART, DAILY_VERSES: DAILY_VERSES, PRAYER_MODES: PRAYER_MODES,
    dailyVerseIndex: dailyVerseIndex
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = META;
  root.SS_META = META;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
