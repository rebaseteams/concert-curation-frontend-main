import { Genre } from './genre';

export type TargetAudience = {
    ageGroup: Array<string>;
    genre: Array<Genre>;
    gender: 'male' | 'female' | 'both';
}
