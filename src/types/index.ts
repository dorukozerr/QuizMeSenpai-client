export interface RoomProps {
  _id: string;
  roomName: string;
  creatorId: string;
  roomAdmin: string;
  createdAt: string;
  state: 'pre-game' | 'in-game';
  participants: { _id: string; username: string }[];
  readyChecks: { _id: string }[];
  gameSettings: {
    questionsPerUser: 5 | 10 | 15 | 20;
    answerPeriod: 10 | 20 | 30;
  };
}
