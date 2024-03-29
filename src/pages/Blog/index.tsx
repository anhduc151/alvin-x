import React, { useState, useEffect, Fragment } from "react";
import "./blog.css";
import blogImage from "../../assets/blog.png";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import { Pagination, Skeleton } from "antd";
import DarkMode from "../../components/DarkMode";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: BlogPost[] = posts.slice(indexOfFirstPost, indexOfLastPost);

  async function fetchPosts() {
    const { data, error } = await supabase.from("blogs").select();
    setLoading(false);
    if (error) {
      console.log("Error fetching posts");
    } else {
      console.log(data);
      if (data)
        setPosts(data);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    document.title = "Blogs - Alvin AI";
  }, []);

  return (
    <>
    <DarkMode layout={Fragment} />
      <div className="blog">
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                avatar={{ shape: "square", size: "large" }}
                title={false}
                paragraph={{ rows: 4, width: ["100%", "80%", "60%", "40%"] }}
                active
              />
            ))}
          </>
        ) : (
          <>
            {currentPosts.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id} className="blog_box">
                <div className="blog_box_head">
                  <img
                    src={blog.image || blogImage}
                    alt=""
                    className="blog_box_head_imgs"
                  />
                </div>

                <div className="blog_box_foot">
                  <h2 className="blog_box_foot_h2">{blog.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                    className="blog_box_foot_p"
                  />
                  <button className="blog_box_foot_btn">
                    Read on Mirror <i className="bx bx-outline icons_read"></i>
                  </button>
                </div>
              </Link>
            ))}
          </>
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
    </>
  );
};

export default Blog;
