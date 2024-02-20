import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";
import { Pagination, Skeleton, Progress } from "antd";
import { supabase } from "../../client";

interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  created_by: string;
  hashtags: string;
  sentiment: number;
}

const PostCrypto: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select(
            "id, created_at, title, content, created_by, hashtags, sentiment"
          )
          .order("created_at", { ascending: false })
          .range((currentPage - 1) * 10, currentPage * 10 - 1);

        if (error) {
          throw error;
        }

        console.log(data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    document.title = "Hot Posts Crypto - Alvin AI";
  }, []);

  // The function calculates the length and color of Progress based on the sentiment level
  const calculateProgress = (sentiment: number) => {
    let length = 0;
    let color = "";
    switch (sentiment) {
      case 1:
        length = 20;
        color = "#f5222d"; // red
        break;
      case 2:
        length = 40;
        color = "#f5222d"; // red
        break;
      case 3:
        length = 60;
        color = "#f5222d"; // red
        break;
      case 4:
        length = 80;
        color = "#1890ff"; // blue
        break;
      case 5:
        length = 100;
        color = "#52c41a"; // green
        break;
      default:
        length = 0;
        color = "#000000"; // black (default)
    }
    return { length, color };
  };

  return (
    <>
      <div className="posts">
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
            {posts.map((post) => (
              <Link
                to={`/posts-crypto/${post.id}`}
                className="blog_box"
                key={post.id}
              >
                <div className="blog_box_foot">
                  <h2 className="blog_box_foot_h2">{post.title}</h2>
                  <p>{post.created_by}</p>
                  <p className="posts_description">{post.content}</p>
                  <p>{post.hashtags}</p>
                  <p>Sentiment: {post.sentiment}</p>
                  <Progress
                    percent={calculateProgress(post.sentiment).length}
                    status="active"
                    // steps={5}
                    strokeColor={calculateProgress(post.sentiment).color}
                    strokeWidth={2}
                  />
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
          pageSize={4}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PostCrypto;
