import React, { useState, useRef, useEffect } from 'react';
import { useEHRDC, useTranslation } from './EHRDCProvider';
import { EHRDCButton } from './EHRDCButton';
import { EHRDCCard } from './EHRDCCard';

export const EHRDCAIAssistant = ({ isOpen, onToggle }) => {
  const { preferences, user } = useEHRDC();
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting message
      const greeting = {
        id: Date.now(),
        type: 'ai',
        content: t('ai.greeting'),
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, t]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      en: {
        job: "I can help you find job opportunities that match your skills and experience. What type of position are you looking for?",
        career: "Career development is important for Emirati professionals. I can suggest training programs and skill development opportunities.",
        skills: "Let me help you identify skill gaps and recommend relevant training programs available through EHRDC.",
        application: "I can guide you through the job application process and help you prepare your CV and cover letter.",
        interview: "Interview preparation is crucial. I can provide tips and practice questions specific to your field.",
        salary: "I can provide information about salary ranges for different positions in the UAE market.",
        default: "I'm here to help with your career development. You can ask me about jobs, skills, training, or any career-related questions."
      },
      ar: {
        job: "يمكنني مساعدتك في العثور على فرص عمل تتناسب مع مهاراتك وخبرتك. ما نوع المنصب الذي تبحث عنه؟",
        career: "التطوير المهني مهم للمهنيين الإماراتيين. يمكنني اقتراح برامج التدريب وفرص تطوير المهارات.",
        skills: "دعني أساعدك في تحديد الفجوات في المهارات وأوصي ببرامج التدريب ذات الصلة المتاحة من خلال مجلس تنمية الموارد البشرية الإماراتية.",
        application: "يمكنني إرشادك خلال عملية التقدم للوظائف ومساعدتك في إعداد سيرتك الذاتية وخطاب التغطية.",
        interview: "التحضير للمقابلة أمر بالغ الأهمية. يمكنني تقديم نصائح وأسئلة تدريبية خاصة بمجالك.",
        salary: "يمكنني تقديم معلومات حول نطاقات الرواتب للمناصب المختلفة في السوق الإماراتي.",
        default: "أنا هنا لمساعدتك في تطوير حياتك المهنية. يمكنك أن تسألني عن الوظائف أو المهارات أو التدريب أو أي أسئلة متعلقة بالمهنة."
      }
    };

    const lang = preferences.language;
    const input = userInput.toLowerCase();

    if (input.includes('job') || input.includes('وظيفة') || input.includes('عمل')) {
      return responses[lang].job;
    } else if (input.includes('career') || input.includes('مهنة') || input.includes('مسار')) {
      return responses[lang].career;
    } else if (input.includes('skill') || input.includes('مهارة') || input.includes('تدريب')) {
      return responses[lang].skills;
    } else if (input.includes('application') || input.includes('تطبيق') || input.includes('طلب')) {
      return responses[lang].application;
    } else if (input.includes('interview') || input.includes('مقابلة')) {
      return responses[lang].interview;
    } else if (input.includes('salary') || input.includes('راتب') || input.includes('أجر')) {
      return responses[lang].salary;
    } else {
      return responses[lang].default;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { 
      key: 'find-jobs', 
      icon: 'search', 
      text: preferences.language === 'en' ? 'Find Jobs' : 'البحث عن وظائف',
      action: () => setInput(preferences.language === 'en' ? 'Help me find job opportunities' : 'ساعدني في العثور على فرص عمل')
    },
    { 
      key: 'skill-assessment', 
      icon: 'assessment', 
      text: preferences.language === 'en' ? 'Skill Assessment' : 'تقييم المهارات',
      action: () => setInput(preferences.language === 'en' ? 'I want to assess my skills' : 'أريد تقييم مهاراتي')
    },
    { 
      key: 'career-advice', 
      icon: 'lightbulb', 
      text: preferences.language === 'en' ? 'Career Advice' : 'نصائح مهنية',
      action: () => setInput(preferences.language === 'en' ? 'Give me career development advice' : 'أعطني نصائح للتطوير المهني')
    }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 z-50">
        <EHRDCButton
          variant="primary"
          size="lg"
          icon="smart_toy"
          onClick={onToggle}
          className="rounded-full shadow-lg animate-pulse"
          aria-label={t('nav.ai-assistant')}
        >
          <span className="hidden sm:inline ml-2 rtl:ml-0 rtl:mr-2">
            {t('nav.ai-assistant')}
          </span>
        </EHRDCButton>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 w-96 max-w-[calc(100vw-2rem)] z-50">
      <EHRDCCard className="h-[500px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[var(--ehrdc-primary)] to-[var(--ehrdc-primary-light)] text-white rounded-t-lg">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-white/20 rounded-full">
              <span className="material-icons text-white">smart_toy</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                {preferences.language === 'en' ? 'EHRDC AI Assistant' : 'المساعد الذكي لمجلس تنمية الموارد البشرية'}
              </h3>
              <p className="text-xs opacity-90">
                {preferences.language === 'en' ? 'Online' : 'متصل'}
              </p>
            </div>
          </div>
          <EHRDCButton
            variant="ghost"
            size="icon"
            icon="close"
            onClick={onToggle}
            className="text-white hover:bg-white/20"
            aria-label={t('a11y.close')}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-[var(--ehrdc-primary)] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString(preferences.language === 'ar' ? 'ar-AE' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              {preferences.language === 'en' ? 'Quick Actions:' : 'إجراءات سريعة:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.key}
                  onClick={action.action}
                  className="flex items-center space-x-1 rtl:space-x-reverse px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors duration-200"
                >
                  <span className="material-icons text-sm">{action.icon}</span>
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('ai.placeholder')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ehrdc-primary)] focus:border-transparent text-sm"
              disabled={isTyping}
            />
            <EHRDCButton
              variant="primary"
              size="icon"
              icon="send"
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              aria-label={t('ai.send')}
            />
          </div>
        </div>
      </EHRDCCard>
    </div>
  );
};

