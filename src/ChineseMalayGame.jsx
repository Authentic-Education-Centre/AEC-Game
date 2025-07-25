import React, { useState, useEffect, useCallback } from 'react';

const ChineseMalayGame = () => {
  const wordPairs = [
    { chinese: '交通工具', malay: 'kenderaan' },
    { chinese: '状况', malay: 'situasi' },
    { chinese: '安全带', malay: 'tali pinggang keledar' },
    { chinese: '出发', malay: 'bertolak' },
    { chinese: '标签', malay: 'label' },
    { chinese: '零食', malay: 'makanan ringan' },
    { chinese: '材料', malay: 'ramuan' },
    { chinese: '色素', malay: 'pewarna' },
    { chinese: '防腐剂', malay: 'bahan pengawet' }
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [builtWord, setBuiltWord] = useState('');
  const [fallingLetters, setFallingLetters] = useState([]);
  // 移除了接字器概念，现在是纯点击游戏
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('ready'); // ready, playing, completed
  const [particles, setParticles] = useState([]);
  const [clouds, setClouds] = useState([]);
  // 移除了表情符号状态，现在是纯点击游戏
  const [message, setMessage] = useState('点击开始按钮开始游戏！');
  const [messageType, setMessageType] = useState('');
  
  // 响应式游戏区域尺寸，适应手机和桌面
  const gameWidth = Math.min(Math.min(window.innerWidth * 0.95, 800), 800);
  const gameHeight = Math.max(Math.min(window.innerHeight - 280, 500), 250);
  // 移除了接字器相关变量

  // 初始化游戏
  useEffect(() => {
    const currentPair = wordPairs[currentWordIndex];
    setTargetWord(currentPair.malay);
    setBuiltWord('');
    setLevel(currentWordIndex + 1);
  }, [currentWordIndex]);

  // 初始化云朵
  useEffect(() => {
    const initialClouds = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * gameWidth,
      y: Math.random() * 150 + 30,
      size: Math.random() * 30 + 25,
      speed: Math.random() * 0.3 + 0.1
    }));
    setClouds(initialClouds);
  }, []);

  // 云朵动画
  useEffect(() => {
    const cloudInterval = setInterval(() => {
      setClouds(prev => prev.map(cloud => ({
        ...cloud,
        x: cloud.x > gameWidth ? -cloud.size : cloud.x + cloud.speed
      })));
    }, 100);
    return () => clearInterval(cloudInterval);
  }, []);

  // 中文语音播放
  const speakChinese = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = speechSynthesis.getVoices();
      const chineseVoice = voices.find(voice => 
        voice.lang.includes('zh') || voice.name.includes('Chinese')
      );
      
      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }
      
      utterance.onstart = () => {
        showMessage('🔊 正在播放中文发音...', 'success');
      };
      
      utterance.onend = () => {
        if (gameState === 'playing') {
          showMessage('点击掉落的字母来拼出马来文单词！', 'success');
        }
      };
      
      utterance.onerror = () => {
        showMessage(`语音播放失败。中文词语是: ${text}`, 'error');
      };
      
      try {
        speechSynthesis.speak(utterance);
      } catch (error) {
        showMessage(`语音不可用。中文词语是: ${text}`, 'error');
      }
    } else {
      showMessage(`语音不支持。中文词语是: ${text}`, 'error');
    }
  };

  // 显示消息
  const showMessage = (text, type = '') => {
    setMessage(text);
    setMessageType(type);
  };

  // 生成彩色字母
  const getLetterColor = (letter) => {
    const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  // 生成随机字母
  const generateRandomLetter = () => {
    const nextNeededLetter = targetWord[builtWord.length];
    const allLetters = 'abcdefghijklmnopqrstuvwxyz ';
    
    // 增加到85%几率给出正确字母，确保有足够的关键字母
    if (Math.random() < 0.85 && nextNeededLetter) {
      return nextNeededLetter;
    } else {
      return allLetters[Math.floor(Math.random() * allLetters.length)];
    }
  };

  // 创建华丽的彩带庆祝效果
  const createConfetti = (x, y) => {
    const confettiEmojis = ['🎉', '🎊', '✨', '🌟', '⭐', '💫', '🎈', '🎆', '🎇', '🎁', '🏆', '🥳'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 8,
      life: 1,
      color: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      size: Math.random() * 20 + 15,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 30
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  // 更新彩带动画
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.8, // 更强的重力
        vx: particle.vx * 0.95, // 空气阻力
        rotation: particle.rotation + particle.rotationSpeed,
        rotationSpeed: particle.rotationSpeed * 0.98,
        life: particle.life - 0.012
      })).filter(particle => particle.life > 0));
    }, 30); // 更流畅的动画
    return () => clearInterval(particleInterval);
  }, []);

  // 移除了键盘左右移动控制，现在只使用点击操作

  // 生成掉落字母
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const interval = setInterval(() => {
      const letter = generateRandomLetter();
      const newLetter = {
        id: Date.now(),
        letter: letter,
        x: Math.random() * (gameWidth - 50),
        y: -30,
        speed: 2.5 + Math.random() * 1.5, // 增加掉落速度
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5, // 减慢旋转
        color: getLetterColor(letter),
        wobble: Math.random() * Math.PI * 2
      };
      setFallingLetters(prev => [...prev, newLetter]);
    }, 1000); // 减少间隔时间，让字母掉落更频繁

    return () => clearInterval(interval);
  }, [gameState, builtWord, targetWord]);

  // 游戏主循环
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const gameLoop = setInterval(() => {
      setFallingLetters(prev => {
        const updated = prev.map(letter => ({
          ...letter,
          y: letter.y + letter.speed,
          rotation: letter.rotation + letter.rotationSpeed,
          wobble: letter.wobble + 0.08, // 减慢摆动
          x: letter.x + Math.sin(letter.wobble) * 0.2 // 减少横向摆动
        }));

        const remaining = [];
        let newScore = score;
        let newBuiltWord = builtWord;

        // 只保留还在屏幕内的字母，移除了碰撞检测系统
        updated.forEach(letter => {
          if (letter.y < gameHeight - 50) {
            remaining.push(letter);
          }
        });

        setScore(newScore);
        setBuiltWord(newBuiltWord);

        return remaining;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, builtWord, targetWord, score]);

  // 检查单词完成 - 大爆发彩带！
  useEffect(() => {
    if (builtWord === targetWord && targetWord && gameState === 'playing') {
      setGameState('completed');
      
      // 全屏幕大爆发彩带！
      setTimeout(() => createConfetti(gameWidth / 2, gameHeight / 2), 100);
      setTimeout(() => createConfetti(gameWidth / 4, gameHeight / 3), 300);
      setTimeout(() => createConfetti((gameWidth * 3) / 4, gameHeight / 3), 500);
      setTimeout(() => createConfetti(gameWidth / 2, gameHeight / 4), 700);
      
      showMessage(`🎆 完成了！单词: ${targetWord} 🎆`, 'success');
    }
  }, [builtWord, targetWord, gameState]);

  // 开始游戏
  const startGame = () => {
    setGameState('playing');
    setBuiltWord('');
    setFallingLetters([]);
    setParticles([]); // 清除之前的彩带
    
    const currentPair = wordPairs[currentWordIndex];
    speakChinese(currentPair.chinese);
  };

  // 重置单词
  const resetWord = () => {
    setGameState('ready');
    setBuiltWord('');
    setFallingLetters([]);
    setParticles([]); // 清除彩带
    showMessage('点击开始按钮开始游戏！', '');
  };

  // 下一个单词
  const nextWord = () => {
    const nextIndex = (currentWordIndex + 1) % wordPairs.length;
    setCurrentWordIndex(nextIndex);
    setGameState('ready');
    setBuiltWord('');
    setFallingLetters([]);
    setParticles([]); // 清除彩带
    showMessage(`第 ${nextIndex + 1} 关！点击开始！`, '');
  };

  // 重复播放中文
  const repeatChinese = () => {
    const currentPair = wordPairs[currentWordIndex];
    speakChinese(currentPair.chinese);
  };

  const currentPair = wordPairs[currentWordIndex];

  return (
    <div className="flex flex-col items-center p-1 sm:p-2 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 h-screen overflow-hidden">
      <h1 className="text-lg sm:text-2xl font-bold text-white mb-1 drop-shadow-lg text-center">
        🎮 中文马来文字母游戏 🎮
      </h1>
      
      <p className="text-white text-xs sm:text-sm mb-1 text-center bg-white bg-opacity-20 px-2 sm:px-4 py-1 rounded-full backdrop-blur">
        看中文词语，点击字母拼出马来文单词！
      </p>

      {/* 游戏信息 */}
      <div className="flex gap-2 mb-1 text-white font-bold flex-wrap justify-center text-xs sm:text-sm">
        <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full backdrop-blur">
          关卡:{level}🎯
        </div>
        <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full backdrop-blur">
          得分:{score}🏆
        </div>
        <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full backdrop-blur">
          进度:{builtWord.length}/{targetWord.length}📝
        </div>
      </div>

      {/* 中文词语显示 */}
      <div className="bg-gradient-to-br from-yellow-300 to-orange-400 px-3 py-1 rounded-xl mb-1 shadow-lg border-2 border-white">
        <div className="text-xl sm:text-2xl font-bold text-red-800 drop-shadow-lg text-center">
          {currentPair.chinese}
        </div>
      </div>

      {/* 游戏区域 */}
      <div 
        className="relative border-2 border-white rounded-lg overflow-hidden shadow-xl mb-1 w-full max-w-4xl mx-auto flex-1"
        style={{ 
          width: `min(95vw, 800px)`, 
          height: `calc(100vh - 280px)`, 
          maxHeight: '500px',
          minHeight: '250px',
          background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 70%, #90EE90 100%)' 
        }}
      >
        {/* 云朵 */}
        {clouds.map(cloud => (
          <div
            key={cloud.id}
            className="absolute text-white opacity-60"
            style={{ 
              left: cloud.x, 
              top: cloud.y, 
              fontSize: cloud.size,
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          >
            ☁️
          </div>
        ))}

        {/* 华丽的彩带庆祝效果 */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none z-20"
            style={{ 
              left: particle.x, 
              top: particle.y,
              opacity: particle.life * 0.9 + 0.1,
              fontSize: particle.size,
              transform: `scale(${particle.life * 1.2}) rotate(${particle.rotation}deg)`,
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4)) brightness(1.2)'
            }}
          >
            {particle.color}
          </div>
        ))}

        {/* 掉落字母 */}
        {fallingLetters.map(letter => (
          <div
            key={letter.id}
            className={`absolute w-12 h-12 ${letter.color} border-3 border-white rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg cursor-pointer hover:scale-110 transition-transform`}
            style={{ 
              left: letter.x, 
              top: letter.y,
              transform: `rotate(${letter.rotation}deg)`,
              filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.3))'
            }}
            onClick={() => {
              const nextNeededLetter = targetWord[builtWord.length];
              if (letter.letter === nextNeededLetter) {
                setBuiltWord(prev => prev + letter.letter);
                setScore(prev => prev + 10);
                
                // 爆发彩带庆祝！
                createConfetti(letter.x + 25, letter.y + 25);
                showMessage('🎉 正确！Betul! 🎉', 'success');
              } else {
                setScore(prev => Math.max(0, prev - 3));
                showMessage('☹️ 错误！Salah! ☹️', 'error');
              }
              
              setFallingLetters(prev => prev.filter(l => l.id !== letter.id));
            }}
          >
            {letter.letter}
          </div>
        ))}

      </div>

      {/* 已拼单词显示 */}
      <div className="bg-white bg-opacity-20 backdrop-blur px-2 py-1 rounded-lg mb-1 min-h-[40px] flex items-center justify-center border border-white w-full max-w-md">
        <div className="text-base sm:text-lg font-bold text-yellow-300 drop-shadow-lg flex items-center text-center">
          {builtWord || '准备开始...'}
        </div>
      </div>

      {/* 消息显示 */}
      <div className={`text-xs sm:text-sm font-bold mb-1 px-2 py-1 rounded-lg min-h-[30px] flex items-center justify-center ${
        messageType === 'success' ? 'bg-green-400 bg-opacity-80 text-white' :
        messageType === 'error' ? 'bg-red-400 bg-opacity-80 text-white' :
        'bg-white bg-opacity-20 text-white'
      }`}>
        {message}
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center mb-1">
        <button
          onClick={startGame}
          disabled={gameState === 'playing'}
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full hover:from-green-500 hover:to-blue-600 disabled:opacity-50 font-bold text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all"
        >
          🔊 开始
        </button>
        
        <button
          onClick={resetWord}
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full hover:from-red-500 hover:to-pink-600 font-bold text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all"
        >
          🔄 重置
        </button>
        
        <button
          onClick={nextWord}
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full hover:from-purple-500 hover:to-indigo-600 font-bold text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all"
        >
          ➡️ 下一
        </button>
        
        <button
          onClick={repeatChinese}
          className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 font-bold text-xs sm:text-sm shadow-lg transform hover:scale-105 transition-all"
        >
          🔊 重复
        </button>
      </div>

      {/* 操作说明 */}
      <div className="text-white text-center bg-white bg-opacity-20 p-1 sm:p-2 rounded-lg backdrop-blur">
        <p className="text-xs sm:text-sm font-bold">🖱️ 点击正确字母！听中文拼马来文</p>
        <p className="text-xs opacity-90">💡 85% 都是正确字母</p>
      </div>
    </div>
  );
};

console.log('Testing new build');
export default ChineseMalayGame;
