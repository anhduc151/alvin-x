import React, { useState, useEffect } from "react";
import { supabase } from "../../../client";
import Sidebar from "../../components/Sidebar";
import { Skeleton } from "antd";

interface Topic {
  id: number;
  name: string;
}

const CreateTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [name, setName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data
  async function fetchTopics() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("topics")
        .select()
        .ilike("name", `%${searchTerm}%`);
      if (error) {
        console.error("Error fetching topics:");
      } else {
        setTopics(data || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching topics:", (error as Error).message);
      setLoading(false);
    }
  }

  // Create or update topic
  async function createOrUpdateTopic() {
    try {
      if (isEditing && editId !== null) {
        await supabase.from("topics").update({ name }).eq("id", editId);
      } else {
        await supabase.from("topics").insert([{ name }]);
      }

      resetForm();
      fetchTopics();
    } catch (error) {
      console.error("Error creating/updating topic:", (error as Error).message);
    }
  }

  // Edit topic
  const handleEdit = (id: number) => {
    const topicToEdit = topics.find((topic) => topic.id === id);
    if (topicToEdit) {
      setName(topicToEdit.name);
      setIsEditing(true);
      setEditId(id);
    }
  };

  // Delete topic
  async function handleDelete(id: number) {
    try {
      const { error } = await supabase.from("topics").delete().eq("id", id);

      if (error) {
        console.error("Error deleting topic:");
      } else {
        console.log("Topic deleted successfully");
        fetchTopics();
      }
    } catch (error) {
      console.error("Error deleting topic:", (error as Error).message);
    }
  }

  // Reset form
  const resetForm = () => {
    setName("");
    setIsEditing(false);
    setEditId(null);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrUpdateTopic();
  };

  useEffect(() => {
    fetchTopics();
    document.title = "CRUD Topics - Alvin AI";
  }, [searchTerm]);

  return (
    <>
      <Sidebar />
      <div className="create">
        <h1 className="create_topics_h1">Create Topics</h1>

        <form onSubmit={handleSubmit} className="create_topics_form">
          <label className="create_topics_label">
            <i className="bx bx-stats title_icons"></i> Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Topics Name"
            className="create_topics_name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="create_btn">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>

        <>
          <p className="create_blogs_title">
            <i className="bx bx-stats title_icons"></i> Topics Lists
          </p>

          <div className="search_blogs">
            <input
              type="text"
              placeholder="Search Topics"
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
            <div className="create_topics_lists">
              {topics.map((topic) => (
                <div key={topic.id} className="create_topics_box">
                  <p className="create_topics_box_name">{topic.name}</p>
                  <div className="create_topics_btn">
                    <button
                      onClick={() => handleEdit(topic.id)}
                      className="create_edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(topic.id)}
                      className="create_delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CreateTopics;
