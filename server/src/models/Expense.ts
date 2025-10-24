import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  description: string;
  amount: number;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Food & Drinks',
      'Shopping',
      'Transportation',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Personal',
      'Other'
    ],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
expenseSchema.index({ userId: 1, date: -1 });

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
