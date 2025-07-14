import { HoverEffect } from "../ui/cardHover";
import { ProjectData } from "./ProjectData";

const ProjectList = () => {
  return <HoverEffect items={ProjectData} />;
};

export default ProjectList;