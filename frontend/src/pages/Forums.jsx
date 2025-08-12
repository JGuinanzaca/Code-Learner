import { fetchForumPost, fetchRepliesFromPost, uploadForumPost, replyToForumPost } from "../Api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/userSlice";
import defaultProfile from "../Profile.png";
import "../globals.css"

export default function Forums() {
  const [isReplying, setIsReplying] = useState(false);
  const [forumId, setForumId] = useState(-1);
  const userDetails = useSelector((state) => selectUserDetails(state));

  // make date shorter
  // Sun Aug 03 2025 13:30:13 GMT-0400 (Eastern Daylight Time)
  function prettifyDateTime (str) {
    // Splitting the string by space
    const [day, m, d, y, t, zone, gar, ba, ge] = str.split(" ");

    // split time
    const [hr, min, sec] = t.split(":")
    delete [day, zone, gar, ba,ge, sec]

    // Added slashes and the space before the time
    return `@${hr}:${min} on ${m} ${d}, ${y}`
  }

  async function displayForumPost() {
    let index;
    let replyData;
    let profileImage;
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

    const header = document.createElement('div');
    const title = document.createElement('h3');
    const message = document.createElement('p');
    const postDiv = document.createElement('div');
    const nameD = document.createElement('h2');
    const restD = document.createElement('h3');
    const input = document.createElement('img');
    const info = document.createElement('div');

    if(reversedforumData[index].profile_image == null) {
        profileImage = defaultProfile;
      }
    else {
        profileImage = reversedforumData[index].profile_image;
      }

    postDiv.className = 'custom-forum-content';
    const tt = (reversedforumData[index].time);
    const prettyTime = prettifyDateTime(tt);
    const nm = (reversedforumData[index].name)
    nameD.textContent = `${nm}`;
    restD.textContent = `${prettyTime}`

    if(reversedforumData[index].profile_image == null) {
        profileImage = defaultProfile;
      }
    else {
        profileImage = reversedforumData[index].profile_image;
      }
    input.src = profileImage;
    input.style.width = '8vh';
    input.style.height = '8vh';
    input.style.borderRadius ='50%'

    nameD.style.fontWeight = 'bold';
    nameD.style.fontSize = "1.2rem"
    restD.style.fontWeight = 'bold';
    header.style.display = 'flex';
    header.style.flexDirection = 'row';
    header.style.justifyContent = 'space-between';
    title.textContent = `${reversedforumData[index].title}`;
    title.style.textDecoration = 'underline';
    title.style.fontSize = '1.1';
    message.textContent = `${reversedforumData[index].message}`;
    info.style.width = '100%'
    info.style.marginLeft = '5%'
    postDiv.style.display = 'flex'
    postDiv.style.flexDirection = 'flex-start'
    postDiv.style.alignItems = 'center'
    postDiv.style.padding = '3%';

    postDiv.appendChild(input);
    header.appendChild(nameD);
    header.appendChild(restD);
    info.appendChild(header);
    info.appendChild(title);
    info.appendChild(message);    
    postDiv.appendChild(info);
    displayPost.appendChild(postDiv);

    if(replyData[0].responses !== null) {
      for(let i = 0; i < replyData[0].responses.length; i++) {
        const header = document.createElement('h2');
        const message = document.createElement('p');
        const postDiv = document.createElement('div');
        const nameD = document.createElement('h2');
        const restD = document.createElement('h3');
        const input = document.createElement('img');
        const info = document.createElement('div');
    
        postDiv.className = 'custom-forum-reply';
        const tt = (replyData[0].responses[i].time);
        const prettyTime = prettifyDateTime(tt);
        const nm = (replyData[0].responses[i].name)
        nameD.textContent = `${nm}`;
        restD.textContent = `${prettyTime}`
        message.textContent = `${replyData[0].responses[i].message}`;

        if(replyData[0].responses[i].image == null) {
          profileImage = defaultProfile;
        }
        else {
          profileImage = replyData[0].responses[i].image;
        }
        
        input.src = profileImage;
        input.style.width = '8vh';
        input.style.height = '8vh';
        input.style.borderRadius ='50%'

        nameD.style.fontWeight = 'bold';
        nameD.style.fontSize = "1.125rem"
        restD.style.fontWeight = 'bold';
        header.style.display = 'flex';
        header.style.flexDirection = 'row';
        header.style.justifyContent = 'space-between';
        info.style.width = '100%'
        info.style.marginLeft = '5%'
        postDiv.style.display = 'flex'
        postDiv.style.flexDirection = 'flex-start'
        postDiv.style.alignItems = 'center'
        postDiv.style.padding = '3%';


        postDiv.appendChild(input);
        header.appendChild(nameD);
        header.appendChild(restD);
        info.appendChild(header);
        info.appendChild(message);    
        postDiv.appendChild(info);
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

  async function uploadUserSubmission() {
    if(document.getElementById('title').value === "" || document.getElementById('message').value === "") {
      alert("Empty fields detected. Please fill in all fields");
      return
    }
    const titleInput = document.getElementById('title').value;
    const messageInput = document.getElementById('message').value;
    const date = new Date;
    await uploadForumPost({
      name: userDetails.name,
      title: titleInput,
      message: messageInput,
      time: `${date}`,
      image: userDetails.image,
    });
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
    if(document.getElementById('title').value === "" || document.getElementById('message').value === "") {
      alert("Empty fields detected. Please fill in all fields");
      return
    }
    const titleInput = document.getElementById('title').value;
    const messageInput = document.getElementById('message').value;
    const date = new Date;
    await replyToForumPost(forumId, {
      name: userDetails.name,
      title: titleInput,
      message: messageInput,
      time: `${date}`,
      image: userDetails.image,
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

      <div className="main" style={{width:'100%', paddingTop:'0'}}>
        <div  id ="forum"></div>
        <div className="custom-pagination" style={{justifyContent: 'space-evenly'}}>
          <button className="custom-button" onClick={generateUserSubmission} style={{padding: '.5rem'}}>Create a new post</button>
          <button className="custom-button" onClick={generateReplySubmission} style={{padding: '.5rem'}}>Reply to post</button>
        </div>

      </div>

    </main>
  </div>  
  );
}