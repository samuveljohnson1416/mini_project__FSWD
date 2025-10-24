import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit: (input: string) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(input);
      setInput('');
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const examples = [
    'tea 25',
    'lunch 250',
    'electricity bill 500',
    'uber 150',
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-white mb-4">Add Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type expense... e.g., 'tea 25' or 'paid electricity bill 500'"
            className="input-field pr-20"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-warm-orange to-warm-yellow text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '...' : 'Add'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm">Examples:</span>
          {examples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setInput(example)}
              className="text-xs bg-dark-bg px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
