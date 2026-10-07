import { QuizQuestion } from '../types/geo';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'flag',
    question: 'Which country does this flag belong to?',
    options: ['Japan', 'South Korea', 'Singapore', 'Indonesia'],
    correctAnswer: 'Japan',
    explanation: 'The flag of Japan (Nisshōki or Hinomaru) features a red disc representing the rising Sun on a white field, symbolizing national peace and purity.',
    countryId: 'japan',
    visual: {
      flagEmoji: '🇯🇵'
    }
  },
  {
    id: 'q2',
    type: 'capital',
    question: 'What is the official capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 'Canberra',
    explanation: 'Canberra was chosen as the capital in 1908 as a diplomatic compromise between rivals Sydney and Melbourne. It is a planned city designed by American architect Walter Burley Griffin.',
    countryId: 'australia'
  },
  {
    id: 'q3',
    type: 'continent',
    question: 'Which continent is the largest on Earth by both land area and total population?',
    options: ['Africa', 'Asia', 'North America', 'Europe'],
    correctAnswer: 'Asia',
    explanation: 'Asia spans roughly 44.58 million square kilometers (approx. 30% of Earth’s total land area) and hosts nearly 60% of the world’s human population (~4.75 billion people).',
    countryId: 'china'
  },
  {
    id: 'q4',
    type: 'city',
    question: 'To which country does the vibrant city of Rio de Janeiro belong?',
    options: ['Argentina', 'Portugal', 'Brazil', 'Chile'],
    correctAnswer: 'Brazil',
    explanation: 'Rio de Janeiro was the capital of Brazil from 1763 until 1960, when the federal capital was moved to the newly built city of Brasília.',
    countryId: 'brazil',
    visual: {
      imageUrl: '/src/assets/images/city_rio_de_janeiro_1790156834223.jpg'
    }
  },
  {
    id: 'q5',
    type: 'flag',
    question: 'Identify the country represented by this flag: 🇧🇷',
    options: ['Brazil', 'Bolivia', 'Ecuador', 'Colombia'],
    correctAnswer: 'Brazil',
    explanation: 'The Brazilian flag features a yellow rhombus on a green field with a blue celestial globe depicting 27 stars (representing the 26 states and federal district) and the motto "Ordem e Progresso".',
    countryId: 'brazil',
    visual: {
      flagEmoji: '🇧🇷'
    }
  },
  {
    id: 'q6',
    type: 'capital',
    question: 'What is the capital of Canada?',
    options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    correctAnswer: 'Ottawa',
    explanation: 'Queen Victoria selected Ottawa as the capital of the Province of Canada in 1857 because of its strategic inland position, located safely away from the American border and on the boundary between English and French speaking populations.',
    countryId: 'canada'
  },
  {
    id: 'q7',
    type: 'fact',
    question: 'Which country is home to the world’s longest natural coastline exceeding 243,000 km?',
    options: ['Norway', 'Canada', 'Russia', 'Australia'],
    correctAnswer: 'Canada',
    explanation: 'Canada holds the world’s longest coastline at 243,042 kilometers, bordered by three oceans: the Atlantic, Pacific, and Arctic.',
    countryId: 'canada'
  },
  {
    id: 'q8',
    type: 'map',
    question: 'Which country has three official capitals: Pretoria, Cape Town, and Bloemfontein?',
    options: ['Nigeria', 'South Africa', 'Kenya', 'Ethiopia'],
    correctAnswer: 'South Africa',
    explanation: 'South Africa uniquely divides executive power (Pretoria), legislative power (Cape Town), and judicial power (Bloemfontein) among three distinct cities.',
    countryId: 'south-africa',
    visual: {
      flagEmoji: '🇿🇦'
    }
  },
  {
    id: 'q9',
    type: 'city',
    question: 'Which European city is home to the famous Louvre Museum and the Eiffel Tower?',
    options: ['Rome', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    explanation: 'Paris is the capital of France and has been one of the world’s major centers of finance, diplomacy, commerce, fashion, gastronomy, and science since the 17th century.',
    countryId: 'france',
    visual: {
      imageUrl: '/src/assets/images/city_paris_eiffel_1790156821277.jpg'
    }
  },
  {
    id: 'q10',
    type: 'flag',
    question: 'Which Nordic country’s flag is displayed here: 🇳🇴?',
    options: ['Sweden', 'Finland', 'Norway', 'Iceland'],
    correctAnswer: 'Norway',
    explanation: 'The flag of Norway features an indigo blue Scandinavian cross outlined in white on a red field, reflecting historical unions with both Denmark and Sweden.',
    countryId: 'norway',
    visual: {
      flagEmoji: '🇳🇴'
    }
  },
  {
    id: 'q11',
    type: 'fact',
    question: 'Which continent contains approximately 70% of Earth’s fresh water ice?',
    options: ['North America', 'Europe', 'Antarctica', 'Asia'],
    correctAnswer: 'Antarctica',
    explanation: 'Antarctica’s continental ice sheet contains an estimated 27 million cubic kilometers of ice, representing roughly 70% of all planetary fresh water and 90% of all planetary ice.',
    countryId: 'antarctica',
    visual: {
      flagEmoji: '🇦🇶'
    }
  },
  {
    id: 'q12',
    type: 'capital',
    question: 'What is the capital city of Egypt, located near the ancient pyramids of Giza?',
    options: ['Alexandria', 'Cairo', 'Luxor', 'Aswan'],
    correctAnswer: 'Cairo',
    explanation: 'Cairo (Al-Qāhirah) is Egypt’s capital and the largest metropolitan area in Africa and the Arab world, with a rich history extending back over 1,000 years.',
    countryId: 'egypt'
  }
];
