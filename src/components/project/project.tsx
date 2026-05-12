import BackgroundPattern from "./backgroundPattern";
import ProjectHeader from "./projectHeader";
import ProjectList from "./projectList";

const Projects = () => {
  return (
    <section id="projects" className="relative w-full overflow-hidden py-20">
      <BackgroundPattern />
      <div className="mx-auto relative container px-6">
        <ProjectHeader />
        <ProjectList />
      </div>
    </section>
  );
};

export default Projects;
