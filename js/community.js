import {
  db, auth, provider,
  addDoc, collection, onSnapshot, query, orderBy,
  serverTimestamp, signInWithPopup
} from "../community.html"; // adjust import if bundling, else use window.firebaseStuff

document.addEventListener("DOMContentLoaded", () => {
  const discussionList = document.querySelector(".discussion-list");
  const postBtn = document.getElementById("postBtn");
  const discussionInput = document.getElementById("discussionInput");
  const loginBtn = document.getElementById("loginBtn");
  const userInfo = document.getElementById("userInfo");
  const discussionForm = document.getElementById("discussion-form");

  // Sign in
  loginBtn.addEventListener("click", async () => {
    await signInWithPopup(auth, provider);
  });

  // Show user info
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfo.textContent = `Hello, ${user.displayName}`;
      loginBtn.style.display = "none";
      discussionForm.style.display = "block";
    } else {
      userInfo.textContent = "";
      loginBtn.style.display = "inline-block";
      discussionForm.style.display = "none";
    }
  });

  // Post discussion
  postBtn.addEventListener("click", async () => {
    const text = discussionInput.value.trim();
    if (!text) return;
    const user = auth.currentUser;
    await addDoc(collection(db, "discussions"), {
      body: text,
      author: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });
    discussionInput.value = "";
  });

  // Realtime render
  const q = query(collection(db, "discussions"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    discussionList.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("div");
      item.className = "discussion-item";
      item.textContent = `${data.body} — ${data.author}`;
      discussionList.appendChild(item);
    });
  });
});
