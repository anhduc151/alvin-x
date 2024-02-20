import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../../client";
import { Skeleton } from "antd";

interface Post {
  id: number;
  title: string;
  content: string;
}

const TopicsPost: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicPosts = async () => {
      try {
        setLoading(true);
        const { data: topicPosts, error: topicPostsError } = await supabase
          .from("topics_posts")
          .select("post_id")
          .eq("topic_id", topicId);

        if (topicPostsError) {
          throw topicPostsError;
        }

        const postIds = topicPosts.map((topicPost: any) => topicPost.post_id);

        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("id, title, content")
          .in("id", postIds);

        if (postsError) {
          throw postsError;
        }

        console.log(postsData);
        setPosts(postsData as Post[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topic posts:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchTopicPosts();
  }, [topicId]);

  return (
    <div className="topics_posts">
      <h2 className="topics_posts_h2">Lists Posts</h2>
      {loading ? (
        <>
          {[...Array(3)].map((_, index) => (
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
        <div className="topics_posts_list">
          {posts.map((post: Post) => (
            <Link
              to={`/posts-crypto/${post.id}`}
              key={post.id}
              className="topics_posts_box"
            >
              <h3>{post.title}</h3>
              <p className="posts_description">{post.content}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicsPost;
