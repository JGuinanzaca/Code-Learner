import { fetchForumPost } from "../Api";
import { useEffect } from "react";

export default function Forums() {

  useEffect(() => {
    async function generateForumPosts() {
      let array = await fetchForumPost();
      console.log(array); // Debug: checking if array contains valid object

      // Newest post will be at the top, and oldest post at the bottom
      const div = document.getElementById('forum-post');
      for(let i = 0; i < array.length; i++) {
        const newPost = document.createElement('button');
        newPost.className = 'custom-topic-button';
        newPost.id = `${array[i].forum_id}`;
        newPost.textContent = `${array[i].title}`;

        newPost.onclick = async function () {
          let array = await fetchForumPost();
          let reversed = array.reverse(); //since we want to access the correct index, we reverse the array
          const header = document.getElementById('title');
          const message = document.getElementById('message');
          const index = Number(newPost.id) - 1;
          
          header.textContent = `${reversed[index].title}`;
          message.textContent = `${reversed[index].message}`;
        };

        div.appendChild(newPost);
      }
    }
    generateForumPosts();
  }, []);

  return (
  <div className="custom-container">
    <section className="custom-hero">
      <div className="custom-hero-content">
        <h1 className="custom-title">// forums</h1>
      </div>

      <div className="custom-grid">
        {["Help", "Talk", "Python", "JavaScript", "C++"].map((text, idx) => (
          <button
            key={idx}
            className="custom-button"
            onClick={() => console.log(`${text} forum loaded`)}
          >
            <h2 className="custom-button-heading">{text}</h2>
          </button>
        ))}
      </div>
    </section>

    <main className="custom-main">
      <aside className="custom-sidebar">
        <h2 className="custom-sidebar-title">Topics</h2>
        <ul className="custom-topic-list" id="forum-post">
        </ul>
        <div className="custom-pagination">
          <button>back</button>
          <button>next</button>
        </div>
      </aside>

      <div className="custom-forum" id ="forum">
        <h2 className="custom-forum-title" id="title"></h2>
        <p className="custom-forum-content" id="message">
        </p>
      </div>
    </main>
  </div>  
  );
}