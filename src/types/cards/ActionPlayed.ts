import { type Card } from 'types/cards/Card';

export interface ActionPlayed {
  card: Card
  userId: string
}
