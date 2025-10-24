
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { streamChat } from '../services/geminiService';
import { Message } from '../types';
import Icon from './Icon';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [text]);

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Copy code"
        >
            <Icon type={isCopied ? 'check' : 'copy'} className="w-5 h-5" />
        </button>
    );
};

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isModel = message.role === 'model';
    const contentWithBreaks = message.content.replace(/\n/g, '<br />');

    return (
        <div className={`flex items-start gap-4 ${!isModel && 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isModel ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                <Icon type={isModel ? 'bot' : 'user'} className="w-6 h-6 text-white" />
            </div>
            <div className={`relative max-w-xl p-4 rounded-xl ${isModel ? 'bg-white dark:bg-slate-700' : 'bg-indigo-500 text-white'}`}>
                <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: contentWithBreaks }}></p>
                 {isModel && message.content.length > 0 && (
                     <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-500">
                        <CopyButton text={message.content} />
                    </div>
                )}
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage, { role: 'model', content: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = streamChat(messages, input);
            for await (const chunk of stream) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.content += chunk.text;
                    }
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error during chat stream:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                 if (lastMessage.role === 'model') {
                     lastMessage.content = "I'm sorry, but I'm having trouble connecting. Please check the configuration and try again.";
                 }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-6">
            <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                        <Icon type="bot" className="w-16 h-16 mb-4 text-indigo-400" />
                        <h2 className="text-2xl font-semibold">Advisor AI Assistant</h2>
                        <p className="max-w-md mt-2">I can help with project planning, permit requirements, and more.
                        <br/>
                        How can I assist you today?</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.content.length === 0 && (
                     <div className="flex items-start gap-4">
                         <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500">
                             <Icon type="bot" className="w-6 h-6 text-white" />
                         </div>
                         <div className="relative max-w-xl p-4 rounded-xl bg-white dark:bg-slate-700">
                             <div className="flex items-center space-x-1">
                                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                             </div>
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-6">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your Advisor AI to draft a plan for @Location:Market-Street..."
                        className="w-full pl-4 pr-14 py-4 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <Icon type="send" className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
