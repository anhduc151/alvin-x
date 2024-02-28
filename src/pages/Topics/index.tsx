import React, { useState, useEffect } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import { Pagination, Skeleton } from "antd";
import "./topics.css";
// import Chat from "../../components/Chat";
import PostCrypto from "../Post";

interface Topic {
  id: number;
  name: string;
  created_at: string;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [topicsPerPage] = useState<number>(8);

  // Change page
  const handleChangePage = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("topics")
          .select("id, name, created_at");
        if (error) {
          throw error;
        }

        console.log(data);
        setTopics(data as Topic[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", (error as Error).message);
        setLoading(false);
      }
    };

    fetchTopics();
    document.title = "Topics - Alvin AI";
  }, []);

  // Logic to paginate
  const indexOfLastTopic: number = currentPage * topicsPerPage;
  const indexOfFirstTopic: number = indexOfLastTopic - topicsPerPage;
  const currentTopics: Topic[] = topics.slice(indexOfFirstTopic, indexOfLastTopic);

  return (
    <>
      {/* <Chat /> */}
      <div className="discover">
        <div className="discover_top">
          <h2 className="discover_top_h2">
            <i className="bx bx-coin-stack topics_icons"></i> Topics
          </h2>

          {loading ? (
            <>
              {[...Array(1)].map((_, index) => (
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
            <div className="topics">
              {currentTopics.map((topic: Topic, index: number) => (
                <Link
                  to={`/topics/${topic.id}`}
                  key={index}
                  className="topics_box"
                >
                  <h2 className="topics_box_h2">
                    <i className="bx bx-coin topics_icons"></i> {topic.name}
                  </h2>
                  <p>Created at: {topic.created_at}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="blogs_panigation">
            <Pagination
              current={currentPage}
              total={topics.length}
              pageSize={topicsPerPage}
              onChange={handleChangePage}
              showSizeChanger={false}
            />
          </div>
        </div>

        <div className="discover_bottom">
          <h2 className="discover_top_h2">
            <i className="bx bx-coin-stack topics_icons"></i> Posts
          </h2>
          <PostCrypto />
        </div>
      </div>
    </>
  );
};

export default Topics;
