import React, { useState } from 'react';



const ChaptersLessons = ({chapterss}) => {
  const [chapters, setChapters] = useState(chapterss );
  const [activeChapter, setActiveChapter] = useState(null);

  const handleChapterClick = (chapter) => {
    if (!chapter.locked) {
      setActiveChapter(chapter);
    }
  };

  const handleClick = () => {
     console.log("ssss",activeChapter);
    if (activeChapter !== null) {
      window.location.href = `/Chapters/${activeChapter}/1`;
    }
  };
 
  return (
    <div id="guitarLessonPage">
      <div className="sidebar">
         
          <h2>Chapters</h2>
        <ul className='bonobo'>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => handleChapterClick(chapter)}
                className="chapter-button"
                disabled={chapter.locked}
              >
                {chapter} {chapter.locked && '(Locked)'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        <h1 className="header">Cozy Cyberpunk Guitar Lessons</h1>
        <p className="subtitle">Relax and learn with a gentle neon glow</p>
        <div className="lesson-box">
          {activeChapter ? (
            <>
              <div className="lesson-title">
                {chapters.find((ch) => ch === activeChapter).title}
              </div>
              <div className="lesson-content">
                Content for {chapters.find((ch) => ch === activeChapter)} will appear here.
              </div>
            </>
          ) : (
            <p>Select a chapter to begin.</p>
          )}  
          <button
            className="start-button"
            onClick={handleClick}
            disabled={!activeChapter}
          >
            {activeChapter ? 'Start Lesson' : 'Select a Chapter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChaptersLessons;