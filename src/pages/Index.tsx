import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type ContentType = 'greeting' | 'lyrics' | 'music';

interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  author: string;
  description: string;
  rating: number;
  likes: number;
  category: string;
}

const initialContent: ContentItem[] = [
  {
    id: 1,
    type: 'greeting',
    title: 'С Днём Рождения, мама!',
    author: 'Анна К.',
    description: 'Трогательное видео-поздравление с тёплыми словами благодарности',
    rating: 5,
    likes: 142,
    category: 'День рождения'
  },
  {
    id: 2,
    type: 'lyrics',
    title: 'Летний вечер',
    author: 'Дмитрий М.',
    description: 'Романтичные стихи о любви под звёздным небом',
    rating: 4,
    likes: 89,
    category: 'Романтика'
  },
  {
    id: 3,
    type: 'music',
    title: 'Свадебная мелодия',
    author: 'Елена С.',
    description: 'Нежная инструментальная композиция для первого танца',
    rating: 5,
    likes: 201,
    category: 'Свадьба'
  },
  {
    id: 4,
    type: 'greeting',
    title: 'Поздравление с Новым Годом',
    author: 'Михаил П.',
    description: 'Весёлое корпоративное поздравление с танцами',
    rating: 4,
    likes: 156,
    category: 'Новый год'
  },
  {
    id: 5,
    type: 'lyrics',
    title: 'Моему другу',
    author: 'Ольга Н.',
    description: 'Искренние слова о дружбе и поддержке',
    rating: 5,
    likes: 98,
    category: 'Дружба'
  },
  {
    id: 6,
    type: 'music',
    title: 'Утренняя медитация',
    author: 'Сергей Л.',
    description: 'Спокойная музыка для начала дня',
    rating: 4,
    likes: 67,
    category: 'Релакс'
  }
];

const Index = () => {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'likes'>('likes');

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'greeting': return 'Heart';
      case 'lyrics': return 'FileText';
      case 'music': return 'Music';
    }
  };

  const getTypeLabel = (type: ContentType) => {
    switch (type) {
      case 'greeting': return 'Поздравление';
      case 'lyrics': return 'Текст';
      case 'music': return 'Музыка';
    }
  };

  const filteredContent = content
    .filter(item => activeTab === 'all' || item.type === activeTab)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const handleLike = (id: number) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="glass sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold gradient-text">CreativeHub</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="hover:text-primary transition-colors">Главная</a>
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 transition-opacity">
                <Icon name="Plus" size={20} className="mr-2" />
                Создать
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Создать новый контент</DialogTitle>
                <DialogDescription>
                  Поделитесь своим творчеством с миром
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название</Label>
                  <Input id="title" placeholder="Введите название..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Тип контента</Label>
                  <select id="type" className="w-full px-3 py-2 border rounded-md">
                    <option value="greeting">Поздравление</option>
                    <option value="lyrics">Текст песни</option>
                    <option value="music">Музыка</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Input id="category" placeholder="День рождения, Свадьба..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" placeholder="Расскажите о вашем творении..." rows={4} />
                </div>
                <Button className="w-full gradient-bg hover:opacity-90">
                  Опубликовать
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Создавай и вдохновляй
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Платформа для создания видео-поздравлений, текстов песен и музыки. 
            Делись творчеством и получай признание!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gradient-bg hover:opacity-90 text-lg px-8">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Начать творить
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="Play" size={20} className="mr-2" />
              Посмотреть примеры
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 animate-scale-in hover:scale-105 transition-transform">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Поздравления</h3>
              <p className="text-muted-foreground">Создавайте трогательные видео для близких</p>
            </div>
            <div className="glass rounded-2xl p-6 animate-scale-in hover:scale-105 transition-transform" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Тексты песен</h3>
              <p className="text-muted-foreground">Пишите стихи и слова для музыки</p>
            </div>
            <div className="glass rounded-2xl p-6 animate-scale-in hover:scale-105 transition-transform" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Music" className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Музыка</h3>
              <p className="text-muted-foreground">Сочиняйте мелодии и композиции</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Каталог работ</h2>
            <p className="text-xl text-muted-foreground">Лучшие творения нашего сообщества</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <TabsList className="glass">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="greeting">
                  <Icon name="Heart" size={16} className="mr-2" />
                  Поздравления
                </TabsTrigger>
                <TabsTrigger value="lyrics">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Тексты
                </TabsTrigger>
                <TabsTrigger value="music">
                  <Icon name="Music" size={16} className="mr-2" />
                  Музыка
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'likes' ? 'default' : 'outline'}
                  onClick={() => setSortBy('likes')}
                  size="sm"
                  className={sortBy === 'likes' ? 'gradient-bg' : ''}
                >
                  <Icon name="ThumbsUp" size={16} className="mr-2" />
                  По лайкам
                </Button>
                <Button
                  variant={sortBy === 'rating' ? 'default' : 'outline'}
                  onClick={() => setSortBy('rating')}
                  size="sm"
                  className={sortBy === 'rating' ? 'gradient-bg' : ''}
                >
                  <Icon name="Star" size={16} className="mr-2" />
                  По рейтингу
                </Button>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="glass hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="gradient-bg">
                          <Icon name={getTypeIcon(item.type)} size={14} className="mr-1" />
                          {getTypeLabel(item.type)}
                        </Badge>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={i < item.rating ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="User" size={14} />
                        {item.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <Badge variant="outline">{item.category}</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(item.id)}
                        className="hover:text-primary"
                      >
                        <Icon name="ThumbsUp" size={16} className="mr-2" />
                        {item.likes}
                      </Button>
                      <Button size="sm" className="gradient-bg hover:opacity-90">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Открыть
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Галерея лучших</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Работы с самым высоким рейтингом от нашего сообщества
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.filter(item => item.rating === 5).map((item, index) => (
              <div
                key={item.id}
                className="glass rounded-xl p-4 hover:scale-105 transition-transform animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="w-full aspect-square gradient-bg rounded-lg mb-3 flex items-center justify-center">
                  <Icon name={getTypeIcon(item.type)} size={48} className="text-white" />
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.author}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={14} className="fill-current" />
                    {item.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ThumbsUp" size={14} />
                    {item.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Свяжитесь с нами</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Есть вопросы или предложения? Мы всегда рады помочь!
          </p>
          <div className="glass rounded-2xl p-8">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Ваше имя</Label>
                <Input id="contact-name" placeholder="Иван Иванов" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" placeholder="ivan@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Сообщение</Label>
                <Textarea id="contact-message" placeholder="Ваше сообщение..." rows={5} />
              </div>
              <Button className="w-full gradient-bg hover:opacity-90" size="lg">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить
              </Button>
            </form>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="Mail" size={24} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={24} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="Phone" size={24} />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-white/80">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2024 CreativeHub. Создавайте с любовью ❤️</p>
          <p className="text-sm">Платформа для творческих людей</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
