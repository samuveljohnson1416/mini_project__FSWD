interface ParsedExpense {
  description: string;
  amount: number;
  category: string;
  date: Date;
}

const categoryKeywords: Record<string, string[]> = {
  'Food & Drinks': ['tea', 'coffee', 'lunch', 'dinner', 'breakfast', 'food', 'restaurant', 'cafe', 'snack', 'drink', 'meal'],
  'Shopping': ['shopping', 'clothes', 'shoes', 'shirt', 'dress', 'pants', 'buy', 'purchase', 'store'],
  'Transportation': ['uber', 'taxi', 'bus', 'train', 'metro', 'fuel', 'gas', 'petrol', 'transport', 'ride', 'auto'],
  'Entertainment': ['movie', 'cinema', 'game', 'concert', 'party', 'entertainment', 'show', 'netflix', 'spotify'],
  'Bills & Utilities': ['electricity', 'bill', 'water', 'gas', 'internet', 'wifi', 'phone', 'mobile', 'utility', 'rent'],
  'Healthcare': ['doctor', 'hospital', 'medicine', 'pharmacy', 'medical', 'health', 'clinic', 'dentist'],
  'Education': ['book', 'course', 'class', 'tuition', 'school', 'college', 'education', 'study', 'learning'],
  'Travel': ['hotel', 'flight', 'vacation', 'trip', 'travel', 'booking', 'ticket'],
  'Personal': ['haircut', 'salon', 'gym', 'personal', 'grooming', 'spa'],
};

export const parseExpenseInput = (input: string): ParsedExpense | null => {
  try {
    const trimmedInput = input.trim().toLowerCase();
    
    // Extract amount (look for numbers)
    const amountMatch = trimmedInput.match(/\d+(\.\d+)?/);
    if (!amountMatch) {
      return null;
    }
    
    const amount = parseFloat(amountMatch[0]);
    
    // Extract description (everything except the amount)
    const description = input
      .replace(amountMatch[0], '')
      .trim()
      .replace(/^(paid|for|spent on|bought)\s*/i, '')
      .trim();
    
    if (!description) {
      return null;
    }
    
    // Determine category based on keywords
    let category = 'Other';
    const inputWords = trimmedInput.split(/\s+/);
    
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (inputWords.some(word => word.includes(keyword) || keyword.includes(word))) {
          category = cat;
          break;
        }
      }
      if (category !== 'Other') break;
    }
    
    // Extract date (default to now)
    const date = new Date();
    
    // Check for date patterns like "yesterday", "today"
    if (trimmedInput.includes('yesterday')) {
      date.setDate(date.getDate() - 1);
    }
    
    return {
      description: description.charAt(0).toUpperCase() + description.slice(1),
      amount,
      category,
      date
    };
  } catch (error) {
    console.error('Error parsing expense input:', error);
    return null;
  }
};
