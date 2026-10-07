import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, 
  ArrowRight, Flame, Sparkles, HelpCircle, Globe 
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quiz';
import { QuizQuestion } from '../../types/geo';
import { PageView } from '../common/Header';

interface QuizCardProps {
  onNavigate: (page: PageView, param?: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      const addedPoints = 100 + streak * 20;
      setScore((prev) => prev + addedPoints);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const getRank = (finalScore: number) => {
    if (finalScore >= 1200) return { title: 'Grand Master Cartographer', desc: 'Flawless geographical mastery of planet Earth!' };
    if (finalScore >= 800) return { title: 'Senior Planetary Explorer', desc: 'Outstanding knowledge of world capitals, flags and topography.' };
    if (finalScore >= 400) return { title: 'Global Navigator', desc: 'Solid geographical intuition with great potential for discovery.' };
    return { title: 'Aspiring Cartographer', desc: 'A great journey of geographical exploration has just begun!' };
  };

  if (isFinished) {
    const rank = getRank(score);
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#091526] border border-slate-800 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#1683FF] to-[#32D583] p-1 flex items-center justify-center shadow-xl shadow-blue-500/20">
          <div className="w-full h-full bg-[#07111F] rounded-[22px] flex items-center justify-center">
            <Award className="w-10 h-10 text-[#32D583]" />
          </div>
        </div>

        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#35C7FF]">Mission Assessment Complete</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 font-['Space_Grotesk']">{rank.title}</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">{rank.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800 text-left max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-[#050C17] border border-slate-800/80">
            <span className="text-xs text-slate-500 block">Total Score</span>
            <span className="text-3xl font-bold font-mono text-[#32D583]">{score} pts</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#050C17] border border-slate-800/80">
            <span className="text-xs text-slate-500 block">Questions Completed</span>
            <span className="text-3xl font-bold font-mono text-white">{QUIZ_QUESTIONS.length}/{QUIZ_QUESTIONS.length}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#35C7FF] text-white text-xs font-semibold shadow-lg shadow-blue-500/25 hover:opacity-95 transition-opacity"
          >
            <Globe className="w-4 h-4" />
            <span>Explore Atlas Map</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Quiz Top Bar: Progress, Score & Streak */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#091526] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400">
            Question <strong className="text-white text-sm">{currentIndex + 1}</strong> of {QUIZ_QUESTIONS.length}
          </div>
          <div className="hidden sm:block w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1683FF] to-[#35C7FF] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold animate-bounce">
              <Flame className="w-3.5 h-3.5" />
              <span>{streak}x Streak</span>
            </div>
          )}
          <div className="text-xs text-slate-400 font-mono">
            Score: <span className="text-[#32D583] font-bold text-sm">{score}</span> pts
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091526]/95 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-[#35C7FF] border border-blue-500/30">
            {currentQ.type.toUpperCase()} CHALLENGE
          </span>
          <span className="text-xs text-slate-400">
            +100 base points
          </span>
        </div>

        {/* Visual element (Flag or City Image) */}
        {currentQ.visual?.flagEmoji && (
          <div className="w-28 h-24 mx-auto rounded-2xl bg-[#050C17] border border-slate-700/80 flex items-center justify-center text-6xl shadow-inner">
            {currentQ.visual.flagEmoji}
          </div>
        )}

        {currentQ.visual?.imageUrl && (
          <div className="relative h-48 w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
            <img 
              src={currentQ.visual.imageUrl} 
              alt="Quiz hint visual" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center font-['Space_Grotesk'] leading-relaxed max-w-2xl mx-auto">
          {currentQ.question}
        </h2>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQ.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;
            
            let btnStyle = 'bg-[#050C17] hover:bg-slate-800/80 border-slate-800 text-slate-200';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-[#32D583]/20 border-[#32D583] text-[#32D583] font-bold shadow-lg shadow-emerald-500/10';
              } else if (isSelected) {
                btnStyle = 'bg-red-500/20 border-red-500 text-red-400 font-bold';
              } else {
                btnStyle = 'bg-[#050C17]/50 border-slate-800/50 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#32D583] shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card after answering */}
        {isAnswered && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#050C17] border border-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              {selectedOption === currentQ.correctAnswer ? (
                <div className="flex items-center gap-2 text-sm font-bold text-[#32D583]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct! (+{100 + (streak - 1) * 20} pts)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold text-red-400">
                  <XCircle className="w-4 h-4" />
                  <span>Incorrect. Correct answer: {currentQ.correctAnswer}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#35C7FF] text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:opacity-95 transition-opacity"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
