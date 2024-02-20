import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../client";
import "../blog.css";
import { Skeleton } from "antd";

interface Blog {
  id: number;
  title: string;
  description: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlog() {
      const { data, error } = await supabase
        .from("blogs")
        .select()
        .eq("id", id)
        .single();
      setLoading(false);
      if (error) {
        console.error("Error fetching blog details");
      } else {
        console.log(data);
        setBlog(data);
      }
    }

    fetchBlog();
  }, [id]);

  useEffect(() => {
    document.title = "Details Blog - Alvin AI";
  }, []);

  return (
    <div className="blog_detail">
      {loading ? (
        <>
          <Skeleton
            title={false}
            paragraph={{
              rows: 10,
              width: ["100%", "80%", "60%", "40%"],
            }}
            active
          />
        </>
      ) : (
        <div className="blog_detail_box">
          {blog && (
            <>
              <h2 className="blog_detail_box_h2">{blog.title}</h2>
              <p
                dangerouslySetInnerHTML={{ __html: blog.description }}
                className="blog_detail_box_p"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
