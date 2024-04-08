/* Components */
import {
  LuInfo,
  LuKeyRound,
  LuPartyPopper,
  LuCheckCircle2,
  LuXCircle,
} from "react-icons/lu";
import { VscLibrary } from "react-icons/vsc";

interface ProgressStepperProps {
  progress: number;
  loading: number;
}

const ProgressBar: React.FC<ProgressStepperProps> = ({ progress, loading }) => {
  const steps = [
    {
      title: "Your Details",
      completed: progress >= 1,
      icon: <LuInfo size={24} color="currentColor" />,
    },
    {
      title: "Level & Subjects",
      completed: progress >= 2,
      icon: <VscLibrary size={24} color="currentColor" />,
    },
    {
      title: "Choose a Password",
      completed: progress >= 3,
      icon: <LuKeyRound size={24} color="currentColor" />,
    },
    {
      title: "Confirmation",
      completed: progress >= 3,
      icon: <LuPartyPopper size={24} color="currentColor" />,
    },
  ];

  return (
    <div className="w-full px-8 mx-auto absolute bottom-5 hidden lg:block">
      <div className="flex">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={`w-10 h-10 mx-auto rounded-full text-lg flex items-center justify-center relative ${
                loading == 2 || loading == 3
                  ? "text-danger-500"
                  : step.completed
                  ? "text-success-500"
                  : ""
              }`}
            >
              {loading == 2 || loading == 3 ? (
                <LuXCircle size={24} color="currentColor" />
              ) : step.completed ? (
                <LuCheckCircle2 size={24} color="currentColor" />
              ) : (
                step.icon
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex text-xs content-center text-center">
        {steps.map((step, index) => (
          <p key={index} className={`w-1/4 text-center`}>
            {step.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
