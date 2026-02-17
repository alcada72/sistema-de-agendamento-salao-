import Profissionardashcard from "./proficional-area/profissionar-dash-card";
import RecentArea from "./recent-area/page";

export default function MainHome() {
  return (
    <div className="main-content">
      <section>
        <RecentArea />
      </section>

      <section>
        <Profissionardashcard />
       
      </section>
    </div>
  );
}
