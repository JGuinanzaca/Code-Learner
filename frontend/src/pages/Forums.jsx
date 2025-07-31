import { fetchForumPost, uploadForumPost } from "../Api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/userSlice";

export default function Forums() {

  const userDetails = useSelector((state) => selectUserDetails(state));

  async function displayForumPost() {
    const div = document.getElementById('forum');
    div.replaceChildren();
    let forumData = await fetchForumPost();
    let reversedforumData = forumData.reverse(); //since we want to access the correct index, we reverse the array
    const header = document.createElement('h2');
    const title = document.createElement('h3');
    const message = document.createElement('p');
    const index = Number(this.id) - 1;
          
    header.textContent = `${reversedforumData[index].name} created a post on ${reversedforumData[index].time}`;
    title.textContent = `${reversedforumData[index].title}`;
    message.textContent = `${reversedforumData[index].message}`;
    div.appendChild(header);
    div.appendChild(title);
    div.appendChild(message);    
  }

  async function generateForumPosts() {
    let forumData = await fetchForumPost();
    console.log(forumData); // Debug: checking if array contains valid object
    const div = document.getElementById('forum-posts');
    div.replaceChildren();

    // Newest post will be at the top, and oldest post at the bottom
    for(let i = 0; i < forumData.length; i++) {
      const newPost = document.createElement('button');
      newPost.className = 'custom-topic-button';
      newPost.id = `${forumData[i].forum_id}`;
      newPost.textContent = `${forumData[i].title}`;
      newPost.onclick = displayForumPost;
      div.appendChild(newPost);
    }
  }

  // Bug: adding an apostrophe to any of the text fields will throw an error for ending the query too soon
  async function uploadUserSubmission() {
    const titleInput = document.getElementById('title').value;
    const messageInput = document.getElementById('message').value;
    const date = new Date;
    await uploadForumPost({
      name: userDetails.name,
      title: titleInput,
      message: messageInput,
      time: `${date}`,
    })
    generateForumPosts(); // Removes & then generates all forum post to reflect changes dynamically
    const div = document.getElementById('forum');
    div.replaceChildren();
  }

  function generateUserSubmission() {
    const div = document.getElementById('forum');
    div.replaceChildren();

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    div.appendChild(titleLabel);
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.style.backgroundColor = 'white';
    div.appendChild(titleInput);

    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Write out your message: ';
    div.appendChild(messageLabel);
    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.id = 'message'
    messageInput.style.backgroundColor = 'white';
    div.appendChild(messageInput);

    const submitButton = document.createElement('button');
    submitButton.className = 'custom-button';
    submitButton.textContent = 'submit';
    submitButton.onclick = uploadUserSubmission;
    div.appendChild(submitButton);
  }

  useEffect(() => {
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
        <ul className="custom-topic-list" id="forum-posts">
        </ul>
        <div className="custom-pagination">
          <button>back</button>
          <button>next</button>
        </div>
      </aside>

      <div className="custom-forum" id ="forum"></div>
      <button className="custom-button" onClick={generateUserSubmission}>Create a new post</button>
    </main>
  </div>  
  );
}