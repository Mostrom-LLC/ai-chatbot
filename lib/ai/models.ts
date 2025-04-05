export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Chat model',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
  {
    id: 'title-model',
    name: 'Title model',
    description: 'Specialized model for generating titles',
  },
  {
    id: 'artifact-model',
    name: 'Artifact model',
    description: 'Model for handling artifacts',
  },
];
