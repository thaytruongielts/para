
import React, { useState } from 'react';
import { PARAPHRASE_DATA } from './constants';
import QuizPageComponent from './components/QuizPageComponent';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = PARAPHRASE_DATA.length;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-700">IELTS Paraphrase Practice</h1>
          <div className="text-sm font-semibold text-slate-600">Skill Builder</div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <QuizPageComponent
          key={currentPageIndex} // Re-mounts the component on page change, resetting its state
          pageData={PARAPHRASE_DATA[currentPageIndex]}
          pageNumber={currentPageIndex + 1}
        />
      </main>
      
      <footer className="bg-white/80 backdrop-blur-sm py-4 border-t border-slate-200 sticky bottom-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous Page
          </button>
          
          <div className="font-semibold text-slate-700">
            Page {currentPageIndex + 1} of {totalPages}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Page
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
