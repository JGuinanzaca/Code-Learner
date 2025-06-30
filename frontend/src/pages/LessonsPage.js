function LessonsPage() {
  const lessons = [
    { id: 1, title: "Introduction to Python", description: "Variables, data types, and basic syntax." },
    { id: 2, title: "Control Flow", description: "if, else, loops and logic" },
    { id: 3, title: "Functions", description: "Defining and calling functions." },
  ];

  return (
    <div>
      <h2>Available Lessons</h2>
      {lessons.map((lesson) => (
        <div key={lesson.id} className="card">
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
          <button>Start Lesson</button> 
        </div>
      ))}
    </div>
  ); 
}

export default LessonsPage;