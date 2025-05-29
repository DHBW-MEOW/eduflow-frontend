import './App.css'
import Layout from './Layout.tsx'
import PopUpCreate from '../components/popUpCreate/PopUpCreate.tsx'
import PopUpDelete from '../components/popUpDelete/PopUpDelete.tsx'
import LearningPlan from '../components/popUpCreate/popUpTypes/LearningPlan.tsx'
import Exam from '../components/popUpCreate/popUpTypes/Exam.tsx'
import ToDo from '../components/popUpCreate/popUpTypes/ToDo.tsx'

function App() {

  return (
    <div>
      <Layout>
        <div>
          <PopUpCreate
           isOpen={true}
           label='Lernziel erstellen'
           children={<LearningPlan/>}
           onClickDiscard={() => console.log("verworfen")}
           onClickAdd={() => console.log("hinzugefügt")}
          />
          <PopUpCreate
           isOpen={true}
           label='Klausur hinzufügen'
           children={<Exam/>}
           onClickDiscard={() => console.log("verworfen")}
           onClickAdd={() => console.log("hinzugefügt")}
          />
          <PopUpCreate
           isOpen={true}
           label='ToDo erstellen'
           children={<ToDo/>}
           onClickDiscard={() => console.log("verworfen")}
           onClickAdd={() => console.log("hinzugefügt")}
          />
          <PopUpDelete
           isOpen={true}
           content='Mit dieser Aktion werden alle Lernziele aus xyz gelöscht. Wollen sie Fortfahren?'
           onClickCancel={() => console.log("canceled")}
           onClickConfirm={() => console.log("confirmed")}
          />
        </div>
          
      </Layout>
    </div>
  )
}

export default App
