export interface User {
  _id: string;
  username: string;
}

export interface Message {
  _id: string;
  roomId: string;
  ownerId: string;
  owner: string;
  message: string;
  createdAt: string;
}

export interface Question {
  _id: string;
  ownerId: string;
  owner: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export interface GameSettings {
  questionsPerUser: 5 | 10 | 15 | 20;
  answerPeriod: 30 | 60 | 90 | 120;
  questions: Question[];
}

export interface Room {
  _id: string;
  roomName: string;
  creatorId: string;
  roomAdmin: string;
  createdAt: string;
  state: 'pre-game' | 'in-game';
  participants: { _id: string; username: string }[];
  readyChecks: { _id: string }[];
  gameSettings: GameSettings;
}
