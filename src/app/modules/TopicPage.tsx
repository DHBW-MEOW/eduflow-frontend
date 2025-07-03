import { useEffect, useState, type JSX, useContext } from "react";
import HeaderContext from "../../app/HeaderContext";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../components/grid/Grid";
import { useAuth } from "../../app/AuthContext";
import type { BoxData } from "../../components/grid/Box";

function TopicPage(): JSX.Element {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<BoxData[]>([]);
  const [exams, setExams] = useState<BoxData[]>([]);
  const headerSetter = useContext(HeaderContext);

  const { fetchFromBackend, isLoaded } = useAuth();

  const handleRenameExam = async (id: number, newTitle: string) => {
    const item = exams.find((item) => item.id === id);
    if (!item) {
      console.error(`No Exam found with ID=${id}`);
      return;
    }
    try {
      await fetchFromBackend<void>({
        method: "POST",
        endpoint: "data/exam",
        body: {
          id: id,
          course_id: Number(moduleId),
          name: newTitle,
          date: item.details,
        },
      });
    } catch (err) {
      console.error("Error while renaming:", err);
    }
  };

  const handleDeleteExam = async (id: number) => {
    try {
      await fetchFromBackend<void>({
        method: "DELETE",
        endpoint: "data/exam",
        body: { id: id },
      });
    } catch (err) {
      console.error("Error while deleting:", err);
    }
  };

  const handleClickExam = (id: number) => {
    if (!id) return;
    navigate(`/modules/${moduleId}/exams/${id}`);
  };

  const handleRenameTopic = async (id: number, newTitle: string) => {
    const item = topics.find((item) => item.id === id);
    if (!item) {
      console.error(`No Topic found with ID=${id}`);
      return;
    }
    try {
      await fetchFromBackend<void>({
        method: "POST",
        endpoint: "data/topic",
        body: {
          id: id,
          course_id: Number(moduleId),
          name: newTitle,
          details: item.details,
        },
      });
    } catch (err) {
      console.error("Error while renaming:", err);
    }
  };

  const handleDeleteTopic = async (id: number) => {
    try {
      const study_goals = await fetchFromBackend<{ id: number }[]>({
        method: "GET",
        endpoint: `data/study_goal?topic_id=${id}`,
      });
      for (const study_goal of study_goals) {
        await fetchFromBackend<void>({
          method: "DELETE",
          endpoint: "data/study_goal",
          body: { id: study_goal.id },
        });
      }
      await fetchFromBackend<void>({
        method: "DELETE",
        endpoint: "data/topic",
        body: { id: id },
      });
    } catch (err) {
      console.error("Error while deleting:", err);
    }
  };

  const handleClickTopic = (id: number) => {
    if (!id) return;
    navigate(`/modules/${moduleId}/topics/${id}`);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dataTopics, dataExams, dataModule] = await Promise.all([
          fetchFromBackend<
            { id: number; name: string; details: string }[]
          >({
            method: "GET",
            endpoint: `data/topic?course_id=${moduleId}`,
          }),
          fetchFromBackend<{ id: number; name: string; date: string }[]>({
            method: "GET",
            endpoint: `data/exam?course_id=${moduleId}`,
          }),
          fetchFromBackend<{ id: number; name: string }[]>({
            method: "GET",
            endpoint: `data/course?id=${moduleId}`,
          }),
        ]);
        if (dataModule.length === 1 && typeof dataModule[0] === "string") {
          return;
        }
        if (dataExams.length === 1 && typeof dataExams[0] === "string") {
          return;
        }
        if (dataTopics.length === 1 && typeof dataTopics[0] === "string") {
          return;
        }

        if (dataModule.length === 0 && isLoaded) {
          navigate("/404", { replace: true });
          return;
        }

        headerSetter?.setTextState(dataModule[0].name);
        headerSetter?.setLeftButtonState({
          on: true,
          text: "",
          icon: "circle-arrow-left-solid.svg",
          link: "/modules",
        });

        setTopics(dataTopics);

        const dataExamConverted: BoxData[] = dataExams.map(
          ({ id, name, date }) => ({
            id,
            name,
            details: date,
          }),
        );
        setExams(dataExamConverted);
      } catch (err) {
        console.error("Error while loading the Topics and Exams:", err);
      }
    };
    loadData();
  }, [fetchFromBackend]);

  return (
    <div>
      <h2 id="exam-headline">Prüfungsleistungen</h2>
      <Grid
        items={exams}
        setItems={setExams}
        onRename={handleRenameExam}
        onDelete={handleDeleteExam}
        onClick={handleClickExam}
      />
      <h2 id="topics-headline">Themen</h2>
      <Grid
        items={topics}
        setItems={setTopics}
        onRename={handleRenameTopic}
        onDelete={handleDeleteTopic}
        onClick={handleClickTopic}
      />
    </div>
  );
}

export default TopicPage;
