// Additional chapter data for the Chinese Learning Game
const chapter3Data = {
  vocabulary: [
    { word: '舒服', pinyin: 'shū fu', chinese: '感到轻松自在，没有不适', english: 'comfortable' },
    { word: '奔', pinyin: 'bēn', chinese: '快速地跑向某个方向', english: 'to rush; to run quickly' },
    { word: '温暖', pinyin: 'wēn nuǎn', chinese: '温和暖和；也比喻令人感到关爱', english: 'warm; warmth' },
    { word: '棉被', pinyin: 'mián bèi', chinese: '用棉花做的被子', english: 'quilt; cotton blanket' },
    { word: '幸福', pinyin: 'xìng fú', chinese: '生活美好，心里满足', english: 'happy; blissful' },
    { word: '照顾', pinyin: 'zhào gù', chinese: '关心、帮助他人生活起居', english: 'to take care of' },
    { word: '连忙', pinyin: 'lián máng', chinese: '立刻，赶快做某事', english: 'promptly; at once' },
    { word: '年幼', pinyin: 'nián yòu', chinese: '年纪小，年龄还小', english: 'young; little' },
    { word: '未曾', pinyin: 'wèi céng', chinese: '以前从来没有', english: 'never before' },
    { word: '软弱', pinyin: 'ruǎn ruò', chinese: '身体没有力气或性格不坚强', english: 'weak; frail' }
  ],
  gameQuestions: [
    { 
      text: '自从一个小主人收留了我，我就过着___的日子。', 
      english: 'Since a kind little boy took me in, I\'ve been living a ___ life.',
      answer: '幸福', 
      answerEnglish: 'happy',
      options: ['温暖', '幸福', '舒服', '软弱'],
      optionsEnglish: ['warm', 'happy', 'comfortable', 'weak']
    },
    { 
      text: '在我___的时候，爸爸妈妈就被人捉走了。', 
      english: 'When I was still ___, my father and mother were taken away.',
      answer: '年幼', 
      answerEnglish: 'young',
      options: ['软弱', '舒服', '年幼', '温暖'],
      optionsEnglish: ['weak', 'comfortable', 'young', 'warm']
    },
    { 
      text: '我饿得___无力的时候，有一个小孩走了过来。', 
      english: 'When I was so hungry and ___ that I couldn\'t move, a child came over.',
      answer: '软弱', 
      answerEnglish: 'weak',
      options: ['年幼', '未曾', '软弱', '连忙'],
      optionsEnglish: ['young', 'never before', 'weak', 'promptly']
    },
    { 
      text: '他轻轻地把我抱起，直往一所房子___去。', 
      english: 'He gently picked me up and ___ straight toward a house.',
      answer: '奔', 
      answerEnglish: 'ran',
      options: ['奔', '照顾', '连忙', '未曾'],
      optionsEnglish: ['ran', 'take care of', 'promptly', 'never before']
    },
    { 
      text: '小孩把我放进一个纸箱子里，又___给我盖上了一条棉被。', 
      english: 'The child put me in a cardboard box and ___ covered me with a cotton blanket.',
      answer: '连忙', 
      answerEnglish: 'promptly',
      options: ['照顾', '温暖', '连忙', '舒服'],
      optionsEnglish: ['take care of', 'warm', 'promptly', 'comfortable']
    }
  ],
  chineseSentences: [
    '我是一只小狗，自从一个小主人收留了我，我就过着幸福的日子。',
    '我叫小汪，出生在一个角落里。',
    '在我年幼的时候，爸爸妈妈就被人捉走了。',
    '有一天，我饿得软弱无力的时候，有一个小孩走了过来，他轻轻地把我抱起，直往一所房子奔去。',
    '小孩把我放进一个纸箱子里，又连忙给我盖上了一条棉被。'
  ],
  englishSentences: [
    'I am a little puppy. Since a kind little boy took me in, I\'ve been living a happy life.',
    'My name is Little Woof. I was born in a corner.',
    'When I was still young, my father and mother were taken away.',
    'One day, when I was so hungry and weak that I couldn\'t move, a child came over, gently picked me up, and ran straight toward a house.',
    'The child put me in a cardboard box and promptly covered me with a cotton blanket.'
  ]
};

// Export for use in the main component
window.chapter3Data = chapter3Data;