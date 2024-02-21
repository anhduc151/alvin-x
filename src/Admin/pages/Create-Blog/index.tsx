import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./create.css";
import { Link } from "react-router-dom";
import { Skeleton, Pagination } from "antd";
import Sidebar from "../../components/Sidebar";

interface Post {
  id: number | null;
  title: string;
  description: string;
}

const CreateBlog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>({
    id: null,
    title: "",
    description: "",
  });
  const { title, description } = post;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // handle pagination
  const postsPerPage: number = 6;
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: Post[] = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts();
  }, [searchTerm]);

  const handleQuillChange = (value: string) => {
    setPost({ ...post, description: value });
  };

  // fetch data
  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select()
        .ilike("title", `%${searchTerm}%`);
      if (error) {
        console.error("Error fetching posts");
      } else {
        setPosts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", (error as Error).message);
      setLoading(false);
    }
  }

  // create or update post
  async function createOrUpdatePost() {
    try {
      if (isEditing) {
        await supabase
          .from("blogs")
          .update({ title, description })
          .eq("id", post.id);
      } else {
        await supabase.from("blogs").insert([{ title, description }]);
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error creating/updating post:", (error as Error).message);
    }
  }

  // edit post
  const handleEdit = (id: number | null) => {
    const postToEdit = posts.find((p) => p.id === id);
    if (postToEdit) {
      setPost({
        id,
        title: postToEdit.title,
        description: postToEdit.description,
      });
      setIsEditing(true);
    }
  };

  // reset form
  const resetForm = () => {
    setPost({ id: null, title: "", description: "" });
    setIsEditing(false);
  };

  // update post
  async function handleUpdate(id: number | null) {
    try {
      const { error } = await supabase
        .from("blogs")
        .update({ title, description })
        .eq("id", id);
      // .select();

      if (error) {
        console.error("Error updating post:");
      } else {
        console.log("Post updated successfully");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error updating post:", (error as Error).message);
    }
  }

  // delete post
  async function handleDelete(id: number | null) {
    console.log(id);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    document.title = "CRUD Blogs - Alvin AI";
  }, []);

  return (
    <>
      <Sidebar />
      <div className="create">
        <h1 className="create_topics_h1">Create Blogs</h1>
        <div className="create_event">
          <p className="create_event_p">
            <i className="bx bx-stats title_icons"></i> Title
          </p>
          <input
            placeholder="Title ..."
            value={title}
            className="create_title"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <p className="create_event_p">
            <i className="bx bx-stats title_icons"></i> Description
          </p>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={handleQuillChange}
            className="quils"
            style={{ border: "2px solid #000", borderRadius: "10px" }}
          />

          <button onClick={createOrUpdatePost} className="create_btn">
            {isEditing ? "Update Post" : "Create Post"}
          </button>
        </div>

        <div className="create_show">
          <p className="create_blogs_title">
            <i className="bx bx-stats title_icons"></i> Blogs List
          </p>

          <div className="search_blogs">
            <input
              type="text"
              placeholder="Search Blogs"
              className="search_blogs_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <Skeleton
              // avatar={{ shape: "square", size: "large" }}
              title={false}
              paragraph={{ rows: 4, width: ["100%", "80%", "60%", "40%"] }}
              active
            />
          ) : (
            <div className="create_result_lists">
              {currentPosts.map((product) => (
                <div key={product.id} className="create_result">
                  <h3 className="create_result_h3">{product.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="create_result_p"
                  />

                  <div className="create_group">
                    <Link to={`/blog/${product.id} `}>
                      <button className="create_view">View</button>
                    </Link>
                    <button
                      onClick={() => {
                        if (isEditing) {
                          handleUpdate(product.id);
                        } else {
                          handleEdit(product.id);
                        }
                      }}
                      className="create_edit"
                    >
                      {isEditing ? "Update" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="create_delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="blogs_panigation">
          <Pagination
            current={currentPage}
            total={posts.length}
            pageSize={postsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
