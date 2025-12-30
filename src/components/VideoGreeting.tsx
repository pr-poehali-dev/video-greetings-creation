import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const VideoGreeting = () => {
  const [childName, setChildName] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGreeting = () => {
    if (childName.trim()) {
      setShowGreeting(true);
      setTimeout(() => setIsPlaying(true), 500);
    }
  };

  const resetGreeting = () => {
    setShowGreeting(false);
    setIsPlaying(false);
    setChildName('');
  };

  if (!showGreeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
        <Card className="glass max-w-md w-full p-8 animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Sparkles" className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Волшебное поздравление
            </h1>
            <p className="text-muted-foreground">
              От самого настоящего Деда Мороза! 🎅
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="child-name" className="text-lg">
                Как зовут ребёнка?
              </Label>
              <Input
                id="child-name"
                placeholder="Введите имя..."
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="text-lg"
                onKeyPress={(e) => e.key === 'Enter' && startGreeting()}
              />
            </div>
            
            <Button
              onClick={startGreeting}
              disabled={!childName.trim()}
              className="w-full gradient-bg hover:opacity-90 text-lg py-6"
              size="lg"
            >
              <Icon name="Play" size={24} className="mr-2" />
              Запустить волшебство
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/4caed5c9-4fd7-4583-a505-8b2497fdb6a9/files/cfbc1a69-350e-4e65-9c55-e1b1236a2bfc.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="snowflakes absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="snowflake absolute text-white text-2xl animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.7
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-4xl w-full transition-all duration-1000 ${isPlaying ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <Card className="glass overflow-hidden">
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/4caed5c9-4fd7-4583-a505-8b2497fdb6a9/files/833f525b-4ce1-4685-b15e-ce025e94a838.jpg"
                alt="Дед Мороз"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <Button
                  onClick={resetGreeting}
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className={`text-center space-y-4 transition-all duration-1000 delay-500 ${isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Здравствуй, <span className="gradient-text">{childName}</span>! 🎄
                </h2>
              </div>

              <div className={`space-y-4 text-lg text-white/90 transition-all duration-1000 delay-1000 ${isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="leading-relaxed">
                  Это я — Дед Мороз, пишу тебе из своего волшебного дома в Великом Устюге! 🏔️
                </p>
                
                <p className="leading-relaxed">
                  Мои помощники-гномики рассказали мне, что ты в этом году был(а) очень хорошим ребёнком! 
                  Ты помогал(а) родителям, хорошо учился(ась) и был(а) добр(а) к друзьям. Я очень горжусь тобой! ⭐
                </p>
                
                <p className="leading-relaxed">
                  Снегурочка уже упаковывает для тебя особенный подарок, а мои волшебные олени готовятся к путешествию! 
                  В Новогоднюю ночь я обязательно загляну к тебе, пока ты спишь. 🦌✨
                </p>
                
                <p className="leading-relaxed font-semibold text-xl gradient-text">
                  Загадай самое заветное желание, и оно обязательно сбудется! 
                </p>
                
                <p className="leading-relaxed">
                  С Новым Годом, {childName}! Пусть он принесёт тебе море радости, смеха и волшебства! 🎁🎉
                </p>
              </div>

              <div className={`flex justify-center gap-4 pt-4 transition-all duration-1000 delay-1500 ${isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎅</div>
                  <p className="text-sm text-white/70">Твой Дед Мороз</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">❄️</div>
                  <p className="text-sm text-white/70">Великий Устюг</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎄</div>
                  <p className="text-sm text-white/70">2024</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  onClick={() => setIsPlaying(false)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Посмотреть снова
                </Button>
                <Button
                  onClick={resetGreeting}
                  className="flex-1 gradient-bg hover:opacity-90"
                  size="lg"
                >
                  <Icon name="Home" size={20} className="mr-2" />
                  Создать новое
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VideoGreeting;
