import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Trang Config
const ConfigPage = ({ onSubmit }) => {
  const [config, setConfig] = useState({
    maxNumber: '',
    incentive1: '',
    incentive2: '',
    incentive3: '',
    incentive4: '',
    third1: '',
    third2: '',
    second: '',
    first: '',
  });

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: parseInt(e.target.value) || '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Cấu hình Game Quay Số</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Số tối đa:</label>
              <Input
                type="number"
                name="maxNumber"
                value={config.maxNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Giải KK đợt 1:</label>
                <Input
                  type="number"
                  name="incentive1"
                  value={config.incentive1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải KK đợt 2:</label>
                <Input
                  type="number"
                  name="incentive2"
                  value={config.incentive2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải KK đợt 3:</label>
                <Input
                  type="number"
                  name="incentive3"
                  value={config.incentive3}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải KK đợt 4:</label>
                <Input
                  type="number"
                  name="incentive4"
                  value={config.incentive4}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải Ba đợt 1:</label>
                <Input
                  type="number"
                  name="third1"
                  value={config.third1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải Ba đợt 2:</label>
                <Input
                  type="number"
                  name="third2"
                  value={config.third2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải Nhì:</label>
                <Input
                  type="number"
                  name="second"
                  value={config.second}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Giải Nhất:</label>
                <Input
                  type="number"
                  name="first"
                  value={config.first}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Bắt đầu game</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Trang Game
const GamePage = ({ config, onReset }) => {
  const [currentRound, setCurrentRound] = useState('KK Đợt 1');

  const [currentTab, setCurrentTab] = useState('incentive1');
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const tabConfig = {
    incentive1: { label: 'KK Đợt 1', count: config.incentive1 },
    incentive2: { label: 'KK Đợt 2', count: config.incentive2 },
    incentive3: { label: 'KK Đợt 3', count: config.incentive3 },
    incentive4: { label: 'KK Đợt 4', count: config.incentive4 },
    third1: { label: 'Giải Ba Đợt 1', count: config.third1 },
    third2: { label: 'Giải Ba Đợt 2', count: config.third2 },
    second: { label: 'Giải Nhì', count: config.second },
    first: { label: 'Giải Nhất', count: config.first },
  };

  const [resultsByRound, setResultsByRound] = useState({
    incentive1: [], incentive2: [], incentive3: [], incentive4: [],
    third1: [], third2: [], second: [], first: []
  });

  const spinWheel = () => {
    if (isSpinning) return;
    
    // Kiểm tra nếu đợt hiện tại đã quay đủ số lượng
    if (resultsByRound[currentTab].length >= tabConfig[currentTab].count) {
      alert('Đợt này đã quay đủ số lượng!');
      return;
    }
    
    setIsSpinning(true);
    
    const availableNumbers = Array.from(
      { length: config.maxNumber },
      (_, i) => i + 1
    ).filter(num => !drawnNumbers.includes(num));

    if (availableNumbers.length === 0) {
      alert('Đã hết số để quay!');
      setIsSpinning(false);
      return;
    }

    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      setCurrentNumber(availableNumbers[randomIndex]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        const finalNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        setCurrentNumber(finalNumber);
        setDrawnNumbers([...drawnNumbers, finalNumber]);
        
        // Lưu kết quả vào round hiện tại
        setResultsByRound(prev => ({
          ...prev,
          [currentTab]: [...prev[currentTab], finalNumber]
        }));
        
        // Kiểm tra và chuyển round nếu cần
        const currentRoundLimit = tabConfig[currentTab].count;
        if (resultsByRound[currentTab].length + 1 >= currentRoundLimit) {
          const tabs = Object.keys(tabConfig);
          const currentIndex = tabs.indexOf(currentTab);
          if (currentIndex < tabs.length - 1) {
            const nextTab = tabs[currentIndex + 1];
            setCurrentTab(nextTab);
            setCurrentRound(tabConfig[nextTab].label);
          }
        }
        
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-red-500">Game Quay Số May Mắn</h1>
          <Button 
            onClick={onReset}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Reset Game
          </Button>
        </div>
        <div className="text-8xl font-bold mb-6 h-32 flex items-center justify-center">
          {currentNumber || '???'}
        </div>
        <p className="text-gray-600 mb-4">Đang quay: {currentRound}</p>
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning || resultsByRound[currentTab].length >= tabConfig[currentTab].count}
          className={`w-full text-xl px-8 py-4 text-white font-bold rounded-lg transition-all
            ${resultsByRound[currentTab].length >= tabConfig[currentTab].count 
              ? 'bg-gray-400' 
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'}`}
        >
          {isSpinning ? 'Đang quay...' : 
           resultsByRound[currentTab].length >= tabConfig[currentTab].count ? 
           'Đã quay đủ số lượng' : 'Quay số'}
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={(value) => {
          setCurrentTab(value);
          setCurrentRound(tabConfig[value].label);
        }}>
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(tabConfig).map(([key, { label }]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-colors"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tabConfig).map(([key, { count }]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-10 gap-4 p-4 bg-gray-50 rounded-lg">
              {Array.from({ length: count }, (_, i) => {
                const number = resultsByRound[currentTab][i];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg shadow flex items-center justify-center font-semibold text-gray-700
                      ${number ? 'bg-gradient-to-br from-pink-300 to-pink-400' : 'bg-gradient-to-br from-pink-100 to-pink-200'}`}
                  >
                    {number || i + 1}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Kết quả {tabConfig[currentTab].label}:</h4>
              <div className="flex flex-wrap gap-2">
                {resultsByRound[currentTab].map((number, idx) => (
                  <span key={idx} className="px-3 py-1 bg-pink-100 rounded-full text-gray-700">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Các số đã quay:</h3>
        <div className="flex flex-wrap gap-3">
          {drawnNumbers.map((num, index) => (
            <span key={index} className="bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full font-medium text-gray-700">
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Component chính
const LotteryGame = () => {
  const [gameConfig, setGameConfig] = useState(null);
  const [showConfig, setShowConfig] = useState(true);

  const handleReset = () => {
    setGameConfig(null);
    setShowConfig(true);
  };

  return (
    <div>
      {(showConfig || !gameConfig) ? (
        <ConfigPage onSubmit={(config) => {
          setGameConfig(config);
          setShowConfig(false);
        }} />
      ) : (
        <GamePage config={gameConfig} onReset={handleReset} />
      )}
    </div>
  );
};

export default LotteryGame;