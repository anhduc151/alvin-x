import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Progress } from "antd";
import { supabase } from "../../../client";

interface Post {
  id: number;
  created_at: any;
  title: string;
  content: string;
  created_by: string;
  hashtags: string;
  sentiment: number;
}

const DetailsPosts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("🚀 ~ DetailsPosts ~ id:", id);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("created_at, title, content, created_by, hashtags, sentiment")
          .eq("id", id);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setPost(data[0] as Post);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Function to calculate progress length and color based on sentiment
  const calculateProgress = (sentiment: number): { length: number; color: string } => {
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
    <div className="details_posts">
      {loading ? (
        <Skeleton
          avatar={{ shape: "square", size: "large" }}
          title={false}
          paragraph={{ rows: 4, width: ["100%", "80%", "60%", "40%"] }}
          active
        />
      ) : post ? (
        <div className="details_posts_lists">
          <h2 className="">{post.title}</h2>
          <p>{post.created_by}</p>
          <p className="">{post.content}</p>
          <p>{post.hashtags}</p>
          <p>Sentiment: {post.sentiment}</p>
          <Progress
            percent={calculateProgress(post.sentiment).length}
            status="active"
            strokeColor={calculateProgress(post.sentiment).color}
            strokeWidth={2}
          />
        </div>
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default DetailsPosts;
