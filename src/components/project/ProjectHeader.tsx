import { BoxReveal } from "../ui/boxReveal";
import { HyperText } from "../ui/hyperText";
import Separator from "../ui/separator";
import { SparklesText } from "../ui/sparklesText";

const ProjectHeader = () => {
  return (
    <BoxReveal>
      <div className="space-y-2">
        <SparklesText>
          <HyperText className="text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]">
            My Projects
          </HyperText>
        </SparklesText>
        <Separator />
        <p className="max-w-lg text-lg leading-relaxed">
          {`Some things I've built with love, expertise and a pinch of magical ingredients.`}
        </p>
      </div>
    </BoxReveal>
  );
};

export default ProjectHeader;
