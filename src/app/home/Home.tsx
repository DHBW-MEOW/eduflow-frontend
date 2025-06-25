import './Home.css'
import { useCallback, useEffect, useState } from "react";
import { fetchStudyGoalData } from "../../api/fetchStudyGoalData.tsx";
import StudyGoals from "../../components/studyGoals/StudyGoals.tsx";
import type { ItemData } from "../studyplan/types.tsx";
import Quicklinks from '../../components/quicklinks/Quicklinks.tsx';
import { useAuth } from "../../app/AuthContext.tsx";

export async function clientLoader() {
  return {
    text: "This is the new Homepage",
  };
}

export default function Home() {
  const [items, setListItems] = useState<ItemData[]>([]);
  const { fetchFromBackend } = useAuth();

  const loadPageData = useCallback(async () => {
    try {
      const studyplanData = await fetchStudyGoalData(fetchFromBackend);

      if (studyplanData != undefined) {
        setListItems(studyplanData.itemList);
      }
    } catch (err) {
      console.error("Error while loading Data:", err);
    }
  }, [fetchFromBackend]);

  useEffect(() => {
      loadPageData();
  }, [loadPageData, fetchFromBackend])

  return (
    <div className="home-container">
      <div className='home-left-items'>
        <h2>Meine Lernziele</h2>
        <div className="home-studygoals">
          <StudyGoals items={items} />
        </div>
      </div>

      <div className='home-right-items'>
        <h2>Quicklinks</h2>
        <div className='home-quicklinks'>
          <Quicklinks></Quicklinks>
        </div>
      </div>
    </div>
  )
}
