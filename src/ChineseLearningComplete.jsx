import React, { useState } from 'react';
import { BookOpen, Play, Volume2, RotateCcw, Gamepad2, Speaker, Home, ArrowLeft } from 'lucide-react';

const ChineseLearningCompleteApp = () => {
  const [currentChapter, setCurrentChapter] = useState('menu'); // 'menu', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9', 'chapter10', 'chapter11', 'chapter12'
  const [currentPhase, setCurrentPhase] = useState('learning');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [viewedChinese, setViewedChinese] = useState(false);
  const [viewedEnglish, setViewedEnglish] = useState(false);
  const [gameAnswers, setGameAnswers] = useState({});
  const [wrongCount, setWrongCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [readingLanguage, setReadingLanguage] = useState('');
  const [currentSentence, setCurrentSentence] = useState(-1);
  const [isReading, setIsReading] = useState(false);

  // 第一篇数据
  const chapter1Data = {
    vocabulary: [
      { word: '办法', pinyin: 'bàn fǎ', chinese: '处理事情或解决问题的方法', english: 'way; method; solution' },
      { word: '脑筋', pinyin: 'nǎo jīn', chinese: '思维和理解能力；想法', english: 'brain; mind; ideas' },
      { word: '浮', pinyin: 'fú', chinese: '漂在水面上，不下沉', english: 'to float' },
      { word: '树洞', pinyin: 'shù dòng', chinese: '树干上的空洞', english: 'tree hollow' },
      { word: '着急', pinyin: 'zháo jí', chinese: '心里紧张，不安', english: 'anxious; worried' },
      { word: '情形', pinyin: 'qíng xíng', chinese: '事情的状况或样子', english: 'situation; condition' },
      { word: '小心', pinyin: 'xiǎo xīn', chinese: '注意，谨慎，不粗心', english: 'careful; cautious' },
      { word: '树枝', pinyin: 'shù zhī', chinese: '树上的枝条', english: 'tree branch' },
      { word: '聪明', pinyin: 'cōng míng', chinese: '头脑灵活，理解力强', english: 'clever; smart' },
      { word: '提', pinyin: 'tí', chinese: '用手拿着（垂下的东西）', english: 'to carry (by hand); to lift' }
    ],
    gameQuestions: [
      { 
        text: '一个不___，皮球跳进一棵大树的树洞里去了。', 
        english: 'One of them was not ___, and the ball bounced into a tree hollow.',
        answer: '小心', 
        answerEnglish: 'careful',
        options: ['聪明', '小心', '着急', '办法'],
        optionsEnglish: ['clever', 'careful', 'anxious', 'method']
      },
      { 
        text: '皮球跳进一棵大树的___里去了。', 
        english: 'The ball bounced into a ___ of a big tree.',
        answer: '树洞', 
        answerEnglish: 'tree hollow',
        options: ['树枝', '情形', '树洞', '脑筋'],
        optionsEnglish: ['tree branch', 'situation', 'tree hollow', 'brain']
      },
      { 
        text: '大家很___，争着把手伸进树洞里去拿球。', 
        english: 'Everyone became ___ and tried to reach into the hole to get the ball.',
        answer: '着急', 
        answerEnglish: 'anxious',
        options: ['小心', '聪明', '浮', '着急'],
        optionsEnglish: ['careful', 'clever', 'float', 'anxious']
      },
      { 
        text: '有人找来一根___，伸进树洞里去拿球。', 
        english: 'Someone brought a ___ and tried to reach the ball.',
        answer: '树枝', 
        answerEnglish: 'tree branch',
        options: ['树枝', '树洞', '办法', '提'],
        optionsEnglish: ['tree branch', 'tree hollow', 'method', 'carry']
      },
      { 
        text: '也没有___把它拿上来。', 
        english: 'They still had no ___ to get it out.',
        answer: '办法', 
        answerEnglish: 'solution',
        options: ['情形', '脑筋', '浮', '办法'],
        optionsEnglish: ['situation', 'brain', 'float', 'solution']
      },
      { 
        text: '华国是个___的孩子。', 
        english: 'Hua Guo was a ___ child.',
        answer: '聪明', 
        answerEnglish: 'clever',
        options: ['小心', '聪明', '着急', '浮'],
        optionsEnglish: ['careful', 'clever', 'anxious', 'float']
      },
      { 
        text: '平时最爱动___。', 
        english: 'He loved using his ___ .',
        answer: '脑筋', 
        answerEnglish: 'brain',
        options: ['办法', '提', '脑筋', '树枝'],
        optionsEnglish: ['method', 'carry', 'brain', 'tree branch']
      },
      { 
        text: '他看到这种___，只见他眼珠子一转。', 
        english: 'When he saw the ___, his eyes turned.',
        answer: '情形', 
        answerEnglish: 'situation',
        options: ['情形', '树洞', '小心', '聪明'],
        optionsEnglish: ['situation', 'tree hollow', 'careful', 'clever']
      },
      { 
        text: '不久，___来了一桶水。', 
        english: 'Soon he ___ a bucket of water.',
        answer: '提', 
        answerEnglish: 'carried',
        options: ['浮', '提', '办法', '脑筋'],
        optionsEnglish: ['float', 'carried', 'method', 'brain']
      },
      { 
        text: '皮球___了上来。', 
        english: 'The ball ___ up.',
        answer: '浮', 
        answerEnglish: 'floated',
        options: ['着急', '树枝', '提', '浮'],
        optionsEnglish: ['anxious', 'tree branch', 'carry', 'floated']
      }
    ],
    chineseSentences: [
      '几个孩子在一棵大树下拍球，一个不小心，皮球跳进一棵大树的树洞里去了。',
      '大家很着急，争着把手伸进树洞里去拿球。',
      '可是，他们的手太短了，没有人能把皮球拿上来。',
      '有人找来一根树枝，伸进树洞里去拿球，可是球太滑了，也没有办法把它拿上来。',
      '大家急得快哭出来了。',
      '华国是个聪明的孩子，平时最爱动脑筋。',
      '他看到这种情形，只见他眼珠子一转，就想到办法了。',
      '他跑回家去，不久，提来了一桶水。',
      '他把水倒进树洞里，皮球浮了上来。',
      '他就轻易地拿到球了。'
    ],
    englishSentences: [
      'A few children were playing with a ball under a big tree. One of them was not careful, and the ball bounced into a tree hollow.',
      'Everyone became anxious and tried to reach into the hole to get the ball.',
      'But their arms were too short—no one could get the ball out.',
      'Someone brought a tree branch and tried to reach the ball, but it was too slippery, and they still had no solution.',
      'The children were about to cry.',
      'Hua Guo was a clever child who loved using his brain.',
      'When he saw the situation, his eyes turned and he came up with an idea.',
      'He ran home, and soon carried a bucket of water.',
      'He poured the water into the tree hollow, and the ball floated up.',
      'He easily picked it up.'
    ]
  };

  // 第二篇数据
  const chapter2Data = {
    vocabulary: [
      { word: '骄傲', pinyin: 'jiāo ào', chinese: '看不起别人；也可指感到自豪', english: 'arrogant / proud' },
      { word: '学习', pinyin: 'xué xí', chinese: '通过读书或练习来获得知识或技能', english: 'to study / to learn' },
      { word: '回家', pinyin: 'huí jiā', chinese: '从外面返回自己的家里', english: 'to go home' },
      { word: '参加', pinyin: 'cān jiā', chinese: '参与活动或组织', english: 'to participate / to join' },
      { word: '篮球', pinyin: 'lán qiú', chinese: '一种用手拍打球并投进篮筐的运动', english: 'basketball' },
      { word: '帮助', pinyin: 'bāng zhù', chinese: '协助别人解决困难或完成任务', english: 'to help / to assist' },
      { word: '比赛', pinyin: 'bǐ sài', chinese: '为争取胜利而进行的竞赛活动', english: 'competition / match' },
      { word: '同班', pinyin: 'tóng bān', chinese: '在同一个班级', english: 'same class' },
      { word: '高兴', pinyin: 'gāo xìng', chinese: '心情愉快，快乐', english: 'happy / glad' },
      { word: '要好', pinyin: 'yào hǎo', chinese: '感情好，关系亲密', english: 'close (in relationship) / good friends' }
    ],
    gameQuestions: [
      { 
        text: '我有很多朋友,文锦和我最___。', 
        english: 'I have many friends, and Wen Jin and I are the ___.',
        answer: '要好', 
        answerEnglish: 'closest',
        options: ['骄傲', '要好', '高兴', '帮助'],
        optionsEnglish: ['arrogant', 'closest', 'happy', 'help']
      },
      { 
        text: '我们是___同学', 
        english: 'We are ___ classmates',
        answer: '同班', 
        answerEnglish: 'same class',
        options: ['比赛', '篮球', '同班', '参加'],
        optionsEnglish: ['competition', 'basketball', 'same class', 'participate']
      },
      { 
        text: '经常一起上学,一起___。', 
        english: 'We often go to school and ___ together.',
        answer: '回家', 
        answerEnglish: 'go home',
        options: ['学习', '骄傲', '帮助', '回家'],
        optionsEnglish: ['study', 'arrogant', 'help', 'go home']
      },
      { 
        text: '但他一点也不___', 
        english: 'But he is not ___ at all',
        answer: '骄傲', 
        answerEnglish: 'arrogant',
        options: ['高兴', '骄傲', '要好', '同班'],
        optionsEnglish: ['happy', 'arrogant', 'close', 'same class']
      },
      { 
        text: '还常常___功课差的同学。', 
        english: 'He often ___ classmates who are weak in their schoolwork.',
        answer: '帮助', 
        answerEnglish: 'helps',
        options: ['比赛', '参加', '学习', '帮助'],
        optionsEnglish: ['competition', 'participate', 'study', 'helps']
      },
      { 
        text: '他也时常___课外活动。', 
        english: 'He often ___ in extracurricular activities.',
        answer: '参加', 
        answerEnglish: 'participates',
        options: ['参加', '帮助', '回家', '骄傲'],
        optionsEnglish: ['participates', 'helps', 'go home', 'arrogant']
      },
      { 
        text: '他的___打得很好', 
        english: 'He plays ___ very well',
        answer: '篮球', 
        answerEnglish: 'basketball',
        options: ['比赛', '学习', '篮球', '高兴'],
        optionsEnglish: ['competition', 'study', 'basketball', 'happy']
      },
      { 
        text: '时常参加___。', 
        english: 'He often joins ___.',
        answer: '比赛', 
        answerEnglish: 'competitions',
        options: ['篮球', '同班', '要好', '比赛'],
        optionsEnglish: ['basketball', 'same class', 'close', 'competitions']
      },
      { 
        text: '我很___有文锦这么一个好朋友', 
        english: 'I feel very ___ to have such a good friend like Wen Jin',
        answer: '高兴', 
        answerEnglish: 'happy',
        options: ['骄傲', '帮助', '高兴', '参加'],
        optionsEnglish: ['arrogant', 'help', 'happy', 'participate']
      },
      { 
        text: '我也要向他多___。', 
        english: 'I want to ___ from him more.',
        answer: '学习', 
        answerEnglish: 'learn',
        options: ['回家', '学习', '比赛', '篮球'],
        optionsEnglish: ['go home', 'learn', 'competition', 'basketball']
      }
    ],
    chineseSentences: [
      '我有很多朋友，文锦和我最要好。',
      '我们是同班同学，经常一起上学，一起回家。',
      '文锦的功课很好，但他一点也不骄傲，还常常帮助功课差的同学。',
      '此外，他也时常参加课外活动。',
      '他的篮球打得很好，时常参加比赛。',
      '我很高兴有文锦这么一个好朋友，我也要向他多学习。'
    ],
    englishSentences: [
      'I have many friends, and Wen Jin and I are the closest.',
      'We are in the same class, and we often go to school and go home together.',
      'Wen Jin does well in his studies, but he is not proud at all. He often helps classmates who are weak in their schoolwork.',
      'In addition, he often takes part in extracurricular activities.',
      'He plays basketball very well and often joins competitions.',
      'I feel very happy to have such a good friend like Wen Jin, and I want to learn from him more.'
    ]
  };

  // 第三篇数据
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
      },
      { 
        text: '又连忙给我盖上了一条___。', 
        english: 'And promptly covered me with a ___ .',
        answer: '棉被', 
        answerEnglish: 'cotton blanket',
        options: ['棉被', '温暖', '幸福', '奔'],
        optionsEnglish: ['cotton blanket', 'warm', 'happy', 'rush']
      },
      { 
        text: '我___喝过那么好喝的乳汁。', 
        english: 'I had ___ tasted such delicious milk.',
        answer: '未曾', 
        answerEnglish: 'never before',
        options: ['年幼', '未曾', '软弱', '照顾'],
        optionsEnglish: ['young', 'never before', 'weak', 'take care of']
      },
      { 
        text: '我很久没有感觉那么___了。', 
        english: 'I hadn\'t felt so ___ in a long time.',
        answer: '舒服', 
        answerEnglish: 'comfortable',
        options: ['连忙', '幸福', '舒服', '棉被'],
        optionsEnglish: ['promptly', 'happy', 'comfortable', 'cotton blanket']
      },
      { 
        text: '他们细心地___我。', 
        english: 'They took great ___ of me.',
        answer: '照顾', 
        answerEnglish: 'care',
        options: ['奔', '照顾', '未曾', '年幼'],
        optionsEnglish: ['rush', 'care', 'never before', 'young']
      },
      { 
        text: '我有了一个___的家。', 
        english: 'I now have a ___ home.',
        answer: '温暖', 
        answerEnglish: 'warm',
        options: ['软弱', '舒服', '连忙', '温暖'],
        optionsEnglish: ['weak', 'comfortable', 'promptly', 'warm']
      }
    ],
    chineseSentences: [
      '我是一只小狗，自从一个小主人收留了我，我就过着幸福的日子。',
      '我叫小汪，出生在一个角落里。',
      '在我年幼的时候，爸爸妈妈就被人捉走了。',
      '有一天，我饿得软弱无力的时候，有一个小孩走了过来，他轻轻地把我抱起，直往一所房子奔去。',
      '小孩把我放进一个纸箱子里，又连忙给我盖上了一条棉被。',
      '不久，我嗅到了一股香味，原来一位妇人泡了一碗牛奶给我。',
      '我未曾喝过那么好喝的乳汁，很快地就喝光了。',
      '她和小孩看到我那贪吃的样子，都笑了。他们的笑声是那么地好听。',
      '我很久没有感觉那么舒服了，不知不觉就睡着啦。',
      '后来，我才知道我那善良的小主人叫做小聪，慈祥的妇人是小聪的妈妈，他们细心地照顾我。',
      '我有了一个温暖的家，如果爸爸妈妈知道了，它们一定会很开心的。'
    ],
    englishSentences: [
      'I am a little puppy. Since a kind little boy took me in, I\'ve been living a happy life.',
      'My name is Little Woof. I was born in a corner.',
      'When I was still young, my father and mother were taken away.',
      'One day, when I was so hungry and weak that I couldn\'t move, a child came over, gently picked me up, and ran straight toward a house.',
      'The child put me in a cardboard box and promptly covered me with a cotton blanket.',
      'Soon, I smelled something fragrant—it was a kind woman who had made me a bowl of milk.',
      'I had never before tasted such delicious milk, and I finished it quickly.',
      'The woman and the boy laughed when they saw how greedy I looked. Their laughter was so pleasant to hear.',
      'I hadn\'t felt so comfortable in a long time, and before I knew it, I had fallen asleep.',
      'Later, I found out that my kind little master\'s name is Xiaocong, and the kind woman is his mother. They took great care of me.',
      'I now have a warm home. If my mom and dad knew, they would surely be very happy too.'
    ]
  };

  // 第四篇数据
  const chapter4Data = {
    vocabulary: [
      { word: '旅行', pinyin: 'lǚ xíng', chinese: '外出游览，到不同的地方参观', english: 'travel; journey' },
      { word: '景色', pinyin: 'jǐng sè', chinese: '风景的色彩，美丽的自然景观', english: 'scenery; landscape' },
      { word: '拍照', pinyin: 'pāi zhào', chinese: '用照相机记录景象', english: 'take photos' },
      { word: '博物馆', pinyin: 'bó wù guǎn', chinese: '收藏和展示文物的地方', english: 'museum' },
      { word: '导游', pinyin: 'dǎo yóu', chinese: '带领游客参观的人', english: 'tour guide' },
      { word: '纪念品', pinyin: 'jì niàn pǐn', chinese: '为了纪念而购买的物品', english: 'souvenir' },
      { word: '登山', pinyin: 'dēng shān', chinese: '爬山，攀登高山', english: 'mountain climbing' },
      { word: '海滩', pinyin: 'hǎi tān', chinese: '靠近海边的沙滩', english: 'beach' },
      { word: '酒店', pinyin: 'jiǔ diàn', chinese: '为旅客提供住宿的地方', english: 'hotel' },
      { word: '背包', pinyin: 'bēi bāo', chinese: '背在背上的行李包', english: 'backpack' }
    ],
    gameQuestions: [
      { text: '我们计划下个月去___。', english: 'We plan to ___ next month.', answer: '旅行', answerEnglish: 'travel', options: ['旅行', '拍照', '登山', '酒店'], optionsEnglish: ['travel', 'take photos', 'climb mountain', 'hotel'] },
      { text: '山上的___很美丽。', english: 'The ___ on the mountain is beautiful.', answer: '景色', answerEnglish: 'scenery', options: ['景色', '博物馆', '海滩', '纪念品'], optionsEnglish: ['scenery', 'museum', 'beach', 'souvenir'] },
      { text: '游客喜欢在这里___。', english: 'Tourists like to ___ here.', answer: '拍照', answerEnglish: 'take photos', options: ['导游', '拍照', '背包', '酒店'], optionsEnglish: ['tour guide', 'take photos', 'backpack', 'hotel'] },
      { text: '我们参观了历史___。', english: 'We visited the history ___.', answer: '博物馆', answerEnglish: 'museum', options: ['海滩', '博物馆', '登山', '景色'], optionsEnglish: ['beach', 'museum', 'climb mountain', 'scenery'] },
      { text: '___为我们介绍了当地文化。', english: 'The ___ introduced local culture to us.', answer: '导游', answerEnglish: 'tour guide', options: ['导游', '纪念品', '旅行', '拍照'], optionsEnglish: ['tour guide', 'souvenir', 'travel', 'take photos'] },
      { text: '她买了一些___给朋友。', english: 'She bought some ___ for friends.', answer: '纪念品', answerEnglish: 'souvenirs', options: ['背包', '酒店', '纪念品', '博物馆'], optionsEnglish: ['backpack', 'hotel', 'souvenirs', 'museum'] },
      { text: '我们明天要去___。', english: 'We are going ___ tomorrow.', answer: '登山', answerEnglish: 'mountain climbing', options: ['登山', '海滩', '导游', '景色'], optionsEnglish: ['mountain climbing', 'beach', 'tour guide', 'scenery'] },
      { text: '孩子们在___上玩耍。', english: 'Children are playing on the ___.', answer: '海滩', answerEnglish: 'beach', options: ['拍照', '海滩', '旅行', '博物馆'], optionsEnglish: ['take photos', 'beach', 'travel', 'museum'] },
      { text: '我们住在海边的___里。', english: 'We stayed in a ___ by the sea.', answer: '酒店', answerEnglish: 'hotel', options: ['酒店', '纪念品', '背包', '导游'], optionsEnglish: ['hotel', 'souvenir', 'backpack', 'tour guide'] },
      { text: '他的___里装满了衣服。', english: 'His ___ is full of clothes.', answer: '背包', answerEnglish: 'backpack', options: ['景色', '登山', '背包', '拍照'], optionsEnglish: ['scenery', 'climb mountain', 'backpack', 'take photos'] }
    ],
    chineseSentences: [
      '暑假到了，小明一家决定去海南岛旅行。',
      '他们坐飞机到了三亚，住在海边的酒店里。',
      '第一天，他们在海滩上玩耍，拍了很多照片。',
      '第二天，导游带他们参观了当地的博物馆。',
      '博物馆里有很多有趣的文物和历史资料。',
      '第三天，他们去登山，山上的景色非常美丽。',
      '小明用相机拍了很多美丽的风景照。',
      '在纪念品店，妈妈买了一些纪念品给朋友。',
      '小明背着背包，里面装着水和零食。',
      '这次旅行让全家人都很开心，留下了美好的回忆。'
    ],
    englishSentences: [
      'Summer vacation arrived, and Xiao Ming\'s family decided to travel to Hainan Island.',
      'They took a plane to Sanya and stayed in a hotel by the sea.',
      'On the first day, they played on the beach and took many photos.',
      'On the second day, a tour guide took them to visit the local museum.',
      'The museum had many interesting artifacts and historical materials.',
      'On the third day, they went mountain climbing, and the scenery on the mountain was very beautiful.',
      'Xiao Ming used his camera to take many beautiful landscape photos.',
      'At the souvenir shop, mom bought some souvenirs for friends.',
      'Xiao Ming carried a backpack filled with water and snacks.',
      'This trip made the whole family very happy and left them with wonderful memories.'
    ]
  };

  // 第五篇数据
  const chapter5Data = {
    vocabulary: [
      { word: '厨房', pinyin: 'chú fáng', chinese: '做饭的房间', english: 'kitchen' },
      { word: '菜谱', pinyin: 'cài pǔ', chinese: '记录做菜方法的书或资料', english: 'recipe; cookbook' },
      { word: '炒菜', pinyin: 'chǎo cài', chinese: '用锅和油快速烹饪蔬菜或肉类', english: 'stir-fry' },
      { word: '调料', pinyin: 'tiáo liào', chinese: '用来调味的配料', english: 'seasoning; condiment' },
      { word: '蒸饭', pinyin: 'zhēng fàn', chinese: '用蒸汽把米煮成饭', english: 'steam rice' },
      { word: '切菜', pinyin: 'qiē cài', chinese: '用刀把蔬菜切成小块', english: 'chop vegetables' },
      { word: '汤勺', pinyin: 'tāng sháo', chinese: '喝汤用的勺子', english: 'soup spoon' },
      { word: '平底锅', pinyin: 'píng dǐ guō', chinese: '底部平坦的锅子', english: 'frying pan' },
      { word: '洗碗', pinyin: 'xǐ wǎn', chinese: '清洗碗碟等餐具', english: 'wash dishes' },
      { word: '美味', pinyin: 'měi wèi', chinese: '味道很好，很好吃', english: 'delicious; tasty' }
    ],
    gameQuestions: [
      { text: '妈妈在___里做饭。', english: 'Mom is cooking in the ___.', answer: '厨房', answerEnglish: 'kitchen', options: ['厨房', '菜谱', '汤勺', '调料'], optionsEnglish: ['kitchen', 'recipe', 'soup spoon', 'seasoning'] },
      { text: '她按照___的步骤做菜。', english: 'She follows the steps in the ___.', answer: '菜谱', answerEnglish: 'recipe', options: ['平底锅', '菜谱', '蒸饭', '切菜'], optionsEnglish: ['frying pan', 'recipe', 'steam rice', 'chop vegetables'] },
      { text: '爸爸用平底锅___。', english: 'Dad uses a frying pan to ___.', answer: '炒菜', answerEnglish: 'stir-fry', options: ['洗碗', '炒菜', '汤勺', '美味'], optionsEnglish: ['wash dishes', 'stir-fry', 'soup spoon', 'delicious'] },
      { text: '做菜时需要加一些___。', english: 'When cooking, you need to add some ___.', answer: '调料', answerEnglish: 'seasoning', options: ['调料', '厨房', '菜谱', '平底锅'], optionsEnglish: ['seasoning', 'kitchen', 'recipe', 'frying pan'] },
      { text: '我们用电饭锅___。', english: 'We use a rice cooker to ___.', answer: '蒸饭', answerEnglish: 'steam rice', options: ['切菜', '蒸饭', '洗碗', '炒菜'], optionsEnglish: ['chop vegetables', 'steam rice', 'wash dishes', 'stir-fry'] },
      { text: '奶奶教我如何___。', english: 'Grandma taught me how to ___.', answer: '切菜', answerEnglish: 'chop vegetables', options: ['美味', '切菜', '汤勺', '调料'], optionsEnglish: ['delicious', 'chop vegetables', 'soup spoon', 'seasoning'] },
      { text: '我用___喝汤。', english: 'I use a ___ to drink soup.', answer: '汤勺', answerEnglish: 'soup spoon', options: ['汤勺', '菜谱', '厨房', '蒸饭'], optionsEnglish: ['soup spoon', 'recipe', 'kitchen', 'steam rice'] },
      { text: '___很适合煎鸡蛋。', english: 'A ___ is perfect for frying eggs.', answer: '平底锅', answerEnglish: 'frying pan', options: ['平底锅', '洗碗', '炒菜', '切菜'], optionsEnglish: ['frying pan', 'wash dishes', 'stir-fry', 'chop vegetables'] },
      { text: '吃完饭后要___。', english: 'After eating, we need to ___.', answer: '洗碗', answerEnglish: 'wash dishes', options: ['调料', '美味', '洗碗', '汤勺'], optionsEnglish: ['seasoning', 'delicious', 'wash dishes', 'soup spoon'] },
      { text: '这道菜真___！', english: 'This dish is really ___!', answer: '美味', answerEnglish: 'delicious', options: ['厨房', '菜谱', '平底锅', '美味'], optionsEnglish: ['kitchen', 'recipe', 'frying pan', 'delicious'] }
    ],
    chineseSentences: [
      '小丽很喜欢在厨房里帮妈妈做饭。',
      '今天她们要按照菜谱做一道新菜。',
      '首先，小丽学会了如何切菜。',
      '妈妈教她用平底锅炒菜的技巧。',
      '做菜时要加适当的调料才会好吃。',
      '他们还用电饭锅蒸了香喷喷的米饭。',
      '小丽用汤勺尝了尝汤的味道。',
      '这顿饭做得很美味，全家人都很满意。',
      '吃完饭后，小丽主动帮忙洗碗。',
      '通过这次经历，小丽学会了很多厨房技能。'
    ],
    englishSentences: [
      'Xiao Li loves helping her mom cook in the kitchen.',
      'Today they want to make a new dish following a recipe.',
      'First, Xiao Li learned how to chop vegetables.',
      'Mom taught her the technique of stir-frying with a frying pan.',
      'When cooking, you need to add proper seasoning to make it tasty.',
      'They also used a rice cooker to steam fragrant rice.',
      'Xiao Li used a soup spoon to taste the soup.',
      'This meal was very delicious, and the whole family was satisfied.',
      'After eating, Xiao Li volunteered to wash the dishes.',
      'Through this experience, Xiao Li learned many kitchen skills.'
    ]
  };

  // 第六篇数据
  const chapter6Data = {
    vocabulary: [
      { word: '图书馆', pinyin: 'tú shū guǎn', chinese: '收藏和借阅书籍的地方', english: 'library' },
      { word: '借书', pinyin: 'jiè shū', chinese: '从图书馆临时取书阅读', english: 'borrow books' },
      { word: '还书', pinyin: 'huán shū', chinese: '把借来的书归还给图书馆', english: 'return books' },
      { word: '阅读', pinyin: 'yuè dú', chinese: '看书并理解内容', english: 'reading' },
      { word: '小说', pinyin: 'xiǎo shuō', chinese: '虚构的长篇故事', english: 'novel' },
      { word: '杂志', pinyin: 'zá zhì', chinese: '定期出版的期刊', english: 'magazine' },
      { word: '安静', pinyin: 'ān jìng', chinese: '没有声音，很宁静', english: 'quiet; peaceful' },
      { word: '书架', pinyin: 'shū jià', chinese: '放书的架子', english: 'bookshelf' },
      { word: '知识', pinyin: 'zhī shi', chinese: '通过学习获得的信息和理解', english: 'knowledge' },
      { word: '作业', pinyin: 'zuò yè', chinese: '老师布置的学习任务', english: 'homework' }
    ],
    gameQuestions: [
      { text: '学生们经常去___学习。', english: 'Students often go to the ___ to study.', answer: '图书馆', answerEnglish: 'library', options: ['图书馆', '借书', '杂志', '书架'], optionsEnglish: ['library', 'borrow books', 'magazine', 'bookshelf'] },
      { text: '我想___这本小说。', english: 'I want to ___ this novel.', answer: '借书', answerEnglish: 'borrow books', options: ['还书', '借书', '阅读', '作业'], optionsEnglish: ['return books', 'borrow books', 'reading', 'homework'] },
      { text: '看完书后要记得___。', english: 'Remember to ___ after reading.', answer: '还书', answerEnglish: 'return books', options: ['安静', '知识', '还书', '小说'], optionsEnglish: ['quiet', 'knowledge', 'return books', 'novel'] },
      { text: '___是一种很好的习惯。', english: '___ is a good habit.', answer: '阅读', answerEnglish: 'Reading', options: ['阅读', '杂志', '书架', '借书'], optionsEnglish: ['Reading', 'magazine', 'bookshelf', 'borrow books'] },
      { text: '她喜欢看爱情___。', english: 'She likes reading romance ___.', answer: '小说', answerEnglish: 'novels', options: ['图书馆', '小说', '还书', '作业'], optionsEnglish: ['library', 'novels', 'return books', 'homework'] },
      { text: '这本___有很多有趣的文章。', english: 'This ___ has many interesting articles.', answer: '杂志', answerEnglish: 'magazine', options: ['杂志', '安静', '知识', '阅读'], optionsEnglish: ['magazine', 'quiet', 'knowledge', 'reading'] },
      { text: '图书馆里要保持___。', english: 'You must keep ___ in the library.', answer: '安静', answerEnglish: 'quiet', options: ['书架', '安静', '借书', '小说'], optionsEnglish: ['bookshelf', 'quiet', 'borrow books', 'novel'] },
      { text: '所有的书都整齐地放在___上。', english: 'All books are neatly placed on the ___.', answer: '书架', answerEnglish: 'bookshelf', options: ['还书', '杂志', '书架', '图书馆'], optionsEnglish: ['return books', 'magazine', 'bookshelf', 'library'] },
      { text: '读书可以增长___。', english: 'Reading can increase ___.', answer: '知识', answerEnglish: 'knowledge', options: ['作业', '知识', '安静', '阅读'], optionsEnglish: ['homework', 'knowledge', 'quiet', 'reading'] },
      { text: '我在图书馆做___。', english: 'I do my ___ in the library.', answer: '作业', answerEnglish: 'homework', options: ['小说', '书架', '借书', '作业'], optionsEnglish: ['novel', 'bookshelf', 'borrow books', 'homework'] }
    ],
    chineseSentences: [
      '小王每天放学后都会去图书馆。',
      '他喜欢在安静的环境中阅读。',
      '今天他要借一本新的小说。',
      '书架上有很多不同类型的书籍。',
      '除了小说，他还喜欢看科学杂志。',
      '阅读让他获得了很多知识。',
      '有时候他也在图书馆做作业。',
      '图书馆的工作人员很友善。',
      '看完书后，小王总是记得还书。',
      '图书馆成了他最喜欢的地方之一。'
    ],
    englishSentences: [
      'Xiao Wang goes to the library every day after school.',
      'He likes reading in a quiet environment.',
      'Today he wants to borrow a new novel.',
      'There are many different types of books on the bookshelves.',
      'Besides novels, he also likes reading science magazines.',
      'Reading has given him a lot of knowledge.',
      'Sometimes he also does his homework in the library.',
      'The library staff are very friendly.',
      'After reading, Xiao Wang always remembers to return books.',
      'The library has become one of his favorite places.'
    ]
  };

  // 第七篇数据
  const chapter7Data = {
    vocabulary: [
      { word: '运动', pinyin: 'yùn dòng', chinese: '身体活动，锻炼身体', english: 'exercise; sports' },
      { word: '足球', pinyin: 'zú qiú', chinese: '用足踢的球类运动', english: 'soccer; football' },
      { word: '游泳', pinyin: 'yóu yǒng', chinese: '在水中用四肢划水前进', english: 'swimming' },
      { word: '跑步', pinyin: 'pǎo bù', chinese: '快速用脚移动身体', english: 'running' },
      { word: '健康', pinyin: 'jiàn kāng', chinese: '身体和心理状态良好', english: 'healthy' },
      { word: '锻炼', pinyin: 'duàn liàn', chinese: '通过运动增强体质', english: 'exercise; work out' },
      { word: '球场', pinyin: 'qiú chǎng', chinese: '进行球类运动的场地', english: 'court; field' },
      { word: '教练', pinyin: 'jiào liàn', chinese: '指导运动训练的人', english: 'coach; trainer' },
      { word: '团队', pinyin: 'tuán duì', chinese: '一起工作的小组', english: 'team' },
      { word: '比分', pinyin: 'bǐ fēn', chinese: '比赛中双方的得分情况', english: 'score' }
    ],
    gameQuestions: [
      { text: '每天___对身体有好处。', english: 'Daily ___ is good for the body.', answer: '运动', answerEnglish: 'exercise', options: ['运动', '比分', '球场', '教练'], optionsEnglish: ['exercise', 'score', 'field', 'coach'] },
      { text: '他们在球场上踢___。', english: 'They are playing ___ on the field.', answer: '足球', answerEnglish: 'soccer', options: ['游泳', '足球', '跑步', '团队'], optionsEnglish: ['swimming', 'soccer', 'running', 'team'] },
      { text: '夏天我喜欢___。', english: 'I like ___ in summer.', answer: '游泳', answerEnglish: 'swimming', options: ['健康', '游泳', '锻炼', '比分'], optionsEnglish: ['healthy', 'swimming', 'exercise', 'score'] },
      { text: '早上___是个好习惯。', english: '___ in the morning is a good habit.', answer: '跑步', answerEnglish: 'Running', options: ['跑步', '球场', '教练', '足球'], optionsEnglish: ['Running', 'field', 'coach', 'soccer'] },
      { text: '运动让我们保持___。', english: 'Sports help us stay ___.', answer: '健康', answerEnglish: 'healthy', options: ['团队', '健康', '游泳', '运动'], optionsEnglish: ['team', 'healthy', 'swimming', 'exercise'] },
      { text: '我每天都要___身体。', english: 'I need to ___ my body every day.', answer: '锻炼', answerEnglish: 'exercise', options: ['锻炼', '比分', '跑步', '球场'], optionsEnglish: ['exercise', 'score', 'running', 'field'] },
      { text: '这个___很适合踢足球。', english: 'This ___ is perfect for playing soccer.', answer: '球场', answerEnglish: 'field', options: ['教练', '球场', '健康', '团队'], optionsEnglish: ['coach', 'field', 'healthy', 'team'] },
      { text: '___教我们正确的动作。', english: 'The ___ teaches us correct movements.', answer: '教练', answerEnglish: 'coach', options: ['游泳', '足球', '教练', '锻炼'], optionsEnglish: ['swimming', 'soccer', 'coach', 'exercise'] },
      { text: '我们的___合作得很好。', english: 'Our ___ works together very well.', answer: '团队', answerEnglish: 'team', options: ['比分', '运动', '团队', '球场'], optionsEnglish: ['score', 'exercise', 'team', 'field'] },
      { text: '现在的___是2比1。', english: 'The current ___ is 2 to 1.', answer: '比分', answerEnglish: 'score', options: ['跑步', '健康', '教练', '比分'], optionsEnglish: ['running', 'healthy', 'coach', 'score'] }
    ],
    chineseSentences: [
      '小华是学校足球队的一员。',
      '他每天放学后都会在球场上锻炼。',
      '教练教他们各种足球技巧。',
      '除了足球，小华还喜欢跑步和游泳。',
      '运动让他保持健康的体魄。',
      '他的团队合作精神很强。',
      '在上次比赛中，他们的比分是3比2获胜。',
      '小华认为运动不仅锻炼身体，还能交到朋友。',
      '他计划继续坚持运动。',
      '他的梦想是成为一名专业的足球运动员。'
    ],
    englishSentences: [
      'Xiao Hua is a member of the school soccer team.',
      'He exercises on the field every day after school.',
      'The coach teaches them various soccer skills.',
      'Besides soccer, Xiao Hua also likes running and swimming.',
      'Sports help him maintain a healthy body.',
      'His team spirit is very strong.',
      'In the last match, they won with a score of 3 to 2.',
      'Xiao Hua believes that sports not only exercise the body but also help make friends.',
      'He plans to continue exercising.',
      'His dream is to become a professional soccer player.'
    ]
  };

  // 第八篇数据
  const chapter8Data = {
    vocabulary: [
      { word: '春天', pinyin: 'chūn tiān', chinese: '一年四季中的第一个季节', english: 'spring' },
      { word: '花朵', pinyin: 'huā duǒ', chinese: '植物开的花', english: 'flower; blossom' },
      { word: '绿叶', pinyin: 'lǜ yè', chinese: '绿色的叶子', english: 'green leaves' },
      { word: '温和', pinyin: 'wēn hé', chinese: '气候不冷不热，很舒适', english: 'mild; gentle' },
      { word: '播种', pinyin: 'bō zhǒng', chinese: '把种子种在土里', english: 'sow seeds' },
      { word: '发芽', pinyin: 'fā yá', chinese: '种子开始长出嫩芽', english: 'sprout; germinate' },
      { word: '蝴蝶', pinyin: 'hú dié', chinese: '有美丽翅膀的昆虫', english: 'butterfly' },
      { word: '蜜蜂', pinyin: 'mì fēng', chinese: '采花蜜的昆虫', english: 'bee' },
      { word: '公园', pinyin: 'gōng yuán', chinese: '供人们休闲娱乐的地方', english: 'park' },
      { word: '野餐', pinyin: 'yě cān', chinese: '在户外吃饭', english: 'picnic' }
    ],
    gameQuestions: [
      { text: '___来了，万物开始复苏。', english: '___ has arrived, and everything begins to revive.', answer: '春天', answerEnglish: 'Spring', options: ['春天', '花朵', '公园', '野餐'], optionsEnglish: ['Spring', 'flower', 'park', 'picnic'] },
      { text: '树上开满了美丽的___。', english: 'The trees are full of beautiful ___.', answer: '花朵', answerEnglish: 'flowers', options: ['绿叶', '花朵', '蝴蝶', '蜜蜂'], optionsEnglish: ['green leaves', 'flowers', 'butterfly', 'bee'] },
      { text: '___在阳光下显得特别翠绿。', english: 'The ___ look especially green in the sunlight.', answer: '绿叶', answerEnglish: 'green leaves', options: ['温和', '播种', '绿叶', '发芽'], optionsEnglish: ['mild', 'sow seeds', 'green leaves', 'sprout'] },
      { text: '春天的气候很___。', english: 'The climate in spring is very ___.', answer: '温和', answerEnglish: 'mild', options: ['温和', '花朵', '公园', '蝴蝶'], optionsEnglish: ['mild', 'flower', 'park', 'butterfly'] },
      { text: '农民开始在田里___。', english: 'Farmers begin to ___ in the fields.', answer: '播种', answerEnglish: 'sow seeds', options: ['野餐', '播种', '蜜蜂', '绿叶'], optionsEnglish: ['picnic', 'sow seeds', 'bee', 'green leaves'] },
      { text: '种子在温暖的土壤中___。', english: 'Seeds ___ in the warm soil.', answer: '发芽', answerEnglish: 'sprout', options: ['发芽', '温和', '公园', '花朵'], optionsEnglish: ['sprout', 'mild', 'park', 'flower'] },
      { text: '美丽的___在花丛中飞舞。', english: 'Beautiful ___ dance among the flowers.', answer: '蝴蝶', answerEnglish: 'butterflies', options: ['春天', '蝴蝶', '播种', '野餐'], optionsEnglish: ['spring', 'butterflies', 'sow seeds', 'picnic'] },
      { text: '___忙着采集花蜜。', english: '___ are busy collecting nectar.', answer: '蜜蜂', answerEnglish: 'Bees', options: ['蜜蜂', '绿叶', '发芽', '温和'], optionsEnglish: ['Bees', 'green leaves', 'sprout', 'mild'] },
      { text: '我们去___赏花。', english: 'We go to the ___ to enjoy the flowers.', answer: '公园', answerEnglish: 'park', options: ['蝴蝶', '公园', '蜜蜂', '播种'], optionsEnglish: ['butterfly', 'park', 'bee', 'sow seeds'] },
      { text: '天气好的时候适合___。', english: 'Good weather is perfect for a ___.', answer: '野餐', answerEnglish: 'picnic', options: ['花朵', '发芽', '春天', '野餐'], optionsEnglish: ['flower', 'sprout', 'spring', 'picnic'] }
    ],
    chineseSentences: [
      '春天来了，大地重新充满了生机。',
      '公园里的花朵竞相开放，五彩缤纷。',
      '树木长出了嫩绿的新叶。',
      '温和的阳光照耀着大地。',
      '农民们忙着在田里播种。',
      '埋在土里的种子开始发芽。',
      '蝴蝶在花丛中翩翩起舞。',
      '勤劳的蜜蜂忙着采集花蜜。',
      '人们喜欢到公园里散步赏花。',
      '许多家庭选择在春天的周末去野餐。'
    ],
    englishSentences: [
      'Spring has arrived, and the earth is full of vitality again.',
      'Flowers in the park are blooming in competition, colorful and beautiful.',
      'Trees have grown tender green new leaves.',
      'Gentle sunlight shines on the earth.',
      'Farmers are busy sowing seeds in the fields.',
      'Seeds buried in the soil begin to sprout.',
      'Butterflies dance gracefully among the flowers.',
      'Hardworking bees are busy collecting nectar.',
      'People like to take walks and enjoy flowers in the park.',
      'Many families choose to have picnics on spring weekends.'
    ]
  };

  // 第九篇数据
  const chapter9Data = {
    vocabulary: [
      { word: '生日', pinyin: 'shēng rì', chinese: '一个人出生的日子', english: 'birthday' },
      { word: '蛋糕', pinyin: 'dàn gāo', chinese: '用面粉、鸡蛋等做的甜食', english: 'cake' },
      { word: '礼物', pinyin: 'lǐ wù', chinese: '送给别人的东西', english: 'gift; present' },
      { word: '蜡烛', pinyin: 'là zhú', chinese: '用蜡做的照明用品', english: 'candle' },
      { word: '祝福', pinyin: 'zhù fú', chinese: '表达美好愿望的话语', english: 'blessing; wish' },
      { word: '聚会', pinyin: 'jù huì', chinese: '大家聚在一起的活动', english: 'party; gathering' },
      { word: '音乐', pinyin: 'yīn yuè', chinese: '好听的声音艺术', english: 'music' },
      { word: '跳舞', pinyin: 'tiào wǔ', chinese: '随着音乐做各种动作', english: 'dance' },
      { word: '拍手', pinyin: 'pāi shǒu', chinese: '两只手掌相击发出声音', english: 'clap hands' },
      { word: '许愿', pinyin: 'xǔ yuàn', chinese: '心里希望实现某个愿望', english: 'make a wish' }
    ],
    gameQuestions: [
      { text: '今天是小明的___。', english: 'Today is Xiao Ming\'s ___.', answer: '生日', answerEnglish: 'birthday', options: ['生日', '蛋糕', '音乐', '聚会'], optionsEnglish: ['birthday', 'cake', 'music', 'party'] },
      { text: '妈妈为他准备了一个大___。', english: 'Mom prepared a big ___ for him.', answer: '蛋糕', answerEnglish: 'cake', options: ['礼物', '蛋糕', '蜡烛', '跳舞'], optionsEnglish: ['gift', 'cake', 'candle', 'dance'] },
      { text: '朋友们都带来了___。', english: 'Friends all brought ___.', answer: '礼物', answerEnglish: 'gifts', options: ['祝福', '拍手', '礼物', '许愿'], optionsEnglish: ['blessing', 'clap hands', 'gifts', 'make a wish'] },
      { text: '蛋糕上插着十根___。', english: 'There are ten ___ on the cake.', answer: '蜡烛', answerEnglish: 'candles', options: ['蜡烛', '生日', '音乐', '聚会'], optionsEnglish: ['candles', 'birthday', 'music', 'party'] },
      { text: '大家给他送上美好的___。', english: 'Everyone gave him wonderful ___.', answer: '祝福', answerEnglish: 'blessings', options: ['蛋糕', '祝福', '跳舞', '礼物'], optionsEnglish: ['cake', 'blessings', 'dance', 'gift'] },
      { text: '生日___非常热闹。', english: 'The birthday ___ was very lively.', answer: '聚会', answerEnglish: 'party', options: ['许愿', '聚会', '蜡烛', '拍手'], optionsEnglish: ['make a wish', 'party', 'candle', 'clap hands'] },
      { text: '他们播放了好听的___。', english: 'They played beautiful ___.', answer: '音乐', answerEnglish: 'music', options: ['音乐', '祝福', '生日', '蛋糕'], optionsEnglish: ['music', 'blessing', 'birthday', 'cake'] },
      { text: '小朋友们一起___。', english: 'The children ___ together.', answer: '跳舞', answerEnglish: 'danced', options: ['礼物', '蜡烛', '跳舞', '聚会'], optionsEnglish: ['gift', 'candle', 'danced', 'party'] },
      { text: '大家为他___庆祝。', english: 'Everyone ___ to celebrate for him.', answer: '拍手', answerEnglish: 'clapped hands', options: ['拍手', '音乐', '许愿', '祝福'], optionsEnglish: ['clapped hands', 'music', 'make a wish', 'blessing'] },
      { text: '吹蜡烛前要先___。', english: 'Before blowing out the candles, you must first ___.', answer: '许愿', answerEnglish: 'make a wish', options: ['跳舞', '拍手', '许愿', '音乐'], optionsEnglish: ['dance', 'clap hands', 'make a wish', 'music'] }
    ],
    chineseSentences: [
      '今天是小红十岁的生日。',
      '妈妈为她准备了一个漂亮的生日蛋糕。',
      '好朋友们都来参加她的生日聚会。',
      '每个人都带来了精美的礼物。',
      '蛋糕上插着十根彩色的蜡烛。',
      '大家一起唱生日歌，为小红送上祝福。',
      '聚会上播放着欢快的音乐。',
      '小朋友们高兴地跳舞。',
      '当小红吹蜡烛时，大家都在拍手。',
      '小红闭上眼睛许愿，希望家人朋友都健康快乐。'
    ],
    englishSentences: [
      'Today is Xiao Hong\'s tenth birthday.',
      'Mom prepared a beautiful birthday cake for her.',
      'Good friends all came to attend her birthday party.',
      'Everyone brought exquisite gifts.',
      'There are ten colorful candles on the cake.',
      'Everyone sang the birthday song together and gave blessings to Xiao Hong.',
      'Cheerful music was playing at the party.',
      'The children danced happily.',
      'When Xiao Hong blew out the candles, everyone was clapping.',
      'Xiao Hong closed her eyes and made a wish, hoping that her family and friends would all be healthy and happy.'
    ]
  };

  // 第十篇数据
  const chapter10Data = {
    vocabulary: [
      { word: '超市', pinyin: 'chāo shì', chinese: '大型的自选商店', english: 'supermarket' },
      { word: '购物', pinyin: 'gòu wù', chinese: '买东西', english: 'shopping' },
      { word: '推车', pinyin: 'tuī chē', chinese: '在超市里用来装商品的车', english: 'shopping cart' },
      { word: '收银', pinyin: 'shōu yín', chinese: '计算商品价格并收钱', english: 'cashier; checkout' },
      { word: '蔬菜', pinyin: 'shū cài', chinese: '可以食用的植物', english: 'vegetables' },
      { word: '水果', pinyin: 'shuǐ guǒ', chinese: '植物结的可以吃的果实', english: 'fruit' },
      { word: '面包', pinyin: 'miàn bāo', chinese: '用面粉做的食物', english: 'bread' },
      { word: '牛奶', pinyin: 'niú nǎi', chinese: '奶牛产的白色液体', english: 'milk' },
      { word: '价格', pinyin: 'jià gé', chinese: '商品的售价', english: 'price' },
      { word: '找零', pinyin: 'zhǎo líng', chinese: '找回多余的钱', english: 'give change' }
    ],
    gameQuestions: [
      { text: '我们去___买东西。', english: 'We go to the ___ to buy things.', answer: '超市', answerEnglish: 'supermarket', options: ['超市', '购物', '推车', '收银'], optionsEnglish: ['supermarket', 'shopping', 'shopping cart', 'cashier'] },
      { text: '周末全家一起去___。', english: 'The whole family goes ___ on weekends.', answer: '购物', answerEnglish: 'shopping', options: ['蔬菜', '购物', '水果', '面包'], optionsEnglish: ['vegetables', 'shopping', 'fruit', 'bread'] },
      { text: '进超市先要拿一个___。', english: 'First take a ___ when entering the supermarket.', answer: '推车', answerEnglish: 'shopping cart', options: ['推车', '牛奶', '价格', '找零'], optionsEnglish: ['shopping cart', 'milk', 'price', 'give change'] },
      { text: '买完东西要去___台付款。', english: 'After shopping, go to the ___ counter to pay.', answer: '收银', answerEnglish: 'cashier', options: ['超市', '收银', '购物', '蔬菜'], optionsEnglish: ['supermarket', 'cashier', 'shopping', 'vegetables'] },
      { text: '妈妈买了很多新鲜的___。', english: 'Mom bought many fresh ___.', answer: '蔬菜', answerEnglish: 'vegetables', options: ['水果', '推车', '蔬菜', '收银'], optionsEnglish: ['fruit', 'shopping cart', 'vegetables', 'cashier'] },
      { text: '孩子们最喜欢吃甜___。', english: 'Children love eating sweet ___.', answer: '水果', answerEnglish: 'fruit', options: ['面包', '牛奶', '价格', '水果'], optionsEnglish: ['bread', 'milk', 'price', 'fruit'] },
      { text: '早餐我们吃___和牛奶。', english: 'For breakfast we eat ___ and milk.', answer: '面包', answerEnglish: 'bread', options: ['面包', '找零', '超市', '购物'], optionsEnglish: ['bread', 'give change', 'supermarket', 'shopping'] },
      { text: '小宝宝每天都要喝___。', english: 'The baby drinks ___ every day.', answer: '牛奶', answerEnglish: 'milk', options: ['蔬菜', '水果', '牛奶', '推车'], optionsEnglish: ['vegetables', 'fruit', 'milk', 'shopping cart'] },
      { text: '这个苹果的___是五元。', english: 'The ___ of this apple is five yuan.', answer: '价格', answerEnglish: 'price', options: ['价格', '收银', '面包', '牛奶'], optionsEnglish: ['price', 'cashier', 'bread', 'milk'] },
      { text: '付了十元，要___两元。', english: 'Paid ten yuan, need to ___ two yuan.', answer: '找零', answerEnglish: 'give change', options: ['超市', '购物', '蔬菜', '找零'], optionsEnglish: ['supermarket', 'shopping', 'vegetables', 'give change'] }
    ],
    chineseSentences: [
      '星期六，妈妈带小李去超市购物。',
      '他们进入超市后，先拿了一个推车。',
      '妈妈想买一些新鲜的蔬菜。',
      '小李选了他最喜欢的水果。',
      '他们还买了面包和牛奶。',
      '妈妈仔细检查每样商品的价格。',
      '购物结束后，他们去收银台排队。',
      '收银员帮他们算出了总价。',
      '妈妈付了钱，收银员找了零钱。',
      '他们满意地带着购买的东西回家了。'
    ],
    englishSentences: [
      'On Saturday, mom took Xiao Li to the supermarket for shopping.',
      'After entering the supermarket, they first took a shopping cart.',
      'Mom wanted to buy some fresh vegetables.',
      'Xiao Li chose his favorite fruits.',
      'They also bought bread and milk.',
      'Mom carefully checked the price of each item.',
      'After shopping, they went to queue at the cashier counter.',
      'The cashier helped them calculate the total price.',
      'Mom paid the money, and the cashier gave change.',
      'They went home satisfied with their purchases.'
    ]
  };

  // 第十一篇数据
  const chapter11Data = {
    vocabulary: [
      { word: '医院', pinyin: 'yī yuán', chinese: '治疗疾病的地方', english: 'hospital' },
      { word: '医生', pinyin: 'yī shēng', chinese: '治疗疾病的专业人员', english: 'doctor' },
      { word: '护士', pinyin: 'hù shi', chinese: '照顾病人的医务人员', english: 'nurse' },
      { word: '生病', pinyin: 'shēng bìng', chinese: '身体不健康', english: 'get sick; fall ill' },
      { word: '检查', pinyin: 'jiǎn chá', chinese: '仔细查看身体状况', english: 'examine; check' },
      { word: '药物', pinyin: 'yào wù', chinese: '治疗疾病的物质', english: 'medicine; medication' },
      { word: '注射', pinyin: 'zhù shè', chinese: '用针管把药物注入身体', english: 'injection; shot' },
      { word: '康复', pinyin: 'kāng fù', chinese: '从疾病中恢复健康', english: 'recovery; heal' },
      { word: '体温', pinyin: 'tǐ wēn', chinese: '身体的温度', english: 'body temperature' },
      { word: '处方', pinyin: 'chǔ fāng', chinese: '医生开的药单', english: 'prescription' }
    ],
    gameQuestions: [
      { text: '小明感冒了，妈妈带他去___。', english: 'Xiao Ming caught a cold, so mom took him to the ___.', answer: '医院', answerEnglish: 'hospital', options: ['医院', '医生', '护士', '药物'], optionsEnglish: ['hospital', 'doctor', 'nurse', 'medicine'] },
      { text: '___仔细地给他检查身体。', english: 'The ___ carefully examined his body.', answer: '医生', answerEnglish: 'doctor', options: ['生病', '医生', '检查', '注射'], optionsEnglish: ['get sick', 'doctor', 'examine', 'injection'] },
      { text: '___帮忙测量体温。', english: 'The ___ helped measure body temperature.', answer: '护士', answerEnglish: 'nurse', options: ['护士', '康复', '体温', '处方'], optionsEnglish: ['nurse', 'recovery', 'body temperature', 'prescription'] },
      { text: '因为___，所以要去看医生。', english: 'Because of ___, he needs to see a doctor.', answer: '生病', answerEnglish: 'getting sick', options: ['医院', '生病', '医生', '护士'], optionsEnglish: ['hospital', 'getting sick', 'doctor', 'nurse'] },
      { text: '医生要先___病情。', english: 'The doctor needs to first ___ the condition.', answer: '检查', answerEnglish: 'examine', options: ['药物', '注射', '检查', '康复'], optionsEnglish: ['medicine', 'injection', 'examine', 'recovery'] },
      { text: '医生给他开了一些___。', english: 'The doctor gave him some ___.', answer: '药物', answerEnglish: 'medicine', options: ['体温', '处方', '药物', '生病'], optionsEnglish: ['body temperature', 'prescription', 'medicine', 'get sick'] },
      { text: '护士给小明打了一针___。', english: 'The nurse gave Xiao Ming an ___.', answer: '注射', answerEnglish: 'injection', options: ['检查', '注射', '医院', '医生'], optionsEnglish: ['examine', 'injection', 'hospital', 'doctor'] },
      { text: '吃药后，小明很快___了。', english: 'After taking medicine, Xiao Ming quickly ___.', answer: '康复', answerEnglish: 'recovered', options: ['护士', '康复', '药物', '注射'], optionsEnglish: ['nurse', 'recovered', 'medicine', 'injection'] },
      { text: '护士先测量他的___。', english: 'The nurse first measured his ___.', answer: '体温', answerEnglish: 'body temperature', options: ['体温', '生病', '检查', '处方'], optionsEnglish: ['body temperature', 'get sick', 'examine', 'prescription'] },
      { text: '医生写了一张___。', english: 'The doctor wrote a ___.', answer: '处方', answerEnglish: 'prescription', options: ['康复', '医院', '处方', '体温'], optionsEnglish: ['recovery', 'hospital', 'prescription', 'body temperature'] }
    ],
    chineseSentences: [
      '小东昨天晚上开始发烧，感觉很不舒服。',
      '早上妈妈发现他生病了，赶紧带他去医院。',
      '到了医院，护士先帮他测量体温。',
      '医生仔细地检查了小东的身体状况。',
      '医生说小东得了感冒，需要吃药治疗。',
      '护士给小东打了一针退烧的注射。',
      '医生开了处方，让他去买药物。',
      '妈妈按照医生的建议给小东吃药。',
      '几天后，小东完全康复了。',
      '这次经历让小东明白了健康的重要性。'
    ],
    englishSentences: [
      'Xiao Dong started having a fever last night and felt very uncomfortable.',
      'In the morning, mom found that he was sick and quickly took him to the hospital.',
      'At the hospital, the nurse first helped measure his body temperature.',
      'The doctor carefully examined Xiao Dong\'s physical condition.',
      'The doctor said Xiao Dong had a cold and needed to take medicine for treatment.',
      'The nurse gave Xiao Dong an injection to reduce the fever.',
      'The doctor wrote a prescription and asked him to buy medicine.',
      'Mom gave Xiao Dong medicine according to the doctor\'s advice.',
      'A few days later, Xiao Dong completely recovered.',
      'This experience made Xiao Dong understand the importance of health.'
    ]
  };

  // 第十二篇数据
  const chapter12Data = {
    vocabulary: [
      { word: '环保', pinyin: 'huán bǎo', chinese: '保护环境，不污染自然', english: 'environmental protection' },
      { word: '垃圾', pinyin: 'lā jī', chinese: '不要的废物', english: 'garbage; trash' },
      { word: '回收', pinyin: 'huí shōu', chinese: '重新利用废旧物品', english: 'recycle' },
      { word: '节约', pinyin: 'jié yuē', chinese: '不浪费，省着用', english: 'save; conserve' },
      { word: '植树', pinyin: 'zhí shù', chinese: '种植树木', english: 'plant trees' },
      { word: '污染', pinyin: 'wū rǎn', chinese: '使环境变脏变坏', english: 'pollution; pollute' },
      { word: '绿色', pinyin: 'lǜ sè', chinese: '环保的，对环境友好的', english: 'green; eco-friendly' },
      { word: '能源', pinyin: 'néng yuán', chinese: '提供能量的资源', english: 'energy' },
      { word: '地球', pinyin: 'dì qiú', chinese: '我们生活的星球', english: 'Earth' },
      { word: '未来', pinyin: 'wèi lái', chinese: '将要到来的时间', english: 'future' }
    ],
    gameQuestions: [
      { text: '我们要保护___，爱护环境。', english: 'We need to protect ___ and care for the environment.', answer: '地球', answerEnglish: 'Earth', options: ['地球', '垃圾', '污染', '未来'], optionsEnglish: ['Earth', 'garbage', 'pollution', 'future'] },
      { text: '不要随便扔___。', english: 'Don\'t throw ___ everywhere.', answer: '垃圾', answerEnglish: 'garbage', options: ['环保', '垃圾', '回收', '节约'], optionsEnglish: ['environmental protection', 'garbage', 'recycle', 'save'] },
      { text: '塑料瓶可以___利用。', english: 'Plastic bottles can be ___.', answer: '回收', answerEnglish: 'recycled', options: ['植树', '污染', '回收', '绿色'], optionsEnglish: ['plant trees', 'pollution', 'recycled', 'green'] },
      { text: '我们应该___用水。', english: 'We should ___ water.', answer: '节约', answerEnglish: 'save', options: ['节约', '能源', '地球', '未来'], optionsEnglish: ['save', 'energy', 'Earth', 'future'] },
      { text: '春天是___的好季节。', english: 'Spring is a good season for ___.', answer: '植树', answerEnglish: 'planting trees', options: ['环保', '垃圾', '植树', '回收'], optionsEnglish: ['environmental protection', 'garbage', 'planting trees', 'recycle'] },
      { text: '工厂的废气会___空气。', english: 'Factory exhaust will ___ the air.', answer: '污染', answerEnglish: 'pollute', options: ['节约', '污染', '绿色', '能源'], optionsEnglish: ['save', 'pollute', 'green', 'energy'] },
      { text: '我们要选择___的生活方式。', english: 'We should choose a ___ lifestyle.', answer: '绿色', answerEnglish: 'green', options: ['植树', '污染', '绿色', '地球'], optionsEnglish: ['plant trees', 'pollution', 'green', 'Earth'] },
      { text: '太阳___是清洁能源。', english: 'Solar ___ is clean energy.', answer: '能源', answerEnglish: 'energy', options: ['未来', '环保', '能源', '垃圾'], optionsEnglish: ['future', 'environmental protection', 'energy', 'garbage'] },
      { text: '___是我们共同的家园。', english: '___ is our common home.', answer: '地球', answerEnglish: 'Earth', options: ['地球', '回收', '节约', '植树'], optionsEnglish: ['Earth', 'recycle', 'save', 'plant trees'] },
      { text: '为了___，我们要环保。', english: 'For the ___, we need to protect the environment.', answer: '未来', answerEnglish: 'future', options: ['污染', '绿色', '能源', '未来'], optionsEnglish: ['pollution', 'green', 'energy', 'future'] }
    ],
    chineseSentences: [
      '环保是每个人的责任。',
      '我们不应该随便乱扔垃圾。',
      '学会回收利用是很重要的。',
      '节约用水用电可以保护环境。',
      '每年春天，学校都组织同学们植树。',
      '汽车尾气会污染空气。',
      '我们要选择绿色环保的产品。',
      '太阳能是一种清洁能源。',
      '地球是我们共同的家园。',
      '为了美好的未来，让我们一起保护环境。'
    ],
    englishSentences: [
      'Environmental protection is everyone\'s responsibility.',
      'We should not throw garbage everywhere.',
      'Learning to recycle is very important.',
      'Saving water and electricity can protect the environment.',
      'Every spring, the school organizes students to plant trees.',
      'Car exhaust pollutes the air.',
      'We should choose green and eco-friendly products.',
      'Solar energy is a clean energy source.',
      'Earth is our common home.',
      'For a beautiful future, let\'s protect the environment together.'
    ]
  };

  const encouragementWords = [
    '很厉害！', '你棒棒的！', '加油下一题！', '太棒了！', 
    '继续加油！', '你真聪明！', '做得很好！', '真厉害！',
    '超级棒！', '你太厉害了！'
  ];

  // 检测Apple设备
  const isAppleDevice = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);

  // 文字转语音功能
  const speakText = (text, language = 'zh-CN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      let cleanText = text;
      
      if (language === 'zh-CN') {
        cleanText = cleanText.replace(/\s*[\/\|]\s*[a-zA-Z].*/g, '');
      } else {
        cleanText = cleanText.replace(/[\/\|]/g, ' ');
      }
      
      cleanText = cleanText.replace(/_/g, ' ')
                          .replace(/underscore/gi, '')
                          .replace(/\bslash\b/gi, '')
                          .replace(/\s+/g, ' ')
                          .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;
      
      if (isAppleDevice) {
        utterance.volume = 1.0;
        utterance.rate = 0.7;
      }
      
      window.speechSynthesis.speak(utterance);
      return utterance;
    } else {
      if (isAppleDevice) {
        alert('Apple设备语音功能受限，请：\n1. 检查静音开关\n2. 调高音量\n3. 尝试多次点击\n4. 建议使用Chrome浏览器');
      } else {
        alert('您的浏览器不支持语音功能');
      }
      return null;
    }
  };

  const getCurrentData = () => {
    if (currentChapter === 'chapter1') return chapter1Data;
    if (currentChapter === 'chapter2') return chapter2Data;
    if (currentChapter === 'chapter3') return chapter3Data;
    if (currentChapter === 'chapter4') return chapter4Data;
    if (currentChapter === 'chapter5') return chapter5Data;
    if (currentChapter === 'chapter6') return chapter6Data;
    if (currentChapter === 'chapter7') return chapter7Data;
    if (currentChapter === 'chapter8') return chapter8Data;
    if (currentChapter === 'chapter9') return chapter9Data;
    if (currentChapter === 'chapter10') return chapter10Data;
    if (currentChapter === 'chapter11') return chapter11Data;
    if (currentChapter === 'chapter12') return chapter12Data;
    return chapter1Data; // Default fallback
  };

  const resetChapterData = () => {
    setCurrentPhase('learning');
    setCurrentWordIndex(0);
    setViewedChinese(false);
    setViewedEnglish(false);
    setGameAnswers({});
    setWrongCount(0);
    setCurrentQuestion(0);
    setGameCompleted(false);
    setReadingLanguage('');
    setCurrentSentence(-1);
    setIsReading(false);
  };

  const handleChapterSelect = (chapter) => {
    setCurrentChapter(chapter);
    resetChapterData();
  };

  const backToMenu = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentChapter('menu');
    resetChapterData();
  };

  const chapterTitle = currentChapter === 'chapter1' ? '第一篇：华国的办法' : 
                      currentChapter === 'chapter2' ? '第二篇：好朋友' : 
                      currentChapter === 'chapter3' ? '第三篇：小狗的家' :
                      currentChapter === 'chapter4' ? '第四篇：旅行记' :
                      currentChapter === 'chapter5' ? '第五篇：厨房小帮手' :
                      currentChapter === 'chapter6' ? '第六篇：图书馆之行' :
                      currentChapter === 'chapter7' ? '第七篇：运动健将' :
                      currentChapter === 'chapter8' ? '第八篇：春天来了' :
                      currentChapter === 'chapter9' ? '第九篇：生日快乐' :
                      currentChapter === 'chapter10' ? '第十篇：超市购物' :
                      currentChapter === 'chapter11' ? '第十一篇：看医生' :
                      currentChapter === 'chapter12' ? '第十二篇：环保小卫士' : '学习章节';

  const handleViewChinese = () => {
    setViewedChinese(true);
    speakText(getCurrentData().vocabulary[currentWordIndex].chinese);
  };

  const handleViewEnglish = () => {
    setViewedEnglish(true);
    speakText(getCurrentData().vocabulary[currentWordIndex].english, 'en-US');
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setViewedChinese(false);
      setViewedEnglish(false);
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < getCurrentData().vocabulary.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setViewedChinese(false);
      setViewedEnglish(false);
    } else {
      setCurrentPhase('game');
    }
  };

  const handleGameAnswer = (selectedAnswer) => {
    const currentQ = getCurrentData().gameQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.answer;
    
    if (isCorrect) {
      const randomEncouragement = encouragementWords[Math.floor(Math.random() * encouragementWords.length)];
      alert(randomEncouragement);
      speakText(randomEncouragement);
      
      setGameAnswers({...gameAnswers, [currentQuestion]: selectedAnswer});
      setWrongCount(0);
      
      if (currentQuestion < getCurrentData().gameQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameCompleted(true);
        setCurrentPhase('reading');
      }
    } else {
      const newWrongCount = wrongCount + 1;
      setWrongCount(newWrongCount);
      
      if (newWrongCount >= 3) {
        alert('需要重新开始练习！');
        speakText('需要重新开始练习！');
        setCurrentQuestion(0);
        setGameAnswers({});
        setWrongCount(0);
      } else {
        alert('答错了，再试试！');
        speakText('答错了，再试试！');
      }
    }
  };

  // Main menu page
  if (currentChapter === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                🎓 中文学习天地 🎓
              </h1>
              <h2 className="text-3xl font-semibold text-gray-600 mb-2">
                Chinese Learning Paradise - Complete Edition!
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                选择你想学习的篇章 / Choose Your Learning Chapter
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {/* Chapter 1 */}
              <div className="bg-gradient-to-br from-orange-50 to-red-100 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">⚽</div>
                  <h3 className="text-lg font-bold text-orange-700 mb-1">第一篇：华国的办法</h3>
                  <h4 className="text-sm font-semibold text-orange-600 mb-2">Chapter 1: Hua Guo's Solution</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于解决问题的10个词汇<br/>
                    Learn 10 problem-solving words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter1')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 2 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">👫</div>
                  <h3 className="text-lg font-bold text-blue-700 mb-1">第二篇：好朋友</h3>
                  <h4 className="text-sm font-semibold text-blue-600 mb-2">Chapter 2: Good Friends</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于友谊的10个词汇<br/>
                    Learn 10 friendship words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter2')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 3 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🐕</div>
                  <h3 className="text-lg font-bold text-green-700 mb-1">第三篇：小狗的家</h3>
                  <h4 className="text-sm font-semibold text-green-600 mb-2">Chapter 3: Puppy's Home</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于温暖和关爱的10个词汇<br/>
                    Learn 10 warmth and care words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter3')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 4 */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">✈️</div>
                  <h3 className="text-lg font-bold text-purple-700 mb-1">第四篇：旅行记</h3>
                  <h4 className="text-sm font-semibold text-purple-600 mb-2">Chapter 4: Travel Story</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于旅行的10个词汇<br/>
                    Learn 10 travel words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter4')}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 5 */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-4 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">👩‍🍳</div>
                  <h3 className="text-lg font-bold text-yellow-700 mb-1">第五篇：厨房小帮手</h3>
                  <h4 className="text-sm font-semibold text-yellow-600 mb-2">Chapter 5: Kitchen Helper</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于厨房的10个词汇<br/>
                    Learn 10 kitchen words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter5')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 6 */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="text-lg font-bold text-indigo-700 mb-1">第六篇：图书馆之行</h3>
                  <h4 className="text-sm font-semibold text-indigo-600 mb-2">Chapter 6: Library Visit</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于图书馆的10个词汇<br/>
                    Learn 10 library words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter6')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 7 */}
              <div className="bg-gradient-to-br from-red-50 to-pink-100 p-4 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">⚽</div>
                  <h3 className="text-lg font-bold text-red-700 mb-1">第七篇：运动健将</h3>
                  <h4 className="text-sm font-semibold text-red-600 mb-2">Chapter 7: Sports Champion</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于运动的10个词汇<br/>
                    Learn 10 sports words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter7')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 8 */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-4 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🌸</div>
                  <h3 className="text-lg font-bold text-emerald-700 mb-1">第八篇：春天来了</h3>
                  <h4 className="text-sm font-semibold text-emerald-600 mb-2">Chapter 8: Spring Arrives</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于春天的10个词汇<br/>
                    Learn 10 spring words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter8')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 9 */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-4 rounded-xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🎂</div>
                  <h3 className="text-lg font-bold text-pink-700 mb-1">第九篇：生日快乐</h3>
                  <h4 className="text-sm font-semibold text-pink-600 mb-2">Chapter 9: Happy Birthday</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于生日的10个词汇<br/>
                    Learn 10 birthday words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter9')}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 10 */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-4 rounded-xl border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🛒</div>
                  <h3 className="text-lg font-bold text-cyan-700 mb-1">第十篇：超市购物</h3>
                  <h4 className="text-sm font-semibold text-cyan-600 mb-2">Chapter 10: Supermarket Shopping</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于购物的10个词汇<br/>
                    Learn 10 shopping words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter10')}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 11 */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-4 rounded-xl border-2 border-teal-200 hover:border-teal-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">👩‍⚕️</div>
                  <h3 className="text-lg font-bold text-teal-700 mb-1">第十一篇：看医生</h3>
                  <h4 className="text-sm font-semibold text-teal-600 mb-2">Chapter 11: Seeing the Doctor</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于医院的10个词汇<br/>
                    Learn 10 hospital words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter11')}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>

              {/* Chapter 12 */}
              <div className="bg-gradient-to-br from-lime-50 to-green-100 p-4 rounded-xl border-2 border-lime-200 hover:border-lime-400 transition-all duration-300 hover:shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="text-lg font-bold text-lime-700 mb-1">第十二篇：环保小卫士</h3>
                  <h4 className="text-sm font-semibold text-lime-600 mb-2">Chapter 12: Eco Guardian</h4>
                  <p className="text-gray-600 mb-3 text-xs">
                    学习关于环保的10个词汇<br/>
                    Learn 10 environmental words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter12')}
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  开始学习
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  💡 学习说明 / Learning Instructions
                </h3>
                <div className="text-gray-600 text-left max-width-4xl mx-auto space-y-2">
                  <p>• 📚 <strong>词汇学习</strong>：学习新词汇的发音和含义 / <strong>Vocabulary Learning</strong>: Learn pronunciation and meaning</p>
                  <p>• 🎮 <strong>填空练习</strong>：通过练习题巩固学习 / <strong>Fill-in-the-blank</strong>: Reinforce learning with exercises</p>
                  <p>• 📖 <strong>作文朗读</strong>：朗读完整故事提高理解 / <strong>Essay Reading</strong>: Read complete stories for comprehension</p>
                  <p>• 🎵 <strong>语音功能</strong>：所有内容都可以朗读 / <strong>Audio Feature</strong>: All content can be read aloud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vocabulary learning phase
  if (currentPhase === 'learning') {
    const currentWord = getCurrentData().vocabulary[currentWordIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                <BookOpen className="w-8 h-8" />
                词汇学习 - {chapterTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-lg text-gray-600">
                  {currentWordIndex + 1} / {getCurrentData().vocabulary.length}
                </div>
                <button
                  onClick={backToMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  返回主页
                </button>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {currentWord.word}
              </div>
              <div className="text-2xl text-gray-500 mb-4">{currentWord.pinyin}</div>
              
              <button
                onClick={() => speakText(currentWord.word)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mb-6 transition-colors"
              >
                朗读词语
              </button>
              
              <div className="space-y-4">
                {viewedChinese ? (
                  <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-lg"><strong>中文解释：</strong>{currentWord.chinese}</p>
                  </div>
                ) : (
                  <button
                    onClick={handleViewChinese}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                  >
                    查看华语解释
                  </button>
                )}
                
                {viewedEnglish ? (
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg"><strong>English:</strong> {currentWord.english}</p>
                  </div>
                ) : (
                  <button
                    onClick={handleViewEnglish}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                  >
                    查看英文解释
                  </button>
                )}
                
                {viewedChinese && viewedEnglish ? (
                  <div className="flex justify-center gap-4">
                    {currentWordIndex > 0 && (
                      <button
                        onClick={handlePreviousWord}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
                      >
                        返回上一词汇
                      </button>
                    )}
                    <button
                      onClick={handleNextWord}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
                    >
                      {currentWordIndex < getCurrentData().vocabulary.length - 1 ? '下一个词汇' : '开始练习'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">请先查看华语和英文解释</p>
                    {currentWordIndex > 0 && (
                      <button
                        onClick={handlePreviousWord}
                        className="mt-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        返回上一词汇
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game phase
  if (currentPhase === 'game') {
    const currentQ = getCurrentData().gameQuestions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-green-600 flex items-center gap-2">
                <Gamepad2 className="w-8 h-8" />
                填空练习 - {chapterTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-lg text-gray-600">
                  第 {currentQuestion + 1} 题 / {getCurrentData().gameQuestions.length}
                </div>
                <button
                  onClick={backToMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  返回主页
                </button>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="space-y-4 mb-8">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl text-gray-800 flex-1">{currentQ.text}</span>
                    <button
                      onClick={() => speakText(currentQ.text)}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full ml-4 transition-colors"
                      title="朗读中文题目"
                    >
                      <Speaker className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-600 flex-1">{currentQ.english}</span>
                    <button
                      onClick={() => speakText(currentQ.english, 'en-US')}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full ml-4 transition-colors"
                      title="朗读英文题目"
                    >
                      <Speaker className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <button
                      onClick={() => handleGameAnswer(option)}
                      className="flex-1 text-left bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-lg font-semibold transition-colors"
                    >
                      {option} ({currentQ.optionsEnglish[index]})
                    </button>
                  </div>
                ))}
              </div>
              
              {wrongCount > 0 && (
                <div className="mt-4 text-red-500 font-semibold">
                  错误次数: {wrongCount}/3
                </div>
              )}
              
              <button
                onClick={() => setCurrentPhase('learning')}
                className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                返回词汇学习
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reading phase
  if (currentPhase === 'reading') {
    const currentData = getCurrentData();
    
    // If no reading language selected, show language selection
    if (!readingLanguage) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                  <BookOpen className="w-8 h-8" />
                  作文朗读 - {chapterTitle}
                </h1>
                <button
                  onClick={backToMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  返回主页
                </button>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-8">选择阅读语言 / Choose Reading Language</h2>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    onClick={() => {
                      setReadingLanguage('chinese');
                      setCurrentSentence(0);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">🇨🇳</span>
                    中文朗读
                  </button>
                  
                  <button
                    onClick={() => {
                      setReadingLanguage('english');
                      setCurrentSentence(0);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <span className="text-2xl">🇺🇸</span>
                    English Reading
                  </button>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                  <p className="text-gray-600">
                    📖 恭喜完成填空练习！现在可以阅读完整的故事了。<br/>
                    🎉 Congratulations on completing the fill-in exercises! Now you can read the complete story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Reading interface
    const sentences = readingLanguage === 'chinese' ? currentData.chineseSentences : currentData.englishSentences;
    const currentSentenceText = sentences[currentSentence];
    const language = readingLanguage === 'chinese' ? 'zh-CN' : 'en-US';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                <BookOpen className="w-8 h-8" />
                {readingLanguage === 'chinese' ? '中文朗读' : 'English Reading'} - {chapterTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-lg text-gray-600">
                  {currentSentence + 1} / {sentences.length}
                </div>
                <button
                  onClick={() => {
                    setReadingLanguage('');
                    setCurrentSentence(-1);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  重选语言
                </button>
                <button
                  onClick={backToMenu}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  返回主页
                </button>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 mb-6">
                <p className="text-xl text-gray-800 leading-relaxed mb-4">
                  {currentSentenceText}
                </p>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => speakText(currentSentenceText, language)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    disabled={isReading}
                  >
                    <Volume2 className="w-5 h-5" />
                    {isReading ? '朗读中...' : '朗读句子'}
                  </button>
                  
                  <button
                    onClick={() => {
                      const fullText = sentences.join(' ');
                      speakText(fullText, language);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    朗读全文
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                {currentSentence > 0 && (
                  <button
                    onClick={() => setCurrentSentence(currentSentence - 1)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    上一句
                  </button>
                )}
                
                {currentSentence < sentences.length - 1 ? (
                  <button
                    onClick={() => setCurrentSentence(currentSentence + 1)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
                  >
                    下一句
                  </button>
                ) : (
                  <button
                    onClick={backToMenu}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
                  >
                    完成学习
                  </button>
                )}
              </div>
              
              {/* Progress bar */}
              <div className="mt-8">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSentence + 1) / sentences.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  阅读进度: {Math.round(((currentSentence + 1) / sentences.length) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default fallback (should not reach here)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">加载中...</h1>
          <button
            onClick={backToMenu}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors"
          >
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChineseLearningCompleteApp;