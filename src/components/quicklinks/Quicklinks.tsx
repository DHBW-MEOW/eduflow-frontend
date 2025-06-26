import './Quicklinks.css'
import '../../colors.css'

function Quicklinks() {
    return (
        <div className='quicklinks-container'>
            <div className='learning-container'>
                <h3>Materialien</h3>
                <a href="https://www.studysmarter.de/">StudySmarter</a>
                <a href="https://app.simpleclub.com/">SimpleClub</a>
                <a href="https://studyflix.de/">StudyFlix</a>
                <a href="https://obsidian.md/">Obsidian</a>
                <a href="https://quizlet.com/de">Quizlet</a>
                <a href="https://www.notion.com/de">Notion</a>
                <a href="https://apps.ankiweb.net/">Anki</a>
            </div>
            <div className='dhbw-container'>
                <h3>DHBW</h3>
                <a href="https://www.karlsruhe.dhbw.de/inf/studieninhalte-profil.html">Studieninhalte</a>
                <a href="https://moodle.dhbw.de/">Moodle</a>
                <a href="https://dualis.dhbw.de/">Dualis</a>
            </div>
        </div>
    )
}

export default Quicklinks