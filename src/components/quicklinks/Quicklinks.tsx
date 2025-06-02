import './Quicklinks.css'
import '../../colors.css'

function Quicklinks() {
    return (
        <div>
            <div>
                <label>Lernplattformen</label>
                <a href="https://www.studysmarter.de/">StudySmarter</a>
                <a href="https://app.simpleclub.com/">SimpleClub</a>
                <a href="https://studyflix.de/">StudyFlix</a>
                <a href="https://www.notion.com/de">Notion</a>
                <a href="https://obsidian.md/">Obsidian</a>
                <a href="https://apps.ankiweb.net/">Anki</a>
                <a href="https://apps.ankiweb.net/">Quizlet</a>
            </div>
            <div>
                <label>DHBW</label>
                <a href="https://www.karlsruhe.dhbw.de/inf/studieninhalte-profil.html">Studieninhalte Informatik</a>
                <a href="https://moodle.dhbw.de/">Moodle</a>
                <a href="https://dualis.dhbw.de/">Dualis</a>
            </div>
        </div>
    )
}

export default Quicklinks