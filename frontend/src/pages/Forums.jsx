import { fetchForumPost, fetchRepliesFromPost, uploadForumPost, replyToForumPost } from "../Api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/userSlice";

export default function Forums() {
  const [isReplying, setIsReplying] = useState(false);
  const [forumId, setForumId] = useState(-1);
  const userDetails = useSelector((state) => selectUserDetails(state));

  async function displayForumPost() {
    let index;
    let replyData;
    if(this == null) { // When func is invoked from replySubmission, use the forumId already in the state to avoid error
      index = Number(forumId) - 1;
      replyData = await fetchRepliesFromPost(forumId);
    }
    else {
      setForumId(this.id); // The default: activates on selecting a forum post
      index = Number(this.id) - 1;
      replyData = await fetchRepliesFromPost(this.id);
    }
    console.log(replyData[0].responses); // Debug: checking if JSON object was returned from api call
    setIsReplying(false); // User can then generate a reply form when not true 
    const displayPost = document.getElementById('forum');
    displayPost.replaceChildren();

    let forumData = await fetchForumPost();
    let reversedforumData = forumData.reverse(); // Since we want to access the correct index, we reverse the array
    const header = document.createElement('h2');
    const title = document.createElement('h3');
    const message = document.createElement('p');
    const postDiv = document.createElement('div');
    
    postDiv.className = 'custom-topic-button';
    postDiv.style.backgroundColor = '#f9c74f';
    header.textContent = `${reversedforumData[index].name} created a post on ${reversedforumData[index].time}`;
    title.textContent = `${reversedforumData[index].title}`;
    message.textContent = `${reversedforumData[index].message}`;
    postDiv.appendChild(header);
    postDiv.appendChild(title);
    postDiv.appendChild(message);    
    displayPost.appendChild(postDiv);

    if(replyData[0].responses !== null) {
      for(let i = 0; i < replyData[0].responses.length; i++) {
        const header = document.createElement('h2');
        const title = document.createElement('h3');
        const message = document.createElement('p');
        const postDiv = document.createElement('div');
    
        postDiv.className = 'custom-topic-button';
        postDiv.style.backgroundColor = '#f9c74f';
        header.textContent = `${replyData[0].responses[i].name} replied to a post on ${replyData[0].responses[i].time}`;
        title.textContent = `${replyData[0].responses[i].title}`;
        message.textContent = `${replyData[0].responses[i].message}`;
        postDiv.appendChild(header);
        postDiv.appendChild(title);
        postDiv.appendChild(message);    
        displayPost.appendChild(postDiv);
      }
    }
  }

  async function generateForumPosts() {
    let forumData = await fetchForumPost();
    console.log(forumData); // Debug: checking if array contains valid object
    const listOfPosts = document.getElementById('forum-posts');
    listOfPosts.replaceChildren();

    // Newest post will be at the top, and oldest post at the bottom
    for(let i = 0; i < forumData.length; i++) {
      const newPost = document.createElement('button');
      newPost.className = 'custom-topic-button';
      newPost.id = `${forumData[i].forum_id}`;
      newPost.textContent = `${forumData[i].title}`;
      newPost.onclick = displayForumPost;
      listOfPosts.appendChild(newPost);
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
    const displayPost = document.getElementById('forum');
    displayPost.replaceChildren();
  }

  function generateUserSubmission() {
    const displayPost = document.getElementById('forum');
    displayPost.replaceChildren();

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    displayPost.appendChild(titleLabel);
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.style.backgroundColor = 'white';
    displayPost.appendChild(titleInput);

    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Write out your message: ';
    displayPost.appendChild(messageLabel);
    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.id = 'message'
    messageInput.style.backgroundColor = 'white';
    displayPost.appendChild(messageInput);

    const submitButton = document.createElement('button');
    submitButton.className = 'custom-button';
    submitButton.textContent = 'submit';
    submitButton.onclick = uploadUserSubmission;
    displayPost.appendChild(submitButton);
  }

  async function uploadReplySubmission() {
    const titleInput = document.getElementById('title').value;
    const messageInput = document.getElementById('message').value;
    const date = new Date;
    await replyToForumPost(forumId, {
      name: userDetails.name,
      title: titleInput,
      message: messageInput,
      time: `${date}`,
    });
    displayForumPost(); // Removes & then generates the main post + replies to reflect changes dynamically
  }

  function generateReplySubmission() {
    if(isReplying === true || forumId === -1) return; // Prevents adding multiple Inputs when one is already present / When user hasn't clicked on a post
    const displayPost = document.getElementById('forum');

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    displayPost.appendChild(titleLabel);
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.style.backgroundColor = 'white';
    displayPost.appendChild(titleInput);

    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Write out your message: ';
    displayPost.appendChild(messageLabel);
    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.id = 'message'
    messageInput.style.backgroundColor = 'white';
    displayPost.appendChild(messageInput);

    const submitButton = document.createElement('button');
    submitButton.className = 'custom-button';
    submitButton.textContent = 'submit';
    submitButton.onclick = uploadReplySubmission;
    displayPost.appendChild(submitButton);
    setIsReplying(true);
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
      <button className="custom-button" onClick={generateReplySubmission}>Reply to post</button>
    </main>
  </div>  
  );
}