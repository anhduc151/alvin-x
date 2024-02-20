import React, { useState, useEffect } from "react";
import { supabase } from "../../../client";
import Sidebar from "../../components/Sidebar";

interface Post {
  id: number;
  title: string;
  content: string;
  created_by: string;
  updated_by: string;
  sentiment: string;
  hashtag: string;
  status: string;
}

const CreatePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [updatedBy, setUpdatedBy] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch data
  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from("posts").select();
      if (error) {
        console.error("Error fetching posts:");
      } else {
        setPosts(data || []);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", (error as Error).message);
    }
  }

  // Create or update post
  async function createOrUpdatePost() {
    try {
      if (isEditing && editId !== null) {
        await supabase
          .from("posts")
          .update({
            title,
            content,
            created_by: createdBy,
            updated_by: updatedBy,
            sentiment,
            hashtag,
            status,
          })
          .eq("id", editId);
      } else {
        await supabase.from("posts").insert([
          {
            title,
            content,
            created_by: createdBy,
            updated_by: updatedBy,
            sentiment,
            hashtag,
            status,
          },
        ]);
      }

      resetForm();
      fetchPosts();
      console.log("Post created/updated successfully");
    } catch (error) {
      console.error("Error creating/updating post:", (error as Error).message);
    }
  }

  // Edit post
  const handleEdit = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setCreatedBy(postToEdit.created_by);
      setUpdatedBy(postToEdit.updated_by);
      setSentiment(postToEdit.sentiment);
      setHashtag(postToEdit.hashtag);
      setStatus(postToEdit.status);
      setIsEditing(true);
      setEditId(id);
    }
  };

  // Delete post
  async function handleDelete(id: number) {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) {
        console.error("Error deleting post:");
      } else {
        console.log("Post deleted successfully");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", (error as Error).message);
    }
  }

  // Reset form
  const resetForm = () => {
    setTitle("");
    setContent("");
    setCreatedBy("");
    setUpdatedBy("");
    setSentiment("");
    setHashtag("");
    setStatus("");
    setIsEditing(false);
    setEditId(null);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrUpdatePost();
  };

  useEffect(() => {
    fetchPosts();
    document.title = "CRUD Posts - Alvin AI";
  }, []);

  return (
    <>
      <Sidebar />
      <div className="create">
        <h1>Create Posts</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </label>
          <label>
            Created By:
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
          </label>
          <label>
            Updated By:
            <input
              type="text"
              value={updatedBy}
              onChange={(e) => setUpdatedBy(e.target.value)}
            />
          </label>
          <label>
            Sentiment:
            <input
              type="text"
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
            />
          </label>
          <label>
            Hashtag:
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <button type="submit">{isEditing ? "Update" : "Create"}</button>
        </form>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title}
              <button onClick={() => handleEdit(post.id)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreatePosts;
