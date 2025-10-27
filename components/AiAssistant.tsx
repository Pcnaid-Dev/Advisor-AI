
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

    return (
        <div className={`flex items-start gap-3 ${!isModel ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isModel ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                <Icon type={isModel ? 'bot' : 'user'} className="w-5 h-5 text-white" />
            </div>
            <div className={`relative p-3 rounded-xl ${isModel ? 'bg-gray-100 dark:bg-slate-700' : 'bg-indigo-500 text-white'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap'}}>{message.content}</p>
                 {isModel && message.content.length > 0 && (
                     <div className="absolute -top-1 -right-1 text-gray-400 dark:text-gray-500">
                        <CopyButton text={message.content} />
                    </div>
                )}
            </div>
        </div>
    );
};

const AiAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const sendQuery = async (query: string) => {
        if (!query.trim() || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: query };
        setMessages(prev => [...prev, newUserMessage, { role: 'model', content: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = streamChat(messages, query);
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
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        sendQuery(input);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                        <Icon type="bot" className="w-12 h-12 mb-3 text-indigo-400" />
                        <h2 className="text-lg font-semibold">AI Advisor</h2>
                        <p className="max-w-xs mt-1 text-sm">
                            Ask about your workspace, summarize a page, or generate a plan.
                        </p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.content.length === 0 && (
                     <div className="flex items-start gap-3">
                         <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
                             <Icon type="bot" className="w-5 h-5 text-white" />
                         </div>
                         <div className="relative max-w-xs p-3 rounded-xl bg-gray-100 dark:bg-slate-700">
                             <div className="flex items-center space-x-1">
                                 <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                 <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                 <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                             </div>
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => sendQuery("Summarize this page for me.")} className="px-2 py-1 text-xs bg-gray-200 dark:bg-slate-700 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600">Ask this page</button>
                    <button onClick={() => sendQuery("Give me a daily brief for my workspace.")} className="px-2 py-1 text-xs bg-gray-200 dark:bg-slate-700 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600">Ask this workspace</button>
                </div>
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your advisor..."
                        className="w-full pl-3 pr-12 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <Icon type="send" className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AiAssistant;
