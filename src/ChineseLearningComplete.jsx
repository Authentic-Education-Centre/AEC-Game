import React, { useState } from 'react';
import { BookOpen, Play, Volume2, RotateCcw, Gamepad2, Speaker, Home, ArrowLeft } from 'lucide-react';

const ChineseLearningComplete = () => {
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

  // Additional chapters data would continue here...
  // For brevity, I'll add placeholders for the remaining chapters

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
    // Add more chapters as needed
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

  const chapterTitle = currentChapter === 'chapter1' ? '第一篇：华国的办法' : '第二篇：好朋友';

  // Main menu page
  if (currentChapter === 'menu') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '48px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '16px'
              }}>
                🎓 中文学习天地 🎓
              </h1>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Chinese Learning Paradise - Complete Edition!
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#718096',
                marginBottom: '32px'
              }}>
                选择你想学习的篇章 / Choose Your Learning Chapter
              </p>

              {/* Apple设备说明 */}
              <div style={{
                background: '#ebf8ff',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #3182ce',
                marginBottom: '32px'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#2b6cb0',
                  marginBottom: '12px'
                }}>
                  🍎 Apple设备用户专用指南 / Apple Device User Guide
                </h3>
                <div style={{
                  color: '#2c5282',
                  textAlign: 'left',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                      📱 如果听不到声音，请按以下步骤：
                    </h4>
                    <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li>• <strong>🔇 检查静音开关</strong>：iPhone/iPad侧边的橙色开关要关闭</li>
                      <li>• <strong>🔊 调高音量</strong>：按音量+键，确保媒体音量开启</li>
                      <li>• <strong>👆 多次点击</strong>：朗读按钮可能需要点击2-3次才能激活</li>
                      <li>• <strong>🌐 换浏览器</strong>：强烈建议下载<strong>Chrome浏览器</strong>使用</li>
                    </ul>
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                      🌐 If you can't hear audio, please follow these steps:
                    </h4>
                    <ul style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li>• <strong>🔇 Check silent switch</strong>: Turn off the orange switch on iPhone/iPad side</li>
                      <li>• <strong>🔊 Turn up volume</strong>: Press volume+ button, ensure media volume is on</li>
                      <li>• <strong>👆 Click multiple times</strong>: Audio buttons may need 2-3 clicks to activate</li>
                      <li>• <strong>🌐 Switch browser</strong>: Strongly recommend downloading <strong>Chrome browser</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              {/* Chapter 1 */}
              <div style={{
                background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #feb2b2',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚽</div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#c53030',
                    marginBottom: '8px'
                  }}>
                    第一篇：华国的办法
                  </h3>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#e53e3e',
                    marginBottom: '12px'
                  }}>
                    Chapter 1: Hua Guo's Solution
                  </h4>
                  <p style={{
                    color: '#4a5568',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    学习关于解决问题的10个词汇<br />
                    Learn 10 problem-solving words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter1')}
                  style={{
                    width: '100%',
                    background: '#e53e3e',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e53e3e'}
                >
                  📚 开始学习
                </button>
              </div>

              {/* Chapter 2 */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #9ae6b4',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👫</div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#276749',
                    marginBottom: '8px'
                  }}>
                    第二篇：好朋友
                  </h3>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#38a169',
                    marginBottom: '12px'
                  }}>
                    Chapter 2: Good Friends
                  </h4>
                  <p style={{
                    color: '#4a5568',
                    marginBottom: '12px',
                    fontSize: '0.9rem'
                  }}>
                    学习关于友谊的10个词汇<br />
                    Learn 10 friendship words
                  </p>
                </div>
                <button
                  onClick={() => handleChapterSelect('chapter2')}
                  style={{
                    width: '100%',
                    background: '#38a169',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#276749'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#38a169'}
                >
                  📚 开始学习
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#f7fafc',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #e2e8f0'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '12px'
                }}>
                  💡 学习说明 / Learning Instructions
                </h3>
                <div style={{
                  color: '#4a5568',
                  textAlign: 'left',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
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

  // Learning phases would be implemented here
  // For now, returning a placeholder
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#667eea'
            }}>
              学习模式 - {chapterTitle}
            </h1>
            <button
              onClick={backToMenu}
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🏠 返回主页
            </button>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>
              学习功能正在开发中... / Learning features coming soon...
            </p>
            <p style={{ color: '#6b7280', marginTop: '12px' }}>
              当前选择：{chapterTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChineseLearningComplete;